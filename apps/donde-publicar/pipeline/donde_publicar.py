"""Cross the UNIMAYOR IoT project bank with diamond open access journals.

A journal qualifies when DOAJ lists it with no APC and no other fees (free to publish and
free to read) and SCImago assigns it a best quartile (Q1-Q4). Projects are matched to
journals through subject themes derived from DOAJ subjects/keywords and SCImago categories.
"""

import csv
import re

PUBLINDEX_BY_QUARTILE = {"Q1": "A1", "Q2": "A2", "Q3": "B", "Q4": "C"}
QUARTILE_BONUS = {"Q1": 2.0, "Q2": 1.5, "Q3": 1.0, "Q4": 0.5}

TECH_AREAS = ["Computer Science", "Engineering", "Mathematics", "Decision Sciences", "Physics and Astronomy",
              "Multidisciplinary", "Energy"]
HEALTH_AREAS = ["Medicine", "Nursing", "Health Professions"]
AGRO_AREAS = ["Agricultural and Biological Sciences", "Veterinary", "Environmental Science"]


def _theme(label, categories, patterns, areas):
    return {"label": label, "categories": categories, "patterns": patterns, "areas": areas}


# Each theme has a Spanish label, the exact SCImago categories that define it (strong signal),
# keyword patterns matched against DOAJ title/subjects/keywords (weak signal) and the SCImago areas
# in which a keyword hit is trusted. Short or ambiguous terms use word boundaries ("iot" never
# matches "patriot").
THEMES = {
    # Technology themes (from the project's technological area)
    "iot_redes": _theme("IoT y redes", ["Computer Networks and Communications", "Hardware and Architecture"],
                        [r"\biot\b", "internet of things", "internet de las cosas", "sensor network",
                         "wireless", "telecommunication", "telecomunicaci", "edge computing", "pervasive",
                         "ubiquitous", "embedded system", "sistemas embebidos"], TECH_AREAS),
    "electronica": _theme("Electrónica y control", ["Electrical and Electronic Engineering",
                                                    "Control and Systems Engineering", "Instrumentation",
                                                    "Signal Processing", "Control and Optimization"],
                          ["electronic", "electrónica", "control engineering", "automation", "automática",
                           "instrumentation", "signal processing", "robotic", "mechatronic"], TECH_AREAS),
    "ia": _theme("Inteligencia artificial", ["Artificial Intelligence"],
                 ["artificial intelligence", "inteligencia artificial", "machine learning", "deep learning",
                  "neural network", "soft computing", "intelligent systems", "aprendizaje automático"],
                 TECH_AREAS + HEALTH_AREAS),
    "vision": _theme("Visión artificial", ["Computer Vision and Pattern Recognition",
                                           "Computer Graphics and Computer-Aided Design"],
                     ["computer vision", "image processing", "image analysis", "pattern recognition",
                      "visión artificial", "procesamiento de imágenes"], TECH_AREAS + HEALTH_AREAS),
    "seguridad": _theme("Ciberseguridad", [],
                        ["security", "cybersecurity", "cryptograph", "privacy", "forensic",
                         "seguridad informática", "ciberseguridad", "blockchain"], ["Computer Science", "Engineering",
                                                                                     "Mathematics"]),
    "datos": _theme("Big data y analítica", ["Information Systems", "Information Systems and Management",
                                             "Management Information Systems", "Computer Science Applications",
                                             "Modeling and Simulation"],
                    ["big data", "data science", "data analytics", "data mining", "databases", "cloud computing",
                     "analítica de datos", "ciencia de datos"], TECH_AREAS),
    "salud_digital": _theme("Salud digital", ["Health Informatics", "Health Information Management",
                                              "Biomedical Engineering"],
                            ["health informatics", "medical informatics", "telemedicine", "telehealth",
                             r"\behealth\b", "digital health", "biomedical engineering", "wearable",
                             "ingeniería biomédica"], TECH_AREAS + HEALTH_AREAS),
    "industria40": _theme("Industria 4.0", ["Industrial and Manufacturing Engineering"],
                          ["manufacturing", "industry 4.0", "industrial engineering", "ingeniería industrial",
                           "production engineering"], TECH_AREAS),
    "computacion_general": _theme("Computación e ingeniería general", ["Computer Science (miscellaneous)",
                                                                       "Engineering (miscellaneous)", "Software"], [], []),
    "software": _theme("Ingeniería de software", ["Software"],
                       ["software engineering", "software architecture", "ingeniería de software", "devops",
                        "microservic", "software development", "desarrollo de software"], TECH_AREAS),
    "videojuegos": _theme("Videojuegos y gamificación", ["Human-Computer Interaction",
                                                          "Computer Graphics and Computer-Aided Design", "Media Technology"],
                          [r"\bvideo ?games?\b", "serious game", "gamification", "game-based", "videojuego",
                           "gamificación", "juegos serios", r"\bgame design\b"], TECH_AREAS + ["Social Sciences"]),
    "robotica": _theme("Robótica", [],
                       [r"\brobot", "robótic", "mechatronic", "mecatrón", "autonomous vehicle", "manipulator"],
                       TECH_AREAS),
    "bioingenieria": _theme("Bioingeniería", ["Biomedical Engineering", "Bioengineering"],
                            ["biomedical engineering", "bioengineering", "ingeniería biomédica", "bioingenier",
                             "prosthe", "prótesis", "biomechanic", "rehabilitation engineering"],
                            TECH_AREAS + HEALTH_AREAS),
    # Signal that a domain journal publishes technology/engineering work: an Engineering or Computer
    # Science SCImago area, or a specific applied-technology keyword (generic words such as
    # "technology" or "monitoring" are deliberately excluded).
    "tecnologia_aplicada": _theme("Tecnología aplicada", [],
                                  ["precision agriculture", "smart farming", "digital agriculture",
                                   "agricultural engineering", "biosystems engineering", "aquacultural engineering",
                                   "internet of things", r"\bsensors?\b", "instrumentation", "automation",
                                   "telemedicine", "remote sensing", "agricultura de precisión", "sensores"],
                                  None),
    # Domain themes (from the project's application sector)
    "agricultura": _theme("Agricultura", ["Agronomy and Crop Science", "Agricultural and Biological Sciences (miscellaneous)",
                                          "Horticulture", "Plant Science"],
                          ["agronom", "agricultur", r"\bcrops?\b", "horticultur", "agrícola", "agropecuari",
                           "hydroponic"], AGRO_AREAS + TECH_AREAS),
    "acuicultura": _theme("Acuicultura y pesca", ["Aquatic Science"],
                          ["aquaculture", "fisheries", "acuicultura", "piscicultura"], AGRO_AREAS),
    "ganaderia": _theme("Ganadería y salud animal", ["Animal Science and Zoology", "Veterinary (miscellaneous)",
                                                     "Food Animals", "Equine", "Small Animals"],
                        ["veterinar", "livestock", "zootecn", "dairy", "ciencia animal", "pecuari"], AGRO_AREAS),
    "biodiversidad": _theme("Biodiversidad y ecología", ["Ecology", "Ecology, Evolution, Behavior and Systematics",
                                                         "Nature and Landscape Conservation", "Conservation",
                                                         "Insect Science"],
                            ["biodiversity", "conservation", "entomolog", "biodiversidad", "bioacoustic"], AGRO_AREAS),
    "ambiente": _theme("Ambiente y sostenibilidad", ["Environmental Science (miscellaneous)", "Environmental Engineering",
                                                     "Pollution", "Waste Management and Disposal", "Atmospheric Science",
                                                     "Global and Planetary Change", "Environmental Chemistry",
                                                     "Management, Monitoring, Policy and Law", "Computers in Earth Sciences"],
                       ["environmental", "pollution", "waste", "air quality", "meteorolog", "ambiental",
                        "circular economy", "remote sensing", "teledetección"], ["Environmental Science", "Earth and Planetary Sciences", "Energy",
                                              "Engineering"]),
    "agua": _theme("Recursos hídricos", ["Water Science and Technology"],
                   ["water resources", "hydrolog", "recursos hídricos"], ["Environmental Science", "Engineering",
                                                                          "Earth and Planetary Sciences"]),
    "energia": _theme("Energía", ["Energy (miscellaneous)", "Energy Engineering and Power Technology",
                                  "Renewable Energy, Sustainability and the Environment", "Fuel Technology"],
                      ["electric power", "power systems", "smart grid", "renewable energ", "energía eléctrica"],
                      ["Energy", "Engineering"]),
    "edificios": _theme("Edificios y construcción", ["Building and Construction", "Architecture",
                                                     "Civil and Structural Engineering"],
                        ["smart building", "smart home", "domótica", "building automation"], ["Engineering"]),
    "ciudades": _theme("Ciudades y transporte", ["Transportation", "Urban Studies", "Automotive Engineering",
                                                 "Geography, Planning and Development"],
                       ["smart cit", "traffic", "urban mobility", "movilidad", "intelligent transport"],
                       ["Engineering", "Social Sciences", "Environmental Science", "Computer Science"]),
    "salud": _theme("Salud y medicina", ["Medicine (miscellaneous)", "Public Health, Environmental and Occupational Health",
                                         "Health Informatics", "Internal Medicine", "Critical Care and Intensive Care Medicine",
                                         "Emergency Medicine", "Geriatrics and Gerontology", "Gerontology",
                                         "Endocrinology, Diabetes and Metabolism", "Health Professions (miscellaneous)",
                                         "Nursing (miscellaneous)", "Community and Home Care", "Family Practice",
                                         "Epidemiology", "Infectious Diseases", "Surgery", "Health Policy",
                                         "Cardiology and Cardiovascular Medicine"],
                    ["medicine", "medical", "clinical", "health care", "healthcare", "salud", "medicina"],
                    HEALTH_AREAS),
    "neuro": _theme("Neurociencia", ["Neurology", "Neurology (clinical)", "Cognitive Neuroscience",
                                     "Neuroscience (miscellaneous)", "Behavioral Neuroscience",
                                     "Experimental and Cognitive Psychology", "Neuropsychology and Physiological Psychology",
                                     "Psychiatry and Mental Health", "Biological Psychiatry", "Sensory Systems"],
                    ["neuroscience", "neurolog", r"\beeg\b", "brain", "neurociencia", "cognitive neuro"],
                    ["Neuroscience", "Psychology", "Medicine", "Computer Science", "Engineering"]),
    "rehabilitacion": _theme("Rehabilitación y deporte", ["Rehabilitation", "Physical Therapy, Sports Therapy and Rehabilitation",
                                                          "Orthopedics and Sports Medicine", "Sports Science",
                                                          "Occupational Therapy"],
                             ["rehabilitation", "physiotherap", "biomechanic", "sports science", "rehabilitación"],
                             HEALTH_AREAS + ["Engineering"]),
    "farmacia": _theme("Farmacia", ["Pharmacology", "Pharmacology (medical)", "Pharmaceutical Science", "Pharmacy",
                                    "Pharmacology, Toxicology and Pharmaceutics (miscellaneous)", "Drug Discovery"],
                       ["pharmac", "farmac"], ["Pharmacology, Toxicology and Pharmaceutics", "Medicine"]),
    "educacion": _theme("Educación", ["Education", "E-learning"],
                        ["education", "educación", "teaching", "pedagog", "e-learning", "enseñanza"],
                        ["Social Sciences", "Computer Science", "Engineering"]),
    "logistica": _theme("Logística", ["Management Science and Operations Research", "Transportation"],
                        ["logistic", "supply chain", "logística", "cadena de suministro", "cold chain"],
                        ["Decision Sciences", "Business, Management and Accounting", "Engineering"]),
    "seguridad_industrial": _theme("Minería y seguridad industrial", ["Safety Research", "Safety, Risk, Reliability and Quality",
                                                                      "Human Factors and Ergonomics",
                                                                      "Geotechnical Engineering and Engineering Geology",
                                                                      "Economic Geology"],
                                   ["mining", "occupational safety", "minería", "seguridad industrial", "seguridad y salud"],
                                   ["Engineering", "Earth and Planetary Sciences", "Medicine"]),
    "mantenimiento": _theme("Mantenimiento y mecánica", ["Mechanical Engineering", "Mechanics of Materials",
                                                         "Safety, Risk, Reliability and Quality", "Acoustics and Ultrasonics"],
                            ["maintenance", "vibration", "fault diagnosis", "mantenimiento"], ["Engineering"]),
    "turismo": _theme("Turismo y hotelería", ["Tourism, Leisure and Hospitality Management"],
                      ["tourism", "hospitality", "turismo", "hotel"], ["Business, Management and Accounting",
                                                                      "Social Sciences"]),
    "negocios": _theme("Comercio y gestión", ["Marketing", "Business and International Management", "Strategy and Management",
                                              "Business, Management and Accounting (miscellaneous)",
                                              "Management of Technology and Innovation"],
                       ["retail", "commerce", "marketing", "comercio"], ["Business, Management and Accounting"]),
    "alimentos": _theme("Alimentos", ["Food Science", "Nutrition and Dietetics"],
                        ["food", "alimentos", "gastronom"], AGRO_AREAS + ["Nursing", "Chemical Engineering"]),
    "aeroespacial": _theme("Aeroespacial", ["Aerospace Engineering", "Space and Planetary Science", "Atmospheric Science"],
                           ["aerospace", "aeronaut", "aviation", "satellite", r"\buavs?\b", "drone", "aeroespacial"],
                           ["Engineering", "Earth and Planetary Sciences", "Physics and Astronomy"]),
}

