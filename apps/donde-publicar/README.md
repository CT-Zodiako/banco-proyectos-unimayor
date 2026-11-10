# ¿Dónde publicar este proyecto? — journal finder for the UNIMAYOR IoT project bank

Static page that suggests, for each of the 100 projects of the
[Banco de Proyectos IoT](https://banco-proyectos-unimayor-production.up.railway.app/proyectos), journals that are:

1. **Indexed** — have a best quartile (Q1–Q4) in [SCImago](https://www.scimagojr.com/).
2. **Free to publish** — [DOAJ](https://doaj.org/) lists no APC *and* no other fees.
3. **Free to read** — listed in DOAJ (open access). Together with (2): diamond open access.

For each project the page shows two views with the same filters and sort:

- **Lista** (default, design 04): journals ranked by an estimated affinity (0–100 %) shown as a ring, with a
  "¿Por qué X %?" breakdown that also lists, in words, what the journal meets ("Cumple") and misses ("No cumple")
  for the project and gives recommendations (`assessment` in `site/table.js`), template download, author instructions,
  scope and links.
- **Tabla** (design 02): sortable comparison table and a side-by-side comparison of up to 3 journals.

"⚙ Filtros personalizados" opens a side panel that crosses minimum affinity, quartile/Publindex, maximum weeks,
language, region, minimum SJR and H index, review process, CC BY license and fit, plus saved filters (built-in
"Semillero" and "Grupo", and the user's own, stored in the browser's localStorage). The affinity combines topic fit
40, quartile vs project level 25, publication time 15, language 10 and Ibero-American journal 10; it is not an
acceptance probability (no public acceptance-rate data exists). The page also shows the Publindex homologation (Q1=A1, Q2=A2, Q3=B, Q4=C), SJR, H index, languages,
review type, weeks to publication, license, SCImago categories and links to the journal, its author
instructions, DOAJ and SCImago.

## Layout

| Path | Purpose |
|---|---|
| `site/` | The page: `index.html`, `styles.css`, `app.js`, `table.js` (pure table logic), `logo.jpg`, generated `data.js` and `catalog.js` |
| `pipeline/donde_publicar.py` | Loading, filtering, joining and matching logic |
| `pipeline/build.py` | Command that generates `site/data.js` and `site/catalog.js` |
| `tests/` | Pipeline tests (Python `unittest`) and table logic tests (`node --test "tests/*.test.cjs"`) |
| `data/projects.json` | Projects exported from `apps/banco-proyectos` (`npm run export:projects`) |
| `data/templates.json` | Template files found by `python3 -E -m pipeline.templates` (optional input of the build) |
| `data/raw/` | DOAJ CSV and SCImago CSV (neither versioned; SCImago is downloaded by hand once a year) |
| `odd/tasks/donde-publicar.md` | Feature specification and decision log |

## Regenerate the data

The SCImago CSV is not versioned, so the weekly workflow `.github/workflows/actualizar-datos.yml` skips the journals
(see the root README). Refresh them locally with these steps and commit the generated `site/data.js` and
`site/catalog.js`; step 3 is needed only once a year, when SCImago publishes a new ranking.

1. **Projects**: exported from the project bank in this repository (all areas):
   `cd ../banco-proyectos && npm run export:projects` writes `data/projects.json`.
2. **DOAJ**: `curl -L -o data/raw/doaj/journals.csv https://doaj.org/csv`
3. **SCImago**: SCImago blocks automated downloads. Open
   <https://www.scimagojr.com/journalrank.php>, click **Download data** and save the file as
   `data/raw/scimago/scimagojr.csv`. Do not commit it: the folder is ignored by git.
4. Build and test:

```bash
python3 -E -m pipeline.build          # writes site/data.js and site/catalog.js
python3 -I -m unittest discover -s tests -t .
node --test "tests/*.test.cjs"                # comparison table logic
```

`pipeline.build` accepts `--projects`, `--doaj`, `--scimago`, `--out` and `--catalog-out` to override paths, and
`--doaj-date YYYY-MM-DD` for the day DOAJ was downloaded (default: the CSV's modification day). It records that date
and the SCImago edition (the year in the CSV's `Total Docs. (YYYY)` column) in `sources.doaj_downloaded` and
`sources.scimago_edition`; the page shows them as "DOAJ: 2026-11-09 · SCImago: edición 2025".
It exits with code 1 and `error: missing input file <path>` if an input is missing, and with code 1 without writing
anything when no DOAJ journal without fees has a SCImago quartile (e.g. a broken download).

## How journals are matched

Each project gets **sector themes** (agriculture, health, energy…) and **technology themes** (IoT,
AI, computer vision, cybersecurity…) from its area, sector and title. Each journal gets themes from its
SCImago categories (strong signal) and from its DOAJ keywords/subjects (weak signal, trusted only inside a
coherent SCImago area). Results are ranked:

1. **Encaje fuerte** — the journal covers the project's sector and publishes technology/engineering work.
2. **Encaje por tecnología** — computing or engineering journal that accepts applications from any sector.
3. **Encaje por sector** — sector journal without a clear technology signal.

Humanities- and library-science-led journals are excluded. Up to 60 journals are stored per project.
Matching is automatic: always read the journal's aims & scope and confirm fees before submitting.

## Preview locally

```bash
python3 -I -m http.server 8765 --bind 127.0.0.1 --directory site
# open http://127.0.0.1:8765/?p=proj_001
```

The page also works when `site/index.html` is opened directly from disk.

## How the project bank uses it

`apps/banco-proyectos` serves this page under `/donde-publicar/`: its `predev`/`prebuild` scripts run
`scripts/sync-donde-publicar.mjs`, which copies `site/` into `public/donde-publicar/` (not versioned). The
"¿Dónde publicar este proyecto?" buttons link to:

```
/donde-publicar/index.html?p=<project id>     e.g. ?p=proj_199
```

The explicit `index.html` works with both the Vite dev server and the Nginx image (no SPA rewrite needed). When a project is selected,
the header link goes back to `/proyecto/<id>`. Unknown or missing ids open the page with the project list.

## Downloadable templates

`python3 -E -m pipeline.templates` (network, ~1–2 minutes) reads each journal's instructions-for-authors page and
keeps only strict template files: `.docx/.dotx/.doc/.dot/.tex/.zip` links whose file name says *template* or
*plantilla*, hosted on the journal's own domain, that answer with a non-HTML file. Results go to
`data/templates.json`; run `python3 -E -m pipeline.build` afterwards and the "Formato" column shows
"⬇ Plantilla Word/LaTeX" buttons. Journals without a detected template keep the "Instrucciones ↗" link.

After changing projects in the bank, regenerate: `npm run export:projects` (in `apps/banco-proyectos`), then
`python3 -E -m pipeline.build` here.
