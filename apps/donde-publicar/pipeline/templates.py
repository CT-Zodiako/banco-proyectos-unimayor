"""Find downloadable manuscript templates on each journal's "instructions for authors" page.

Strict rules (a wrong template is worse than none):
  * the link is an <a href> to a .docx/.dotx/.doc/.dot/.tex/.zip file,
  * its file name says "template" or "plantilla",
  * it is hosted on the journal's own registered domain (or the instructions page's),
  * when crawling, the URL answers 200 with a non-HTML content type.

Usage (network; from apps/donde-publicar, after `python3 -E -m pipeline.build`):
    python3 -E -m pipeline.templates            # writes data/templates.json, then rebuild
"""

import argparse
import concurrent.futures
import datetime
import json
import os
import pathlib
import re
import ssl
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parent.parent
EXTENSIONS = {".docx": "Word", ".dotx": "Word", ".doc": "Word", ".dot": "Word", ".tex": "LaTeX", ".zip": None}
NAME_WORDS = ("template", "plantilla")
SECOND_LEVEL = {"ac", "co", "com", "edu", "gov", "gob", "org", "net", "mil", "nic", "res"}
USER_AGENT = "Mozilla/5.0 (UNIMAYOR journal finder; template discovery)"


class _LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            href = dict(attrs).get("href")
            if href:
                self.hrefs.append(href.strip())


def registered_domain(url):
    """example: fbt.tums.ac.ir -> tums.ac.ir; www.degruyter.com -> degruyter.com."""
    host = (urllib.parse.urlsplit(url).hostname or "").lower()
    labels = host.split(".")
    if len(labels) >= 3 and labels[-2] in SECOND_LEVEL:
        return ".".join(labels[-3:])
    return ".".join(labels[-2:])


def _kind(path):
    name = urllib.parse.unquote(path.rsplit("/", 1)[-1]).lower()
    extension = "." + name.rsplit(".", 1)[-1] if "." in name else ""
    if extension not in EXTENSIONS or not any(word in name for word in NAME_WORDS):
        return None
    if EXTENSIONS[extension]:
        return EXTENSIONS[extension]
    return "LaTeX" if "latex" in name or "tex" in name.replace(".zip", "") else "Archivo ZIP"


def _normalize(url):
    """Percent-encode unsafe characters (e.g. spaces) without double-encoding existing escapes."""
    parts = urllib.parse.urlsplit(url)
    path = urllib.parse.quote(parts.path, safe="/%:@!$&'()*+,;=-._~")
    query = urllib.parse.quote(parts.query, safe="/%:@!$&'()*+,;=-._~?")
    return urllib.parse.urlunsplit((parts.scheme, parts.netloc, path, query, ""))


def find_template_links(html, page_url, journal_url=None):
    """Template files linked from an instructions page, as [{"url", "kind"}] in page order, without duplicates."""
    parser = _LinkParser()
    parser.feed(html or "")
    allowed = {registered_domain(page_url)} | ({registered_domain(journal_url)} if journal_url else set())
    found, seen = [], set()
    for href in parser.hrefs:
        url = _normalize(urllib.parse.urljoin(page_url, href))
        parts = urllib.parse.urlsplit(url)
        if parts.scheme not in ("http", "https") or registered_domain(url) not in allowed:
            continue
        kind = _kind(parts.path)
        if kind and url not in seen:
            seen.add(url)
            found.append({"url": url, "kind": kind})
    return found


CONNECTORS = {"and", "of", "the", "in", "for", "on", "at", "to", "y", "de", "la", "el", "los", "las", "del", "en", "e", "da", "do"}


def acronym(title):
    """Initials of the significant words: "Nanotechnology and Precision Engineering" -> "npe"."""
    words = [w for w in re.split(r"[^\w]+", title.lower()) if w and w not in CONNECTORS]
    return "".join(w[0] for w in words)


def drop_foreign_shared(results, journals):
    """A template URL found for several journals (shared publisher platform) stays only for the journals whose
    acronym or publisher matches the file name's leading token; templates found once are always kept."""
    counts = {}
    for templates in results.values():
        for template in templates:
            counts[template["url"]] = counts.get(template["url"], 0) + 1
    kept = {}
    for journal_id, templates in results.items():
        journal = journals.get(journal_id, {})
        own = []
        for template in templates:
            if counts[template["url"]] > 1:
                name = urllib.parse.unquote(urllib.parse.urlsplit(template["url"]).path.rsplit("/", 1)[-1]).lower()
                token = re.split(r"[-_. ]+", name)[0]
                if token != acronym(journal.get("title", "")) and token not in journal.get("publisher", "").lower():
                    continue
            own.append(template)
        if own:
            kept[journal_id] = own
    return kept


