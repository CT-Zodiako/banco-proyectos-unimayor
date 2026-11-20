// Pure logic of the global search in the navbar: one index per kind of result (projects, events, journals), matching,
// ranking, grouping, highlighting and where each result leads. The matched fields are the ones the list pages search
// (filterProjects, filterEvents, the journal catalog), so "Ver todos los resultados" shows the same count.
import { normalizeText, splitProjectTitle } from './catalog.js';
import { formatRange, isExpired } from './eventos/filters.js';
import { locationText } from './eventos/display.js';
import { countryLabel } from './publicar/display.js';
import { EVENTS_URL, PUBLISH_URL } from './links.js';

export const MAX_PER_GROUP = 5;
export const EXAMPLE_SEARCHES = ['sensores', 'ciberseguridad', 'Colombia'];

/** The groups, in the order they are listed. */
export const GROUPS = [
    { type: 'project', label: 'Proyectos', badge: 'Proyecto' },
    { type: 'event', label: 'Eventos', badge: 'Evento' },
    { type: 'journal', label: 'Revistas', badge: 'Revista' },
];

/** "⌘ K" on Apple platforms, "Ctrl K" anywhere else. */
export const shortcutHint = (platform) => (/mac|iphone|ipad|ipod/i.test(platform || '') ? '⌘ K' : 'Ctrl K');

const makeEntry = (type, id, title, meta, fields) => ({
    type,
    id,
    key: `${type}:${id}`,
    title,
    meta,
    normTitle: normalizeText(title),
    normAll: normalizeText([title, ...fields].join(' ')),
});

// The indexes are built once per data set (the lists have thousands of rows) and reused every time the dialog opens.
const cached = (store, source, extra, build) => {
    const hit = store.get(source);
    if (hit && hit.extra === extra) return hit.index;
    const index = build();
    store.set(source, { extra, index });
    return index;
};
const projectIndexes = new WeakMap();
const eventIndexes = new WeakMap();
const journalIndexes = new WeakMap();

/** Search entries of the bundled projects: the title without emoji and number, then area and level. */
export function indexProjects(projects) {
    return cached(projectIndexes, projects, null, () => projects.map((project) => makeEntry(
        'project',
        project.id,
        splitProjectTitle(project.titulo).title,
        [project.area, project.nivel].filter(Boolean).join(' · '),
        [project.titulo, project.descripcion, project.sector, project.area],
    )));
}

/** Search entries of the events that are still open on `today` ("YYYY-MM-DD"): the list page hides the rest. */
export function indexEvents(events, today) {
    return cached(eventIndexes, events, today, () => events
        .filter((event) => !isExpired(event, today))
        .map((event) => makeEntry(
            'event',
            event.id,
            event.title || event.name || '',
            [formatRange(event.start, event.end), locationText(event)].filter(Boolean).join(' · '),
            [event.name, event.location],
        )));
}

/** Search entries of the journal catalog: the country in Spanish and the quartile as the meta line. */
export function indexJournals(journals) {
    return cached(journalIndexes, journals, null, () => journals.map((journal) => makeEntry(
        'journal',
        journal.id,
        journal.title || '',
        [countryLabel(journal.country), journal.quartile && `Cuartil ${journal.quartile}`].filter(Boolean).join(' · '),
        [journal.publisher, journal.country, ...(journal.categories || []).map((category) => category.name)],
    )));
}

const queryWords = (query) => normalizeText(query).split(/\s+/).filter(Boolean);

// 0: the title starts with the whole query; 1: every word is in the title; 2: every word is somewhere in the entry.
function rank(entry, phrase, words) {
    if (entry.normTitle.startsWith(phrase)) return 0;
    if (words.every((word) => entry.normTitle.includes(word))) return 1;
    if (words.every((word) => entry.normAll.includes(word))) return 2;
    return -1;
}

/** Groups with results for `query`: [{ type, label, badge, total, items }], items at most `limit` per group, best
    rank first and in data order inside a rank. `indexes` is { project, event, journal } (any may be missing). */
export function searchAll(indexes, query, limit = MAX_PER_GROUP) {
    const words = queryWords(query);
    if (!words.length) return [];
    const phrase = words.join(' ');
    return GROUPS.flatMap(({ type, label, badge }) => {
        const buckets = [[], [], []];
        for (const entry of indexes[type] || []) {
            const tier = rank(entry, phrase, words);
            if (tier >= 0) buckets[tier].push(entry);
        }
        const matches = buckets.flat();
        return matches.length ? [{ type, label, badge, total: matches.length, items: matches.slice(0, limit) }] : [];
    });
}

export const resultCount = (groups) => groups.reduce((sum, group) => sum + group.total, 0);

const textParam = (query) => new URLSearchParams({ q: query }).toString();

/** The list page of a group with `query` applied. The catalog of Dónde publicar also gets the query in the router
    state, because the page may already be open and then reads it from there. */
export function viewAllTarget(type, query) {
    const q = String(query).trim();
    if (type === 'project') return { to: `/proyectos?${textParam(q)}` };
    if (type === 'event') return { to: `${EVENTS_URL}?${textParam(q)}` };
    return { to: `${PUBLISH_URL}?seccion=catalogo&${textParam(q)}`, state: { catalogSearch: { q } } };
}

/** Where a result leads: a project to its page; events and journals have no page of their own, so they open their
    list filtered by their name. */
export function resultTarget(entry) {
    if (entry.type === 'project') return { to: `/proyecto/${encodeURIComponent(entry.id)}` };
    return viewAllTarget(entry.type, entry.title);
}

const MARKS = /[\u0300-\u036f]/g;
const fold = (char) => char.toLowerCase().normalize('NFD').replace(MARKS, '');

/** `text` cut into [{ text, match }] so that every word of `query` (ignoring case and accents) is a match. The text
    keeps its own letters; a combining accent stays with the letter it belongs to. */
export function highlightParts(text, query) {
    const source = String(text ?? '');
    if (!source) return [];
    const words = queryWords(query);
    if (!words.length) return [{ text: source, match: false }];

    let folded = '';
    const origin = []; // position in `folded` -> position in `source`
    for (let i = 0; i < source.length;) {
        const char = String.fromCodePoint(source.codePointAt(i));
        const letters = fold(char);
        for (let k = 0; k < letters.length; k++) origin.push(i);
        folded += letters;
        i += char.length;
    }

    const ranges = [];
    for (const word of words) {
        for (let at = folded.indexOf(word); at !== -1; at = folded.indexOf(word, at + word.length)) {
            const last = origin[at + word.length - 1];
            let end = last + String.fromCodePoint(source.codePointAt(last)).length;
            while (end < source.length && fold(String.fromCodePoint(source.codePointAt(end))) === '') end += String.fromCodePoint(source.codePointAt(end)).length;
            ranges.push([origin[at], end]);
        }
    }
    ranges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const merged = [];
    for (const range of ranges) {
        const previous = merged.at(-1);
        if (previous && range[0] <= previous[1]) previous[1] = Math.max(previous[1], range[1]);
        else merged.push([...range]);
    }

    const parts = [];
    let from = 0;
    for (const [start, end] of merged) {
        if (start > from) parts.push({ text: source.slice(from, start), match: false });
        parts.push({ text: source.slice(start, end), match: true });
        from = end;
    }
    if (from < source.length) parts.push({ text: source.slice(from), match: false });
    return parts;
}
