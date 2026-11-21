# UNIMAYOR research search tools

[![CI](https://github.com/CT-Zodiako/banco-proyectos-unimayor/actions/workflows/ci.yml/badge.svg)](https://github.com/CT-Zodiako/banco-proyectos-unimayor/actions/workflows/ci.yml)

Search tools of the Laboratorio de Física y Sistemas Embebidos, Institución Universitaria Colegio Mayor del Cauca:
a catalog of 236 student projects (23 areas) that also tells each project **which journals to publish in** and
**which events to attend**. One React app, two Python data pipelines, deployed on Railway:
https://banco-proyectos-unimayor-production.up.railway.app

| Piece | Path | What it does | Stack |
|---|---|---|---|
| Web app (project bank) | [`apps/banco-proyectos`](apps/banco-proyectos) | Catalog, project pages, comparison, journal finder, event finder, saved opportunities, global search | React 18, Vite 5, Tailwind 3, React Router 6 |
| Journal data | [`pipelines/donde-publicar`](pipelines/donde-publicar) | Indexed (SCImago Q1–Q4), no-APC, free-to-read (DOAJ) journals matched to each project | Python 3 (generates `publicar-data.json` and `publicar-catalog.json`) |
| Event data | [`pipelines/eventos`](pipelines/eventos) | Calls for papers and events to attend (WikiCFP, ccf-deadlines, Devpost and a manual file of local events) | Python 3 (generates `eventos.json`) |

The pipelines only generate JSON into `apps/banco-proyectos/public/data`; that JSON is committed, so deploying needs no Python.

```text
apps/banco-proyectos/   the web app: src/ (pages, components, lib, data), tests/, scripts/, public/data/
pipelines/              donde-publicar/ and eventos/: pipeline/ code, tests/, data/ inputs, README.md each
.github/workflows/      ci.yml (checks) and actualizar-datos.yml (weekly data refresh)
deploy/                 Nginx config used by the Docker image (Dockerfile at the root)
design/                 design system (system.md) and the design artboards
odd/                    feature specifications and decision logs
sources/                original documents of the project bank (not used by the app)
```

## What the app does

| Route | What you get |
|---|---|
| `/` | Home: intro, links to the two tools, the bank in figures |
| `/proyectos` | Catalog: text search, filters (area, level, sector), sort, pages of 12, active-filter chips each with a remove button, «Compartir esta búsqueda», and a **Comparar** toggle on each card that fills a tray (max 3) |
| `/proyectos/comparar` | Side-by-side comparison of 2–3 projects, with toggles «Resaltar diferencias» and «Ocultar filas iguales» and «Compartir comparación» |
| `/proyecto/:id` | Full project; «¿Dónde publicar?» and «¿A qué eventos ir?» open a slide-over (`?panel=revistas\|eventos`) with the project preselected |
| `/eventos` | Event finder: type selector (all / convocatorias / para asistir), topic, modality, Colombia, text, city, date range (dd/mm/aaaa), sort, «show more», comparison of up to 3 events; with a project selected, ranked by affinity |
| `/donde-publicar` | Journal finder: tabs «Revistas del proyecto» / «Catálogo completo» / «Cómo leer esta página», list and table views, filters (quartile, fit, affinity, weeks, language, region, SJR, h-index, review type, CC BY), journal comparison tray in table view |
| `/oportunidades` | «Mis oportunidades»: events and journals saved from cards, summary by status (toggle filters), toolbar (type, search, sort, list or board), calendar files, JSON backup |
| `/acerca`, `/contacto` | Static pages; any other address shows «Página no encontrada» |

The old `/donde-publicar/index.html?p=<id>` and `/eventos/index.html?p=<id>` still work: the router redirects them to the new routes.

**Global search.** The navbar «Buscar» button (or **Ctrl/⌘ K** anywhere, or **/** outside a text field) opens a dialog that searches
projects, open events and journals at once (`src/components/GlobalSearch*.jsx`, `src/lib/globalSearch.js`).

**Accessibility.** First tab stop is the skip link «Saltar al contenido»; one `header > nav`, `main` and `footer` per page; one `h1` per page;
each page sets its own `document.title`; legends are native `<details>`; every control has an accessible name.
Rules in force: [`design/system.md`](design/system.md) («Accessibility rules in force») (checked by `tests/dom/a11y-*.test.jsx`).

**Saved opportunities** live only in the browser's local storage: not synchronized between devices, lost if browser data is cleared.
Saved events can download calendar files (start and submission deadline, when known). Preparation checklists are guidance only and not
persisted. The JSON backup holds personal notes, so store it securely; importing keeps existing records (same type and ID) unchanged,
and malformed files are rejected. Official sources remain authoritative.

### URLs are shareable

Filters live in the URL, so a copied address reproduces the view (same address in a fresh tab gives the same results). Unknown or invalid values are ignored.

| Route | Params | Defined in |
|---|---|---|
| `/proyectos` | `q`, `area` and `nivel` (repeatable), `sector`, `orden` (`numero`\|`recientes`), `pagina`, `cmp` (selected ids, max 3) | `src/pages/ProjectsCatalog.jsx`, `src/lib/compare-projects.js` |
| `/proyectos/comparar` | `ids` (2–3 comma-separated project ids) | `src/pages/CompareProjects.jsx` |
| `/proyecto/:id` | `panel` (`revistas`\|`eventos`) | `src/lib/project-panel.js` |
| `/eventos` | `p`, `kind` (`cfp`\|`attend`), `tema`, `modalidad`, `co=1`, `q`, `orden`, `desde`, `hasta` (`YYYY-MM-DD`), `lugar` | `src/lib/eventos/filters.js` |
| `/donde-publicar` | `p`, `seccion` (`proyecto`\|`catalogo`\|`ayuda`), `vista=tabla`, `q`, `orden`, `dir`, `cuartil`, `ajuste`, `afinidad`, `semanas`, `idioma`, `region`, `sjr`, `h`, `revision`, `ccby` | `src/lib/publicar/finderUrl.js` |
| `/oportunidades` | `tipo` (`eventos`\|`revistas`), `estado`, `q`, `orden` (`nombre`\|`estado`\|`fecha`), `vista=tablero` (the saved items stay local) | `src/lib/opportunitiesView.js` |

Adding a filter means adding its param in the file above and keeping the existing params working (published links must not break).

## Architecture notes

**Lazy routes and chunks.** Only Home and the shell of `/proyectos` are in the entry chunk; every other page is a lazy chunk declared in
[`src/lib/routeChunks.js`](apps/banco-proyectos/src/lib/routeChunks.js) (`lazyRoute`: «Reintentar» re-downloads a failed chunk; hovering or focusing a link prefetches it).
[`vite.config.js`](apps/banco-proyectos/vite.config.js) does two more things: `manualChunks` gives `react`, `router`, `motion` and `icons` their own
long-lived vendor chunks and splits the project data (below); a `route-preload` plugin writes a small script into `index.html` that adds
`<link rel="modulepreload">` for the chunks of `ROUTE_PRELOADS` according to `location.pathname`, so a shared link does not wait for the entry to find its chunks.
A new page goes in `routeChunks.js`, `App.jsx` and `ROUTE_PRELOADS`.

**Two project datasets.**

| Dataset | Where | Read by |
|---|---|---|
| Full projects | `src/data/baseProjects.js` (original 100) + `src/data/projects/<area>.js`, merged by `src/data/projects/index.js` | project page and comparison (chunk `projects-data`, via `src/lib/projects-loader.js`) |
| Light index (generated, committed) | `src/data/projects-index.js`: `id`, `titulo`, `descripcion`, `area`, `sector`, `nivel`, `duracion` and the hardware/software counts | catalog, global search, Home figures (chunk `projects-index`) |

`npm run build:projects-index` runs `scripts/build-projects-index.mjs`, which rewrites `src/data/projects-index.js` from the full data (never edit that file by hand).
It also runs automatically as `prebuild` before every `npm run build`. After changing any project, run it and commit the result:
`tests/projects-index.test.mjs` fails with this command's name when the file is stale, and CI fails on a `git diff` after the build.
Other project scripts: `npm run check:area -- src/data/projects/<area>.js` (validates one area module) and `npm run export:projects` (writes `pipelines/donde-publicar/data/projects.json`).

**Finder data.** `public/data/{publicar-data,publicar-catalog,eventos}.json` are not bundled in the JS: the app fetches `/data/<file>` at runtime through
`src/lib/data-loader.js` (one shared download per file; `DATA_FILES` lists them). Nginx gzips them and the browser revalidates them, because the weekly refresh replaces them.

**Design tokens.** [`src/lib/palette.js`](apps/banco-proyectos/src/lib/palette.js) is the single source of the hex values of the «meaning» hues (journals teal,
events purple, quartiles Q1–Q4, good/fair/low, …) and of the contrast pairs that must reach AA. `src/index.css` holds a generated copy between
`/* palette:begin` and `/* palette:end */`; `tests/palette.test.mjs` fails when it is out of date. To regenerate, from `apps/banco-proyectos`, print the block and
paste it over the one in `src/index.css` (the command does not write the file):

```bash
node -e "import('./src/lib/palette.js').then((m) => console.log(m.paletteCss()))"
```

Brand blue `#00428A`, yellow `#FFC107` and the rest of the tokens, components and rules are in [`design/system.md`](design/system.md); one color means one thing.

**Shared components** (`apps/banco-proyectos/src/components/`):

| Component | Use it for |
|---|---|
| `PageHeader` | The header card (hue, icon, eyebrow, the page's only `h1`) of `/eventos`, `/donde-publicar`, `/proyectos/comparar`, `/oportunidades` |
| `ShareSearchButton` | «Compartir esta búsqueda»: copies the current address and announces it in a live region |
| `CollapsibleLegend` | «Cómo leer…» legends: native `<details>`, open from 700 px, folded below |
| `DataGate` | Waits for a `public/data` file: skeleton while loading, error with retry, then renders `children(data)` |
| `RouteLoader` | Wraps a lazy page: skeleton while its chunk downloads, «Reintentar» when it fails |

## Development

Node 22 (CI and Docker use it) for the app; Python 3 (CI uses 3.12) for the pipelines. Run app commands from `apps/banco-proyectos`:

```bash
npm install
npm run dev               # local development
npm run build             # production build (dist/); runs the prebuild first (projects index)
npm run lint              # ESLint, code and tests, zero warnings allowed
npm test                  # test:unit + test:dom
npm run test:unit         # node --test "tests/*.test.mjs": pure logic and committed data
npm run test:dom          # Vitest + jsdom + Testing Library: tests/dom/*.test.jsx
```

- **Unit** (`tests/*.test.mjs`): modules of `src/lib`, project data validation, the generated index, the palette, the finder data files and `vite.config.js`.
- **DOM** (`tests/dom/*.test.jsx`): the real `<App/>` driven through the UI with `fetch` mocked to serve small fixtures instead of `public/data/*.json`
  (routes, filters, URLs, legacy redirects, accessibility, lazy loading).
- **Performance budget**: after the build, the entry chunk `dist/assets/index-*.js` must stay under **120 kB** raw (about 66 kB today); CI fails above it.
  Check with `ls -l dist/assets/index-*.js`. Lazy-load new code instead of raising the budget (it is `BUDGET_BYTES` in `.github/workflows/ci.yml`).
- **Pipelines**: run each from its own folder (details in their READMEs).

```bash
cd pipelines/donde-publicar    # or pipelines/eventos
python3 -I -m unittest discover -s tests -t .
node --test "../../apps/banco-proyectos/tests/publicar-*.test.mjs"    # eventos-*.test.mjs for the event finder
python3 -E -m pipeline.build   # donde-publicar: needs data/raw/doaj and data/raw/scimago; eventos: downloads sources, 4-5 minutes
```

Guides: [`pipelines/donde-publicar/README.md`](pipelines/donde-publicar/README.md) (inputs, matching rules, downloadable templates) and
[`pipelines/eventos/README.md`](pipelines/eventos/README.md) (sources, parsing, manual events file `data/manual-events.json`, affinity, `--offline`, `--require-all-sources`).
Local Colombian events go in `pipelines/eventos/data/manual-events.json`; downloads are cached in `pipelines/eventos/data/raw/` (not versioned).
The DOAJ download in `pipelines/donde-publicar/data/raw/doaj/` is not versioned; the SCImago CSV next to it is, so the weekly workflow can use it.

## CI and delivery

The [`CI`](.github/workflows/ci.yml) workflow runs on every push (any branch), every pull request and on demand; three jobs run in parallel, and a new push cancels the previous run of the same ref.

| Job | Checks |
|---|---|
| `web` | `npm ci`, lint, unit tests, DOM tests, build, **generated `src/data/projects-index.js` is committed up to date** (`git diff`), **entry chunk ≤ 120 kB** |
| `pipelines` | For each pipeline: its Python tests and the JS data tests (`publicar-*` / `eventos-*`), which only import pure modules and read committed JSON (no `npm install`) |
| `docker` | `docker build` of the production image, as Railway builds it |

**Railway deploys `master` automatically and does not wait for CI**: a red CI never stops a deploy. Treat CI as a gate on the pull request, not on `master`.
Optional hardening: enable «Wait for CI» in the Railway service settings so a deploy starts only when these checks pass (noted in `ci.yml`).

The [`Actualizar revistas y eventos`](.github/workflows/actualizar-datos.yml) workflow refreshes the data every Monday at 09:00 UTC (04:00 in Colombia); its
`chore(data): …` commit to `master` makes Railway redeploy. **To run it by hand:** GitHub → *Actions* → *Actualizar revistas y eventos* → *Run workflow* (`workflow_dispatch`),
and pick `master`: the run checks out and pushes to the branch you pick.

## Railway deployment

The private GitHub repository `CT-Zodiako/banco-proyectos-unimayor` is connected to the
Railway project and service `banco-proyectos-unimayor` (production, branch `master`).
Pushes to `master` trigger a deployment using the root `Dockerfile`.

The multi-stage image builds the project bank (`npm ci` and `npm run build` in `apps/banco-proyectos`) and serves
`dist/` with Nginx; the journal and event pages are part of that build, so no other folder is copied. `PORT` defaults to
`8080`; every path that is not a file, including `/donde-publicar`, `/eventos` and their old `/index.html` URLs, falls
back to `index.html` and the React router handles it.

Nginx (`deploy/default.conf.template`) enables gzip for JSON, JS, CSS and HTML, caches the hashed `/assets/` for a year
(`immutable`), makes the browser revalidate `/data/*.json` and `index.html`, and answers a missing `/data/*` file with 404
instead of the single page app fallback.

```bash
docker build -t publicaciones .
docker run --rm -p 8080:8080 publicaciones
```

No Python pipeline runs at deploy time: the journal and event data are generated beforehand and committed.

## Automatic data refresh

Every run of the weekly workflow:

1. Exports the bank projects to `pipelines/donde-publicar/data/projects.json`.
2. Journals: runs the Python tests and the page-logic tests (`publicar-*.test.mjs`), downloads DOAJ, rebuilds
   `publicar-data.json` and `publicar-catalog.json` with the SCImago CSV stored in the repository, and checks them with
   `publicar-data.test.mjs`.
3. Events: runs the Python tests and the page-logic tests (`eventos-*.test.mjs`), rebuilds `eventos.json` with
   `--require-all-sources` (WikiCFP, ccf-deadlines, Devpost and the manual file), and checks it with
   `eventos-data.test.mjs`.
4. Commits whatever was refreshed (`pipelines/donde-publicar/data/projects.json` and the three JSON files in
   `apps/banco-proyectos/public/data`) to the branch it ran on (`master` for the schedule) as
   `chore(data): refresh journals and events <date>`, which makes Railway redeploy.

An app whose tests, download or build fails keeps its previous data, and the run ends as failed, so GitHub e-mails
the owner. A source outage never publishes an emptier catalog: the journal build refuses an empty DOAJ/SCImago join,
and the event build refuses to write when any public source fails.

- **Events cleaning.** After de-duplicating and dropping expired events, the pipeline's `clean_events` step strips source markers from titles (`AAIE--EI 2027` → `AAIE 2027`)
  and merges duplicate conferences; the build prints `deduplicated N events, cleaned M titles`. Rules and examples:
  [`pipelines/eventos/README.md`](pipelines/eventos/README.md#duplicates-and-expiry).
- **Journals** combine two sources: DOAJ (open access, no fees; downloaded every run) and the SCImago ranking (quartiles; versioned CSV).
  Matching to projects: [`pipelines/donde-publicar/README.md`](pipelines/donde-publicar/README.md#how-journals-are-matched).

**Once a year, update SCImago by hand.** SCImago blocks scripted downloads and publishes a new ranking yearly.
Download it as described in [`pipelines/donde-publicar/README.md`](pipelines/donde-publicar/README.md#regenerate-the-data),
replace `pipelines/donde-publicar/data/raw/scimago/scimagojr.csv`, commit it, and run the workflow. The journal page shows
the dates in use ("DOAJ: 2026-11-09 · SCImago: edición 2025").

## Contributing

1. Branch from `master` (for example `feat/…`, `fix/…`, `docs/…`).
2. Commit with [Conventional Commits](https://www.conventionalcommits.org/), as the history does: `feat(proyectos): …`, `fix(eventos): …`, `perf: …`, `docs: …`, `ci: …`, `chore(data): …` (the data bot).
3. Run `npm run lint` and `npm test` (and the pipeline tests if you touched `pipelines/`) before pushing.
4. Open a pull request and wait for **CI green**; then merge to `master`. Railway deploys it automatically (it does not wait for CI, so never merge red).

## Repository notes

- `odd/` holds feature specifications and decision logs.
- `sources/` holds the original documents and extraction outputs of the project bank (not used by the apps).
- `.backup/` (ignored) keeps the empty Git repository the project bank came with (no commits, no remote).
