"""Pure logic of the event finder: source parsers, topic tagging, manual file validation, dedupe, expiry, output.

Every function here works on already downloaded text/JSON and returns plain dicts in the event schema
(see odd/tasks/eventos.md, "Event schema"); network access lives in pipeline/sources.py.
"""

import datetime
import json
import re
import unicodedata
from html.parser import HTMLParser

TOPICS = ["IoT", "Ciberseguridad", "Redes", "Inteligencia Artificial", "Machine Learning", "Robótica",
          "Sistemas Ciberfísicos", "Desarrollo de Software", "Videojuegos", "Salud y Bioingeniería", "Big Data"]
FIELDS = ["id", "title", "name", "kind", "start", "end", "deadline", "location", "country", "online", "url",
          "source", "topics"]
KINDS = ("cfp", "attend")
SOURCE_PRIORITY = {"manual": 0, "ccfddl": 1, "wikicfp": 2, "devpost": 3}

# One WikiCFP call page per query; the event gets the query's topic.
WIKICFP_QUERIES = {
    "internet of things": "IoT",
    "cybersecurity": "Ciberseguridad",
    "security": "Ciberseguridad",
    "networking": "Redes",
    "artificial intelligence": "Inteligencia Artificial",
    "machine learning": "Machine Learning",
    "robotics": "Robótica",
    "cyber-physical systems": "Sistemas Ciberfísicos",
    "embedded systems": "Sistemas Ciberfísicos",
    "software engineering": "Desarrollo de Software",
    "games": "Videojuegos",
    "bioinformatics": "Salud y Bioingeniería",
    "biomedical engineering": "Salud y Bioingeniería",
    "health informatics": "Salud y Bioingeniería",
    "big data": "Big Data",
}

# ccf-deadlines "sub" codes. CG, CT, DS, HI and MX have no bank area: those conferences stay only when their
# description matches a topic keyword (e.g. "IEEE Conference on Games", "Bioinformatics"). DS is computer
# architecture, parallel and storage systems (ASPLOS, ASP-DAC), not data science.
CCFDDL_SUBS = {
    "AI": ["Inteligencia Artificial"],
    "NW": ["Redes"],
    "SC": ["Ciberseguridad"],
    "SE": ["Desarrollo de Software"],
    "DB": ["Big Data"],
}

# Devpost themes. "Robotic Process Automation" is office automation, not robotics, so it maps to nothing.
DEVPOST_THEMES = {
    "Machine Learning/AI": ["Machine Learning", "Inteligencia Artificial"],
    "IoT": ["IoT"],
    "Cybersecurity": ["Ciberseguridad"],
    "Gaming": ["Videojuegos"],
    "Health": ["Salud y Bioingeniería"],
    "Databases": ["Big Data"],
    "Web": ["Desarrollo de Software"],
    "Mobile": ["Desarrollo de Software"],
    "DevOps": ["Desarrollo de Software"],
    "Low/No Code": ["Desarrollo de Software"],
}

# Keywords searched in WikiCFP full names and ccf-deadlines descriptions (lower case, word-bounded regexes).
TOPIC_KEYWORDS = {
    "IoT": [r"internet of things", r"iot", r"sensors?", r"sensor networks?"],
    "Ciberseguridad": [r"cyber ?security", r"security", r"privacy", r"cryptograph\w*"],
    "Redes": [r"networking", r"networked", r"computer networks?", r"wireless", r"telecommunications?",
              r"[56]g"],
    "Inteligencia Artificial": [r"artificial intelligence", r"ai", r"computer vision", r"natural language"],
    "Machine Learning": [r"machine learning", r"deep learning", r"neural networks?"],
    "Robótica": [r"robot\w*"],
    "Sistemas Ciberfísicos": [r"cyber[- ]physical", r"embedded", r"real-time systems?"],
    "Desarrollo de Software": [r"software", r"programming"],
    "Videojuegos": [r"games?", r"gaming"],
    "Salud y Bioingeniería": [r"bioinformatics", r"biomedical", r"bioengineering", r"health\w*", r"medical",
                              r"medicine", r"computational biology"],
    "Big Data": [r"big data", r"data mining", r"data science", r"databases?", r"knowledge discovery"],
}
_KEYWORD_RES = {topic: re.compile(r"\b(?:" + "|".join(words) + r")\b") for topic, words in TOPIC_KEYWORDS.items()}

