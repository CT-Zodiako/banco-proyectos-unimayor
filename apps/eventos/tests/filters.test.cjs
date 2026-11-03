// Tests for site/filters.js (pure event filtering, sorting and URL state). Run: node --test "tests/*.test.cjs"
const { test } = require('node:test');
const assert = require('node:assert/strict');
const F = require('../site/filters.js');

const TODAY = '2026-10-31';

const ev = (id, extra = {}) => ({
    id, title: `Evento ${id}`, name: `Nombre ${id}`, kind: 'cfp', start: null, end: null, deadline: null,
    location: 'Madrid, Spain', country: 'Spain', online: false, url: `https://example.org/${id}`, source: 'wikicfp',
    topics: [], ...extra,
});

const events = [
    ev('iot', { title: 'IoT Conf 2027', deadline: '2026-12-15', start: '2027-06-21', end: '2027-06-23', topics: ['IoT', 'Redes'] }),
    ev('ai', { title: 'AI Summit', deadline: '2026-11-05', start: '2027-02-01', end: '2027-02-03', topics: ['Inteligencia Artificial'],
        location: 'Online', country: null, online: true, source: 'ccfddl' }),
    ev('hack', { kind: 'attend', title: 'Hack Bogotá', start: '2026-11-20', end: '2026-11-22', location: 'Bogotá, Colombia',
        country: 'Colombia', topics: ['Desarrollo de Software'], source: 'devpost' }),
    ev('taller', { kind: 'attend', title: 'Taller de robótica', start: '2026-11-10', end: null, location: 'Popayán, Colombia',
        country: 'Colombia', topics: ['Robótica', 'IoT'], source: 'manual' }),
    ev('webinar', { kind: 'attend', title: 'Webinar ciberseguridad', start: null, end: null, location: 'Online',
        country: 'Colombia', online: true, topics: ['Ciberseguridad'], source: 'manual' }),
];
const ids = (list) => list.map((e) => e.id);
const base = { today: TODAY };

test('no filters keep every non-expired event in the original order', () => {
    assert.deepEqual(ids(F.filterEvents(events, base)), ['iot', 'ai', 'hack', 'taller', 'webinar']);
    assert.deepEqual(ids(F.filterEvents(events, { kind: 'all', topics: [], modality: 'all', colombia: false, query: '', today: TODAY })),
        ['iot', 'ai', 'hack', 'taller', 'webinar']);
});

test('kind filter separates calls for papers from events to attend', () => {
    assert.deepEqual(ids(F.filterEvents(events, { ...base, kind: 'cfp' })), ['iot', 'ai']);
    assert.deepEqual(ids(F.filterEvents(events, { ...base, kind: 'attend' })), ['hack', 'taller', 'webinar']);
});

test('topics combine with OR and an empty list means every topic', () => {
    assert.deepEqual(ids(F.filterEvents(events, { ...base, topics: ['IoT'] })), ['iot', 'taller']);
    assert.deepEqual(ids(F.filterEvents(events, { ...base, topics: ['Redes', 'Ciberseguridad'] })), ['iot', 'webinar']);
    assert.deepEqual(ids(F.filterEvents(events, { ...base, topics: [] })).length, 5);
});

test('modality filter keeps online or in-person events', () => {
    assert.deepEqual(ids(F.filterEvents(events, { ...base, modality: 'online' })), ['ai', 'webinar']);
    assert.deepEqual(ids(F.filterEvents(events, { ...base, modality: 'presencial' })), ['iot', 'hack', 'taller']);
});

test('Colombia filter keeps events whose country is Colombia', () => {
    assert.deepEqual(ids(F.filterEvents(events, { ...base, colombia: true })), ['hack', 'taller', 'webinar']);
});

test('search ignores case and accents over title, name and location', () => {
    assert.deepEqual(ids(F.filterEvents(events, { ...base, query: 'bogota' })), ['hack']);
    assert.deepEqual(ids(F.filterEvents(events, { ...base, query: 'POPAYAN' })), ['taller']);
    assert.deepEqual(ids(F.filterEvents(events, { ...base, query: 'robótica' })), ['taller']);
    assert.deepEqual(ids(F.filterEvents(events, { ...base, query: 'nombre iot' })), ['iot']);
    assert.deepEqual(ids(F.filterEvents(events, { ...base, query: 'madrid' })), ['iot']);
    assert.deepEqual(ids(F.filterEvents(events, { ...base, query: 'nada parecido' })), []);
});