APPLIED_AREAS = {"Engineering", "Computer Science"}

TECH_THEMES = {"iot_redes", "electronica", "ia", "vision", "seguridad", "datos", "salud_digital",
               "industria40", "computacion_general", "tecnologia_aplicada", "software", "videojuegos", "robotica",
               "bioingenieria"}

# Categories that mark a journal as humanities-led (excluded: they do not publish engineering work).
HUMANITIES_CATEGORIES = {
    "History", "Philosophy", "Literature and Literary Theory", "Religious Studies", "Classics", "Archeology",
    "Archeology (arts and humanities)", "Visual Arts and Performing Arts", "Music", "Cultural Studies",
    "Linguistics and Language", "Arts and Humanities (miscellaneous)", "History and Philosophy of Science",
    "Museology", "Law", "Anthropology", "Library and Information Sciences",
}
NEUTRAL_CATEGORIES = {"Multidisciplinary"}

_COMPILED = {theme: [re.compile(p, re.IGNORECASE) for p in spec["patterns"]] for theme, spec in THEMES.items()}

# Project area/sector keywords -> themes. Checked as lowercase substrings.
AREA_RULES = [
    ("sbc-iot", ["iot_redes", "electronica"]),
    ("aiot", ["ia", "iot_redes"]),
    ("visión", ["vision", "ia"]),
    ("ciberseguridad", ["seguridad", "iot_redes"]),
    ("big data", ["datos"]),
    ("analítica", ["datos"]),
    ("médico", ["salud_digital", "iot_redes"]),
    ("aeroespacial", ["iot_redes", "electronica"]),
    ("industrial 4.0", ["industria40", "iot_redes"]),
    # Areas added to the bank after the original 100 IoT projects.
    ("videojuegos", ["videojuegos", "software"]),
    ("desarrollo de software", ["software"]),
    ("arquitectura de software", ["software"]),
    ("redes", ["iot_redes"]),
    ("medicina con aiot", ["salud_digital", "ia"]),
    ("bioingenier", ["bioingenieria", "salud_digital"]),
    ("inteligencia artificial", ["ia"]),
    ("machine learning", ["ia", "datos"]),
    ("ciberfísic", ["electronica", "industria40", "iot_redes"]),
    ("robótica", ["robotica", "electronica"]),
    ("neurociencia con aiot", ["salud_digital"]),
    ("discapacidad y enfermedad", ["salud_digital"]),
]

