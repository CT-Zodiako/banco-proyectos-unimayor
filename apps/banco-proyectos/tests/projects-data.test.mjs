import { test } from 'node:test';
import assert from 'node:assert/strict';
import { projects, newAreaProjects } from '../src/data/projects/index.js';
import { mockProjects } from '../src/data/mockProjects.js';
import { NEW_AREAS, MIN_PROJECTS_PER_NEW_AREA } from '../src/data/projects/areas.js';
import { validateArea, validateProject, duplicates, titleKey } from '../scripts/projects-validation.mjs';

const byArea = (name) => newAreaProjects.filter((p) => p.area === name);

test('every new area has at least the minimum number of valid projects', () => {
    const errors = NEW_AREAS.flatMap((area) => validateArea(byArea(area.name), area, MIN_PROJECTS_PER_NEW_AREA));
    assert.deepEqual(errors, []);
});

test('every new-area project belongs to a declared area', () => {
    const names = new Set(NEW_AREAS.map((a) => a.name));
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
