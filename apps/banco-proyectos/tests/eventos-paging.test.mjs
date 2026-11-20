// Tests for src/lib/eventos/paging.js (show-more pagination of the event list) and the kind counts / project helpers
// in src/lib/eventos/filters.js used by the /eventos type selector. Run: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PAGE_SIZE, visibleSlice, nextVisibleCount, pagingStatus } from '../src/lib/eventos/paging.js';
import { DEFAULT_STATE, kindCounts, withProject } from '../src/lib/eventos/filters.js';

const items = Array.from({ length: 45 }, (_, i) => i + 1);

test('the first page holds 20 events', () => {
    assert.equal(PAGE_SIZE, 20);
    assert.deepEqual(visibleSlice(items, PAGE_SIZE), items.slice(0, 20));
});

test('visibleSlice keeps the order, never exceeds the list and never mutates it', () => {
    const copy = [...items];
    assert.deepEqual(visibleSlice(items, 3), [1, 2, 3]);
    assert.equal(visibleSlice(items, 100).length, 45);
    assert.deepEqual(visibleSlice([], 20), []);
    assert.deepEqual(visibleSlice(items, 0), []);
    assert.deepEqual(visibleSlice(items, -5), []);
    assert.deepEqual(items, copy);
});

test('nextVisibleCount adds one page and stops at the total', () => {
    assert.equal(nextVisibleCount(20, 439), 40);
    assert.equal(nextVisibleCount(40, 45), 45);
    assert.equal(nextVisibleCount(45, 45), 45);
    assert.equal(nextVisibleCount(0, 10), 10);
    assert.equal(nextVisibleCount(20, 439, 5), 25);
    assert.equal(nextVisibleCount(20, 0), 0);
});

test('pagingStatus says how many of the matches are on screen', () => {
    assert.equal(pagingStatus(20, 439), 'Mostrando 20 de 439 eventos');
    assert.equal(pagingStatus(439, 439), 'Mostrando 439 de 439 eventos');
    assert.equal(pagingStatus(500, 439), 'Mostrando 439 de 439 eventos'); // never more than the total
});

const ev = (id, extra) => ({ id, title: id, kind: 'cfp', start: '2099-01-01', end: '2099-01-02', deadline: '2099-01-01', location: 'X', country: 'Colombia', online: false, topics: [], ...extra });
const events = [
    ev('a', { topics: ['IoT'] }),
    ev('b', { topics: ['IoT'], online: true }),
    ev('c', { kind: 'attend', deadline: null, topics: ['IoT'] }),
    ev('d', { kind: 'attend', deadline: null, topics: ['Robótica'], online: true }),
    ev('e', { kind: 'attend', deadline: null, end: '2000-01-02', start: '2000-01-01' }), // expired
];
const base = { ...DEFAULT_STATE, today: '2026-10-31' };

test('kindCounts counts each type under the other filters, ignoring the selected type and expired events', () => {
    assert.deepEqual(kindCounts(events, base), { all: 4, cfp: 2, attend: 2 });
    assert.deepEqual(kindCounts(events, { ...base, kind: 'cfp' }), { all: 4, cfp: 2, attend: 2 });
    assert.deepEqual(kindCounts(events, { ...base, modality: 'online' }), { all: 2, cfp: 1, attend: 1 });
    assert.deepEqual(kindCounts(events, { ...base, topics: ['Robótica'] }), { all: 1, cfp: 0, attend: 1 });
    assert.deepEqual(kindCounts([], base), { all: 0, cfp: 0, attend: 0 });
});

test('withProject adds the project, defaults the sort to affinity and keeps every other filter', () => {
    const next = withProject({ ...DEFAULT_STATE, kind: 'cfp', query: 'iot' }, 'proj_1');
    assert.equal(next.project, 'proj_1');
    assert.equal(next.sort, 'affinity');
    assert.equal(next.kind, 'cfp');
    assert.equal(next.query, 'iot');
    assert.equal(withProject({ ...DEFAULT_STATE, sort: 'title' }, 'proj_1').sort, 'title');
    assert.equal(withProject({ ...DEFAULT_STATE, sort: 'start' }, 'proj_1').sort, 'start');
});
