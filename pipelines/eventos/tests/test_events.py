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


def conference(**fields):
    """A dated WikiCFP-style event for the cleaning tests."""
    return event(**{"start": "2027-01-09", "end": "2027-01-11", "deadline": "2026-11-20",
                    "location": "Tokyo, Japan", "country": "Japan", **fields})


class CleanTextTest(unittest.TestCase):
    def test_real_titles_are_cleaned(self):
        table = {
            "AAIE--EI 2027": "AAIE 2027",
            "ICoSSE--Ei 2027": "ICoSSE 2027",
            "ICRAI--EI 2026": "ICRAI 2026",
            "PEMM--ESCI 2027": "PEMM 2027",
            "ACM--CFP--RobCE 2027": "ACM RobCE 2027",
            "Ei/Scopus-ACAI 2026": "ACAI 2026",
            "Ei/Scopus/CPCI-ICRPA 2027": "ICRPA 2027",
            "Ei/Scopus-CDIVP 2027": "CDIVP 2027",
        }
        for raw, clean in table.items():
            self.assertEqual(ev.clean_text(raw), clean, raw)

    def test_real_names_are_cleaned(self):
        table = {
            "ACM--2026 The 9th International Conference on Virtual Reality Technology (ICVRT 2026)":
                "ACM 2026 The 9th International Conference on Virtual Reality Technology (ICVRT 2026)",
            "IEEE--2027 the 13th International Conference on Mechatronics and Robotics Engineering":
                "IEEE 2027 the 13th International Conference on Mechatronics and Robotics Engineering",
            "Springer--2027 6th International Conference on Intelligent Systems Design":
                "Springer 2027 6th International Conference on Intelligent Systems Design",
            "SPIE--2026 The 3rd International Conference on Measurement": "SPIE 2026 The 3rd International Conference on Measurement",
            "IET--2027 The 10th International Conference on Software Engineering":
                "IET 2027 The 10th International Conference on Software Engineering",
            "2027 13th International Conference on Computer Technology Applications (ICCTA 2027)--ESCI":
                "2027 13th International Conference on Computer Technology Applications (ICCTA 2027)",
        }
        for raw, clean in table.items():
            self.assertEqual(ev.clean_text(raw), clean, raw)

    def test_legitimate_titles_are_left_alone(self):
        for text in ["IEEE-DSIS 2026", "ECML-PKDD 2027", "ICISE-IE 2026", "Cyber-AI 2027", "SCSN-AI 2027",
                     "DCOSS-IoT 2027", "Paris CFP-RCVE 2027", "smart-homes 2027", "IEEE WCNC | AI4SecureNets 2027",
                     "Build with Gemma - Innovate in Windsor", "EI-Lab 2027", "CICI 2027 — IV Congreso",
                     "Unknown--Thing 2027", "AAIE 2027", ""]:
            self.assertEqual(ev.clean_text(text), text, text)

    def test_none_stays_none_and_cleaning_is_idempotent(self):
        self.assertIsNone(ev.clean_text(None))
        for text in ["ACM--CFP--RobCE 2027", "Ei/Scopus/CPCI-ICRPA 2027", "AAIE--EI 2027", "ACM--2026 The 9th"]:
            once = ev.clean_text(text)
            self.assertEqual(ev.clean_text(once), once)


