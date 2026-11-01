# Feature: neuro-discapacidad

Fix the catalog filters on the way back, move the Bioingeniería projects that use IoT to an IoT health area, and add
two new areas (Neurociencia con AIoT; AIoT for people with diseases or disabilities) with 10 projects each.
Branch: feat/neuro-discapacidad. Same project format and validator as odd/tasks/ampliar-areas.md.

## Specs

- S1. "revisa el filtro ya uqe cuando vuelvo a los proyecots se pierden" — going back from a project keeps the catalog
  filters.
- S2. "las de bioingenieria que tengan iot cambialos"; chosen: "Moverlos a un área IoT" ("Los paso a \"IoT Médico y
  Salud Digital\" o \"Medicina con AIoT\", y escribo 6 proyectos nuevos de Bioingeniería pura para mantener 10.").
  Affected: 161 prótesis, 162 exoesqueleto, 164 espirómetro, 166 plataforma de equilibrio, 169 comunicador ocular,
  170 audiómetro.
- S3. "aplia otra rama de una rama de neurociencia con aiot un nueva categoria".
- S4. "abre un team en genra aio desarrollo aiot respecto a personas con enfermedades o discapacidades"; chosen:
  "Dos áreas" ("\"Neurociencia con AIoT\" (10 proyectos de neurotecnología) y otra área de AIoT para discapacidad y
  enfermedades en general (10 proyectos de accesibilidad y asistencia).").
- S5. Question: "los proyectos te los estas inventado o estas toadn refencai de algun banco" (answered in chat, L3).

## Tasks

| ID | Task | Specs | Route | Commit |
|---|---|---|---|---|
| T1 | Keep catalog filters on "Volver a la lista" (sessionStorage + catalogUrl, test first) | S1 | inline | 5d31fc9 |
| T2 | Area registry with explicit id lists, move the 6 projects to "IoT Médico y Salud Digital" (ids kept, URLs unchanged), "Nuevo" badge by id ≥ 101, no-IoT guard for Bioingeniería, empty modules for the new areas (RED) | S2–S4 | inline | — |
| T3 | Write 6 Bioingeniería projects without IoT (proj_211–216) | S2 | worker | — |
| T4 | Write 10 "Neurociencia con AIoT" projects (proj_217–226) | S3 | worker | — |
| T5 | Write 10 "AIoT para Discapacidad y Enfermedad" projects (proj_227–236) | S4 | worker | — |
| T6 | Families, journal finder and event finder rules for the new areas; regenerate both datasets | S2–S4 | inline | — |
| T7 | Verify: validator, tests, build, browser check | S1–S4 | inline | — |

## Area boundaries (decisions, L4)

- **Bioingeniería** (after S2): biomedical devices, biomechanics, biomaterials, biosignal instrumentation and
  prosthetics/orthotics that work standalone: no Wi-Fi, Bluetooth, LoRa, MQTT, cloud or IoT boards (ESP32, ESP8266,
  Raspberry Pi as a network node). USB/serial to a local PC and local displays are allowed.
- **Neurociencia con AIoT**: the nervous system and brain with connected devices plus AI: EEG/EMG/EOG acquisition,
  brain-computer interfaces, epilepsy and seizure detection, Parkinson tremor, stroke rehabilitation, sleep, cognitive
  load, neurodevelopment (autism, ADHD), neurodegenerative screening. Not psychology apps without sensing.
- **AIoT para Discapacidad y Enfermedad**: assistive and monitoring AIoT for people living with a disability or a
  chronic disease, outside the brain focus: visual, hearing, mobility and speech disabilities, diabetes, chronic
  respiratory and cardiac patients, elderly care, home accessibility. Must name the user group and involve accessibility
  (WCAG-style interfaces, voice, haptics). Overlap rule: a project whose core is a neural signal belongs to
  Neurociencia; the existing "Medicina con AIoT" stays clinical diagnosis (ECG/imaging classifiers).
- All new projects: one semester, low budget, feasible in the UNIMAYOR lab, Colombian context (Cauca) where natural,
  realistic hardware and open-source software, ethics note when people are involved (informed consent, no clinical
  claims: "prototipo de apoyo, no dispositivo médico certificado").

## Log

- L1. User request: "revisa el filtro ya uqe cuando vuelvo a los proyecots se pierden y las de bioingenieria que
  tengan iot cambialos y una pregunta los proyectos te los estas inventado o estas toadn refencai de algun banco, aplia
  otra rama de una rama de neurociencia con aiot un nueva categoria y abre un team en genra aio desarrollo aiot respecto
  a personas con enfermedades o discapacidades".
- L2. Answers: Bioingeniería with IoT → "Moverlos a un área IoT"; new areas → "Dos áreas".
- L3. Origin of the projects (answer to S5): proj_001–100 come from the lab's documents (now in
  sources/banco-proyectos: 100_Proyectos_IoT_*.pdf/docx), extracted by refine_projects_v3.py; proj_101–210 were written
  by AI workers in feature ampliar-areas (odd/tasks/ampliar-areas.md, S2 "crea proyecots minimo 10 por area nueva"),
  not copied from an external bank; their `referencias` lists are empty.
- L4. Decisions: moved projects keep their ids (production URLs /proyecto/proj_161 keep working) and go to the
  existing "IoT Médico y Salud Digital" area (they are connected devices without an AI core, which is that area's
  definition in ampliar-areas L4). Second area name: "AIoT para Discapacidad y Enfermedad". New ids: Bioingeniería
  211–216, Neurociencia con AIoT 217–226, AIoT para Discapacidad y Enfermedad 227–236. Catalog "Nuevo" badge: project
  number ≥ 101 (moved projects keep it).
- L5. T1 verified in headless Chrome: /proyectos?area=Robótica&nivel=Avanzado&orden=recientes (3 results) → project →
  journal finder → back to project → "Volver a la lista" returns the same query and 3 results.
- L6. T3–T5 (3 parallel workers, one module each): Bioingeniería 10 valid (211–216 standalone, no IoT words),
  Neurociencia con AIoT 10 valid (217–226), AIoT para Discapacidad y Enfermedad 10 valid (227–236). Real references
  only (checked: Farwell & Donchin 1988, Beniczky 2021, MDS-UPDRS 2008, DeepSleepNet 2017, NASA-TLX, ICHD-3, Colombian
  laws 1581/2012, 1618/2013, 324/1996, 1251/2008, WCAG 2.1); the rest empty. Parent test defect fixed (validator case
  used proj_163, which is inside the id list).
- L7. T6: journal finder AREA_RULES + SECTOR_RULES (neurorrehabilitación, neurodesarrollo, neurotecnología,
  enfermedades crónicas, adulto mayor) and event finder area regex, tests first (RED then GREEN). Regenerated: 236
  projects. Differential: the 204 untouched projects keep identical journal matches; events unchanged; every new
  project has ≥ 51 journals.
- L8. T7: banco 31 tests, journal finder 48 Python + 29 node, event finder 50 Python + 32 node, lint and build pass.
  Browser (dev server): header "236 proyectos en 23 áreas · 13 áreas nuevas este semestre", Neurociencia 10 results,
  IoT Médico 16, /proyecto/proj_227 detail, journals for proj_218 (60), events for proj_232 (214).

