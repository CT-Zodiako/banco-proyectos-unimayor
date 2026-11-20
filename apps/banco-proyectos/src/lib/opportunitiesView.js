/* View logic of /oportunidades (T19): filter, facet counts, sorts, board columns, the URL state and the text helpers of
   the cards. Pure functions over the saved items; nothing here reads or writes the storage, so the stored shape and the
   backup format stay exactly what src/lib/opportunities.js defines. */
import { STATUS_LABELS } from './opportunities.js';
import { normalizeText } from './catalog.js';

export const NOTE_PREVIEW_LENGTH = 60;

/* One tone of src/lib/palette.js per status (AA pairs are checked in tests/palette.test.mjs): slate, amber, blue, rose.
   Color never stands alone: the status label always sits next to it. */
export const STATUS_TONES = { review: 'review', preparing: 'fair', submitted: 'lang', discarded: 'low' };
export const STATUS_KEYS = Object.keys(STATUS_LABELS);

export const TYPE_LABELS = { event: 'Eventos', journal: 'Revistas' };
export const SORT_LABELS = { recent: 'Más recientes', name: 'Nombre A-Z', status: 'Estado', deadline: 'Fecha límite más próxima' };
export const VIEW_LABELS = { list: 'Lista', board: 'Tablero' };

export const DEFAULT_VIEW = { type: 'all', status: 'all', query: '', sort: 'recent', view: 'list' };

// URL words (Spanish, like the other pages) <-> internal values.
const TYPE_PARAM = { eventos: 'event', revistas: 'journal' };
const SORT_PARAM = { nombre: 'name', estado: 'status', fecha: 'deadline' };
const VIEW_PARAM = { tablero: 'board' };
const invert = (map) => Object.fromEntries(Object.entries(map).map(([key, value]) => [value, key]));

const pick = (map, key) => (Object.hasOwn(map, key) ? map[key] : undefined);

export const itemKey = (item) => `${item.type}:${item.id}`;

/** The status shown for an item: a missing or unknown one counts as «Por revisar», as the editor already did. */
export const itemStatus = (item) => (Object.hasOwn(STATUS_LABELS, item.status) ? item.status : 'review');

function safeHref(value) {
    try {
        const url = new URL(value);
        return ['http:', 'https:'].includes(url.protocol) ? url : null;
    } catch { return null; }
}

/** «scielo.br» for «https://www.scielo.br/x»; empty when the link is missing or not http(s). */
export function siteName(url) {
    const parsed = safeHref(url);
    return parsed ? parsed.hostname.replace(/^www\./, '') : '';
}

/** The note on one line, cut at 60 characters with an ellipsis; empty when there is no note. */
export function noteExcerpt(note) {
    const text = String(note ?? '').replace(/\s+/g, ' ').trim();
    return text.length > NOTE_PREVIEW_LENGTH ? `${text.slice(0, NOTE_PREVIEW_LENGTH)}…` : text;
}

const haystack = (item) => normalizeText([item.title, siteName(item.url), item.note].join(' '));

/** Items matching the filters; each one is optional: { type: 'all'|'event'|'journal', status: 'all'|<status>, query }. */
export function filterView(items, { type = 'all', status = 'all', query = '' } = {}) {
    const words = normalizeText(query).split(/\s+/).filter(Boolean);
    return items.filter((item) => (type === 'all' || item.type === type)
        && (status === 'all' || itemStatus(item) === status)
        && (!words.length || words.every((word) => haystack(item).includes(word))));
}

/** The filters of a view state (the part that decides WHICH items show). */
export const viewFilters = ({ type, status, query }) => ({ type, status, query });

/** Items per status for the summary cards: the type and the query apply, the status itself does not. */
export function statusCounts(items, { type = 'all', query = '' } = {}) {
    const visible = filterView(items, { type, query });
    const counts = { all: visible.length, ...Object.fromEntries(STATUS_KEYS.map((key) => [key, 0])) };
    for (const item of visible) counts[itemStatus(item)] += 1;
    return counts;
}

