# UNIMAYOR research search tools

Monorepo for the search tools of the Laboratorio de Física y Sistemas Embebidos,
Institución Universitaria Colegio Mayor del Cauca.

| App | Path | What it does | Stack |
|---|---|---|---|
| Project bank | [`apps/banco-proyectos`](apps/banco-proyectos) | Catalog of 236 projects in 23 areas (the original 100 IoT projects plus new areas), filters by area and sector, project detail | React 18, Vite 5, Tailwind 3, React Router, deployed on Railway |
| Where to publish | [`apps/donde-publicar`](apps/donde-publicar) | Indexed (SCImago Q1–Q4), no-APC, free-to-read journals (DOAJ) for each project | Python 3 data pipeline + static HTML/JS |
| Event finder | [`apps/eventos`](apps/eventos) | Calls for papers and events to attend (WikiCFP, ccf-deadlines, Devpost and a manual file of local events) | Python 3 data pipeline + static HTML/JS |

Each app is independent: it has its own dependencies, build and deploy.

## Project bank

```bash
cd apps/banco-proyectos
npm install
npm run dev        # local development
npm run build      # production build (dist/)
```

Projects are stored in `src/data/mockProjects.js` (original 100) and `src/data/projects/<area>.js` (new areas);
`npm test` validates them and `npm run lint` checks the code (ESLint, config in `.eslintrc.cjs`). The journal finder and the event finder are served by this app at `/donde-publicar/` and `/eventos/` (copied from
`apps/donde-publicar/site` and `apps/eventos/site` before `dev`/`build`). Each project links to both: "¿Dónde publicar este
proyecto?" (`/donde-publicar/index.html?p=<id>`) and "¿A qué eventos ir?" (`/eventos/index.html?p=<id>`, events ranked by
estimated affinity with the project). Deployment: see Railway deployment below.

## Saved opportunities

The project bank's **Mis oportunidades** page (`/oportunidades`) gathers events and journals saved from their cards. Favorites are kept only in the current browser's local storage, are not synchronized between devices, and can be lost when browser data is cleared. Saved events can download calendar files for their start and submission deadline when those dates are known; preparation checklists offer guidance for events and journals, link to the saved official source when available, and are not persisted. From that page, export a JSON backup of favorites, statuses and notes, or preview a backup before importing it. Import keeps existing records unchanged when the same type and ID already exist, including their notes and status; malformed files are rejected. The JSON file contains personal notes, so store it securely. Official sources remain authoritative.

## Railway deployment

The private GitHub repository `CT-Zodiako/banco-proyectos-unimayor` is connected to the
Railway project and service `banco-proyectos-unimayor` (production, branch `master`).
Pushes to `master` trigger a deployment using the root `Dockerfile`.

The multi-stage image builds the project bank and copies the journal finder and the event finder, then
serves the static output with Nginx. `PORT` defaults to `8080`; SPA deep links fall
back to `index.html`, while missing files under `/donde-publicar/` and `/eventos/` return 404.

```bash
docker build -t publicaciones .
docker run --rm -p 8080:8080 publicaciones
```

Public URL: https://banco-proyectos-unimayor-production.up.railway.app
No Python pipeline runs at deploy time: the journal and event data are generated beforehand and committed.

## Automatic data refresh

The workflow [`.github/workflows/actualizar-datos.yml`](.github/workflows/actualizar-datos.yml) refreshes the
journal finder and the event finder every Monday at 09:00 UTC (04:00 in Colombia). To refresh on demand, open
**Actions → Actualizar revistas y eventos → Run workflow** on GitHub.

Each run:

1. Exports the bank projects to `apps/donde-publicar/data/projects.json`.
2. Journals: runs the tests, downloads DOAJ, and rebuilds with the SCImago CSV stored in the repository.
3. Events: runs the tests and rebuilds with `--require-all-sources` (WikiCFP, ccf-deadlines, Devpost and the manual
   file).
4. Commits whatever was refreshed to `master` (`chore(data): refresh journals and events <date>`), which makes
   Railway redeploy.

An app whose tests, download or build fails keeps its previous data, and the run ends as failed, so GitHub e-mails
the owner. A source outage never publishes an emptier catalog: the journal build refuses an empty DOAJ/SCImago join,
and the event build refuses to write when any public source fails.

**Once a year, update SCImago by hand.** SCImago blocks scripted downloads and publishes a new ranking yearly.
Download it as described in [`apps/donde-publicar/README.md`](apps/donde-publicar/README.md#regenerate-the-data),
replace `apps/donde-publicar/data/raw/scimago/scimagojr.csv`, commit it, and run the workflow. The journal page shows
the dates in use ("DOAJ: 2026-11-09 · SCImago: edición 2025").

## Where to publish

See [`apps/donde-publicar/README.md`](apps/donde-publicar/README.md). Run its commands from that folder:

```bash
cd apps/donde-publicar
python3 -I -m unittest discover -s tests -t .
python3 -E -m pipeline.build
```

The DOAJ download in `apps/donde-publicar/data/raw/doaj/` is not versioned. The SCImago CSV in
`apps/donde-publicar/data/raw/scimago/` is versioned so the weekly workflow can use it.

## Event finder

See [`apps/eventos/README.md`](apps/eventos/README.md). Run its commands from that folder:

```bash
cd apps/eventos
python3 -I -m unittest discover -s tests -t .
node --test "tests/*.test.cjs"
python3 -E -m pipeline.build      # downloads the sources (about 4-5 minutes) and writes site/data.js
```

Local Colombian events go in `apps/eventos/data/manual-events.json`. Downloads are cached in
`apps/eventos/data/raw/` (not versioned).

## Repository notes

- `odd/` holds feature specifications and decision logs.
- `sources/` holds the original documents and extraction outputs of the project bank (not used by the apps).
- `.backup/` (ignored) keeps the empty Git repository the project bank came with (no commits, no remote).
