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
No Python pipeline runs at deploy time: regenerate and commit journal and event data before deploying updates
(events expire quickly; see [`apps/eventos/README.md`](apps/eventos/README.md#refresh-before-pushing)).

## Where to publish

See [`apps/donde-publicar/README.md`](apps/donde-publicar/README.md). Run its commands from that folder:

```bash
cd apps/donde-publicar
python3 -I -m unittest discover -s tests -t .
python3 -E -m pipeline.build
```

The DOAJ and SCImago downloads in `apps/donde-publicar/data/raw/` are not versioned (large third-party files).

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
