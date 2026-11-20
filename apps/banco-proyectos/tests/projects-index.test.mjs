// T16b of odd/tasks/mejora-visual.md: the catalog (cards, filters, search, sort, pages), the global search and the Home
// figures read a LIGHT index of the projects (src/data/projects-index.js, ~1/5 of the size) instead of the full data.
// The index is generated from the full data by scripts/build-projects-index.mjs and committed (like palette.js and
// index.css); these tests fail when it is stale and prove the light index gives the same results as the full data.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { projects } from '../src/data/projects/index.js';
import { projectsIndex } from '../src/data/projects-index.js';
import { INDEX_FIELDS, projectIndexEntry, renderProjectsIndexModule } from '../scripts/projects-index-lib.mjs';
import {
    LEVELS, activeFilterChips, areaTags, buildAreaFacets, countByLevel, filterProjects, isNewProject, levelRank, paginate,
    sortProjects, splitProjectTitle, topSectorGroups,
} from '../src/lib/catalog.js';
import { indexProjects, searchAll } from '../src/lib/globalSearch.js';
import { createProjectsLoader, loadProjectsIndex, loadedProjectsIndex } from '../src/lib/projects-loader.js';

const FILE = new URL('../src/data/projects-index.js', import.meta.url);
const ids = (list) => list.map((project) => project.id);

test('the committed index is up to date with the full project data', () => {
    assert.equal(
        readFileSync(FILE, 'utf8'),
        renderProjectsIndexModule(projects),
        'src/data/projects-index.js is stale: the project data changed. Run `npm run build:projects-index` (node scripts/build-projects-index.mjs) and commit the result.',
    );
});

test('the index has one entry per project, in the same order, with only the fields the catalog reads', () => {
    assert.equal(projectsIndex.length, projects.length);
    assert.deepEqual(ids(projectsIndex), ids(projects));
    for (const [position, entry] of projectsIndex.entries()) {
        assert.deepEqual(Object.keys(entry).sort(), [...INDEX_FIELDS, 'hardwareCount', 'softwareCount'].sort(), entry.id);
        for (const field of INDEX_FIELDS) assert.equal(entry[field], projects[position][field], `${entry.id}.${field}`);
        assert.equal(entry.hardwareCount, projects[position].hardware.length, `${entry.id} hardware`);
        assert.equal(entry.softwareCount, projects[position].software.length, `${entry.id} software`);
    }
    assert.deepEqual(projectIndexEntry(projects[0]), projectsIndex[0]);
});

test('the index is much lighter than the full data (the reason it exists)', () => {
    const full = JSON.stringify(projects).length;
    const light = JSON.stringify(projectsIndex).length;
    assert.ok(light < full * 0.3, `index ${light} bytes vs full ${full} bytes`);
});

const tags = [...new Set(projects.flatMap(areaTags))];
const sectorGroups = [...new Set(projects.map((project) => project.sector.split(' - ')[0]))];
const QUERIES = ['', 'sensor', 'SENSORES', 'sensores iot', 'mqtt', 'raspberry pi', 'agricola', 'Agrícola', 'zzzz no existe', 'salud', 'gateway', 'ESP32 cloud', '  robot  ', 'visión', 'blockchain'];

// Every filter combination the page can build: each area, level and sector alone, queries, and mixes of them.
const COMBOS = [
    { },
    ...tags.map((area) => ({ areas: [area] })),
    { areas: tags.slice(0, 3) },
    { areas: [tags[0], tags[tags.length - 1]], levels: [LEVELS[0]] },
    ...LEVELS.map((level) => ({ levels: [level] })),
    { levels: LEVELS.slice(0, 2) },
    ...sectorGroups.map((sector) => ({ sector })),
    { sector: 'agricultura' },
    { sector: 'SALUD' },
    ...QUERIES.map((query) => ({ query })),
    ...QUERIES.map((query, index) => ({ query, areas: [tags[index % tags.length]], levels: [LEVELS[index % 3]] })),
    ...QUERIES.map((query, index) => ({ query, sector: sectorGroups[index % sectorGroups.length] })),
];

