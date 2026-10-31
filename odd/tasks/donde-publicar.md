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
- S6. "cuando seleciono un proyecot esta […] el boton de donde publicar quier que ese boton ahora funcione redirgiendo y
  selecioando dodne o puedo publciar con loque hicmos en elrpoyecto de donde-publicar la idea es que seleciono voy a la
  otra pagina y me entrega el rsutlado de segun mi proyecot donde puedo publciar" — for every project of the bank.
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
| T7 | Read all bank projects from the repo (export script) instead of the scraped bundle; themes for the 11 new areas (tests first) | S1, S6 | inline | done (L16), uncommitted |
| T8 | Serve the page inside banco-proyectos at /donde-publicar/ (sync step) and point both buttons there with ?p=<id> | S6 | inline | done (L16), uncommitted |
| T9 | Verify: every project gets journals; click from project detail lands on its results (ego-lite) | S6 | inline | done (L17) |
| T10 | Implement design 02-tabla-comparativa: sortable table, filters, compare up to 3 journals, bank identity (tests first for table logic) | S4, S6 | inline | done (L22), uncommitted |
| T11 | Add explained "afinidad estimada" (0–100 %) to the comparison table: column, default sort, breakdown in compare tray, disclaimer, help (tests first) | S4, S6 | inline | done (L24), uncommitted |
| T12 | Advanced filters panel to cross more variables (affinity, weeks, language, region, SJR, H index, review, license) with active-filter chips (tests first) | S4, S6 | inline | done (L26), uncommitted |
| T13 | Per-journal "Formato" link to the journal's author instructions (publication format) in the table (and aims & scope when available) | S4, S6 | inline | done (L26), uncommitted |
| T14 | Downloadable templates: offline crawler finds strict template files on each journal's instructions page; "⬇ Plantilla" buttons in the Formato column (tests first) | S4, S6 | inline | done (L29), uncommitted |
| T15 | Implement design 04-afinidad-y-filtros as the default list view (affinity ring + breakdown, toolbar, custom filters side panel with presets); table (02) kept as second view with shared filters (tests first) | S4, S6 | inline | done (L31), uncommitted |

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
- L14 (user, verbatim): S6 text above, with a screenshot of the yellow "¿Dónde publicar este proyecto?" button on a
  project detail page.
- L15 (decision): the journal finder is served by the bank app itself under /donde-publicar/ (copied from
  apps/donde-publicar/site by a predev/prebuild sync, not committed twice), linked as
  /donde-publicar/index.html?p=<id> (explicit index.html works with both Vite dev and Firebase Hosting). The button
  navigates instead of opening the old platform-links modal. Project source: the bank's own data, exported to JSON.
- L16 (evidence): donde-publicar tests 32/32 (RED observed for new-area themes, university-setting rule, creative
  industry, new sectors, remote sensing); banco tests 20/20 (links RED→GREEN). Differential check against the committed
  pipeline: 0 of the original 100 projects changed themes. 210 projects, ≥29 journals each. Old projects-bundle.json
  removed (source is now data/projects.json from `npm run export:projects`).
- L17 (evidence, ego-lite on Vite dev): both buttons on /proyecto/proj_199 link to
  /donde-publicar/index.html?p=proj_199; landing shows that project with 60 journals (Urban Informatics, Journal of
  Spatial Information Science…); "← Volver al proyecto" returns to /proyecto/proj_199; catalog card link lands on its
  project; production build contains donde-publicar/; no console errors.
- L18 (user, verbatim): "vamos a mejora la interfaz de dodne-publico abre el disain dame propuestas" →
  design/donde-publicar-resultados/ (01-resultados-por-encaje, 02-tabla-comparativa, 03-ruta-por-perfil), in the
  bank's identity; none chosen yet. Observed while preparing them: technology-only matches include noise (e.g.
  Satellite Navigation for the prosthesis project) and "Health Informatics" pulls science-editing journals.
