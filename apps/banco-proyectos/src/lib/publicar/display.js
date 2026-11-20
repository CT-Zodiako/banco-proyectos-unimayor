/* Labels, text and link helpers of the journal finder components, ported from pipelines/donde-publicar/site/app.js so the
   React components stay presentational. The pure logic itself (filters, sort, affinity) is in table.js. */
import { formatDate } from '../eventos/filters.js';
import { ADVANCED_DEFAULTS, AFFINITY_MAX, compareBest } from './table.js';

export const PUBLINDEX = { Q1: 'A1', Q2: 'A2', Q3: 'B', Q4: 'C' };
export const QUARTILE_NOTES = { Q1: 'mejor cuartil', Q2: 'segundo cuartil', Q3: 'tercer cuartil', Q4: 'cuarto cuartil' };
export const FIT_LABELS = { fuerte: 'Sector + tecnología', tecnologia: 'Tecnología', sector: 'Sector' };
export const FIT_FILTER_LABELS = { fuerte: 'Sector + tecnología', tecnologia: 'Solo tecnología' };
export const LANGUAGE_LABELS = {
    English: 'Inglés', Spanish: 'Español', Portuguese: 'Portugués', French: 'Francés', German: 'Alemán',
    Italian: 'Italiano', Chinese: 'Chino', Russian: 'Ruso', Indonesian: 'Indonesio', Turkish: 'Turco',
    Polish: 'Polaco', Catalan: 'Catalán', Ukrainian: 'Ucraniano', Czech: 'Checo', Serbian: 'Serbio', Croatian: 'Croata',
};
export const COUNTRY_LABELS = {
    'United Kingdom': 'Reino Unido', 'United States': 'Estados Unidos', 'Iran, Islamic Republic of': 'Irán',
    Spain: 'España', Poland: 'Polonia', Germany: 'Alemania', Italy: 'Italia', 'Russian Federation': 'Rusia',
    Brazil: 'Brasil', Singapore: 'Singapur', 'Korea, Republic of': 'Corea del Sur', Netherlands: 'Países Bajos',
    Türkiye: 'Turquía', Croatia: 'Croacia', Switzerland: 'Suiza', Czechia: 'Chequia', France: 'Francia',
    Lithuania: 'Lituania', Ukraine: 'Ucrania', Malaysia: 'Malasia', Romania: 'Rumania', Canada: 'Canadá',
    Slovenia: 'Eslovenia', Iraq: 'Irak', Hungary: 'Hungría', Japan: 'Japón', Norway: 'Noruega', Mexico: 'México',
    Peru: 'Perú', Belgium: 'Bélgica', Sweden: 'Suecia', Denmark: 'Dinamarca', Finland: 'Finlandia', Greece: 'Grecia',
    Ireland: 'Irlanda', Austria: 'Austria', Bulgaria: 'Bulgaria', Thailand: 'Tailandia', 'Hong Kong': 'Hong Kong',
    'Taiwan, Province of China': 'Taiwán', 'Bosnia and Herzegovina': 'Bosnia y Herzegovina', Jordan: 'Jordania',
    'Moldova, Republic of': 'Moldavia', 'Costa Rica': 'Costa Rica', Egypt: 'Egipto', Pakistan: 'Pakistán',
};
export const SORT_DEFAULT_DIR = { title: 'asc', affinity: 'desc', quartile: 'asc', sjr: 'desc', h_index: 'desc', weeks: 'asc' };
export const REVIEW_LABELS = { double: 'doble ciego', single: 'simple ciego', open: 'abierta', editorial: 'editorial', unspecified: 'no especificada' };
export const LANGUAGE_FILTER_LABELS = { Spanish: 'Español', English: 'Inglés', Portuguese: 'Portugués' };
export const AFFINITY_LABELS = { topic: 'Encaje temático', level: 'Exigencia vs. nivel del proyecto', time: 'Tiempo de publicación', language: 'Acepta español', region: 'Revista latinoamericana' };
export const TEMPLATE_LABELS = { Word: 'Plantilla Word', LaTeX: 'Plantilla LaTeX', 'Archivo ZIP': 'Plantilla (ZIP)' };

/** The URL when it is http(s), else null: external data never becomes a javascript: or data: link. */
export function safeUrl(url) {
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? parsed.href : null;
    } catch {
        return null;
    }
}

