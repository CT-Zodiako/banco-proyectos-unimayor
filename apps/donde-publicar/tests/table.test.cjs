// Tests for site/table.js (pure table logic). Run: node --test tests/
const { test } = require('node:test');
const assert = require('node:assert/strict');
const T = require('../site/table.js');

const j = (id, quartile, extra = {}) => ({
    id, title: `Revista ${id}`, quartile, sjr: null, h_index: null, weeks_to_publication: null,
    languages: ['English'], publisher: 'Editorial', country: 'Colombia', categories: [], ...extra,
});
const row = (journal, fit = 'fuerte') => ({ match: { journal_id: journal.id, fit }, journal });

const rows = [
    row(j('a', 'Q3', { sjr: 0.2, weeks_to_publication: 12, title: 'Frontiers in Biomedical Technologies', country: 'Iran' })),
    row(j('b', 'Q1', { sjr: 1.2, weeks_to_publication: 5, title: 'Visual Computing', h_index: 29 })),
    row(j('c', 'Q4', { sjr: 0.13, title: 'Revista Facultad Nacional de Salud Pública', languages: ['Spanish'] }), 'tecnologia'),
    row(j('d', 'Q1', { sjr: 3.4, weeks_to_publication: 30, title: 'Visual Intelligence',
        categories: [{ name: 'Computer Vision and Pattern Recognition', quartile: 'Q1' }] }), 'tecnologia'),
];
const ids = (list) => list.map((r) => r.journal.id);

test('no filters keep every row in the original order', () => {
    assert.deepEqual(ids(T.filterRows(rows, {})), ['a', 'b', 'c', 'd']);
});

test('quartile, fit and Spanish filters combine with AND', () => {
    assert.deepEqual(ids(T.filterRows(rows, { quartile: 'Q1' })), ['b', 'd']);
    assert.deepEqual(ids(T.filterRows(rows, { fit: 'tecnologia' })), ['c', 'd']);
    assert.deepEqual(ids(T.filterRows(rows, { quartile: 'Q1', fit: 'fuerte' })), ['b']);
    assert.deepEqual(ids(T.filterRows(rows, { spanish: true })), ['c']);
});

test('search matches title, country and categories ignoring case and accents', () => {
    assert.deepEqual(ids(T.filterRows(rows, { query: 'PUBLICA salud' })), ['c']);
    assert.deepEqual(ids(T.filterRows(rows, { query: 'iran' })), ['a']);
    assert.deepEqual(ids(T.filterRows(rows, { query: 'pattern recognition' })), ['d']);
});

test('sorting by quartile puts the best quartile first and breaks ties by SJR', () => {
    assert.deepEqual(ids(T.sortRows(rows, { key: 'quartile', dir: 'asc' })), ['d', 'b', 'a', 'c']);
    assert.deepEqual(ids(T.sortRows(rows, { key: 'quartile', dir: 'desc' })), ['c', 'a', 'b', 'd']);
});

test('numeric sorts keep missing values last in both directions', () => {
    assert.deepEqual(ids(T.sortRows(rows, { key: 'weeks', dir: 'asc' })), ['b', 'a', 'd', 'c']);
    assert.deepEqual(ids(T.sortRows(rows, { key: 'weeks', dir: 'desc' })), ['d', 'a', 'b', 'c']);
    assert.deepEqual(ids(T.sortRows(rows, { key: 'h_index', dir: 'desc' })), ['b', 'a', 'c', 'd']);
});

test('relevance sort keeps the suggested order and never mutates the input', () => {
    const copy = rows.slice();
    assert.deepEqual(ids(T.sortRows(rows, { key: 'relevance', dir: 'asc' })), ['a', 'b', 'c', 'd']);
    T.sortRows(rows, { key: 'sjr', dir: 'desc' });
    assert.deepEqual(rows, copy);
});

test('comparison holds at most three journals and toggles membership', () => {
    assert.deepEqual(T.toggleCompare([], 'a'), ['a']);
    assert.deepEqual(T.toggleCompare(['a', 'b'], 'a'), ['b']);
    assert.deepEqual(T.toggleCompare(['a', 'b', 'c'], 'd'), ['a', 'b', 'c']);
    assert.equal(T.MAX_COMPARE, 3);
});

