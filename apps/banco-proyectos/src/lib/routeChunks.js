import { lazyRoute } from './lazyRoute';
import { loadProjects, loadProjectsIndex } from './projects-loader';
import { EVENTS_URL, PUBLISH_URL } from './links';

// One lazy component per page (Home stays in the entry chunk). The catalog downloads the light projects index and the
// project page the full data, in parallel with their own code, so the page skeleton is the only thing seen before the
// page is complete.
const withData = (page, data) => Promise.all([page(), data()]).then(([module]) => module);

export const ROUTE_PAGES = {
    // The results of /proyectos (filters, cards, pages); the shell of that page is in the entry bundle.
    Catalogo: lazyRoute(() => import('../pages/ProjectsCatalog')),
    Proyecto: lazyRoute(() => withData(() => import('../pages/ProjectDetail'), loadProjects)),
    Acerca: lazyRoute(() => import('../pages/About')),
    Contacto: lazyRoute(() => import('../pages/Contact')),
    Oportunidades: lazyRoute(() => import('../pages/Opportunities')),
    Eventos: lazyRoute(() => import('../pages/Eventos')),
    DondePublicar: lazyRoute(() => import('../pages/DondePublicar')),
};

const BY_PATH = {
    '/acerca': ROUTE_PAGES.Acerca,
    '/contacto': ROUTE_PAGES.Contacto,
    '/oportunidades': ROUTE_PAGES.Oportunidades,
    [EVENTS_URL]: ROUTE_PAGES.Eventos,
    [PUBLISH_URL]: ROUTE_PAGES.DondePublicar,
};

/** Starts downloading the project page and the full data (hover or focus on a project link of the catalog). */
export const prefetchProject = () => ROUTE_PAGES.Proyecto.prefetch();

/** Starts downloading the chunk of the page behind a path (hover or focus of its link). Unknown paths do nothing. */
export const prefetchRoute = (path) => {
    BY_PATH[path]?.prefetch();
    // /proyectos: its results chunk and the light index (its shell is part of the entry)
    if (path === '/proyectos') {
        ROUTE_PAGES.Catalogo.prefetch();
        loadProjectsIndex().catch(() => {});
    }
};