- L19 (user, verbatim): "sacame un porsentaje de probabildidad de que se peuda publicar en la revista y ehaz un boton de
  filtros custom para filtrar por mas variables".
- L20 (decision, explained to the user): no acceptance-rate data exists in DOAJ or SCImago, so a real publication
  probability cannot be computed. Designed instead an explained "afinidad estimada" 0–100 %: topic fit 40, quartile vs
  project level 25, Spanish accepted 10, publication time 15, Latin American journal 10, labelled as not an acceptance
  probability. Artboard design/donde-publicar-resultados/04-afinidad-y-filtros.html adds a custom filters panel
  (min affinity, quartile, max weeks, language, region, SJR, H index, review type, license, fit, hide discarded, saved
  presets).
- L21 (handoff): design/donde-publicar-resultados/02-tabla-comparativa.html chosen for implementation (01, 03, 04 are
  alternatives) → T10.
- L22 (evidence): site/table.js pure logic, 8 node tests (RED: missing module; then 2 real defects fixed — quartile
  desc must be the exact reverse, best H index with a single known value). Page rewritten in the bank identity
  (crest, tokens from design/system.md): sortable table, quartile/fit/Spanish filters, search, compare up to 3 with
  best-value highlight and links; catalog and help kept as tabs; picker when opened without ?p=. ego-lite on Vite dev:
  sort both directions, filters (Q3 20, Tecnología 22, Español 5, "biomedical" 14), compare cap disables 57 rows,
  remove/clear, catalog 2,700 (Q1 383), picker → ?p=proj_201, mobile scrolls only inside the table, no console errors.
  Python 32/32, banco 20/20.
- L23 (user, verbatim): "tuviste enceunta enel deisno que implentaste lodel porcentaje de probaildiad de publicacion ?" →
  answered no (affinity only lived in artboard 04); then "si agregalo respeta el diseno" → T11. Formula as in L20:
  topic fit 40, quartile vs project level 25, publication time 15, language 10, Ibero-American journal 10; computed in
  site/table.js from data already in data.js.
- L24 (evidence): T.affinity in site/table.js, 16 node tests (8 new seen RED; one existing assertion extended for the new
  `affinity` key of compareBest). Table: "Afinidad" column with bar (≥80 green, 65–79 blue, <65 orange), default sort
  desc, breakdown tooltip; compare tray rows "Afinidad estimada" (best highlighted) and "Desglose"; disclaimer note and
  help card. Fixed a real defect found while testing: the fixed compare tray covered the last table rows (static 260 px
  padding) → padding now equals the tray's height. ego-lite proj_161: range 31–84 %, noise (Visual Intelligence, CSEE)
  sinks to 31 %, last row above the tray, no console errors. Artboard 02 updated to match (real values). Python 32/32,
  banco 20/20.
