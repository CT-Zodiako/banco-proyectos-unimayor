# Feature: donde-publicar

Standalone page that crosses each of the 100 projects of the UNIMAYOR IoT project bank with indexed,
no-APC, free-to-read journals, using SCImago (quartile/category) and DOAJ (open access, APC).
Lives in /Users/zodiako/DEV/publicaciones (static HTML + JSON); the app button links to it per project.

## Specs

- S1. Cross every project with journals: "vamos hacer un cruze de cada proyecto en cual podriamos publicar"
  — all 100 projects from https://reserva-de-laboratorio-26ae0.web.app/proyectos.
- S2. Journals must have an indexed quartile: "teniendo la categoria de revista indexada q4 q3.." —
  categorized with "https://www.scimagojr.com/" (Q1–Q4).
- S3. "sin apc" and "que el lector la pueda leer de forma gratuit" — classified with "https://doaj.org/"
  ("clasifica si es sin apc si es libre, entre otras"); information extracted from DOAJ.
- S4. "envia toda esta inforacion a una pagina que sea usable y entendible".
- S5. Placement decided by the user: "Página independiente aquí (recomendado)" — static page in this
  folder, deep-linkable per project (?p=proj_001) so the existing button can link to it.

## Tasks

| ID | Task | Specs | Route | Evidence |
|---|---|---|---|---|
| T1 | Extract the 100 projects from the app bundle (data/raw/projects-bundle.json, normalized into site/data.js) | S1 | inline | done: 100 projects extracted |
| T2 | Download DOAJ CSV and SCImago CSV to data/raw | S2, S3 | inline | done: DOAJ 23,570 rows; SCImago 2025 (32,193) via user download (L5) |
| T3 | Build journals dataset: DOAJ no-APC OA joined with SCImago quartile by ISSN (tests first) | S2, S3 | inline | done: 14,498 free DOAJ → 4,222 diamond ranked; RED/GREEN observed |
| T4 | Match each project to journals by subject categories + keywords, ranked (tests first) | S1 | inline | done: 60 matches per project; RED/GREEN per rule (L6, L8) |
| T5 | Build usable page (project list, per-project journals, filters, deep link) | S4, S5 | inline | done: site/index.html, styles.css, app.js |
| T6 | Verify end to end in the browser and document regeneration/linking in README | S1–S5 | inline | done: ego-lite checks (L9); 24 unit/e2e tests pass; README |

Note: folder is not a Git repository, so no work-unit commits are recorded.

## Log

- L1 (user, verbatim): "ahora antes de eso el proyecot de lso 100 proyecots tiene un boton que dice donde
  publicar este proyecto vamos hacer un cruze de cada proyecto en cual podriamos publicar teniendo la
  categoria de revista indexada q4 q3.. , sin apc, que el lector la pueda leer de forma gratuit, has la
  busqueda en https://www.scimagojr.com/ para categorizar las revistas y en la https://doaj.org/ clasifica
  si es sin apc si es libre, entre otras , y saca al informacion de https://doaj.org/  y envia toda esta
  inforacion a una pagina que sea usable  y entendible"
- L2 (user decision): "Página independiente aquí (recomendado)".
- L3 (evidence): current button "¿Dónde publicar este proyecto?" opens a modal with generic search links
  (DOAJ, OpenAlex, SciELO, Redalyc, IEEE Xplore...) passing a search term; no concrete journals.
- L4 (decision): free-to-read + no APC means diamond OA only; hybrid subscription journals are excluded.
- L5 (evidence): SCImago blocks automated download (Cloudflare 403); user downloaded "scimagojr 2025.csv"
  to ~/Downloads and authorized copying it to data/raw/scimago/.
- L6 (evidence): first matching pass used DOAJ keywords as strong signal and produced noise ("Historia
  Agraria" for the agriculture IoT project). Decision: SCImago categories are the strong signal; DOAJ
  keywords only count inside a coherent SCImago area.
- L7 (user, verbatim): "utliza ego-lite para porbar todo" — browser verification uses ego-browser (ego-lite).
- L8 (decision): ranking order is strong fit (domain + technology) > technology-only > domain-only, because
  domain-only journals rarely accept engineering papers. Applied-technology signal = SCImago area
  Engineering/Computer Science or specific keywords (not generic "technology"/"monitoring"). Humanities- and
  library-science-led journals are excluded. Project title also contributes technology themes.
- L9 (evidence, ego-lite space 58): deep link ?p=proj_001 renders 60 suggestions (19 Q1/8 Q2/21 Q3/12 Q4);
  Q1-only filter shows only Q1; Q1+Spanish shows empty-state message; Spanish-only shows only journals
  accepting Spanish; sort by speed ascending (4,5,6,8 weeks); "Ver más" 15→30; search "ddos" + Enter
  opens proj_052 and updates URL; area filter (aerospace) 10 projects; catalog 2,702 journals, "colombia"
  78; file:// mode works incl. catalog; unknown id ?p=proj_999 shows list; mobile 390px no horizontal
  scroll; no console errors. Fixed: quartile stat cards were unreadable (class clash .q1).
- L10 (evidence): journals excluded by the user's criteria, not by error: TecnoLógicas (no SCImago
  quartile); Ingeniería y Universidad, JART, Computación y Sistemas (free but not listed in DOAJ).
- L11 (evidence): independent gentle-ai-verify: S1–S5 PASS; all 437/2,702 journals cross-checked against
  raw DOAJ (APC No, other fees No) and SCImago (best quartile); no XSS path in app.js. Advisories fixed:
  duplicate SCImago source ids deduplicated (RED→GREEN test, catalog 2,700 unique), UI copy switched to
  neutral formal Spanish, README notes the trailing slash for the deep link. 25 tests pass.
- L12 (user, verbatim): "primero vmaos a unir el proyecot en el mismo repositorio los dos proyecotsp orque vna a
  funcion igual ya uqe mas adelante tendremso un buscador de eventos"; clarified: "vamos a guarda el que busca
  las revistas el de los proyecot y futuramente el de los eventos".
- L13 (decision): monorepo layout. This feature moved to apps/donde-publicar/ (site/, pipeline/, tests/, data/,
  README.md; paths in this document are now relative to that folder). The project bank ("Proyectos SBC-IoT 2")
  moved to apps/banco-proyectos/; its empty nested .git (0 commits, no remote) kept in ignored .backup/.
  Future event finder goes to apps/eventos/. Reservations system stays outside.