// ---------- Affinity (estimated fit, not an acceptance probability) ----------
const project = (level, domain, tech) => ({ level, themes: { domain, tech: ['computacion_general', 'tecnologia_aplicada', ...tech] } });
const prosthesis = project('Intermedio-Avanzado', ['salud'], ['bioingenieria', 'electronica', 'salud_digital']);

test('affinity adds five explained parts up to 100', () => {
    const journal = j('cuba', 'Q3', { languages: ['Spanish'], weeks_to_publication: 10, country: 'Cuba' });
    const a = T.affinity(prosthesis, { fit: 'fuerte', themes: ['salud', 'salud_digital', 'tecnologia_aplicada'] }, journal);
    assert.deepEqual(a.parts, { topic: 27, level: 22, time: 12, language: 10, region: 10 });
    assert.equal(a.total, 81);
    assert.deepEqual(T.AFFINITY_MAX, { topic: 40, level: 25, time: 15, language: 10, region: 10 });
});

test('topic fit: a technology-only journal earns only the technology half', () => {
    const journal = j('tech', 'Q1', { weeks_to_publication: 5, country: 'Singapore' });
    const a = T.affinity(prosthesis, { fit: 'tecnologia', themes: ['electronica'] }, journal);
    assert.equal(a.parts.topic, 7);
    assert.equal(a.parts.level, 10);
    assert.equal(a.parts.time, 15);
    assert.equal(a.parts.language, 5);
    assert.equal(a.parts.region, 5);
});

test('topic fit without sector themes uses technology for the whole 40', () => {
    const software = project('Intermedio', [], ['software']);
    assert.equal(T.affinity(software, { fit: 'tecnologia', themes: ['software'] }, j('s', 'Q2')).parts.topic, 40);
});

test('applied technology alone counts half of the technology share', () => {
    const a = T.affinity(prosthesis, { fit: 'fuerte', themes: ['salud', 'tecnologia_aplicada'] }, j('x', 'Q4'));
    assert.equal(a.parts.topic, 30);
});

test('quartile demand depends on the project level', () => {
    const level = (lvl, q) => T.affinity(project(lvl, ['salud'], ['ia']), { fit: 'fuerte', themes: ['salud', 'ia'] }, j('q', q)).parts.level;
    assert.deepEqual(['Q1', 'Q2', 'Q3', 'Q4'].map((q) => level('Intermedio', q)), [5, 12, 20, 25]);
    assert.deepEqual(['Q1', 'Q2', 'Q3', 'Q4'].map((q) => level('Avanzado', q)), [15, 20, 24, 25]);
});

test('publication time, language and region scales', () => {
    const part = (key, extra) => T.affinity(prosthesis, { fit: 'fuerte', themes: ['salud'] }, j('t', 'Q3', extra)).parts[key];
    assert.deepEqual([8, 12, 16, 24, 36, 53, null].map((w) => part('time', { weeks_to_publication: w })), [15, 12, 10, 7, 4, 2, 6]);
    assert.equal(part('language', { languages: ['Portuguese', 'English'] }), 7);
    assert.equal(part('language', { languages: ['Ukrainian'] }), 0);
    assert.equal(part('region', { country: 'Spain' }), 10);
    assert.equal(part('region', { country: 'Germany' }), 5);
});

test('rows can be sorted by affinity with the highest first', () => {
    const scored = rows.map((r, i) => ({ ...r, affinity: { total: [70, 90, 55, 90][i] } }));
    assert.deepEqual(ids(T.sortRows(scored, { key: 'affinity', dir: 'desc' })), ['b', 'd', 'a', 'c']);
});

test('best values in a comparison: best quartile, fewest weeks, highest SJR and H index', () => {
    const best = T.compareBest([rows[0].journal, rows[1].journal, rows[2].journal]);
    assert.deepEqual(best, { quartile: ['b'], weeks: ['b'], sjr: ['b'], h_index: ['b'], affinity: [] });
    assert.deepEqual(T.compareBest([j('x', 'Q2'), j('y', 'Q2')]).quartile, ['x', 'y']);
    assert.deepEqual(T.compareBest([j('x', 'Q2')]).weeks, []);
});

