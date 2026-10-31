# Feature: ampliar-areas

Expand the project bank (apps/banco-proyectos) with 11 new research areas and at least 10 projects per area,
using the same project format and UI as the existing 100 projects. Branch: feat/ampliar-areas.

## Specs

- S1. New areas, verbatim: "video juegos, ciberseguridad ,  desarrollo de sottware, arquitectura de software, redes
  tambien aple el area de medicina con aiot, bioingenieria, inteligencia artifical, ciberfiscina, machinlearning,
  robotica".
- S2. "has las areas nuevas y crea proyecots minimo 10 por area nueva".

## Tasks

| ID | Task | Specs | Route | Commit |
|---|---|---|---|---|
| T1 | Data infrastructure: per-area modules, aggregated `projects` export, validator + `npm test` (RED first) | S1, S2 | inline | — |
| T2 | Write 10 projects for "Desarrollo de Videojuegos" (proj_101–110) | S1, S2 | worker | — |
| T3 | Write 10 projects for "Ciberseguridad" (proj_111–120) | S1, S2 | worker | — |
| T4 | Write 10 projects for "Desarrollo de Software" (proj_121–130) | S1, S2 | worker | — |
| T5 | Write 10 projects for "Arquitectura de Software" (proj_131–140) | S1, S2 | worker | — |
| T6 | Write 10 projects for "Redes" (proj_141–150) | S1, S2 | worker | — |
| T7 | Write 10 projects for "Medicina con AIoT" (proj_151–160) | S1, S2 | worker | — |
| T8 | Write 10 projects for "Bioingeniería" (proj_161–170) | S1, S2 | worker | — |
| T9 | Write 10 projects for "Inteligencia Artificial" (proj_171–180) | S1, S2 | worker | — |
| T10 | Write 10 projects for "Sistemas Ciberfísicos" (proj_181–190) | S1, S2 | worker | — |
| T11 | Write 10 projects for "Machine Learning" (proj_191–200) | S1, S2 | worker | — |
| T12 | Write 10 projects for "Robótica" (proj_201–210) | S1, S2 | worker | — |
| T13 | Verify: full validator, build, browser check (ego-lite) of list, filters and detail pages | S1, S2 | inline + verify | — |

## Log

- L1 (user, verbatim): "vmaos hacer algo quiero amplair en es proyecto de los 100 proyectos estos temas de
  inveistigacion o de proyectos video juegos, ciberseguridad ,  desarrollo de sottware, arquitectura de software,
  redes tambien aple el area de medicina con aiot, bioingenieria, inteligencia artifical, ciberfiscina,
  machinlearning, robotica , no implentes nada solo dime si se puede y como lo esta haciendo actualemtne se acutaliza
  sola o como esta ota,dno los temas"
- L2 (user, verbatim): "ahora asi vamos ampli priemro en los proyectos las areas que te dije has las areas nuevas y
  crea proyecots minimo 10 por area nueva"
- L3 (decision): area names (exact strings used in the `area` field): "Desarrollo de Videojuegos", "Ciberseguridad",
  "Desarrollo de Software", "Arquitectura de Software", "Redes", "Medicina con AIoT", "Bioingeniería",
  "Inteligencia Artificial", "Sistemas Ciberfísicos" (ciberfísica), "Machine Learning", "Robótica". Each new
  project has exactly one area (no "+" combinations). Exactly 10 projects per area (ids proj_101–proj_210).
- L4 (decision): new areas are not forced into IoT; projects stay feasible for the UNIMAYOR lab (one semester,
  low budget) and may use lab hardware where it adds value. Overlap boundaries: "Ciberseguridad" = general security
  (web, cloud, apps, forensics, crypto, SOC), not IoT devices (existing "IoT Hacking y Ciberseguridad");
  "Medicina con AIoT" = AI running on/with medical IoT devices (existing "IoT Médico y Salud Digital" is
  telemonitoring without AI focus); "Inteligencia Artificial" = LLMs, NLP, agents, search/planning, generative,
  knowledge representation; "Machine Learning" = supervised/unsupervised models, time series, tabular data, MLOps.
- L5 (decision): new projects live in one module per area under `src/data/projects/` (disjoint edit surfaces for
  parallel writers); `hardware`/`software` string lists are derived from `hardware_tabla`/`software_tabla` instead of
  being written twice. The existing `mockProjects.js` stays unchanged.
- L6 (decision): the area filter keeps its existing substring match (no shared-code change). Known effect: the
  "AIoT" chip also lists "Medicina con AIoT" projects and "Ciberseguridad" also lists "IoT Hacking y
  Ciberseguridad", which is semantically consistent.
- L7 (follow-up, out of scope): regenerate apps/donde-publicar with the new projects and add theme rules for the new
  areas (videogames, software architecture…).
- L8 (design): user asked mid-task "muestrame un disenos nuevos para lo de proyectos" → design/explorar-proyectos/
  (01-catalogo-facetado, 02-explorar-por-familias, 03-lista-con-vista-previa); none chosen yet.
