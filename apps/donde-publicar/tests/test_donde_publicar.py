"""Tests for the "donde publicar" pipeline (stdlib unittest, no network)."""

import contextlib
import csv
import io
import json
import unittest

from pipeline import donde_publicar as dp

DOAJ_HEADER = [
    "Journal title", "Journal URL", "URL in DOAJ", "Journal ISSN (print version)",
    "Journal EISSN (online version)", "Keywords", "Languages in which the journal accepts manuscripts",
    "Publisher", "Country of publisher", "Journal license", "Review process",
    "Average number of weeks between article submission and publication", "APC", "APC amount",
    "Has other fees", "Subjects", "URL for journal's instructions for authors", "URL for journal's aims & scope",
]


def doaj_csv(rows):
    buf = io.StringIO()
    writer = csv.DictWriter(buf, fieldnames=DOAJ_HEADER)
    writer.writeheader()
    for row in rows:
        full = {key: "" for key in DOAJ_HEADER}
        full.update(row)
        writer.writerow(full)
    return io.StringIO(buf.getvalue())


SCIMAGO_HEADER = (
    "Rank;Sourceid;Title;Type;Issn;Publisher;Open Access;Open Access Diamond;SJR;SJR Best Quartile;"
    "H index;Total Docs. (2025);Country;Region;Coverage;Categories;Areas"
)


def scimago_csv(lines):
    return io.StringIO("\n".join([SCIMAGO_HEADER] + lines) + "\n")


class IssnTests(unittest.TestCase):
    def test_normalizes_hyphen_and_lowercase_x(self):
        self.assertEqual(dp.normalize_issn("1234-567x"), "1234567X")

    def test_rejects_blank_and_malformed(self):
        self.assertIsNone(dp.normalize_issn(""))
        self.assertIsNone(dp.normalize_issn("-"))
        self.assertIsNone(dp.normalize_issn("12345"))

    def test_splits_scimago_issn_list(self):
        self.assertEqual(dp.split_issns("15424863, 0007923x"), ["15424863", "0007923X"])


class DoajTests(unittest.TestCase):
    def test_keeps_only_journals_without_apc_and_without_other_fees(self):
        rows = [
            {"Journal title": "Free J", "Journal ISSN (print version)": "1111-1111", "APC": "No", "Has other fees": "No"},
            {"Journal title": "APC J", "Journal ISSN (print version)": "2222-2222", "APC": "Yes", "Has other fees": "No"},
            {"Journal title": "Fees J", "Journal ISSN (print version)": "3333-3333", "APC": "No", "Has other fees": "Yes"},
        ]
        journals = dp.load_doaj(doaj_csv(rows))
        self.assertEqual([j["title"] for j in journals], ["Free J"])

    def test_extracts_issns_languages_and_keywords(self):
        rows = [{
            "Journal title": "Free J", "Journal ISSN (print version)": "1111-1111",
            "Journal EISSN (online version)": "2222-222X", "APC": "No", "Has other fees": "No",
            "Languages in which the journal accepts manuscripts": "English, Spanish",
            "Keywords": "internet of things, sensors", "Subjects": "Technology: Electronics | Science: Computer science",
            "Average number of weeks between article submission and publication": "12",
        }]
        journal = dp.load_doaj(doaj_csv(rows))[0]
        self.assertEqual(journal["issns"], ["11111111", "2222222X"])
        self.assertEqual(journal["languages"], ["English", "Spanish"])
        self.assertEqual(journal["keywords"], ["internet of things", "sensors"])
        self.assertEqual(journal["subjects"], ["Technology: Electronics", "Science: Computer science"])
        self.assertEqual(journal["weeks_to_publication"], 12)


class FormatLinkTests(unittest.TestCase):
    def test_keeps_author_instructions_and_aims_and_scope_urls(self):
        rows = [{"Journal title": "Free J", "Journal ISSN (print version)": "1111-1111", "APC": "No", "Has other fees": "No",
                 "URL for journal's instructions for authors": "https://j.example/authors",
                 "URL for journal's aims & scope": "https://j.example/scope"}]
        journal = dp.load_doaj(doaj_csv(rows))[0]
        self.assertEqual(journal["author_instructions_url"], "https://j.example/authors")
        self.assertEqual(journal["aims_scope_url"], "https://j.example/scope")


