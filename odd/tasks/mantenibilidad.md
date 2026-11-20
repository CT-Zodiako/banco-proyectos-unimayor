# Mantenibilidad: dead code, data weight, interaction tests
Follow-up to the React migration assessment. Branch: feat/mantenibilidad (from feat/panel-publicar-eventos).

## Specs
- S1: "arreglemos lo que conviene" — the three fixes recommended: (1) heavy data, (2) dead PublishingModal code, (3) interaction tests.
- S2: Dead code removed: PublishingModal.jsx, data/publishingPlatforms.js, hooks/usePublishingPlatforms.js (no references anywhere). Lint, tests and build stay green.
- S3: Data weight: publicar-data.json (2.4 MB), publicar-catalog.json (2.6 MB) and eventos.json (0.3 MB) are no longer bundled in JS chunks; they are static files fetched at runtime, with nginx gzip enabled (currently no gzip in deploy/default.conf.template). Pipelines write to the new location; workflow, Dockerfile, README and tests updated; page behavior unchanged (loading and error states, lazy panel).
- S4: Interaction tests with a DOM test library cover: the project panel (open via ?panel=, tab switch, Esc closes and returns focus, escape-hatch links), LegacyRedirect for /eventos/index.html and /donde-publicar/index.html keeping query and hash, and filters on /eventos and /donde-publicar. `npm test` runs them with the existing tests.

## Tasks
- T1 (S2) remove dead code. Route: parent git rm (deletion only). Commit: pending
- T2 (S3) data to static files + gzip. Route: gentle-ai-worker. Commit: pending
- T3 (S4) DOM interaction tests, after T2 (they pin final loading behavior). Route: gentle-ai-worker. Commit: pending

## Log
- L1: arreglemos lo que conviene (after the assessment: "es necesario un rework total o de algunas cosas para todo? o que tal se ve es entendible?")
- L2: T1 c7e5b45, T2 b026210, T3 294a621. Verified: lint clean, 193 node tests + 32 DOM tests pass, build ok, Docker run showed gzip on /data/*.json and 404 on a missing data file. Not covered: modal mode / focus trap (jsdom has no matchMedia).
