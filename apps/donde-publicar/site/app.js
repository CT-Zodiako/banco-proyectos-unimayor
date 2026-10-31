/* "¿Dónde publicar este proyecto?" — journals for one project (design 04: list by estimated affinity with a custom
   filters panel; design 02: comparison table), full catalog and help.
   Data: window.DONDE_PUBLICAR (data.js), window.DONDE_PUBLICAR_CATALOGO (catalog.js, on demand).
   Logic: window.DPTable (table.js). */
(function () {
  "use strict";

  const DATA = window.DONDE_PUBLICAR;
  const T = window.DPTable;
  const PAGE_SIZE = 15;
  const PRESET_STORAGE_KEY = "donde-publicar.presets.v1";
  const PUBLINDEX = { Q1: "A1", Q2: "A2", Q3: "B", Q4: "C" };
  const FIT_LABELS = { fuerte: "Sector + tecnología", tecnologia: "Tecnología", sector: "Sector" };
  const FIT_FILTER_LABELS = { fuerte: "Sector + tecnología", tecnologia: "Solo tecnología" };
  const LANGUAGE_LABELS = {
    English: "Inglés", Spanish: "Español", Portuguese: "Portugués", French: "Francés", German: "Alemán",
    Italian: "Italiano", Chinese: "Chino", Russian: "Ruso", Indonesian: "Indonesio", Turkish: "Turco",
    Polish: "Polaco", Catalan: "Catalán", Ukrainian: "Ucraniano", Czech: "Checo", Serbian: "Serbio", Croatian: "Croata",
  };
  const COUNTRY_LABELS = {
    "United Kingdom": "Reino Unido", "United States": "Estados Unidos", "Iran, Islamic Republic of": "Irán",
    Spain: "España", Poland: "Polonia", Germany: "Alemania", Italy: "Italia", "Russian Federation": "Rusia",
    Brazil: "Brasil", Singapore: "Singapur", "Korea, Republic of": "Corea del Sur", Netherlands: "Países Bajos",
    Türkiye: "Turquía", Croatia: "Croacia", Switzerland: "Suiza", Czechia: "Chequia", France: "Francia",
    Lithuania: "Lituania", Ukraine: "Ucrania", Malaysia: "Malasia", Romania: "Rumania", Canada: "Canadá",
    Slovenia: "Eslovenia", Iraq: "Irak", Hungary: "Hungría", Japan: "Japón", Norway: "Noruega", Mexico: "México",
    Peru: "Perú", Belgium: "Bélgica", Sweden: "Suecia", Denmark: "Dinamarca", Finland: "Finlandia", Greece: "Grecia",
    Ireland: "Irlanda", Austria: "Austria", Bulgaria: "Bulgaria", Thailand: "Tailandia", "Hong Kong": "Hong Kong",
    "Taiwan, Province of China": "Taiwán", "Bosnia and Herzegovina": "Bosnia y Herzegovina", Jordan: "Jordania",
    "Moldova, Republic of": "Moldavia", "Costa Rica": "Costa Rica", Egypt: "Egipto", Pakistan: "Pakistán",
  };
  const SORT_DEFAULT_DIR = { title: "asc", affinity: "desc", quartile: "asc", sjr: "desc", h_index: "desc", weeks: "asc" };
  const REVIEW_LABELS = { double: "doble ciego", single: "simple ciego", open: "abierta", editorial: "editorial", unspecified: "no especificada" };
  const LANGUAGE_FILTER_LABELS = { Spanish: "Español", English: "Inglés", Portuguese: "Portugués" };
  const AFFINITY_LABELS = { topic: "Encaje temático", level: "Exigencia vs. nivel del proyecto", time: "Tiempo de publicación", language: "Acepta español", region: "Revista latinoamericana" };
  const TEMPLATE_LABELS = { Word: "Plantilla Word", LaTeX: "Plantilla LaTeX", "Archivo ZIP": "Plantilla (ZIP)" };

  const journalsById = new Map(DATA ? DATA.journals.map((j) => [j.id, j]) : []);
  const projectsById = new Map(DATA ? DATA.projects.map((p) => [p.id, p]) : []);
  const state = {
    projectId: null,
    query: "",
    mode: "list",
    sort: { key: "affinity", dir: "desc" },
    compare: [],
    advanced: { ...window.DPTable.ADVANCED_DEFAULTS },
    userPresets: [],
    catalog: null,
    catalogQuartile: "all",
    catalogShown: PAGE_SIZE,
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  /* Build an element with text content only (never innerHTML for external data). */
  function el(tag, options = {}, children = []) {
    const node = document.createElement(tag);
    if (options.className) node.className = options.className;
    if (options.text !== undefined && options.text !== null) node.textContent = String(options.text);
    if (options.attrs) {
      for (const [key, value] of Object.entries(options.attrs)) {
        if (value !== undefined && value !== null && value !== false) node.setAttribute(key, value === true ? "" : value);
      }
    }
    for (const child of children) if (child) node.appendChild(child);
    return node;
  }

  function safeUrl(url) {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.href : null;
    } catch (_) {
      return null;
    }
  }

  const languageLabel = (language) => LANGUAGE_LABELS[language] || language;
  const countryLabel = (country) => COUNTRY_LABELS[country] || country || "";
  const formatIssn = (issn) => (issn && issn.length === 8 ? `${issn.slice(0, 4)}-${issn.slice(4)}` : issn);
  const formatSjr = (sjr) => (sjr === null || sjr === undefined ? "—" : sjr.toFixed(3));

  function reviewLabel(review) {
    const text = String(review || "");
    if (/double anonymous/i.test(text)) return "Doble ciego";
    if (/single anonymous/i.test(text)) return "Simple ciego";
    if (/open/i.test(text)) return "Abierta";
    if (/editorial/i.test(text)) return "Editorial";
    return "No especificada";
  }

  function quartileBadge(quartile) {
    return el("span", { className: `q ${String(quartile).toLowerCase()}`, text: quartile,
      attrs: { title: `Cuartil ${quartile} en SCImago · Publindex ${PUBLINDEX[quartile]}` } });
  }

  function link(url, label, className) {
    const href = safeUrl(url);
    return href ? el("a", { text: label, className, attrs: { href, target: "_blank", rel: "noopener noreferrer" } }) : null;
  }

  /* ---------- Templates and publication format ---------- */

  // Short hint to tell apart several templates of the same kind; the full file name goes in the tooltip.
  function templateHint(fileName, position) {
    const name = fileName.toLowerCase();
    if (/title|portada|t[ií]tulo/.test(name)) return "portada";
    if (/response|respuesta|point/.test(name)) return "respuesta";
    if (/review|revisi/.test(name)) return "revisión";
    if (/main|body|manuscript|article|art[ií]culo|paper|full/.test(name)) return "texto";
    return String(position);
  }

  /* Template files found on the journal's own site (pipeline.templates); the browser downloads them on click. */
  function templateLinks(journal, className = "dl") {
    const templates = journal.templates || [];
    const fileName = (url) => decodeURIComponent(new URL(url).pathname.split("/").pop() || "");
    return templates.map((template) => {
      const label = TEMPLATE_LABELS[template.kind] || "Plantilla";
      const name = fileName(template.url);
      const sameKind = templates.filter((t) => t.kind === template.kind);
      const kind = template.kind === "Archivo ZIP" ? "ZIP" : template.kind;
      const anchor = link(template.url, sameKind.length > 1
        ? `⬇ ${kind} · ${templateHint(name, sameKind.indexOf(template) + 1)}` : `⬇ ${label}`, className);
      if (anchor) {
        // Same tab: a non-HTML file downloads without leaving the page (target=_blank left an empty tab open).
        anchor.removeAttribute("target");
        anchor.setAttribute("download", "");
        anchor.setAttribute("title", `Descargar ${name}`);
        anchor.setAttribute("aria-label", `Descargar ${label} de ${journal.title} (${name})`);
      }
      return anchor;
    }).filter(Boolean);
  }

  function formatLinks(journal) {
    const authors = link(journal.author_instructions_url, "Instrucciones ↗");
    const scope = link(journal.aims_scope_url, "Alcance ↗");
    if (authors) authors.setAttribute("aria-label", `Formato de publicación de ${journal.title} (instrucciones para autores)`);
    if (scope) scope.setAttribute("aria-label", `Alcance de ${journal.title} (aims and scope)`);
    return el("div", { className: "fmt" }, [...templateLinks(journal), authors, scope]);
  }

  /* ---------- Rows of the selected project ---------- */

  function projectRows() {
    const project = projectsById.get(state.projectId);
    if (!project) return [];
    return project.matches
      .map((match) => ({ match, journal: journalsById.get(match.journal_id) }))
      .filter((row) => row.journal)
      .map((row) => ({ ...row, affinity: T.affinity(project, row.match, row.journal) }));
  }

  function visibleRows() {
    const filtered = T.filterRows(projectRows(), { ...state.advanced, query: state.query });
    return T.sortRows(filtered, state.sort);
  }

  function affinityParts(affinity) {
    return Object.entries(affinity.parts).map(([key, value]) => `${AFFINITY_LABELS[key]} ${value}/${T.AFFINITY_MAX[key]}`).join(" · ");
  }

  function affinityCell(affinity) {
    const level = T.affinityLevel(affinity.total);
    const bar = el("i", { attrs: { "aria-hidden": "true" } }, [el("span", { attrs: { style: `width:${affinity.total}%` } })]);
    return el("div", { className: `aff aff-${level}`, attrs: { title: `Afinidad estimada: ${affinityParts(affinity)}` } },
      [el("b", { text: `${affinity.total} %` }), bar]);
  }

  /* ---------- Design 04: list view ---------- */

  function affinityBreakdown(affinity) {
    const bars = el("div", { className: "bars" });
    for (const [key, value] of Object.entries(affinity.parts)) {
      const max = T.AFFINITY_MAX[key];
      bars.append(
        el("span", { text: AFFINITY_LABELS[key] }),
        el("i", { attrs: { role: "img", "aria-label": `${value} de ${max}` } }, [el("span", { attrs: { style: `width:${Math.round((value / max) * 100)}%` } })]),
        el("em", { text: `${value}/${max}` }),
      );
    }
    return bars;
  }

  function resultRow({ journal, affinity }, open) {
    const level = T.affinityLevel(affinity.total);
    const ring = el("div", { className: `ring aff-${level}`, attrs: { style: `--v:${affinity.total}`, role: "img",
      "aria-label": `Afinidad estimada ${affinity.total} %` } }, [
      el("div", {}, [el("span", {}, [el("b", { text: `${affinity.total}%` }), el("span", { text: "afinidad" })])]),
    ]);
    const title = el("h3", {}, [
      link(journal.url, journal.title) || document.createTextNode(journal.title),
      quartileBadge(journal.quartile),
      el("span", { className: "pub", text: `Publindex ${PUBLINDEX[journal.quartile]}` }),
    ]);
    const meta = [countryLabel(journal.country), (journal.languages || []).map(languageLabel).join(", "),
      journal.weeks_to_publication ? `${journal.weeks_to_publication} semanas` : null,
      reviewLabel(journal.review), journal.license].filter(Boolean).join(" · ");
    const why = el("details", { className: "why", attrs: { open } }, [
      el("summary", { text: `¿Por qué ${affinity.total} %?` }),
      affinityBreakdown(affinity),
    ]);

    const templates = templateLinks(journal);
    const instructions = link(journal.author_instructions_url, "Instrucciones para autores", templates.length ? "btn" : "btn primary");
    const acts = el("div", { className: "acts" }, [
      ...templates,
      instructions,
      el("div", { className: "btn-links" }, [link(journal.aims_scope_url, "Alcance"), link(journal.url, "Sitio"),
        link(journal.doaj_url, "DOAJ"), link(journal.scimago_url, "SCImago")]),
    ]);
    return el("article", { className: "result" }, [ring, el("div", {}, [title, el("div", { className: "meta", text: meta }), why]), acts]);
  }

  function renderList(rows) {
    const list = $("#list-view");
    list.replaceChildren(...rows.map((row, index) => resultRow(row, index === 0)));
  }

  /* ---------- Design 02: table view ---------- */

  function renderTableRows(rows) {
    const full = state.compare.length >= T.MAX_COMPARE;
    const body = $("#journals-body");
    body.replaceChildren();
    for (const { match, journal, affinity } of rows) {
      const selected = state.compare.includes(journal.id);
      const checkbox = el("input", { attrs: {
        type: "checkbox", "aria-label": `Comparar ${journal.title}`,
        disabled: !selected && full, title: !selected && full ? `Máximo ${T.MAX_COMPARE} revistas` : null,
      } });
      checkbox.checked = selected;
      checkbox.addEventListener("change", () => {
        state.compare = T.toggleCompare(state.compare, journal.id);
        renderResults();
        renderCompare();
      });
      const title = link(journal.url, journal.title) || el("b", { text: journal.title });
      body.appendChild(el("tr", { className: selected ? "selected" : "" }, [
        el("td", {}, [checkbox]),
        el("td", { className: "name" }, [title, el("span", { text: [journal.publisher, countryLabel(journal.country)].filter(Boolean).join(" · ") })]),
        el("td", {}, [affinityCell(affinity)]),
        el("td", { className: "num" }, [quartileBadge(journal.quartile), document.createTextNode(PUBLINDEX[journal.quartile])]),
        el("td", { className: "num", text: formatSjr(journal.sjr) }),
        el("td", { className: "num", text: journal.h_index ?? "—" }),
        el("td", { className: "num", text: journal.weeks_to_publication ?? "—" }),
        el("td", { text: (journal.languages || []).map(languageLabel).join(", ") }),
        el("td", { text: reviewLabel(journal.review) }),
        el("td", { text: journal.license || "—" }),
        el("td", {}, [el("span", { className: `fit fit-${match.fit}`, text: FIT_LABELS[match.fit] || match.fit })]),
        el("td", {}, [formatLinks(journal)]),
      ]));
    }
    for (const th of $$("#journals-table th[data-sort]")) {
      if (th.dataset.sort === state.sort.key) th.setAttribute("aria-sort", state.sort.dir === "asc" ? "ascending" : "descending");
      else th.removeAttribute("aria-sort");
    }
  }

  /* ---------- Shared rendering ---------- */

  function renderResults() {
    const all = projectRows();
    const rows = visibleRows();
    const list = state.mode === "list";
    $("#list-view").hidden = !list || rows.length === 0;
    $("#table-view").hidden = list || rows.length === 0;
    $("#table-empty").hidden = rows.length > 0;
    if (list) renderList(rows);
    else renderTableRows(rows);

    const selectedText = !list && state.compare.length
      ? ` · ${state.compare.length} seleccionada${state.compare.length > 1 ? "s" : ""} para comparar` : "";
    $("#table-count").replaceChildren(el("b", { text: rows.length }), document.createTextNode(` de ${all.length} revistas${selectedText}`));
    $("#adv-apply").textContent = `Ver ${rows.length} revista${rows.length === 1 ? "" : "s"}`;
    $("#sort-select").value = state.sort.key;
    renderChips();
  }

  // The compare tray is fixed at the bottom: reserve exactly its height so it never covers the last rows.
  function reserveTraySpace() {
    const tray = $("#compare-tray");
    document.body.style.paddingBottom = tray.hidden ? "" : `${tray.offsetHeight + 16}px`;
  }

  function renderCompare() {
    const journals = state.compare.map((id) => journalsById.get(id)).filter(Boolean);
    const tray = $("#compare-tray");
    tray.hidden = journals.length === 0 || state.mode !== "table";
    if (tray.hidden) return reserveTraySpace();

    $("#compare-title").textContent = `Comparando ${journals.length} revista${journals.length > 1 ? "s" : ""}`;
    const affinityById = Object.fromEntries(projectRows().map((r) => [r.journal.id, r.affinity]));
    const best = T.compareBest(journals, Object.fromEntries(Object.entries(affinityById).map(([id, a]) => [id, a.total])));
    const grid = $("#compare-grid");
    grid.style.gridTemplateColumns = `190px repeat(${journals.length}, minmax(200px, 1fr))`;
    grid.replaceChildren();

    const cell = (text, className, role = "cell") => el("div", { className, text, attrs: { role } });
    grid.appendChild(cell("", "k", "columnheader"));
    for (const journal of journals) {
      const remove = el("button", { text: "×", attrs: { type: "button", "aria-label": `Quitar ${journal.title} de la comparación` } });
      remove.addEventListener("click", () => {
        state.compare = T.toggleCompare(state.compare, journal.id);
        renderResults();
        renderCompare();
      });
      grid.appendChild(el("div", { className: "h", attrs: { role: "columnheader" } }, [el("span", { text: journal.title }), remove]));
    }

    const rows = [
      ["Afinidad estimada", (j) => (affinityById[j.id] ? `${affinityById[j.id].total} %` : "—"), "affinity"],
      ["Desglose de la afinidad", (j) => (affinityById[j.id] ? affinityParts(affinityById[j.id]) : "—"), null, "parts"],
      ["Cuartil · Publindex", (j) => `${j.quartile} · ${PUBLINDEX[j.quartile]}`, "quartile"],
      ["SJR", (j) => formatSjr(j.sjr), "sjr"],
      ["Índice H", (j) => j.h_index ?? "—", "h_index"],
      ["Semanas a publicación", (j) => j.weeks_to_publication ?? "—", "weeks"],
      ["Revisión · Licencia", (j) => `${reviewLabel(j.review)} · ${j.license || "—"}`, null],
      ["Idiomas", (j) => (j.languages || []).map(languageLabel).join(", "), null],
      ["País · Editorial", (j) => [countryLabel(j.country), j.publisher].filter(Boolean).join(" · "), null],
    ];
    for (const [label, value, bestKey, className] of rows) {
      grid.appendChild(cell(label, "k", "rowheader"));
      for (const journal of journals) {
        const isBest = bestKey && best[bestKey].includes(journal.id);
        grid.appendChild(cell(String(value(journal)), isBest ? "best" : className || ""));
      }
    }
    grid.appendChild(cell("Enlaces", "k", "rowheader"));
    for (const journal of journals) {
      grid.appendChild(el("div", { className: "links", attrs: { role: "cell" } }, [
        ...templateLinks(journal),
        link(journal.author_instructions_url, "Instrucciones para autores"),
        link(journal.aims_scope_url, "Alcance"),
        link(journal.url, "Sitio"),
        link(journal.doaj_url, "DOAJ"),
        link(journal.scimago_url, "SCImago"),
      ]));
    }
    reserveTraySpace();
  }

  /* ---------- Custom filters panel (design 04) ---------- */

  function filterChips() {
    const a = state.advanced;
    const d = T.ADVANCED_DEFAULTS;
    const chips = [];
    if (a.minAffinity !== d.minAffinity) chips.push(["minAffinity", `Afinidad ≥ ${a.minAffinity} %`]);
    if (a.quartiles.length) chips.push(["quartiles", a.quartiles.map((q) => `${q} · ${PUBLINDEX[q]}`).join(", ")]);
    if (a.maxWeeks !== d.maxWeeks) chips.push(["maxWeeks", `Hasta ${a.maxWeeks} semanas`]);
    if (a.language !== d.language) chips.push(["language", `Idioma: ${LANGUAGE_FILTER_LABELS[a.language]}`]);
    if (a.region !== d.region) chips.push(["region", a.region === "colombia" ? "Revista colombiana" : "Revista iberoamericana"]);
    if (a.minSjr !== d.minSjr) chips.push(["minSjr", `SJR ≥ ${a.minSjr.toLocaleString("es-CO")}`]);
    if (a.minH !== d.minH) chips.push(["minH", `Índice H ≥ ${a.minH}`]);
    if (a.reviews.length) chips.push(["reviews", `Revisión: ${a.reviews.map((r) => REVIEW_LABELS[r]).join(", ")}`]);
    if (a.ccBy) chips.push(["ccBy", "Solo CC BY"]);
    if (a.fits.length) chips.push(["fits", a.fits.map((f) => FIT_FILTER_LABELS[f]).join(", ")]);
    return chips;
  }

  function renderChips() {
    const chips = filterChips();
    const container = $("#adv-chips");
    container.replaceChildren();
    for (const [key, label] of chips) {
      const remove = el("button", { text: "×", attrs: { type: "button", "aria-label": `Quitar filtro ${label}` } });
      remove.addEventListener("click", () => setAdvanced({ [key]: T.ADVANCED_DEFAULTS[key] }));
      container.appendChild(el("span", { className: "chip" }, [document.createTextNode(label), remove]));
    }
    if (chips.length) {
      const clear = el("button", { className: "chip-clear", text: "Limpiar todo", attrs: { type: "button" } });
      clear.addEventListener("click", resetAdvanced);
      container.appendChild(clear);
    }
    const count = T.countAdvanced(state.advanced);
    const badge = $("#adv-count");
    badge.hidden = count === 0;
    badge.textContent = String(count);
  }

  function syncPanel() {
    const a = state.advanced;
    $("#adv-affinity").value = String(a.minAffinity);
    $("#adv-affinity-out").textContent = a.minAffinity ? `${a.minAffinity} %` : "Sin mínimo";
    $("#adv-weeks").value = String(a.maxWeeks ?? 52);
    $("#adv-weeks-out").textContent = a.maxWeeks === null ? "Sin límite" : `${a.maxWeeks} semanas`;
    $("#adv-language").value = a.language;
    $("#adv-region").value = a.region;
    if (document.activeElement !== $("#adv-sjr")) $("#adv-sjr").value = a.minSjr === null ? "" : a.minSjr.toLocaleString("es-CO");
    if (document.activeElement !== $("#adv-h")) $("#adv-h").value = a.minH ?? "";
    for (const pill of $$("#adv-quartiles .pill")) pill.setAttribute("aria-pressed", a.quartiles.includes(pill.dataset.value) ? "true" : "false");
    for (const pill of $$("#adv-fits .pill")) pill.setAttribute("aria-pressed", a.fits.includes(pill.dataset.value) ? "true" : "false");
    $("#adv-review-double").checked = a.reviews.includes("double");
    $("#adv-review-single").checked = a.reviews.includes("single") || a.reviews.includes("open");
    $("#adv-ccby").checked = a.ccBy;
  }

  function setAdvanced(patch) {
    state.advanced = { ...state.advanced, ...patch };
    syncPanel();
    renderResults();
  }

  function resetAdvanced() {
    state.advanced = { ...T.ADVANCED_DEFAULTS };
    syncPanel();
    renderResults();
  }

  function numberOrNull(value) {
    const n = Number(String(value).trim().replace(",", "."));
    return String(value).trim() === "" || !Number.isFinite(n) || n < 0 ? null : n;
  }

  const toggled = (values, value) => (values.includes(value) ? values.filter((v) => v !== value) : [...values, value]);

  function openPanel(show) {
    $("#adv-panel").hidden = !show;
    $("#results-layout").classList.toggle("with-panel", show);
    $("#adv-toggle").setAttribute("aria-expanded", show ? "true" : "false");
    if (show) $("#adv-close").focus();
  }

  function setupPanel() {
    $("#adv-toggle").addEventListener("click", () => openPanel($("#adv-panel").hidden));
    $("#adv-close").addEventListener("click", () => { openPanel(false); $("#adv-toggle").focus(); });
    $("#adv-apply").addEventListener("click", () => { openPanel(false); $("#table-count").scrollIntoView({ block: "center" }); });
    $("#adv-reset").addEventListener("click", resetAdvanced);
    $("#adv-panel").addEventListener("keydown", (e) => { if (e.key === "Escape") { openPanel(false); $("#adv-toggle").focus(); } });
    $("#adv-affinity").addEventListener("input", (e) => setAdvanced({ minAffinity: Number(e.target.value) }));
    $("#adv-weeks").addEventListener("input", (e) => setAdvanced({ maxWeeks: Number(e.target.value) >= 52 ? null : Number(e.target.value) }));
    $("#adv-language").addEventListener("change", (e) => setAdvanced({ language: e.target.value }));
    $("#adv-region").addEventListener("change", (e) => setAdvanced({ region: e.target.value }));
    $("#adv-sjr").addEventListener("input", (e) => setAdvanced({ minSjr: numberOrNull(e.target.value) }));
    $("#adv-h").addEventListener("input", (e) => setAdvanced({ minH: numberOrNull(e.target.value) }));
    for (const pill of $$("#adv-quartiles .pill")) {
      pill.addEventListener("click", () => setAdvanced({ quartiles: toggled(state.advanced.quartiles, pill.dataset.value) }));
    }
    for (const pill of $$("#adv-fits .pill")) {
      pill.addEventListener("click", () => setAdvanced({ fits: toggled(state.advanced.fits, pill.dataset.value) }));
    }
    const reviews = () => [...($("#adv-review-double").checked ? ["double"] : []), ...($("#adv-review-single").checked ? ["single", "open"] : [])];
    $("#adv-review-double").addEventListener("change", () => setAdvanced({ reviews: reviews() }));
    $("#adv-review-single").addEventListener("change", () => setAdvanced({ reviews: reviews() }));
    $("#adv-ccby").addEventListener("change", (e) => setAdvanced({ ccBy: e.target.checked }));
  }

  /* ---------- Saved filters (built-in presets + the user's own, in localStorage) ---------- */

  function loadUserPresets() {
    try {
      const stored = JSON.parse(localStorage.getItem(PRESET_STORAGE_KEY) || "[]");
      return Array.isArray(stored) ? stored.filter((p) => p && typeof p.label === "string" && p.filters && typeof p.filters === "object") : [];
    } catch (_) {
      return [];
    }
  }

  function saveUserPresets() {
    try { localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(state.userPresets)); } catch (_) { /* storage unavailable */ }
  }

  function renderPresets() {
    const list = $("#preset-list");
    list.replaceChildren();
    const items = [...T.PRESETS.map((p) => ({ preset: p, own: false })), ...state.userPresets.map((p) => ({ preset: p, own: true }))];
    items.forEach(({ preset, own }, index) => {
      const apply = el("button", { className: "preset", text: preset.label, attrs: { type: "button", title: "Aplicar este filtro guardado" } });
      apply.addEventListener("click", () => { state.advanced = T.applyPreset(preset); syncPanel(); renderResults(); });
      const item = el("span", { className: "preset-item" }, [apply]);
      if (own) {
        const del = el("button", { className: "del", text: "×", attrs: { type: "button", "aria-label": `Borrar el filtro guardado ${preset.label}` } });
        del.addEventListener("click", () => {
          state.userPresets = state.userPresets.filter((p) => p !== preset);
          saveUserPresets();
          renderPresets();
        });
        item.appendChild(del);
      }
      list.appendChild(item);
      if (index < items.length - 1) list.appendChild(document.createTextNode("·"));
    });
  }

  function setupPresets() {
    state.userPresets = loadUserPresets();
    renderPresets();
    const form = $("#preset-form");
    $("#preset-new").addEventListener("click", () => {
      form.hidden = !form.hidden;
      if (!form.hidden) $("#preset-name").focus();
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      try {
        const preset = T.makePreset($("#preset-name").value, state.advanced);
        state.userPresets = [...state.userPresets.filter((p) => p.id !== preset.id), preset];
        saveUserPresets();
        renderPresets();
        $("#preset-name").value = "";
        $("#preset-error").textContent = "";
        form.hidden = true;
        $("#preset-new").focus();
      } catch (error) {
        $("#preset-error").textContent = error.message;
      }
    });
  }

  /* ---------- Project selection ---------- */

  function renderProjectHeader() {
    const project = projectsById.get(state.projectId);
    const back = $("#back-link");
    if (!project) {
      $("#project-emoji").textContent = "🔎";
      $("#project-kicker").textContent = "¿Dónde publicar?";
      $("#project-title").textContent = "Elija un proyecto";
      back.href = "/proyectos";
      back.textContent = "← Volver al banco de proyectos";
      $("#project-picker").hidden = false;
      $("#project-results").hidden = true;
      return;
    }
    $("#project-emoji").textContent = project.emoji || "📁";
    $("#project-kicker").textContent = `¿Dónde publicar? · Proyecto ${project.number} · ${project.area} · ${project.level}`;
    $("#project-title").textContent = project.title;
    back.href = `/proyecto/${encodeURIComponent(project.id)}`;
    back.textContent = "← Volver al proyecto";
    $("#project-picker").hidden = true;
    $("#project-results").hidden = false;
    document.title = `${project.title} · ¿Dónde publicar?`;
  }

  function selectProject(id, updateUrl) {
    state.projectId = projectsById.has(id) ? id : null;
    state.compare = [];
    if (updateUrl) {
      const url = new URL(location.href);
      if (state.projectId) url.searchParams.set("p", state.projectId);
      else url.searchParams.delete("p");
      history.replaceState(null, "", url);
    }
    renderProjectHeader();
    if (state.projectId) renderResults();
    renderCompare();
  }

  function setMode(mode) {
    state.mode = mode;
    for (const b of $$("[data-mode]")) b.setAttribute("aria-pressed", b.dataset.mode === mode ? "true" : "false");
    renderResults();
    renderCompare();
  }

  /* ---------- Catalog ---------- */

  function journalCard(journal) {
    const card = $("#journal-card").content.firstElementChild.cloneNode(true);
    $(".journal-title-row", card).prepend(quartileBadge(journal.quartile));
    $(".journal-title", card).textContent = journal.title;
    const languages = (journal.languages || []).map(languageLabel).join(", ");
    $(".journal-meta", card).textContent = [journal.publisher, countryLabel(journal.country), languages && `Idiomas: ${languages}`]
      .filter(Boolean).join(" · ");
    const facts = [
      ["Publindex", PUBLINDEX[journal.quartile]], ["SJR", formatSjr(journal.sjr)], ["Índice H", journal.h_index ?? "—"],
      ["Revisión", reviewLabel(journal.review)], ["Semanas a publicación", journal.weeks_to_publication ?? "—"],
      ["Licencia", journal.license || "—"], ["ISSN", (journal.issns || []).map(formatIssn).join(" / ")],
    ];
    const dl = $(".journal-facts", card);
    for (const [label, value] of facts) dl.appendChild(el("div", {}, [el("dt", { text: label }), el("dd", { text: value })]));
    const cats = (journal.categories || []).map((c) => (c.quartile ? `${c.name} (${c.quartile})` : c.name));
    $(".journal-cats", card).textContent = cats.length ? `Categorías SCImago: ${cats.join(" · ")}` : "";
    const links = $(".journal-links", card);
    for (const node of [link(journal.url, "Sitio de la revista", "primary"), link(journal.author_instructions_url, "Instrucciones para autores"),
      link(journal.aims_scope_url, "Alcance de la revista"), link(journal.doaj_url, "Ficha en DOAJ"), link(journal.scimago_url, "Ficha en SCImago")]) {
      if (node) links.appendChild(node);
    }
    return card;
  }

  function loadCatalog() {
    if (state.catalog) return renderCatalog();
    if (window.DONDE_PUBLICAR_CATALOGO) {
      state.catalog = window.DONDE_PUBLICAR_CATALOGO;
      return renderCatalog();
    }
    const script = document.createElement("script");
    script.src = "catalog.js";
    script.onload = () => { state.catalog = window.DONDE_PUBLICAR_CATALOGO || []; renderCatalog(); };
    script.onerror = () => { $("#catalog-count").textContent = "No se pudo cargar el catálogo (catalog.js)."; };
    document.body.appendChild(script);
  }

  function renderCatalog() {
    if (!state.catalog) return;
    const rows = T.filterRows(state.catalog.map((journal) => ({ match: { fit: "all" }, journal })), {
      query: $("#catalog-search").value, quartile: state.catalogQuartile, spanish: $("#catalog-spanish").checked,
    });
    const results = $("#catalog-results");
    results.replaceChildren();
    for (const { journal } of rows.slice(0, state.catalogShown)) results.appendChild(journalCard(journal));
    if (!rows.length) results.appendChild(el("p", { className: "no-results", text: "Sin resultados para esta búsqueda." }));
    $("#catalog-count").textContent = `Mostrando ${Math.min(state.catalogShown, rows.length)} de ${rows.length} revistas`;
    $("#catalog-more").hidden = rows.length <= state.catalogShown;
  }

  function setupSegmented(group, onSelect) {
    const buttons = $$("button", group);
    for (const button of buttons) {
      button.addEventListener("click", () => {
        buttons.forEach((b) => b.setAttribute("aria-pressed", b === button ? "true" : "false"));
        onSelect(button.dataset.value);
      });
    }
  }

  /* ---------- Tabs and init ---------- */

  function showView(view) {
    for (const button of $$(".tabs button")) {
      const selected = button.dataset.view === view;
      button.setAttribute("aria-selected", selected ? "true" : "false");
      $(`#view-${button.dataset.view}`).hidden = !selected;
    }
    $("#compare-tray").hidden = view !== "project" || state.mode !== "table" || state.compare.length === 0;
    reserveTraySpace();
    if (view === "catalog") loadCatalog();
  }

  function init() {
    if (!DATA || !T) {
      $("#project-title").textContent = "No se encontraron los datos de la página (data.js o table.js).";
      return;
    }
    const picker = $("#picker-select");
    for (const project of DATA.projects) {
      picker.appendChild(el("option", { text: `${project.number}. ${project.title}`, attrs: { value: project.id } }));
    }
    picker.addEventListener("change", () => selectProject(picker.value, true));

    $("#table-search").addEventListener("input", (e) => { state.query = e.target.value; renderResults(); });
    $("#sort-select").addEventListener("change", (e) => { state.sort = { key: e.target.value, dir: SORT_DEFAULT_DIR[e.target.value] }; renderResults(); });
    for (const button of $$("[data-mode]")) button.addEventListener("click", () => setMode(button.dataset.mode));
    for (const th of $$("#journals-table th[data-sort]")) {
      $("button", th).addEventListener("click", () => {
        const key = th.dataset.sort;
        const dir = state.sort.key === key ? (state.sort.dir === "asc" ? "desc" : "asc") : SORT_DEFAULT_DIR[key];
        state.sort = { key, dir };
        renderResults();
      });
    }
    $("#compare-clear").addEventListener("click", () => { state.compare = []; renderResults(); renderCompare(); });
    setupPanel();
    setupPresets();

    for (const button of $$(".tabs button")) button.addEventListener("click", () => showView(button.dataset.view));
    $("#catalog-search").addEventListener("input", () => { state.catalogShown = PAGE_SIZE; renderCatalog(); });
    $("#catalog-spanish").addEventListener("change", () => { state.catalogShown = PAGE_SIZE; renderCatalog(); });
    setupSegmented($('[data-catalog="quartile"]'), (value) => { state.catalogQuartile = value; state.catalogShown = PAGE_SIZE; renderCatalog(); });
    $("#catalog-more").addEventListener("click", () => { state.catalogShown += PAGE_SIZE; renderCatalog(); });

    const s = DATA.sources;
    $("#data-sources").textContent = `Datos generados el ${DATA.generated}: ${s.doaj_free_journals.toLocaleString("es-CO")} revistas de DOAJ sin APC ni otros cobros, de las cuales ${s.diamond_ranked_journals.toLocaleString("es-CO")} tienen cuartil en SCImago.`;

    const requested = new URLSearchParams(location.search).get("p") || location.hash.replace(/^#/, "");
    selectProject(requested, false);
  }

  init();
})();
