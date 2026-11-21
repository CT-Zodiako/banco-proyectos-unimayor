# Eventos — academic event finder for the UNIMAYOR project bank

React page (a route of the project bank) that lists academic events where students of the project bank can take part. It covers two kinds:

- **Congresos con convocatoria** (`kind: "cfp"`): conferences with an open call for papers, where a student can
  submit and present a project.
- **Eventos para asistir** (`kind: "attend"`): hackathons, talks, workshops and fairs.

Events come from public sources plus a hand-curated file for local Colombian events. A pipeline downloads them,
tags them with the bank's topic areas, removes duplicates and expired events, cleans odd titles, and writes `apps/banco-proyectos/public/data/eventos.json`. The page
hides expired events by itself, so a file that is a few weeks old still shows only open events.

The page lives in the project bank, `apps/banco-proyectos`, at the route `/eventos` (`src/pages/Eventos.jsx`), and
links to it from the navbar and footer. The generated JSON is committed and bundled by Vite, so deploying needs no
Python, and no sample data ships with the app. The old static URL `/eventos/index.html?p=<project id>` still works:
the router redirects it to `/eventos?p=<project id>` with the same project preselected.

## Layout

| Path | Purpose |
|---|---|
| `../../apps/banco-proyectos/public/data/eventos.json` | The generated data the page fetches at runtime from `/data/eventos.json` (committed) |
| `../../apps/banco-proyectos/src/pages/Eventos.jsx` | The page; its components are in `src/components/eventos/` and its pure logic (filters, affinity, map links, favorites) in `src/lib/eventos/` |
| `pipeline/eventos.py` | Pure logic: source parsers, topic tagging, manual file validation, dedupe, title cleaning, expiry, output |
| `pipeline/sources.py` | Downloads (urllib, curl fallback on TLS errors) and the `data/raw/` cache |
| `pipeline/projects.py` | Project profiles (topics, keywords) for the project → events cross |
| `pipeline/build.py` | Command that generates `eventos.json` |
| `data/manual-events.json` | Hand-curated events (Colombian congresses, talks, fairs) |
| `data/raw/` | Saved downloads used by `--offline` (not versioned) |
| `tests/` | Pipeline tests (Python `unittest`) with small saved source pages in `tests/fixtures/`; the tests of the page logic are `apps/banco-proyectos/tests/eventos-*.test.mjs` |
| `odd/tasks/eventos.md` | Feature specification, event schema and decision log (repository root) |

## Sources

