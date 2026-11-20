# mejora-visual — improve the visual style (colors, sections, filters) without changing the product

Goal: keep the identity (institutional blue #00428A, yellow #FFC107, Inter, white cards) and make every page understandable, pleasant and usable, so a visitor knows what each element does.

## Specs

- S1: "no quiero camibslo quiero mejroarlo" — keep the current identity and layout logic; refine, do not redesign from scratch.
- S2: "colors esccioens filtro" — improve colors, sections and filters across all the pages.
- S3: "la diea es que sea entnedible agrable usable y que sepas que hace cada cosa" — every control and label says what it does (legends, labels, tooltips), color carries one meaning, filters show their state.
- S4: Behavior, data, routes and URLs do not change (visual/markup/copy only); all tests, lint and build stay green.

## Tasks

- T1 (S1-S3): design directions in `design/mejora-visual/` (3 artboards + design.json) — route: writer; commit: pending
- T2 (S2-S4): implement the chosen direction (01-refinado-fiel) on /proyectos: tokens + shared components (badges, filters, cards, nav) — route: writer; verified: npm test 200 unit + 51 DOM, lint, build, 1440/390 renders; commit: feat(catalogo) in git log
- T3 (S2-S4): apply to Eventos and Dónde publicar pages — route: writer; verified: npm test 207 unit + 67 DOM, lint, build, 1440/390 renders (no horizontal overflow; /proyectos computed styles identical before/after); commit: pending
- T4 (S3-S4): home page polish, responsive and accessibility pass, update `design/system.md` — route: writer; commit: pending

## Log

- L1 (user, verbatim): "quiero mejorar el estilo visual que tiene ahora no quiero camibslo quiero mejroarlo colors esccioens filtro entre todol oque tien la diea es que sea entnedible agrable usable y que sepas que hace cada cosa"
- L2 (T1, writer): design directions in `design/mejora-visual/` — `01-refinado-fiel.html`, `02-filtros-arriba.html`, `03-guiado-por-pasos.html` (same catalog screen, three structures) and `04-componentes.html` (component set, before→after, color meaning, computed WCAG AA contrast) plus `design.json`; covers S1-S3, S4 untouched (no app source edited); no artboard chosen yet — the others are alternatives. T1 commit: pending.
- L3 (user choice): artboard design/mejora-visual/01-refinado-fiel.html chosen; 02 and 03 are alternatives.
- L4 (T3, writer): /eventos and /donde-publicar (and the project panel where it shares components) use the /proyectos language: labeled filter sections with one-line helpers, active-filter chips + «Limpiar filtros» on /eventos, compact «Datos actualizados el …» line with native `<details>`, event card with badges/icons/primary «Ver convocatoria», «Ver mapa» tertiary link, journal rows with one blue affinity ring + «alta/media/baja», quartile as text + bars (no color; replaces white on #c27c0e), «Más información» row, «Ver por qué N % de afinidad», results legend, Lista/Tabla segmented control. Covers S2-S3; S4: filter logic, URLs, routes and data unchanged. Tests: tests/dom/eventos-publicar-visual.test.jsx plus unit tests for the new lib helpers. T3 commit: pending.
