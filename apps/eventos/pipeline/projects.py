"""Project profiles for the project → events cross: topics and keywords of each bank project.

Input is the bank export apps/donde-publicar/data/projects.json (refreshed with `npm run export:projects` in
apps/banco-proyectos). Output follows "Project cross" in odd/tasks/eventos.md.

Every rule works on accent-free lower case text (see fold).
"""

import ast
import re
import unicodedata

from pipeline.eventos import TOPICS, order_topics

DEFAULT_EMOJI = "🚀"
_TITLE_RE = re.compile(r"^\s*(?:(\S+)\s+)?Proyecto\s+\d+\s*:\s*(.+)$")
MAX_KEYWORDS = 12

# Area → topics: every bank area matches at least one rule.
AREA_TOPICS = {
    "IoT": r"iot",  # SBC-IoT, AIoT, IoT Médico, IoT con Big Data...
    "Ciberseguridad": r"hacking|ciberseguridad",
    "Redes": r"\bredes\b",
    "Inteligencia Artificial": r"aiot|inteligencia artificial",
    "Machine Learning": r"machine learning|vision artificial|analitica",
    "Robótica": r"robotica",
    "Sistemas Ciberfísicos": r"ciberfisicos|industrial 4\.0|aeroespacial",
    "Desarrollo de Software": r"desarrollo de software|arquitectura de software",
    "Videojuegos": r"videojuegos",
    "Salud y Bioingeniería": r"medico|medicina|bioingenieria|salud|neurociencia|discapacidad",
    "Big Data": r"big data|analitica",
}

# Title and sector signals → extra topics. Plain "seguridad" (patient, flight safety) and plain "redes" (power
# grids) are left out on purpose.
SIGNAL_TOPICS = {
    "IoT": r"\biot\b|\bmqtt\b|\blora(wan)?\b|\bsensor(es)?\b|\bwearables?\b",
    "Ciberseguridad": r"ciberseguridad|ciberataques?|\bataques?\b|intrusion(es)?|criptograf\w*|vulnerabilidad(es)?"
                      r"|malware|forense|zero trust|\bsoc\b|pentest\w*|hacking",
    "Redes": r"telecomunicaciones|conectividad|\bwi-?fi\b|\b5g\b|redes? inalambric\w*|red mallada|redes privadas"
             r"|operacion de redes|formacion en redes|\bsdn\b",
    "Inteligencia Artificial": r"inteligencia artificial|\bia\b|vision artificial|traductor|lenguaje natural"
                               r"|chatbot",
    "Machine Learning": r"machine learning|aprendizaje (automatico|profundo|supervisado|por refuerzo|federado)"
                        r"|redes neuronales|tinyml|deep learning|\bmlops\b|clasificador\w*|predictiv\w*|pronostico",
    "Robótica": r"robot\w*|\bcobots?\b|\bros 2\b",
    "Sistemas Ciberfísicos": r"ciberfisic\w*|gemelo digital|hardware-in-the-loop|embebid\w*|industria 4\.0"
                             r"|lazo cerrado|\bplc\b|\bscada\b",
    "Desarrollo de Software": r"software|aplicacion (web|movil)|\bapp\b|microservicios|\bsaas\b|\bapi\b",
    "Videojuegos": r"videojuego\w*|\bjuegos?\b|gamificad\w*",
    "Salud y Bioingeniería": r"salud|medic(o|a|os|as|ina)\b|hospital\w*|pacientes?|clinic\w*|biomedic\w*"
                             r"|cardi(ac|olog)\w*|\becg\b|\beeg\b|neurociencia|rehabilitacion|fisioterapia|diabet\w*"
                             r"|alzheimer|farmac\w*",
    "Big Data": r"big data|datos masivos|ciencia de datos|datos abiertos|data lake",
}