- L25 (user, verbatim): "ahroa pon el boton o dodne quieras lo de los filtros para cruzarlos y otra cosa cada revsita tiene
  su formato de publicacion quiero poder navegar a ese formato" → T12 (button "Filtros avanzados" in the filter bar,
  panel opens below it so it never covers the table) and T13 ("Formato" column linking to the DOAJ "instructions for
  authors" URL).
- L26 (evidence): table.js advanced filters (ADVANCED_DEFAULTS, reviewTypes, countAdvanced), 21 node tests (5 new seen
  RED); pipeline keeps aims_scope_url (33 Python tests, new ones seen RED/FAIL); 535/535 journals have both
  instructions and aims & scope URLs. UI: "Filtros avanzados" button with badge in the filter bar, panel below it
  (affinity slider, max weeks slider, language, region, SJR, H index, review types, CC BY), live apply, removable
  chips, reset, Escape closes and returns focus; "Formato" column (Instrucciones ↗, Alcance ↗) and Alcance in compare
  tray and catalog cards. Defects found while testing and fixed: number input rejected the decimal comma (now text
  with inputmode decimal), license option styled as a heading, mismatched footer button sizes. ego-lite proj_161:
  affinity≥75 → 8; +≤12 weeks +double blind → 3; +Spanish → 1; "0,2" accepted; no console errors. Artboard 02
  updated (button + Formato column).
- L27 (user, verbatim): "podemso genrar que el formato lo descarguedandole click ?" → spike on 20 journals: 2 real
  templates (FBT .docx; CDBME Word + LaTeX), 2 false positives (copyright form CTA.docx; another journal's template on a
  different domain), ~10 pages without templates, ~6 unreadable (blocked or JavaScript-rendered).
- L28 (user decision, verbatim): "1" → automatic detection with a strict filter only (no hand-curated list). Rules:
  .docx/.dotx/.doc/.dot/.tex/.zip whose file name says template/plantilla, same registered domain as the journal or its
  instructions page, and the URL must answer with a non-HTML file. Expected coverage ~10–15 %; other journals keep
  "Instrucciones ↗".
- L29 (evidence): pipeline/templates.py (detection, registered-domain rule, URL normalization, shared-template filter,
  SSL-chain fallback via curl, per-journal error isolation) + build merges data/templates.json; 47 Python tests (all new
  ones seen RED). Crawl defects found and fixed in order: (1) python.org build without CA bundle → 515 false
  "unreachable" (now system bundle, verification kept on); (2) raw spaces in a template URL crashed the whole crawl;
  (3) a publisher-platform template appeared for 3 journals (NPE) → kept only for its own journal; (4) 46 sites with
  incomplete TLS chains recovered with curl. Final: 75 of 535 journals (14 %), 103 files (Word 84, ZIP 11, LaTeX 8);
  remaining failures are real (403 ×61, 404 ×24, timeouts ×17, expired certs ×2). UI: "⬇ Plantilla Word/LaTeX/(ZIP)"
  buttons (same tab + download, file name tooltip, "Word · portada/texto" when repeated) in Formato column and compare
  tray. ego-lite: clicking FBT template downloaded a real 5.9 MB Word 2007+ file and the page stayed; table fits 1440 px
  without horizontal scroll. Artboard 02 updated.
- L30 (handoff): design/donde-publicar-resultados/04-afinidad-y-filtros.html handed off → T15. Decision: 04 becomes the
  default "Lista" view; the implemented 02 table stays as a "Tabla" view (comparator and column sorting kept); both
  views share one filter model (multi-select quartile and fit pills replace the 02 quick segmented filters).
- L31 (evidence): table.js gained multi-select quartiles/fits, PRESETS, applyPreset, makePreset, affinityLevel (25 node
  tests; 4 new seen RED). Page: project card, toolbar (search, sort select, Lista|Tabla, "⚙ Filtros personalizados"
  with badge), chips with "Limpiar todo", list rows (affinity ring, open breakdown on first row, template/instructions
  actions), side panel (sticky, closes with Escape/×/"Ver N revistas"), built-in and user presets in localStorage
  (empty name rejected). Not implemented from the artboard: "Ocultar revistas que descarté" (no discard action exists).
  Defect found and fixed: table bar CSS (.aff-high span) painted the ring's text. ego-lite proj_161: affinity≥65 +
  Q2/Q3 + Sector+tecnología → 17; Semillero → 5; own preset saved, applied and kept after reload; table view keeps
  filters/sort and the comparator; mobile without horizontal scroll; no console errors.
- L12 (user, verbatim): "primero vmaos a unir el proyecot en el mismo repositorio los dos proyecotsp orque vna a
  funcion igual ya uqe mas adelante tendremso un buscador de eventos"; clarified: "vamos a guarda el que busca
  las revistas el de los proyecot y futuramente el de los eventos".
- L13 (decision): monorepo layout. This feature moved to apps/donde-publicar/ (site/, pipeline/, tests/, data/,
  README.md; paths in this document are now relative to that folder). The project bank ("Proyectos SBC-IoT 2")
  moved to apps/banco-proyectos/; its empty nested .git (0 commits, no remote) kept in ignored .backup/.
  Future event finder goes to apps/eventos/. Reservations system stays outside.