class ScimagoTests(unittest.TestCase):
    def test_parses_quartile_decimal_comma_sjr_and_categories(self):
        lines = ['1;123;"Sensor Journal";journal;"15424863, 00079235";Pub;Yes;Yes;1,234;Q2;45;100;Colombia;'
                 'Latin America;2001-2025;"Computer Networks and Communications (Q2); Signal Processing (Q3)";'
                 '"Computer Science; Engineering"']
        source = dp.load_scimago(scimago_csv(lines))
        entry = source["15424863"]
        self.assertIs(source["00079235"], entry)
        self.assertEqual(entry["quartile"], "Q2")
        self.assertAlmostEqual(entry["sjr"], 1.234)
        self.assertEqual(entry["h_index"], 45)
        self.assertEqual(entry["categories"], [
            {"name": "Computer Networks and Communications", "quartile": "Q2"},
            {"name": "Signal Processing", "quartile": "Q3"},
        ])
        self.assertEqual(entry["sourceid"], "123")

    def test_skips_entries_without_quartile_and_non_journals(self):
        lines = [
            '1;1;"No Quartile";journal;"11111111";Pub;No;No;0,1;-;1;1;Spain;Western Europe;2020;"X";"Y"',
            '2;2;"Conference";conference and proceedings;"22222222";Pub;No;No;0,5;Q1;1;1;Spain;W;2020;"X (Q1)";"Y"',
        ]
        self.assertEqual(dp.load_scimago(scimago_csv(lines)), {})


class JoinTests(unittest.TestCase):
    def test_includes_only_free_journals_with_quartile_matched_by_any_issn(self):
        doaj = dp.load_doaj(doaj_csv([
            {"Journal title": "Diamond Q3", "Journal EISSN (online version)": "1111-1111", "APC": "No", "Has other fees": "No"},
            {"Journal title": "Diamond no rank", "Journal ISSN (print version)": "4444-4444", "APC": "No", "Has other fees": "No"},
        ]))
        sjr = dp.load_scimago(scimago_csv([
            '1;9;"Diamond Q3";journal;"99999999, 11111111";Pub;Yes;Yes;0,3;Q3;10;1;Mexico;LA;2020;"Software (Q3)";"CS"',
        ]))
        journals = dp.build_journals(doaj, sjr)
        self.assertEqual(len(journals), 1)
        self.assertEqual(journals[0]["title"], "Diamond Q3")
        self.assertEqual(journals[0]["quartile"], "Q3")
        self.assertEqual(journals[0]["publindex"], "B")

    def test_doaj_records_sharing_one_scimago_source_become_one_journal(self):
        doaj = dp.load_doaj(doaj_csv([
            {"Journal title": "Rev Cardio", "Journal ISSN (print version)": "1111-1111", "APC": "No", "Has other fees": "No"},
            {"Journal title": "Rev Cardio (English Ed.)", "Journal ISSN (print version)": "5555-5555", "APC": "No", "Has other fees": "No"},
        ]))
        sjr = dp.load_scimago(scimago_csv([
            '1;42;"Rev Cardio";journal;"11111111, 55555555";Pub;Yes;Yes;0,3;Q3;10;1;Spain;W;2020;"Cardiology and Cardiovascular Medicine (Q3)";"Medicine"',
        ]))
        journals = dp.build_journals(doaj, sjr)
        self.assertEqual([(j["id"], j["title"]) for j in journals], [("42", "Rev Cardio")])

    def test_homologation_maps_quartiles_to_publindex(self):
        self.assertEqual([dp.publindex_category(q) for q in ["Q1", "Q2", "Q3", "Q4"]], ["A1", "A2", "B", "C"])