# Project title keywords -> technology themes (the area does not always name every technique used).
TITLE_RULES = [
    ("visión", ["vision", "ia"]), ("vision", ["vision", "ia"]), ("realidad aumentada", ["vision"]),
    ("reconocimiento", ["vision", "ia"]), ("machine learning", ["ia"]), ("inteligencia artificial", ["ia"]),
    ("predic", ["ia", "datos"]), ("big data", ["datos"]), ("analítica", ["datos"]), ("data lake", ["datos"]),
    ("blockchain", ["seguridad"]), ("autenticación", ["seguridad"]), ("rfid", ["iot_redes"]),
    ("mqtt", ["iot_redes"]), ("gateway", ["iot_redes"]), ("eeg", ["salud_digital"]), ("wearable", ["salud_digital"]),
    ("robót", ["electronica"]), ("control", ["electronica"]),
]

SECTOR_RULES = [
    # Sectors used by the areas added after the original 100 projects.
    ("medio ambiente", ["ambiente"]), ("agro", ["agricultura"]), ("agua potable", ["agua"]),
    ("distribución de agua", ["agua"]), ("territorial", ["ciudades"]), ("finanzas", ["negocios"]),
    ("seguridad laboral", ["seguridad_industrial"]), ("discapacidad", ["rehabilitacion"]),
    ("agricultura", ["agricultura"]), ("agrícola", ["agricultura"]), ("plagas", ["agricultura"]),
    ("acuicultura", ["acuicultura"]), ("piscicultura", ["acuicultura"]),
    ("ganadería", ["ganaderia"]), ("animal", ["ganaderia"]),
    ("apicultura", ["biodiversidad", "agricultura"]), ("biodiversidad", ["biodiversidad"]),
    ("medioambiental", ["ambiente"]), ("ambiental", ["ambiente"]), ("meteorología", ["ambiente"]),
    ("residuos", ["ambiente"]), ("economía circular", ["ambiente"]),
    ("hídricos", ["agua", "ambiente"]),
    ("energ", ["energia"]), ("eléctrica", ["energia"]),
    ("edificios", ["edificios"]), ("domótica", ["edificios"]), ("hogares", ["edificios"]),
    ("ciudades", ["ciudades"]), ("transporte", ["ciudades"]), ("movilidad", ["ciudades"]),
    ("parqueaderos", ["ciudades"]), ("urbano", ["ciudades"]),
    ("salud", ["salud"]), ("medicina", ["salud"]), ("hospital", ["salud"]),
    ("neurología", ["neuro", "salud"]), ("neurociencia", ["neuro"]), ("salud mental", ["neuro"]),
    ("neurorrehabilitación", ["neuro", "rehabilitacion", "salud"]), ("neurodesarrollo", ["neuro", "salud"]),
    ("neurotecnología", ["neuro"]), ("enfermedades crónicas", ["salud"]), ("adulto mayor", ["salud"]),
    ("fisioterapia", ["rehabilitacion", "salud"]), ("deportes", ["rehabilitacion"]),
    ("farmac", ["farmacia"]),
    ("educación", ["educacion"]), ("formación", ["educacion"]), ("educativa", ["educacion"]),
    ("logística", ["logistica"]), ("cadena de suministro", ["logistica"]), ("carga", ["logistica"]),
    ("almacenes", ["logistica"]),
    ("cadena de frío", ["alimentos", "logistica"]), ("restaurantes", ["alimentos", "negocios"]),
    ("minería", ["seguridad_industrial"]), ("seguridad industrial", ["seguridad_industrial"]),
    ("salud ocupacional", ["seguridad_industrial"]), ("seguridad operacional", ["seguridad_industrial"]),
    ("mantenimiento", ["mantenimiento"]), ("propulsivos", ["mantenimiento"]),
    ("turismo", ["turismo"]), ("hotelería", ["turismo"]),
    ("retail", ["negocios"]), ("comercio", ["negocios"]),
    ("industria", ["industria40"]), ("manufactura", ["industria40"]), ("control de calidad", ["industria40"]),
    ("producción", ["industria40"]), ("cobots", ["industria40", "electronica"]),
    ("aeroespacial", ["aeroespacial"]),
    ("ciberseguridad", ["seguridad"]), ("forense", ["seguridad"]),
    ("telecomunicaciones", ["iot_redes"]), ("conectividad", ["iot_redes"]),
    ("sistemas embebidos", ["electronica"]),
]


