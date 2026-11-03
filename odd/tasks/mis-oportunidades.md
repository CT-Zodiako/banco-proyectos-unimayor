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
- S8: «Guía para postular»; «Ampliar los pasos para preparar una ponencia o un artículo con enlaces oficiales.»

## Tasks
- T1 [S1-S2,S5] inline done — invalid-entry storage safety RED/GREEN; commit 93051e6.
- T2 [S3-S4] inline done — calendar and preparation; calendar unit tests and browser download/checklist observed; commit 93051e6.
- T3 [S1-S5] inline blocked — independent verifier unavailable; requires user decision on missing independent proof; implementation commit 93051e6.
- T4 [S6] inline blocked — implementation and functional checks passed; independent verification unavailable, awaiting user decision; implementation commit 93051e6.
- T5 [S7] inline blocked — backup implemented and functional checks passed; independent verifier unavailable; user decision required; implementation commit 93051e6.
- T6 [S8] inline done — guides, tests, browser checks and build passed; commit 3a0839c.
- T7 [S1-S8] delegated done — review follow-ups (RFC 5545 folding, named limits, dedicated favorite class, favorite UI tests); commit ca8a56f.

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
- Commit boundaries: design b881317; event discovery and opportunities 93051e6. The latter combines previously accumulated behavior and exceeds the review-size guideline; independent verification remains unavailable.
- L5: «Guía para postular» (selected improvement).
- T6: 44 Node tests, lint and build passed; browser verified six steps and official links for an event and a journal. The build warned about chunk size and stale Browserslist data. Commit 3a0839c: native assessment medium, review not due (under budget).
- Review receipt: approved and acknowledged (lineage review-24522d52dfc89517, target sha256:5656374c…). 13 non-blocking findings.
- L6: «dale» (act on the review findings). T7 delegated to a bounded writer; parent re-ran eventos 43/43, bank 47/47 and lint 0, confirmed the three storage copies byte-identical and checked a generated .ics (max 75 octets, folded space continuation, CRLF terminator). Commit ca8a56f assessed medium, under budget, review not due.
- Findings fixed: ICS CR/line folding (R1-ics-cr-escape, R3-ics-folding), duplicated size limit (R2-backup-size-limit-duplicated), comparison magic number (R2-comparison-limit-magic-number), favorite reused compare class (R2-favorite-uses-compare-class), stale filterEvents doc (R2-filterEvents-doc-stale), untested favorite UI (R3-favorite-ui-untested).
- Findings deliberately kept: R2-opportunities-store-triplicated (the three static/SPA copies are enforced identical by a test because the standalone pages cannot share a module), R4-favorites-all-or-nothing-read (refusing to overwrite unreadable stored data is the chosen safety rule), R3-event-id-dependency, R2-modality-label-inconsistent, R3-ics-folding residual risk, R2-system-html-minified.
- L7: «corrije» (fix the three remaining review findings). Fixed R3-ics-cr-escape-claim-unproved (escape now collapses CR, CRLF and LF to \n so a title cannot inject an iCalendar line; proven by test), R3-ics-terminator-unasserted (test asserts a single trailing CRLF) and R2-backup-size-unit-ambiguous (limit is now UTF-8 bytes, matching File.size, with a test where UTF-16 units fit but bytes do not).
- Correction to the earlier Log: the previously claimed CR escaping was NOT implemented before L7; the claim was corrected by implementing and testing it, not by rewording.
- Checks after L7: bank 50/50, eventos 43/43, lint 0, and a generated .ics inspected directly (injected line stays inside SUMMARY, file ends with one CRLF).
- L8: «agre agruapalos» (group the remaining review findings into one change). Applied R3-ics-lone-cr-unasserted (test for a lone CR), R3-utf8-length-no-early-exit (utf8Length stops at the limit) and R3-utf8-limit-throws-unmatched (the byte-limit test now asserts the error message).
- Honest note: the early exit is an internal optimization; no test proves it, because a timing assertion would be flaky. The added test proves only that a large oversized backup is rejected without touching stored data.
- Checks after L8: bank 52/52, eventos 43/43, lint 0, three storage copies byte-identical.
- L9: «cerremos con commit» (close the feature with a commit).
- Closing state: all T1-T7 done. No open implementation work. Delivery not performed: no push, no PR, no merge, no deployment; that remains the user's decision.
- Native review receipts (all approved and acknowledged): review-24522d52dfc89517 (initial candidate), review-ba33562fc0806e5b (ca8a56f fixes), review-dad916c560421ea7 (dedef63 fixes), review-a526532a54d461a8 (5b136a8 grouped fixes).
- Final checks at close: bank 52/52, eventos 43/43, lint ok, working tree clean.
- Known open advisory findings, deliberately left as later work: fold and size-limit boundary tests, favorite-test async polling, duplicated CSS, duplicated storage copies, all-or-nothing read of malformed favorites, event-id key dependency, modality label wording, single-line design/system.html.
