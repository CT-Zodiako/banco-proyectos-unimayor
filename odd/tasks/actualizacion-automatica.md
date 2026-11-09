# Automatic weekly refresh of journals and events

A GitHub Actions workflow refreshes the journal finder (DOAJ + versioned SCImago CSV) and the event finder every
week and on demand, commits the generated data to `master` only when every check passes, and the journal page shows
the date of each source.

## Specs

- **S1** Scheduled + manual run: a workflow runs every Monday and from "Run workflow" (`workflow_dispatch`, the
  "botón"). User: "Un workflow de GitHub Actions que se ejecute cada lunes y que también se pueda lanzar a mano con
  "Run workflow", que hace de botón."
- **S2** Journals: the workflow downloads DOAJ and rebuilds the journal data with the SCImago CSV stored in the
  repository (`apps/donde-publicar/data/raw/scimago/scimagojr.csv`, versioned, replaced by hand once a year).
- **S3** Events: the same workflow rebuilds the event data (WikiCFP, ccf-deadlines, Devpost, manual file).
- **S4** Direct commit to `master` only if the tests pass and the data changed: "Commit directo a master, solo si
  pasan los tests y solo si los datos cambiaron."
- **S5** "Si falla, no publica nada. GitHub te avisa por correo y la página sigue mostrando los datos anteriores."
  A failing app keeps its previous data; the run ends as failed. A source that fails as a whole (events) or an empty
  journal join (journals) must not overwrite the previous data.
- **S6** The journal page shows the date of each source, e.g. "DOAJ: 2026-11-09 · SCImago: edición 2025", instead of
  "La fecha indica cuándo se generó el catálogo, no cuándo se actualizaron DOAJ o SCImago. No se registra el estado
  individual de las fuentes."
- **S7** READMEs describe the automatic refresh and the yearly SCImago procedure.

## Tasks

- T1 [S2 S5 S6] Journal build records DOAJ date and SCImago edition, refuses an empty join; page shows them — inline — commit pending
- T2 [S3 S5] Event build option that fails when any public source fails — inline — commit pending
- T3 [S1 S2 S3 S4 S5] Workflow `.github/workflows/actualizar-datos.yml`, version the SCImago folder — inline — commit pending
- T4 [S7] Docs (root, donde-publicar and eventos READMEs) — inline, with T1-T3 — commit pending

## Log

- **L1** (user, original request): "Es posible que la página se actualice cada semana ella misma con DOAJ Y
  SCImago,o a partir de un darle click a un boton se actualice, ya que marca lo siguiente en el apartado de buscar
  donde publicar: "Estado de los datos Catálogo generado el 2026-10-31. La fecha indica cuándo se generó el catálogo,
  no cuándo se actualizaron DOAJ o SCImago. No se registra el estado individual de las fuentes. Confirme costos,
  requisitos y cuartil en las fuentes oficiales.""
- **L2** Evidence: `https://doaj.org/csv` downloads (HTTP 206 on a range request); SCImago
  `journalrank.php?out=xls` answers 403 to scripts. SCImago publishes yearly.
- **L3** (user) "que recomiendas" → recommendation: weekly + manual workflow, direct commit gated by tests, SCImago
  CSV in the repo, per-source dates on the page, events included as an option.
- **L4** (user) "Implementalo asi, incluye enventos y revistas".
- **L5** Decision: the events build in the workflow uses a new `--require-all-sources` option so a source outage
  does not publish a week without that source (S5); the journal build exits 1 when no journal survives the join.
