# Todo en React
Migrate the two static pages (donde-publicar, eventos) into the React app apps/banco-proyectos.
Python pipelines stay (data generation); only the front end moves. Branch: feat/todo-en-react.

## Specs
- S1: "quiero proemro qu quede todo en react" — no page served as vanilla HTML/JS; donde-publicar and eventos become React routes/components in apps/banco-proyectos/src.
- S2: Existing URLs keep working: `/donde-publicar/index.html?p=<id>` and `/eventos/index.html?p=<id>` (project detail links) must still land on the right React view with the same project preselected.
- S3: Python pipelines (apps/*/pipeline) keep generating data, now as JSON consumed by React (committed, no Python at deploy time). Pipeline tests keep passing.
- S4: Behavior parity: filters, affinity ring/"¿Por qué X %?", table + compare (donde-publicar); filters, map, affinity (eventos); favorites via existing Mis oportunidades. Pure-logic JS tests (table, filters, affinity, map) are ported and still pass.
- S5: sync scripts, Dockerfile, GitHub workflow, READMEs and the root README stack table updated. `npm run lint`, `npm test`, `npm run build` pass; Python tests pass.

## Tasks
- T1 (S1,S2,S3,S4,S5) eventos -> React; route, data JSON, tests, docs, sync/Docker/workflow for eventos. Route: gentle-ai-worker. Commit: pending
- T2 (S1,S2,S3,S4,S5) donde-publicar -> React; same, after T1 (shared App.jsx/Dockerfile/workflow). Route: gentle-ai-worker. Commit: pending
- T3 (S5) cleanup: remove obsolete vanilla sites and sync scripts, update root README, final verification. Route: gentle-ai-worker. Commit: pending

## Log
- L1: quiero proemro qu quede todo en react
- L2: T1 decision: deploy/default.conf.template belongs to T2 (remove both /eventos/ and /donde-publicar/ nginx 404 blocks so the SPA fallback serves legacy URLs). T3 deletes obsolete files (sync scripts, apps/*/site, stale .cjs tests, .gitignore line for public/eventos).
- L3: T2 commit 0c7b04a, T3 commit fa395a6. Independent verify: S1-S5 met; rendered client redirect not exercised in a DOM (writer exercised it in headless Chrome for donde-publicar); missing files with extension now return 200 SPA index (planned, L2).
