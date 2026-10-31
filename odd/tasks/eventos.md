# Feature: eventos

Academic event finder for the UNIMAYOR project bank: congresses with call for papers and events to attend, gathered
automatically from public sources plus a hand-curated file for local events, served by the project bank at /eventos/.
Lives in apps/eventos (Python pipeline + static HTML/JS), same pattern as apps/donde-publicar.

## Specs

- S1. Event types: "Ambos" — both "Congresos con convocatoria (call for papers)" (academic events where students can
  submit and present their project) and "Eventos para asistir" (talks, workshops, fairs and hackathons), with a filter
  to tell them apart.
- S2. Source: "Automática desde fuentes públicas" — a pipeline downloads events from public sites, like donde-publicar
  does with DOAJ and SCImago. Sources checked on 2026-10-31: WikiCFP per-topic call pages (event, when, where,
  deadline; robots.txt allows crawling with Crawl-delay 5), ccf-deadlines JSON (https://ccfddl.com/conference/allconf.json),
  Devpost hackathons JSON (https://devpost.com/api/hackathons, unofficial).
- S3. Local events: "Automático + archivo manual" — plus a file in the repo where local events are loaded (Colombian
  congresses, talks, fairs); they are mixed into the same search.
- S4. Freshness: "A mano antes de pushear" — like donde-publicar: run a command that downloads the events, commit and
  push. The page hides expired events by itself. No new infrastructure.
- S5. Deploy stays push to master → Railway (L1 context: "dejmolo lo mas sencilla push a main o amaster y railway se
  actualiza"); the project bank serves the page at /eventos/, like /donde-publicar/.

## Tasks

| ID | Task | Specs | Route | Commit |
|---|---|---|---|---|
| T1 | Pipeline: parse WikiCFP call pages, ccf-deadlines JSON, Devpost JSON and data/manual-events.json into one event schema; topic tagging to bank areas; dedupe; build command writes site/data.js (tests first) | S1–S4 | worker | 0a01bcd |
| T2 | Page: list with filters (type, topic, online/in person, Colombia, search), sort by deadline/date, hides expired events client-side; pure filter logic tested with node --test | S1, S4 | worker | f1d5ef3 |
| T3 | Integration: sync into banco public/eventos, nginx location, Dockerfile copy, navbar link, READMEs | S5 | inline | (this commit) |
| T4 | Verify: run the pipeline against live sources, browser check, docker image serves /eventos/ | S1–S5 | inline | — |

### Event schema (contract between T1 and T2)

`site/data.js` sets `window.EVENTOS = {generated: "YYYY-MM-DD", sources: {<source>: <count>}, topics: [...], events: [...]}`.
Each event:

```json
{"id": "wikicfp-203904", "title": "DCOSS-IoT 2027", "name": "The 23nd Annual International Conference on ...",
 "kind": "cfp", "start": "2027-06-21", "end": "2027-06-23", "deadline": "2026-12-15",
 "location": "Montreal, Canada", "country": "Canada", "online": false,
 "url": "http://www.wikicfp.com/cfp/servlet/event.showcfp?eventid=203904", "source": "wikicfp",
 "topics": ["IoT", "Redes"]}
```

- `kind`: `cfp` (submit a paper: WikiCFP, ccf-deadlines, manual) or `attend` (hackathons, talks, workshops, fairs:
  Devpost, manual). This is the S1 filter.
- Dates are ISO `YYYY-MM-DD` or `null`. An event is expired when its deadline (for `cfp`) or its end date (for
  `attend`, falling back to start) is before today.
- `topics` use a fixed list aligned with the bank areas: IoT, Ciberseguridad, Redes, Inteligencia Artificial,
  Machine Learning, Robótica, Sistemas Ciberfísicos, Desarrollo de Software, Videojuegos, Salud y Bioingeniería,
  Big Data.
- `source`: `wikicfp`, `ccfddl`, `devpost` or `manual`.

## Log

- L1. User request, after choosing to continue with the event app ("dale la 2", option "Dejar estos 3 commits sin
  revisión externa y seguir con la app de eventos"). README already listed `apps/eventos` (planned) "Academic events
  search". Earlier delivery preference: "dejmolo lo mas sencilla push a main o amaster y railway se actualiza".
- L2. "¿Qué tipo de eventos tiene que buscar la app?" → "Ambos".
- L3. "¿De dónde salen los eventos que muestra la app?" → "Automática desde fuentes públicas".
- L4. No automatic public source exists for local Colombian talks, workshops and fairs. "¿Cómo cubrimos los eventos
  locales de Colombia?" → "Automático + archivo manual".
- L5. "¿Cómo se actualizan los eventos?" → "A mano antes de pushear".
- L6. Probes 2026-10-31: WikiCFP call page `http://www.wikicfp.com/cfp/call?conference=internet%20of%20things` returns
  an Event/When/Where/Deadline table (one request per topic); ccfddl allconf.json has 383 conferences with timelines and
  subs AI, CG, CT, DB, DS, HI, MX, NW, SC, SE; Devpost returns 9 per page (meta.total_count 46 open). Local Python
  3.14 urllib fails TLS verification (no CA bundle); donde-publicar templates.py already falls back to curl.
- L7. T1 (worker): 35 Python tests; live build 2026-10-31 wikicfp=316 ccfddl=97 devpost=47 manual=2 (462 events,
  9 merged). Decisions: WikiCFP rows with When "N/A" skipped (journals/special issues); deadline = earliest still
  open, else latest (so closed calls expire); WikiCFP deadline after the event end ignored as a typo; up to 5 pages per
  topic, stopping where WikiCFP wraps to past calls; online-only places get location null; dedupe priority manual >
  ccfddl > wikicfp > devpost. Manual seed: CICI 2027 (verified) and EIEI ACOFI 2027 (dates verified, deadline and city
  not published → null, country Colombia).
- L8. Parent fix (RED then GREEN): ccfddl `DS` is computer architecture/systems (ASPLOS, OSDI), not Big Data; it now
  keeps only keyword topics like CG/CT/HI/MX. Offline rebuild: ccfddl=88, 453 events.
- L9. T2 (worker): 20 node tests. A cfp with null deadline expires by its end (fallback start). sample-data.js is
  dev-only: loaded only when data.js is missing, never copied to the bank (scripts/sync-eventos.mjs excludes it).
- L10. Slice boundary: T1 (0a01bcd, ~1,600 lines incl. fixtures and generated data.js) and T2 (f1d5ef3, ~750 lines)
  exceed the ~400-line slice because each is one new self-contained app part; delivery stays push to master (S5), no PR.
- L11. Independent verify (Risk item 5, Dockerfile/nginx): PASS on S1–S5 and checks A–E (Docker image differential vs
  decf34d: existing routes unchanged; /eventos/ 200, sample-data.js 404). Advisory fixed (RED then GREEN): the pipeline
  now expires a cfp without deadline by end, else start, like site/filters.js. Local logo.jpg mode set to 755 (git
  already stored 100755; local Docker builds returned 403).

