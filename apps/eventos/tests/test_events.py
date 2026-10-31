import datetime
import json
import unittest

from pipeline import eventos as ev

TODAY = datetime.date(2026, 10, 31)


def event(**fields):
    base = {"id": "x-1", "title": "X 2027", "name": None, "kind": "cfp", "start": None, "end": None,
            "deadline": None, "location": None, "country": None, "online": False, "url": "https://x.example/",
            "source": "wikicfp", "topics": []}
    base.update(fields)
    return base


CICI = {"title": "CICI 2027 — IV Congreso Internacional de Ciencia e Ingeniería", "kind": "cfp",
        "start": "2027-04-14", "end": "2027-04-16", "deadline": "2027-02-26", "location": "Pasto, Colombia",
        "online": True, "url": "https://cici.umariana.edu.co/", "topics": ["Inteligencia Artificial"],
        "notes": "Dates checked on the official site."}


class ManualTest(unittest.TestCase):
    def test_valid_entry_is_normalized_to_the_schema(self):
        self.assertEqual(ev.validate_manual([CICI]), [
            {"id": "manual-cici-2027", "title": "CICI 2027 — IV Congreso Internacional de Ciencia e Ingeniería",
             "name": None, "kind": "cfp", "start": "2027-04-14", "end": "2027-04-16", "deadline": "2027-02-26",
             "location": "Pasto, Colombia", "country": "Colombia", "online": True,
             "url": "https://cici.umariana.edu.co/", "source": "manual", "topics": ["Inteligencia Artificial"]},
        ])

    def test_optional_fields_default_and_explicit_values_are_kept(self):
        entry = {"id": "manual-feria-2026", "title": "Feria TIC", "name": "Feria de tecnología", "kind": "attend",
                 "start": "2026-11-20", "url": "http://feria.example/", "country": "Colombia"}
        self.assertEqual(ev.validate_manual([entry]), [
            {"id": "manual-feria-2026", "title": "Feria TIC", "name": "Feria de tecnología", "kind": "attend",
             "start": "2026-11-20", "end": None, "deadline": None, "location": None, "country": "Colombia",
             "online": False, "url": "http://feria.example/", "source": "manual", "topics": []},
        ])

    def test_invalid_entries_name_the_index_and_the_problem(self):
        ok = {"title": "A", "kind": "cfp", "deadline": "2027-01-01", "url": "https://a.example/"}
        cases = [
            ("not a list", {"title": "A"}, "the file must contain a JSON list of events"),
            ("not an object", [ok, "x"], 'entry 1: must be a JSON object'),
            ("no title", [ok, {**ok, "title": " "}], 'entry 1: "title" is required'),
            ("bad kind", [{**ok, "kind": "talk"}], 'entry 0: "kind" must be "cfp" or "attend"'),
            ("bad url", [{**ok, "url": "ftp://a.example/"}], 'entry 0: "url" must start with http:// or https://'),
            ("no dates", [{"title": "A", "kind": "cfp", "url": "https://a.example/"}],
             'entry 0: needs "start" or "deadline"'),
            ("attend without start", [{**ok, "kind": "attend"}], 'entry 0: "attend" events need "start"'),
            ("bad date", [{**ok, "deadline": "2027-02-30"}], 'entry 0: "deadline" must be an ISO date YYYY-MM-DD'),
            ("text date", [{**ok, "start": "14/04/2027"}], 'entry 0: "start" must be an ISO date YYYY-MM-DD'),
            ("end before start", [{**ok, "start": "2027-04-16", "end": "2027-04-14"}],
             'entry 0: "end" is before "start"'),
            ("unknown topic", [{**ok, "topics": ["IoT", "Química"]}], 'entry 0: unknown topic "Química"'),
            ("online not bool", [{**ok, "online": "yes"}], 'entry 0: "online" must be true or false'),
            ("unknown field", [{**ok, "fecha": "2027"}], 'entry 0: unknown field "fecha"'),
            ("duplicate id", [ok, ok], 'entry 1: duplicate id "manual-a"'),
        ]
        for label, entries, message in cases:
            with self.subTest(label):
                with self.assertRaises(ev.ManualEventsError) as caught:
                    ev.validate_manual(entries)
                self.assertEqual(str(caught.exception), message)


