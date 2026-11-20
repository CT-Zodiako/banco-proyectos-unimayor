// T10 of odd/tasks/mejora-visual.md: the pure part of the navbar's global search (projects, events, journals).
import assert from 'node:assert/strict';
import test from 'node:test';
import { projects } from '../src/data/projects/index.js';
import { filterProjects } from '../src/lib/catalog.js';
import { parseQuery } from '../src/lib/eventos/filters.js';
import { parseFinderQuery } from '../src/lib/publicar/finderUrl.js';
import {
    EXAMPLE_SEARCHES, MAX_PER_GROUP, highlightParts, indexEvents, indexJournals, indexProjects, resultCount,
    resultTarget, searchAll, shortcutHint, viewAllTarget,
} from '../src/lib/globalSearch.js';

const journal = (id, title, extra = {}) => ({ id, title, publisher: 'Editorial X', country: 'Spain', quartile: 'Q2', categories: [], ...extra });
const event = (id, title, extra = {}) => ({ id, title, name: title, kind: 'cfp', start: '2099-05-10', end: '2099-05-12', deadline: '2099-03-01', location: 'Popayán, Colombia', online: false, ...extra });
const titles = (group) => group.items.map((item) => item.title);

test('exports the three example searches and the group size', () => {
    assert.deepEqual(EXAMPLE_SEARCHES, ['sensores', 'ciberseguridad', 'Colombia']);
    assert.equal(MAX_PER_GROUP, 5);
});

test('matches ignoring case and accents, in either direction', () => {
    const index = { journal: indexJournals([journal('1', 'Revista de Electrónica Aplicada'), journal('2', 'Physics Letters')]) };
    for (const query of ['electronica', 'ELECTRÓNICA', 'electrónica aplicada', '  Electronica  ']) {
        assert.deepEqual(titles(searchAll(index, query)[0]), ['Revista de Electrónica Aplicada'], query);
    }
    const plain = { journal: indexJournals([journal('1', 'Revista de Electronica Aplicada')]) };
    assert.equal(searchAll(plain, 'electrónica')[0].total, 1);
});

test('every word must match (AND), in any order and across the other fields', () => {
    const index = { journal: indexJournals([
        journal('1', 'Smart Farming Journal', { publisher: 'Wiley', country: 'United Kingdom' }),
        journal('2', 'Smart Cities', { publisher: 'Wiley' }),
    ]) };
    assert.deepEqual(titles(searchAll(index, 'farming smart')[0]), ['Smart Farming Journal']);
    assert.deepEqual(titles(searchAll(index, 'smart wiley')[0]), ['Smart Farming Journal', 'Smart Cities']);
    assert.deepEqual(searchAll(index, 'smart zzz'), []);
    assert.deepEqual(titles(searchAll(index, 'kingdom farming')[0]), ['Smart Farming Journal']);
});

test('ranks title-starts, then title-contains, then the other fields, keeping the data order inside each rank', () => {
    const index = { journal: indexJournals([
        journal('a', 'Materials', { publisher: 'Sensors Press' }),
        journal('b', 'Advances in Sensors'),
        journal('c', 'Sensors and Actuators'),
        journal('d', 'Chemical Sensors'),
        journal('e', 'Sensors Letters'),
        journal('f', 'Biology', { categories: [{ name: 'Sensors (miscellaneous)' }] }),
    ]) };
    const [group] = searchAll(index, 'sensors', 10);
    assert.deepEqual(group.items.map((item) => item.id), ['c', 'e', 'b', 'd', 'a', 'f']);
    assert.deepEqual(searchAll(index, 'sensors', 10)[0].items.map((item) => item.id), ['c', 'e', 'b', 'd', 'a', 'f'], 'same input, same order');
});