# Technologies, searched in the title, then hardware names, then software names. Spanish terms map to the
# English term used in event titles.
TECH_KEYWORDS = [
    (r"\bmqtt\b|mosquitto", "mqtt"),
    (r"\blora(wan)?\b", "lora"),
    (r"\bzigbee\b", "zigbee"),
    (r"bluetooth|\bble\b", "bluetooth"),
    (r"\brfid\b", "rfid"),
    (r"\besp32", "esp32"),
    (r"\barduino\b", "arduino"),
    (r"raspberry pi", "raspberry pi"),
    (r"\bjetson\b", "jetson"),
    (r"\bstm32", "stm32"),
    (r"\bfpga\b", "fpga"),
    (r"\bsensor(es)?\b", "sensors"),
    (r"wearables?", "wearables"),
    (r"\blidar\b", "lidar"),
    (r"\bros\b", "ros"),
    (r"\bslam\b", "slam"),
    (r"\bdron(es)?\b|\buav\b", "drones"),
    (r"vision (artificial|por computador(a)?)|opencv", "computer vision"),
    (r"\byolo\w*|deteccion de objetos", "object detection"),
    (r"tinyml|tensorflow lite", "tinyml"),
    (r"aprendizaje profundo|deep learning|redes neuronales|convolucional\w*|keras|pytorch", "deep learning"),
    (r"aprendizaje por refuerzo", "reinforcement learning"),
    (r"aprendizaje federado", "federated learning"),
    (r"lenguaje natural|\bnlp\b|transformers", "natural language processing"),
    (r"traductor|traduccion", "machine translation"),
    (r"ia generativa|\bllms?\b|modelos? de lenguaje", "generative ai"),
    (r"gemelo digital", "digital twin"),
    (r"blockchain|cadena de bloques", "blockchain"),
    (r"computacion en el borde|edge computing", "edge computing"),
    (r"hardware-in-the-loop|\bhil\b", "hardware-in-the-loop"),
    (r"\bplc\b", "plc"),
    (r"\bscada\b", "scada"),
    (r"\b5g\b", "5g"),
    (r"\bwi-?fi\b", "wifi"),
    (r"\bsdn\b", "sdn"),
    (r"mallad\w*|\bmesh\b|libremesh", "mesh networks"),
    (r"kubernetes|\bk3s\b", "kubernetes"),
    (r"docker", "docker"),
    (r"microservicios", "microservices"),
    (r"devops", "devops"),
    (r"devsecops", "devsecops"),
    (r"\bnube\b|\bcloud\b", "cloud computing"),
    (r"terraform|infraestructura como codigo", "infrastructure as code"),
    (r"mlops|mlflow", "mlops"),
    (r"automl", "automl"),
    (r"observabilidad|opentelemetry|prometheus", "observability"),
    (r"realidad virtual|\bvr\b", "virtual reality"),
    (r"realidad aumentada", "augmented reality"),
    (r"\bunity\b", "unity"),
    (r"\bgodot\b", "godot"),
    (r"unreal", "unreal engine"),
    (r"poscuantica|post-?quantum", "post-quantum cryptography"),
    (r"criptograf\w*", "cryptography"),
    (r"intrusion(es)?|suricata|snort", "intrusion detection"),
    (r"\bddos\b", "ddos"),
    (r"zero trust", "zero trust"),
    (r"malware", "malware"),
    (r"forense", "digital forensics"),
    (r"pentest\w*|pruebas de penetracion", "penetration testing"),
    (r"\bsiem\b|wazuh|\bsoc\b|centro de operaciones de seguridad", "siem"),
    (r"firmware", "firmware"),
    (r"\beeg\b|electroencefalogr\w*", "eeg"),
    (r"\becg\b|electrocardiogr\w*", "ecg"),
    (r"\bemg\b|electromiogr\w*", "emg"),
    (r"interfaz cerebro|\bbci\b", "brain-computer interface"),
    (r"series (temporales|de tiempo)|influxdb", "time series"),
    (r"mantenimiento predictivo", "predictive maintenance"),
    (r"anomal\w*", "anomaly detection"),
    (r"enjambre", "swarm robotics"),
    (r"sentinel-?2|imagenes satelitales|teledeteccion", "remote sensing"),
    (r"\bv2v\b|\bv2x\b", "v2x"),
    (r"autonom\w*", "autonomous"),
    (r"\bspark\b", "apache spark"),
    (r"kafka", "kafka"),
    (r"accesibilidad", "accessibility"),
]

