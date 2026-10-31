/* Pure logic for the event finder: expiry, filtering, sorting, topic counts and the URL filter state.
   Loaded by the page as window.EVFilters and by the Node tests through module.exports.
   Dates are ISO "YYYY-MM-DD" strings (or null), so plain string comparison orders them. */
(function (root) {
  "use strict";

  const KINDS = ["all", "cfp", "attend"];
  const MODALITIES = ["all", "online", "presencial"];
  const SORTS = ["deadline", "start", "title"];
  const DEFAULT_STATE = { kind: "all", topics: [], modality: "all", colombia: false, query: "", sort: "deadline" };
  const DAY_MS = 24 * 60 * 60 * 1000;

  const normalize = (text) => String(text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  /** Calendar day of a Date in the local time zone, as "YYYY-MM-DD". */
  function localIsoDate(date) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  /** The date that closes an event: the deadline for a cfp, the end (else the start) for an event to attend.
      A cfp without a deadline falls back to its end/start, so a finished congress never stays listed. */
  function closingDate(event) {
    if (event.kind === "cfp" && event.deadline) return event.deadline;
    return event.end || event.start || null;
  }

  /** Expired when the closing date is before today; a closing date equal to today is still open. */
  function isExpired(event, today) {
    const closing = closingDate(event);
    return closing !== null && closing < today;
  }

  const utcDay = (iso) => Date.UTC(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10)));

  /** Whole days from today to the deadline (0 = closes today); null without a deadline. */
  function daysLeft(event, today) {
    if (!event.deadline) return null;
    return Math.round((utcDay(event.deadline) - utcDay(today)) / DAY_MS);
  }

  /** options: { kind, topics (OR, empty = all), modality, colombia, query, today }. Groups combine with AND and
      expired events are always dropped. */
  function filterEvents(events, options = {}) {
    const { kind = "all", topics = [], modality = "all", colombia = false, query = "", today } = options;
    const words = normalize(query).split(/\s+/).filter(Boolean);
    return events.filter((event) => {
      if (today && isExpired(event, today)) return false;
      if (kind !== "all" && event.kind !== kind) return false;
      if (topics.length && !(event.topics || []).some((t) => topics.includes(t))) return false;
      if (modality === "online" && !event.online) return false;
      if (modality === "presencial" && event.online) return false;
      if (colombia && normalize(event.country) !== "colombia") return false;
      if (words.length) {
        const haystack = normalize([event.title, event.name, event.location].join(" "));
        if (!words.every((word) => haystack.includes(word))) return false;
      }
      return true;
    });
  }

  const SORT_VALUES = {
    // For events to attend there is usually no deadline: the end (else the start) tells when they close.
    deadline: (e) => e.deadline || (e.kind === "attend" ? e.end || e.start : null) || null,
    start: (e) => e.start || null,
    title: (e) => normalize(e.title) || null,
  };

  /** Returns a new array sorted ascending by "deadline", "start" or "title"; missing values go last. */
  function sortEvents(events, key = "deadline") {
    const value = SORT_VALUES[key] || SORT_VALUES.deadline;
    return events
      .map((event, index) => ({ event, index, v: value(event) }))
      .sort((a, b) => {
        if (a.v === null && b.v === null) return a.index - b.index;
        if (a.v === null) return 1;
        if (b.v === null) return -1;
        const diff = key === "title" ? a.v.localeCompare(b.v, "es") : a.v < b.v ? -1 : a.v > b.v ? 1 : 0;
        return diff || a.index - b.index;
      })
      .map((item) => item.event);
  }

  /** { topic: number of events tagged with it }. */
  function topicCounts(events) {
    const counts = {};
    for (const event of events) for (const topic of new Set(event.topics || [])) counts[topic] = (counts[topic] || 0) + 1;
    return counts;
  }

  const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const parts = (iso) => ({ y: iso.slice(0, 4), m: MONTHS[Number(iso.slice(5, 7)) - 1], d: String(Number(iso.slice(8, 10))) });

  /** "5 nov 2026" for "2026-11-05". */
  function formatDate(iso) {
    const p = parts(iso);
    return `${p.d} ${p.m} ${p.y}`;
  }

  /** Compact Spanish range: "21–23 jun 2027", "28 jun – 2 jul 2027", "30 dic 2026 – 2 ene 2027"; null without dates. */
  function formatRange(start, end) {
    if (!start && !end) return null;
    if (!start) return `hasta el ${formatDate(end)}`;
    if (!end || end === start) return formatDate(start);
    const a = parts(start);
    const b = parts(end);
    if (a.y !== b.y) return `${formatDate(start)} – ${formatDate(end)}`;
    if (a.m !== b.m) return `${a.d} ${a.m} – ${b.d} ${b.m} ${b.y}`;
    return `${a.d}–${b.d} ${b.m} ${b.y}`;
  }

  /** Filter state from a query string (kind, tema, modalidad, co, q, orden); invalid values fall back to defaults. */
  function parseQuery(search) {
    const params = new URLSearchParams(search);
    const pick = (value, allowed, fallback) => (allowed.includes(value) ? value : fallback);
    return {
      kind: pick(params.get("kind"), KINDS, DEFAULT_STATE.kind),
      topics: (params.get("tema") || "").split(",").map((t) => t.trim()).filter(Boolean),
      modality: pick(params.get("modalidad"), MODALITIES, DEFAULT_STATE.modality),
      colombia: params.get("co") === "1",
      query: params.get("q") || "",
      sort: pick(params.get("orden"), SORTS, DEFAULT_STATE.sort),
    };
  }

  /** Query string (without "?") holding only the values that differ from the defaults. */
  function stateToQuery(state) {
    const params = new URLSearchParams();
    if (state.kind !== DEFAULT_STATE.kind) params.set("kind", state.kind);
    if (state.topics.length) params.set("tema", state.topics.join(","));
    if (state.modality !== DEFAULT_STATE.modality) params.set("modalidad", state.modality);
    if (state.colombia) params.set("co", "1");
    if (state.query) params.set("q", state.query);
    if (state.sort !== DEFAULT_STATE.sort) params.set("orden", state.sort);
    return params.toString();
  }

  const api = { DEFAULT_STATE, normalize, localIsoDate, closingDate, isExpired, daysLeft, filterEvents, sortEvents,
    topicCounts, formatDate, formatRange, parseQuery, stateToQuery };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.EVFilters = api;
})(this);