MONTHS = {name: number for number, name in enumerate(
    ("jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"), start=1)}
_MONTH = r"([A-Za-z]{3,9})\.?"
_RANGE_RE = re.compile(
    r"^" + _MONTH + r"\s+(\d{1,2})(?:,?\s+(\d{4}))?"
    r"(?:\s*[-–]\s*(?:" + _MONTH + r"\s+)?(\d{1,2}))?"
    r",?\s+(\d{4})$")
_ONE_DATE_RE = re.compile(r"\b([A-Z][a-z]{2})[a-z]*\.? (\d{1,2}), (\d{4})\b")

ONLINE_RE = re.compile(r"(?i)\b(online|virtual|hybrid)\b")
NO_PLACE_RE = re.compile(r"(?i)^(n/?a|tbd|tba|((fully?|100%)\s+)?(online|virtual|hybrid)(\s+(conference|event|only|meeting))?)$")
ANYWHERE_RE = re.compile(r"(?i)\b(online|virtual|hybrid|anywhere)\b")
# Accepted when the place is a single name ("Singapore"); otherwise single names are venues or cities.
COUNTRIES = {
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
    "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia", "Costa Rica", "Croatia", "Cuba", "Cyprus",
    "Czechia", "Denmark", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Estonia", "Ethiopia", "Fiji",
    "Finland", "France", "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Honduras", "Hong Kong", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kuwait", "Latvia", "Lebanon", "Lithuania", "Luxembourg", "Macau", "Macao",
    "Madagascar", "Malaysia", "Maldives", "Malta", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia",
    "Montenegro", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
    "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Panama", "Paraguay", "Peru", "Philippines",
    "Poland", "Portugal", "Puerto Rico", "Qatar", "Romania", "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia",
    "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden",
    "Switzerland", "Taiwan", "Tanzania", "Thailand", "Trinidad and Tobago", "Tunisia", "Turkey", "Uganda",
    "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela",
    "Vietnam", "Zambia", "Zimbabwe",
}
US_STATES = {
    "alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware", "florida",
    "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maine",
    "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", "nebraska",
    "nevada", "new hampshire", "new jersey", "new mexico", "new york", "north carolina", "north dakota", "ohio",
    "oklahoma", "oregon", "pennsylvania", "rhode island", "south carolina", "south dakota", "tennessee", "texas",
    "utah", "vermont", "virginia", "washington", "west virginia", "wisconsin", "wyoming", "dc", "d.c.",
    "al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la",
    "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok",
    "or", "pa", "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy",
}
COUNTRY_ALIASES = {
    "usa": "United States", "us": "United States", "u.s.a.": "United States", "u.s.": "United States",
    "united states of america": "United States", "united state": "United States", "america": "United States",
    "uk": "United Kingdom", "u.k.": "United Kingdom", "england": "United Kingdom", "scotland": "United Kingdom",
    "wales": "United Kingdom", "northern ireland": "United Kingdom", "great britain": "United Kingdom",
    "uae": "United Arab Emirates", "u.a.e.": "United Arab Emirates",
    "korea": "South Korea", "republic of korea": "South Korea", "korea, south": "South Korea",
    "pr china": "China", "p.r. china": "China", "p. r. china": "China", "prc": "China",
    "the netherlands": "Netherlands", "holland": "Netherlands",
    "czech republic": "Czechia", "mexico city": "Mexico", "türkiye": "Turkey", "turkiye": "Turkey",
}
ORG_PREFIXES = {"ieee", "acm", "springer", "ifip", "usenix", "the"}
# Publishers that WikiCFP puts before the acronym or in front of the year of the name ("SPIE MCVR 2026", "SPIE--2026
# The 3rd ..."). The cleaning step ignores them when it looks for the same conference twice.
PUBLISHERS = ("IEEE", "ACM", "Springer", "SPIE", "IET", "IOP", "EAI")
PUBLISHER_PREFIXES = ORG_PREFIXES | {p.lower() for p in PUBLISHERS}
# Indexing labels that WikiCFP organizers add to the acronym ("AAIE--EI 2027", "Ei/Scopus-ACAI 2026"); "CFP" is noise.
INDEX_MARKERS = ("ei", "esci", "scopus", "cpci", "istp")