class ThemeTests(unittest.TestCase):
    def test_project_themes_come_from_area_and_sector(self):
        project = {"area": "IoT Hacking y Ciberseguridad", "sector": "Acuicultura y piscicultura inteligente"}
        tech, domain = dp.project_themes(project)
        self.assertIn("seguridad", tech)
        self.assertIn("acuicultura", domain)

    def test_project_title_adds_technology_themes(self):
        project = {"area": "IoT Industrial 4.0 y Manufactura Inteligente", "sector": "Industria - Control de calidad",
                   "title": "Sistema de Control de Calidad Automatizado con Visión Artificial"}
        tech, _ = dp.project_themes(project)
        self.assertIn("vision", tech)
        self.assertIn("industria40", tech)

    def test_new_bank_areas_map_to_technology_themes(self):
        expected = {
            "Desarrollo de Videojuegos": {"videojuegos", "software"},
            "Desarrollo de Software": {"software"},
            "Arquitectura de Software": {"software"},
            "Redes": {"iot_redes"},
            "Medicina con AIoT": {"salud_digital", "ia"},
            "Bioingeniería": {"bioingenieria"},
            "Inteligencia Artificial": {"ia"},
            "Machine Learning": {"ia", "datos"},
            "Sistemas Ciberfísicos": {"electronica", "industria40"},
            "Robótica": {"robotica", "electronica"},
            "Ciberseguridad": {"seguridad"},
        }
        for area, themes in expected.items():
            tech, _ = dp.project_themes({"area": area, "sector": "Educación superior", "title": "Proyecto"})
            self.assertTrue(themes <= set(tech), f"{area}: {tech}")

    def test_university_setting_is_not_an_education_topic(self):
        _, setting = dp.project_themes({"area": "Robótica", "sector": "Educación superior - Gestión de laboratorios"})
        self.assertNotIn("educacion", setting)
        _, teaching = dp.project_themes({"area": "Redes", "sector": "Educación superior - Formación en redes"})
        self.assertIn("educacion", teaching)
        _, plain = dp.project_themes({"area": "AIoT", "sector": "Educación inteligente y e-learning"})
        self.assertIn("educacion", plain)

    def test_new_bank_sectors_map_to_domains(self):
        expected = {
            "Medio ambiente - Ordenamiento territorial": {"ambiente", "ciudades"},
            "Agro - Caficultura": {"agricultura"},
            "Agroindustria - Poscosecha de café": {"agricultura"},
            "Servicios públicos - Agua potable rural": {"agua"},
            "Gobierno - Planeación territorial": {"ciudades"},
            "Finanzas - Economía solidaria": {"negocios"},
            "Seguridad laboral - Manipulación remota de sustancias peligrosas": {"seguridad_industrial"},
            "Inclusión - Discapacidad motora severa": {"rehabilitacion"},
        }
        for sector, themes in expected.items():
            _, domain = dp.project_themes({"area": "Machine Learning", "sector": sector})
            self.assertTrue(themes <= set(domain), f"{sector}: {domain}")

    def test_remote_sensing_journals_are_environmental(self):
        self.assertIn("ambiente", dp.journal_themes(["Computers in Earth Sciences"], ["Earth and Planetary Sciences"], ""))

    def test_creative_industry_is_not_industry_4_0(self):
        _, domain = dp.project_themes({"area": "Desarrollo de Videojuegos", "sector": "Industria creativa - Estudios de videojuego"})
        self.assertNotIn("industria40", domain)
        _, factory = dp.project_themes({"area": "AIoT", "sector": "Industria - Control de calidad y empaque"})
        self.assertIn("industria40", factory)

    def test_new_technology_themes_recognize_journals(self):
        cs = ["Computer Science"]
        self.assertIn("videojuegos", dp.journal_themes(["Human-Computer Interaction"], cs, ""))
        self.assertIn("videojuegos", dp.journal_themes([], cs, "serious games, gamification"))
        self.assertIn("software", dp.journal_themes([], cs, "software engineering"))
        self.assertIn("robotica", dp.journal_themes([], ["Engineering"], "mobile robots"))
        self.assertIn("bioingenieria", dp.journal_themes(["Biomedical Engineering"], ["Engineering"], ""))

    def test_short_terms_match_whole_words_only(self):
        cs = ["Computer Science"]
        self.assertIn("iot_redes", dp.journal_themes([], cs, "Journal of IoT systems"))
        self.assertNotIn("iot_redes", dp.journal_themes([], cs, "Patriot studies"))

    def test_scimago_category_is_a_strong_signal(self):
        themes = dp.journal_themes(["Agronomy and Crop Science"], ["Agricultural and Biological Sciences"], "")
        self.assertEqual(themes["agricultura"], 2)

    def test_keyword_counts_only_inside_a_coherent_scimago_area(self):
        # A history journal mentioning agriculture must not become an agriculture journal.
        history = dp.journal_themes(["History"], ["Arts and Humanities"], "agrarian history, agriculture")
        self.assertNotIn("agricultura", history)
        agro = dp.journal_themes(["Plant Science"], ["Agricultural and Biological Sciences"], "precision agriculture")
        self.assertIn("agricultura", agro)


