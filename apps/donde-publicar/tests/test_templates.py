"""Tests for downloadable template detection (no network)."""

import contextlib
import io
import json
import pathlib
import tempfile
import unittest

from pipeline import templates as tp

FBT_PAGE = "https://fbt.tums.ac.ir/index.php/fbt/about/submissions"
CDBME_PAGE = "https://www.degruyter.com/journal/key/cdbme/html#authors"


class FindTemplateLinksTests(unittest.TestCase):
    def test_finds_absolute_word_template(self):
        html = '<a href="https://fbt.tums.ac.ir/public/FBT_original_article_template.docx">Template</a>'
        self.assertEqual(tp.find_template_links(html, FBT_PAGE), [
            {"url": "https://fbt.tums.ac.ir/public/FBT_original_article_template.docx", "kind": "Word"},
        ])

    def test_resolves_relative_links_and_classifies_latex_and_word(self):
        html = ('<a href="/publication/journal_key/CDBME/downloadAsset/CDBME_Proceedings%20Template%20LaTeX.zip">a</a>'
                '<a href="/publication/journal_key/CDBME/downloadAsset/CDBME_Proceedings%20Template%20Word.docx">b</a>'
                '<a href="https://www.degruyter.com/publication/journal_key/CDBME/downloadAsset/CDBME_Proceedings%20Template%20LaTeX.zip">dup</a>')
        self.assertEqual(tp.find_template_links(html, CDBME_PAGE), [
            {"url": "https://www.degruyter.com/publication/journal_key/CDBME/downloadAsset/CDBME_Proceedings%20Template%20LaTeX.zip", "kind": "LaTeX"},
            {"url": "https://www.degruyter.com/publication/journal_key/CDBME/downloadAsset/CDBME_Proceedings%20Template%20Word.docx", "kind": "Word"},
        ])

    def test_ignores_files_whose_name_is_not_a_template(self):
        html = '<a href="../data/nmj/news/CTA.docx">Copyright transfer agreement</a>'
        self.assertEqual(tp.find_template_links(html, "https://nmj.mums.ac.ir/page/authors"), [])

    def test_ignores_stylesheets_and_pages_that_mention_template(self):
        html = ('<link href="./templates/tmpl_modern01/css/reset.css?version=1">'
                '<a href="/contactForm?role=other&amp;request=generalInquiry&amp;inquiryTemplate=cancelOrder">x</a>')
        self.assertEqual(tp.find_template_links(html, "https://payeshjournal.ir/page/authors"), [])

    def test_ignores_templates_hosted_on_another_journal_domain(self):
        html = '<a href="https://zookeys.pensoft.net/i/Pensoft-PR-TEMPLATE.docx">Template</a>'
        self.assertEqual(tp.find_template_links(html, "https://ese.arphahub.com/about#Authorinstructions"), [])

    def test_accepts_spanish_names_and_query_strings(self):
        html = "<a href='/files/Plantilla_articulo_2024.dotx?download=1'>Plantilla</a>"
        self.assertEqual(tp.find_template_links(html, "https://revistas.unal.edu.co/index.php/dyna/autores"), [
            {"url": "https://revistas.unal.edu.co/files/Plantilla_articulo_2024.dotx?download=1", "kind": "Word"},
        ])


class UrlNormalizationTests(unittest.TestCase):
    def test_spaces_in_template_links_are_percent_encoded_once(self):
        html = ('<a href="/uploadfile/mpce/20240408/MPCE Word Template.docx">a</a>'
                '<a href="/files/Already%20Encoded%20Template.docx">b</a>')
        self.assertEqual([t["url"] for t in tp.find_template_links(html, "https://www.mpce.example/authors")], [
            "https://www.mpce.example/uploadfile/mpce/20240408/MPCE%20Word%20Template.docx",
            "https://www.mpce.example/files/Already%20Encoded%20Template.docx",
        ])


class CrawlRobustnessTests(unittest.TestCase):
    def test_an_unexpected_error_on_one_journal_is_reported_not_raised(self):
        def boom(url, timeout):
            raise RuntimeError("unexpected")
        original = tp._fetch_page
        tp._fetch_page = boom
        try:
            result = tp._check_journal({"id": "j1", "author_instructions_url": "https://j.example/a"}, 1)
        finally:
            tp._fetch_page = original
        self.assertEqual(result, ("j1", [], "error-RuntimeError"))