class ManualEventsError(ValueError):
    """The manual events file breaks the schema; the message names the entry index."""


def make_event(**fields):
    """Event dict with every schema key, in schema order."""
    event = {key: None for key in FIELDS}
    event.update(fields)
    event["online"] = bool(event["online"])
    event["topics"] = order_topics(event["topics"] or [])
    return event


def order_topics(topics):
    present = set(topics)
    return [topic for topic in TOPICS if topic in present]


def keyword_topics(text):
    text = (text or "").lower()
    return [topic for topic, pattern in _KEYWORD_RES.items() if pattern.search(text)]


def _date(year, month_name, day):
    month = MONTHS.get(month_name[:3].lower())
    if not month:
        return None
    try:
        return datetime.date(int(year), month, int(day))
    except ValueError:
        return None


def parse_date_range(text):
    """("YYYY-MM-DD", "YYYY-MM-DD") from texts like "June 28 - July 2, 2027"; (None, None) when not understood."""
    text = re.sub(r"\([^)]*\)", " ", text or "")
    text = re.sub(r"\s+", " ", text).strip()
    match = _RANGE_RE.match(text)
    if not match:
        return None, None
    month1, day1, year1, month2, day2, year2 = match.groups()
    month2 = month2 or month1
    day2 = day2 or day1
    start_year = int(year1) if year1 else int(year2)
    start = _date(start_year, month1, day1)
    end = _date(year2, month2, day2)
    if start and end and end < start and not year1:
        start = _date(start_year - 1, month1, day1)  # "Dec 30 - Jan 2, 2027"
    if not start or not end or end < start:
        return None, None
    return start.isoformat(), end.isoformat()


def choose_deadline(dates, today):
    """Earliest deadline on or after today; when all passed, the latest one (the event is then expired)."""
    dates = sorted(dates)
    if not dates:
        return None
    upcoming = [d for d in dates if d >= today.isoformat()]
    return upcoming[0] if upcoming else dates[-1]


def is_online(location):
    return bool(location and ONLINE_RE.search(location))


def clean_location(location):
    location = re.sub(r"\s+", " ", location or "").strip()
    location = re.sub(r"\s*,\s*", ", ", location)
    if not location or NO_PLACE_RE.match(location):
        return None
    return location


def country_from_location(location):
    """Country of a free-text place: last comma part of the first listed place, lightly normalized."""
    if not clean_location(location):
        return None
    first = re.split(r";|/", location)[0]
    first = re.sub(r"\([^)]*\)", " ", first)
    first = re.sub(r"(?i)\s+(and|&)\s+(online|virtual)\b.*$", "", first)
    parts = [re.sub(r"\s+", " ", p).strip(" .") for p in re.split(r",|\.\s", first)]
    parts = [p for p in parts if p and not ANYWHERE_RE.search(p)]
    if not parts or NO_PLACE_RE.match(parts[-1]):
        return None
    last = parts[-1]
    key = last.lower()
    if key in COUNTRY_ALIASES:
        return COUNTRY_ALIASES[key]
    if key in US_STATES and (len(parts) > 1 or len(key) > 2):
        return "United States"
    if last.isupper() and len(last) > 3:
        last = last.title()
    if len(parts) == 1 and last not in COUNTRIES:
        return None
    return last


# ---------------------------------------------------------------- WikiCFP


