// Text, labels and link helpers of the journal finder components. Ported from the helpers of
// apps/donde-publicar/site/app.js, which built the DOM directly; the React components now get these values from
// pure functions in src/lib/publicar. Run: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    categoriesText, comparisonRows, compareSelectedText, countryLabel, dataSourcesText, filterChips, formatIssn, formatSjr, journalFacts,
    journalMeta, languageLabel, nextSort, numberOrNull, reviewLabel, safeUrl, templateHint, templateLinks, toggled,
} from '../src/lib/publicar/display.js';
import { ADVANCED_DEFAULTS } from '../src/lib/publicar/table.js';

test('external links only accept http and https', () => {
    assert.equal(safeUrl('https://example.org/a'), 'https://example.org/a');
    assert.equal(safeUrl('http://example.org/'), 'http://example.org/');
    assert.equal(safeUrl('javascript:alert(1)'), null);
    assert.equal(safeUrl('data:text/html,x'), null);
    assert.equal(safeUrl('not a url'), null);
    assert.equal(safeUrl(undefined), null);
    assert.equal(safeUrl(null), null);
});

test('languages and countries are shown in Spanish and fall back to the source value', () => {
    assert.equal(languageLabel('Spanish'), 'Español');
    assert.equal(languageLabel('Klingon'), 'Klingon');
    assert.equal(countryLabel('Narnia'), 'Narnia');
    assert.equal(countryLabel('Germany'), 'Alemania');
    assert.equal(countryLabel('Spain'), 'España');
    assert.equal(countryLabel('Türkiye'), 'Turquía');
    assert.equal(countryLabel(undefined), '');
});

test('ISSN and SJR formatting', () => {
    assert.equal(formatIssn('14338351'), '1433-8351');
    assert.equal(formatIssn('1433'), '1433');
    assert.equal(formatIssn(undefined), undefined);
    assert.equal(formatSjr(0.2), '0.200');
    assert.equal(formatSjr(14.227), '14.227');
    assert.equal(formatSjr(null), '—');
    assert.equal(formatSjr(undefined), '—');
});

test('the review process is summarized in one label', () => {
    assert.equal(reviewLabel('Double anonymous peer review'), 'Doble ciego');
    assert.equal(reviewLabel('Single anonymous peer review'), 'Simple ciego');
    assert.equal(reviewLabel('Open peer review'), 'Abierta');
    assert.equal(reviewLabel('Editorial review'), 'Editorial');
    assert.equal(reviewLabel('Unspecified peer review'), 'No especificada');
    assert.equal(reviewLabel(null), 'No especificada');
});

test('template hints tell apart several files of the same kind', () => {
    assert.equal(templateHint('Title_Page.docx', 1), 'portada');
    assert.equal(templateHint('response-to-reviewers.docx', 2), 'respuesta');
    assert.equal(templateHint('Review_form.docx', 2), 'revisión');
    assert.equal(templateHint('Manuscript_template.docx', 1), 'texto');
    assert.equal(templateHint('template.docx', 3), '3');
});

test('a single template is labelled by its kind and downloads in the same tab', () => {
    const journal = { title: 'Agro', templates: [{ url: 'https://agro.example/files/plantilla%20agro.docx', kind: 'Word' }] };
    assert.deepEqual(templateLinks(journal), [{
        url: 'https://agro.example/files/plantilla%20agro.docx', label: '⬇ Plantilla Word', title: 'Descargar plantilla agro.docx',
        ariaLabel: 'Descargar Plantilla Word de Agro (plantilla agro.docx)',
    }]);
});

test('several templates of one kind get a short hint, ZIP files are named ZIP, unsafe links are dropped', () => {
    const journal = { title: 'Agro', templates: [
        { url: 'https://agro.example/title-page-template.docx', kind: 'Word' },
        { url: 'https://agro.example/main-template.docx', kind: 'Word' },
        { url: 'https://agro.example/latex-template.zip', kind: 'Archivo ZIP' },
        { url: 'javascript:alert(1)', kind: 'LaTeX' },
    ] };
    assert.deepEqual(templateLinks(journal).map((link) => link.label), ['⬇ Word · portada', '⬇ Word · texto', '⬇ Plantilla (ZIP)']);
    assert.deepEqual(templateLinks({ title: 'Sin' }), []);
});

test('the meta line of a list result joins what is known about the journal', () => {
    assert.equal(journalMeta({ country: 'Cuba', languages: ['Spanish', 'English'], weeks_to_publication: 10, review: 'Double anonymous peer review', license: 'CC BY' }),
        'Cuba · Español, Inglés · 10 semanas · Doble ciego · CC BY');
    assert.equal(journalMeta({ country: 'Narnia', languages: [], weeks_to_publication: null, review: null, license: null }), 'Narnia · No especificada');
});

test('the facts of a catalog card', () => {
    assert.deepEqual(journalFacts({ quartile: 'Q2', sjr: 0.5, h_index: null, review: null, weeks_to_publication: 12, license: '', issns: ['11111111', '22222222'] }), [
        ['Publindex', 'A2'], ['SJR', '0.500'], ['Índice H', '—'], ['Revisión', 'No especificada'], ['Semanas a publicación', 12], ['Licencia', '—'], ['ISSN', '1111-1111 / 2222-2222'],
    ]);
    assert.equal(categoriesText({ categories: [{ name: 'Agronomy', quartile: 'Q2' }, { name: 'Soil' }] }), 'Categorías SCImago: Agronomy (Q2) · Soil');
    assert.equal(categoriesText({ categories: [] }), '');
});

