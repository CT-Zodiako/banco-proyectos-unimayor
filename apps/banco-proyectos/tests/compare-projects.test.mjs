// T17 of odd/tasks/mejora-visual.md: compare 2-3 projects side by side. Pure helpers of src/lib/compare-projects.js:
// the selection (the `cmp` param of /proyectos, the `ids` param of the comparison page, the session copy), the
// difference check and the row model of the comparison table (built from the real project data).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../src/data/projects/index.js';
import {
    COMPARE_PATH, COMPARE_STORAGE_KEY, FULL_MESSAGE, MAX_COMPARE, NOT_INFORMED,
    buildComparison, compareUrl, loadSelection, parseIds, resolveIds, saveSelection, serializeIds, splitDescription, toggleId,
    valuesDiffer, withCompareParam,
} from '../src/lib/compare-projects.js';

const byId = (id) => projects.find((project) => project.id === id);
const KNOWN = new Set(['proj_001', 'proj_002', 'proj_003', 'proj_004']);
const memoryStorage = (initial = {}) => {
    const data = { ...initial };
    return {
        data,
        getItem: (key) => (key in data ? data[key] : null),
        setItem: (key, value) => { data[key] = String(value); },
        removeItem: (key) => { delete data[key]; },
    };
};

test('constants: at most 3 projects, the route and the full-selection message', () => {
    assert.equal(MAX_COMPARE, 3);
    assert.equal(COMPARE_PATH, '/proyectos/comparar');
    assert.equal(FULL_MESSAGE, 'Máximo 3 proyectos. Quita uno para añadir otro.');
});

test('parseIds: comma list, trimmed, without blanks or repeated ids, in order; anything else is empty', () => {
    assert.deepEqual(parseIds('proj_001,proj_002'), ['proj_001', 'proj_002']);
    assert.deepEqual(parseIds(' proj_002 , ,proj_001,proj_002,'), ['proj_002', 'proj_001']);
    for (const empty of ['', null, undefined, 42, ',,,']) assert.deepEqual(parseIds(empty), []);
});

test('resolveIds: keeps the known ids, reports the unknown ones and how many valid ids were left out past the 3rd', () => {
    assert.deepEqual(resolveIds('proj_001,zzz,proj_002', KNOWN), { ids: ['proj_001', 'proj_002'], unknown: ['zzz'], extra: 0 });
    assert.deepEqual(resolveIds('proj_001,proj_002,proj_003,proj_004', KNOWN), { ids: ['proj_001', 'proj_002', 'proj_003'], unknown: [], extra: 1 });
    // unknown ids do not take a place of the 3: the limit counts valid projects only
    assert.deepEqual(resolveIds('nope,proj_001,proj_002,proj_003', KNOWN), { ids: ['proj_001', 'proj_002', 'proj_003'], unknown: ['nope'], extra: 0 });
    assert.deepEqual(resolveIds('a,b,a', KNOWN), { ids: [], unknown: ['a', 'b'], extra: 0 });
    assert.deepEqual(resolveIds(null, KNOWN), { ids: [], unknown: [], extra: 0 });
    assert.deepEqual(resolveIds('proj_001', ['proj_001']), { ids: ['proj_001'], unknown: [], extra: 0 });
});

test('serializeIds: the first 3 joined by commas', () => {
    assert.equal(serializeIds(['a', 'b', 'c', 'd']), 'a,b,c');
    assert.equal(serializeIds(['a']), 'a');
    assert.equal(serializeIds([]), '');
});

test('toggleId: adds, removes, never goes past 3 and does not change the list it receives', () => {
    const start = ['a'];
    assert.deepEqual(toggleId(start, 'b'), ['a', 'b']);
    assert.deepEqual(start, ['a']);
    assert.deepEqual(toggleId(['a', 'b'], 'a'), ['b']);
    assert.deepEqual(toggleId(['a', 'b', 'c'], 'd'), ['a', 'b', 'c']);
    assert.deepEqual(toggleId(['a', 'b', 'c'], 'b'), ['a', 'c']);
});

test('compareUrl: the shareable address of the comparison page, ids joined by commas', () => {
    assert.equal(compareUrl(['proj_001', 'proj_002']), '/proyectos/comparar?ids=proj_001,proj_002');
    assert.equal(compareUrl(['a', 'b', 'c', 'd']), '/proyectos/comparar?ids=a,b,c');
    assert.equal(compareUrl(['a b', 'c']), '/proyectos/comparar?ids=a%20b,c');
    assert.equal(compareUrl([]), '/proyectos/comparar');
});

test('withCompareParam: adds, replaces or removes cmp and keeps every other param of the catalog URL', () => {
    assert.equal(withCompareParam('/proyectos', ['a', 'b']), '/proyectos?cmp=a,b');
    assert.equal(withCompareParam('/proyectos?q=sensor&area=SBC-IoT&pagina=2', ['a', 'b']), '/proyectos?q=sensor&area=SBC-IoT&pagina=2&cmp=a,b');
    assert.equal(withCompareParam('/proyectos?cmp=a&q=x', ['b', 'c']), '/proyectos?cmp=b,c&q=x');
    assert.equal(withCompareParam('/proyectos?cmp=a&q=x', []), '/proyectos?q=x');
    assert.equal(withCompareParam('/proyectos?cmp=a', []), '/proyectos');
});