| Source | What it gives | Kind | Notes |
|---|---|---|---|
| [WikiCFP](http://www.wikicfp.com/) call pages, one per topic query | Event, dates, place, deadline | `cfp` | `robots.txt` asks for 5 s between requests; the build waits 5 s |
| [ccf-deadlines](https://ccfddl.com/conference/allconf.json) | ~380 CS conferences with deadlines | `cfp` | Latest edition of each conference |
| [Devpost](https://devpost.com/api/hackathons) (unofficial JSON API) | Open hackathons | `attend` | 9 per page, 1 s between pages |
| `data/manual-events.json` | Local events | `cfp`/`attend` | Validated; an invalid file stops the build |

Topics follow the bank areas, in this order: IoT, Ciberseguridad, Redes, Inteligencia Artificial, Machine
Learning, Robótica, Sistemas Ciberfísicos, Desarrollo de Software, Videojuegos, Salud y Bioingeniería, Big Data.

- **WikiCFP**: each query maps to a topic (`internet of things` → IoT, `cybersecurity`/`security` →
  Ciberseguridad, `networking` → Redes, `artificial intelligence`, `machine learning`, `robotics`,
  `cyber-physical systems`/`embedded systems` → Sistemas Ciberfísicos, `software engineering`, `games`,
  `bioinformatics`/`biomedical engineering`/`health informatics` → Salud y Bioingeniería, `big data`). Keywords in
  the full name add more topics. An event found under several queries becomes one event with all its topics.
- **ccf-deadlines**: the `sub` code gives the topic (AI → Inteligencia Artificial, NW → Redes, SC →
  Ciberseguridad, SE → Desarrollo de Software, DB → Big Data). CG, CT, DS (computer architecture and systems), HI and MX have no bank area: those
  conferences are kept only when their description matches a topic keyword (e.g. "Conference on Games").
- **Devpost**: themes map to topics (Machine Learning/AI → Machine Learning + Inteligencia Artificial, IoT,
  Cybersecurity, Gaming → Videojuegos, Health → Salud y Bioingeniería, Databases → Big Data, Web/Mobile/DevOps/Low
  code → Desarrollo de Software). "Robotic Process Automation" is office automation, not robotics. Hackathons with
  no mapped theme are kept with no topics.

### Parsing rules

- **Deadline**: when a source gives several deadlines (WikiCFP "Nov 20, 2026 (Nov 5, 2026)", ccf-deadlines
  timelines), the event keeps the earliest one that is still open. If all have passed, it keeps the latest one,
  and the event is then expired. `TBD`/`N/A` give `null`. A WikiCFP deadline after the event end is a data entry
  error and is ignored.
- **Dates**: WikiCFP "When", ccf-deadlines `date` ("June 28 - July 2, 2027") and Devpost submission periods
  ("Oct 01 - Nov 12, 2026"). When the ccf-deadlines text cannot be read, `start` falls back to `opening`. A Devpost
  hackathon ends when submissions close, so `end` is also its `deadline`.
- **WikiCFP rows without event dates are skipped**: WikiCFP lists journals and special issues that way, and they
  are not events to present at.
- **WikiCFP paging**: a call page lists deadlines from yesterday upwards and then wraps to past calls. The build
  reads up to `--wikicfp-pages` pages per query (default 5) and stops a query at the first page that reaches past
  calls. Busy topics (AI, machine learning) get dozens of deadlines a day, so WikiCFP only covers their next few
  days. ccf-deadlines covers the main conferences of those areas.
- **Place**: `location` is the place as published; online-only places ("Online", "Virtual Conference") become
  `null`. `online` is `true` when the place says online, virtual or hybrid. `country` is the last comma part of
  the first place, lightly normalized (USA, US states → United States; UK, Scotland → United Kingdom; UAE; Republic
  of Korea → South Korea). A single name counts only if it is a known country ("Singapore"), because Devpost
  often shows a venue ("Amy Gutman Hall") instead of a city.

### Duplicates and expiry

- **Dedupe**: events are the same when their normalized acronym and year match. The acronym is the title before
  any " — "/": " separator, without the year and without a leading IEEE/ACM/Springer/IFIP/USENIX, keeping only
  letters and digits: "IEEE-RICAI 2027" and "RICAI 2027" are both `ricai2027`. The year comes from the title,
  else from the start or deadline. The fields of the best source are kept (manual > ccf-deadlines > WikiCFP >
  Devpost), missing fields are filled from the others, and topics are joined.
- **Cleaning** (`clean_events`, after dedupe and expiry, before writing; the JSON fields and ids do not change):
  - *Titles and names*: WikiCFP organizers add markers to the acronym. `AAIE--EI 2027` becomes `AAIE 2027` (also
    `--Ei`, `--ESCI`, `--CFP`), `Ei/Scopus-ACAI 2026` and `Ei/Scopus/CPCI-ICRPA 2027` lose the indexing label
    (`ACAI 2026`, `ICRPA 2027`), `ACM--CFP--RobCE 2027` becomes `ACM RobCE 2027`, and in names a publisher
    joined to the year (`ACM--2026 The 9th International …`) reads `ACM 2026 The 9th International …`. Publishers:
    IEEE, ACM, Springer, SPIE, IET, IOP, EAI. Any other `--`, and acronyms with a single dash (`ECML-PKDD`,
    `IEEE-DSIS`), are left as they are.
  - *Duplicates*: WikiCFP lists some conferences twice, the second with the `--EI` marker (`AAIE 2027` and
    `AAIE--EI 2027`: same dates, place and deadline), and one conference can appear with and without a publisher
    prefix (`MCVR 2026` / `SPIE MCVR 2026`, `SecureComm 2027` in ccf-deadlines / `EAI SecureComm 2027` in WikiCFP).
    Two events are the same conference when the acronym and year match once markers and the publisher prefix are
    ignored **and** they have the same kind and the same start date, with no different end date and no different
    country. The same acronym in another year, other dates or another country is never merged. Events with no
    start date are never merged.
  - *Which one stays*: the record of the best source (manual > ccf-deadlines > WikiCFP > Devpost), then the most
    complete one, then the one with the plainest title (no marker, no publisher prefix). It keeps its `id` and
    `url`; empty fields are filled from the other record, the earliest deadline wins, and the topics are joined.
  - Cleaning twice gives the same result. The build prints `deduplicated N events, cleaned M titles` (M counts the
    titles that changed in the written file). With the 2026-11-16 data: 481 events became 456 (24 `--EI`/SPIE
    twins and one cross-source pair) and 27 titles were cleaned.
- **Expiry** (same rule as the page): a `cfp` event is expired when its deadline (else its end date, else its
  start date) is before today; an `attend` event when its end date (else its start date) is before today. An event
  that ends or closes today is still shown. Events with no date at all are left out.
- `sources` in `eventos.json` counts the events of each source that made it into the file, after dedupe and expiry.

## Commands

From `pipelines/eventos`:

```bash
python3 -E -m pipeline.build                  # download all sources (about 4-5 minutes), write eventos.json
python3 -E -m pipeline.build --offline        # rebuild from the downloads saved in data/raw/
python3 -E -m pipeline.build --require-all-sources  # as the weekly workflow: write nothing if any source fails
python3 -I -m unittest discover -s tests -t . # tests
```

Options: `--manual`, `--projects`, `--raw`, `--out` override paths; `--wikicfp-pages N` (default 5), `--timeout SECONDS`
(default 30), `--today YYYY-MM-DD` (expiry date, for tests). By default a public source that fails as a whole
counts as 0 events; with `--require-all-sources` the build prints
`error: --require-all-sources: <sources> failed; eventos.json was not written` and exits with code 1, keeping the
previous `eventos.json`.

The build prints `deduplicated N events, cleaned M titles` and then one line, e.g. `wikicfp=316 ccfddl=88 devpost=47 manual=2 events=453 projects=210 out=…/banco-proyectos/public/data/eventos.json`.
When a source fails, the build prints `warning: <source> failed: …`, reports 0 for it and writes the file with
the others. It exits with code 1 without writing `eventos.json` when every public source fails, or when the
manual file is missing or invalid (`error: data/manual-events.json: entry 1: "kind" must be "cfp" or "attend"`),
or when the projects file is invalid (`error: …/projects.json: entry 0: "titulo" is required`). A missing projects
file only prints `warning: missing projects file …; writing projects: []` and the events are still written.

Python 3 standard library only. When Python cannot verify a TLS certificate (python.org builds on macOS ship
without a CA bundle), the download is retried with `curl`, which uses the system certificate store.

## Manual events file

`data/manual-events.json` is a JSON list of events. Use it for Colombian congresses, talks, workshops and fairs
that no public source lists. Check dates on the official site before adding an entry.

```json
[
  {
    "title": "CICI 2027 — IV Congreso Internacional de Ciencia e Ingeniería",
    "name": "IV Congreso Internacional de Ciencia e Ingeniería, Universidad Mariana",
    "kind": "cfp",
    "start": "2027-04-14",
    "end": "2027-04-16",
    "deadline": "2027-02-26",
    "location": "Pasto, Colombia",
    "country": "Colombia",
    "online": true,
    "url": "https://cici.umariana.edu.co/",
    "topics": ["Inteligencia Artificial"],
    "notes": "Checked 2026-10-31 on the official site."
  }
]
```

| Field | Required | Rule |
|---|---|---|
| `title` | yes | Short title; put the acronym and year first ("CICI 2027 — …") so duplicates from other sources merge |
| `kind` | yes | `"cfp"` (call for papers) or `"attend"` (talk, workshop, fair, hackathon) |
| `url` | yes | Starts with `http://` or `https://` |
| `start`, `end`, `deadline` | `start` or `deadline` | ISO dates `YYYY-MM-DD` or `null`; `attend` events need `start`; `end` not before `start` |
| `name` | no | Full name |
| `location`, `country` | no | `country` is derived from `location` when missing; write "Colombia" for the Colombia filter |
| `online` | no | `true`/`false` (default `false`); `true` for hybrid events |
| `topics` | no | Values from the topic list above |
| `id` | no | Default: `manual-` + the title before " — " (`manual-cici-2027`); must be unique |
| `notes` | no | Free text for maintainers; not published |

Any other field, an unknown topic or an invalid date stops the build with an error that names the entry index
(counted from 0). Expired entries are left out of `eventos.json` automatically; delete them from the file when you
see them.

## Search and comparison

Filter events by start date (inclusive) and by city or country, in addition to the existing filters. Date filters omit events without a start date. Filters are saved in the URL. Select up to three events with **Comparar** to see their dates, location, modality, topics and source side by side; selections remain while filters change and can be cleared. Unknown information is shown as such. Comparison is temporary and is not stored after reloading the page.

## Event locations

Events with a published physical location include a link to a Google Maps search for that text. Google Maps opens only when the visitor selects the link; no map is embedded or loaded automatically. Locations may identify a city rather than a venue, so visitors should confirm the address with the event source. Events without a confirmed physical location, including online-only events, have no map link. Hybrid events with a physical location retain the link.

## Affinity on the page

With `?p=<project id>` (the bank's "¿A qué eventos ir?" button), `src/lib/eventos/affinity.js` (`affinity`, `rankForProject`)
shows only events sharing at least one topic with the project, ranked by an estimated affinity from 0 to 100:
shared topics 60 (shared / project topics), keyword hits in the event title or name 20 (whole words, 10 each),
Colombia or online 10, time to prepare 10 (cfp deadline ≥ 21 days 10, 7–20 days 5, < 7 days 0, no deadline 5;
attend 10). Each card explains its score ("¿Por qué X %?"). It is computed in the browser, so it follows expiry;
it is not an acceptance probability. The other filters still apply on top, and an unknown id shows the full list.

## Project profiles (project → events)

The project page (`/proyecto/<id>`) also lists these events in a slide-over panel (`?panel=eventos`, tab "Eventos";
`src/components/proyecto-panel/`) that reuses the event filters, cards and comparison (`src/components/eventos/`,
`src/hooks/useEventResults.js`, `src/lib/eventos/`) with the project preselected; its "Abrir en la página completa" link
goes to `/eventos?p=<project id>`, and the `/eventos` page is unchanged.

The project bank links each project to `/eventos?p=<project id>`, which ranks events by estimated affinity with
that project (contract: "Project cross" in `odd/tasks/eventos.md`). The build reads the bank projects from
`../donde-publicar/data/projects.json` (option `--projects`; refresh it with `npm run export:projects` in
`apps/banco-proyectos`) and writes the `projects` list of `eventos.json`, sorted by project number:

```json
{"id": "proj_001", "title": "Sistema de Monitoreo Agrícola Distribuido con MQTT", "emoji": "🌾",
 "area": "SBC-IoT", "level": "Intermedio", "topics": ["IoT"],
 "keywords": ["mqtt", "agriculture", "precision agriculture", "esp32", "raspberry pi", "sensors", "arduino",
              "time series"]}
```

Rules (`pipeline/projects.py`; all matching is on lower case, accent-free text):

- **Title and emoji**: `"🌾 Proyecto 1: Título"` gives emoji `🌾` and title `Título`. The first token is the emoji
  when it has at most 4 characters and no letters or digits; otherwise the emoji is 🚀. The text after
  "Proyecto N:" is the title when present.
- **Topics** (same list and order as events; every project gets at least one, a test checks the real file):
  - From the area: IoT (SBC-IoT, AIoT, IoT …), Ciberseguridad (Hacking, Ciberseguridad), Redes, Inteligencia
    Artificial (AIoT, Inteligencia Artificial), Machine Learning (Machine Learning, Visión Artificial, Analítica),
    Robótica, Sistemas Ciberfísicos (Ciberfísicos, Industrial 4.0, Aeroespacial), Desarrollo de Software
    (Desarrollo/Arquitectura de Software), Videojuegos, Salud y Bioingeniería (Médico, Medicina, Bioingeniería,
    Salud), Big Data (Big Data, Analítica).
  - Plus signals in the title and sector, e.g. MQTT or sensors → IoT, "ataques"/"criptografía"/"SOC" →
    Ciberseguridad, "clasificador"/"TinyML"/"predictivo" → Machine Learning, "gemelo digital"/"embebido" → Sistemas
    Ciberfísicos, a health sector or "ECG"/"pacientes" → Salud y Bioingeniería. Plain "seguridad" (patient or
    flight safety) and plain "redes" (power grids) are not signals.
- **Keywords** (up to 12, de-duplicated, in this order): technologies in the title, domain words in the title,
  domain words in the sector, technologies in hardware names (text before " (") and in software names (text
  before ":"). Only terms from two fixed tables are used, so generic words (sistema, proyecto, datos,
  desarrollo) never appear. Stringified Python lists in the export are read as lists.
  - Technologies (`TECH_KEYWORDS`): mqtt (also Mosquitto), lora, esp32, arduino, raspberry pi, sensors, ros, slam,
    lidar, drones, fpga, wifi, 5g, computer vision (visión artificial, OpenCV), object detection (YOLO), tinyml
    (TensorFlow Lite), deep learning, machine translation (traductor), digital twin (gemelo digital), blockchain
    (cadena de bloques), time series (series temporales, InfluxDB), siem (SOC, Wazuh), intrusion detection
    (Suricata), cryptography, unity, godot, virtual reality, cloud computing (nube), and more.
  - Domain words, written in English because most events are in English (`DOMAIN_KEYWORDS`): agrícola/agricultura
    → agriculture, agricultura de precisión → precision agriculture, café → coffee, ganadería → livestock,
    salud/médico/hospital → health, bioingeniería → biomedical, neurociencia → neuroscience, rehabilitación →
    rehabilitation, ciudades inteligentes/urbano → smart city, domótica → smart home, redes eléctricas
    inteligentes → smart grid, energía → energy, educación/enseñanza → education, videojuego/juego → games,
    gamificación → gamification, Industria 4.0 → industry 4.0, industria → industrial, transporte/movilidad →
    transportation, logística → logistics, ambiental/sostenibilidad → environment, agua → water, aeroespacial →
    aerospace, satelital → satellite, turismo → tourism, deporte → sports, minería → mining, finanzas → finance,
    gobierno/ciudadano → e-government, discapacidad/inclusión → accessibility, patrimonio/museo → cultural
    heritage, indígena → indigenous languages, comercio → commerce, pymes → smes, ciencia de datos → data science.
- Keywords are meant to be matched as whole words in event titles and names (short terms such as `ros` or `5g`).

## Refresh

Events are refreshed automatically every Monday, and on demand from **Run workflow**, by
`.github/workflows/actualizar-datos.yml` (see the root README). It runs the tests and
`python3 -E -m pipeline.build --require-all-sources`, and commits `apps/banco-proyectos/public/data/eventos.json` to master only when it succeeds;
otherwise the page keeps the previous events. The workflow also runs the page-logic tests
(`node --test "../../apps/banco-proyectos/tests/eventos-*.test.mjs"`) before and after the build.

To refresh by hand (for example after editing `data/manual-events.json`, or to check a change before pushing):

1. `cd pipelines/eventos`
2. Update `data/manual-events.json` if there are new local events. If the bank projects changed, run
   `npm run export:projects` in `apps/banco-proyectos` first.
3. `python3 -E -m pipeline.build` (needs network; about 4-5 minutes).
4. `python3 -I -m unittest discover -s tests -t .`
5. Open the page (see below) and check a few events.
6. Commit `apps/banco-proyectos/public/data/eventos.json` (and the manual file) and push to master; Railway redeploys the project bank.

## Preview locally

```bash
cd ../../apps/banco-proyectos
npm run dev
# open http://localhost:5173/eventos (or /eventos?p=proj_001)
```

Tests of the page logic: `npm test` in `apps/banco-proyectos` (`tests/eventos-filters.test.mjs`,
`eventos-affinity.test.mjs`, `eventos-map.test.mjs` and `eventos-data.test.mjs`, which checks the committed data).
