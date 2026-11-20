// T19: pure helpers of the reorganized /oportunidades page (src/lib/opportunitiesView.js): filters, facet counts, sorts,
// board grouping, URL state and note previews. The stored data and the backup format are NOT touched (tests/opportunities.test.mjs).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { STATUS_LABELS } from '../src/lib/opportunities.js';
import {
    DEFAULT_VIEW, NOTE_PREVIEW_LENGTH, STATUS_TONES, groupByStatus, groupByType, hasDeadlines, itemKey, itemStatus, noteExcerpt,
    parseViewQuery, siteName, sortItems, statusCounts, typeCounts, viewFilters, viewToSearch, filterView,
} from '../src/lib/opportunitiesView.js';

const items = [
    { type: 'event', id: 'e1', title: 'Congreso IoT Cauca', url: 'https://iot.example.org/cfp', start: '2099-05-10', deadline: '2099-03-01', status: 'review', note: 'Pedir carta' },
    { type: 'journal', id: 'j1', title: 'Revista Brasileira de Engenharia de Biossistemas', url: 'https://www.scielo.br/rbeb', instructions: 'https://www.scielo.br/rbeb/instr', status: 'preparing' },
    { type: 'event', id: 'e2', title: 'Álgebra y Robótica', url: 'https://robot.example.org', start: '2099-06-01', deadline: '2099-02-01', status: 'submitted' },
    { type: 'journal', id: 'j2', title: 'Journal of Smart Farming', url: 'https://farm.example.org', note: 'Revisar costos de publicación' },
    { type: 'event', id: 'e3', title: 'Taller sin fechas', url: 'https://taller.example.org', status: 'discarded' },
];
const ids = (list) => list.map((item) => item.id);

test('statuses: the real four, each with an AA tone of palette.js, unknown or missing status counts as «Por revisar»', () => {
    assert.deepEqual(Object.keys(STATUS_LABELS), ['review', 'preparing', 'submitted', 'discarded']);
    assert.deepEqual(STATUS_TONES, { review: 'review', preparing: 'fair', submitted: 'lang', discarded: 'low' });
    assert.equal(itemStatus({}), 'review');
    assert.equal(itemStatus({ status: 'preparing' }), 'preparing');
    assert.equal(itemStatus({ status: 'cualquier-cosa' }), 'review');
    assert.equal(itemKey(items[0]), 'event:e1');
});

test('filterView combines status, type and an accent- and case-insensitive query over title, site and note', () => {
    assert.deepEqual(ids(filterView(items, viewFilters(DEFAULT_VIEW))), ['e1', 'j1', 'e2', 'j2', 'e3']);
    assert.deepEqual(ids(filterView(items, { status: 'review' })), ['e1', 'j2']);
    assert.deepEqual(ids(filterView(items, { type: 'journal' })), ['j1', 'j2']);
    assert.deepEqual(ids(filterView(items, { type: 'journal', status: 'review' })), ['j2']);
    assert.deepEqual(ids(filterView(items, { query: 'algebra' })), ['e2']);
    assert.deepEqual(ids(filterView(items, { query: '  ROBOTICA ' })), ['e2']);
    assert.deepEqual(ids(filterView(items, { query: 'scielo' })), ['j1']);
    assert.deepEqual(ids(filterView(items, { query: 'costos publicacion' })), ['j2']);
    assert.deepEqual(ids(filterView(items, { query: 'carta' })), ['e1']);
    assert.deepEqual(ids(filterView(items, { query: 'zzz' })), []);
    assert.deepEqual(ids(filterView(items, { query: '   ' })), ['e1', 'j1', 'e2', 'j2', 'e3']);
});

test('status and type counts are facets: each ignores its own filter and respects the others', () => {
    assert.deepEqual(statusCounts(items, {}), { all: 5, review: 2, preparing: 1, submitted: 1, discarded: 1 });
    assert.deepEqual(statusCounts(items, { type: 'journal' }), { all: 2, review: 1, preparing: 1, submitted: 0, discarded: 0 });
    assert.deepEqual(statusCounts(items, { type: 'event', query: 'congreso' }), { all: 1, review: 1, preparing: 0, submitted: 0, discarded: 0 });
    assert.deepEqual(typeCounts(items, {}), { all: 5, event: 3, journal: 2 });
    assert.deepEqual(typeCounts(items, { status: 'review' }), { all: 2, event: 1, journal: 1 });
    assert.deepEqual(typeCounts(items, { query: 'revista' }), { all: 1, event: 0, journal: 1 });
    assert.deepEqual(statusCounts([], {}), { all: 0, review: 0, preparing: 0, submitted: 0, discarded: 0 });
});

