// Tests for src/lib/publicar/finderUrl.js: the journal finder state (search, sort, view, advanced filters, section) in
// the URL of /donde-publicar. ?p=<project id> (and the old #<id>) keep their meaning. Run: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { FINDER_PARAMS, applyFinderQuery, parseFinderQuery } from '../src/lib/publicar/finderUrl.js';
import { ADVANCED_DEFAULTS } from '../src/lib/publicar/table.js';

const DEFAULT_SORT = { key: 'affinity', dir: 'desc' };
const defaults = { query: '', sort: DEFAULT_SORT, mode: 'list', advanced: ADVANCED_DEFAULTS, tab: 'project', defaultTab: 'project' };

test('an old link (?p only, or nothing) parses to the default finder state', () => {
    for (const search of ['', '?p=proj_001', '?foo=bar']) {
        assert.deepEqual(parseFinderQuery(search), { query: '', sort: DEFAULT_SORT, mode: 'list', advanced: ADVANCED_DEFAULTS, tab: null }, search);
    }
});

test('the default state writes nothing and keeps ?p and unknown params untouched', () => {
    assert.equal(applyFinderQuery('', defaults), '');
    assert.equal(applyFinderQuery('?p=proj_001', defaults), '?p=proj_001');
    assert.equal(applyFinderQuery('?p=proj_001&utm=x', defaults), '?p=proj_001&utm=x');
});

test('every non-default value is written under its own param', () => {
    const state = {
        query: 'riego solar', sort: { key: 'quartile', dir: 'desc' }, mode: 'table', tab: 'help', defaultTab: 'project',
        advanced: { ...ADVANCED_DEFAULTS, quartiles: ['Q1', 'Q3'], fits: ['fuerte'], minAffinity: 70, maxWeeks: 12, language: 'Spanish', region: 'colombia', minSjr: 0.5, minH: 10, reviews: ['double'], ccBy: true },
    };
    const query = applyFinderQuery('?p=proj_001', state);
    const params = new URLSearchParams(query);
    assert.equal(params.get('p'), 'proj_001');
    assert.equal(params.get('q'), 'riego solar');
    assert.equal(params.get('orden'), 'quartile');
    assert.equal(params.get('dir'), 'desc');
    assert.equal(params.get('vista'), 'tabla');
    assert.equal(params.get('seccion'), 'ayuda');
    assert.equal(params.get('cuartil'), 'Q1,Q3');
    assert.equal(params.get('ajuste'), 'fuerte');
    assert.equal(params.get('afinidad'), '70');
    assert.equal(params.get('semanas'), '12');
    assert.equal(params.get('idioma'), 'Spanish');
    assert.equal(params.get('region'), 'colombia');
    assert.equal(params.get('sjr'), '0.5');
    assert.equal(params.get('h'), '10');
    assert.equal(params.get('revision'), 'double');
    assert.equal(params.get('ccby'), '1');
    assert.deepEqual(parseFinderQuery(query), { query: 'riego solar', sort: { key: 'quartile', dir: 'desc' }, mode: 'table', advanced: state.advanced, tab: 'help' });
});

test('the sort direction is written only when it differs from the default of that sort', () => {
    assert.equal(new URLSearchParams(applyFinderQuery('', { ...defaults, sort: { key: 'title', dir: 'asc' } })).get('dir'), null);
    assert.equal(new URLSearchParams(applyFinderQuery('', { ...defaults, sort: { key: 'title', dir: 'desc' } })).get('dir'), 'desc');
    assert.equal(new URLSearchParams(applyFinderQuery('', { ...defaults, sort: { key: 'affinity', dir: 'asc' } })).get('dir'), 'asc');
    assert.deepEqual(parseFinderQuery('?orden=title').sort, { key: 'title', dir: 'asc' });
    assert.deepEqual(parseFinderQuery('?orden=sjr').sort, { key: 'sjr', dir: 'desc' });
    assert.deepEqual(parseFinderQuery('?dir=asc').sort, { key: 'affinity', dir: 'asc' });
});

test('the section is written only when it differs from the default one for the page', () => {
    assert.equal(applyFinderQuery('', { ...defaults, tab: 'catalog', defaultTab: 'catalog' }), '');
    assert.equal(applyFinderQuery('', { ...defaults, tab: 'catalog', defaultTab: 'project' }), '?seccion=catalogo');
    assert.equal(applyFinderQuery('', { ...defaults, tab: 'project', defaultTab: 'catalog' }), '?seccion=proyecto');
    assert.equal(parseFinderQuery('?seccion=catalogo').tab, 'catalog');
    assert.equal(parseFinderQuery('?seccion=proyecto').tab, 'project');
    assert.equal(parseFinderQuery('?seccion=otra').tab, null);
});

test('going back to defaults removes the finder params but keeps the rest', () => {
    const dirty = '?p=proj_001&q=riego&cuartil=Q1&vista=tabla&seccion=ayuda&utm=x';
    assert.equal(applyFinderQuery(dirty, defaults), '?p=proj_001&utm=x');
});

test('invalid values fall back to the defaults', () => {
    const parsed = parseFinderQuery('?orden=zzz&dir=up&vista=grid&cuartil=Q9,Q2,Q2&ajuste=nada&afinidad=500&semanas=-3&idioma=Klingon&region=luna&sjr=abc&h=-1&revision=raro,single&ccby=2');
    assert.deepEqual(parsed.sort, DEFAULT_SORT);
    assert.equal(parsed.mode, 'list');
    assert.deepEqual(parsed.advanced, { ...ADVANCED_DEFAULTS, quartiles: ['Q2'], minAffinity: 100, reviews: ['single'] });
});

test('a decimal comma is accepted for the numbers, like the filter fields do', () => {
    assert.equal(parseFinderQuery('?sjr=0,25').advanced.minSjr, 0.25);
});

test('FINDER_PARAMS lists exactly the params the finder owns, never ?p', () => {
    assert.ok(!FINDER_PARAMS.includes('p'));
    for (const key of ['q', 'orden', 'dir', 'vista', 'seccion', 'cuartil', 'ajuste', 'afinidad', 'semanas', 'idioma', 'region', 'sjr', 'h', 'revision', 'ccby']) assert.ok(FINDER_PARAMS.includes(key), key);
});