def normalize_issn(value):
    """Return an 8-character ISSN without hyphen (uppercase X), or None."""
    cleaned = re.sub(r"[^0-9Xx]", "", value or "").upper()
    return cleaned if re.fullmatch(r"\d{7}[\dX]", cleaned) else None


def split_issns(value):
    """Split a SCImago ISSN cell such as '15424863, 00079235'."""
    return [issn for issn in (normalize_issn(part) for part in (value or "").split(",")) if issn]


def _split_list(value, separator=","):
    return [item.strip() for item in (value or "").split(separator) if item.strip()]


def _to_int(value):
    try:
        return int(str(value).strip())
    except ValueError:
        return None


def _to_float(value):
    try:
        return float(str(value).strip().replace(",", "."))
    except ValueError:
        return None


def load_doaj(handle):
    """Load DOAJ CSV rows of journals that charge neither APC nor other fees."""
    journals = []
    for row in csv.DictReader(handle):
        if row.get("APC", "").strip() != "No" or row.get("Has other fees", "").strip() != "No":
            continue
        issns = [i for i in (normalize_issn(row.get("Journal ISSN (print version)")),
                             normalize_issn(row.get("Journal EISSN (online version)"))) if i]
        if not issns:
            continue
        journals.append({
            "title": row.get("Journal title", "").strip(),
            "issns": issns,
            "url": row.get("Journal URL", "").strip(),
            "doaj_url": row.get("URL in DOAJ", "").strip(),
            "author_instructions_url": row.get("URL for journal's instructions for authors", "").strip(),
            "aims_scope_url": row.get("URL for journal's aims & scope", "").strip(),
            "publisher": row.get("Publisher", "").strip(),
            "country": row.get("Country of publisher", "").strip(),
            "languages": _split_list(row.get("Languages in which the journal accepts manuscripts")),
            "keywords": [k.lower() for k in _split_list(row.get("Keywords"))],
            "subjects": _split_list(row.get("Subjects"), "|"),
            "license": row.get("Journal license", "").strip(),
            "review": row.get("Review process", "").strip(),
            "weeks_to_publication": _to_int(row.get("Average number of weeks between article submission and publication", "")),
        })
    return journals