test('the session copy of the selection: save, load, empty list forgets it, bad storage is harmless', () => {
    const storage = memoryStorage();
    assert.deepEqual(loadSelection(storage), []);
    saveSelection(['proj_001', 'proj_002'], storage);
    assert.equal(storage.data[COMPARE_STORAGE_KEY], 'proj_001,proj_002');
    assert.deepEqual(loadSelection(storage), ['proj_001', 'proj_002']);
    saveSelection([], storage);
    assert.equal(COMPARE_STORAGE_KEY in storage.data, false);
    assert.deepEqual(loadSelection(storage), []);

    assert.deepEqual(loadSelection(memoryStorage({ [COMPARE_STORAGE_KEY]: 'a,b,c,d,e' })), ['a', 'b', 'c']);
    const broken = { getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); }, removeItem() { throw new Error('denied'); } };
    assert.deepEqual(loadSelection(broken), []);
    assert.doesNotThrow(() => saveSelection(['a'], broken));
    assert.doesNotThrow(() => saveSelection([], broken));
});

test('splitDescription: the Problema and Descripción paragraphs without their labels; missing parts are empty', () => {
    const full = splitDescription(byId('proj_001').descripcion);
    assert.match(full.problema, /^Los agricultores carecen de información/);
    assert.match(full.descripcion, /^Red de sensores distribuidos en cultivo/);
    // the 10 projects that only have a Problema paragraph
    const onlyProblem = splitDescription(byId('proj_041').descripcion);
    assert.match(onlyProblem.problema, /^Resumen Breve/);
    assert.equal(onlyProblem.descripcion, '');
    assert.deepEqual(splitDescription('Sin etiquetas'), { problema: 'Sin etiquetas', descripcion: '' });
});

test('valuesDiffer: text ignores case, accents and spaces; lists ignore order; one value never differs', () => {
    assert.equal(valuesDiffer(['Bajo costo', ' bajo  costo ', 'BAJO COSTO']), false);
    assert.equal(valuesDiffer(['Salud', 'Agro']), true);
    assert.equal(valuesDiffer(['Acción', 'accion']), false);
    assert.equal(valuesDiffer([['x', 'y'], ['y', 'x']]), false);
    assert.equal(valuesDiffer([['x'], ['x', 'y']]), true);
    assert.equal(valuesDiffer([[], []]), false);
    assert.equal(valuesDiffer([3, 3, 3]), false);
    assert.equal(valuesDiffer([3, 3, 4]), true);
    assert.equal(valuesDiffer(['solo']), false);
    assert.equal(valuesDiffer([]), false);
});

const ROW_IDS = {
    resumen: ['problema', 'descripcion'],
    clasificacion: ['area', 'sector', 'nivel', 'duracion', 'presupuesto'],
    alcance: ['hardware', 'software', 'habilidades'],
    objetivos: ['general', 'especificos'],
    impacto: ['aplicaciones'],
};
const rowOf = (model, id) => model.sections.flatMap((section) => section.rows).find((row) => row.id === id);

test('buildComparison: one column per project with its emoji, number, title and kicker', () => {
    const model = buildComparison([byId('proj_001'), byId('proj_002'), byId('proj_161')]);
    assert.deepEqual(model.columns.map((column) => column.id), ['proj_001', 'proj_002', 'proj_161']);
    assert.deepEqual(model.columns[0], {
        id: 'proj_001', emoji: '🌾', number: 1, kicker: 'Proyecto 1', title: 'Sistema de Monitoreo Agrícola Distribuido con MQTT',
    });
    assert.equal(model.columns[2].kicker, 'Proyecto 161');
    assert.equal(model.columns[2].emoji, '🦾');
});

test('buildComparison: the sections and rows are the real fields of the data, in the order of the page', () => {
    const model = buildComparison([byId('proj_001'), byId('proj_002')]);
    assert.deepEqual(model.sections.map((section) => section.id), Object.keys(ROW_IDS));
    assert.deepEqual(model.sections.map((section) => section.title), ['Resumen', 'Clasificación', 'Alcance', 'Objetivos', 'Impacto']);
    for (const section of model.sections) {
        assert.deepEqual(section.rows.map((row) => row.id), ROW_IDS[section.id], section.id);
        for (const row of section.rows) assert.equal(row.cells.length, 2, `${row.id} has one cell per project`);
    }
    assert.deepEqual(model.sections.flatMap((section) => section.rows.map((row) => row.label)), [
        'Problema', 'Descripción', 'Área', 'Sector', 'Nivel', 'Duración', 'Presupuesto', 'Hardware', 'Software', 'Habilidades',
        'Objetivo general', 'Objetivos específicos', 'Dónde se aplica',
    ]);
});

