# Eventos — academic event finder for the UNIMAYOR project bank

Static page that lists academic events where students of the project bank can take part. It covers two kinds:

- **Congresos con convocatoria** (`kind: "cfp"`): conferences with an open call for papers, where a student can
  submit and present a project.
- **Eventos para asistir** (`kind: "attend"`): hackathons, talks, workshops and fairs.

Events come from public sources plus a hand-curated file for local Colombian events. A pipeline downloads them,
tags them with the bank's topic areas, removes duplicates and expired events, and writes `site/data.js`. The page
hides expired events by itself, so a file that is a few weeks old still shows only open events.

The project bank serves it at `/eventos/index.html` (its `predev`/`prebuild` copy `site/` into
`apps/banco-proyectos/public/eventos/`, without `sample-data.js`) and links to it from the navbar and footer.

## Layout

| Path | Purpose |
|---|---|
| `site/` | The page (`index.html`, `app.js`, `filters.js`, `styles.css`) and the generated `data.js` |
| `pipeline/eventos.py` | Pure logic: source parsers, topic tagging, manual file validation, dedupe, expiry, output |
| `pipeline/sources.py` | Downloads (urllib, curl fallback on TLS errors) and the `data/raw/` cache |
| `pipeline/projects.py` | Project profiles (topics, keywords) for the project → events cross |
| `pipeline/build.py` | Command that generates `site/data.js` |
| `data/manual-events.json` | Hand-curated events (Colombian congresses, talks, fairs) |
| `data/raw/` | Saved downloads used by `--offline` (not versioned) |
| `tests/` | Pipeline tests (Python `unittest`) with small saved source pages in `tests/fixtures/` |
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
- **Expiry** (same rule as the page): a `cfp` event is expired when its deadline (else its end date, else its
  start date) is before today; an `attend` event when its end date (else its start date) is before today. An event
  that ends or closes today is still shown. Events with no date at all are left out.
- `sources` in `data.js` counts the events of each source that made it into the file, after dedupe and expiry.

## Commands

From `apps/eventos`:

```bash
python3 -E -m pipeline.build                  # download all sources (about 4-5 minutes), write site/data.js
python3 -E -m pipeline.build --offline        # rebuild from the downloads saved in data/raw/
python3 -I -m unittest discover -s tests -t . # tests
```

Options: `--manual`, `--projects`, `--raw`, `--out` override paths; `--wikicfp-pages N` (default 5), `--timeout SECONDS`
(default 30), `--today YYYY-MM-DD` (expiry date, for tests).

The build prints one line, e.g. `wikicfp=316 ccfddl=88 devpost=47 manual=2 events=453 projects=210 out=…/site/data.js`.
When a source fails, the build prints `warning: <source> failed: …`, reports 0 for it and writes the file with
the others. It exits with code 1 without writing `site/data.js` when every public source fails, or when the
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
(counted from 0). Expired entries are left out of `data.js` automatically; delete them from the file when you
see them.

## Search and comparison

Filter events by start date (inclusive) and by city or country, in addition to the existing filters. Date filters omit events without a start date. Filters are saved in the URL. Select up to three events with **Comparar** to see their dates, location, modality, topics and source side by side; selections remain while filters change and can be cleared. Unknown information is shown as such. Comparison is temporary and is not stored after reloading the page.

## Event locations

Events with a published physical location include a link to a Google Maps search for that text. Google Maps opens only when the visitor selects the link; no map is embedded or loaded automatically. Locations may identify a city rather than a venue, so visitors should confirm the address with the event source. Events without a confirmed physical location, including online-only events, have no map link. Hybrid events with a physical location retain the link.

## Affinity on the page

With `?p=<project id>` (the bank's "¿A qué eventos ir?" button), `site/filters.js` (`affinity`, `rankForProject`)
shows only events sharing at least one topic with the project, ranked by an estimated affinity from 0 to 100:
shared topics 60 (shared / project topics), keyword hits in the event title or name 20 (whole words, 10 each),
Colombia or online 10, time to prepare 10 (cfp deadline ≥ 21 days 10, 7–20 days 5, < 7 days 0, no deadline 5;
attend 10). Each card explains its score ("¿Por qué X %?"). It is computed in the browser, so it follows expiry;
it is not an acceptance probability. The other filters still apply on top, and an unknown id shows the full list.

## Project profiles (project → events)

The project bank links each project to `/eventos/?p=<project id>`, which ranks events by estimated affinity with
that project (contract: "Project cross" in `odd/tasks/eventos.md`). The build reads the bank projects from
`../donde-publicar/data/projects.json` (option `--projects`; refresh it with `npm run export:projects` in
`apps/banco-proyectos`) and writes `window.EVENTOS.projects`, sorted by project number:

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

## Refresh before pushing

Events are refreshed by hand, like `donde-publicar`. No scheduled job or new infrastructure:

1. `cd apps/eventos`
2. Update `data/manual-events.json` if there are new local events. If the bank projects changed, run
   `npm run export:projects` in `apps/banco-proyectos` first.
3. `python3 -E -m pipeline.build` (needs network; about 4-5 minutes).
4. `python3 -I -m unittest discover -s tests -t .`
5. Open the page (see below) and check a few events.
6. Commit `site/data.js` (and the manual file) and push to master; Railway redeploys the project bank.

## Preview locally

```bash
python3 -I -m http.server 8766 --bind 127.0.0.1 --directory site
# open http://127.0.0.1:8766/
```