# Domain words, searched in the title, then the sector. English terms, since most events are in English.
DOMAIN_KEYWORDS = [
    (r"agricultura de precision", "precision agriculture"),
    (r"agricol\w*|agricultur\w*|\bagro\w*|cultivos?|invernadero\w*|hidroponi\w*|caficultura|poscosecha",
     "agriculture"),
    (r"\bcafe\w*|caficultura", "coffee"),
    (r"ganader\w*|ordeno|lecher\w*|bovin\w*", "livestock"),
    (r"acuicultura|piscicultura", "aquaculture"),
    (r"apicultura|colmena\w*", "beekeeping"),
    (r"salud|medic(o|a|os|as|ina)\b|hospital\w*|clinic\w*|pacientes?|cardi(ac|olog)\w*", "health"),
    (r"bioingenieria|biomedic\w*", "biomedical"),
    (r"neurocien\w*|cerebr\w*|cognitiv\w*", "neuroscience"),
    (r"rehabilitacion|fisioterapia|protesis|ortesis", "rehabilitation"),
    (r"seguridad laboral|salud ocupacional|seguridad y salud", "occupational safety"),
    (r"ciudad(es)? inteligentes?|smart cit\w*|urban\w*", "smart city"),
    (r"domotica|inmotica|hogar(es)? inteligentes?|edificios? inteligentes?|edificaciones", "smart home"),
    (r"redes electricas inteligentes|smart grid|microrred\w*", "smart grid"),
    (r"energ\w*|electric[ao]s?\b", "energy"),
    (r"educa\w*|ensenanza|e-learning|formacion|escuelas?|colegios?|didactic\w*|\baulas?\b", "education"),
    (r"videojuego\w*|\bjuegos?\b", "games"),
    (r"gamific\w*", "gamification"),
    (r"industria 4\.0|fabrica inteligente|smart factory", "industry 4.0"),
    (r"manufactur\w*", "manufacturing"),
    (r"\bindustria(l|les)?\b", "industrial"),
    (r"transporte|movilidad|vehicul\w*|trafico", "transportation"),
    (r"logistic\w*|cadena de (suministro|frio)|almacen\w*|entregas", "logistics"),
    (r"ambiental\w*|medio ambiente|sostenib\w*|ecosistemas?|biodiversidad|residuos|emisiones|climatic\w*",
     "environment"),
    (r"\bagua\b|hidric\w*", "water"),
    (r"aeroespacial|aeronaut\w*|aviacion|\baere[oa]s?\b", "aerospace"),
    (r"satelit\w*|cubesat", "satellite"),
    (r"turismo|hoteler\w*", "tourism"),
    (r"deport\w*|fitness", "sports"),
    (r"\bmineria\b", "mining"),
    (r"finanz\w*|ahorro y credito|economia solidaria", "finance"),
    (r"gobierno|ciudadan\w*|alcaldias?|entidades publicas", "e-government"),
    (r"discapacidad|inclusion", "accessibility"),
    (r"patrimonio|museos?", "cultural heritage"),
    (r"indigenas?|nasa yuwe|linguistic\w*", "indigenous languages"),
    (r"comercio|retail", "commerce"),
    (r"pymes|pequenas y medianas empresas|microempresas", "smes"),
    (r"ciencia de datos", "data science"),
]

_AREA_RES = {topic: re.compile(pattern) for topic, pattern in AREA_TOPICS.items()}
_SIGNAL_RES = {topic: re.compile(pattern) for topic, pattern in SIGNAL_TOPICS.items()}
_TECH_RES = [(re.compile(pattern), keyword) for pattern, keyword in TECH_KEYWORDS]
_DOMAIN_RES = [(re.compile(pattern), keyword) for pattern, keyword in DOMAIN_KEYWORDS]