// ---------- Advanced filters (all combined with AND) ----------
const adv = [
    { match: { fit: 'fuerte' }, affinity: { total: 84 }, journal: j('p', 'Q3', { weeks_to_publication: 12, languages: ['English'], country: 'Iran', sjr: 0.19, h_index: 11, review: 'Double anonymous peer review', license: 'CC BY-NC' }) },
    { match: { fit: 'fuerte' }, affinity: { total: 81 }, journal: j('q', 'Q3', { weeks_to_publication: 10, languages: ['Spanish'], country: 'Cuba', sjr: 0.15, h_index: 5, review: 'Double anonymous peer review', license: 'CC BY-NC-SA' }) },
    { match: { fit: 'fuerte' }, affinity: { total: 78 }, journal: j('r', 'Q4', { weeks_to_publication: 24, languages: ['Spanish'], country: 'Colombia', sjr: 0.13, h_index: 4, review: 'Double anonymous peer review, Open peer review', license: 'CC BY, CC BY-NC-ND' }) },
    { match: { fit: 'tecnologia' }, affinity: { total: 68 }, journal: j('s', 'Q1', { weeks_to_publication: 5, languages: ['English', 'Portuguese'], country: 'Singapore', sjr: 1.19, h_index: 29, review: 'Single anonymous peer review', license: 'CC BY' }) },
];

test('advanced numeric filters: minimum affinity, maximum weeks, minimum SJR and H index', () => {
    assert.deepEqual(ids(T.filterRows(adv, { minAffinity: 80 })), ['p', 'q']);
    assert.deepEqual(ids(T.filterRows(adv, { maxWeeks: 12 })), ['p', 'q', 's']);
    assert.deepEqual(ids(T.filterRows(adv, { minSjr: 0.15 })), ['p', 'q', 's']);
    assert.deepEqual(ids(T.filterRows(adv, { minH: 10 })), ['p', 's']);
});

test('advanced language and region filters', () => {
    assert.deepEqual(ids(T.filterRows(adv, { language: 'Portuguese' })), ['s']);
    assert.deepEqual(ids(T.filterRows(adv, { language: 'Spanish' })), ['q', 'r']);
    assert.deepEqual(ids(T.filterRows(adv, { region: 'iberoamerica' })), ['q', 'r']);
    assert.deepEqual(ids(T.filterRows(adv, { region: 'colombia' })), ['r']);
});

test('review types match any of the journal review processes; CC BY matches the license list', () => {
    assert.deepEqual(T.reviewTypes('Double anonymous peer review, Open peer review'), ['double', 'open']);
    assert.deepEqual(T.reviewTypes('Unspecified peer review'), ['unspecified']);
    assert.deepEqual(ids(T.filterRows(adv, { reviews: ['open', 'single'] })), ['r', 's']);
    assert.deepEqual(ids(T.filterRows(adv, { ccBy: true })), ['r', 's']);
});

test('advanced and quick filters cross with AND', () => {
    assert.deepEqual(ids(T.filterRows(adv, { spanish: true, maxWeeks: 12, minAffinity: 80 })), ['q']);
    assert.deepEqual(ids(T.filterRows(adv, { fit: 'fuerte', reviews: ['double'], minH: 5 })), ['p', 'q']);
});

test('active advanced filters are counted for the button badge', () => {
    assert.equal(T.countAdvanced({}), 0);
    assert.equal(T.countAdvanced(T.ADVANCED_DEFAULTS), 0);
    assert.equal(T.countAdvanced({ ...T.ADVANCED_DEFAULTS, minAffinity: 70, reviews: ['double'], ccBy: true }), 3);
});

// ---------- Design 04: multi-select pills, presets, affinity level ----------
test('quartile and fit pills accept several values (empty means all)', () => {
    assert.deepEqual(ids(T.filterRows(adv, { quartiles: ['Q1', 'Q4'] })), ['r', 's']);
    assert.deepEqual(ids(T.filterRows(adv, { quartiles: [] })), ['p', 'q', 'r', 's']);
    assert.deepEqual(ids(T.filterRows(adv, { fits: ['tecnologia'] })), ['s']);
    assert.deepEqual(ids(T.filterRows(adv, { fits: ['fuerte', 'tecnologia'] })), ['p', 'q', 'r', 's']);
    assert.equal(T.countAdvanced({ quartiles: ['Q1'], fits: ['fuerte'] }), 2);
});