def looks_like_file(status, content_type):
    return status == 200 and "text/html" not in (content_type or "").lower()


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


def _request(url, method, timeout):
    request = urllib.request.Request(url, method=method, headers={"User-Agent": USER_AGENT})
    return urllib.request.urlopen(request, timeout=timeout, context=SSL_CONTEXT)  # noqa: S310 - http(s) URLs from DOAJ


def _fetch_page(url, timeout):
    with _request(url, "GET", timeout) as response:
        raw = response.read(3_000_000)
        charset = response.headers.get_content_charset() or "utf-8"
        return raw.decode(charset, errors="replace"), response.geturl()


def _fetch_page_curl(url, timeout):
    """Fallback for servers with incomplete TLS chains: curl verifies certificates too but completes the chain."""
    done = subprocess.run(["curl", "-sSL", "--max-time", str(int(timeout)), "-A", USER_AGENT,
                           "-w", "\n%{url_effective}", url], capture_output=True, check=True, timeout=timeout + 5)
    body, _, final_url = done.stdout.decode("utf-8", errors="replace").rpartition("\n")
    return body, final_url or url


def _file_ok_curl(url, timeout):
    try:
        done = subprocess.run(["curl", "-sSL", "-o", "/dev/null", "--max-time", str(int(timeout)), "-A", USER_AGENT,
                               "-w", "%{http_code} %{content_type}", url], capture_output=True, check=True, timeout=timeout + 5)
    except (subprocess.SubprocessError, OSError):
        return False
    status, _, content_type = done.stdout.decode().partition(" ")
    return looks_like_file(int(status or 0), content_type)


def _file_ok(url, timeout):
    for method in ("HEAD", "GET"):
        try:
            with _request(url, method, timeout) as response:
                return looks_like_file(response.status, response.headers.get("Content-Type"))
        except Exception:  # noqa: BLE001 - any failure means "not a verified file"
            continue
    return _file_ok_curl(url, timeout)


def _check_journal(journal, timeout):
    """Never raises: one journal with an unexpected error must not stop the crawl of the others."""
    try:
        return _check_journal_page(journal, timeout)
    except Exception as error:  # noqa: BLE001
        return journal["id"], [], f"error-{type(error).__name__}"


def _check_journal_page(journal, timeout):
    page = journal.get("author_instructions_url") or ""
    if not page.startswith(("http://", "https://")):
        return journal["id"], [], "no-url"
    try:
        html, final_url = _fetch_page(page, timeout)
    except urllib.error.HTTPError as error:
        return journal["id"], [], f"http-{error.code}"
    except urllib.error.URLError as error:
        reason = error.reason
        if not isinstance(reason, ssl.SSLError):
            return journal["id"], [], f"error-{type(reason).__name__}"
        try:
            html, final_url = _fetch_page_curl(page, timeout)
        except (subprocess.SubprocessError, OSError):
            return journal["id"], [], "error-ssl"
        candidates = find_template_links(html, final_url, journal.get("url"))
        return journal["id"], [t for t in candidates if _file_ok(t["url"], timeout)], "ok-curl"
    except (TimeoutError, ValueError, OSError) as error:
        return journal["id"], [], f"error-{type(error).__name__}"
    candidates = find_template_links(html, final_url, journal.get("url"))
    templates = [t for t in candidates if _file_ok(t["url"], timeout)]
    return journal["id"], templates, "ok"


def main(argv=None):
    parser = argparse.ArgumentParser(description="Find downloadable templates for the journals in site/data.js.")
    parser.add_argument("--data", default=ROOT / "site/data.js", type=pathlib.Path)
    parser.add_argument("--out", default=ROOT / "data/templates.json", type=pathlib.Path)
    parser.add_argument("--workers", default=16, type=int)
    parser.add_argument("--timeout", default=15, type=float)
    args = parser.parse_args(argv)
    if not args.data.is_file():
        print(f"error: missing input file {args.data}", file=sys.stderr)
        return 1
    text = args.data.read_text(encoding="utf-8")
    journals = json.loads(text[text.index("=") + 1:].strip().rstrip(";"))["journals"]

    results, statuses = {}, {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
        for journal_id, templates, status in pool.map(lambda j: _check_journal(j, args.timeout), journals):
            statuses[status] = statuses.get(status, 0) + 1
            if templates:
                results[journal_id] = templates
    results = drop_foreign_shared(results, {j["id"]: j for j in journals})
    args.out.parent.mkdir(parents=True, exist_ok=True)
    payload = {"checked": datetime.date.today().isoformat(), "journals": dict(sorted(results.items()))}
    args.out.write_text(json.dumps(payload, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"journals={len(journals)} with_templates={len(results)} "
          + " ".join(f"{k}={v}" for k, v in sorted(statuses.items())) + f" out={args.out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