class SharedTemplateTests(unittest.TestCase):
    def test_a_template_shared_by_several_journals_stays_only_where_its_name_fits(self):
        npe = {"url": "https://pubs.aip.org/npe/NPE-template-2025.docx", "kind": "Word"}
        copernicus = {"url": "https://www.copernicus.org/Copernicus_Word_template.docx", "kind": "Word"}
        own = {"url": "https://fbt.tums.ac.ir/public/FBT_original_article_template.docx", "kind": "Word"}
        results = {"mre": [npe], "npe": [npe], "ijfe": [npe], "ar": [copernicus], "gh": [copernicus], "fbt": [own]}
        journals = {
            "mre": {"title": "Matter and Radiation at Extremes", "publisher": "AIP Publishing LLC"},
            "npe": {"title": "Nanotechnology and Precision Engineering", "publisher": "AIP Publishing LLC"},
            "ijfe": {"title": "International Journal of Fluid Engineering", "publisher": "AIP Publishing LLC"},
            "ar": {"title": "Aerosol Research", "publisher": "Copernicus Publications"},
            "gh": {"title": "Geographica Helvetica", "publisher": "Copernicus Publications"},
            "fbt": {"title": "Frontiers in Biomedical Technologies", "publisher": "Tehran University of Medical Sciences"},
        }
        self.assertEqual(tp.drop_foreign_shared(results, journals),
                         {"npe": [npe], "ar": [copernicus], "gh": [copernicus], "fbt": [own]})

    def test_acronym_ignores_short_connectors(self):
        self.assertEqual(tp.acronym("Nanotechnology and Precision Engineering"), "npe")
        self.assertEqual(tp.acronym("Journal of the Medical Library Association"), "jmla")


class SslFallbackTests(unittest.TestCase):
    def test_ssl_failures_retry_with_curl(self):
        import ssl
        import urllib.error
        calls = []

        def ssl_error(url, timeout):
            raise urllib.error.URLError(ssl.SSLError(1, "unable to get local issuer certificate"))

        def curl_page(url, timeout):
            calls.append(url)
            return '<a href="/t/Journal_template.docx">t</a>', url

        originals = (tp._fetch_page, tp._fetch_page_curl, tp._file_ok)
        tp._fetch_page, tp._fetch_page_curl, tp._file_ok = ssl_error, curl_page, lambda url, timeout: True
        try:
            result = tp._check_journal({"id": "j", "author_instructions_url": "https://j.example/a"}, 1)
        finally:
            tp._fetch_page, tp._fetch_page_curl, tp._file_ok = originals
        self.assertEqual(calls, ["https://j.example/a"])
        self.assertEqual(result, ("j", [{"url": "https://j.example/t/Journal_template.docx", "kind": "Word"}], "ok-curl"))


class RegisteredDomainTests(unittest.TestCase):
    def test_keeps_country_second_level_domains(self):
        self.assertEqual(tp.registered_domain("https://fbt.tums.ac.ir/x"), "tums.ac.ir")
        self.assertEqual(tp.registered_domain("https://revistas.unal.edu.co/x"), "unal.edu.co")
        self.assertEqual(tp.registered_domain("https://www.degruyter.com/x"), "degruyter.com")


class FileResponseTests(unittest.TestCase):
    def test_html_responses_are_not_files(self):
        self.assertFalse(tp.looks_like_file(200, "text/html; charset=utf-8"))
        self.assertFalse(tp.looks_like_file(404, "application/zip"))
        self.assertTrue(tp.looks_like_file(200, "application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
        self.assertTrue(tp.looks_like_file(200, "application/octet-stream"))


class BuildMergesTemplatesTests(unittest.TestCase):
    def test_build_attaches_templates_to_journals(self):
        from pipeline import build
        from tests.test_donde_publicar import doaj_csv, scimago_csv
        with tempfile.TemporaryDirectory() as tmp:
            d = pathlib.Path(tmp)
            (d / "projects.json").write_text(json.dumps([{
                "id": "proj_001", "titulo": "🌾 Proyecto 1: Monitoreo Agrícola", "descripcion": "Problema: a\n\nDescripción: b",
                "area": "SBC-IoT", "sector": "Agricultura de precisión", "nivel": "Intermedio", "objetivos": [], "habilidades": [],
            }]), encoding="utf-8")
            (d / "doaj.csv").write_text(doaj_csv([{"Journal title": "Agro Engineering", "Journal ISSN (print version)": "1111-1111",
                                                   "APC": "No", "Has other fees": "No"}]).getvalue(), encoding="utf-8")
            (d / "scimago.csv").write_text(scimago_csv([
                '1;7;"Agro Engineering";journal;"11111111";Pub;Yes;Yes;0,5;Q2;20;1;Colombia;LA;2020;'
                '"Agronomy and Crop Science (Q2)";"Agricultural and Biological Sciences; Engineering"']).getvalue(), encoding="utf-8")
            template = {"url": "https://agro.example/plantilla.docx", "kind": "Word"}
            (d / "templates.json").write_text(json.dumps({"checked": "2026-10-31", "journals": {"7": [template]}}), encoding="utf-8")
            argv = []
            for key, name in {"projects": "projects.json", "doaj": "doaj.csv", "scimago": "scimago.csv", "templates": "templates.json",
                              "out": "data.js", "catalog-out": "catalog.js"}.items():
                argv += [f"--{key}", str(d / name)]
            with contextlib.redirect_stdout(io.StringIO()):
                self.assertEqual(build.main(argv), 0)
            text = (d / "data.js").read_text(encoding="utf-8")
            data = json.loads(text[len("window.DONDE_PUBLICAR = "):].rstrip().rstrip(";"))
            self.assertEqual(data["journals"][0]["templates"], [template])


if __name__ == "__main__":
    unittest.main()