test('sortItems: most recent first (last saved first), name A-Z without accents, status order, nearest deadline', () => {
    const before = ids(items);
    assert.deepEqual(ids(sortItems(items, 'recent')), ['e3', 'j2', 'e2', 'j1', 'e1']);
    assert.deepEqual(ids(items), before, 'the input is not mutated');
    assert.deepEqual(ids(sortItems(items, 'name')), ['e2', 'e1', 'j2', 'j1', 'e3']);
    // review (j2 then e1: most recent first inside a status), preparing, submitted, discarded
    assert.deepEqual(ids(sortItems(items, 'status')), ['j2', 'e1', 'j1', 'e2', 'e3']);
    // dated events by deadline, everything else after them, most recent first
    assert.deepEqual(ids(sortItems(items, 'deadline')), ['e2', 'e1', 'e3', 'j2', 'j1']);
    assert.deepEqual(ids(sortItems(items, 'desconocido')), ['e3', 'j2', 'e2', 'j1', 'e1']);
    assert.equal(hasDeadlines(items), true);
    assert.equal(hasDeadlines(items.filter((item) => item.type === 'journal')), false);
    assert.equal(hasDeadlines([]), false);
});

test('groupByStatus gives the four columns in order (also the empty ones); groupByType the two sections', () => {
    const columns = groupByStatus(items);
    assert.deepEqual(columns.map((column) => [column.status, column.label, ids(column.items)]), [
        ['review', 'Por revisar', ['e1', 'j2']], ['preparing', 'Preparando', ['j1']], ['submitted', 'Enviado', ['e2']], ['discarded', 'Descartado', ['e3']],
    ]);
    assert.deepEqual(groupByStatus([]).map((column) => column.items.length), [0, 0, 0, 0]);
    assert.deepEqual(groupByType(items).map((group) => [group.type, group.label, ids(group.items)]), [
        ['event', 'Eventos', ['e1', 'e2', 'e3']], ['journal', 'Revistas', ['j1', 'j2']],
    ]);
});

test('noteExcerpt: first 60 characters on one line with an ellipsis, empty for no note', () => {
    assert.equal(NOTE_PREVIEW_LENGTH, 60);
    assert.equal(noteExcerpt(''), '');
    assert.equal(noteExcerpt(undefined), '');
    assert.equal(noteExcerpt('   \n '), '');
    assert.equal(noteExcerpt('  Pedir\ncarta   al  tutor '), 'Pedir carta al tutor');
    assert.equal(noteExcerpt('x'.repeat(60)), 'x'.repeat(60));
    assert.equal(noteExcerpt('x'.repeat(61)), `${'x'.repeat(60)}…`);
});

test('siteName: host of the official link without www, empty when there is no safe link', () => {
    assert.equal(siteName('https://www.scielo.br/rbeb'), 'scielo.br');
    assert.equal(siteName('http://iot.example.org/cfp?x=1'), 'iot.example.org');
    assert.equal(siteName('javascript:alert(1)'), '');
    assert.equal(siteName('no es un enlace'), '');
    assert.equal(siteName(undefined), '');
});

test('parseViewQuery: defaults, every valid value, invalid values fall back', () => {
    assert.deepEqual(parseViewQuery(''), DEFAULT_VIEW);
    assert.deepEqual(DEFAULT_VIEW, { type: 'all', status: 'all', query: '', sort: 'recent', view: 'list' });
    assert.deepEqual(parseViewQuery('?tipo=eventos&estado=preparing&q=robot+abierta&orden=fecha&vista=tablero'),
        { type: 'event', status: 'preparing', query: 'robot abierta', sort: 'deadline', view: 'board' });
    assert.equal(parseViewQuery('?tipo=revistas').type, 'journal');
    assert.equal(parseViewQuery('?orden=nombre').sort, 'name');
    assert.equal(parseViewQuery('?orden=estado').sort, 'status');
    assert.deepEqual(parseViewQuery('?tipo=otro&estado=aceptado&orden=zzz&vista=cubos&q='), DEFAULT_VIEW);
    assert.deepEqual(parseViewQuery('?estado=constructor&tipo=__proto__'), DEFAULT_VIEW);
    assert.equal(parseViewQuery('?q=%C3%A1lgebra').query, 'álgebra');
});

test('viewToSearch: omits defaults, round-trips, keeps unrelated params and never invents a status', () => {
    assert.equal(viewToSearch(DEFAULT_VIEW), '');
    const state = { type: 'journal', status: 'submitted', query: 'biosistemas agrícolas', sort: 'name', view: 'board' };
    const search = viewToSearch(state);
    assert.equal(search, '?tipo=revistas&estado=submitted&q=biosistemas+agr%C3%ADcolas&orden=nombre&vista=tablero');
    assert.deepEqual(parseViewQuery(search), state);
    assert.equal(viewToSearch({ ...DEFAULT_VIEW, query: '   ' }), '');
    assert.equal(viewToSearch({ ...DEFAULT_VIEW, view: 'board' }, '?otro=1&tipo=eventos&q=x'), '?otro=1&vista=tablero');
    assert.equal(viewToSearch({ ...DEFAULT_VIEW, status: 'nope', sort: 'nope', type: 'nope', view: 'nope' }), '');
});
