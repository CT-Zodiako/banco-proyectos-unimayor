"""Downloads of the public event sources, cached under data/raw/ so a build can be repeated with --offline.

Each load_* function returns schema events or raises when the whole source is unusable; the build turns that
into a warning and a 0 count for the source.
"""

import json
import os
import ssl
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

from pipeline import eventos as ev

USER_AGENT = ("UNIMAYOR-eventos/1.0 (academic event finder of a university project bank; "
              "run by hand a few times a month; honours robots.txt Crawl-delay)")
WIKICFP_CALL = "http://www.wikicfp.com/cfp/call?"
WIKICFP_DELAY = 5  # seconds, robots.txt Crawl-delay
CCFDDL_URL = "https://ccfddl.com/conference/allconf.json"
DEVPOST_URL = "https://devpost.com/api/hackathons?status%5B%5D=open&page={page}"
DEVPOST_DELAY = 1
DEVPOST_MAX_PAGES = 30


class SourceError(Exception):
    """A whole source produced nothing usable."""


def _ssl_context():
    """Verified TLS context. python.org builds on macOS ship without a CA bundle; fall back to the system one."""
    context = ssl.create_default_context()
    paths = ssl.get_default_verify_paths()
    has_bundle = os.environ.get("SSL_CERT_FILE") or (paths.cafile and os.path.exists(paths.cafile)) or \
        os.path.exists(paths.openssl_cafile)
    if not has_bundle and os.path.exists("/etc/ssl/cert.pem"):
        context.load_verify_locations("/etc/ssl/cert.pem")
    return context


SSL_CONTEXT = _ssl_context()


def _fetch_curl(url, timeout):
    """Fallback when Python cannot verify the TLS chain: curl verifies certificates too, with the system store."""
    done = subprocess.run(["curl", "-fsSL", "--max-time", str(int(timeout)), "-A", USER_AGENT, url],
                          capture_output=True, check=True, timeout=timeout + 5)
    return done.stdout


def fetch(url, timeout):
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(request, timeout=timeout, context=SSL_CONTEXT) as response:  # noqa: S310
            return response.read()
    except urllib.error.URLError as error:
        if isinstance(error, urllib.error.HTTPError) or not isinstance(error.reason, ssl.SSLError):
            raise
    return _fetch_curl(url, timeout)


def read_or_fetch(path, url, offline, timeout):
    """Cached bytes in --offline mode; otherwise download, save to the cache and return them."""
    if offline:
        return path.read_bytes()
    data = fetch(url, timeout)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    return data


def _warn(message):
    print(f"warning: {message}", file=sys.stderr)


def load_wikicfp(raw, offline, pages, today, timeout, sleep=time.sleep):
    events, read, requests = [], 0, 0
    for query, topic in ev.WIKICFP_QUERIES.items():
        slug = query.replace(" ", "-")
        for page in range(1, pages + 1):
            url = WIKICFP_CALL + urllib.parse.urlencode({"conference": query, "page": page})
            if not offline and requests:
                sleep(WIKICFP_DELAY)
            requests += 1
            try:
                html = read_or_fetch(raw / "wikicfp" / f"{slug}-p{page}.html", url, offline, timeout)
            except Exception as error:  # noqa: BLE001 - one page failing must not stop the others
                _warn(f"wikicfp {query!r} page {page}: {error}")
                break
            read += 1
            found = ev.parse_wikicfp(html.decode("utf-8", errors="replace"), [topic], today)
            events.extend(found)
            if ev.wikicfp_reached_past(found, today):
                break
    if not read:
        raise SourceError("no WikiCFP page could be read")
    return events


def load_ccfddl(raw, offline, today, timeout):
    data = json.loads(read_or_fetch(raw / "ccfddl" / "allconf.json", CCFDDL_URL, offline, timeout))
    return ev.parse_ccfddl(data, today)


def load_devpost(raw, offline, timeout, sleep=time.sleep):
    events = []
    for page in range(1, DEVPOST_MAX_PAGES + 1):
        if page > 1 and not offline:
            sleep(DEVPOST_DELAY)
        try:
            data = json.loads(read_or_fetch(raw / "devpost" / f"page-{page}.json", DEVPOST_URL.format(page=page),
                                            offline, timeout))
        except Exception as error:  # noqa: BLE001
            if page == 1:
                raise
            _warn(f"devpost page {page}: {error}; keeping {len(events)} hackathons")
            break
        found, total = ev.parse_devpost(data)
        events.extend(found)
        if not found or len(events) >= total:
            break
    return events