test('filters combine with AND across groups and OR within topics', () => {
    assert.deepEqual(ids(F.filterEvents(events, { ...base, kind: 'attend', topics: ['IoT', 'Ciberseguridad'] })), ['taller', 'webinar']);
    assert.deepEqual(ids(F.filterEvents(events, { ...base, kind: 'attend', topics: ['IoT', 'Ciberseguridad'], modality: 'online' })), ['webinar']);
    assert.deepEqual(ids(F.filterEvents(events, { ...base, kind: 'cfp', colombia: true })), []);
    assert.deepEqual(ids(F.filterEvents(events, { ...base, colombia: true, modality: 'presencial', query: 'taller' })), ['taller']);
});

test('expiry: a cfp closes after its deadline day', () => {
    assert.equal(F.isExpired(ev('x', { deadline: '2026-10-30' }), TODAY), true);
    assert.equal(F.isExpired(ev('x', { deadline: '2026-10-31' }), TODAY), false);
    assert.equal(F.isExpired(ev('x', { deadline: '2026-11-01' }), TODAY), false);
});

test('expiry: an attend event ends after its end date, falling back to its start', () => {
    assert.equal(F.isExpired(ev('x', { kind: 'attend', start: '2026-10-20', end: '2026-10-30' }), TODAY), true);
    assert.equal(F.isExpired(ev('x', { kind: 'attend', start: '2026-10-20', end: '2026-10-31' }), TODAY), false);
    assert.equal(F.isExpired(ev('x', { kind: 'attend', start: '2026-10-30', end: null }), TODAY), true);
    assert.equal(F.isExpired(ev('x', { kind: 'attend', start: '2026-10-31', end: null }), TODAY), false);
});

test('expiry: events without any date never expire', () => {
    assert.equal(F.isExpired(ev('x'), TODAY), false);
    assert.equal(F.isExpired(ev('x', { kind: 'attend' }), TODAY), false);
});

test('filterEvents always drops expired events, even with no other filter', () => {
    const list = [...events, ev('old', { deadline: '2026-10-30' }), ev('gone', { kind: 'attend', start: '2026-09-01', end: '2026-09-02' })];
    assert.deepEqual(ids(F.filterEvents(list, base)), ['iot', 'ai', 'hack', 'taller', 'webinar']);
    assert.deepEqual(ids(F.filterEvents(list, { ...base, today: '2026-09-01' })).includes('gone'), true);
});

test('daysLeft counts days to the deadline and is null without one', () => {
    assert.equal(F.daysLeft(ev('x', { deadline: '2026-11-05' }), TODAY), 5);
    assert.equal(F.daysLeft(ev('x', { deadline: '2026-10-31' }), TODAY), 0);
    assert.equal(F.daysLeft(ev('x', { deadline: '2027-01-01' }), TODAY), 62);
    assert.equal(F.daysLeft(ev('x'), TODAY), null);
});

test('sort by deadline puts nulls last and uses end for attend events', () => {
    // iot 2026-12-15, ai 2026-11-05, hack end 2026-11-22, taller end null → start 2026-11-10, webinar none.
    assert.deepEqual(ids(F.sortEvents(events, 'deadline')), ['ai', 'taller', 'hack', 'iot', 'webinar']);
});

test('sort by start date puts nulls last', () => {
    assert.deepEqual(ids(F.sortEvents(events, 'start')), ['taller', 'hack', 'ai', 'iot', 'webinar']);
});

test('sort by title is alphabetical ignoring accents and case', () => {
    assert.deepEqual(ids(F.sortEvents(events, 'title')), ['ai', 'hack', 'iot', 'taller', 'webinar']);
});

