# Automatic weekly refresh of journals and events

A GitHub Actions workflow refreshes the journal finder (DOAJ + SCImago CSV; skipped on GitHub because the CSV is kept only locally) and the event finder every
week and on demand, commits the generated data to `master` only when every check passes, and the journal page shows
the date of each source.

## Specs

- **S1** Scheduled + manual run: a workflow runs every Monday and from "Run workflow" (`workflow_dispatch`, the
  "botón"). User: "Un workflow de GitHub Actions que se ejecute cada lunes y que también se pueda lanzar a mano con
  "Run workflow", que hace de botón."
- **S2** Journals: the SCImago CSV (`apps/donde-publicar/data/raw/scimago/scimagojr.csv`) is not versioned. User:
  "no incluya el archivo en el git"; chosen option: "Solo en local, ignorado por git". The workflow skips the journals
  with a notice (not a failure) when the CSV is absent; journals are rebuilt locally and their `site/` data committed.
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

- T1 [S2 S5 S6] Journal build records DOAJ date and SCImago edition, refuses an empty join; page shows them — inline — done 6346d33
- T2 [S3 S5] Event build option that fails when any public source fails — inline — done 1d48c16
- T3 [S1 S2 S3 S4 S5] Workflow `.github/workflows/actualizar-datos.yml`, version the SCImago folder — inline — done 5b1b737
- T4 [S7] Docs (root, donde-publicar and eventos READMEs) — inline, with T1-T3 — done 5b1b737
- T5 [S2 S7] Ignore the SCImago folder, skip journals in the workflow without the CSV, update docs — inline — done 586e5d8

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
- **L6** Verification (2026-11-08, inline; the independent verifier was not admitted): all suites pass
  (donde-publicar 54 py + 31 node, eventos 54 py + 46 node, banco-proyectos 56 + lint). Workflow simulated in an
  isolated clone with a local bare origin: journals step failed with the missing-SCImago `::error` and the restore
  left `site/` clean; events step failed because every WikiCFP page timed out (`curl` to wikicfp.com also timed out
  from this machine; ccfddl answered 200), `--require-all-sources` wrote nothing, no commit, final step exits 1 (S5).
  Commit step alone, with a data change and a concurrent remote commit: rebased and pushed
  `chore(data): refresh journals and events <date>` as github-actions[bot]. Not provable locally: a run on GitHub
  (schedule, permissions, branch protection on master, runner access to WikiCFP) and the real SCImago CSV.
- **L7** (user, 2026-11-09) Placed the SCImago CSV from ~/Downloads (32,193 rows, edition 2025); isolated build
  passed (catalog=2701, doaj_downloaded 2026-11-10 UTC, scimago_edition 2025). Then: "no incluya el archivo en el git";
  chosen: "Solo en local, ignorado por git" → S2 rewritten, T5 added.
- **L8** Verification of T5 (gentle-ai-verify, 2026-11-09): S2, S4, S5, S7 met; no blockers or regressions. Advisories
  applied (header comments mentioning the journal skip). Unverified: a real GitHub run and the restore steps.
