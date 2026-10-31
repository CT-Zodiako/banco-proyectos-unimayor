# UNIMAYOR research search tools

Monorepo for the search tools of the Laboratorio de Física y Sistemas Embebidos,
Institución Universitaria Colegio Mayor del Cauca.

| App | Path | What it does | Stack |
|---|---|---|---|
| Project bank | [`apps/banco-proyectos`](apps/banco-proyectos) | Catalog of the 100 IoT projects, filters by area and sector, project detail | React 18, Vite 5, Tailwind 3, React Router, Firebase Hosting |
| Where to publish | [`apps/donde-publicar`](apps/donde-publicar) | Indexed (SCImago Q1–Q4), no-APC, free-to-read journals (DOAJ) for each project | Python 3 data pipeline + static HTML/JS |
| Event finder | `apps/eventos` (planned) | Academic events search | — |

Each app is independent: it has its own dependencies, build and deploy.

## Project bank

```bash
cd apps/banco-proyectos
npm install
npm run dev        # local development
npm run deploy     # vite build + firebase deploy (project reserva-de-laboratorio-26ae0)
```

Projects are stored in `src/data/mockProjects.js` (original 100) and `src/data/projects/<area>.js` (new areas);
`npm test` validates them. The journal finder is served by this app at `/donde-publicar/` (copied from
`apps/donde-publicar/site` before `dev`/`build`). Deploying requires a Google account with access to the Firebase
project `reserva-de-laboratorio-26ae0`.

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
- `.backup/` (ignored) keeps the empty Git repository the project bank came with (no commits, no remote).
