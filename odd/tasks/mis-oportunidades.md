# Mis oportunidades
Objective: local favorites, calendar and preparation; branch: feat/mis-oportunidades.
Delivery: auto-chain; chain_strategy=feature-branch-chain; forecast: approximately 400+ lines. Tests: Node tests, Python suites, browser checks.

## Specs
- S1: «Guardar favoritos desde las tarjetas de eventos y revistas.»
- S2: «Verlos juntos en una lista, separados por tipo.»
- S3: «Agregar al calendario la fecha de un evento o el cierre de una convocatoria.»
- S4: «Mostrar una lista simple de preparación con enlaces a las instrucciones oficiales.»
- S5: «sin cuentas, guardando los favoritos en el navegador»; «levant todo el proyecot apra ver».
- S6: «Estado: Por revisar, Preparando, Enviado o Descartado.»; «Una nota personal editable por oportunidad.»; «Filtro por estado en “Mis oportunidades”.»; «Guardado en localStorage».
- S7: «Exportar favoritos, estados y notas a un archivo.»; «Importarlos después o en otro navegador.»; «Antes de importar, mostrar qué se va a agregar y cómo se resolverán los duplicados, sin borrar datos silenciosamente.»

## Tasks
- T1 [S1-S2,S5] inline done — invalid-entry storage safety RED/GREEN; commit pending.
- T2 [S3-S4] inline done — calendar and preparation; calendar unit tests and browser download/checklist observed; commit pending.
- T3 [S1-S5] inline blocked — independent verifier unavailable; requires user decision on missing independent proof; commit pending.
- T4 [S6] inline blocked — implementation and functional checks passed; independent verification unavailable, awaiting user decision; commit pending.
- T5 [S7] inline blocked — backup implemented and functional checks passed; independent verifier unavailable; user decision required; commit pending.

## Log
- L1: «Dale conitnua si quieres levant todo el proyecot apra ver»
- Prior authorized proposal quoted in S1–S5. Existing worktree changes predate this feature and must be preserved.
- T1: Node tests passed; browser saved and removed one event and one journal through the unified list.
- T2: calendar RED/GREEN observed; browser downloaded evento.ics and opened the checklist.
- T1 reopened and fixed: invalid new entries are rejected without changing stored favorites (RED/GREEN observed).
- T3: build and browser journeys succeeded; independent verifier failed with an assistant error and is unavailable. Native assessment could not assess untracked scope. Pending independent proof and user decision; no commit created.
- L2: «vale hazlo» (authorizes S6).
- T4: storage RED/GREEN, 38 bank tests, lint and build passed; browser confirmed saving, reload and filter. Independent verification remains unavailable; no commit created.
- L3: «no evale»; «dale hazlo» (authorizes S7). Assumption: preserve existing items on duplicate type and ID, including their notes and status.
- T5: RED/GREEN backup tests; 41 bank tests, lint and build passed. Browser verified an empty, non-mutating import preview/confirmation and backup download. Native assessment was unassessable, and the prior independent verifier is unavailable.
- L4: «commitea no depsleigues y sigmaos con los demas mejoras»; delivery choice: «Cadena sobre una rama de seguimiento». No push, PR or deployment authorized.
