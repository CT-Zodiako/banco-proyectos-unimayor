// Journal finder (apps/donde-publicar), served by this app under /donde-publicar/.
// The explicit index.html works with both the Vite dev server and the Nginx image (no SPA rewrite needed).
export const wherePublishUrl = (projectId) =>
    `/donde-publicar/index.html?p=${encodeURIComponent(projectId)}`;

// Event finder (apps/eventos), served by this app under /eventos/.
export const EVENTS_URL = '/eventos/index.html';

// Event finder with the events ranked by affinity with one project.
export const eventsForProjectUrl = (projectId) =>
    `${EVENTS_URL}?p=${encodeURIComponent(projectId)}`;

// The catalog keeps its filters in the URL query. The last one is saved here so "Volver a la lista" restores it,
// even after visiting the journal or event finder.
export const CATALOG_SEARCH_KEY = 'banco.catalogSearch';

/** "/proyectos" plus a saved query string; anything that is not a plain "?..." query is ignored. */
export const catalogUrl = (search) => {
    if (typeof search !== 'string' || !search.startsWith('?')) return '/proyectos';
    const query = search.split('#')[0];
    return query.length > 1 ? `/proyectos${query}` : '/proyectos';
};

export const saveCatalogSearch = (search) => {
    try { window.sessionStorage.setItem(CATALOG_SEARCH_KEY, search); } catch { /* storage unavailable */ }
};

export const savedCatalogUrl = () => {
    try { return catalogUrl(window.sessionStorage.getItem(CATALOG_SEARCH_KEY)); } catch { return '/proyectos'; }
};