def _parse_categories(value):
    categories = []
    for part in _split_list(value, ";"):
        match = re.fullmatch(r"(.+?)\s*\((Q[1-4])\)", part)
        if match:
            categories.append({"name": match.group(1).strip(), "quartile": match.group(2)})
        else:
            categories.append({"name": part, "quartile": None})
    return categories


def load_scimago(handle):
    """Index SCImago journals that have a best quartile by every ISSN they list."""
    index = {}
    for row in csv.DictReader(handle, delimiter=";"):
        quartile = (row.get("SJR Best Quartile") or "").strip()
        if (row.get("Type") or "").strip().lower() != "journal" or quartile not in PUBLINDEX_BY_QUARTILE:
            continue
        entry = {
            "sourceid": (row.get("Sourceid") or "").strip(),
            "scimago_title": (row.get("Title") or "").strip(),
            "quartile": quartile,
            "sjr": _to_float(row.get("SJR")),
            "h_index": _to_int(row.get("H index")),
            "categories": _parse_categories(row.get("Categories")),
            "areas": _split_list(row.get("Areas"), ";"),
            "scimago_country": (row.get("Country") or "").strip(),
        }
        for issn in split_issns(row.get("Issn")):
            index.setdefault(issn, entry)
    return index


def publindex_category(quartile):
    return PUBLINDEX_BY_QUARTILE.get(quartile)


