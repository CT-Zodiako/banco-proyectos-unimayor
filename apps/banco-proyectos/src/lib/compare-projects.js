// Compare 2 or 3 projects side by side (T17 of odd/tasks/mejora-visual.md). Pure helpers, no React:
//  - the selection: the `cmp` param of /proyectos, the `ids` param of the comparison page and a copy in the session
//    (sessionStorage) so the choice survives moving around the site;
//  - the difference check and the row model of the comparison table, built from the full project objects.
import { levelRank, normalizeText, splitProjectTitle } from './catalog.js';

export const MAX_COMPARE = 3;
export const COMPARE_PARAM = 'cmp';
export const COMPARE_PATH = '/proyectos/comparar';
export const COMPARE_STORAGE_KEY = 'banco.compareProjects';
export const FULL_MESSAGE = 'Máximo 3 proyectos. Quita uno para añadir otro.';
export const NOT_INFORMED = 'No informado';

/* ----------------------------------- the selection ----------------------------------- */

/** "a, b,,a" → ['a', 'b']: trimmed, without blanks or repeated ids, in order. Anything but a string is empty. */
export function parseIds(raw) {
    if (typeof raw !== 'string') return [];
    return [...new Set(raw.split(',').map((id) => id.trim()).filter(Boolean))];
}

/** The ids of `raw` that exist in `knownIds` (at most 3), the ones that do not exist, and how many valid ids were left out
    past the third. Unknown ids never take one of the 3 places. */
export function resolveIds(raw, knownIds) {
    const known = knownIds instanceof Set ? knownIds : new Set(knownIds);
    const wanted = parseIds(raw);
    const valid = wanted.filter((id) => known.has(id));
    return {
        ids: valid.slice(0, MAX_COMPARE),
        unknown: wanted.filter((id) => !known.has(id)),
        extra: Math.max(0, valid.length - MAX_COMPARE),
    };
}

export const serializeIds = (ids) => ids.slice(0, MAX_COMPARE).join(',');

/** A new list with `id` added or removed; a 4th project is never added. */
export const toggleId = (ids, id) => {
    if (ids.includes(id)) return ids.filter((other) => other !== id);
    return ids.length >= MAX_COMPARE ? [...ids] : [...ids, id];
};

/** The shareable address of the comparison page: ids joined by commas (readable in the address bar). */
export function compareUrl(ids) {
    const list = ids.slice(0, MAX_COMPARE).map(encodeURIComponent).join(',');
    return list ? `${COMPARE_PATH}?ids=${list}` : COMPARE_PATH;
}

/** A catalog address ("/proyectos?q=x") with its `cmp` param set to `ids`, or removed when there are none. Every other
    param keeps its place and value; the commas of the list stay readable. */
export function withCompareParam(url, ids) {
    const [path, ...rest] = String(url).split('?');
    const params = new URLSearchParams(rest.join('?'));
    const value = serializeIds(ids);
    if (value) params.set(COMPARE_PARAM, value);
    else params.delete(COMPARE_PARAM);
    const search = params.toString().replace(/%2C/gi, ',');
    return search ? `${path}?${search}` : path;
}

const sessionStore = () => {
    try { return globalThis.sessionStorage ?? null; } catch { return null; }
};

/** The selection kept in the session (at most 3 ids); [] when there is none or the storage is not available. */
export function loadSelection(storage = sessionStore()) {
    try { return parseIds(storage?.getItem(COMPARE_STORAGE_KEY)).slice(0, MAX_COMPARE); } catch { return []; }
}

/** Keeps the selection in the session; an empty one is forgotten. A storage that refuses is not an error. */
export function saveSelection(ids, storage = sessionStore()) {
    try {
        const value = serializeIds(ids);
        if (value) storage?.setItem(COMPARE_STORAGE_KEY, value);
        else storage?.removeItem(COMPARE_STORAGE_KEY);
    } catch { /* storage unavailable: the URL still holds the selection */ }
}

/* ------------------------------------ the table ------------------------------------ */

/** The «Problema:» and «Descripción:» paragraphs of a project without their labels. A text with no «Problema:» label is
    the problem as a whole (as the catalog cards show it); a missing description is ''. */
export function splitDescription(descripcion) {
    const text = String(descripcion ?? '');
    const paragraphs = text.split(/\n+/).map((paragraph) => paragraph.trim()).filter(Boolean);
    const labelled = (label) => {
        const pattern = new RegExp(`^${label}:\\s*`, 'i');
        const found = paragraphs.find((paragraph) => pattern.test(paragraph));
        return found ? found.replace(pattern, '').trim() : null;
    };
    return { problema: labelled('problema') ?? text.trim(), descripcion: labelled('descripci[oó]n') ?? '' };
}

