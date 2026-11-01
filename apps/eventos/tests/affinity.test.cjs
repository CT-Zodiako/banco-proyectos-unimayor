// Tests for the project → events cross in site/filters.js (affinity, ranking, URL state). Run: node --test "tests/*.test.cjs"
const { test } = require('node:test');
const assert = require('node:assert/strict');
const F = require('../site/filters.js');

const TODAY = '2026-10-31';

const ev = (id, extra = {}) => ({
    id, title: `Evento ${id}`, name: `Nombre ${id}`, kind: 'cfp', start: null, end: null, deadline: null,
    location: 'Madrid, Spain', country: 'Spain', online: false, url: `https://example.org/${id}`, source: 'wikicfp',
    topics: [], ...extra,
});

const project = {
    id: 'proj_001', title: 'Sistema de Monitoreo Agrícola Distribuido con MQTT', emoji: '🌾', area: 'SBC-IoT',
    level: 'Intermedio', topics: ['IoT', 'Sistemas Ciberfísicos', 'Redes'],
    keywords: ['mqtt', 'agricultura', 'raspberry pi', 'vision', 'ros'],
};

test('affinity adds the four parts per the contract formula', () => {
    const event = ev('a', { title: 'MQTT Days', name: 'Agricultura de precisión con Raspberry Pi',
        deadline: '2026-12-15', online: true, topics: ['IoT', 'Redes', 'Big Data'] });
    const a = F.affinity(event, project, TODAY);
    assert.deepEqual(a.parts, { topics: 40, keywords: 20, access: 10, time: 10 });
    assert.equal(a.total, 80);
    assert.deepEqual(a.sharedTopics, ['IoT', 'Redes']);
    assert.deepEqual(a.keywordHits, ['mqtt', 'agricultura', 'raspberry pi']);
});

test('topics part is 60 × shared / project topics, rounded', () => {
    assert.equal(F.affinity(ev('a', { topics: ['IoT'] }), project, TODAY).parts.topics, 20);
    assert.equal(F.affinity(ev('a', { topics: ['IoT', 'Redes', 'Sistemas Ciberfísicos'] }), project, TODAY).parts.topics, 60);
    assert.equal(F.affinity(ev('a', { topics: ['IoT'] }), { ...project, topics: ['IoT', 'Redes'] }, TODAY).parts.topics, 30);
    const seven = { ...project, topics: ['IoT', 'Redes', 'Robótica', 'Big Data', 'Videojuegos', 'Ciberseguridad', 'Machine Learning'] };
    assert.equal(F.affinity(ev('a', { topics: ['IoT'] }), seven, TODAY).parts.topics, 9);
    assert.equal(F.affinity(ev('a', { topics: ['Videojuegos'] }), project, TODAY).parts.topics, 0);
    assert.equal(F.affinity(ev('a', { topics: ['IoT'] }), { ...project, topics: [] }, TODAY).parts.topics, 0);
});

test('keywords give 10 per hit in title or name, at most 20', () => {
    assert.equal(F.affinity(ev('a', { title: 'MQTT workshop', name: 'x' }), project, TODAY).parts.keywords, 10);
    assert.equal(F.affinity(ev('a', { title: 'x', name: 'mqtt and agricultura' }), project, TODAY).parts.keywords, 20);
    const three = F.affinity(ev('a', { title: 'MQTT agricultura', name: 'Raspberry Pi' }), project, TODAY);
    assert.equal(three.parts.keywords, 20);
    assert.equal(three.keywordHits.length, 3);
    // Location is not part of the keyword haystack.
    assert.equal(F.affinity(ev('a', { location: 'MQTT City' }), project, TODAY).parts.keywords, 0);
});

test('keyword match ignores case and accents', () => {
    const a = F.affinity(ev('a', { title: 'Congreso de Visión por Computador' }), project, TODAY);
    assert.deepEqual(a.keywordHits, ['vision']);
    assert.equal(F.affinity(ev('a', { name: 'RASPBERRY   PI summit' }), project, TODAY).keywordHits[0], 'raspberry pi');
});

test('keyword match is whole word or phrase, never a partial word', () => {
    assert.deepEqual(F.affinity(ev('a', { title: 'Networks across borders', name: 'Television and provisional rosters' }), project, TODAY).keywordHits, []);
    assert.deepEqual(F.affinity(ev('a', { title: 'ROS 2 workshop' }), project, TODAY).keywordHits, ['ros']);
    assert.deepEqual(F.affinity(ev('a', { title: 'Raspberry Pickers' }), project, TODAY).keywordHits, []);
    assert.deepEqual(F.affinity(ev('a', { title: 'IoT (MQTT/CoAP)' }), project, TODAY).keywordHits, ['mqtt']);
    assert.deepEqual(F.affinity(ev('a', { title: 'x' }), { ...project, keywords: undefined }, TODAY).keywordHits, []);
});

