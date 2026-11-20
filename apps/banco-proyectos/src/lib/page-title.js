// The browser tab title of every page (T18). index.html carries DEFAULT_TITLE for crawlers and the first paint; each page
// then sets «<page> · Banco de Proyectos UNIMAYOR» with useDocumentTitle and gives DEFAULT_TITLE back when it unmounts.
import { splitProjectTitle } from './catalog.js';

export const SITE_NAME = 'Banco de Proyectos UNIMAYOR';
export const DEFAULT_TITLE = SITE_NAME;

/** "Contacto" → "Contacto · Banco de Proyectos UNIMAYOR"; an empty part is the site title alone. */
export const pageTitle = (part) => {
    const text = String(part ?? '').replace(/\s+/g, ' ').trim();
    return text ? `${text} · ${SITE_NAME}` : DEFAULT_TITLE;
};

/** «🌾 Proyecto 1: Monitoreo…» → «Proyecto 1: Monitoreo…» (no emoji; without a number, only the title). */
export const projectTitle = (titulo) => {
    const { number, title } = splitProjectTitle(titulo);
    return number === null ? title : `Proyecto ${number}: ${title}`;
};