test('buildComparison: cells carry the values of each project', () => {
    const [one, two] = [byId('proj_001'), byId('proj_002')];
    const model = buildComparison([one, two]);
    assert.equal(rowOf(model, 'area').cells[0].text, 'SBC-IoT');
    assert.equal(rowOf(model, 'sector').cells[1].text, two.sector);
    assert.equal(rowOf(model, 'duracion').cells[0].text, one.duracion);
    assert.equal(rowOf(model, 'presupuesto').cells[0].text, one.presupuesto);
    assert.deepEqual(rowOf(model, 'nivel').cells.map((cell) => [cell.text, cell.rank]), [['Intermedio', 1], ['Avanzado', 3]]);
    assert.match(rowOf(model, 'problema').cells[0].text, /^Los agricultores carecen/);

    const hardware = rowOf(model, 'hardware').cells[0];
    assert.equal(hardware.count, one.hardware_tabla.length);
    assert.deepEqual(hardware.items, one.hardware_tabla.map((item) => item.componente));
    const software = rowOf(model, 'software').cells[1];
    assert.equal(software.count, two.software_tabla.length);
    assert.deepEqual(software.items, two.software_tabla.map((item) => item.herramienta));
    assert.deepEqual(rowOf(model, 'habilidades').cells[0].items, one.habilidades);
    assert.deepEqual(rowOf(model, 'aplicaciones').cells[0].items, one.aplicaciones);
});

test('buildComparison: objectives without the emoji, the label or the bullet', () => {
    const model = buildComparison([byId('proj_001'), byId('proj_161')]);
    assert.match(rowOf(model, 'general').cells[0].text, /^Desarrollar un sistema de monitoreo agrícola distribuido/);
    const specific = rowOf(model, 'especificos').cells[1];
    assert.equal(specific.items.length, 3);
    assert.ok(specific.items.every((item) => !item.startsWith('•') && !item.includes('Objetivos Específicos')));
    assert.match(specific.items[0], /^Adquirir dos canales de EMG/);
});

test('buildComparison: a value the data lacks says «No informado»', () => {
    assert.equal(NOT_INFORMED, 'No informado');
    const model = buildComparison([byId('proj_041'), byId('proj_001')]);
    const description = rowOf(model, 'descripcion');
    assert.deepEqual(description.cells[0], { text: NOT_INFORMED, empty: true });
    assert.equal(description.cells[1].empty, false);
    const bare = buildComparison([{ ...byId('proj_001'), habilidades: [], aplicaciones: undefined }, byId('proj_002')]);
    assert.deepEqual(rowOf(bare, 'habilidades').cells[0], { items: [], count: 0, empty: true });
    assert.equal(rowOf(bare, 'aplicaciones').cells[0].empty, true);
});

test('buildComparison: a row differs when the values of the projects are not all the same', () => {
    const model = buildComparison([byId('proj_001'), byId('proj_002'), byId('proj_003')]);
    // proj_001, 002 and 003 are all «SBC-IoT» and «Bajo costo»; their level, sector and parts are not all alike
    assert.equal(rowOf(model, 'area').differs, false);
    assert.equal(rowOf(model, 'presupuesto').differs, false);
    assert.equal(rowOf(model, 'nivel').differs, true);
    assert.equal(rowOf(model, 'sector').differs, true);
    assert.equal(rowOf(model, 'problema').differs, true);
    assert.equal(rowOf(model, 'hardware').differs, true);
});

test('buildComparison: hardware with the same components in another order is equal; one more component differs', () => {
    const base = byId('proj_001');
    const reversed = { ...base, id: 'x', hardware_tabla: [...base.hardware_tabla].reverse() };
    assert.equal(rowOf(buildComparison([base, reversed]), 'hardware').differs, false);
    const extra = { ...base, id: 'y', hardware_tabla: [...base.hardware_tabla, { componente: 'Otro', categoria: 'X', funcion: 'Y' }] };
    const model = buildComparison([base, extra]);
    assert.equal(rowOf(model, 'hardware').differs, true);
    assert.deepEqual(rowOf(model, 'hardware').cells.map((cell) => cell.count), [7, 8]);
});

test('buildComparison: the same project twice has no row that differs', () => {
    const model = buildComparison([byId('proj_001'), { ...byId('proj_001') }]);
    for (const section of model.sections) for (const row of section.rows) assert.equal(row.differs, false, row.id);
});

test('buildComparison: falls back to the display strings when a project has no tables', () => {
    const bare = { ...byId('proj_001'), hardware_tabla: undefined, software_tabla: undefined };
    const model = buildComparison([bare, byId('proj_002')]);
    assert.deepEqual(rowOf(model, 'hardware').cells[0].items, byId('proj_001').hardware);
    assert.equal(rowOf(model, 'software').cells[0].count, byId('proj_001').software.length);
});