class CleanEventsTest(unittest.TestCase):
    def test_marker_twin_merges_into_the_plain_record(self):
        plain = conference(id="wikicfp-194956", title="AAIE 2027", name="2027 Asia Conference on AI (AAIE 2027)",
                           topics=["Inteligencia Artificial"])
        twin = conference(id="wikicfp-194957", title="AAIE--EI 2027", name="2027 Asia Conference on AI (AAIE 2027)",
                          topics=["Inteligencia Artificial", "Machine Learning"])
        for order in ([plain, twin], [twin, plain]):
            cleaned, stats = ev.clean_events(order)
            self.assertEqual(cleaned, [{**plain, "topics": ["Inteligencia Artificial", "Machine Learning"]}])
            self.assertEqual(stats, {"deduplicated": 1, "titles_cleaned": 0})

    def test_more_complete_record_is_kept_with_the_clean_title_and_fills_the_other(self):
        plain = conference(id="wikicfp-1", title="BDEE 2027", deadline=None, location=None, country=None,
                           name=None, url=None)
        twin = conference(id="wikicfp-2", title="BDEE--EI 2027", name="2027 The 7th Conference (BDEE 2027)",
                          topics=["Big Data"])
        cleaned, stats = ev.clean_events([plain, twin])
        self.assertEqual(cleaned, [{**twin, "title": "BDEE 2027"}])
        self.assertEqual(stats, {"deduplicated": 1, "titles_cleaned": 1})

    def test_missing_fields_are_filled_and_the_earliest_deadline_wins(self):
        plain = conference(id="a", title="ICSIM 2027", name="IET--2027 The 10th Conference", deadline="2026-12-05",
                           location=None, url="https://x.example/icsim", topics=["Desarrollo de Software"])
        twin = conference(id="b", title="ICSIM--EI 2027", name="2027 The 10th Conference", deadline="2026-12-01",
                          url=None, topics=["Big Data"])
        cleaned, _ = ev.clean_events([twin, plain])
        self.assertEqual(len(cleaned), 1)
        kept = cleaned[0]
        self.assertEqual((kept["id"], kept["title"], kept["name"]), ("a", "ICSIM 2027", "IET 2027 The 10th Conference"))
        self.assertEqual((kept["deadline"], kept["location"], kept["country"], kept["url"]),
                         ("2026-12-01", "Tokyo, Japan", "Japan", "https://x.example/icsim"))
        self.assertEqual(kept["topics"], ["Desarrollo de Software", "Big Data"])

    def test_publisher_prefixed_twin_merges_and_the_unprefixed_title_is_kept(self):
        plain = conference(id="wikicfp-192660", title="MCVR 2026")
        spie = conference(id="wikicfp-192659", title="SPIE MCVR 2026", topics=["Redes"])
        cleaned, stats = ev.clean_events([spie, plain])
        self.assertEqual([(e["id"], e["title"], e["topics"]) for e in cleaned],
                         [("wikicfp-192660", "MCVR 2026", ["Redes"])])
        self.assertEqual(stats["deduplicated"], 1)

    def test_same_conference_in_two_sources_keeps_the_best_source(self):
        wiki = conference(id="wikicfp-203810", title="EAI SecureComm 2027", start="2027-10-15", end="2027-10-18",
                          deadline="2027-02-01", location="Hefei, China", country="China", topics=["Ciberseguridad"],
                          name="23rd EAI International Conference on Security and Privacy")
        ccf = conference(id="ccfddl-securecomm27", title="SecureComm 2027", source="ccfddl", start="2027-10-15",
                         end="2027-10-18", deadline="2027-02-01", location="Hefei, China", country="China",
                         url="https://securecomm.eai-conferences.org/2027/", topics=["Ciberseguridad", "Redes"],
                         name="International Conference on Security and Privacy in Communication Networks")
        cleaned, stats = ev.clean_events([wiki, ccf])
        self.assertEqual(cleaned, [{**ccf}])
        self.assertEqual(stats["deduplicated"], 1)

    def test_odd_titles_are_cleaned_without_dropping_anything(self):
        a = conference(id="a", title="Ei/Scopus-ACAI 2026", name="ACM--2026 The Conference", start="2026-12-18")
        b = conference(id="b", title="ACM--CFP--RobCE 2027", start="2027-05-20")
        cleaned, stats = ev.clean_events([a, b])
        self.assertEqual([(e["id"], e["title"], e["name"]) for e in cleaned],
                         [("a", "ACAI 2026", "ACM 2026 The Conference"), ("b", "ACM RobCE 2027", None)])
        self.assertEqual(stats, {"deduplicated": 0, "titles_cleaned": 2})

    def test_near_misses_are_never_merged(self):
        base = conference(id="a", title="ICAID 2026")
        cases = {
            "other year": conference(id="b", title="ICAID 2027", start="2027-03-17", end="2027-03-19"),
            "same title, other dates": conference(id="b", title="ICAID 2026", start="2026-12-25", end="2026-12-27"),
            "same start, other end": conference(id="b", title="ICAID 2026", end="2027-01-12"),
            "same title, other country": conference(id="b", title="ICAID 2026", location="Paris, France",
                                                    country="France"),
            "other acronym, same place and dates": conference(id="b", title="ICAIDS 2026"),
            "sibling acronym": conference(id="b", title="ICAID-W 2026"),
            "other kind": conference(id="b", title="ICAID 2026", kind="attend"),
            "no start": conference(id="b", title="ICAID 2026", start=None, end=None),
        }
        for label, other in cases.items():
            cleaned, stats = ev.clean_events([base, other])
            self.assertEqual(cleaned, [base, other], label)
            self.assertEqual(stats["deduplicated"], 0, label)

    def test_events_without_start_or_year_are_kept_even_when_titles_match(self):
        events = [conference(id="a", title="Feria TIC", start=None, end=None),
                  conference(id="b", title="Feria TIC", start=None, end=None)]
        self.assertEqual(ev.clean_events(events)[0], events)

    def test_idempotent_and_schema_invariant(self):
        events = [
            conference(id="wikicfp-1", title="AAIE 2027"), conference(id="wikicfp-2", title="AAIE--EI 2027"),
            conference(id="wikicfp-3", title="PEMM--ESCI 2027", start="2027-06-10", end="2027-06-12"),
            conference(id="wikicfp-4", title="ICAID 2026", start="2026-12-25", end="2026-12-27"),
            conference(id="wikicfp-5", title="ICAID 2027", start="2027-03-17", end="2027-03-19"),
            conference(id="manual-1", title="CICI 2027 — IV Congreso", source="manual", start="2027-04-14",
                       end="2027-04-16"),
            conference(id="devpost-1", title="LaunchPad Hacks (580k In Prizes!)", kind="attend", source="devpost"),
        ]
        snapshot = json.loads(json.dumps(events))
        once, stats = ev.clean_events(events)
        self.assertEqual(events, snapshot)  # the input is not modified
        self.assertEqual(stats, {"deduplicated": 1, "titles_cleaned": 1})
        self.assertEqual([e["id"] for e in once],
                         ["wikicfp-1", "wikicfp-3", "wikicfp-4", "wikicfp-5", "manual-1", "devpost-1"])
        twice, again = ev.clean_events(once)
        self.assertEqual(twice, once)
        self.assertEqual(again, {"deduplicated": 0, "titles_cleaned": 0})
        for e in once:
            self.assertEqual(list(e), list(snapshot[0]))
            self.assertEqual(list(e), ev.FIELDS)