export const languageLabel = (language) => LANGUAGE_LABELS[language] || language;
export const countryLabel = (country) => COUNTRY_LABELS[country] || country || '';
export const formatIssn = (issn) => (issn && issn.length === 8 ? `${issn.slice(0, 4)}-${issn.slice(4)}` : issn);
export const formatSjr = (sjr) => (sjr === null || sjr === undefined ? '—' : sjr.toFixed(3));

export function reviewLabel(review) {
    const text = String(review || '');
    if (/double anonymous/i.test(text)) return 'Doble ciego';
    if (/single anonymous/i.test(text)) return 'Simple ciego';
    if (/open/i.test(text)) return 'Abierta';
    if (/editorial/i.test(text)) return 'Editorial';
    return 'No especificada';
}

/** Short hint to tell apart several templates of the same kind; the full file name goes in the tooltip. */
export function templateHint(fileName, position) {
    const name = fileName.toLowerCase();
    if (/title|portada|t[ií]tulo/.test(name)) return 'portada';
    if (/response|respuesta|point/.test(name)) return 'respuesta';
    if (/review|revisi/.test(name)) return 'revisión';
    if (/main|body|manuscript|article|art[ií]culo|paper|full/.test(name)) return 'texto';
    return String(position);
}

function fileNameOf(url) {
    const last = new URL(url).pathname.split('/').pop() || '';
    try { return decodeURIComponent(last); } catch { return last; }
}

/** Template files found on the journal's own site (pipeline.templates), ready to render as download links. Links
    with an unsafe URL are dropped. */
export function templateLinks(journal) {
    const templates = journal.templates || [];
    return templates.flatMap((template) => {
        const url = safeUrl(template.url);
        if (!url) return [];
        const label = TEMPLATE_LABELS[template.kind] || 'Plantilla';
        const name = fileNameOf(url);
        const sameKind = templates.filter((other) => other.kind === template.kind);
        const kind = template.kind === 'Archivo ZIP' ? 'ZIP' : template.kind;
        return [{
            url,
            label: sameKind.length > 1 ? `⬇ ${kind} · ${templateHint(name, sameKind.indexOf(template) + 1)}` : `⬇ ${label}`,
            title: `Descargar ${name}`,
            ariaLabel: `Descargar ${label} de ${journal.title} (${name})`,
        }];
    });
}

export function affinityParts(affinity) {
    return Object.entries(affinity.parts).map(([key, value]) => `${AFFINITY_LABELS[key]} ${value}/${AFFINITY_MAX[key]}`).join(' · ');
}

/** The meta line of a list result: country, languages, weeks, review and license, as far as they are known. */
export function journalMeta(journal) {
    return [countryLabel(journal.country), (journal.languages || []).map(languageLabel).join(', '),
        journal.weeks_to_publication ? `${journal.weeks_to_publication} semanas` : null,
        reviewLabel(journal.review), journal.license].filter(Boolean).join(' · ');
}

/** Facts of a catalog card as [label, value] pairs. */
export function journalFacts(journal) {
    return [
        ['Publindex', PUBLINDEX[journal.quartile]], ['SJR', formatSjr(journal.sjr)], ['Índice H', journal.h_index ?? '—'],
        ['Revisión', reviewLabel(journal.review)], ['Semanas a publicación', journal.weeks_to_publication ?? '—'],
        ['Licencia', journal.license || '—'], ['ISSN', (journal.issns || []).map(formatIssn).join(' / ')],
    ];
}

export function categoriesText(journal) {
    const categories = (journal.categories || []).map((category) => (category.quartile ? `${category.name} (${category.quartile})` : category.name));
    return categories.length ? `Categorías SCImago: ${categories.join(' · ')}` : '';
}

/** The sort after clicking a column header: the active column flips, another one starts in its natural direction. */
export function nextSort(sort, key) {
    const dir = sort.key === key ? (sort.dir === 'asc' ? 'desc' : 'asc') : SORT_DEFAULT_DIR[key];
    return { key, dir };
}

/** A filter input as a number: a decimal comma is accepted; blank, non-numeric and negative values mean "no filter". */
export function numberOrNull(value) {
    const n = Number(String(value).trim().replace(',', '.'));
    return String(value).trim() === '' || !Number.isFinite(n) || n < 0 ? null : n;
}

export const toggled = (values, value) => (values.includes(value) ? values.filter((v) => v !== value) : [...values, value]);

