/* "¿Dónde publicar este proyecto?" — client-side rendering of site/data.js (and catalog.js on demand). */
(function () {
  "use strict";

  const DATA = window.DONDE_PUBLICAR;
  const PAGE_SIZE = 15;
  const QUARTILES = ["Q1", "Q2", "Q3", "Q4"];
  const FIT_LABELS = {
    fuerte: "Encaje fuerte: sector + tecnología",
    tecnologia: "Encaje por tecnología",
    sector: "Encaje por sector",
  };
  const LANGUAGE_LABELS = {
    English: "Inglés", Spanish: "Español", Portuguese: "Portugués", French: "Francés", German: "Alemán",
    Italian: "Italiano", Chinese: "Chino", Russian: "Ruso", Indonesian: "Indonesio", Turkish: "Turco",
    Polish: "Polaco", Catalan: "Catalán",
  };

  const journalsById = new Map(DATA.journals.map((j) => [j.id, j]));
  const projectsById = new Map(DATA.projects.map((p) => [p.id, p]));
  const state = {
    projectId: null,
    quartiles: new Set(QUARTILES),
    spanishOnly: false,
    strongOnly: false,
    sort: "relevance",
    shown: PAGE_SIZE,
    catalog: null,
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
        if (value !== undefined && value !== null) node.setAttribute(key, value);
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

  function normalize(text) {
    return String(text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function languageLabel(language) {
    return LANGUAGE_LABELS[language] || language;
  }

  function formatIssn(issn) {
    return issn && issn.length === 8 ? issn.slice(0, 4) + "-" + issn.slice(4) : issn;
  }

  /* ---------- Project list ---------- */

  function renderAreaOptions() {
    const select = $("#project-area");
    const areas = Array.from(new Set(DATA.projects.map((p) => p.area))).sort((a, b) => a.localeCompare(b, "es"));
    for (const area of areas) select.appendChild(el("option", { text: area, attrs: { value: area } }));
  }

  function filteredProjects() {
    const query = normalize($("#project-search").value.trim());
    const area = $("#project-area").value;
    return DATA.projects.filter((p) => {
      if (area && p.area !== area) return false;
      if (!query) return true;
      const haystack = normalize([p.number, p.title, p.area, p.sector, p.problem, p.description].join(" "));
      return query.split(/\s+/).every((word) => haystack.includes(word));
    });
  }

  function renderProjectList() {
    const list = $("#project-list");
    const projects = filteredProjects();
    list.replaceChildren();
    for (const project of projects) {
      const item = el("li", {
        className: "project-item",
        attrs: { tabindex: "0", role: "button", "data-id": project.id,
          "aria-current": project.id === state.projectId ? "true" : "false" },
      }, [
        el("span", { className: "emoji", text: project.emoji || "📁", attrs: { "aria-hidden": "true" } }),
        el("span", {}, [
          el("span", { className: "p-title", text: `${project.number}. ${project.title}` }),
          el("br"),
          el("span", { className: "p-area", text: project.area }),
        ]),
      ]);
      item.addEventListener("click", () => selectProject(project.id, true));
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectProject(project.id, true);
        }
      });
      list.appendChild(item);
    }
    $("#project-count").textContent = `${projects.length} de ${DATA.projects.length} proyectos`;
  }

  /* ---------- Journal card ---------- */

  function journalCard(journal, match) {
    const card = $("#journal-card").content.firstElementChild.cloneNode(true);
    const qBadge = $(".q", card);
    qBadge.textContent = journal.quartile;
    qBadge.classList.add(journal.quartile.toLowerCase());
    qBadge.title = `Cuartil ${journal.quartile} en SCImago · Publindex ${journal.publindex}`;
    $(".journal-title", card).textContent = journal.title;

    const fit = $(".fit", card);
    if (match) {
      fit.textContent = FIT_LABELS[match.fit] || match.fit;
      fit.classList.add("fit-" + match.fit);
    } else {
      fit.remove();
    }

    const languages = (journal.languages || []).map(languageLabel).join(", ");
    $(".journal-meta", card).textContent = [journal.publisher, journal.country, languages && "Idiomas: " + languages]
      .filter(Boolean).join(" · ");

    const facts = [
      ["Publindex", journal.publindex],
      ["SJR", journal.sjr != null ? journal.sjr.toFixed(3) : "—"],
      ["Índice H", journal.h_index != null ? journal.h_index : "—"],
      ["Revisión", journal.review || "—"],
      ["Tiempo a publicación", journal.weeks_to_publication ? `${journal.weeks_to_publication} semanas` : "—"],
      ["Licencia", journal.license || "—"],
      ["Costo para autores", "Sin APC ni otros cobros"],
      ["ISSN", (journal.issns || []).map(formatIssn).join(" / ")],
    ];
    const dl = $(".journal-facts", card);
    for (const [label, value] of facts) {
      dl.appendChild(el("div", {}, [el("dt", { text: label }), el("dd", { text: value })]));
    }

    const why = $(".journal-why", card);
    if (match && match.themes.length) {
      why.appendChild(el("span", { text: "Por qué encaja: " }));
      for (const theme of match.themes) {
        why.appendChild(el("span", { className: "tag", text: DATA.themes[theme] || theme }));
      }
    } else {
      why.remove();
    }

    const cats = (journal.categories || []).map((c) => (c.quartile ? `${c.name} (${c.quartile})` : c.name));
    $(".journal-cats", card).textContent = cats.length ? "Categorías SCImago: " + cats.join(" · ") : "";

    const links = $(".journal-links", card);
    const linkSpecs = [
      [journal.url, "Sitio de la revista", "primary"],
      [journal.author_instructions_url, "Instrucciones para autores"],
      [journal.doaj_url, "Ficha en DOAJ"],
      [journal.scimago_url, "Ficha en SCImago"],
    ];
    for (const [url, label, className] of linkSpecs) {
      const href = safeUrl(url);
      if (!href) continue;
      links.appendChild(el("a", {
        text: label, className: className || "",
        attrs: { href, target: "_blank", rel: "noopener noreferrer" },
      }));
    }
    return card;
  }

  /* ---------- Project detail ---------- */

  function projectMatches(project) {
    let rows = project.matches
      .map((match) => ({ match, journal: journalsById.get(match.journal_id) }))
      .filter((row) => row.journal && state.quartiles.has(row.journal.quartile));
    if (state.spanishOnly) rows = rows.filter((row) => (row.journal.languages || []).includes("Spanish"));
    if (state.strongOnly) rows = rows.filter((row) => row.match.fit === "fuerte");
    const byQuartile = (a, b) => a.journal.quartile.localeCompare(b.journal.quartile) || (b.journal.sjr || 0) - (a.journal.sjr || 0);
    if (state.sort === "quartile") rows.sort(byQuartile);
    if (state.sort === "speed") {
      rows.sort((a, b) => (a.journal.weeks_to_publication || 999) - (b.journal.weeks_to_publication || 999));
    }
    return rows;
  }

  function quartileFilters(name, onChange) {
    const fieldset = el("fieldset", { className: "chips", attrs: { "aria-label": "Cuartil" } }, [el("legend", { text: "Cuartil" })]);
    for (const quartile of QUARTILES) {
      const input = el("input", { attrs: { type: "checkbox", name, value: quartile } });
      input.checked = state.quartiles.has(quartile);
      input.addEventListener("change", () => {
        if (input.checked) state.quartiles.add(quartile);
        else state.quartiles.delete(quartile);
        onChange();
      });
      fieldset.appendChild(el("label", {}, [input, document.createTextNode(" " + quartile)]));
    }
    return fieldset;
  }

  function toggle(id, label, checked, onChange) {
    const input = el("input", { attrs: { type: "checkbox", id } });
    input.checked = checked;
    input.addEventListener("change", () => onChange(input.checked));
    return el("label", { className: "toggle", attrs: { for: id } }, [input, document.createTextNode(" " + label)]);
  }

  function renderProjectDetail() {
    const container = $("#project-detail");
    const project = projectsById.get(state.projectId);
    if (!project) return;
    container.replaceChildren();

    const counts = Object.fromEntries(QUARTILES.map((q) => [q, 0]));
    for (const match of project.matches) {
      const journal = journalsById.get(match.journal_id);
      if (journal) counts[journal.quartile] += 1;
    }
    const strong = project.matches.filter((m) => m.fit === "fuerte").length;

    const domainTags = el("div", { className: "tags", attrs: { "aria-label": "Temas de sector" } });
    for (const theme of project.themes.domain) domainTags.appendChild(el("span", { className: "tag domain", text: DATA.themes[theme] || theme }));
    const techTags = el("div", { className: "tags", attrs: { "aria-label": "Temas de tecnología" } });
    for (const theme of project.themes.tech) {
      if (theme === "computacion_general" || theme === "tecnologia_aplicada") continue;
      techTags.appendChild(el("span", { className: "tag tech", text: DATA.themes[theme] || theme }));
    }

    const copyStatus = el("span", { className: "copy-status", attrs: { role: "status" } });
    const copyButton = el("button", { className: "btn-secondary", text: "🔗 Copiar enlace de este proyecto" });
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(location.href);
        copyStatus.textContent = "Enlace copiado";
      } catch (_) {
        copyStatus.textContent = location.href;
      }
    });

    const head = el("header", { className: "detail-head" }, [
      el("p", { className: "muted small", text: `Proyecto ${project.number} · ${project.level}` }),
      el("h2", { text: `${project.emoji} ${project.title}` }),
      el("div", { className: "tags" }, [
        el("span", { className: "tag", text: project.area }),
        el("span", { className: "tag", text: project.sector }),
      ]),
      project.problem ? el("p", { className: "problem", text: project.problem }) : null,
      el("p", { className: "small muted", text: "Temas usados para buscar revistas:" }),
      domainTags,
      techTags,
      el("div", { className: "share-row" }, [copyButton, copyStatus]),
    ]);

    const summary = el("div", { className: "summary", attrs: { "aria-label": "Resumen de revistas sugeridas" } }, [
      el("div", { className: "stat" }, [el("b", { text: project.matches.length }), el("span", { text: "revistas sugeridas" })]),
      el("div", { className: "stat" }, [el("b", { text: strong }), el("span", { text: "con encaje fuerte" })]),
      ...QUARTILES.map((q) => el("div", { className: "stat stat-" + q.toLowerCase() }, [el("b", { text: counts[q] }), el("span", { text: `${q} · Publindex ${({ Q1: "A1", Q2: "A2", Q3: "B", Q4: "C" })[q]}` })])),
    ]);

    const sortSelect = el("select", { attrs: { id: "sort-select" } });
    for (const [value, label] of [["relevance", "Mejor encaje primero"], ["quartile", "Mejor cuartil primero"], ["speed", "Publicación más rápida"]]) {
      const option = el("option", { text: label, attrs: { value } });
      if (value === state.sort) option.selected = true;
      sortSelect.appendChild(option);
    }
    sortSelect.addEventListener("change", () => { state.sort = sortSelect.value; state.shown = PAGE_SIZE; renderResults(); });

    const filters = el("div", { className: "filters" }, [
      quartileFilters("project-q", () => { state.shown = PAGE_SIZE; renderResults(); }),
      toggle("spanish-only", "Acepta artículos en español", state.spanishOnly, (v) => { state.spanishOnly = v; state.shown = PAGE_SIZE; renderResults(); }),
      toggle("strong-only", "Solo encaje fuerte", state.strongOnly, (v) => { state.strongOnly = v; state.shown = PAGE_SIZE; renderResults(); }),
      el("label", { className: "field", attrs: { for: "sort-select" } }, [el("span", { text: "Ordenar" }), sortSelect]),
    ]);

    const resultsCount = el("p", { className: "muted small", attrs: { id: "results-count", "aria-live": "polite" } });
    const results = el("div", { className: "journal-list", attrs: { id: "results" } });
    const more = el("button", { className: "btn-secondary more", text: "Ver más revistas", attrs: { id: "results-more" } });
    more.addEventListener("click", () => { state.shown += PAGE_SIZE; renderResults(); });

    container.append(head, summary, el("h3", { text: "Revistas sugeridas" }), filters, resultsCount, results, more);
    renderResults();
  }

  function renderResults() {
    const project = projectsById.get(state.projectId);
    if (!project) return;
    const rows = projectMatches(project);
    const results = $("#results");
    results.replaceChildren();
    if (!rows.length) {
      results.appendChild(el("p", { className: "no-results", text: "Ninguna revista cumple estos filtros. Pruebe activar más cuartiles o quitar el filtro de idioma." }));
    }
    for (const row of rows.slice(0, state.shown)) results.appendChild(journalCard(row.journal, row.match));
    $("#results-count").textContent = `Mostrando ${Math.min(state.shown, rows.length)} de ${rows.length} revistas`;
    $("#results-more").hidden = rows.length <= state.shown;
  }

  function selectProject(id, updateUrl) {
    if (!projectsById.has(id)) return;
    state.projectId = id;
    state.shown = PAGE_SIZE;
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set("p", id);
      url.hash = "";
      history.replaceState(null, "", url);
    }
    $$(".project-item").forEach((item) => item.setAttribute("aria-current", item.dataset.id === id ? "true" : "false"));
    renderProjectDetail();
    const detail = $("#project-detail");
    if (window.matchMedia("(max-width: 900px)").matches) detail.scrollIntoView({ behavior: "smooth", block: "start" });
    else if (detail.getBoundingClientRect().top < 0) detail.scrollIntoView({ block: "start" });
    document.title = `${projectsById.get(id).title} · ¿Dónde publicar?`;
  }

  /* ---------- Catalog ---------- */

  function loadCatalog() {
    if (state.catalog || window.DONDE_PUBLICAR_CATALOGO) {
      state.catalog = state.catalog || window.DONDE_PUBLICAR_CATALOGO;
      renderCatalog();
      return;
    }
    const script = document.createElement("script");
    script.src = "catalog.js";
    script.onload = () => { state.catalog = window.DONDE_PUBLICAR_CATALOGO || []; renderCatalog(); };
    script.onerror = () => { $("#catalog-count").textContent = "No se pudo cargar el catálogo (catalog.js)."; };
    document.body.appendChild(script);
  }

  function renderCatalog() {
    if (!state.catalog) return;
    const query = normalize($("#catalog-search").value.trim());
    const quartiles = new Set($$('input[name="catalog-q"]:checked').map((i) => i.value));
    const spanish = $("#catalog-spanish").checked;
    const rows = state.catalog.filter((journal) => {
      if (!quartiles.has(journal.quartile)) return false;
      if (spanish && !(journal.languages || []).includes("Spanish")) return false;
      if (!query) return true;
      const haystack = normalize([journal.title, journal.publisher, journal.country, (journal.categories || []).map((c) => c.name).join(" "), (journal.issns || []).join(" ")].join(" "));
      return query.split(/\s+/).every((word) => haystack.includes(word));
    });
    const results = $("#catalog-results");
    results.replaceChildren();
    for (const journal of rows.slice(0, state.catalogShown)) results.appendChild(journalCard(journal, null));
    if (!rows.length) results.appendChild(el("p", { className: "no-results", text: "Sin resultados para esta búsqueda." }));
    $("#catalog-count").textContent = `Mostrando ${Math.min(state.catalogShown, rows.length)} de ${rows.length} revistas`;
    $("#catalog-more").hidden = rows.length <= state.catalogShown;
  }

  /* ---------- Tabs ---------- */

  function showView(view) {
    for (const button of $$(".tabs button")) {
      const selected = button.dataset.view === view;
      button.setAttribute("aria-selected", selected ? "true" : "false");
      $("#view-" + button.dataset.view).hidden = !selected;
    }
    if (view === "catalog") loadCatalog();
  }

  /* ---------- Init ---------- */

  function init() {
    if (!DATA) {
      $("#project-detail").textContent = "No se encontraron los datos (data.js). Ejecute el generador del README.";
      return;
    }
    renderAreaOptions();
    renderProjectList();
    $("#project-search").addEventListener("input", renderProjectList);
    $("#project-area").addEventListener("change", renderProjectList);
    for (const button of $$(".tabs button")) button.addEventListener("click", () => showView(button.dataset.view));
    $("#catalog-search").addEventListener("input", () => { state.catalogShown = PAGE_SIZE; renderCatalog(); });
    $$('input[name="catalog-q"]').forEach((input) => input.addEventListener("change", () => { state.catalogShown = PAGE_SIZE; renderCatalog(); }));
    $("#catalog-spanish").addEventListener("change", () => { state.catalogShown = PAGE_SIZE; renderCatalog(); });
    $("#catalog-more").addEventListener("click", () => { state.catalogShown += PAGE_SIZE; renderCatalog(); });

    const s = DATA.sources;
    $("#data-sources").textContent = `Datos generados el ${DATA.generated}: ${s.doaj_free_journals.toLocaleString("es-CO")} revistas de DOAJ sin APC ni otros cobros, de las cuales ${s.diamond_ranked_journals.toLocaleString("es-CO")} tienen cuartil en SCImago.`;

    const params = new URLSearchParams(location.search);
    const requested = params.get("p") || location.hash.replace(/^#/, "");
    if (projectsById.has(requested)) selectProject(requested, false);
  }

  init();
})();
