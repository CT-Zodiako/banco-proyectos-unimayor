import json
import pathlib
import re
import unittest

from pipeline import eventos as ev
from pipeline import projects as pr

FIXTURES = pathlib.Path(__file__).resolve().parent / "fixtures"
REAL_PROJECTS = pathlib.Path(__file__).resolve().parent.parent.parent / "donde-publicar" / "data" / "projects.json"


def fixture(project_id):
    entries = json.loads((FIXTURES / "projects.json").read_text(encoding="utf-8"))
    return next(entry for entry in entries if entry["id"] == project_id)


class ProjectProfileTest(unittest.TestCase):
    def test_sbc_iot_project(self):
        self.assertEqual(pr.project_profile(fixture("proj_001")), {
            "id": "proj_001", "title": "Sistema de Monitoreo Agrícola Distribuido con MQTT", "emoji": "🌾",
            "area": "SBC-IoT", "level": "Intermedio", "topics": ["IoT"],
            "keywords": ["mqtt", "agriculture", "precision agriculture", "esp32", "raspberry pi", "sensors",
                         "arduino", "time series"]})

    def test_health_project(self):
        self.assertEqual(pr.project_profile(fixture("proj_151")), {
            "id": "proj_151",
            "title": "Clasificador de Arritmias Cardíacas en ECG de Una Derivación con TinyML sobre ESP32-S3",
            "emoji": "🫀", "area": "Medicina con AIoT", "level": "Intermedio-Avanzado",
            "topics": ["IoT", "Inteligencia Artificial", "Machine Learning", "Salud y Bioingeniería"],
            "keywords": ["esp32", "tinyml", "ecg", "health", "deep learning"]})

    def test_videogame_project(self):
        self.assertEqual(pr.project_profile(fixture("proj_103")), {
            "id": "proj_103",
            "title": "Videojuego de Física con Experimentos Reales como Mecánica de Juego para Educación Media",
            "emoji": "🧲", "area": "Desarrollo de Videojuegos", "level": "Intermedio", "topics": ["Videojuegos"],
            "keywords": ["education", "games", "arduino", "sensors", "unity"]})

    def test_cybersecurity_project(self):
        self.assertEqual(pr.project_profile(fixture("proj_112")), {
            "id": "proj_112",
            "title": "Centro de Operaciones de Seguridad (SOC) de Bajo Costo con Wazuh para Pymes del Cauca",
            "emoji": "🛡️", "area": "Ciberseguridad", "level": "Intermedio-Avanzado", "topics": ["Ciberseguridad"],
            "keywords": ["siem", "smes", "commerce", "intrusion detection"]})

    def test_title_without_emoji_or_project_number(self):
        base = {"id": "proj_300", "area": "Robótica", "sector": "", "nivel": "Avanzado", "hardware": [],
                "software": []}
        self.assertEqual(pr.project_profile({**base, "titulo": "Proyecto 300: Brazo Robótico"})["emoji"], "🚀")
        self.assertEqual(pr.project_profile({**base, "titulo": "Proyecto 300: Brazo Robótico"})["title"],
                         "Brazo Robótico")
        self.assertEqual(pr.project_profile({**base, "titulo": "🦾 Brazo Robótico"})["title"], "Brazo Robótico")
        self.assertEqual(pr.project_profile({**base, "titulo": "IoT Brazo Robótico"})["emoji"], "🚀")
        self.assertEqual(pr.project_profile({**base, "titulo": "IoT Brazo Robótico"})["title"], "IoT Brazo Robótico")

    def test_stringified_python_lists_are_read(self):
        raw = {**fixture("proj_001"), "hardware": "['ESP32 (Microcontrolador | nodos)', 'LiDAR 2D (Sensor)']",
               "software": "['ROS 2 Humble: Framework de Robótica - navegación']"}
        self.assertEqual(pr.project_profile(raw)["keywords"],
                         ["mqtt", "agriculture", "precision agriculture", "esp32", "lidar", "ros"])


class ProjectProfilesTest(unittest.TestCase):
    def test_profiles_are_sorted_by_project_number(self):
        entries = json.loads((FIXTURES / "projects.json").read_text(encoding="utf-8"))
        self.assertEqual([p["id"] for p in pr.project_profiles(entries)],
                         ["proj_001", "proj_103", "proj_112", "proj_151"])

    def test_malformed_entries_name_the_index(self):
        with self.assertRaisesRegex(pr.ProjectsError, r"^the file must contain a JSON list of projects$"):
            pr.project_profiles({"id": "proj_001"})
        with self.assertRaisesRegex(pr.ProjectsError, r'^entry 1: "titulo" is required$'):
            pr.project_profiles([fixture("proj_001"), {"id": "proj_002"}])
        with self.assertRaisesRegex(pr.ProjectsError, r'^entry 0: must be a JSON object$'):
            pr.project_profiles(["proj_001"])


class RealProjectsFileTest(unittest.TestCase):
    """The bank export read by the build by default (apps/donde-publicar/data/projects.json)."""

    @classmethod
    def setUpClass(cls):
        cls.raw = json.loads(REAL_PROJECTS.read_text(encoding="utf-8"))
        cls.profiles = pr.project_profiles(cls.raw)

    def test_every_project_gets_a_profile_with_at_least_one_topic(self):
        self.assertEqual(len(self.profiles), len(self.raw))
        for profile in self.profiles:
            with self.subTest(profile["id"]):
                self.assertEqual(list(profile), ["id", "title", "emoji", "area", "level", "topics", "keywords"])
                self.assertGreaterEqual(len(profile["topics"]), 1)
                self.assertEqual(profile["topics"], ev.order_topics(profile["topics"]))

    def test_keywords_are_short_lowercase_accent_free_and_specific(self):
        for profile in self.profiles:
            with self.subTest(profile["id"]):
                keywords = profile["keywords"]
                self.assertLessEqual(len(keywords), 12)
                self.assertEqual(len(keywords), len(set(keywords)))
                for keyword in keywords:
                    self.assertRegex(keyword, r"^[a-z0-9][a-z0-9 .+-]*$")
                    self.assertFalse(set(re.split(r"[ -]", keyword)) & {"sistema", "proyecto", "datos", "desarrollo"})


if __name__ == "__main__":
    unittest.main()
