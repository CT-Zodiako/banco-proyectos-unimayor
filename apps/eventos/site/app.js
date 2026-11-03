/* "Buscador de eventos académicos" — calls for papers and events to attend, with filters kept in the URL.
   Data: window.EVENTOS (data.js, written by the pipeline; sample-data.js is loaded instead when data.js is missing).
   Logic: window.EVFilters (filters.js). With ?p=<project id> the list holds only the events sharing a topic with that
   project (window.EVENTOS.projects), ranked by estimated affinity, and the other filters apply on top. */
(function () {
  "use strict";

  const F = window.EVFilters;
  const SOURCE_LABELS = { wikicfp: "WikiCFP", ccfddl: "CCF Deadlines", devpost: "Devpost", manual: "UNIMAYOR" };
  const KIND_LABELS = { cfp: "Convocatoria", attend: "Para asistir" };
  const SOON_DAYS = 14;
  const AFFINITY_LABELS = { topics: "Temas en común", keywords: "Palabras clave", access: "Acceso (Colombia o en línea)",
    time: "Tiempo para preparar" };

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

  function link(url, label, className, ariaLabel) {
    const href = safeUrl(url);
    return href ? el("a", { text: label, className, attrs: { href, target: "_blank", rel: "noopener noreferrer", "aria-label": ariaLabel } }) : null;
  }

  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

  function start(DATA) {
    const today = F.localIsoDate(new Date());
    const events = DATA.events || [];
    const knownTopics = DATA.topics || [];
    const state = F.parseQuery(window.location.search);
    state.topics = state.topics.filter((t) => knownTopics.includes(t));
    const projectsById = new Map((DATA.projects || []).map((p) => [p.id, p]));
    let project = null;
    let ranked = [];
    let affinityByEvent = new Map();
    let selected = [];

    /* ---------- Project (?p=) ---------- */

    function setProject(id) {
      project = (id && projectsById.get(id)) || null;
      ranked = project ? F.rankForProject(events, project, today) : [];
      affinityByEvent = new Map(ranked.map((r) => [r.event, r.affinity]));
      if (project) state.project = project.id;
      else delete state.project;
      if (!project && state.sort === "affinity") state.sort = F.DEFAULT_STATE.sort;
      renderProject();
    }

    function renderProject() {
      const option = $("#sort-affinity");
      option.hidden = option.disabled = !project;
      $("#project-card").hidden = !project;
      if (!project) {
        document.title = "Buscador de eventos académicos · Banco de Proyectos · UNIMAYOR";
        return;
      }
      $("#project-emoji").textContent = project.emoji || "📁";
      $("#project-kicker").textContent = ["Eventos para el proyecto", project.area, project.level].filter(Boolean).join(" · ");
      $("#project-title").textContent = project.title;
      $("#project-topics").replaceChildren(...(project.topics || []).map((t) => el("span", { className: "topic", text: t })));
      $("#project-back").href = `/proyecto/${encodeURIComponent(project.id)}`;
      document.title = `${project.title} · Eventos académicos`;
    }

    function showAllEvents() {
      setProject(null);
      update();
      $("#search").focus();
    }

    /* ---------- Controls ---------- */

    function syncControls() {
      for (const button of $$("#kind-group button")) button.setAttribute("aria-pressed", String(button.dataset.value === state.kind));
      $("#modality").value = state.modality;
      $("#colombia").checked = state.colombia;
      $("#sort").value = state.sort;
      $("#date-from").value = state.dateFrom;
      $("#date-to").value = state.dateTo;
      if ($("#location").value !== state.location) $("#location").value = state.location;
      if ($("#search").value !== state.query) $("#search").value = state.query;
    }

    function renderTopics() {
      // Counts follow every other filter, so each pill tells how many results selecting it would add.
      const counts = F.topicCounts(F.filterEvents(baseEvents(), { ...state, topics: [], today }));
      const pills = knownTopics.map((topic) => {
        const pressed = state.topics.includes(topic);
        const n = counts[topic] || 0;
        const pill = el("button", { className: "pill", attrs: { type: "button", "aria-pressed": String(pressed),
          "aria-label": `${topic}, ${plural(n, "evento", "eventos")}` } },
          [document.createTextNode(topic), el("span", { className: "n", text: n, attrs: { "aria-hidden": "true" } })]);
        pill.addEventListener("click", () => {
          state.topics = pressed ? state.topics.filter((t) => t !== topic) : [...state.topics, topic];
          update();
          const again = $$("#topic-pills .pill").find((p) => p.firstChild.textContent === topic);
          if (again) again.focus();
        });
        return pill;
      });
      $("#topic-pills").replaceChildren(...pills);
    }

    /* ---------- Event cards ---------- */

    function daysBadge(event) {
      const days = F.daysLeft(event, today);
      if (days === null || days < 0) return null;
      const text = days === 0 ? "cierra hoy" : `cierra en ${plural(days, "día", "días")}`;
      return el("span", { className: `tag tag-days${days <= SOON_DAYS ? " soon" : ""}`, text });
    }

    function fact(label, value) {
      return value ? el("div", {}, [el("dt", { text: label }), el("dd", { text: value })]) : null;
    }

    function affinityRing(affinity) {
      const level = F.affinityLevel(affinity.total);
      return el("div", { className: `ring aff-${level}`, attrs: { style: `--v:${affinity.total}`, role: "img",
        "aria-label": `Afinidad estimada ${affinity.total} %` } }, [
        el("div", {}, [el("span", {}, [el("b", { text: `${affinity.total}%` }), el("span", { text: "afinidad" })])]),
      ]);
    }

    function affinityDetail(key, event, affinity) {
      if (key === "topics") return affinity.sharedTopics.join(", ");
      if (key === "keywords") return affinity.keywordHits.length ? affinity.keywordHits.join(", ") : "Ninguna en el nombre del evento";
      if (key === "access") {
        if (event.online) return "En línea";
        return affinity.parts.access ? "En Colombia" : "Presencial fuera de Colombia";
      }
      if (event.kind !== "cfp") return "Evento para asistir";
      const days = F.daysLeft(event, today);
      if (days === null) return "Sin fecha de cierre publicada";
      return days === 0 ? "Cierra hoy" : `Cierra en ${plural(days, "día", "días")}`;
    }

    function affinityBreakdown(event, affinity) {
      const bars = el("div", { className: "bars" });
      for (const [key, value] of Object.entries(affinity.parts)) {
        const max = F.AFFINITY_MAX[key];
        bars.append(
          el("span", { text: AFFINITY_LABELS[key] }),
          el("i", { attrs: { role: "img", "aria-label": `${value} de ${max}` } }, [el("span", { attrs: { style: `width:${Math.round((value / max) * 100)}%` } })]),
          el("em", { text: `${value}/${max}` }),
          el("small", { text: affinityDetail(key, event, affinity) }),
        );
      }
      return el("details", { className: "why" }, [el("summary", { text: `¿Por qué ${affinity.total} %?` }), bars]);
    }

    /* The published place, or null when it is missing, a placeholder or only says the event is online. */
    function physicalLocation(event) {
      const location = typeof event.location === "string" ? event.location.trim() : "";
      if (!location || /^(?:n\/?a|tbd|tba|por confirmar|(?:fully?\s+|100%\s+)?(?:online|virtual|hybrid)(?:\s+(?:conference|event|only|meeting))?)$/i.test(location)) return null;
      return location;
    }

    /* Comparison selection is keyed by type and id, like the saved opportunities. */
    const comparisonKey = (event) => JSON.stringify(["event", event.id]);

    function modality(event) {
      if (physicalLocation(event)) return "Confirmar en la fuente";
      return event.online ? "En línea" : null;
    }

    function locationPanel(event) {
      const location = physicalLocation(event);
      if (!location) return null;
      const url = new URL("https://www.google.com/maps/search/");
      url.searchParams.set("api", "1");
      url.searchParams.set("query", location);
      return el("div", { className: "event-location" }, [
        el("div", {}, [
          el("strong", { text: "Ubicación publicada" }),
          el("p", { text: "El mapa se basa en el lugar publicado; confirme la sede en la fuente oficial." }),
          link(url.href, "Ver mapa ampliado", "btn map-link", `Ver mapa de ${location} en Google Maps (se abre en una pestaña nueva)`),
        ]),
      ]);
    }

    function card(event) {
      const affinity = affinityByEvent.get(event);
      const isCfp = event.kind === "cfp";
      const badges = el("div", { className: "event-badges" }, [
        el("span", { className: `tag tag-${isCfp ? "cfp" : "attend"}`, text: KIND_LABELS[event.kind] || event.kind }),
        event.online ? el("span", { className: "tag tag-online", text: "En línea" }) : null,
        daysBadge(event),
      ]);
      const location = event.location || (event.online ? "En línea" : null);
      const facts = el("dl", { className: "event-facts" }, [
        fact("Fechas", F.formatRange(event.start, event.end) || "Por confirmar"),
        fact("Lugar", location),
        event.deadline ? fact(isCfp ? "Cierre de envíos" : "Cierre de inscripción", F.formatDate(event.deadline)) : null,
      ]);
      const topics = el("div", { className: "event-topics", attrs: { "aria-label": "Temas" } },
        (event.topics || []).map((t) => el("span", { className: "topic", text: t })));
      const main = el("div", {}, [
        badges,
        el("h2", { text: event.title }),
        event.name && event.name !== event.title ? el("p", { className: "full-name", text: event.name }) : null,
        facts,
        topics,
        affinity ? affinityBreakdown(event, affinity) : null,
      ]);
      const label = isCfp ? "Ver convocatoria" : "Ver evento";
      const key = comparisonKey(event);
      const isSelected = selected.includes(key);
      const compare = el("button", { className: "btn compare-button", text: isSelected ? "Quitar de comparación" : "Comparar", attrs: { type: "button", "aria-pressed": String(isSelected), "aria-label": `Comparar ${event.title}` } });
      compare.disabled = !isSelected && selected.length >= F.MAX_COMPARISON;
      compare.dataset.comparisonKey = key;
      compare.addEventListener("click", () => {
        selected = F.toggleComparison(selected, key);
        update();
        const replacement = $$(".compare-button").find((button) => button.dataset.comparisonKey === key);
        if (replacement) replacement.focus();
      });
      const favorite = el("button", { className: "btn favorite-button", text: "Guardar", attrs: { type: "button", "aria-label": `Guardar ${event.title} en mis oportunidades` } });
      import("./opportunities.js").then((store) => {
        const refresh = () => { favorite.textContent = store.readOpportunities(localStorage).some((item) => item.type === "event" && item.id === event.id) ? "Guardado" : "Guardar"; };
        try { refresh(); } catch (_) { favorite.textContent = "Favoritos no disponibles"; favorite.disabled = true; }
        favorite.addEventListener("click", () => {
          try {
            const exists = store.readOpportunities(localStorage).some((item) => item.type === "event" && item.id === event.id);
            if (exists) store.removeOpportunity(localStorage, "event", event.id);
            else store.addOpportunity(localStorage, { type: "event", id: event.id, title: event.title, url: event.url, start: event.start, end: event.end, deadline: event.deadline });
            refresh();
          } catch (_) { favorite.textContent = "No se pudo guardar"; }
        });
        favorite.dataset.favoriteReady = "true";
      }).catch(() => { favorite.textContent = "Favoritos no disponibles"; favorite.disabled = true; favorite.dataset.favoriteReady = "false"; });
      const side = el("div", { className: "event-side" }, [
        compare, favorite,
        el("span", { className: "source", text: `Fuente: ${SOURCE_LABELS[event.source] || event.source}` }),
        link(event.url, label, "btn primary", `${label}: ${event.title} (se abre en una pestaña nueva)`),
      ]);
      const map = locationPanel(event);
      if (!affinity) return el("article", { className: "event" }, [main, side, map]);
      return el("article", { className: "event with-affinity" }, [affinityRing(affinity), main, side, map]);
    }

    function renderComparison() {
      const byKey = new Map(events.map((event) => [comparisonKey(event), event]));
      const chosen = selected.map((key) => byKey.get(key)).filter(Boolean);
      $("#comparison").hidden = chosen.length === 0;
      const header = el("tr", {}, [el("th", { text: "Dato", attrs: { scope: "col" } }), ...chosen.map((event) => el("th", { text: event.title, attrs: { scope: "col" } }))]);
      $("#comparison-head").replaceChildren(header);
      const fields = [
        ["Tipo", (e) => KIND_LABELS[e.kind]],
        ["Fechas", (e) => F.formatRange(e.start, e.end)],
        ["Cierre", (e) => e.deadline ? F.formatDate(e.deadline) : null],
        ["Lugar", (e) => e.location || (e.online ? "En línea" : null)],
        ["Modalidad", modality],
        ["Temas", (e) => (e.topics || []).join(", ")],
        ["Fuente", (e) => SOURCE_LABELS[e.source] || e.source],
      ];
      $("#comparison-body").replaceChildren(...fields.map(([label, value]) => el("tr", {}, [
        el("th", { text: label, attrs: { scope: "row" } }), ...chosen.map((event) => el("td", { text: value(event) || "No informado" })),
      ])));
    }

    /* ---------- Render ---------- */

    const isFiltered = () => F.stateToQuery({ ...state, project: null, sort: F.DEFAULT_STATE.sort }) !== "";
    const baseEvents = () => (project ? ranked.map((r) => r.event) : events);

    function update() {
      const query = F.stateToQuery(state);
      window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
      syncControls();
      renderTopics();
      // Ranked events are already in affinity order; filterEvents keeps the order it receives.
      const filtered = F.filterEvents(baseEvents(), { ...state, today });
      const shown = state.sort === "affinity" ? filtered : F.sortEvents(filtered, state.sort);
      $("#results").replaceChildren(...shown.map(card));
      renderComparison();
      $("#count").textContent = shown.length
        ? `${plural(shown.length, "evento vigente", "eventos vigentes")}${project ? " afines al proyecto" : ""}`
        : "Sin resultados";
      const noProjectEvents = Boolean(project) && ranked.length === 0;
      $("#project-empty").hidden = !noProjectEvents;
      $("#empty").hidden = shown.length > 0 || noProjectEvents;
      $("#clear-top").hidden = !isFiltered() || shown.length === 0;
    }

    function clearFilters() {
      Object.assign(state, { ...F.DEFAULT_STATE, topics: [], sort: state.sort });
      update();
      $("#search").focus();
    }

    for (const button of $$("#kind-group button")) {
      button.addEventListener("click", () => { state.kind = button.dataset.value; update(); });
    }
    $("#comparison-clear").addEventListener("click", () => { selected = []; update(); });
    $("#date-from").addEventListener("change", (e) => { state.dateFrom = e.target.value; update(); });
    $("#date-to").addEventListener("change", (e) => { state.dateTo = e.target.value; update(); });
    $("#location").addEventListener("input", (e) => { state.location = e.target.value; update(); });
    $("#modality").addEventListener("change", (e) => { state.modality = e.target.value; update(); });
    $("#colombia").addEventListener("change", (e) => { state.colombia = e.target.checked; update(); });
    $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; update(); });
    $("#search").addEventListener("input", (e) => { state.query = e.target.value; update(); });
    $("#clear-top").addEventListener("click", clearFilters);
    $("#clear-empty").addEventListener("click", clearFilters);
    $("#all-events").addEventListener("click", showAllEvents);
    $("#all-events-empty").addEventListener("click", showAllEvents);

    /* ---------- Footer ---------- */

    $("#data-status-date").textContent = DATA.generated
      ? `Listado generado el ${F.formatDate(DATA.generated)}.`
      : "Fecha de generación no disponible.";
    const sources = Object.entries(DATA.sources || {})
      .map(([key, n]) => `${SOURCE_LABELS[key] || key}: ${n}`).join(" · ");
    $("#data-info").textContent = `Datos actualizados el ${DATA.generated ? F.formatDate(DATA.generated) : "—"}`
      + (sources ? ` · Eventos por fuente: ${sources}` : "") + ".";
    if (DATA.sample) {
      $("#project-card").before(el("p", { className: "notice", attrs: { role: "note" },
        text: "Se muestran datos de ejemplo: todavía no se han descargado los eventos reales." }));
    }

    const requested = state.project;
    setProject(requested);
    if (requested && !project) {
      $("#project-card").before(el("p", { className: "notice", attrs: { role: "status" }, text: "No se encontró el proyecto" }));
    }
    update();
  }

  if (window.EVENTOS) {
    start(window.EVENTOS);
  } else {
    // data.js is missing (pipeline not run yet): fall back to the bundled sample events.
    const script = document.createElement("script");
    script.src = "sample-data.js";
    script.onload = () => (window.EVENTOS ? start(window.EVENTOS) : null);
    script.onerror = () => { document.getElementById("count").textContent = "No se pudieron cargar los eventos."; };
    document.head.appendChild(script);
  }
})();
