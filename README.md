# UNIMAYOR research search tools

Monorepo for the search tools of the Laboratorio de Física y Sistemas Embebidos,
Institución Universitaria Colegio Mayor del Cauca.

| App | Path | What it does | Stack |
|---|---|---|---|
| Project bank | [`apps/banco-proyectos`](apps/banco-proyectos) | Catalog of the 100 IoT projects, filters by area and sector, project detail | React 18, Vite 5, Tailwind 3, React Router, deployed on Railway |
| Where to publish | [`apps/donde-publicar`](apps/donde-publicar) | Indexed (SCImago Q1–Q4), no-APC, free-to-read journals (DOAJ) for each project | Python 3 data pipeline + static HTML/JS |
| Event finder | `apps/eventos` (planned) | Academic events search | — |

Each app is independent: it has its own dependencies, build and deploy.

## Project bank

```bash
cd apps/banco-proyectos
npm install
npm run dev        # local development
npm run build      # production build (dist/)
```

Projects are stored in `src/data/mockProjects.js` (original 100) and `src/data/projects/<area>.js` (new areas);
`npm test` validates them and `npm run lint` checks the code (ESLint, config in `.eslintrc.cjs`). The journal finder is served by this app at `/donde-publicar/` (copied from
`apps/donde-publicar/site` before `dev`/`build`). Deployment: see Railway deployment below.

## Railway deployment

The private GitHub repository `CT-Zodiako/banco-proyectos-unimayor` is connected to the
Railway project and service `banco-proyectos-unimayor` (production, branch `master`).
Pushes to `master` trigger a deployment using the root `Dockerfile`.

The multi-stage image builds the project bank and copies the journal finder, then
serves the static output with Nginx. `PORT` defaults to `8080`; SPA deep links fall
back to `index.html`, while missing journal finder files return 404.

```bash
docker build -t publicaciones .
docker run --rm -p 8080:8080 publicaciones
```

Public URL: https://banco-proyectos-unimayor-production.up.railway.app
No Python pipeline runs at deploy time: regenerate and commit journal data before deploying updates.

## Where to publish

See [`apps/donde-publicar/README.md`](apps/donde-publicar/README.md). Run its commands from that folder:

```bash
cd apps/donde-publicar
python3 -I -m unittest discover -s tests -t .
python3 -E -m pipeline.build
```

The DOAJ and SCImago downloads in `apps/donde-publicar/data/raw/` are not versioned (large third-party files).

## Repository notes

- `odd/` holds feature specifications and decision logs.
- `sources/` holds the original documents and extraction outputs of the project bank (not used by the apps).
- `.backup/` (ignored) keeps the empty Git repository the project bank came with (no commits, no remote).
