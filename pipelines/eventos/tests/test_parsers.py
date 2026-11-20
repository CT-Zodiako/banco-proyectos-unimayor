import datetime
import json
import pathlib
import unittest

from pipeline import eventos as ev

FIXTURES = pathlib.Path(__file__).resolve().parent / "fixtures"
TODAY = datetime.date(2026, 10, 31)


def wikicfp_url(event_id):
    return f"http://www.wikicfp.com/cfp/servlet/event.showcfp?eventid={event_id}"


class DateRangeTest(unittest.TestCase):
    def test_formats_used_by_the_sources(self):
        cases = {
            "Mar 19, 2027 - Mar 21, 2027": ("2027-03-19", "2027-03-21"),
            "February 16-23, 2027": ("2027-02-16", "2027-02-23"),
            "June 28 - July 2, 2027": ("2027-06-28", "2027-07-02"),
            "November 30-December 1, 2026": ("2026-11-30", "2026-12-01"),
            "November 22-26 2026": ("2026-11-22", "2026-11-26"),
            "FEBRUARY 23-25, 2027": ("2027-02-23", "2027-02-25"),
            "January 12, 2027": ("2027-01-12", "2027-01-12"),
            "Dec 20, 2026 - Jan 05, 2027": ("2026-12-20", "2027-01-05"),
            "Oct 01 - Nov 12, 2026": ("2026-10-01", "2026-11-12"),
            "Nov 01 - 15, 2026": ("2026-11-01", "2026-11-15"),
            "Dec 30 - Jan 2, 2027": ("2026-12-30", "2027-01-02"),
            "Sept 7-11, 2027": ("2027-09-07", "2027-09-11"),
            "December 6-9, 2027 (To be confirmed)": ("2027-12-06", "2027-12-09"),
        }
        for text, expected in cases.items():
            with self.subTest(text=text):
                self.assertEqual(ev.parse_date_range(text), expected)

    def test_unknown_or_ambiguous_text_gives_no_dates(self):
        for text in ("N/A", "TBD", "", None, "May 9-14 (in-person) and 6-7 (virtual), 2027", "February 30, 2027"):
            with self.subTest(text=text):
                self.assertEqual(ev.parse_date_range(text), (None, None))


class CountryTest(unittest.TestCase):
    def test_country_is_the_last_comma_part_lightly_normalized(self):
        cases = {
            "Cambridge, UK": "United Kingdom",
            "Seattle, WA, USA": "United States",
            "Anaheim, California": "United States",
            "Phoenix, Arizona, United State": "United States",
            "Edinburgh, Scotland": "United Kingdom",
            "Seoul, Republic of Korea": "South Korea",
            "Macau SAR, China / Online": "China",
            "Bruges, Belgium and Online": "Belgium",
            "Mainz, Germany (hybrid)": "Germany",
            "MONTREAL, CANADA": "Canada",
            "Delft, The Netherlands": "Netherlands",
            "Dubai, UAE": "United Arab Emirates",
            "Sydney, Australia; Atlanta, USA; Paris, France": "Australia",
            "Mexico City": "Mexico",
            "Singapore": "Singapore",
            "Pasto, Colombia": "Colombia",
            "Valletta, Malta": "Malta",
            "New York, NY": "United States",
            "Wuxi. China": "China",
        }
        for location, expected in cases.items():
            with self.subTest(location=location):
                self.assertEqual(ev.country_from_location(location), expected)

    def test_online_or_unknown_places_have_no_country(self):
        for location in ("Online", "Virtual Conference", "Full online", "Online, from anywhere", "TBD", "N/A", "",
                         None):
            with self.subTest(location=location):
                self.assertIsNone(ev.country_from_location(location))

    def test_single_names_that_are_not_known_countries_have_no_country(self):
        # Devpost shows venue names ("Bahen Centre for Information Technology"); single city names are not guessed.
        for location in ("Bahen Centre for Information Technology", "Al-Amen", "Brussels"):
            with self.subTest(location=location):
                self.assertIsNone(ev.country_from_location(location))

    def test_online_flag(self):
        self.assertTrue(ev.is_online("Virtual Conference"))
        self.assertTrue(ev.is_online("Macau SAR, China / Online"))
        self.assertTrue(ev.is_online("Mainz, Germany (hybrid)"))
        self.assertFalse(ev.is_online("Cambridge, UK"))
        self.assertFalse(ev.is_online(None))