/** Items per type for the segmented control: the status and the query apply, the type itself does not. */
export function typeCounts(items, { status = 'all', query = '' } = {}) {
    const visible = filterView(items, { status, query });
    return { all: visible.length, event: visible.filter((item) => item.type === 'event').length, journal: visible.filter((item) => item.type === 'journal').length };
}

/** True when a saved event has a closing date (so «Fecha límite más próxima» means something). */
export const hasDeadlines = (items) => items.some((item) => item.type === 'event' && typeof item.deadline === 'string' && item.deadline !== '');

const compareTitles = (a, b) => a.title.localeCompare(b.title, 'es', { sensitivity: 'base' });

/** A sorted copy. Items are stored in the order they were saved, so «recent» is the reverse of that order and every
    other sort falls back to it for ties. Unknown sorts behave as «recent». */
export function sortItems(items, sort) {
    const recent = items.map((item, index) => ({ item, index })).sort((a, b) => b.index - a.index);
    const entries = recent.map((entry, position) => ({ ...entry, position }));
    const byPosition = (a, b) => a.position - b.position;
    const dated = ({ item }) => item.type === 'event' && typeof item.deadline === 'string' && item.deadline !== '';
    const compare = {
        name: (a, b) => compareTitles(a.item, b.item) || byPosition(a, b),
        status: (a, b) => STATUS_KEYS.indexOf(itemStatus(a.item)) - STATUS_KEYS.indexOf(itemStatus(b.item)) || byPosition(a, b),
        deadline: (a, b) => (dated(a) && dated(b) ? (a.item.deadline < b.item.deadline ? -1 : a.item.deadline > b.item.deadline ? 1 : 0)
            : dated(a) ? -1 : dated(b) ? 1 : 0) || byPosition(a, b),
    }[sort];
    return (compare ? [...entries].sort(compare) : entries).map(({ item }) => item);
}

/** The board: one column per status, always the four of them in their natural order. */
export function groupByStatus(items) {
    return STATUS_KEYS.map((status) => ({ status, label: STATUS_LABELS[status], items: items.filter((item) => itemStatus(item) === status) }));
}

/** The list sections: Eventos and Revistas (the caller decides what to do with an empty one). */
export function groupByType(items) {
    return Object.entries(TYPE_LABELS).map(([type, label]) => ({ type, label, items: items.filter((item) => item.type === type) }));
}

/** The view state held by the URL (?tipo, estado, q, orden, vista); an invalid or missing value is the default. */
export function parseViewQuery(search) {
    const params = new URLSearchParams(search);
    const status = params.get('estado');
    return {
        type: pick(TYPE_PARAM, params.get('tipo')) ?? DEFAULT_VIEW.type,
        status: Object.hasOwn(STATUS_LABELS, status) ? status : DEFAULT_VIEW.status,
        query: params.get('q') ?? DEFAULT_VIEW.query,
        sort: pick(SORT_PARAM, params.get('orden')) ?? DEFAULT_VIEW.sort,
        view: pick(VIEW_PARAM, params.get('vista')) ?? DEFAULT_VIEW.view,
    };
}

/** «?tipo=…» for a view state, without the default values; `current` is the present query string, whose other
    parameters are kept (the state only adds or removes its own five). Empty string when nothing is left. */
export function viewToSearch(state, current = '') {
    const params = new URLSearchParams(current);
    for (const key of ['tipo', 'estado', 'q', 'orden', 'vista']) params.delete(key);
    const set = (key, value) => { if (value) params.set(key, value); };
    set('tipo', invert(TYPE_PARAM)[state.type]);
    if (Object.hasOwn(STATUS_LABELS, state.status)) params.set('estado', state.status);
    if (typeof state.query === 'string' && state.query.trim()) params.set('q', state.query);
    set('orden', invert(SORT_PARAM)[state.sort]);
    set('vista', invert(VIEW_PARAM)[state.view]);
    const text = params.toString();
    return text ? `?${text}` : '';
}
