import { test } from 'node:test';
import assert from 'node:assert/strict';
import { projects, newAreaProjects } from '../src/data/projects/index.js';
import { baseProjects } from '../src/data/baseProjects.js';
import { NEW_AREAS, AREA_MODULES, MIN_PROJECTS_PER_NEW_AREA } from '../src/data/projects/areas.js';
import { validateArea, validateProject, duplicates, titleKey } from '../scripts/projects-validation.mjs';
import { areaTags } from '../src/lib/catalog.js';

// Validate the authored modules, not the derived `newAreaProjects` (which add hardware/software lists).
const authored = await Promise.all(AREA_MODULES.map(async (area) => ({
    area,
    projects: (await import(`../src/data/projects/${area.module}`)).default,
})));

test('every new area has at least the minimum number of valid projects', () => {
    const errors = authored.flatMap(({ area, projects }) => validateArea(projects, area, area.minimum ?? MIN_PROJECTS_PER_NEW_AREA));
    assert.deepEqual(errors, []);
});

test('each area module only contains projects of its own area', () => {
    const misplaced = authored.flatMap(({ area, projects }) => projects.filter((p) => p.area !== area.name).map((p) => `${area.module}: ${p.id}`));
    assert.deepEqual(misplaced, []);
});

test('every new-area project belongs to a declared area', () => {
    const names = new Set(AREA_MODULES.map((a) => a.name));
    assert.deepEqual(newAreaProjects.filter((p) => !names.has(p.area)).map((p) => p.id), []);
});

test('ids and titles are unique across the whole bank', () => {
    assert.deepEqual(duplicates(projects), []);
});

test('the original 100 projects are kept unchanged and first', () => {
    assert.equal(projects.length, baseProjects.length + newAreaProjects.length);
    assert.deepEqual(projects.slice(0, baseProjects.length), baseProjects);
    assert.equal(baseProjects.length, 100);
});

test('hardware and software display lists are derived from the tables', () => {
    for (const project of newAreaProjects) {
        assert.equal(project.hardware.length, project.hardware_tabla.length, project.id);
        assert.equal(project.software.length, project.software_tabla.length, project.id);
        assert.equal(project.hardware[0], `${project.hardware_tabla[0].componente} (${project.hardware_tabla[0].categoria} | ${project.hardware_tabla[0].funcion})`);
        assert.equal(project.software[0], `${project.software_tabla[0].herramienta}: ${project.software_tabla[0].tipo} - ${project.software_tabla[0].descripcion}`);
    }
});

test('validator rejects malformed projects with a precise message', () => {
    const area = NEW_AREAS[0];
    const bad = { id: 'proj_150', titulo: 'Proyecto 150: Sin emoji', descripcion: 'Solo texto', area: 'Otra', sector: 'X',
        nivel: 'Básico', duracion: 'Un año', presupuesto: 'Alto', habilidades: [], objetivos: [], pasos: [],
        aplicaciones: [], referencias: [], hardware_tabla: [], software_tabla: [] };
    const errors = validateProject(bad, area);
    assert.ok(errors.includes('proj_150: id fuera del rango del área (101-110)'));
    assert.ok(errors.includes('proj_150: titulo debe ser "<emoji> Proyecto N: <título>"'));
    assert.ok(errors.includes(`proj_150: area debe ser exactamente "${area.name}"`));
    assert.ok(errors.includes('proj_150: nivel debe ser uno de: Intermedio, Intermedio-Avanzado, Avanzado'));
});

test('title keys ignore the emoji, the project number and accents', () => {
    assert.equal(titleKey('🤖 Proyecto 201: Brazo Robótico'), 'brazo robotico');
});

// ---------- neuro-discapacidad (odd/tasks/neuro-discapacidad.md) ----------
const byId = new Map(projects.map((p) => [p.id, p]));
const MOVED = ['proj_161', 'proj_162', 'proj_164', 'proj_166', 'proj_169', 'proj_170'];
// Connectivity or IoT boards: Bioingeniería projects must work standalone (S2, L4).
const IOT_RE = /\b(iot|esp32|esp8266|wi-?fi|bluetooth|ble|lora|lorawan|mqtt|nube|cloud|thingspeak|firebase|node-red)\b/i;

test('the Bioingeniería projects that used IoT now belong to "IoT Médico y Salud Digital" with the same ids', () => {
    assert.deepEqual(MOVED.map((id) => byId.get(id)?.area), MOVED.map(() => 'IoT Médico y Salud Digital'));
});

test('Bioingeniería has 20 projects (T26 of mejora-visual) and none uses IoT connectivity', () => {
    const bio = projects.filter((p) => p.area === 'Bioingeniería');
    assert.equal(bio.length, 20);
    const connected = bio.filter((p) => IOT_RE.test(JSON.stringify([p.titulo, p.descripcion, p.hardware_tabla, p.software_tabla])));
    assert.deepEqual(connected.map((p) => p.id), []);
});