test('sorting by a header keeps the direction of the active column flipping, and starts with its natural one', () => {
    assert.deepEqual(nextSort({ key: 'affinity', dir: 'desc' }, 'title'), { key: 'title', dir: 'asc' });
    assert.deepEqual(nextSort({ key: 'title', dir: 'asc' }, 'title'), { key: 'title', dir: 'desc' });
    assert.deepEqual(nextSort({ key: 'title', dir: 'desc' }, 'title'), { key: 'title', dir: 'asc' });
    assert.deepEqual(nextSort({ key: 'title', dir: 'asc' }, 'sjr'), { key: 'sjr', dir: 'desc' });
    assert.deepEqual(nextSort({ key: 'title', dir: 'asc' }, 'weeks'), { key: 'weeks', dir: 'asc' });
});

test('numeric filter inputs accept a decimal comma and reject blanks, text and negatives', () => {
    assert.equal(numberOrNull('0,20'), 0.2);
    assert.equal(numberOrNull(' 10 '), 10);
    assert.equal(numberOrNull('0'), 0);
    assert.equal(numberOrNull(''), null);
    assert.equal(numberOrNull('abc'), null);
    assert.equal(numberOrNull('-1'), null);
    assert.deepEqual([toggled(['a'], 'b'), toggled(['a', 'b'], 'a')], [['a', 'b'], ['b']]);
});

test('active filters become removable chips', () => {
    assert.deepEqual(filterChips(ADVANCED_DEFAULTS), []);
    const chips = filterChips({
        ...ADVANCED_DEFAULTS, minAffinity: 70, quartiles: ['Q1', 'Q3'], maxWeeks: 12, language: 'Spanish', region: 'colombia', minSjr: 0.2, minH: 10,
        reviews: ['double', 'single', 'open'], ccBy: true, fits: ['fuerte', 'tecnologia'],
    });
    assert.deepEqual(chips, [
        ['minAffinity', 'Afinidad ≥ 70 %'], ['quartiles', 'Q1 · A1, Q3 · B'], ['maxWeeks', 'Hasta 12 semanas'], ['language', 'Idioma: Español'],
        ['region', 'Revista colombiana'], ['minSjr', `SJR ≥ ${(0.2).toLocaleString('es-CO')}`], ['minH', 'Índice H ≥ 10'],
        ['reviews', 'Revisión: doble ciego, simple ciego, abierta'], ['ccBy', 'Solo CC BY'], ['fits', 'Sector + tecnología, Solo tecnología'],
    ]);
    assert.deepEqual(filterChips({ ...ADVANCED_DEFAULTS, region: 'iberoamerica' }), [['region', 'Revista iberoamericana']]);
});

test('the comparison marks the best value of each row and keeps unknown values as a dash', () => {
    const journals = [
        { id: 'a', title: 'A', quartile: 'Q1', sjr: 1.2, h_index: 29, weeks_to_publication: 5, review: 'Double anonymous peer review', license: 'CC BY', languages: ['English'], country: 'Iran', publisher: 'P' },
        { id: 'b', title: 'B', quartile: 'Q3', sjr: null, h_index: null, weeks_to_publication: null, review: null, license: null, languages: ['Spanish'], country: 'Cuba', publisher: '' },
    ];
    const rows = comparisonRows(journals, { a: { total: 60, parts: { topic: 20, level: 10, time: 15, language: 5, region: 10 } }, b: { total: 82, parts: { topic: 30, level: 22, time: 6, language: 10, region: 10 } } });
    assert.deepEqual(rows.map((row) => row.label), ['Afinidad estimada', 'Desglose de la afinidad', 'Cuartil · Publindex', 'SJR', 'Índice H', 'Semanas a publicación', 'Revisión · Licencia', 'Idiomas', 'País · Editorial']);
    const cell = (label, index) => rows.find((row) => row.label === label).cells[index];
    assert.deepEqual(cell('Afinidad estimada', 1), { text: '82 %', best: true });
    assert.deepEqual(cell('Afinidad estimada', 0), { text: '60 %', best: false });
    assert.deepEqual(cell('Cuartil · Publindex', 0), { text: 'Q1 · A1', best: true });
    assert.deepEqual(cell('SJR', 1), { text: '—', best: false });
    assert.deepEqual(cell('Revisión · Licencia', 1), { text: 'No especificada · —', best: false });
    assert.deepEqual(cell('País · Editorial', 0), { text: 'Iran · P', best: false });
    assert.equal(cell('Desglose de la afinidad', 0).text, 'Encaje temático 20/40 · Exigencia vs. nivel del proyecto 10/25 · Tiempo de publicación 15/15 · Acepta español 5/10 · Revista latinoamericana 10/10');
    assert.equal(rows.find((row) => row.label === 'Desglose de la afinidad').className, 'parts');
    assert.equal(comparisonRows([journals[0]], {}).find((row) => row.label === 'SJR').cells[0].best, false);
    assert.equal(comparisonRows([journals[0]], {}).find((row) => row.label === 'Afinidad estimada').cells[0].text, '—');
});

test('the compare count and the data sources are worded in Spanish', () => {
    assert.equal(compareSelectedText(0), '');
    assert.equal(compareSelectedText(1), ' · 1 seleccionada para comparar');
    assert.equal(compareSelectedText(3), ' · 3 seleccionadas para comparar');
    assert.equal(dataSourcesText({ generated: '2026-11-10', sources: { doaj_free_journals: 14512, diamond_ranked_journals: 4223 } }),
        `Datos generados el 2026-11-10: ${(14512).toLocaleString('es-CO')} revistas de DOAJ sin APC ni otros cobros, de las cuales ${(4223).toLocaleString('es-CO')} tienen cuartil en SCImago.`);
});
