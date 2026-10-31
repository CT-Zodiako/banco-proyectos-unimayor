/* Pure logic for the comparison table: filtering, sorting and the compare selection.
   Loaded by the page as window.DPTable and by the Node tests through module.exports. */
(function (root) {
  "use strict";

  const QUARTILE_RANK = { Q1: 1, Q2: 2, Q3: 3, Q4: 4 };
  const MAX_COMPARE = 3;

  const normalize = (text) => String(text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Advanced filters start "off"; countAdvanced() tells how many differ from these values.
  const ADVANCED_DEFAULTS = {
    quartiles: [], fits: [], minAffinity: 0, maxWeeks: null, language: "any", region: "all", minSjr: null, minH: null,
    reviews: [], ccBy: false,
  };

  // Built-in saved filters (design 04): realistic targets for each author profile.
  const PRESETS = [
    { id: "semillero", label: "Semillero (C y B, en español)", filters: { quartiles: ["Q3", "Q4"], language: "Spanish" } },
    { id: "grupo", label: "Grupo (A1 y A2)", filters: { quartiles: ["Q1", "Q2"] } },
  ];

  /** Advanced filters of a preset applied on top of the defaults. */
  function applyPreset(preset) {
    return { ...ADVANCED_DEFAULTS, ...preset.filters };
  }

  /** A user preset stores only the advanced filters that differ from the defaults. */
  function makePreset(label, advanced) {
    const name = String(label || "").trim();
    if (!name) throw new Error("El filtro guardado necesita un nombre");
    const filters = {};
    for (const key of Object.keys(ADVANCED_DEFAULTS)) {
      const value = advanced[key];
      const changed = Array.isArray(value) ? value.length > 0 : value !== undefined && value !== ADVANCED_DEFAULTS[key];
      if (changed) filters[key] = Array.isArray(value) ? value.slice() : value;
    }
    return { id: `user-${normalize(name).replace(/[^a-z0-9]+/g, "-")}`, label: name, filters };
  }

  /** Ring color of an affinity total: "high" from 80, "mid" from 65, "low" below. */
  function affinityLevel(total) {
    return total >= 80 ? "high" : total >= 65 ? "mid" : "low";
  }

  /** Review process categories of a DOAJ review string (a journal can declare several). */
  function reviewTypes(review) {
    const text = String(review || "").toLowerCase();
    const types = [];
    if (text.includes("double anonymous")) types.push("double");
    if (text.includes("single anonymous")) types.push("single");
    if (text.includes("open peer")) types.push("open");
    if (text.includes("editorial")) types.push("editorial");
    if (!types.length || text.includes("unspecified")) types.push("unspecified");
    return types;
  }

  const licenses = (license) => String(license || "").split(",").map((l) => l.trim());

  /** rows: [{ match, journal, affinity? }]. Quick filters: query, quartile ("all" | "Q1".."Q4"), fit ("all" |
      "fuerte" | "tecnologia"), spanish. Advanced filters: see ADVANCED_DEFAULTS. Everything combines with AND;
      a journal without the value a numeric filter needs is excluded. */
  function filterRows(rows, options = {}) {
    const { query = "", quartile = "all", fit = "all", spanish = false } = options;
    const a = { ...ADVANCED_DEFAULTS, ...options };
    const words = normalize(query).split(/\s+/).filter(Boolean);
    return rows.filter(({ match, journal, affinity }) => {
      if (quartile !== "all" && journal.quartile !== quartile) return false;
      if (fit !== "all" && match.fit !== fit) return false;
      if (a.quartiles.length && !a.quartiles.includes(journal.quartile)) return false;
      if (a.fits.length && !a.fits.includes(match.fit)) return false;
      const languages = journal.languages || [];
      if (spanish && !languages.includes("Spanish")) return false;
      if (a.language !== "any" && !languages.includes(a.language)) return false;
      if (a.region === "iberoamerica" && !IBEROAMERICA.has(journal.country)) return false;
      if (a.region === "colombia" && journal.country !== "Colombia") return false;
      if (a.minAffinity > 0 && !(affinity && affinity.total >= a.minAffinity)) return false;
      if (a.maxWeeks !== null && !(journal.weeks_to_publication != null && journal.weeks_to_publication <= a.maxWeeks)) return false;
      if (a.minSjr !== null && !(journal.sjr != null && journal.sjr >= a.minSjr)) return false;
      if (a.minH !== null && !(journal.h_index != null && journal.h_index >= a.minH)) return false;
      if (a.reviews.length && !reviewTypes(journal.review).some((t) => a.reviews.includes(t))) return false;
      if (a.ccBy && !licenses(journal.license).includes("CC BY")) return false;
      if (words.length) {
        const haystack = normalize([journal.title, journal.publisher, journal.country,
          ...(journal.categories || []).map((c) => c.name)].join(" "));
        if (!words.every((word) => haystack.includes(word))) return false;
      }
      return true;
    });
  }

  /** How many advanced filters differ from their defaults (badge on the "Filtros avanzados" button). */
  function countAdvanced(advanced) {
    const a = { ...ADVANCED_DEFAULTS, ...advanced };
    return Object.keys(ADVANCED_DEFAULTS).filter((key) => {
      const value = a[key];
      return Array.isArray(value) ? value.length > 0 : value !== ADVANCED_DEFAULTS[key];
    }).length;
  }

  const SORT_VALUES = {
    quartile: (r) => QUARTILE_RANK[r.journal.quartile] ?? null,
    title: (r) => normalize(r.journal.title),
    sjr: (r) => r.journal.sjr ?? null,
    h_index: (r) => r.journal.h_index ?? null,
    weeks: (r) => r.journal.weeks_to_publication ?? null,
    affinity: (r) => (r.affinity ? r.affinity.total : null),
  };

  /** Returns a new array. "relevance" keeps the suggested order; missing values always go last. */
  function sortRows(rows, { key = "relevance", dir = "asc" } = {}) {
    const value = SORT_VALUES[key];
    if (!value) return rows.slice();
    const sign = dir === "desc" ? -1 : 1;
    return rows
      .map((row, index) => ({ row, index, v: value(row) }))
      .sort((a, b) => {
        if (a.v === null && b.v === null) return a.index - b.index;
        if (a.v === null) return 1;
        if (b.v === null) return -1;
        const diff = typeof a.v === "string" ? a.v.localeCompare(b.v, "es") : a.v - b.v;
        if (diff !== 0) return sign * diff;
        // Same quartile: higher SJR counts as better, so "asc" lists it first and "desc" is the exact reverse.
        if (key === "quartile") return sign * ((b.row.journal.sjr || 0) - (a.row.journal.sjr || 0));
        return a.index - b.index;
      })
      .map((item) => item.row);
  }

  /** Adds or removes an id; adding is ignored when the comparison is full. */
  function toggleCompare(ids, id) {
    if (ids.includes(id)) return ids.filter((x) => x !== id);
    return ids.length >= MAX_COMPARE ? ids.slice() : [...ids, id];
  }

  const bestIds = (journals, value, pick) => {
    if (journals.length < 2) return [];
    const known = journals.filter((j) => value(j) !== null && value(j) !== undefined);
    if (!known.length) return [];
    const target = pick(...known.map(value));
    return known.filter((j) => value(j) === target).map((j) => j.id);
  };

  /** Ids holding the best value of each attribute; empty with fewer than two journals or no known value.
      affinityById (optional) maps journal id → affinity total for the current project. */
  function compareBest(journals, affinityById = {}) {
    return {
      quartile: bestIds(journals, (j) => QUARTILE_RANK[j.quartile] ?? null, Math.min),
      weeks: bestIds(journals, (j) => j.weeks_to_publication ?? null, Math.min),
      sjr: bestIds(journals, (j) => j.sjr ?? null, Math.max),
      h_index: bestIds(journals, (j) => j.h_index ?? null, Math.max),
      affinity: bestIds(journals, (j) => affinityById[j.id] ?? null, Math.max),
    };
  }

  /* ---------- Affinity: an explained estimate of fit, NOT an acceptance probability ----------
     No public source gives acceptance rates, so the score only combines what the data knows. */
  const AFFINITY_MAX = { topic: 40, level: 25, time: 15, language: 10, region: 10 };
  // How demanding each quartile is for a project of a given level (higher = more attainable).
  const LEVEL_POINTS = {
    "Intermedio": { Q1: 5, Q2: 12, Q3: 20, Q4: 25 },
    "Intermedio-Avanzado": { Q1: 10, Q2: 17, Q3: 22, Q4: 24 },
    "Avanzado": { Q1: 15, Q2: 20, Q3: 24, Q4: 25 },
  };
  const IBEROAMERICA = new Set(["Colombia", "Mexico", "Brazil", "Chile", "Argentina", "Peru", "Ecuador", "Cuba",
    "Costa Rica", "Venezuela", "Uruguay", "Paraguay", "Bolivia", "Guatemala", "Honduras", "Nicaragua", "Panama",
    "El Salvador", "Dominican Republic", "Puerto Rico", "Spain", "Portugal"]);
  const GENERIC_TECH = new Set(["computacion_general", "tecnologia_aplicada"]);

  function topicPoints(project, match) {
    const themes = new Set(match.themes || []);
    const domain = (project.themes && project.themes.domain) || [];
    const tech = ((project.themes && project.themes.tech) || []).filter((t) => !GENERIC_TECH.has(t));
    const techHits = tech.filter((t) => themes.has(t)).length;
    let techShare = tech.length ? techHits / tech.length : 0;
    if (!techHits && themes.has("tecnologia_aplicada")) techShare = 0.5;
    if (!domain.length) return 40 * techShare;
    const domainShare = domain.filter((t) => themes.has(t)).length / domain.length;
    return 20 * domainShare + 20 * techShare;
  }

  function timePoints(weeks) {
    if (weeks === null || weeks === undefined) return 6;
    if (weeks <= 8) return 15;
    if (weeks <= 12) return 12;
    if (weeks <= 16) return 10;
    if (weeks <= 24) return 7;
    if (weeks <= 36) return 4;
    return 2;
  }

  function languagePoints(languages = []) {
    if (languages.includes("Spanish")) return 10;
    if (languages.includes("Portuguese")) return 7;
    if (languages.includes("English")) return 5;
    return 0;
  }

  /** { total, parts } for a project (level, themes), its match (fit, themes) and the journal. */
  function affinity(project, match, journal) {
    const parts = {
      topic: Math.round(topicPoints(project, match)),
      level: (LEVEL_POINTS[project.level] || LEVEL_POINTS["Intermedio-Avanzado"])[journal.quartile] ?? 0,
      time: timePoints(journal.weeks_to_publication),
      language: languagePoints(journal.languages || []),
      region: IBEROAMERICA.has(journal.country) ? 10 : 5,
    };
    return { total: Object.values(parts).reduce((a, b) => a + b, 0), parts };
  }

  const api = { QUARTILE_RANK, MAX_COMPARE, AFFINITY_MAX, ADVANCED_DEFAULTS, PRESETS, normalize, filterRows, sortRows,
    toggleCompare, compareBest, affinity, affinityLevel, reviewTypes, countAdvanced, applyPreset, makePreset };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.DPTable = api;
})(this);