def journal_themes(categories, areas, text):
    """Return {theme: strength}: 2 for a SCImago category hit, 1 for a trusted keyword hit."""
    category_set = set(categories)
    area_set = set(areas)
    themes = {}
    for theme, spec in THEMES.items():
        if category_set & set(spec["categories"]):
            themes[theme] = 2
        elif (spec["areas"] is None or area_set & set(spec["areas"])) and any(p.search(text) for p in _COMPILED[theme]):
            themes[theme] = 1
    if area_set & APPLIED_AREAS:
        themes["tecnologia_aplicada"] = 1
    return themes


def is_humanities_led(categories):
    """True when humanities categories are at least as many as the other (non-neutral) categories."""
    names = [c for c in categories if c not in NEUTRAL_CATEGORIES]
    humanities = sum(1 for c in names if c in HUMANITIES_CATEGORIES)
    return humanities > 0 and humanities >= len(names) - humanities


def build_journals(doaj_journals, scimago_index):
    """Join free DOAJ journals with SCImago quartiles; keep only ranked journals.

    Several DOAJ records (e.g. a translated edition) can share one SCImago source; the first wins so
    every journal id is unique.
    """
    journals = []
    seen = set()
    for journal in doaj_journals:
        ranked = next((scimago_index[i] for i in journal["issns"] if i in scimago_index), None)
        if not ranked:
            continue
        journal_id = ranked["sourceid"] or journal["issns"][0]
        if journal_id in seen:
            continue
        seen.add(journal_id)
        merged = dict(journal)
        merged.update(ranked)
        merged["id"] = journal_id
        merged["publindex"] = publindex_category(ranked["quartile"])
        merged["scimago_url"] = (f"https://www.scimagojr.com/journalsearch.php?q={ranked['sourceid']}&tip=sid"
                                 if ranked["sourceid"] else "")
        text = " | ".join([journal["title"], *journal["subjects"], *journal["keywords"]])
        merged["themes"] = journal_themes([c["name"] for c in ranked["categories"]], ranked["areas"], text)
        journals.append(merged)
    journals.sort(key=lambda j: (j["quartile"], -(j["sjr"] or 0)))
    return journals