test('groups follow the order Proyectos, Eventos, Revistas, hide empty ones and cap each at five with the full total', () => {
    const many = Array.from({ length: 7 }, (_, i) => journal(`j${i}`, `Sensor journal ${i}`));
    const index = {
        project: indexProjects(projects),
        event: indexEvents([event('e1', 'Congreso de Sensores'), event('e2', 'Otro congreso')], '2026-01-01'),
        journal: indexJournals(many),
    };
    const groups = searchAll(index, 'sensor');
    assert.deepEqual(groups.map((group) => [group.type, group.label]), [['project', 'Proyectos'], ['event', 'Eventos'], ['journal', 'Revistas']]);
    assert.equal(groups[0].items.length, 5);
    assert.equal(groups[0].total, filterProjects(projects, { query: 'sensor' }).length);
    assert.equal(groups[1].total, 1);
    assert.equal(groups[2].items.length, 5);
    assert.equal(groups[2].total, 7);
    assert.equal(resultCount(groups), groups[0].total + 1 + 7);
    assert.deepEqual(searchAll(index, 'congreso otro').map((group) => group.type), ['event']);
});

test('a blank query and a missing index give no groups', () => {
    const index = { journal: indexJournals([journal('1', 'Sensors')]) };
    assert.deepEqual(searchAll(index, ''), []);
    assert.deepEqual(searchAll(index, '   '), []);
    assert.deepEqual(searchAll({}, 'sensors'), []);
});

test('the project total matches the catalog filter of /proyectos (same fields)', () => {
    const index = { project: indexProjects(projects) };
    for (const query of ['colombia', 'iot', 'sensor', 'ciberseguridad', 'agrícola']) {
        assert.equal(searchAll(index, query)[0]?.total ?? 0, filterProjects(projects, { query }).length, query);
    }
});

test('a project result shows the title without the emoji and number prefix, plus area and level', () => {
    const [first] = searchAll({ project: indexProjects(projects) }, 'Gateway IoT Multi-Protocolo')[0].items;
    assert.equal(first.id, 'proj_002');
    assert.equal(first.title, 'Gateway IoT Multi-Protocolo para Edificio Inteligente');
    assert.match(first.meta, /^[^·]+ · (Intermedio|Intermedio-Avanzado|Avanzado)$/);
    assert.equal(first.type, 'project');
});

test('a project is found by its number, because the full title is searched', () => {
    const [group] = searchAll({ project: indexProjects(projects) }, 'proyecto 12:');
    assert.ok(group.items.some((item) => item.id === 'proj_012'));
});

test('an event result shows the date range and the place; expired events are not indexed', () => {
    const events = [
        event('open', 'Congreso IoT'),
        event('past', 'Congreso viejo', { deadline: '2020-01-01', start: '2020-02-01', end: '2020-02-02' }),
        event('online', 'Taller en línea', { location: '', online: true, kind: 'attend', deadline: null }),
    ];
    const index = { event: indexEvents(events, '2026-11-20') };
    const [group] = searchAll(index, 'congreso');
    assert.deepEqual(group.items.map((item) => item.id), ['open']);
    assert.equal(group.items[0].meta, '10–12 may 2099 · Popayán, Colombia');
    assert.equal(searchAll(index, 'taller')[0].items[0].meta, '10–12 may 2099 · En línea');
    assert.deepEqual(searchAll(index, 'viejo'), []);
});

test('events match like the Eventos search: title, name and place (not the topics)', () => {
    const events = [event('1', 'ANT 2027', { name: 'International Conference on Ambient Systems', location: 'Delft, Netherlands', topics: ['IoT'] })];
    const index = { event: indexEvents(events, '2026-01-01') };
    assert.equal(searchAll(index, 'ambient systems')[0].total, 1);
    assert.equal(searchAll(index, 'delft')[0].total, 1);
    assert.deepEqual(searchAll(index, 'iot'), []);
});

test('a journal result shows the country in Spanish and the quartile', () => {
    const index = { journal: indexJournals([journal('1', 'Smart Farming', { country: 'United Kingdom', quartile: 'Q1' }), journal('2', 'Sin cuartil', { quartile: null, country: '' })]) };
    assert.match(searchAll(index, 'farming')[0].items[0].meta, /^Reino Unido · Cuartil Q1$/);
    assert.equal(searchAll(index, 'cuartil')[0].items[0].meta, '');
});