assert set(AREA_TOPICS) == set(SIGNAL_TOPICS) == set(TOPICS)


class ProjectsError(ValueError):
    """The projects file is not a list of bank projects; the message names the entry index."""


def fold(text):
    """Lower case, accent-free text ("Agrícola" -> "agricola")."""
    text = unicodedata.normalize("NFKD", text or "").encode("ascii", "ignore").decode()
    return re.sub(r"\s+", " ", text.lower()).strip()


def split_title(titulo):
    """(emoji, title) from "🌾 Proyecto 1: Título". The emoji is the first token when it has at most 4 characters
    and no letters or digits, else 🚀; the title is the text after "Proyecto N:" when present."""
    titulo = (titulo or "").strip()
    first, _, rest = titulo.partition(" ")
    if first and len(first) <= 4 and not any(char.isalnum() for char in first):
        emoji, titulo = first, rest.strip()
    else:
        emoji = DEFAULT_EMOJI
    match = _TITLE_RE.match(titulo)
    return emoji, (match.group(2).strip() if match else titulo)


def _items(value):
    """List fields of the export; some exports hold them as a stringified Python list."""
    if isinstance(value, str):
        text = value.strip()
        if text.startswith("["):
            try:
                value = ast.literal_eval(text)
            except (ValueError, SyntaxError):
                return [text]
        else:
            return [text] if text else []
    return [str(item) for item in value or [] if item]


def project_topics(area, sector, title):
    """Topics from the area rules plus title and sector signals, in TOPICS order."""
    area, signals = fold(area), fold(title) + " | " + fold(sector)
    topics = [topic for topic, pattern in _AREA_RES.items() if pattern.search(area)]
    topics += [topic for topic, pattern in _SIGNAL_RES.items() if pattern.search(signals)]
    return order_topics(topics)


def project_keywords(title, sector, hardware, software):
    """Up to MAX_KEYWORDS terms: title technologies and domain, sector domain, hardware and software technologies.

    Hardware items count only their name (before " ("), software items only their name (before ":"), so the
    free-text descriptions add no noise."""
    hardware = " | ".join(fold(item.split(" (")[0]) for item in hardware)
    software = " | ".join(fold(item.split(":")[0]) for item in software)
    title, sector = fold(title), fold(sector)
    keywords = []
    for text, table in ((title, _TECH_RES), (title, _DOMAIN_RES), (sector, _DOMAIN_RES), (hardware, _TECH_RES),
                        (software, _TECH_RES)):
        for pattern, keyword in table:
            if keyword not in keywords and pattern.search(text):
                keywords.append(keyword)
    return keywords[:MAX_KEYWORDS]


def project_profile(raw):
    """{"id", "title", "emoji", "area", "level", "topics", "keywords"} of one exported bank project."""
    emoji, title = split_title(raw.get("titulo"))
    area, sector = raw.get("area") or "", raw.get("sector") or ""
    return {
        "id": raw["id"], "title": title, "emoji": emoji, "area": area, "level": raw.get("nivel") or None,
        "topics": project_topics(area, sector, title),
        "keywords": project_keywords(title, sector, _items(raw.get("hardware")), _items(raw.get("software"))),
    }


def _number(profile):
    digits = re.search(r"\d+", profile["id"])
    return (int(digits.group(0)) if digits else float("inf"), profile["id"])


def project_profiles(entries):
    """Profiles of every project, sorted by project number; raises ProjectsError("entry N: ...") on bad entries."""
    if not isinstance(entries, list):
        raise ProjectsError("the file must contain a JSON list of projects")
    profiles = []
    for index, entry in enumerate(entries):
        if not isinstance(entry, dict):
            raise ProjectsError(f"entry {index}: must be a JSON object")
        for key in ("id", "titulo"):
            if not isinstance(entry.get(key), str) or not entry[key].strip():
                raise ProjectsError(f'entry {index}: "{key}" is required')
        profiles.append(project_profile(entry))
    return sorted(profiles, key=_number)