/** Removable chips of the active advanced filters, as [filter key, label]. */
export function filterChips(advanced) {
    const a = advanced;
    const d = ADVANCED_DEFAULTS;
    const chips = [];
    if (a.minAffinity !== d.minAffinity) chips.push(['minAffinity', `Afinidad ≥ ${a.minAffinity} %`]);
    if (a.quartiles.length) chips.push(['quartiles', a.quartiles.map((q) => `${q} · ${PUBLINDEX[q]}`).join(', ')]);
    if (a.maxWeeks !== d.maxWeeks) chips.push(['maxWeeks', `Hasta ${a.maxWeeks} semanas`]);
    if (a.language !== d.language) chips.push(['language', `Idioma: ${LANGUAGE_FILTER_LABELS[a.language]}`]);
    if (a.region !== d.region) chips.push(['region', a.region === 'colombia' ? 'Revista colombiana' : 'Revista iberoamericana']);
    if (a.minSjr !== d.minSjr) chips.push(['minSjr', `SJR ≥ ${a.minSjr.toLocaleString('es-CO')}`]);
    if (a.minH !== d.minH) chips.push(['minH', `Índice H ≥ ${a.minH}`]);
    if (a.reviews.length) chips.push(['reviews', `Revisión: ${a.reviews.map((r) => REVIEW_LABELS[r]).join(', ')}`]);
    if (a.ccBy) chips.push(['ccBy', 'Solo CC BY']);
    if (a.fits.length) chips.push(['fits', a.fits.map((f) => FIT_FILTER_LABELS[f]).join(', ')]);
    return chips;
}

/** Side-by-side comparison of the selected journals: rows of { label, cells: [{ text, best }], className }.
    affinityById maps a journal id to its { total, parts } for the current project. */
export function comparisonRows(journals, affinityById) {
    const totals = Object.fromEntries(Object.entries(affinityById).map(([id, affinity]) => [id, affinity.total]));
    const best = compareBest(journals, totals);
    const row = (label, value, bestKey, className) => ({
        label,
        className: className || '',
        cells: journals.map((journal) => ({ text: String(value(journal)), best: Boolean(bestKey && best[bestKey].includes(journal.id)) })),
    });
    return [
        row('Afinidad estimada', (j) => (affinityById[j.id] ? `${affinityById[j.id].total} %` : '—'), 'affinity'),
        row('Desglose de la afinidad', (j) => (affinityById[j.id] ? affinityParts(affinityById[j.id]) : '—'), null, 'parts'),
        row('Cuartil · Publindex', (j) => `${j.quartile} · ${PUBLINDEX[j.quartile]}`, 'quartile'),
        row('SJR', (j) => formatSjr(j.sjr), 'sjr'),
        row('Índice H', (j) => j.h_index ?? '—', 'h_index'),
        row('Semanas a publicación', (j) => j.weeks_to_publication ?? '—', 'weeks'),
        row('Revisión · Licencia', (j) => `${reviewLabel(j.review)} · ${j.license || '—'}`, null),
        row('Idiomas', (j) => (j.languages || []).map(languageLabel).join(', '), null),
        row('País · Editorial', (j) => [countryLabel(j.country), j.publisher].filter(Boolean).join(' · '), null),
    ];
}

export const compareSelectedText = (count) => (count ? ` · ${count} seleccionada${count > 1 ? 's' : ''} para comparar` : '');

export const dataSourcesText = (data) => {
    const s = data.sources;
    return `Datos generados el ${data.generated}: ${s.doaj_free_journals.toLocaleString('es-CO')} revistas de DOAJ sin APC ni otros cobros, de las cuales ${s.diamond_ranked_journals.toLocaleString('es-CO')} tienen cuartil en SCImago.`;
};

/** Tooltip of a quartile badge: what the quartile means and its Publindex category ("Q1 · mejor cuartil en SCImago · Publindex A1"). */
export const quartileTip = (quartile) => (QUARTILE_NOTES[quartile]
    ? `${quartile} · ${QUARTILE_NOTES[quartile]} en SCImago · Publindex ${PUBLINDEX[quartile]}`
    : `Cuartil ${quartile} en SCImago`);

/** Summary of the compact data line: when the catalog was updated. */
export const dataUpdatedText = (data) => (data && data.generated ? `Datos actualizados el ${formatDate(data.generated)}` : 'Fecha de actualización no disponible');