test('built-in presets set the filters a student group or a research group needs', () => {
    assert.deepEqual(T.PRESETS.map((p) => p.id), ['semillero', 'grupo']);
    const semillero = T.applyPreset(T.PRESETS[0]);
    assert.deepEqual(semillero.quartiles, ['Q3', 'Q4']);
    assert.equal(semillero.language, 'Spanish');
    assert.equal(semillero.minAffinity, 0);
    assert.deepEqual(ids(T.filterRows(adv, semillero)), ['q', 'r']);
    assert.deepEqual(ids(T.filterRows(adv, T.applyPreset(T.PRESETS[1]))), ['s']);
});

test('a saved preset keeps only advanced filter values and restores them on top of the defaults', () => {
    const saved = T.makePreset('Mis filtros', { ...T.ADVANCED_DEFAULTS, minAffinity: 70, reviews: ['double'], query: 'ignored' });
    assert.equal(saved.label, 'Mis filtros');
    assert.equal('query' in saved.filters, false);
    assert.deepEqual(saved.filters, { minAffinity: 70, reviews: ['double'] });
    assert.deepEqual(T.applyPreset(saved), { ...T.ADVANCED_DEFAULTS, minAffinity: 70, reviews: ['double'] });
    assert.throws(() => T.makePreset('   ', {}), /nombre/);
});

test('affinity levels color the ring: high from 80, medium from 65, low below', () => {
    assert.deepEqual([84, 80, 79, 65, 64, 31].map(T.affinityLevel), ['high', 'high', 'mid', 'mid', 'low', 'low']);
});

test('the comparison marks the highest affinity when scores are given', () => {
    const best = T.compareBest([j('x', 'Q2'), j('y', 'Q3')], { x: 60, y: 82 });
    assert.deepEqual(best.affinity, ['y']);
    assert.deepEqual(T.compareBest([j('x', 'Q2'), j('y', 'Q3')]).affinity, []);
});

// ---------- Assessment: what the journal meets, misses, and what to do ----------
const LABELS = { salud: 'Salud y medicina', salud_digital: 'Salud digital', ia: 'Inteligencia artificial',
    electronica: 'Electrónica y control', bioingenieria: 'Bioingeniería', tecnologia_aplicada: 'Tecnología aplicada' };
const texts = (list) => list.map((x) => x.text);
const keys = (list) => list.map((x) => x.key);

test('assessment lists what a well-fitting journal meets', () => {
    const journal = j('cuba', 'Q3', { languages: ['Spanish', 'English'], weeks_to_publication: 10, country: 'Cuba',
        review: 'Double anonymous peer review', templates: [{ url: 'https://x/t.docx' }] });
    const a = T.assessment(prosthesis, { fit: 'fuerte', themes: ['salud', 'salud_digital'] }, journal, LABELS);
    assert.deepEqual(texts(a.meets), [
        'Publicación gratuita y lectura libre (acceso abierto diamante, verificado en DOAJ)',
        'Indexada en SCImago (Q3), homologable a Publindex B',
        'Su alcance cubre el sector del proyecto: Salud y medicina',
        'Cubre tecnologías del proyecto: Salud digital',
        'Un Q3 es una exigencia alcanzable para un proyecto de nivel Intermedio-Avanzado',
        'Publica en 10 semanas',
        'Acepta artículos en español',
        'Revista iberoamericana (Cuba)',
        'Ofrece plantilla descargable',
    ]);
    assert.deepEqual(a.misses, []);
    assert.deepEqual(a.tips, [
        'Use la plantilla de la revista desde el primer borrador.',
        'Retire nombres, afiliaciones y agradecimientos del manuscrito: la revisión es doble ciego.',
        'Revise el alcance y las instrucciones para autores antes de enviar.',
    ]);
});

