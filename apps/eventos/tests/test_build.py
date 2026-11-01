import contextlib
import io
import json
import pathlib
import shutil
import tempfile
import unittest

from pipeline import build

FIXTURES = pathlib.Path(__file__).resolve().parent / "fixtures"
CICI = {"title": "CICI 2027 — IV Congreso Internacional de Ciencia e Ingeniería", "kind": "cfp",
        "start": "2027-04-14", "end": "2027-04-16", "deadline": "2027-02-26", "location": "Pasto, Colombia",
        "online": True, "url": "https://cici.umariana.edu.co/", "topics": ["Inteligencia Artificial"]}


class OfflineBuildTest(unittest.TestCase):
    def setUp(self):
        self.tmp = pathlib.Path(tempfile.mkdtemp())
        self.raw = self.tmp / "raw"
        self.manual = self.tmp / "manual-events.json"
        self.out = self.tmp / "site" / "data.js"
        self.manual.write_text(json.dumps([CICI]), encoding="utf-8")
        self.projects = self.tmp / "projects.json"
        shutil.copy(FIXTURES / "projects.json", self.projects)

    def tearDown(self):
        shutil.rmtree(self.tmp)

    def cache(self, wikicfp=True, ccfddl=True, devpost=True):
        if wikicfp:
            (self.raw / "wikicfp").mkdir(parents=True)
            shutil.copy(FIXTURES / "wikicfp-call.html", self.raw / "wikicfp" / "internet-of-things-p1.html")
        if ccfddl:
            (self.raw / "ccfddl").mkdir(parents=True)
            shutil.copy(FIXTURES / "ccfddl-allconf.json", self.raw / "ccfddl" / "allconf.json")
        if devpost:
            (self.raw / "devpost").mkdir(parents=True)
            shutil.copy(FIXTURES / "devpost-page-1.json", self.raw / "devpost" / "page-1.json")

    def run_build(self):
        stdout, stderr = io.StringIO(), io.StringIO()
        with contextlib.redirect_stdout(stdout), contextlib.redirect_stderr(stderr):
            code = build.main(["--offline", "--today", "2026-10-31", "--wikicfp-pages", "1", "--raw", str(self.raw),
                               "--manual", str(self.manual), "--projects", str(self.projects),
                               "--out", str(self.out)])
        return code, stdout.getvalue(), stderr.getvalue()

    def payload(self):
        text = self.out.read_text(encoding="utf-8")
        self.assertTrue(text.startswith("window.EVENTOS = "))
        self.assertTrue(text.endswith(";\n"))
        return json.loads(text[len("window.EVENTOS = "):-2])

    def test_all_sources_merged_filtered_and_sorted(self):
        self.cache()
        code, stdout, _ = self.run_build()
        self.assertEqual(code, 0)
        self.assertEqual(stdout, f"wikicfp=4 ccfddl=3 devpost=3 manual=1 events=11 projects=4 out={self.out}\n")
        payload = self.payload()
        self.assertEqual(payload["generated"], "2026-10-31")
        self.assertEqual(payload["sources"], {"wikicfp": 4, "ccfddl": 3, "devpost": 3, "manual": 1})
        self.assertEqual(len(payload["topics"]), 11)
        self.assertEqual([e["id"] for e in payload["events"]], [
            "wikicfp-203261", "ccfddl-sensys27", "wikicfp-199930",
            "ccfddl-aaai27", "devpost-31302", "devpost-40002", "wikicfp-199931", "devpost-40001",
            "wikicfp-199932", "manual-cici-2027", "ccfddl-cog27"])
        self.assertEqual(list(payload), ["generated", "sources", "topics", "events", "projects"])
        self.assertEqual([p["id"] for p in payload["projects"]], ["proj_001", "proj_103", "proj_112", "proj_151"])
        self.assertEqual(payload["projects"][0]["topics"], ["IoT"])

    def test_one_failing_source_is_reported_as_zero(self):
        self.cache(wikicfp=False, devpost=False)
        code, stdout, stderr = self.run_build()
        self.assertEqual(code, 0)
        self.assertEqual(stdout, f"wikicfp=0 ccfddl=3 devpost=0 manual=1 events=4 projects=4 out={self.out}\n")
        self.assertIn("warning: wikicfp failed:", stderr)
        self.assertIn("warning: devpost failed:", stderr)
        self.assertEqual(self.payload()["sources"], {"wikicfp": 0, "ccfddl": 3, "devpost": 0, "manual": 1})

    def test_all_sources_failing_exits_non_zero_without_writing(self):
        code, stdout, stderr = self.run_build()
        self.assertEqual(code, 1)
        self.assertEqual(stdout, "")
        self.assertTrue(stderr.endswith("error: every public source failed; site/data.js was not written\n"))
        self.assertFalse(self.out.exists())

    def test_invalid_manual_file_exits_non_zero_without_writing(self):
        self.cache()
        self.manual.write_text(json.dumps([CICI, {**CICI, "kind": "talk"}]), encoding="utf-8")
        code, stdout, stderr = self.run_build()
        self.assertEqual(code, 1)
        self.assertEqual(stdout, "")
        self.assertEqual(stderr, f'error: {self.manual}: entry 1: "kind" must be "cfp" or "attend"\n')
        self.assertFalse(self.out.exists())

    def test_unreadable_manual_json_exits_non_zero(self):
        self.cache()
        self.manual.write_text("[{", encoding="utf-8")
        code, _, stderr = self.run_build()
        self.assertEqual(code, 1)
        self.assertTrue(stderr.startswith(f"error: {self.manual}: invalid JSON"))
        self.assertFalse(self.out.exists())

    def test_missing_projects_file_warns_and_writes_no_projects(self):
        self.cache()
        self.projects.unlink()
        code, stdout, stderr = self.run_build()
        self.assertEqual(code, 0)
        self.assertEqual(stdout, f"wikicfp=4 ccfddl=3 devpost=3 manual=1 events=11 projects=0 out={self.out}\n")
        self.assertEqual(stderr.splitlines()[0], f"warning: missing projects file {self.projects}; writing projects: []")
        payload = self.payload()
        self.assertEqual(payload["projects"], [])
        self.assertEqual(len(payload["events"]), 11)

    def test_unreadable_projects_json_exits_non_zero_without_writing(self):
        self.cache()
        self.projects.write_text("[{", encoding="utf-8")
        code, stdout, stderr = self.run_build()
        self.assertEqual(code, 1)
        self.assertEqual(stdout, "")
        self.assertTrue(stderr.startswith(f"error: {self.projects}: invalid JSON ("))
        self.assertFalse(self.out.exists())

    def test_invalid_projects_entry_exits_non_zero_without_writing(self):
        self.cache()
        self.projects.write_text(json.dumps([{"id": "proj_001"}]), encoding="utf-8")
        code, stdout, stderr = self.run_build()
        self.assertEqual(code, 1)
        self.assertEqual(stdout, "")
        self.assertEqual(stderr, f'error: {self.projects}: entry 0: "titulo" is required\n')
        self.assertFalse(self.out.exists())


class SeedManualFileTest(unittest.TestCase):
    def test_repository_manual_file_is_valid(self):
        from pipeline import eventos as ev
        path = pathlib.Path(__file__).resolve().parent.parent / "data" / "manual-events.json"
        events = ev.validate_manual(json.loads(path.read_text(encoding="utf-8")))
        self.assertIn("manual-cici-2027", [e["id"] for e in events])


if __name__ == "__main__":
    unittest.main()
