# ¿Dónde publicar este proyecto? — journal finder for the UNIMAYOR IoT project bank

React page (a route of the project bank) that suggests, for each project of the
[Banco de Proyectos IoT](https://banco-proyectos-unimayor-production.up.railway.app/proyectos), journals that are:

1. **Indexed** — have a best quartile (Q1–Q4) in [SCImago](https://www.scimagojr.com/).
2. **Free to publish** — [DOAJ](https://doaj.org/) lists no APC *and* no other fees.
3. **Free to read** — listed in DOAJ (open access). Together with (2): diamond open access.

For each project the page shows two views with the same filters and sort:

- **Lista** (default, design 04): journals ranked by an estimated affinity (0–100 %) shown as a ring, with a
  "¿Por qué X %?" breakdown that also lists, in words, what the journal meets ("Cumple") and misses ("No cumple")
  for the project and gives recommendations (`assessment` in `src/lib/publicar/table.js`), template download, author instructions,
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
| `../../apps/banco-proyectos/public/data/publicar-data.json` | Generated data the page fetches at runtime from `/data/publicar-data.json`: projects and the journals suggested for them (committed) |
| `../../apps/banco-proyectos/public/data/publicar-catalog.json` | Generated catalog of every ranked diamond journal; the "Catálogo completo" tab loads it on demand (committed) |
| `../../apps/banco-proyectos/src/pages/DondePublicar.jsx` | The page; its components are in `src/components/publicar/` and its pure logic (`table.js`: filters, affinity, assessment, saved filters; `display.js`, `project.js`, `presets.js`, `favorites.js`) in `src/lib/publicar/` |
| `pipeline/donde_publicar.py` | Loading, filtering, joining and matching logic |
| `pipeline/build.py` | Command that generates `publicar-data.json` and `publicar-catalog.json` |
| `tests/` | Pipeline tests (Python `unittest`); the tests of the page logic are `apps/banco-proyectos/tests/publicar-*.test.mjs` |
| `data/projects.json` | Projects exported from `apps/banco-proyectos` (`npm run export:projects`) |
| `data/templates.json` | Template files found by `python3 -E -m pipeline.templates` (optional input of the build) |
| `data/raw/` | DOAJ CSV (not versioned) and SCImago CSV (versioned, replaced by hand once a year) |
| `odd/tasks/donde-publicar.md` | Feature specification and decision log |

## Regenerate the data

The workflow `.github/workflows/actualizar-datos.yml` runs these steps every Monday and from **Run workflow** (see the
root README). It downloads DOAJ but reuses the versioned SCImago CSV, so step 3 is the only manual step, once a year
when SCImago publishes a new ranking. Run the steps by hand only to check a change locally.

1. **Projects**: exported from the project bank in this repository (all areas):
   `cd ../../apps/banco-proyectos && npm run export:projects` writes `data/projects.json`.
2. **DOAJ**: `curl -L -o data/raw/doaj/journals.csv https://doaj.org/csv`
3. **SCImago**: SCImago blocks automated downloads. Open
   <https://www.scimagojr.com/journalrank.php>, click **Download data** and save the file as
   `data/raw/scimago/scimagojr.csv`. Commit this file: the weekly workflow uses it.
4. Build and test:

```bash
python3 -E -m pipeline.build          # writes publicar-data.json and publicar-catalog.json in apps/banco-proyectos/public/data
python3 -I -m unittest discover -s tests -t .
(cd ../../apps/banco-proyectos && npm test)   # page logic (publicar-*.test.mjs) and the committed data
```

The generated JSON is committed under `apps/banco-proyectos/public/data/` and is not part of the JavaScript bundle: the app fetches it at runtime from `/data/<file>.json` through `src/lib/data-loader.js`, so deploying needs no Python. `pipeline.build` accepts `--projects`, `--doaj`, `--scimago`, `--out` and `--catalog-out` to override paths, and
`--doaj-date YYYY-MM-DD` for the day DOAJ was downloaded (default: the CSV's modification day). It records that date
and the SCImago edition (the year in the CSV's `Total Docs. (YYYY)` column) in `sources.doaj_downloaded` and
`sources.scimago_edition`; the page shows them as "DOAJ: 2026-11-09 · SCImago: edición 2025".
It exits with code 1 and `error: missing input file <path>` if an input is missing, and with code 1 without writing
anything (`error: no DOAJ journal without fees has a SCImago quartile; publicar-data.json and publicar-catalog.json were not written`)
when no DOAJ journal without fees has a SCImago quartile (e.g. a broken download).

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
cd ../../apps/banco-proyectos
npm run dev
# open http://localhost:5173/donde-publicar?p=proj_001
```

## How the project bank uses it

The page is a lazy-loaded route of `apps/banco-proyectos`, `/donde-publicar` (`src/pages/DondePublicar.jsx`), linked
from the navbar and footer. The "¿Dónde publicar este proyecto?" buttons link to:

```
/donde-publicar?p=<project id>     e.g. ?p=proj_199
```

The old static URL `/donde-publicar/index.html?p=<project id>` (and the old `#<project id>` form) still works: the router
redirects it to `/donde-publicar` keeping the query and hash, and the Nginx image serves every unknown path with the
single page app. When a project is selected, the header link goes back to `/proyecto/<id>`. Unknown or missing ids open
the page with the project picker. "Guardar" uses the shared "Mis oportunidades" store (`src/lib/opportunities.js`), and
the user's saved filters live in the browser's localStorage under `donde-publicar.presets.v1`.

The project page (`/proyecto/<id>`) also shows these journals in a slide-over panel (`?panel=revistas`, tab "Revistas";
`src/components/proyecto-panel/`) without leaving the project. The panel reuses the list, table, filters sheet and compare
tray of this page (`src/components/publicar/`, `src/hooks/useJournalFinder.js`, `src/lib/publicar/`) and downloads
`/data/publicar-data.json` (shared with the page, see `src/lib/data-loader.js`) the first time it is opened; its "Abrir en la página completa" link goes to
`/donde-publicar?p=<project id>`, and this page keeps working as before.

## Downloadable templates

`python3 -E -m pipeline.templates` (network, ~1–2 minutes) reads each journal's instructions-for-authors page and
keeps only strict template files: `.docx/.dotx/.doc/.dot/.tex/.zip` links whose file name says *template* or
*plantilla*, hosted on the journal's own domain, that answer with a non-HTML file. Results go to
`data/templates.json`; run `python3 -E -m pipeline.build` afterwards and the "Formato" column shows
"⬇ Plantilla Word/LaTeX" buttons. Journals without a detected template keep the "Instrucciones ↗" link.

`python3 -E -m pipeline.templates` reads the journals of `publicar-data.json` (option `--data`).

After changing projects in the bank, regenerate: `npm run export:projects` (in `apps/banco-proyectos`), then
`python3 -E -m pipeline.build` here.