class MatchTests(unittest.TestCase):
    def journal(self, title, categories, areas, quartile="Q3"):
        return {"id": title, "title": title, "quartile": quartile, "sjr": 0.3,
                "themes": dp.journal_themes(categories, areas, "")}

    def test_ranks_strong_fit_then_technology_then_sector(self):
        project = {"id": "proj_x", "area": "IoT con Big Data y Analítica", "sector": "Agricultura de precisión"}
        agro, cs = "Agronomy and Crop Science", "Information Systems"
        both = self.journal("Both", [agro, cs], ["Agricultural and Biological Sciences", "Computer Science"])
        domain = self.journal("Domain", [agro], ["Agricultural and Biological Sciences"], quartile="Q1")
        tech = self.journal("Tech", [cs], ["Computer Science"], quartile="Q1")
        unrelated = self.journal("None", ["History"], ["Arts and Humanities"])
        matches = dp.match_project(project, [tech, unrelated, domain, both])
        self.assertEqual([m["journal_id"] for m in matches], ["Both", "Tech", "Domain"])
        self.assertEqual([m["fit"] for m in matches], ["fuerte", "tecnologia", "sector"])

    def test_domain_journal_with_applied_technology_keywords_is_a_strong_fit(self):
        project = {"id": "proj_z", "area": "SBC-IoT", "sector": "Agricultura de precisión"}
        journal = {"id": "AgroTech", "title": "AgroTech", "quartile": "Q2", "sjr": 0.5,
                   "themes": dp.journal_themes(["Agronomy and Crop Science"], ["Agricultural and Biological Sciences"],
                                               "smart farming, sensors")}
        self.assertEqual(dp.match_project(project, [journal])[0]["fit"], "fuerte")

    def test_engineering_area_marks_a_domain_journal_as_applied(self):
        project = {"id": "proj_e", "area": "SBC-IoT", "sector": "Agricultura de precisión"}
        journal = {"id": "AgroEng", "title": "AgroEng", "quartile": "Q2", "sjr": 0.5,
                   "themes": dp.journal_themes(["Agronomy and Crop Science"],
                                               ["Agricultural and Biological Sciences", "Engineering"], "")}
        self.assertEqual(dp.match_project(project, [journal])[0]["fit"], "fuerte")

    def test_generic_technology_keyword_is_not_an_applied_signal(self):
        project = {"id": "proj_g", "area": "SBC-IoT", "sector": "Salud médica y hospitalaria"}
        journal = {"id": "HealthPromo", "title": "HealthPromo", "quartile": "Q1", "sjr": 0.9,
                   "themes": dp.journal_themes(["Medicine (miscellaneous)"], ["Medicine"],
                                               "health technology, monitoring, devices")}
        self.assertEqual(dp.match_project(project, [journal])[0]["fit"], "sector")

    def test_library_science_led_journals_are_excluded(self):
        self.assertTrue(dp.is_humanities_led(["Health Informatics", "Library and Information Sciences"]))

    def test_humanities_led_journals_are_excluded(self):
        project = {"id": "proj_h", "area": "SBC-IoT", "sector": "Agricultura de precisión"}
        categories = ["History", "Agricultural and Biological Sciences (miscellaneous)",
                      "Arts and Humanities (miscellaneous)", "Multidisciplinary", "Geography, Planning and Development"]
        journal = {"id": "Historia Agraria", "title": "Historia Agraria", "quartile": "Q1", "sjr": 0.4,
                   "categories": [{"name": c, "quartile": "Q2"} for c in categories],
                   "themes": dp.journal_themes(categories, ["Arts and Humanities", "Agricultural and Biological Sciences"], "")}
        self.assertTrue(dp.is_humanities_led(categories))
        self.assertEqual(dp.match_project(project, [journal]), [])

    def test_generic_engineering_journal_alone_is_not_suggested(self):
        project = {"id": "proj_y", "area": "SBC-IoT", "sector": "Agricultura de precisión"}
        journal = self.journal("GeneralEng", ["Engineering (miscellaneous)"], ["Engineering"])
        self.assertEqual(dp.match_project(project, [journal]), [])


class ProjectSourceTests(unittest.TestCase):
    def test_bank_export_projects_are_normalized_like_bundle_projects(self):
        raw = {"id": "proj_201", "titulo": "🦾 Proyecto 201: Brazo Robótico", "descripcion": "Problema: A.\n\nDescripción: B.",
               "area": "Robótica", "sector": "Industria - Automatización", "nivel": "Avanzado",
               "objetivos": ["🎯 Objetivo General: Clasificar piezas"], "habilidades": ["ROS 2"]}
        project = dp.normalize_project(raw)
        self.assertEqual((project["number"], project["title"], project["area"]), (201, "Brazo Robótico", "Robótica"))