test('targets: a project opens its page, an event filters /eventos by its title, a journal filters the catalog by its name', () => {
    const [project] = searchAll({ project: indexProjects(projects) }, 'Gateway IoT Multi-Protocolo')[0].items;
    assert.deepEqual(resultTarget(project), { to: '/proyecto/proj_002' });

    const [ev] = searchAll({ event: indexEvents([event('e1', 'ANT 2027 & más')], '2026-01-01') }, 'ant')[0].items;
    const eventTarget = resultTarget(ev);
    assert.equal(eventTarget.to, '/eventos?q=ANT+2027+%26+m%C3%A1s');
    assert.equal(parseQuery(eventTarget.to.slice(eventTarget.to.indexOf('?'))).query, 'ANT 2027 & más');

    const [jr] = searchAll({ journal: indexJournals([journal('j1', 'Revista de Electrónica Aplicada')]) }, 'electronica')[0].items;
    const journalTarget = resultTarget(jr);
    assert.equal(journalTarget.to, '/donde-publicar?seccion=catalogo&q=Revista+de+Electr%C3%B3nica+Aplicada');
    assert.deepEqual(journalTarget.state, { catalogSearch: { q: 'Revista de Electrónica Aplicada' } });
    const parsed = parseFinderQuery(journalTarget.to.slice(journalTarget.to.indexOf('?')));
    assert.equal(parsed.tab, 'catalog');
    assert.equal(parsed.query, 'Revista de Electrónica Aplicada');
});

test('"Ver todos los resultados" targets use the page params of each list', () => {
    assert.deepEqual(viewAllTarget('project', 'sensores'), { to: '/proyectos?q=sensores' });
    assert.deepEqual(viewAllTarget('event', 'redes y más'), { to: '/eventos?q=redes+y+m%C3%A1s' });
    assert.deepEqual(viewAllTarget('journal', 'redes'), { to: '/donde-publicar?seccion=catalogo&q=redes', state: { catalogSearch: { q: 'redes' } } });
});

test('highlightParts marks the matched text keeping the original letters, ignoring case and accents', () => {
    assert.deepEqual(highlightParts('Revista de Electrónica Aplicada', 'electronica'), [
        { text: 'Revista de ', match: false }, { text: 'Electrónica', match: true }, { text: ' Aplicada', match: false },
    ]);
    assert.deepEqual(highlightParts('Monitoreo con MQTT y monitoreo', 'MONITOREO mqtt'), [
        { text: 'Monitoreo', match: true }, { text: ' con ', match: false }, { text: 'MQTT', match: true }, { text: ' y ', match: false }, { text: 'monitoreo', match: true },
    ]);
    assert.deepEqual(highlightParts('Sensores', ''), [{ text: 'Sensores', match: false }]);
    assert.deepEqual(highlightParts('Sensores', 'zzz'), [{ text: 'Sensores', match: false }]);
    assert.deepEqual(highlightParts('', 'a'), []);
});

test('highlightParts merges overlapping words and keeps combining accents inside the match', () => {
    assert.deepEqual(highlightParts('Sensores', 'sens ensor'), [{ text: 'Sensor', match: true }, { text: 'es', match: false }]);
    assert.deepEqual(highlightParts('Electrónica', 'electro'), [{ text: 'Electró', match: true }, { text: 'nica', match: false }]);
    assert.deepEqual(highlightParts('a.b (c)', '(c) a.b'), [{ text: 'a.b', match: true }, { text: ' ', match: false }, { text: '(c)', match: true }]);
});

test('shortcutHint is ⌘ K on Apple platforms and Ctrl K elsewhere', () => {
    assert.equal(shortcutHint('MacIntel'), '⌘ K');
    assert.equal(shortcutHint('iPhone'), '⌘ K');
    assert.equal(shortcutHint('Win32'), 'Ctrl K');
    assert.equal(shortcutHint('Linux x86_64'), 'Ctrl K');
    assert.equal(shortcutHint(''), 'Ctrl K');
    assert.equal(shortcutHint(undefined), 'Ctrl K');
});

test('resultCount adds the totals of every group', () => {
    assert.equal(resultCount([]), 0);
    assert.equal(resultCount([{ total: 3 }, { total: 12 }]), 15);
});
