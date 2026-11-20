/* Text and link helpers for the event cards, the comparison table and the data status.
   Ported from pipelines/eventos/site/app.js so the React components stay presentational. */
import { daysLeft, formatDate, formatRange } from './filters.js';
import { AFFINITY_MAX } from './affinity.js';

export const SOURCE_LABELS = { wikicfp: 'WikiCFP', ccfddl: 'CCF Deadlines', devpost: 'Devpost', manual: 'UNIMAYOR' };
export const KIND_LABELS = { cfp: 'Convocatoria', attend: 'Para asistir' };
export const KIND_FILTER_LABELS = { all: 'Todos', cfp: 'Convocatorias (presentar)', attend: 'Para asistir' };
export const KIND_FILTER_DESCRIPTIONS = {
    all: 'Congresos y eventos juntos',
    cfp: 'Congresos con fecha límite para enviar tu trabajo',
    attend: 'Talleres, charlas, ferias y hackatones',
};
const MODALITY_LABELS = { online: 'En línea', presencial: 'Presencial' };
export const SOON_DAYS = 14;
export const AFFINITY_LABELS = { topics: 'Temas en común', keywords: 'Palabras clave', access: 'Acceso (Colombia o en línea)', time: 'Tiempo para preparar' };

export const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

/** The URL when it is http(s), else null: external data never becomes a javascript: or data: link. */
export function safeUrl(url) {
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? parsed.href : null;
    } catch {
        return null;
    }
}

const PLACEHOLDER_LOCATION = /^(?:n\/?a|tbd|tba|por confirmar|(?:fully?\s+|100%\s+)?(?:online|virtual|hybrid)(?:\s+(?:conference|event|only|meeting))?)$/i;

/** The published place, or null when it is missing, a placeholder or only says the event is online. */
export function physicalLocation(event) {
    const location = typeof event.location === 'string' ? event.location.trim() : '';
    if (!location || PLACEHOLDER_LOCATION.test(location)) return null;
    return location;
}

/** Google Maps search for a published location; the query is URL-encoded by URLSearchParams. */
export function mapSearchUrl(location) {
    const url = new URL('https://www.google.com/maps/search/');
    url.searchParams.set('api', '1');
    url.searchParams.set('query', location);
    return url.href;
}

/** Modality shown in the comparison: never claims more than the data proves. */
export function modalityLabel(event) {
    if (physicalLocation(event)) return 'Confirmar en la fuente';
    return event.online ? 'En línea' : null;
}

/** Place shown in the facts and the comparison. */
export const locationText = (event) => event.location || (event.online ? 'En línea' : null);

/** Comparison selection is keyed by type and id, like the saved opportunities. */
export const comparisonKey = (event) => JSON.stringify(['event', event.id]);

const COMPARISON_FIELDS = [
    ['Tipo', (e) => KIND_LABELS[e.kind]],
    ['Fechas', (e) => formatRange(e.start, e.end)],
    ['Cierre', (e) => (e.deadline ? formatDate(e.deadline) : null)],
    ['Lugar', locationText],
    ['Modalidad', modalityLabel],
    ['Temas', (e) => (e.topics || []).join(', ')],
    ['Fuente', (e) => SOURCE_LABELS[e.source] || e.source],
];

/** { chosen, rows }: the selected events in selection order (unknown keys dropped) and one row per field,
    with "No informado" where the data is missing. */
export function comparisonRows(events, selected) {
    const byKey = new Map(events.map((event) => [comparisonKey(event), event]));
    const chosen = selected.map((key) => byKey.get(key)).filter(Boolean);
    const rows = COMPARISON_FIELDS.map(([label, value]) => ({ label, values: chosen.map((event) => value(event) || 'No informado') }));
    return { chosen, rows };
}

/** Closing badge: { text, soon } or null when there is no deadline or it already passed. */
export function daysBadge(event, today) {
    const days = daysLeft(event, today);
    if (days === null || days < 0) return null;
    return { text: days === 0 ? 'cierra hoy' : `cierra en ${plural(days, 'día', 'días')}`, soon: days <= SOON_DAYS };
}

/** One line of the "¿Por qué X %?" breakdown: the label, value, maximum and a detail sentence. */
export function affinityDetail(key, event, affinity, today) {
    if (key === 'topics') return affinity.sharedTopics.join(', ');
    if (key === 'keywords') return affinity.keywordHits.length ? affinity.keywordHits.join(', ') : 'Ninguna en el nombre del evento';
    if (key === 'access') {
        if (event.online) return 'En línea';
        return affinity.parts.access ? 'En Colombia' : 'Presencial fuera de Colombia';
    }
    if (event.kind !== 'cfp') return 'Evento para asistir';
    const days = daysLeft(event, today);
    if (days === null) return 'Sin fecha de cierre publicada';
    return days === 0 ? 'Cierra hoy' : `Cierra en ${plural(days, 'día', 'días')}`;
}

export function affinityBreakdown(event, affinity, today) {
    return Object.entries(affinity.parts).map(([key, value]) => ({
        key, label: AFFINITY_LABELS[key], value, max: AFFINITY_MAX[key],
        percent: Math.round((value / AFFINITY_MAX[key]) * 100), detail: affinityDetail(key, event, affinity, today),
    }));
}

export const dataStatusText = (generated) => (generated ? `Listado generado el ${formatDate(generated)}.` : 'Fecha de generación no disponible.');

export function dataInfoText(generated, sources) {
    const summary = Object.entries(sources || {}).map(([key, n]) => `${SOURCE_LABELS[key] || key}: ${n}`).join(' · ');
    return `Datos actualizados el ${generated ? formatDate(generated) : '—'}${summary ? ` · Eventos por fuente: ${summary}` : ''}.`;
}

/** Summary of the compact data line: when the listing was updated. */
export const dataUpdatedText = (generated) => (generated ? `Datos actualizados el ${formatDate(generated)}` : 'Fecha de actualización no disponible');

/** Applied filters as removable chips: [{ id, group, text, patch }], where patch is what onChange needs to remove
    just that filter. The project (?p) and the sort are not filters. */
export function eventFilterChips(state) {
    const chips = [];
    const add = (id, group, text, patch) => chips.push({ id, group, text, patch });
    if (state.kind !== 'all') add('kind', 'Tipo', KIND_FILTER_LABELS[state.kind], { kind: 'all' });
    if (state.query.trim()) add('query', 'Búsqueda', state.query.trim(), { query: '' });
    if (state.modality !== 'all') add('modality', 'Modalidad', MODALITY_LABELS[state.modality], { modality: 'all' });
    if (state.colombia) add('colombia', 'Ubicación', 'Solo Colombia', { colombia: false });
    if (state.location.trim()) add('location', 'Ciudad o país', state.location.trim(), { location: '' });
    if (state.dateFrom) add('dateFrom', 'Inicio desde', formatDate(state.dateFrom), { dateFrom: '' });
    if (state.dateTo) add('dateTo', 'Inicio hasta', formatDate(state.dateTo), { dateTo: '' });
    for (const topic of state.topics) add(`topic-${topic}`, 'Tema', topic, { topics: state.topics.filter((t) => t !== topic) });
    return chips;
}