test('access is 10 for Colombia or online, else 0', () => {
    assert.equal(F.affinity(ev('a', { country: 'Colombia' }), project, TODAY).parts.access, 10);
    assert.equal(F.affinity(ev('a', { country: null, online: true }), project, TODAY).parts.access, 10);
    assert.equal(F.affinity(ev('a', { country: 'Spain', online: false }), project, TODAY).parts.access, 0);
    assert.equal(F.affinity(ev('a', { country: null, online: false }), project, TODAY).parts.access, 0);
});

test('time to prepare: cfp deadline boundaries 21/20/7/6 days', () => {
    const time = (deadline, extra = {}) => F.affinity(ev('a', { deadline, ...extra }), project, TODAY).parts.time;
    assert.equal(time('2026-11-21'), 10); // 21 days
    assert.equal(time('2026-11-20'), 5); // 20 days
    assert.equal(time('2026-11-07'), 5); // 7 days
    assert.equal(time('2026-11-06'), 0); // 6 days
    assert.equal(time('2026-10-31'), 0); // closes today
    assert.equal(time(null), 5); // cfp without a published deadline
    assert.equal(time(null, { kind: 'attend' }), 10);
    assert.equal(time('2026-11-01', { kind: 'attend' }), 10);
});

test('affinityLevel: high ≥ 80, mid ≥ 60, low otherwise', () => {
    assert.equal(F.affinityLevel(100), 'high');
    assert.equal(F.affinityLevel(80), 'high');
    assert.equal(F.affinityLevel(79), 'mid');
    assert.equal(F.affinityLevel(60), 'mid');
    assert.equal(F.affinityLevel(59), 'low');
    assert.equal(F.affinityLevel(0), 'low');
    assert.deepEqual(F.AFFINITY_MAX, { topics: 60, keywords: 20, access: 10, time: 10 });
});

test('rankForProject keeps open events sharing a topic, by affinity then deadline', () => {
    const events = [
        ev('other', { topics: ['Videojuegos'], deadline: '2026-12-01' }),
        ev('old', { topics: ['IoT', 'Redes', 'Sistemas Ciberfísicos'], deadline: '2026-10-30' }),
        ev('low', { topics: ['IoT'], deadline: '2026-12-01' }), // 20 + 0 + 0 + 10 = 30
        ev('top', { topics: ['IoT', 'Redes'], title: 'MQTT', deadline: '2027-01-10', online: true }), // 40 + 10 + 10 + 10 = 70
        ev('tieLate', { topics: ['Redes'], deadline: '2026-12-20' }), // 30
        ev('tieNull', { topics: ['Redes'], kind: 'attend' }), // 20 + 0 + 0 + 10 = 30, no closing date
        ev('tieEarly', { topics: ['Redes'], deadline: '2026-11-25' }), // 30
    ];
    const ranked = F.rankForProject(events, project, TODAY);
    assert.deepEqual(ranked.map((r) => r.event.id), ['top', 'tieEarly', 'low', 'tieLate', 'tieNull']);
    assert.equal(ranked[0].affinity.total, 70);
    assert.deepEqual(ranked.map((r) => r.affinity.total), [70, 30, 30, 30, 30]);
    assert.equal(ranked[0].event, events[3]);
});

test('rankForProject returns an empty list when no open event shares a topic', () => {
    const events = [ev('a', { topics: ['Videojuegos'] }), ev('b', { topics: ['IoT'], deadline: '2026-10-01' })];
    assert.deepEqual(F.rankForProject(events, project, TODAY), []);
    assert.deepEqual(F.rankForProject([], project, TODAY), []);
});

test('URL state keeps the project id in p and defaults the sort to affinity', () => {
    const state = F.parseQuery('?p=proj_001&kind=cfp');
    assert.equal(state.project, 'proj_001');
    assert.equal(state.sort, 'affinity');
    assert.equal(state.kind, 'cfp');
    assert.equal(F.stateToQuery(state), 'p=proj_001&kind=cfp');
    const byDeadline = { ...state, sort: 'deadline' };
    assert.deepEqual(F.parseQuery(F.stateToQuery(byDeadline)), byDeadline);
    assert.equal(new URLSearchParams(F.stateToQuery(byDeadline)).get('orden'), 'deadline');
});

test('URL state without a project ignores the affinity sort and has no project key', () => {
    assert.equal(F.parseQuery('?orden=affinity').sort, 'deadline');
    assert.equal('project' in F.parseQuery('?kind=cfp'), false);
    assert.equal(F.stateToQuery({ ...F.DEFAULT_STATE, project: null }), '');
    assert.equal(F.stateToQuery({ ...F.DEFAULT_STATE, sort: 'affinity' }), '');
});