TEACHING_WORDS = ("formación", "enseñanza", "docencia", "aprendizaje", "educativ", "pedagog")


def _domain_sector(sector):
    """Sector text used for domain themes.

    "Educación superior - <sub>" names the university as a setting; it is an education topic only when the
    sub-sector is about teaching. "Industria creativa" (games, media) is not manufacturing.
    """
    text = sector.lower().replace("industria creativa", "creativa")
    prefix = "educación superior - "
    if text.startswith(prefix):
        sub = text[len(prefix):]
        return sub + (" educación" if any(w in sub for w in TEACHING_WORDS) else "")
    return text


def project_themes(project):
    """Return (technology themes, domain themes) for a project."""
    area = project.get("area", "").lower()
    sector = _domain_sector(project.get("sector", ""))
    title = project.get("title", "").lower()
    tech = {"computacion_general", "tecnologia_aplicada"}
    for needle, themes in AREA_RULES:
        if needle in area:
            tech.update(themes)
    for needle, themes in TITLE_RULES:
        if needle in title:
            tech.update(themes)
    domain = set()
    for needle, themes in SECTOR_RULES:
        if needle in sector:
            domain.update(themes)
    # A sector that only restates the technology (e.g. cybersecurity) is not a separate domain.
    domain -= tech
    return sorted(tech), sorted(domain)


def match_project(project, journals, limit=60):
    """Rank journals for a project: domain+technology fit first, then technology, then domain only.

    A technology-only journal accepts applied work from any domain, so it is a better target for an
    engineering paper than a domain journal with no technology signal.
    """
    tech, domain = project_themes(project)
    core_tech = set(tech) - {"computacion_general", "tecnologia_aplicada"}
    matches = []
    for journal in journals:
        if is_humanities_led([c["name"] for c in journal.get("categories", [])]):
            continue
        themes = journal["themes"]
        domain_hits = sorted(t for t in themes if t in domain)
        tech_hits = sorted(t for t in themes if t in core_tech)
        applied = "tecnologia_aplicada" in themes
        domain_strength = sum(themes[t] for t in domain_hits)
        tech_strength = sum(themes[t] for t in tech_hits)
        if domain_hits and (tech_hits or applied):
            fit, rank = "fuerte", 0
        elif tech_hits:
            fit, rank = "tecnologia", 1
        elif domain_hits:
            fit, rank = "sector", 2
        else:
            continue
        general = 0.5 if "computacion_general" in themes else 0
        score = (2 * min(domain_strength, 4) + 1.5 * min(tech_strength, 4) + general + (0.5 if applied else 0)
                 + QUARTILE_BONUS[journal["quartile"]] + min(journal.get("sjr") or 0, 2) / 10)
        hits = domain_hits + tech_hits + (["tecnologia_aplicada"] if applied and fit == "fuerte" else [])
        matches.append({"journal_id": journal["id"], "fit": fit, "score": round(score, 3), "_rank": rank,
                        "themes": hits})
    matches.sort(key=lambda m: (m["_rank"], -m["score"]))
    for match in matches:
        del match["_rank"]
    return matches[:limit]


def normalize_project(raw):
    """Normalize one project from the app bundle into the page's project shape."""
    title = raw.get("titulo", "").strip()
    match = re.match(r"^(\S+)\s+Proyecto\s+(\d+):\s*(.+)$", title)
    emoji, number, clean_title = (match.group(1), int(match.group(2)), match.group(3).strip()) if match else ("", None, title)
    description = raw.get("descripcion", "")
    problem_match = re.search(r"Problema:\s*(.+?)(?:\n\s*\n|$)", description, re.S)
    desc_match = re.search(r"Descripción:\s*(.+?)(?:\n\s*\n|$)", description, re.S)
    objectives = raw.get("objetivos") or []
    general = next((o for o in objectives if "Objetivo General" in o), objectives[0] if objectives else "")
    objective = re.sub(r"^.*?Objetivo General:\s*", "", general).strip()
    return {
        "id": raw["id"],
        "number": number,
        "emoji": emoji,
        "title": clean_title,
        "area": raw.get("area", ""),
        "sector": raw.get("sector", ""),
        "level": raw.get("nivel", ""),
        "problem": problem_match.group(1).strip() if problem_match else "",
        "description": desc_match.group(1).strip() if desc_match else "",
        "objective": objective,
        "skills": raw.get("habilidades") or [],
    }