test('assessment explains what a demanding, English-only, slow journal misses and recommends', () => {
    const journal = j('q1', 'Q1', { languages: ['English'], weeks_to_publication: 30, country: 'Germany' });
    const a = T.assessment(prosthesis, { fit: 'tecnologia', themes: ['electronica'] }, journal, LABELS);
    assert.deepEqual(keys(a.meets), ['access', 'indexed', 'tech']);
    assert.deepEqual(texts(a.misses), [
        'Su alcance no cubre el sector del proyecto (Salud y medicina)',
        'Un Q1 es muy exigente para un proyecto de nivel Intermedio-Avanzado',
        'Tarda 30 semanas en publicar',
        'No acepta español: el artículo debe escribirse en inglés',
    ]);
    assert.deepEqual(a.tips, [
        'Presente el trabajo por su aporte tecnológico (Electrónica y control): es lo que la revista cubre, no el sector Salud y medicina.',
        'Para un Q1 prepare resultados experimentales sólidos, comparación con el estado del arte y validación con datos reales; si el proyecto aún es un prototipo, empiece por una revista Q3 o Q4.',
        'Redacte el artículo en inglés y pida una revisión del idioma antes de enviarlo.',
        'Envíe con anticipación: si necesita la publicación para un requisito de grado, prefiera revistas de 16 semanas o menos.',
        'No hay plantilla descargable: siga el formato de las instrucciones para autores.',
        'Revise el alcance y las instrucciones para autores antes de enviar.',
    ]);
});

test('assessment boundaries: level 15 points, 16 weeks, unknown time, applied technology only, sector only', () => {
    const advanced = project('Avanzado', ['salud'], ['ia']);
    const q1 = T.assessment(advanced, { fit: 'fuerte', themes: ['salud', 'ia'] }, j('a', 'Q1', { weeks_to_publication: 16 }), LABELS);
    assert.ok(keys(q1.meets).includes('level'));
    assert.ok(keys(q1.meets).includes('time'));
    const unknown = T.assessment(advanced, { fit: 'fuerte', themes: ['salud'] }, j('b', 'Q2'), LABELS);
    assert.deepEqual(texts(unknown.misses), [
        'No cubre las tecnologías del proyecto (Inteligencia artificial)',
        'No informa el tiempo de publicación',
        'No acepta español: el artículo debe escribirse en inglés',
    ]);
    assert.equal(unknown.tips[0], 'Presente el trabajo como una aplicación en Salud y medicina y explique la tecnología para lectores no especialistas.');
    assert.ok(unknown.tips.includes('Consulte en el sitio de la revista el tiempo medio de revisión antes de enviar.'));
    const applied = T.assessment(advanced, { fit: 'tecnologia', themes: ['tecnologia_aplicada'] }, j('c', 'Q4'), LABELS);
    assert.ok(texts(applied.misses).includes('Solo cubre tecnología aplicada en general, no las tecnologías del proyecto (Inteligencia artificial)'));
    assert.equal(applied.tips[0], 'Lea el alcance de la revista antes de enviar: el encaje temático es bajo.');
});

test('assessment falls back to theme keys without labels', () => {
    const a = T.assessment(project('Intermedio', [], ['ia']), { fit: 'tecnologia', themes: ['ia'] }, j('k', 'Q4'));
    assert.ok(texts(a.meets).includes('Cubre tecnologías del proyecto: ia'));
});

test('data status names the catalog date, the DOAJ download day and the SCImago edition', () => {
    assert.equal(T.dataStatus({ generated: '2026-11-09', sources: { doaj_downloaded: '2026-11-09', scimago_edition: 2025 } }),
        'Catálogo generado el 2026-11-09. DOAJ: 2026-11-09 · SCImago: edición 2025.');
});

test('data status says which source dates were not recorded (catalogs built before they were)', () => {
    assert.equal(T.dataStatus({ generated: '2026-10-31', sources: { doaj_free_journals: 14498 } }),
        'Catálogo generado el 2026-10-31. DOAJ: fecha no registrada · SCImago: edición no registrada.');
    assert.equal(T.dataStatus({ sources: {} }), 'Fecha de generación no disponible.');
    assert.equal(T.dataStatus({}), 'Fecha de generación no disponible.');
});