class _RowParser(HTMLParser):
    """Collects every <tr> as a list of (text, hrefs) cells; nested tables produce their own rows."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.rows = []
        self._stack = []

    def handle_starttag(self, tag, attrs):
        if tag == "tr":
            self._stack.append([])
        elif tag in ("td", "th") and self._stack:
            self._stack[-1].append({"text": [], "hrefs": []})
        elif tag == "a" and self._stack and self._stack[-1]:
            href = dict(attrs).get("href")
            if href:
                self._stack[-1][-1]["hrefs"].append(href)

    def handle_endtag(self, tag):
        if tag == "tr" and self._stack:
            row = self._stack.pop()
            self.rows.append([(re.sub(r"\s+", " ", "".join(c["text"])).strip(), c["hrefs"]) for c in row])

    def handle_data(self, data):
        if self._stack and self._stack[-1]:
            self._stack[-1][-1]["text"].append(data)


_EVENTID_RE = re.compile(r"event\.showcfp\?eventid=(\d+)")


def _wikicfp_cell(text):
    return None if NO_PLACE_RE.match(text or "") or not text else text


def parse_wikicfp(html, query_topics, today):
    """Events of one WikiCFP call page: an (acronym link, full name) row followed by a (when, where, deadline) row."""
    parser = _RowParser()
    parser.feed(html)
    rows = parser.rows
    events = []
    for index, row in enumerate(rows[:-1]):
        if len(row) < 2 or not row[0][1]:
            continue
        match = _EVENTID_RE.search(row[0][1][0])
        details = rows[index + 1]
        if not match or len(details) < 3:
            continue
        event_id = match.group(1)
        title, name = row[0][0], row[1][0]
        when, where, deadline_text = (cell[0] for cell in details[:3])
        start, end = parse_date_range(_wikicfp_cell(when))
        if not start:
            continue  # no event dates: WikiCFP lists journals and special issues this way, not congresses
        deadlines = [_date(y, m, d).isoformat() for m, d, y in _ONE_DATE_RE.findall(deadline_text)
                     if _date(y, m, d)]
        deadlines = [d for d in deadlines if d <= end]  # a deadline after the event is a data entry typo
        location = clean_location(where)
        events.append(make_event(
            id=f"wikicfp-{event_id}", title=title, name=name or None, kind="cfp", start=start, end=end,
            deadline=choose_deadline(deadlines, today), location=location,
            country=country_from_location(location), online=is_online(where),
            url=f"http://www.wikicfp.com/cfp/servlet/event.showcfp?eventid={event_id}", source="wikicfp",
            topics=list(query_topics) + keyword_topics(name)))
    return events


def wikicfp_reached_past(page_events, today):
    """True when the next call page holds only past calls: WikiCFP lists deadlines from yesterday upwards and then
    wraps to past calls in descending order, so a last deadline older than yesterday ends the useful pages."""
    deadlines = [e["deadline"] for e in page_events if e["deadline"]]
    if not deadlines:
        return not page_events
    return deadlines[-1] < (today - datetime.timedelta(days=1)).isoformat()


# ---------------------------------------------------------------- ccf-deadlines


def parse_ccfddl(conferences, today):
    """Latest edition of each ccf-deadlines conference; conferences with no bank topic are dropped."""
    events = []
    for conference in conferences:
        editions = conference.get("confs") or []
        if not editions:
            continue
        edition = max(editions, key=lambda e: e.get("year") or 0)
        description = conference.get("description") or ""
        topics = CCFDDL_SUBS.get(conference.get("sub"), []) + keyword_topics(description)
        if not topics:
            continue
        deadlines = [t["deadline"][:10] for t in edition.get("timeline") or []
                     if re.match(r"\d{4}-\d{2}-\d{2}", str(t.get("deadline") or ""))]
        start, end = parse_date_range(edition.get("date"))
        if not start and re.match(r"\d{4}-\d{2}-\d{2}", str(edition.get("opening") or "")):
            start = edition["opening"][:10]
        place = edition.get("place") or ""
        location = clean_location(place)
        events.append(make_event(
            id=f"ccfddl-{edition['id']}", title=f"{conference['title']} {edition['year']}",
            name=description or None, kind="cfp", start=start, end=end,
            deadline=choose_deadline(deadlines, today), location=location,
            country=country_from_location(location), online=is_online(place), url=edition.get("link"),
            source="ccfddl", topics=topics))
    return events


# ---------------------------------------------------------------- Devpost


def parse_devpost(page):
    """(events, total_count) of one page of https://devpost.com/api/hackathons."""
    events = []
    for hackathon in page.get("hackathons") or []:
        start, end = parse_date_range(hackathon.get("submission_period_dates"))
        place = (hackathon.get("displayed_location") or {}).get("location") or ""
        location = clean_location(place)
        topics = [t for theme in hackathon.get("themes") or [] for t in DEVPOST_THEMES.get(theme.get("name"), [])]
        events.append(make_event(
            id=f"devpost-{hackathon['id']}", title=hackathon["title"].strip(), name=None, kind="attend",
            start=start, end=end, deadline=end, location=location,
            country=country_from_location(location), online=is_online(place), url=hackathon.get("url"),
            source="devpost", topics=topics))
    return events, int((page.get("meta") or {}).get("total_count") or 0)


