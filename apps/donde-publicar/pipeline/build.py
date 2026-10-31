"""Build site/data.js and site/catalog.js from the project bundle, the DOAJ CSV and the SCImago CSV.

site/data.js holds the projects and the journals suggested for them; site/catalog.js holds every
diamond open access journal with a SCImago quartile (loaded on demand by the catalog tab).

Usage (from the repository root):
    python3 -E -m pipeline.build
"""

import argparse
import datetime
import json
import pathlib
import sys

from pipeline import donde_publicar as dp

ROOT = pathlib.Path(__file__).resolve().parent.parent


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--projects", default=ROOT / "data/raw/projects-bundle.json", type=pathlib.Path)
    parser.add_argument("--doaj", default=ROOT / "data/raw/doaj/journals.csv", type=pathlib.Path)
    parser.add_argument("--scimago", default=ROOT / "data/raw/scimago/scimagojr.csv", type=pathlib.Path)
    parser.add_argument("--out", default=ROOT / "site/data.js", type=pathlib.Path)
    parser.add_argument("--catalog-out", default=ROOT / "site/catalog.js", type=pathlib.Path)
    args = parser.parse_args(argv)

    for path in (args.projects, args.doaj, args.scimago):
        if not path.is_file():
            print(f"error: missing input file {path}", file=sys.stderr)
            return 1

    raw_projects = json.loads(args.projects.read_text(encoding="utf-8"))
    projects = [dp.normalize_project(p) for p in raw_projects]
    with args.doaj.open(encoding="utf-8", newline="") as handle:
        doaj = dp.load_doaj(handle)
    with args.scimago.open(encoding="utf-8-sig", newline="") as handle:
        scimago = dp.load_scimago(handle)
    journals = dp.build_journals(doaj, scimago)

    used = set()
    for project in projects:
        tech, domain = dp.project_themes(project)
        project["themes"] = {"tech": tech, "domain": domain}
        project["matches"] = dp.match_project(project, journals)
        used.update(m["journal_id"] for m in project["matches"])

    keep = ("id", "title", "issns", "url", "doaj_url", "author_instructions_url", "scimago_url", "publisher",
            "country", "languages", "license", "review", "weeks_to_publication", "quartile", "sjr", "h_index",
            "categories", "publindex", "themes")
    def slim(journal):
        return {k: journal.get(k) for k in keep}

    payload = {
        "generated": datetime.date.today().isoformat(),
        "sources": {"doaj_free_journals": len(doaj), "scimago_ranked_issns": len(scimago),
                    "diamond_ranked_journals": len(journals)},
        "themes": {theme: spec["label"] for theme, spec in dp.THEMES.items()},
        "projects": projects,
        "journals": [slim(j) for j in journals if j["id"] in used],
    }
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text("window.DONDE_PUBLICAR = " + json.dumps(payload, ensure_ascii=False) + ";\n",
                        encoding="utf-8")
    catalog = [slim(j) for j in journals if not dp.is_humanities_led([c["name"] for c in j["categories"]])]
    args.catalog_out.write_text("window.DONDE_PUBLICAR_CATALOGO = " + json.dumps(catalog, ensure_ascii=False) + ";\n",
                                encoding="utf-8")
    print(f"projects={len(projects)} doaj_free={len(doaj)} diamond_ranked={len(journals)} "
          f"journals_used={len(used)} catalog={len(catalog)} out={args.out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
