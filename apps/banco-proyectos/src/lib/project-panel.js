/* Pure logic of the slide-over panel of the project page (journals and events of one project, src/components/proyecto-panel).
   The open tab lives in the URL as ?panel=revistas|eventos so the state can be shared and the back button closes it. */
import { eventsForProjectUrl, wherePublishUrl } from './links.js';

export const PANEL_PARAM = 'panel';
export const PANEL_TABS = ['revistas', 'eventos'];

/** At most this wide (px) the panel is a modal / full screen instead of pushing the page. Same breakpoint as the
    journal filters panel. */
export const PANEL_NARROW_MAX = 1100;
export const PANEL_NARROW_QUERY = `(max-width: ${PANEL_NARROW_MAX}px)`;

/** Router state of the history entry that opening the panel pushes. Closing it goes back when it is present. */
export const PANEL_PUSHED_STATE = { panelPushed: true };

const isTab = (value) => PANEL_TABS.includes(value);

/** The tab requested by ?panel=, or null (closed) when it is missing or not one of PANEL_TABS. */
export function parsePanel(search) {
    if (typeof search !== 'string') return null;
    const value = new URLSearchParams(search).get(PANEL_PARAM);
    return isTab(value) ? value : null;
}

/** The query string ("?a=1&panel=eventos", or "" when empty) with the panel param set to tab, or removed when
    tab is null or invalid. Every other param is kept. */
export function withPanel(search, tab) {
    const params = new URLSearchParams(typeof search === 'string' ? search : '');
    if (isTab(tab)) params.set(PANEL_PARAM, tab);
    else params.delete(PANEL_PARAM);
    const query = params.toString();
    return query ? `?${query}` : '';
}

/** Tab reached with an arrow key (wrapping), Home or End; null for any other key. */
export function nextTab(current, key) {
    const index = PANEL_TABS.indexOf(current);
    if (key === 'Home') return PANEL_TABS[0];
    if (key === 'End') return PANEL_TABS[PANEL_TABS.length - 1];
    if (key === 'ArrowRight') return PANEL_TABS[(index + 1) % PANEL_TABS.length];
    if (key === 'ArrowLeft') return PANEL_TABS[(index - 1 + PANEL_TABS.length) % PANEL_TABS.length];
    return null;
}

/** "closed", "push" (wide screen: the page keeps working beside the panel) or "modal" (expanded, or a narrow screen). */
export function panelMode({ open, expanded, narrow }) {
    if (!open) return 'closed';
    return expanded || narrow ? 'modal' : 'push';
}

/** The existing full page of one tab, for the project: /donde-publicar?p=<id> or /eventos?p=<id>. */
export const panelFullUrl = (tab, projectId) => (tab === 'eventos' ? eventsForProjectUrl(projectId) : wherePublishUrl(projectId));

/** Focus trap of the modal: index to focus when Tab / Shift+Tab would leave the first / last focusable element
    (or the focus is outside the list, index -1); null when the browser can move the focus by itself. */
export function nextTrapIndex(count, index, shift) {
    if (count <= 0) return null;
    if (shift) return index <= 0 ? count - 1 : null;
    return index === -1 || index >= count - 1 ? 0 : null;
}

/** "back" when the panel entry was pushed by the page (so back leaves the history as it was), else "replace"
    (the panel was opened by a link or a reload: the param is removed in place). */
export const closePlan = (state) => (state && typeof state === 'object' && state.panelPushed === true ? 'back' : 'replace');

/** How many items are shown after "Cargar más": one more page, never more than the total. */
export const nextShown = (shown, total, step) => Math.min(total, shown + step);
