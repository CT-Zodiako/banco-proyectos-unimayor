"""Build site/data.js from WikiCFP, ccf-deadlines, Devpost and data/manual-events.json.

Also adds the bank project profiles (topics, keywords) from ../donde-publicar/data/projects.json.

Downloads are saved under data/raw/ (not versioned); --offline rebuilds from those saved files.

Usage (from apps/eventos):
    python3 -E -m pipeline.build              # download (about 4-5 minutes, WikiCFP asks 5 s between pages)
    python3 -E -m pipeline.build --offline    # rebuild from data/raw/
    python3 -E -m pipeline.build --require-all-sources   # weekly job: keep the old data if any source fails
"""

import argparse
import datetime
import json
import pathlib
import sys

from pipeline import eventos as ev
from pipeline import projects as pr
from pipeline import sources

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUBLIC_SOURCES = ("wikicfp", "ccfddl", "devpost")


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--manual", default=ROOT / "data/manual-events.json", type=pathlib.Path)
    parser.add_argument("--projects", default=ROOT.parent / "donde-publicar/data/projects.json",
                        type=pathlib.Path, help="bank projects export (npm run export:projects)")
    parser.add_argument("--raw", default=ROOT / "data/raw", type=pathlib.Path, help="download cache")
    parser.add_argument("--out", default=ROOT / "site/data.js", type=pathlib.Path)
    parser.add_argument("--offline", action="store_true", help="read data/raw/ instead of downloading")
    parser.add_argument("--require-all-sources", action="store_true",
                        help="exit 1 without writing when any public source fails (default: count it as 0)")
    parser.add_argument("--wikicfp-pages", default=5, type=int,
                        help="maximum pages (20 calls each) per WikiCFP topic; paging stops at past calls")
    parser.add_argument("--timeout", default=30, type=float, help="seconds per request")
    parser.add_argument("--today", type=datetime.date.fromisoformat, default=None,
                        help="YYYY-MM-DD used for expiry (default: today)")
    args = parser.parse_args(argv)
    today = args.today or datetime.date.today()

    if not args.manual.is_file():
        print(f"error: missing input file {args.manual}", file=sys.stderr)
        return 1
    try:
        manual = ev.validate_manual(json.loads(args.manual.read_text(encoding="utf-8")))
    except json.JSONDecodeError as error:
        print(f"error: {args.manual}: invalid JSON ({error})", file=sys.stderr)
        return 1
    except ev.ManualEventsError as error:
        print(f"error: {args.manual}: {error}", file=sys.stderr)
        return 1
    if args.projects.is_file():
        try:
            projects = pr.project_profiles(json.loads(args.projects.read_text(encoding="utf-8")))
        except json.JSONDecodeError as error:
            print(f"error: {args.projects}: invalid JSON ({error})", file=sys.stderr)
            return 1
        except pr.ProjectsError as error:
            print(f"error: {args.projects}: {error}", file=sys.stderr)
            return 1
    else:
        print(f"warning: missing projects file {args.projects}; writing projects: []", file=sys.stderr)
        projects = []

    loaders = {
        "wikicfp": lambda: sources.load_wikicfp(args.raw, args.offline, args.wikicfp_pages, today, args.timeout),
        "ccfddl": lambda: sources.load_ccfddl(args.raw, args.offline, today, args.timeout),
        "devpost": lambda: sources.load_devpost(args.raw, args.offline, args.timeout),
    }
    downloaded, failed = [], []
    for name in PUBLIC_SOURCES:
        try:
            downloaded.extend(loaders[name]())
        except Exception as error:  # noqa: BLE001 - one source failing must not stop the build
            print(f"warning: {name} failed: {error}", file=sys.stderr)
            failed.append(name)
    if len(failed) == len(PUBLIC_SOURCES):
        print("error: every public source failed; site/data.js was not written", file=sys.stderr)
        return 1
    if failed and args.require_all_sources:
        print(f"error: --require-all-sources: {', '.join(failed)} failed; site/data.js was not written",
              file=sys.stderr)
        return 1

    events = ev.drop_expired(ev.merge_events(manual + downloaded), today)
    counts = {name: 0 for name in PUBLIC_SOURCES + ("manual",)}
    for event in events:
        counts[event["source"]] += 1
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(ev.render_data_js(ev.build_payload(events, counts, today, projects)), encoding="utf-8")
    print(" ".join(f"{name}={count}" for name, count in counts.items())
          + f" events={len(events)} projects={len(projects)} out={args.out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
