/* "Buscador de eventos académicos" — calls for papers and events to attend, with filters kept in the URL.
   Data: window.EVENTOS (data.js, written by the pipeline; sample-data.js is loaded instead when data.js is missing).
   Logic: window.EVFilters (filters.js). */
(function () {
  "use strict";

  const F = window.EVFilters;
  const SOURCE_LABELS = { wikicfp: "WikiCFP", ccfddl: "CCF Deadlines", devpost: "Devpost", manual: "UNIMAYOR" };
  const KIND_LABELS = { cfp: "Convocatoria", attend: "Para asistir" };
  const SOON_DAYS = 14;

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

    /* ---------- Controls ---------- */

    function syncControls() {
      for (const button of $$("#kind-group button")) button.setAttribute("aria-pressed", String(button.dataset.value === state.kind));
      $("#modality").value = state.modality;
      $("#colombia").checked = state.colombia;
      $("#sort").value = state.sort;
      if ($("#search").value !== state.query) $("#search").value = state.query;
    }

    function renderTopics() {
      // Counts follow every other filter, so each pill tells how many results selecting it would add.
      const counts = F.topicCounts(F.filterEvents(events, { ...state, topics: [], today }));
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

    function card(event) {
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
      ]);
      const label = isCfp ? "Ver convocatoria" : "Ver evento";
      const side = el("div", { className: "event-side" }, [
        el("span", { className: "source", text: `Fuente: ${SOURCE_LABELS[event.source] || event.source}` }),
        link(event.url, label, "btn primary", `${label}: ${event.title} (se abre en una pestaña nueva)`),
      ]);
      return el("article", { className: "event" }, [main, side]);
    }

    /* ---------- Render ---------- */

    const isFiltered = () => F.stateToQuery({ ...state, sort: F.DEFAULT_STATE.sort }) !== "";

    function update() {
      const query = F.stateToQuery(state);
      window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
      syncControls();
      renderTopics();
      const shown = F.sortEvents(F.filterEvents(events, { ...state, today }), state.sort);
      $("#results").replaceChildren(...shown.map(card));
      $("#count").textContent = shown.length
        ? `${plural(shown.length, "evento vigente", "eventos vigentes")}`
        : "Sin resultados";
      $("#empty").hidden = shown.length > 0;
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
    $("#modality").addEventListener("change", (e) => { state.modality = e.target.value; update(); });
    $("#colombia").addEventListener("change", (e) => { state.colombia = e.target.checked; update(); });
    $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; update(); });
    $("#search").addEventListener("input", (e) => { state.query = e.target.value; update(); });
    $("#clear-top").addEventListener("click", clearFilters);
    $("#clear-empty").addEventListener("click", clearFilters);

    /* ---------- Footer ---------- */

    const sources = Object.entries(DATA.sources || {})
      .map(([key, n]) => `${SOURCE_LABELS[key] || key}: ${n}`).join(" · ");
    $("#data-info").textContent = `Datos actualizados el ${DATA.generated ? F.formatDate(DATA.generated) : "—"}`
      + (sources ? ` · Eventos por fuente: ${sources}` : "") + ".";
    if (DATA.sample) {
      $(".filters-box").before(el("p", { className: "notice", attrs: { role: "note" },
        text: "Se muestran datos de ejemplo: todavía no se han descargado los eventos reales." }));
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
