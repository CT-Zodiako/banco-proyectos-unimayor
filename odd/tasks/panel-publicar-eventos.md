# Panel lateral: publicar y eventos dentro del proyecto
Implement design/proyecto-publicar-eventos/02-panel-lateral.html in apps/banco-proyectos (ProjectDetail).
Chosen artboard: 02-panel-lateral (01 and 03 are alternatives). Branch: feat/panel-publicar-eventos (from feat/todo-en-react).

## Specs
- S1: "poder ver toda la informacion de donde publicar y los eventos dentro del mismo proyecto no ir a la otra web" — from the project detail page, a slide-over panel (Revistas | Eventos tabs) shows the full journal and event information for that project without navigating away.
- S2: "no quitar lo de la otra web solo ir si es necesario si queremos ver la informacion en general" — standalone /donde-publicar and /eventos pages stay unchanged; the panel offers "Abrir en la página completa" linking to `/donde-publicar?p=<id>` and `/eventos?p=<id>`.
- S3: Panel behavior per artboard: wide screens push the page and keep the project visible; "Ampliar" turns it into a modal; under ~1100 px it is a modal/full screen; filters open as a sheet inside the panel; compare tray (max 3) collapses to a bar; Esc closes and returns focus; focus trapped when modal.
- S4: Reuse existing logic and components (src/lib/publicar, src/lib/eventos, components/publicar, components/eventos, src/lib/opportunities.js favorites); no duplicated stores or forks of the logic. Journal data (~2.4 MB) is lazy-loaded on first open.
- S5: Panel open state is in the URL (e.g. `?panel=revistas|eventos`) so it is shareable and back works. Tests for new pure logic; `npm run lint`, `npm test`, `npm run build` pass; tokens from design/system.md.

## Tasks
- T1 (S1-S5) implement the panel in ProjectDetail with reuse of existing components; tests; README note. Route: gentle-ai-worker. Commit: pending

## Log
- L1: Implement the design artboard design/proyecto-publicar-eventos/02-panel-lateral.html (handoff from gentle-design; tradeoff: "gives up width and simplicity: the table needs «Ampliar» (which turns the panel into a modal), the compare tray competes for a 760 px column, and it adds a new overlay surface with its own focus and URL state to maintain").
- L2: Original user request: "ahora quiero hacer una mejora en poder ver toda la informacion de donde publicar y los eventos dentro del mismo proyecto no ir a la otra web pero no quitar lo de la otra web solo ir si es necesario si queremos ver la informacion en general"