class ExpiryTest(unittest.TestCase):
    def test_cfp_uses_the_deadline_and_today_is_not_expired(self):
        self.assertFalse(ev.is_expired(event(deadline="2026-10-31"), TODAY))
        self.assertTrue(ev.is_expired(event(deadline="2026-10-30", start="2027-03-01"), TODAY))
        self.assertFalse(ev.is_expired(event(deadline="2026-11-01"), TODAY))

    def test_cfp_without_deadline_needs_a_future_start(self):
        self.assertFalse(ev.is_expired(event(start="2026-10-31"), TODAY))
        self.assertTrue(ev.is_expired(event(start="2026-10-30"), TODAY))
        self.assertTrue(ev.is_expired(event(), TODAY))

    def test_cfp_without_deadline_running_until_its_end_is_kept(self):
        # Same rule as the page (site/filters.js): a cfp without deadline closes at its end, else its start.
        self.assertFalse(ev.is_expired(event(start="2026-10-20", end="2026-11-02"), TODAY))
        self.assertTrue(ev.is_expired(event(start="2026-10-20", end="2026-10-30"), TODAY))

    def test_attend_uses_the_end_then_the_start(self):
        attend = {"kind": "attend"}
        self.assertFalse(ev.is_expired(event(**attend, start="2026-10-01", end="2026-10-31"), TODAY))
        self.assertTrue(ev.is_expired(event(**attend, start="2026-10-01", end="2026-10-30"), TODAY))
        self.assertFalse(ev.is_expired(event(**attend, start="2026-10-31"), TODAY))
        self.assertTrue(ev.is_expired(event(**attend, start="2026-10-30"), TODAY))
        self.assertTrue(ev.is_expired(event(**attend, deadline="2026-12-01"), TODAY))

    def test_drop_expired_keeps_order(self):
        kept = event(id="a", deadline="2026-10-31")
        later = event(id="c", deadline="2026-12-01")
        self.assertEqual(ev.drop_expired([kept, event(id="b", deadline="2026-10-01"), later], TODAY), [kept, later])


class MergeTest(unittest.TestCase):
    def test_same_wikicfp_event_under_two_topics_is_one_event(self):
        first = event(id="wikicfp-1", title="DCOSS-IoT 2027", topics=["IoT"])
        second = event(id="wikicfp-1", title="DCOSS-IoT 2027", topics=["Redes", "IoT"])
        self.assertEqual(ev.merge_events([first, second]), [event(id="wikicfp-1", title="DCOSS-IoT 2027",
                                                                  topics=["IoT", "Redes"])])

    def test_manual_wins_over_other_sources_and_fills_missing_fields(self):
        wikicfp = event(id="wikicfp-9", title="CICI 2027", name="Congreso Internacional de Ciencia e Ingeniería",
                        deadline="2027-02-20", location="Pasto, Colombia", country="Colombia", topics=["IoT"])
        manual = ev.validate_manual([CICI])[0]
        self.assertEqual(ev.merge_events([wikicfp, manual]), [{
            **manual, "name": "Congreso Internacional de Ciencia e Ingeniería",
            "topics": ["IoT", "Inteligencia Artificial"]}])

    def test_ccfddl_wins_over_wikicfp_and_org_prefixes_are_ignored(self):
        ccf = event(id="ccfddl-ricai27", title="RICAI 2027", source="ccfddl", deadline="2026-12-01",
                    topics=["Inteligencia Artificial"])
        wiki = event(id="wikicfp-5", title="IEEE-RICAI 2027", name="IEEE Conference on RICAI", start="2027-03-27",
                     deadline="2026-11-20", topics=["Robótica"])
        self.assertEqual(ev.merge_events([wiki, ccf]), [{
            **ccf, "name": "IEEE Conference on RICAI", "start": "2027-03-27",
            "topics": ["Inteligencia Artificial", "Robótica"]}])

    def test_different_years_or_acronyms_are_not_merged(self):
        events = [event(id="a", title="AAAI 2027"), event(id="b", title="AAAI 2028"),
                  event(id="c", title="AAAI-W 2027"), event(id="d", title="Untitled")]
        self.assertEqual(ev.merge_events(events), events)

    def test_dedupe_key(self):
        self.assertEqual(ev.dedupe_key(event(title="IEEE-RICAI 2027")), "ricai2027")
        self.assertEqual(ev.dedupe_key(event(title="ACM SenSys 2027")), "sensys2027")
        self.assertEqual(ev.dedupe_key(event(title="CICI 2027 — IV Congreso")), "cici2027")
        self.assertEqual(ev.dedupe_key(event(title="Feria TIC", start="2026-11-20")), "feriatic2026")
        self.assertIsNone(ev.dedupe_key(event(title="Feria TIC")))


class OutputTest(unittest.TestCase):
    def test_events_sorted_by_deadline_then_start_with_title_tiebreak(self):
        a = event(id="a", title="B 2027", deadline="2026-11-05")
        b = event(id="b", title="A 2027", deadline="2026-11-05")
        c = event(id="c", title="C 2027", start="2026-11-01")
        d = event(id="d", title="D 2027", kind="attend", start="2026-11-02", end="2026-11-09")
        self.assertEqual([e["id"] for e in ev.sort_events([a, b, c, d])], ["c", "d", "b", "a"])

    def test_data_js_is_one_assignment_with_the_payload(self):
        payload = ev.build_payload([event(id="m", source="manual", deadline="2026-11-01")],
                                   {"wikicfp": 0, "ccfddl": 0, "devpost": 0, "manual": 1}, TODAY)
        self.assertEqual(payload["generated"], "2026-10-31")
        self.assertEqual(payload["topics"], ["IoT", "Ciberseguridad", "Redes", "Inteligencia Artificial",
                                             "Machine Learning", "Robótica", "Sistemas Ciberfísicos",
                                             "Desarrollo de Software", "Videojuegos", "Salud y Bioingeniería",
                                             "Big Data"])
        text = ev.render_data_js(payload)
        self.assertTrue(text.startswith("window.EVENTOS = {"))
        self.assertTrue(text.endswith("};\n"))
        self.assertEqual(json.loads(text[len("window.EVENTOS = "):-2]), payload)


if __name__ == "__main__":
    unittest.main()