test('sortEvents returns a new array and keeps the input untouched', () => {
    const copy = events.slice();
    const sorted = F.sortEvents(events, 'title');
    assert.notEqual(sorted, events);
    assert.deepEqual(events, copy);
});

test('topicCounts counts each topic once per event', () => {
    assert.deepEqual(F.topicCounts(events), {
        'IoT': 2, 'Redes': 1, 'Inteligencia Artificial': 1, 'Desarrollo de Software': 1, 'Robótica': 1, 'Ciberseguridad': 1,
    });
    assert.deepEqual(F.topicCounts([]), {});
});

test('localIsoDate formats a Date with the local calendar day', () => {
    assert.equal(F.localIsoDate(new Date(2026, 9, 31, 23, 59)), '2026-10-31');
    assert.equal(F.localIsoDate(new Date(2027, 0, 5, 0, 1)), '2027-01-05');
});

test('URL state round-trips and ignores unknown values', () => {
    const state = { ...F.DEFAULT_STATE, kind: 'attend', topics: ['IoT', 'Robótica'], modality: 'online', colombia: true, query: 'bogotá', sort: 'start' };
    const query = F.stateToQuery(state);
    assert.deepEqual(F.parseQuery(query), state);
    assert.deepEqual(F.parseQuery('?kind=otro&modalidad=x&orden=y&co=0'), F.DEFAULT_STATE);
    assert.equal(F.stateToQuery(F.DEFAULT_STATE), '');
    const params = new URLSearchParams(query);
    assert.equal(params.get('kind'), 'attend');
    assert.equal(params.get('tema'), 'IoT,Robótica');
    assert.equal(params.get('modalidad'), 'online');
    assert.equal(params.get('co'), '1');
    assert.equal(params.get('q'), 'bogotá');
    assert.equal(params.get('orden'), 'start');
});

test('formatRange writes Spanish date ranges and handles missing dates', () => {
    assert.equal(F.formatRange('2027-06-21', '2027-06-23'), '21–23 jun 2027');
    assert.equal(F.formatRange('2027-06-28', '2027-07-02'), '28 jun – 2 jul 2027');
    assert.equal(F.formatRange('2026-12-30', '2027-01-02'), '30 dic 2026 – 2 ene 2027');
    assert.equal(F.formatRange('2027-06-21', '2027-06-21'), '21 jun 2027');
    assert.equal(F.formatRange('2027-06-21', null), '21 jun 2027');
    assert.equal(F.formatRange(null, '2027-06-21'), 'hasta el 21 jun 2027');
    assert.equal(F.formatRange(null, null), null);
    assert.equal(F.formatDate('2026-11-05'), '5 nov 2026');
});


test('date range uses inclusive event start dates and excludes unknown dates', () => {
    assert.deepEqual(ids(F.filterEvents(events, { ...base, dateFrom: '2026-11-10', dateTo: '2026-11-20' })), ['hack', 'taller']);
    assert.deepEqual(ids(F.filterEvents(events, { ...base, dateFrom: '2027-01-01' })), ['iot', 'ai']);
});

test('location filter matches location and country without accents, independent of title', () => {
    assert.deepEqual(ids(F.filterEvents(events, { ...base, location: 'colombia' })), ['hack', 'taller', 'webinar']);
    assert.deepEqual(ids(F.filterEvents(events, { ...base, location: 'bogota' })), ['hack']);
    assert.deepEqual(ids(F.filterEvents(events, { ...base, location: 'robotica' })), []);
});

test('new filters round trip in URLs without changing legacy defaults', () => {
    const state = { ...F.DEFAULT_STATE, dateFrom: '2026-11-10', dateTo: '2027-01-31', location: 'Bogotá' };
    assert.deepEqual(F.parseQuery(F.stateToQuery(state)), state);
    assert.equal(F.stateToQuery(F.DEFAULT_STATE), '');
});


test('comparison selects at most three events and toggles selected events', () => {
    let selected = [];
    for (const id of ['one', 'two', 'three', 'four']) selected = F.toggleComparison(selected, id);
    assert.deepEqual(selected, ['one', 'two', 'three']);
    assert.deepEqual(F.toggleComparison(selected, 'two'), ['one', 'three']);
});
