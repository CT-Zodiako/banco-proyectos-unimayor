"""Tests for pipeline.build (stdlib unittest, no network): per-source dates and the empty-catalog guard."""

import contextlib
import io
import json
import os
import pathlib
import shutil
import tempfile
import unittest

from pipeline import build
from tests.test_donde_publicar import SCIMAGO_HEADER, doaj_csv

PROJECT = {"id": "proj_001", "titulo": "🌾 Proyecto 1: Monitoreo agrícola IoT con MQTT", "area": "SBC-IoT",
           "sector": "Agricultura", "descripcion": "", "objetivos": []}
DIAMOND = {"Journal title": "Sensores Abiertos", "Journal EISSN (online version)": "1111-1111", "APC": "No",
           "Has other fees": "No", "Languages in which the journal accepts manuscripts": "Spanish, English"}
RANKED = ('1;9;"Sensores Abiertos";journal;"11111111";Pub;Yes;Yes;0,3;Q3;10;1;Colombia;Latin America;2020;'
          '"Computer Networks and Communications (Q3)";"Computer Science"')


class BuildTest(unittest.TestCase):
    def setUp(self):
        self.tmp = pathlib.Path(tempfile.mkdtemp())
        self.projects = self.tmp / "projects.json"
        self.projects.write_text(json.dumps([PROJECT]), encoding="utf-8")
        self.doaj = self.tmp / "journals.csv"
        self.doaj.write_text(doaj_csv([DIAMOND]).getvalue(), encoding="utf-8")
        self.scimago = self.tmp / "scimagojr.csv"
        self.write_scimago(SCIMAGO_HEADER, [RANKED])
        self.out = self.tmp / "site" / "data.js"
        self.catalog = self.tmp / "site" / "catalog.js"

    def tearDown(self):
        shutil.rmtree(self.tmp)

    def write_scimago(self, header, lines):
        self.scimago.write_text("\ufeff" + "\n".join([header] + lines) + "\n", encoding="utf-8")

    def run_build(self, *extra):
        stdout, stderr = io.StringIO(), io.StringIO()
        with contextlib.redirect_stdout(stdout), contextlib.redirect_stderr(stderr):
            code = build.main(["--projects", str(self.projects), "--doaj", str(self.doaj), "--scimago",
                               str(self.scimago), "--templates", str(self.tmp / "none.json"), "--out", str(self.out),
                               "--catalog-out", str(self.catalog), *extra])
        return code, stdout.getvalue(), stderr.getvalue()

    def payload(self):
        text = self.out.read_text(encoding="utf-8")
        prefix = "window.DONDE_PUBLICAR = "
        self.assertTrue(text.startswith(prefix))
        return json.loads(text[len(prefix):-2])

    def test_records_doaj_date_option_and_scimago_edition_from_header(self):
        code, stdout, stderr = self.run_build("--doaj-date", "2026-11-09")
        self.assertEqual((code, stderr), (0, ""))
        self.assertTrue(stdout.startswith("projects=1 doaj_free=1 diamond_ranked=1 "))
        sources = self.payload()["sources"]
        self.assertEqual(sources["doaj_downloaded"], "2026-11-09")
        self.assertEqual(sources["scimago_edition"], 2025)
        self.assertEqual(sources["doaj_free_journals"], 1)
        self.assertEqual(sources["diamond_ranked_journals"], 1)

    def test_doaj_date_defaults_to_the_file_modification_day(self):
        stamp = 1793664000  # 2026-11-03 00:00 UTC; noon local time keeps the day in any time zone
        os.utime(self.doaj, (stamp + 12 * 3600, stamp + 12 * 3600))
        code, _, _ = self.run_build()
        self.assertEqual(code, 0)
        self.assertEqual(self.payload()["sources"]["doaj_downloaded"], "2026-11-03")

    def test_scimago_header_without_year_gives_no_edition(self):
        self.write_scimago(SCIMAGO_HEADER.replace("Total Docs. (2025)", "Total Docs."), [RANKED])
        code, _, _ = self.run_build("--doaj-date", "2026-11-09")
        self.assertEqual(code, 0)
        self.assertIsNone(self.payload()["sources"]["scimago_edition"])

    def test_invalid_doaj_date_exits_with_usage_error(self):
        with self.assertRaises(SystemExit) as raised, contextlib.redirect_stderr(io.StringIO()) as stderr:
            build.main(["--doaj-date", "09/11/2026"])
        self.assertEqual(raised.exception.code, 2)
        self.assertIn("--doaj-date", stderr.getvalue())

    def test_empty_join_exits_non_zero_without_writing(self):
        self.doaj.write_text(doaj_csv([]).getvalue(), encoding="utf-8")
        self.out.parent.mkdir()
        self.out.write_text("previous\n", encoding="utf-8")
        code, stdout, stderr = self.run_build("--doaj-date", "2026-11-09")
        self.assertEqual(code, 1)
        self.assertEqual(stdout, "")
        self.assertEqual(stderr, "error: no DOAJ journal without fees has a SCImago quartile; "
                                 "site/data.js and site/catalog.js were not written\n")
        self.assertEqual(self.out.read_text(encoding="utf-8"), "previous\n")
        self.assertFalse(self.catalog.exists())

    def test_missing_input_still_exits_with_its_error(self):
        self.scimago.unlink()
        code, stdout, stderr = self.run_build()
        self.assertEqual((code, stdout), (1, ""))
        self.assertEqual(stderr, f"error: missing input file {self.scimago}\n")
        self.assertFalse(self.out.exists())