class WikicfpTest(unittest.TestCase):
    def test_parses_each_event_row_pair(self):
        # Rows without event dates (journals) are skipped; deadlines after the event end are ignored as typos.
        html = (FIXTURES / "wikicfp-call.html").read_text(encoding="utf-8")
        events = ev.parse_wikicfp(html, ["IoT"], TODAY)
        base = {"kind": "cfp", "source": "wikicfp"}
        self.assertEqual(events, [
            {"id": "wikicfp-200156", "title": "ICIM 2027",
             "name": "Springer--2027 the 13th International Conference on Information Management (ICIM 2027)",
             **base, "start": "2027-03-19", "end": "2027-03-21", "deadline": "2026-10-30",
             "location": "Cambridge, UK", "country": "United Kingdom", "online": False,
             "url": wikicfp_url(200156), "topics": ["IoT"]},
            {"id": "wikicfp-203261", "title": "ICBAIE 2026",
             "name": "IEEE 2026 7th International Conference on Big Data, Artificial Intelligence and Internet of "
                     "Things Engineering",
             **base, "start": "2026-12-30", "end": "2026-12-31", "deadline": "2026-10-31",
             "location": None, "country": None, "online": True,
             "url": wikicfp_url(203261), "topics": ["IoT", "Inteligencia Artificial", "Big Data"]},
            {"id": "wikicfp-199930", "title": "IEEE-RICAI 2027",
             "name": "2027 IEEE 9th International Conference on Robotics, Intelligent Control and Artificial "
                     "Intelligence",
             **base, "start": "2027-03-27", "end": "2027-03-29", "deadline": "2026-11-05",
             "location": "Sapporo, Japan", "country": "Japan", "online": False,
             "url": wikicfp_url(199930), "topics": ["IoT", "Inteligencia Artificial", "Robótica"]},
            {"id": "wikicfp-199931", "title": "EMBS-H 2027",
             "name": "International Workshop on Health Informatics and Embedded Sensing",
             **base, "start": "2027-01-23", "end": "2027-01-24", "deadline": "2026-11-20",
             "location": "Hangzhou, China", "country": "China", "online": False,
             "url": wikicfp_url(199931), "topics": ["IoT", "Sistemas Ciberfísicos", "Salud y Bioingeniería"]},
            {"id": "wikicfp-199932", "title": "TBDC 2027", "name": "Conference on Things",
             **base, "start": "2027-02-02", "end": "2027-02-04", "deadline": None,
             "location": "Dubai, UAE", "country": "United Arab Emirates", "online": False,
             "url": wikicfp_url(199932), "topics": ["IoT"]},
            {"id": "wikicfp-199933", "title": "DSA 2025",
             "name": "The 12th International Conference on Dependability Systems and Their Applications",
             **base, "start": "2025-11-24", "end": "2025-11-26", "deadline": None,
             "location": None, "country": None, "online": True,
             "url": wikicfp_url(199933), "topics": ["IoT"]},
        ])

    def test_page_without_event_table_gives_no_events(self):
        self.assertEqual(ev.parse_wikicfp("<html><body><table><tr><td>x</td></tr></table></body></html>",
                                          ["IoT"], TODAY), [])

    def test_paging_stops_once_the_page_reaches_past_calls(self):
        # WikiCFP lists deadlines from yesterday upwards, then wraps to past calls in descending order.
        def page(*deadlines):
            return [{"deadline": d} for d in deadlines]
        self.assertFalse(ev.wikicfp_reached_past(page("2026-10-30", "2026-10-30"), TODAY))
        self.assertFalse(ev.wikicfp_reached_past(page("2026-10-31", "2026-11-05", None), TODAY))
        self.assertTrue(ev.wikicfp_reached_past(page("2026-11-30", "2027-02-20", "2026-10-13"), TODAY))
        self.assertTrue(ev.wikicfp_reached_past(page("2026-08-07", "2024-11-03"), TODAY))
        self.assertTrue(ev.wikicfp_reached_past([], TODAY))

    def test_deadline_choice_is_the_earliest_open_date_else_the_latest_past_one(self):
        self.assertEqual(ev.choose_deadline(["2026-11-20", "2026-11-05"], TODAY), "2026-11-05")
        self.assertEqual(ev.choose_deadline(["2026-11-20", "2026-10-20"], TODAY), "2026-11-20")
        self.assertEqual(ev.choose_deadline(["2026-10-31"], TODAY), "2026-10-31")
        self.assertEqual(ev.choose_deadline(["2026-09-01", "2026-10-30"], TODAY), "2026-10-30")
        self.assertIsNone(ev.choose_deadline([], TODAY))