const squash = (value) => normalizeText(value).replace(/\s+/g, ' ');
const keyOf = (value) => (Array.isArray(value) ? [...new Set(value.map(squash))].sort().join('\u0001') : squash(value));

/** True when the values are not all the same. Text ignores case, accents and extra spaces; lists (arrays) ignore order. */
export const valuesDiffer = (values) => new Set(values.map(keyOf)).size > 1;

const textCell = (value) => {
    const text = String(value ?? '').trim();
    return text ? { text, empty: false } : { text: NOT_INFORMED, empty: true };
};
const listCell = (items) => {
    const list = Array.isArray(items) ? items.filter(Boolean) : [];
    return { items: list, count: list.length, empty: list.length === 0 };
};

const row = (id, label, kind, cells) => ({
    id, label, kind, cells,
    differs: valuesDiffer(cells.map((cell) => (kind === 'list' ? cell.items : cell.text))),
});

const hardwareItems = (project) => (Array.isArray(project.hardware_tabla) ? project.hardware_tabla.map((item) => item.componente) : project.hardware);
const softwareItems = (project) => (Array.isArray(project.software_tabla) ? project.software_tabla.map((item) => item.herramienta) : project.software);

const goalOf = (project) => {
    const found = (project.objetivos ?? []).find((goal) => /Objetivo General/i.test(goal));
    return found ? found.replace(/^[^\p{L}]*Objetivo General:?\s*/iu, '').trim() : '';
};
const specificGoalsOf = (project) => (project.objetivos ?? [])
    .filter((goal) => !/Objetivo General/i.test(goal) && !/Objetivos Espec[ií]ficos/i.test(goal))
    .map((goal) => goal.replace(/^•\s*/, '').trim())
    .filter(Boolean);

/** The model of the comparison table for 2 or 3 full projects:
    { columns: [{ id, emoji, number, kicker, title }],
      sections: [{ id, title, rows: [{ id, label, kind: 'text' | 'level' | 'list', cells, differs }] }] }.
    Text cells are { text, empty }, the level adds `rank` (1-3) and list cells are { items, count, empty }. A value the
    data lacks reads «No informado». Only fields the data really has: nothing is rated or ranked. */
export function buildComparison(projects) {
    const columns = projects.map((project, index) => {
        const { emoji, number, title } = splitProjectTitle(project.titulo);
        return { id: project.id, emoji, number, kicker: `Proyecto ${number ?? index + 1}`, title };
    });
    const parts = projects.map((project) => splitDescription(project.descripcion));
    const each = (build) => projects.map(build);
    return {
        columns,
        sections: [
            {
                id: 'resumen',
                title: 'Resumen',
                rows: [
                    row('problema', 'Problema', 'text', parts.map((part) => textCell(part.problema))),
                    row('descripcion', 'Descripción', 'text', parts.map((part) => textCell(part.descripcion))),
                ],
            },
            {
                id: 'clasificacion',
                title: 'Clasificación',
                rows: [
                    row('area', 'Área', 'text', each((project) => textCell(project.area))),
                    row('sector', 'Sector', 'text', each((project) => textCell(project.sector))),
                    row('nivel', 'Nivel', 'level', each((project) => ({ ...textCell(project.nivel), rank: levelRank(project.nivel) }))),
                    row('duracion', 'Duración', 'text', each((project) => textCell(project.duracion))),
                    row('presupuesto', 'Presupuesto', 'text', each((project) => textCell(project.presupuesto))),
                ],
            },
            {
                id: 'alcance',
                title: 'Alcance',
                rows: [
                    row('hardware', 'Hardware', 'list', each((project) => listCell(hardwareItems(project)))),
                    row('software', 'Software', 'list', each((project) => listCell(softwareItems(project)))),
                    row('habilidades', 'Habilidades', 'list', each((project) => listCell(project.habilidades))),
                ],
            },
            {
                id: 'objetivos',
                title: 'Objetivos',
                rows: [
                    row('general', 'Objetivo general', 'text', each((project) => textCell(goalOf(project)))),
                    row('especificos', 'Objetivos específicos', 'list', each((project) => listCell(specificGoalsOf(project)))),
                ],
            },
            {
                id: 'impacto',
                title: 'Impacto',
                rows: [row('aplicaciones', 'Dónde se aplica', 'list', each((project) => listCell(project.aplicaciones)))],
            },
        ],
    };
}
