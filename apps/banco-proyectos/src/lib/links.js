// Journal finder: a route of this app (src/pages/DondePublicar.jsx).
export const PUBLISH_URL = '/donde-publicar';

// URL of the old static page. Links and bookmarks to it keep working: the router redirects it to PUBLISH_URL
// with the same query (and hash), so ?p=<project id> still preselects the project.
export const LEGACY_PUBLISH_PATH = '/donde-publicar/index.html';

// Journal finder with the journals suggested for one project.
export const wherePublishUrl = (projectId) =>
    `${PUBLISH_URL}?p=${encodeURIComponent(projectId)}`;

// Event finder: a route of this app (src/pages/Eventos.jsx).
export const EVENTS_URL = '/eventos';

// URL of the old static page. Links and bookmarks to it keep working: the router redirects it to EVENTS_URL
// with the same query, so ?p=<project id> still preselects the project.
export const LEGACY_EVENTS_PATH = '/eventos/index.html';

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
