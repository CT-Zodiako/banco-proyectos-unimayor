import { test } from 'node:test';
import assert from 'node:assert/strict';
import { projects, newAreaProjects } from '../src/data/projects/index.js';
import { mockProjects } from '../src/data/mockProjects.js';
import { NEW_AREAS, AREA_MODULES, MIN_PROJECTS_PER_NEW_AREA } from '../src/data/projects/areas.js';
import { validateArea, validateProject, duplicates, titleKey } from '../scripts/projects-validation.mjs';

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
    assert.equal(projects.length, mockProjects.length + newAreaProjects.length);
    assert.deepEqual(projects.slice(0, mockProjects.length), mockProjects);
    assert.equal(mockProjects.length, 100);
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

test('Bioingeniería keeps 10 projects and none uses IoT connectivity', () => {
    const bio = projects.filter((p) => p.area === 'Bioingeniería');
    assert.equal(bio.length, 10);
    const connected = bio.filter((p) => IOT_RE.test(JSON.stringify([p.titulo, p.descripcion, p.hardware_tabla, p.software_tabla])));
    assert.deepEqual(connected.map((p) => p.id), []);
});

test('the two new areas exist with at least 10 projects each', () => {
    for (const name of ['Neurociencia con AIoT', 'AIoT para Discapacidad y Enfermedad']) {
        assert.ok(NEW_AREAS.some((a) => a.name === name), name);
        assert.ok(projects.filter((p) => p.area === name).length >= 10, name);
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
