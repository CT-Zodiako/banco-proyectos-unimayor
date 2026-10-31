# Eventos — academic event finder for the UNIMAYOR project bank

Static page that lists academic events where students of the project bank can take part. It covers two kinds:

- **Congresos con convocatoria** (`kind: "cfp"`): conferences with an open call for papers, where a student can
  submit and present a project.
- **Eventos para asistir** (`kind: "attend"`): hackathons, talks, workshops and fairs.

Events come from public sources plus a hand-curated file for local Colombian events. A pipeline downloads them,
tags them with the bank's topic areas, removes duplicates and expired events, and writes `site/data.js`. The page
hides expired events by itself, so a file that is a few weeks old still shows only open events.

## Layout

| Path | Purpose |
|---|---|
| `site/` | The page (`index.html`, `app.js`, `filters.js`, `styles.css`) and the generated `data.js` |
| `pipeline/eventos.py` | Pure logic: source parsers, topic tagging, manual file validation, dedupe, expiry, output |
| `pipeline/sources.py` | Downloads (urllib, curl fallback on TLS errors) and the `data/raw/` cache |
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
- **Expiry** (same rule as the page): a `cfp` event is expired when its deadline is before today; an `attend`
  event when its end date (else its start date) is before today. An event that ends or closes today is still
  shown. Events with no such date are kept only if they start today or later.
- `sources` in `data.js` counts the events of each source that made it into the file, after dedupe and expiry.

## Commands

From `apps/eventos`:

```bash
python3 -E -m pipeline.build                  # download all sources (about 4-5 minutes), write site/data.js
python3 -E -m pipeline.build --offline        # rebuild from the downloads saved in data/raw/
python3 -I -m unittest discover -s tests -t . # tests
```

Options: `--manual`, `--raw`, `--out` override paths; `--wikicfp-pages N` (default 5), `--timeout SECONDS`
(default 30), `--today YYYY-MM-DD` (expiry date, for tests).

The build prints one line, e.g. `wikicfp=316 ccfddl=97 devpost=47 manual=2 events=462 out=…/site/data.js`.
When a source fails, the build prints `warning: <source> failed: …`, reports 0 for it and writes the file with
the others. It exits with code 1 without writing `site/data.js` when every public source fails, or when the
manual file is missing or invalid (`error: data/manual-events.json: entry 1: "kind" must be "cfp" or "attend"`).

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

## Refresh before pushing

Events are refreshed by hand, like `donde-publicar`. No scheduled job or new infrastructure:

1. `cd apps/eventos`
2. Update `data/manual-events.json` if there are new local events.
3. `python3 -E -m pipeline.build` (needs network; about 4-5 minutes).
4. `python3 -I -m unittest discover -s tests -t .`
5. Open the page (see below) and check a few events.
6. Commit `site/data.js` (and the manual file) and push to master; Railway redeploys the project bank.

## Preview locally

```bash
python3 -I -m http.server 8766 --bind 127.0.0.1 --directory site
# open http://127.0.0.1:8766/
```
