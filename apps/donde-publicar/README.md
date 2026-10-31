# ¿Dónde publicar este proyecto? — journal finder for the UNIMAYOR IoT project bank

Static page that suggests, for each of the 100 projects of the
[Banco de Proyectos IoT](https://reserva-de-laboratorio-26ae0.web.app/proyectos), journals that are:

1. **Indexed** — have a best quartile (Q1–Q4) in [SCImago](https://www.scimagojr.com/).
2. **Free to publish** — [DOAJ](https://doaj.org/) lists no APC *and* no other fees.
3. **Free to read** — listed in DOAJ (open access). Together with (2): diamond open access.

The page also shows the Publindex homologation (Q1=A1, Q2=A2, Q3=B, Q4=C), SJR, H index, languages,
review type, weeks to publication, license, SCImago categories and links to the journal, its author
instructions, DOAJ and SCImago.

## Layout

| Path | Purpose |
|---|---|
| `site/` | The page: `index.html`, `styles.css`, `app.js`, generated `data.js` and `catalog.js` |
| `pipeline/donde_publicar.py` | Loading, filtering, joining and matching logic |
| `pipeline/build.py` | Command that generates `site/data.js` and `site/catalog.js` |
| `tests/` | Unit and end-to-end tests (stdlib `unittest`) |
| `data/raw/` | Input data: project bundle, DOAJ CSV, SCImago CSV (not published) |
| `odd/tasks/donde-publicar.md` | Feature specification and decision log |

## Regenerate the data

1. **Projects**: extracted from the app bundle into `data/raw/projects-bundle.json`.
2. **DOAJ**: `curl -L -o data/raw/doaj/journals.csv https://doaj.org/csv`
3. **SCImago**: SCImago blocks automated downloads. Open
   <https://www.scimagojr.com/journalrank.php>, click **Download data** and save the file as
   `data/raw/scimago/scimagojr.csv`.
4. Build and test:

```bash
python3 -E -m pipeline.build          # writes site/data.js and site/catalog.js
python3 -I -m unittest discover -s tests -t .
```

`pipeline.build` accepts `--projects`, `--doaj`, `--scimago`, `--out` and `--catalog-out` to override paths.
It exits with code 1 and `error: missing input file <path>` if an input is missing.

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

## Link it from the project bank

Deploy the contents of `site/` (for example under `/donde-publicar/` in Firebase Hosting) and point the
"¿Dónde publicar este proyecto?" button to:

```
https://<your-host>/donde-publicar/?p=<project id>     e.g. ?p=proj_001
```

Keep the trailing slash in `/donde-publicar/`: the page loads `styles.css`, `data.js` and `app.js` with
relative paths, so `/donde-publicar?p=...` (no slash) would look for them one level up.

Unknown or missing ids open the page with the project list.