test('the two new areas exist with at least 20 projects each', () => {
    for (const name of ['Neurociencia con AIoT', 'AIoT para Discapacidad y Enfermedad']) {
        assert.ok(NEW_AREAS.some((a) => a.name === name), name);
        assert.ok(projects.filter((p) => p.area === name).length >= 20, name);
    }
});

test('validator accepts an explicit id list and names it when an id is outside', () => {
    const area = { name: 'X', module: 'x.js', ids: [163, 211] };
    const errors = validateProject({ id: 'proj_212' }, area);
    assert.ok(errors.length > 0);
    const ok = validateProject({ ...authored.find((a) => a.area.name === 'Bioingeniería').projects[0] }, { ...area, name: 'Bioingeniería', ids: [163, 165, 167, 168, 211, 212, 213, 214, 215, 216] });
    assert.ok(!ok.some((e) => e.includes('id fuera')), ok.join('\n'));
    const proj165 = authored.find((a) => a.area.name === 'Bioingeniería').projects.find((p) => p.id === 'proj_165');
    const out = validateProject({ ...proj165 }, { ...area, name: 'Bioingeniería' });
    assert.ok(out.some((e) => e.endsWith('id fuera de los ids del área (163, 211)')), out.join('\n'));
});

// ---------- salud y bioingeniería: 50 new projects (T25/T26 of odd/tasks/mejora-visual.md, S3) ----------
// proj_237–286 are reserved in areas.js, ten per area; the existing ids of each area stay. `moduleCount` is the number of
// projects in the module file; `catalogCount` is the number of projects of the area in the whole catalog (the original
// projects proj_071–080 also belong to "IoT Médico y Salud Digital" but live in baseProjects.js).
const range = (first, last) => Array.from({ length: last - first + 1 }, (_, i) => first + i);
const HEALTH_AREAS = [
    { name: 'Neurociencia con AIoT', module: 'neurociencia-aiot.js', ids: [...range(217, 226), ...range(237, 246)], moduleCount: 20, catalogCount: 20 },
    { name: 'Medicina con AIoT', module: 'medicina-aiot.js', ids: [...range(151, 160), ...range(247, 256)], moduleCount: 20, catalogCount: 20 },
    { name: 'Bioingeniería', module: 'bioingenieria.js', ids: [163, 165, 167, 168, ...range(211, 216), ...range(257, 266)], moduleCount: 20, catalogCount: 20 },
    { name: 'AIoT para Discapacidad y Enfermedad', module: 'aiot-discapacidad-enfermedad.js', ids: [...range(227, 236), ...range(267, 276)], moduleCount: 20, catalogCount: 20 },
    { name: 'IoT Médico y Salud Digital', module: 'iot-medico-salud-digital.js', ids: [161, 162, 164, 166, 169, 170, ...range(277, 286)], moduleCount: 16, catalogCount: 26 },
];
const idOf = (number) => `proj_${String(number).padStart(3, '0')}`;

test('areas.js reserves proj_237–286 for the five health areas, ten per area, and keeps the existing ids', () => {
    for (const expected of HEALTH_AREAS) {
        const area = AREA_MODULES.find((a) => a.name === expected.name);
        assert.ok(area, `${expected.name} is registered`);
        assert.equal(area.module, expected.module, expected.name);
        assert.deepEqual(area.ids, expected.ids, `${expected.name} reserved ids`);
    }
    const reserved = HEALTH_AREAS.flatMap((a) => a.ids).filter((n) => n >= 237).sort((a, b) => a - b);
    assert.deepEqual(reserved, range(237, 286));
    const everyReserved = AREA_MODULES.flatMap((a) => a.ids ?? range(a.firstId, a.lastId));
    assert.equal(new Set(everyReserved).size, everyReserved.length, 'no id is reserved by two areas');
});

test('each health area module has exactly its reserved ids and its final number of projects', () => {
    for (const expected of HEALTH_AREAS) {
        const module = authored.find((a) => a.area.name === expected.name).projects;
        assert.deepEqual(module.map((p) => p.id).sort(), expected.ids.map(idOf).sort(), `${expected.module} ids`);
        assert.equal(module.length, expected.moduleCount, `${expected.module} count`);
        assert.equal(projects.filter((p) => p.area === expected.name).length, expected.catalogCount, `${expected.name} in the catalog`);
    }
});

test('the catalog has 286 projects in the same 23 area tags', () => {
    assert.equal(projects.length, 286);
    assert.equal(new Set(projects.flatMap(areaTags)).size, 23);
    const added = projects.map((p) => p.id).filter((id) => Number(id.slice(5)) >= 237).sort();
    assert.deepEqual(added, range(237, 286).map(idOf));
});
