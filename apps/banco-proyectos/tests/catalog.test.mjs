import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    DEFAULT_SORT,
    SORTS,
    AREA_FAMILIES, areaTags, isNewProject, buildAreaFacets, filterProjects, sortProjects, paginate, topSectorGroups,
} from '../src/lib/catalog.js';

const p = (id, area, extra = {}) => ({
    id, area, titulo: `🔧 Proyecto ${Number(id.slice(5))}: Título ${id}`, descripcion: 'Problema: x\n\nDescripción: y',
    sector: 'Salud - Rehabilitación', nivel: 'Intermedio', ...extra,
});

const sample = [
    p('proj_001', 'SBC-IoT + AIoT', { sector: 'Agricultura de precisión', nivel: 'Avanzado' }),
    p('proj_002', 'SBC-IoT'),
    p('proj_052', 'IoT Hacking y Ciberseguridad', { sector: 'Ciberseguridad de infraestructuras IoT' }),
    p('proj_111', 'Ciberseguridad', { nivel: 'Avanzado', titulo: '🔐 Proyecto 111: Laboratorio de Pentesting Web' }),
    p('proj_161', 'Bioingeniería', { titulo: '🦾 Proyecto 161: Prótesis Mioeléctrica de Mano' }),
    p('proj_201', 'Robótica', { sector: 'Agroindustria - Poscosecha', nivel: 'Intermedio-Avanzado' }),
];

test('area tags split combined areas', () => {
    assert.deepEqual(areaTags(sample[0]), ['SBC-IoT', 'AIoT']);
});

test('projects of the new areas are flagged as new', () => {
    assert.equal(isNewProject(sample[3]), true);
    assert.equal(isNewProject(sample[2]), false);
});

test('a project is new by its number (101 and up), also after moving to an original area', () => {
    assert.equal(isNewProject(p('proj_161', 'IoT Médico y Salud Digital')), true);
    assert.equal(isNewProject(p('proj_100', 'IoT Médico y Salud Digital')), false);
    assert.equal(isNewProject(p('proj_101', 'Desarrollo de Videojuegos')), true);
});

test('the neuroscience and disability areas belong to the health family', () => {
    const health = AREA_FAMILIES.find((f) => f.name === 'Salud y bioingeniería').areas;
    assert.ok(health.includes('Neurociencia con AIoT'));
    assert.ok(health.includes('AIoT para Discapacidad y Enfermedad'));
});

test('every area tag of the bank belongs to one family', () => {
    const known = AREA_FAMILIES.flatMap((f) => f.areas);
    assert.equal(new Set(known).size, known.length);
});

test('facets count unique projects per family and projects per area', () => {
    const facets = buildAreaFacets(sample);
    const iot = facets.find((f) => f.name === 'IoT y sistemas embebidos');
    assert.equal(iot.count, 2);
    assert.deepEqual(iot.areas.map((a) => [a.name, a.count]), [['SBC-IoT', 2], ['AIoT', 1]]);
    const security = facets.find((f) => f.name === 'Seguridad y redes');
    assert.deepEqual(security.areas.map((a) => [a.name, a.count, a.isNew]), [['IoT Hacking y Ciberseguridad', 1, false], ['Ciberseguridad', 1, true]]);
    assert.equal(facets.some((f) => f.count === 0), false);
});

test('areas the families do not know go to "Otras áreas"', () => {
    const facets = buildAreaFacets([p('proj_300', 'Computación Cuántica')]);
    assert.deepEqual(facets.map((f) => [f.name, f.count]), [['Otras áreas', 1]]);
});

test('area filter matches exact tags with OR, not substrings', () => {
    const ids = (r) => r.map((x) => x.id);
    assert.deepEqual(ids(filterProjects(sample, { areas: ['Ciberseguridad'] })), ['proj_111']);
    assert.deepEqual(ids(filterProjects(sample, { areas: ['AIoT', 'Robótica'] })), ['proj_001', 'proj_201']);
});

test('levels, sector and search combine with AND; search ignores accents and case', () => {
    const ids = (r) => r.map((x) => x.id);
    assert.deepEqual(ids(filterProjects(sample, { levels: ['Avanzado'] })), ['proj_001', 'proj_111']);
    assert.deepEqual(ids(filterProjects(sample, { sector: 'agricultura' })), ['proj_001']);
    assert.deepEqual(ids(filterProjects(sample, { query: 'PROTESIS mioelectrica' })), ['proj_161']);
    assert.deepEqual(ids(filterProjects(sample, { query: 'laboratorio', levels: ['Intermedio'] })), []);
    assert.equal(filterProjects(sample, {}).length, sample.length);
});

test('sorting: by project number (ascending) by default', () => {
    assert.equal(DEFAULT_SORT, 'numero');
    assert.equal(SORTS[0].value, 'numero');
    assert.deepEqual(sortProjects(sample, DEFAULT_SORT).map((x) => x.id).slice(0, 2), ['proj_001', 'proj_002']);
    assert.deepEqual(sortProjects(sample).map((x) => x.id).slice(0, 2), ['proj_001', 'proj_002']);
});

test('sorting: newest first on request, or by project number', () => {
    assert.deepEqual(sortProjects(sample, 'recientes').map((x) => x.id).slice(0, 2), ['proj_201', 'proj_161']);
    assert.deepEqual(sortProjects(sample, 'numero').map((x) => x.id).slice(0, 2), ['proj_001', 'proj_002']);
    assert.deepEqual(sample.map((x) => x.id)[0], 'proj_001');
});

test('pagination clamps the page into range', () => {
    const list = Array.from({ length: 25 }, (_, i) => i);
    assert.deepEqual(paginate(list, 1, 12), { items: list.slice(0, 12), page: 1, pages: 3 });
    assert.deepEqual(paginate(list, 3, 12).items, [24]);
    assert.equal(paginate(list, 9, 12).page, 3);
    assert.equal(paginate(list, 0, 12).page, 1);
    assert.deepEqual(paginate([], 1, 12), { items: [], page: 1, pages: 1 });
});

test('top sector groups use the text before " - "', () => {
    assert.deepEqual(topSectorGroups(sample, 2), ['Salud', 'Agricultura de precisión']);
});