class ProjectTests(unittest.TestCase):
    def test_normalizes_bundle_project(self):
        raw = {
            "id": "proj_007", "titulo": "🏙️ Proyecto 7: Conteo de Personas",
            "descripcion": "Problema: Hay aglomeraciones.\n\nDescripción: Cámaras con IA.",
            "area": "AIoT", "sector": "Ciudades inteligentes (Smart Cities)", "nivel": "Avanzado",
            "objetivos": ["🎯 Objetivo General: Contar personas"], "habilidades": ["Visión"],
        }
        project = dp.normalize_project(raw)
        self.assertEqual(project["number"], 7)
        self.assertEqual(project["emoji"], "🏙️")
        self.assertEqual(project["title"], "Conteo de Personas")
        self.assertEqual(project["problem"], "Hay aglomeraciones.")
        self.assertEqual(project["description"], "Cámaras con IA.")
        self.assertEqual(project["objective"], "Contar personas")


class BuildCliTests(unittest.TestCase):
    """End-to-end checks of the public build command with small fixture files."""

    def setUp(self):
        import tempfile
        self.tmp = tempfile.TemporaryDirectory()
        self.dir = __import__("pathlib").Path(self.tmp.name)
        (self.dir / "projects.json").write_text(json.dumps([{
            "id": "proj_001", "titulo": "🌾 Proyecto 1: Monitoreo Agrícola con MQTT",
            "descripcion": "Problema: Sin datos.\n\nDescripción: Sensores.", "area": "SBC-IoT",
            "sector": "Agricultura de precisión", "nivel": "Intermedio", "objetivos": [], "habilidades": [],
        }]), encoding="utf-8")
        (self.dir / "doaj.csv").write_text(doaj_csv([
            {"Journal title": "Agro Engineering", "Journal ISSN (print version)": "1111-1111", "APC": "No",
             "Has other fees": "No", "Languages in which the journal accepts manuscripts": "Spanish"},
            {"Journal title": "Paid Agro", "Journal ISSN (print version)": "2222-2222", "APC": "Yes", "Has other fees": "No"},
        ]).getvalue(), encoding="utf-8")
        (self.dir / "scimago.csv").write_text(scimago_csv([
            '1;7;"Agro Engineering";journal;"11111111";Pub;Yes;Yes;0,5;Q2;20;1;Colombia;LA;2020;'
            '"Agronomy and Crop Science (Q2)";"Agricultural and Biological Sciences; Engineering"',
            '2;8;"Paid Agro";journal;"22222222";Pub;Yes;No;0,9;Q1;20;1;Chile;LA;2020;'
            '"Agronomy and Crop Science (Q1)";"Agricultural and Biological Sciences; Engineering"',
        ]).getvalue(), encoding="utf-8")

    def tearDown(self):
        self.tmp.cleanup()

    def args(self, **overrides):
        paths = {"projects": "projects.json", "doaj": "doaj.csv", "scimago": "scimago.csv",
                 "out": "data.js", "catalog-out": "catalog.js"}
        paths.update(overrides)
        argv = []
        for key, name in paths.items():
            argv += [f"--{key}", str(self.dir / name)]
        return argv

    def read_js(self, name, variable):
        text = (self.dir / name).read_text(encoding="utf-8")
        prefix = f"window.{variable} = "
        self.assertTrue(text.startswith(prefix))
        return json.loads(text[len(prefix):].rstrip().rstrip(";"))

    def test_build_writes_projects_with_only_free_ranked_journals(self):
        from pipeline import build
        stdout = io.StringIO()
        with contextlib.redirect_stdout(stdout):
            code = build.main(self.args())
        self.assertEqual(code, 0)
        self.assertIn("projects=1 doaj_free=1 diamond_ranked=1 journals_used=1 catalog=1", stdout.getvalue())
        data = self.read_js("data.js", "DONDE_PUBLICAR")
        self.assertEqual([j["title"] for j in data["journals"]], ["Agro Engineering"])
        self.assertIn("aims_scope_url", data["journals"][0])
        self.assertEqual(data["journals"][0]["publindex"], "A2")
        match = data["projects"][0]["matches"][0]
        self.assertEqual((match["journal_id"], match["fit"]), ("7", "fuerte"))
        catalog = self.read_js("catalog.js", "DONDE_PUBLICAR_CATALOGO")
        self.assertEqual([j["title"] for j in catalog], ["Agro Engineering"])

    def test_missing_input_fails_without_writing_output(self):
        from pipeline import build
        stderr = io.StringIO()
        with contextlib.redirect_stderr(stderr):
            code = build.main(self.args(scimago="missing.csv"))
        self.assertEqual(code, 1)
        self.assertEqual(stderr.getvalue(), f"error: missing input file {self.dir / 'missing.csv'}\n")
        self.assertFalse((self.dir / "data.js").exists())
        self.assertFalse((self.dir / "catalog.js").exists())


if __name__ == "__main__":
    unittest.main()
