/* The journal finder state of /donde-publicar in the URL, so a search can be shared. ?p=<project id> (and the old
   #<id> hash) keep selecting the project and are never touched here. Only values that differ from the defaults are
   written, and an invalid value in a hand-edited link falls back to its default.

   q        search text                              cuartil   Q1,Q3 (comma separated)
   orden    sort key (default affinity)              ajuste    fuerte,tecnologia
   dir      asc | desc, only when not the default    afinidad  minimum affinity 1-100
   vista    tabla (the default view is the list)     semanas   maximum weeks to publication
   seccion  proyecto | catalogo | ayuda              idioma    Spanish | English | Portuguese
   region   iberoamerica | colombia                  sjr / h   minimum SJR / H index
   revision double,single,open,editorial,unspecified ccby      1 */
import { SORT_DEFAULT_DIR, numberOrNull } from './display.js';
import { ADVANCED_DEFAULTS } from './table.js';

export const FINDER_PARAMS = ['q', 'orden', 'dir', 'vista', 'seccion', 'cuartil', 'ajuste', 'afinidad', 'semanas', 'idioma', 'region', 'sjr', 'h', 'revision', 'ccby'];

const SORT_KEYS = Object.keys(SORT_DEFAULT_DIR);
const FIRST_SORT = 'affinity';
const QUARTILES = ['Q1', 'Q2', 'Q3', 'Q4'];
const FITS = ['fuerte', 'tecnologia'];
const LANGUAGES = ['Spanish', 'English', 'Portuguese'];
const REGIONS = ['iberoamerica', 'colombia'];
const REVIEWS = ['double', 'single', 'open', 'editorial', 'unspecified'];
const TABS = { project: 'proyecto', catalog: 'catalogo', help: 'ayuda' };
const TAB_BY_PARAM = Object.fromEntries(Object.entries(TABS).map(([tab, param]) => [param, tab]));

const list = (value, allowed) => [...new Set(String(value || '').split(',').map((item) => item.trim()).filter((item) => allowed.includes(item)))];

/** { query, sort, mode, advanced, tab } from a query string; tab is null when the URL does not name a section. */
export function parseFinderQuery(search) {
    const params = new URLSearchParams(search);
    const key = SORT_KEYS.includes(params.get('orden')) ? params.get('orden') : FIRST_SORT;
    const dir = ['asc', 'desc'].includes(params.get('dir')) ? params.get('dir') : SORT_DEFAULT_DIR[key];
    const affinity = numberOrNull(params.get('afinidad') ?? '');
    const advanced = {
        ...ADVANCED_DEFAULTS,
        quartiles: list(params.get('cuartil'), QUARTILES),
        fits: list(params.get('ajuste'), FITS),
        minAffinity: affinity === null ? 0 : Math.min(100, affinity),
        maxWeeks: numberOrNull(params.get('semanas') ?? ''),
        language: LANGUAGES.includes(params.get('idioma')) ? params.get('idioma') : ADVANCED_DEFAULTS.language,
        region: REGIONS.includes(params.get('region')) ? params.get('region') : ADVANCED_DEFAULTS.region,
        minSjr: numberOrNull(params.get('sjr') ?? ''),
        minH: numberOrNull(params.get('h') ?? ''),
        reviews: list(params.get('revision'), REVIEWS),
        ccBy: params.get('ccby') === '1',
    };
    return {
        query: params.get('q') || '',
        sort: { key, dir },
        mode: params.get('vista') === 'tabla' ? 'table' : 'list',
        advanced,
        tab: TAB_BY_PARAM[params.get('seccion')] || null,
    };
}

/** The query string ("?a=b" or "") for `search` with the finder params replaced by those of `state`
    ({ query, sort, mode, advanced, tab, defaultTab }); every other param (?p, utm…) is kept as it was. */
export function applyFinderQuery(search, { query, sort, mode, advanced, tab, defaultTab }) {
    const params = new URLSearchParams(search);
    FINDER_PARAMS.forEach((name) => params.delete(name));
    const a = { ...ADVANCED_DEFAULTS, ...advanced };
    if (query) params.set('q', query);
    if (sort.key !== FIRST_SORT) params.set('orden', sort.key);
    if (sort.dir !== SORT_DEFAULT_DIR[sort.key]) params.set('dir', sort.dir);
    if (mode === 'table') params.set('vista', 'tabla');
    if (tab !== defaultTab && TABS[tab]) params.set('seccion', TABS[tab]);
    if (a.quartiles.length) params.set('cuartil', a.quartiles.join(','));
    if (a.fits.length) params.set('ajuste', a.fits.join(','));
    if (a.minAffinity > 0) params.set('afinidad', String(a.minAffinity));
    if (a.maxWeeks !== null) params.set('semanas', String(a.maxWeeks));
    if (a.language !== ADVANCED_DEFAULTS.language) params.set('idioma', a.language);
    if (a.region !== ADVANCED_DEFAULTS.region) params.set('region', a.region);
    if (a.minSjr !== null) params.set('sjr', String(a.minSjr));
    if (a.minH !== null) params.set('h', String(a.minH));
    if (a.reviews.length) params.set('revision', a.reviews.join(','));
    if (a.ccBy) params.set('ccby', '1');
    const text = params.toString();
    return text ? `?${text}` : '';
}

/** True when two queries hold the same params, whatever their order or encoding (avoids rewriting a URL for nothing). */
export function sameQuery(a, b) {
    const sorted = (search) => [...new URLSearchParams(search)].map(([k, v]) => `${k}=${v}`).sort().join('&');
    return sorted(a) === sorted(b);
}