test('filterProjects gives identical results on the index and on the full data for every combination', () => {
    assert.ok(COMBOS.length > 100);
    for (const combo of COMBOS) {
        assert.deepEqual(ids(filterProjects(projectsIndex, combo)), ids(filterProjects(projects, combo)), JSON.stringify(combo));
    }
});

test('facets, level counts, sector suggestions and sector list are identical', () => {
    for (const combo of [{}, { query: 'sensor' }, { levels: [LEVELS[1]] }, { sector: 'salud' }]) {
        assert.deepEqual(buildAreaFacets(filterProjects(projectsIndex, combo)), buildAreaFacets(filterProjects(projects, combo)));
        assert.deepEqual(countByLevel(filterProjects(projectsIndex, combo)), countByLevel(filterProjects(projects, combo)));
    }
    assert.deepEqual(topSectorGroups(projectsIndex, 3), topSectorGroups(projects, 3));
    assert.deepEqual(topSectorGroups(projectsIndex, 50), topSectorGroups(projects, 50));
    const sectorsOf = (list) => [...new Set(list.map((p) => p.sector).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));
    assert.deepEqual(sectorsOf(projectsIndex), sectorsOf(projects));
    assert.deepEqual([...new Set(projectsIndex.flatMap(areaTags))].sort(), [...new Set(projects.flatMap(areaTags))].sort());
});

test('sorting and pagination are identical for both sorts and every page, including out-of-range pages', () => {
    for (const sort of ['numero', 'recientes']) {
        for (const combo of [{}, { query: 'sensor' }, { areas: [tags[0]] }]) {
            const fromIndex = sortProjects(filterProjects(projectsIndex, combo), sort);
            const fromFull = sortProjects(filterProjects(projects, combo), sort);
            assert.deepEqual(ids(fromIndex), ids(fromFull), `${sort} ${JSON.stringify(combo)}`);
            for (const page of [undefined, '1', '2', '5', '20', '999', '0', '-3', 'abc']) {
                const a = paginate(fromIndex, page, 12);
                const b = paginate(fromFull, page, 12);
                assert.deepEqual({ ...a, items: ids(a.items) }, { ...b, items: ids(b.items) }, `${sort} page ${page}`);
            }
        }
    }
});

test('what a card reads from a project is identical on the index entry and on the full project', () => {
    for (const [position, entry] of projectsIndex.entries()) {
        const full = projects[position];
        assert.deepEqual(splitProjectTitle(entry.titulo), splitProjectTitle(full.titulo));
        assert.equal(levelRank(entry.nivel), levelRank(full.nivel));
        assert.equal(isNewProject(entry), isNewProject(full));
        assert.deepEqual(areaTags(entry), areaTags(full));
        assert.equal(entry.hardwareCount, full.hardware.length);
        assert.equal(entry.softwareCount, full.software.length);
    }
    assert.deepEqual(activeFilterChips({ areas: [tags[0]] }), activeFilterChips({ areas: [tags[0]] }));
});

test('the global search finds the same projects, in the same order, from the index and from the full data', () => {
    const search = (list, query) => searchAll({ project: indexProjects(list) }, query, 1000).flatMap((group) => group.items.map((entry) => [entry.id, entry.title, entry.meta]));
    for (const query of [...QUERIES, 'proyecto 1', 'avanzado', 'sbc-iot', 'aiot discapacidad']) {
        assert.deepEqual(search(projectsIndex, query), search(projects, query), query);
    }
});

test('the index loader serves the committed index on demand and shares one download', async () => {
    assert.equal(loadedProjectsIndex(), null);
    const [first, second] = await Promise.all([loadProjectsIndex(), loadProjectsIndex()]);
    assert.equal(first, second);
    assert.equal(first, projectsIndex);
    assert.equal(loadedProjectsIndex(), projectsIndex);
});

test('createProjectsLoader can pick any export of the module', async () => {
    const loader = createProjectsLoader(async () => ({ projects: ['full'], projectsIndex: ['light'] }), (module) => module.projectsIndex);
    assert.deepEqual(await loader.load(), ['light']);
    assert.deepEqual(loader.peek(), ['light']);
});