class OutputTest(unittest.TestCase):
    def test_events_sorted_by_deadline_then_start_with_title_tiebreak(self):
        a = event(id="a", title="B 2027", deadline="2026-11-05")
        b = event(id="b", title="A 2027", deadline="2026-11-05")
        c = event(id="c", title="C 2027", start="2026-11-01")
        d = event(id="d", title="D 2027", kind="attend", start="2026-11-02", end="2026-11-09")
        self.assertEqual([e["id"] for e in ev.sort_events([a, b, c, d])], ["c", "d", "b", "a"])

    def test_json_file_is_the_payload_alone(self):
        payload = ev.build_payload([event(id="m", source="manual", deadline="2026-11-01")],
                                   {"wikicfp": 0, "ccfddl": 0, "devpost": 0, "manual": 1}, TODAY)
        self.assertEqual(payload["generated"], "2026-10-31")
        self.assertEqual(payload["topics"], ["IoT", "Ciberseguridad", "Redes", "Inteligencia Artificial",
                                             "Machine Learning", "Robótica", "Sistemas Ciberfísicos",
                                             "Desarrollo de Software", "Videojuegos", "Salud y Bioingeniería",
                                             "Big Data"])
        text = ev.render_json(payload)
        self.assertTrue(text.startswith("{"))
        self.assertTrue(text.endswith("}\n"))
        self.assertNotIn("window.", text)
        self.assertEqual(json.loads(text), payload)


if __name__ == "__main__":
    unittest.main()