class CcfddlTest(unittest.TestCase):
    def test_latest_edition_of_each_conference_with_mapped_topics(self):
        data = json.loads((FIXTURES / "ccfddl-allconf.json").read_text(encoding="utf-8"))
        base = {"kind": "cfp", "source": "ccfddl"}
        self.assertEqual(ev.parse_ccfddl(data, TODAY), [
            {"id": "ccfddl-aaai27", "title": "AAAI 2027", "name": "AAAI Conference on Artificial Intelligence", **base,
             "start": "2027-02-16", "end": "2027-02-23", "deadline": "2026-11-10",
             "location": "Montréal, Québec, Canada", "country": "Canada", "online": False,
             "url": "https://aaai.org/conference/aaai/aaai-27/", "topics": ["Inteligencia Artificial"]},
            {"id": "ccfddl-icse27", "title": "ICSE 2027", "name": "International Conference on Software Engineering",
             **base, "start": "2027-04-25", "end": "2027-05-01", "deadline": "2026-07-18",
             "location": "Dublin, Ireland", "country": "Ireland", "online": False,
             "url": "https://conf.researchr.org/home/icse-2027", "topics": ["Desarrollo de Software"]},
            {"id": "ccfddl-cog27", "title": "IEEE CoG 2027", "name": "IEEE Conference on Games", **base,
             "start": "2027-08-17", "end": None, "deadline": None,
             "location": None, "country": None, "online": False,
             "url": "https://cog2027.org/", "topics": ["Videojuegos"]},
            {"id": "ccfddl-sensys27", "title": "SenSys 2027",
             "name": "ACM Conference on Embedded Networked Sensor Systems", **base,
             "start": "2027-05-09", "end": None, "deadline": "2026-10-31",
             "location": "Macau SAR, China / Online", "country": "China", "online": True,
             "url": "https://sensys.acm.org/2027/", "topics": ["IoT", "Redes", "Sistemas Ciberfísicos"]},
        ])


class DevpostTest(unittest.TestCase):
    def test_hackathons_become_attend_events(self):
        data = json.loads((FIXTURES / "devpost-page-1.json").read_text(encoding="utf-8"))
        events, total = ev.parse_devpost(data)
        base = {"name": None, "kind": "attend", "source": "devpost"}
        self.assertEqual(total, 3)
        self.assertEqual(events, [
            {"id": "devpost-31302", "title": "PayPal AI Hackathon", **base,
             "start": "2026-10-01", "end": "2026-11-12", "deadline": "2026-11-12",
             "location": None, "country": None, "online": True,
             "url": "https://paypalaihackathon.devpost.com/",
             "topics": ["Inteligencia Artificial", "Machine Learning", "Desarrollo de Software"]},
            {"id": "devpost-40001", "title": "Automation Jam", **base,
             "start": "2026-12-20", "end": "2027-01-05", "deadline": "2027-01-05",
             "location": "Medellín, Colombia", "country": "Colombia", "online": False,
             "url": "https://automationjam.devpost.com/", "topics": []},
            {"id": "devpost-40002", "title": "Health Hack", **base,
             "start": "2026-11-01", "end": "2026-11-15", "deadline": "2026-11-15",
             "location": None, "country": None, "online": True,
             "url": "https://healthhack.devpost.com/",
             "topics": ["IoT", "Ciberseguridad", "Videojuegos", "Salud y Bioingeniería"]},
        ])

    def test_event_keys_follow_the_schema_order(self):
        data = json.loads((FIXTURES / "devpost-page-1.json").read_text(encoding="utf-8"))
        events, _ = ev.parse_devpost(data)
        self.assertEqual(list(events[0]), ["id", "title", "name", "kind", "start", "end", "deadline", "location",
                                           "country", "online", "url", "source", "topics"])


if __name__ == "__main__":
    unittest.main()

class CcfddlArchitectureTest(unittest.TestCase):
    def conference(self, sub, description):
        return {"title": "X", "description": description, "sub": sub, "confs": [{
            "year": 2027, "id": "x27", "link": "https://example.org/x27",
            "timeline": [{"deadline": "2026-12-01 23:59:59"}], "date": "May 3-5, 2027",
            "place": "Lisbon, Portugal"}]}

    def test_ds_is_computer_architecture_not_big_data(self):
        events = ev.parse_ccfddl([self.conference("DS", "International Symposium on Computer Architecture")], TODAY)
        self.assertEqual(events, [])

    def test_ds_keeps_topic_keywords(self):
        events = ev.parse_ccfddl([self.conference("DS", "Embedded Systems Week")], TODAY)
        self.assertEqual([e["topics"] for e in events], [["Sistemas Ciberfísicos"]])