# ---------------------------------------------------------------- manual file

MANUAL_FIELDS = set(FIELDS) - {"source"} | {"notes"}
_ISO_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def _slug(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def _iso(value):
    if not isinstance(value, str) or not _ISO_RE.match(value):
        return False
    try:
        datetime.date.fromisoformat(value)
    except ValueError:
        return False
    return True


def validate_manual(entries):
    """Schema events from data/manual-events.json; raises ManualEventsError("entry N: ...") on the first problem."""
    if not isinstance(entries, list):
        raise ManualEventsError("the file must contain a JSON list of events")
    events, seen = [], set()
    for index, entry in enumerate(entries):
        def fail(problem):
            raise ManualEventsError(f"entry {index}: {problem}")
        if not isinstance(entry, dict):
            fail("must be a JSON object")
        for key in entry:
            if key not in MANUAL_FIELDS:
                fail(f'unknown field "{key}"')
        title = entry.get("title")
        if not isinstance(title, str) or not title.strip():
            fail('"title" is required')
        if entry.get("kind") not in KINDS:
            fail('"kind" must be "cfp" or "attend"')
        url = entry.get("url")
        if not isinstance(url, str) or not url.startswith(("http://", "https://")):
            fail('"url" must start with http:// or https://')
        for key in ("start", "end", "deadline"):
            if entry.get(key) is not None and not _iso(entry[key]):
                fail(f'"{key}" must be an ISO date YYYY-MM-DD')
        if not entry.get("start") and not entry.get("deadline"):
            fail('needs "start" or "deadline"')
        if entry["kind"] == "attend" and not entry.get("start"):
            fail('"attend" events need "start"')
        if entry.get("start") and entry.get("end") and entry["end"] < entry["start"]:
            fail('"end" is before "start"')
        if "online" in entry and not isinstance(entry["online"], bool):
            fail('"online" must be true or false')
        for topic in entry.get("topics") or []:
            if topic not in TOPICS:
                fail(f'unknown topic "{topic}"')
        event_id = entry.get("id") or "manual-" + _slug(_title_head(title))
        if event_id in seen:
            fail(f'duplicate id "{event_id}"')
        seen.add(event_id)
        location = entry.get("location") or None
        events.append(make_event(
            id=event_id, title=title.strip(), name=entry.get("name") or None, kind=entry["kind"],
            start=entry.get("start"), end=entry.get("end"), deadline=entry.get("deadline"), location=location,
            country=entry.get("country") or country_from_location(location), online=entry.get("online", False),
            url=url, source="manual", topics=entry.get("topics") or []))
    return events


# ---------------------------------------------------------------- dedupe, expiry, output


def _title_head(title):
    return re.split(r"\s+[—–-]\s+|:\s", title, maxsplit=1)[0]


def dedupe_key(event, prefixes=ORG_PREFIXES):
    """Normalized acronym + year ("IEEE-RICAI 2027" -> "ricai2027"); None when the year is unknown."""
    head = _title_head(event["title"])
    year = re.search(r"\b(19|20)\d{2}\b", head)
    if year:
        year = year.group(0)
    else:
        dates = [event.get(k) for k in ("start", "deadline") if event.get(k)]
        if not dates:
            return None
        year = dates[0][:4]
    tokens = [t for t in re.split(r"[\s\-_/]+", re.sub(r"\b(19|20)\d{2}\b", " ", head).lower()) if t]
    while len(tokens) > 1 and tokens[0] in prefixes:
        tokens.pop(0)
    acronym = re.sub(r"[^a-z0-9]", "", "".join(tokens))
    return acronym + year if acronym else None


def merge_events(events):
    """One event per id and per dedupe key. The best source (manual > ccfddl > wikicfp > devpost) keeps its fields,
    empty fields are filled from the others in that order, and topics are joined. Keeps first-seen order."""
    groups, order, by_key = {}, [], {}
    for event in events:
        key = dedupe_key(event)
        group = by_key.get(key) if key else None
        group = group or groups.get(event["id"])
        if group is None:
            group = []
            order.append(group)
        group.append(event)
        groups[event["id"]] = group
        if key:
            by_key[key] = group
    merged = []
    for group in order:
        ranked = sorted(group, key=lambda e: SOURCE_PRIORITY.get(e["source"], 9))
        winner = dict(ranked[0])
        for other in ranked[1:]:
            for field in ("name", "start", "end", "deadline", "location", "country"):
                if winner[field] is None and other[field] is not None:
                    winner[field] = other[field]
        winner["topics"] = order_topics([t for e in group for t in e["topics"]])
        merged.append(winner)
    return merged


# ---------------------------------------------------------------- cleaning: odd titles and duplicate conferences

_MARKER = "|".join(INDEX_MARKERS)
_SUFFIX_MARKER_RE = re.compile(r"(?<=\S)--(?:" + _MARKER + r"|cfp)(?=\s|-|\)|$)", re.IGNORECASE)
_LEADING_MARKERS_RE = re.compile(r"^((?:(?:" + _MARKER + r")[/-])+)(?=[A-Za-z0-9])", re.IGNORECASE)
_PUBLISHER_JOIN_RE = re.compile(r"^(" + "|".join(PUBLISHERS) + r")--(?=\S)", re.IGNORECASE)


def clean_text(text):
    """Title or name without WikiCFP markers: "AAIE--EI 2027" -> "AAIE 2027", "Ei/Scopus-ACAI 2026" -> "ACAI 2026",
    "ACM--2026 The 9th ..." -> "ACM 2026 The 9th ...". Text that has no known marker is returned unchanged,
    as is any other use of "--"."""
    if not text:
        return text
    cleaned = _SUFFIX_MARKER_RE.sub("", text)
    leading = _LEADING_MARKERS_RE.match(cleaned)
    # A lone "EI-" may be a real acronym; stripped only when it is a chain ("Ei/Scopus-") or another label.
    if leading and (leading.group(1).count("/") + leading.group(1).count("-") > 1
                    or leading.group(1)[:-1].lower() != "ei"):
        cleaned = cleaned[leading.end():]
    cleaned = _PUBLISHER_JOIN_RE.sub(lambda m: m.group(1) + " ", cleaned)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned if cleaned else text


def _same_conference(a, b):
    """Same edition of the same conference: same kind, acronym + year, start date, and no conflicting end or place."""
    if a["kind"] != b["kind"] or not a["start"] or a["start"] != b["start"]:
        return False
    if a["end"] and b["end"] and a["end"] != b["end"]:
        return False
    if a["country"] and b["country"]:
        return a["country"] == b["country"]
    if a["location"] and b["location"]:
        return a["location"].lower() == b["location"].lower()
    return True


def _title_mess(title):
    """(has a marker, has a publisher prefix) of an original title: 0 is better; keeps the plainest title."""
    tokens = [t for t in re.split(r"[\s\-_/]+", _title_head(clean_text(title)).lower()) if t]
    return (int(clean_text(title) != title), int(len(tokens) > 1 and tokens[0] in PUBLISHER_PREFIXES))


def _completeness(event):
    return sum(event[key] is not None for key in ("name", "end", "deadline", "location", "country", "url"))


def _merge_group(group, originals):
    """One event from a group of duplicates (list of (position, cleaned event); originals are the events before
    cleaning): the best source, then the most complete, then the plainest title. Missing fields come from the
    others, the earliest deadline wins, topics are joined."""
    ranked = sorted(group, key=lambda g: (SOURCE_PRIORITY.get(g[1]["source"], 9), -_completeness(g[1]),
                                          _title_mess(originals[g[0]]["title"]), g[0]))
    winner = dict(ranked[0][1])
    for _, other in ranked[1:]:
        for key in ("name", "end", "url"):
            if winner[key] is None:
                winner[key] = other[key]
        if winner["location"] is None and other["location"] is not None:
            winner["location"], winner["country"] = other["location"], other["country"]
        elif winner["country"] is None:
            winner["country"] = other["country"]
        if other["deadline"] and (winner["deadline"] is None or other["deadline"] < winner["deadline"]):
            winner["deadline"] = other["deadline"]
        winner["online"] = winner["online"] or other["online"]
    winner["topics"] = order_topics([t for _, e in group for t in e["topics"]])
    return winner


def clean_events(events):
    """(events, stats): odd titles and names cleaned, and one event per conference edition.

    Two events are the same conference when their acronym + year match once markers and publisher prefixes are
    ignored (EAI SecureComm 2027 = SecureComm 2027) and they have the same kind and start date, with no conflicting
    end date or country. Anything less is kept: precision over recall. Ids, urls and the JSON fields are not
    changed; a group keeps the record from the best source, else the most complete, else the plainest title.
    The result keeps first-seen order; stats are {"deduplicated": n, "titles_cleaned": n of kept titles changed}.
    """
    cleaned = [dict(e, title=clean_text(e["title"]), name=clean_text(e["name"])) for e in events]
    clusters, by_key = [], {}
    for position, event in enumerate(cleaned):
        key = dedupe_key(event, PUBLISHER_PREFIXES)
        cluster = None
        for candidate in by_key.get(key, ()) if key and event["start"] else ():
            if all(_same_conference(event, other) for _, other in candidate):
                cluster = candidate
                break
        if cluster is None:
            cluster = []
            clusters.append(cluster)
            if key and event["start"]:
                by_key.setdefault(key, []).append(cluster)
        cluster.append((position, event))
    result = [_merge_group(cluster, events) if len(cluster) > 1 else cluster[0][1] for cluster in clusters]
    originals = {e["id"]: e["title"] for e in events}
    changed = sum(1 for e in result if originals.get(e["id"]) != e["title"])
    return result, {"deduplicated": len(events) - len(result), "titles_cleaned": changed}


def is_expired(event, today):
    """cfp: deadline (else end, else start) before today; attend: end (else start) before today.

    Matches isExpired in src/lib/eventos/filters.js (apps/banco-proyectos). Events without any date are dropped
    here (the page would keep them).
    """
    today = today.isoformat()
    reference = event["end"] or event["start"]
    if event["kind"] == "cfp" and event["deadline"]:
        reference = event["deadline"]
    return not reference or reference < today


def drop_expired(events, today):
    return [e for e in events if not is_expired(e, today)]


def sort_events(events):
    """By deadline, else start, else end (events without dates last), then title."""
    def key(event):
        date = event["deadline"] or event["start"] or event["end"]
        return (date is None, date or "", event["title"].lower())
    return sorted(events, key=key)


def build_payload(events, sources, today, projects=()):
    return {"generated": today.isoformat(), "sources": dict(sources), "topics": list(TOPICS),
            "events": sort_events(events), "projects": list(projects)}


def render_json(payload):
    """The payload as the JSON file the React app fetches (apps/banco-proyectos/public/data/eventos.json)."""
    return json.dumps(payload, ensure_ascii=False) + "\n"
