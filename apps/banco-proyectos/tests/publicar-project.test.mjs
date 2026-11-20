// Project selection and the rows of the journal list, checked against the committed journal data.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { projectRows, requestedProjectId, visibleRows } from '../src/lib/publicar/project.js';
import { ADVANCED_DEFAULTS, affinity, assessment } from '../src/lib/publicar/table.js';

const data = JSON.parse(readFileSync(new URL('../src/data/publicar-data.json', import.meta.url), 'utf8'));
const journalsById = new Map(data.journals.map((journal) => [journal.id, journal]));
const project = data.projects[0];

test('the project comes from ?p= and, as the old page did, from the hash when there is no query', () => {
    assert.equal(requestedProjectId('?p=proj_001', ''), 'proj_001');
    assert.equal(requestedProjectId('', '#proj_002'), 'proj_002');
    assert.equal(requestedProjectId('?p=proj_001', '#proj_002'), 'proj_001');
    assert.equal(requestedProjectId('?p=', '#proj_002'), 'proj_002');
    assert.equal(requestedProjectId('?q=1', ''), '');
    assert.equal(requestedProjectId('', ''), '');
    assert.equal(requestedProjectId('?p=a%20b%26c', ''), 'a b&c');
});

test('the rows of a project keep the suggested order and carry the affinity and its assessment', () => {
    const rows = projectRows(project, journalsById, data.themes);
    assert.equal(rows.length, project.matches.length);
    assert.deepEqual(rows.map((row) => row.match.journal_id), project.matches.map((match) => match.journal_id));
    const [first] = rows;
    assert.deepEqual(first.affinity, affinity(project, first.match, first.journal));
    assert.deepEqual(first.assessment, assessment(project, first.match, first.journal, data.themes));
});

test('a match whose journal is unknown is skipped and no project gives no rows', () => {
    const odd = { ...project, matches: [{ journal_id: 'missing', fit: 'fuerte', themes: [] }, ...project.matches.slice(0, 1)] };
    assert.equal(projectRows(odd, journalsById, data.themes).length, 1);
    assert.deepEqual(projectRows(null, journalsById, data.themes), []);
    assert.deepEqual(projectRows(undefined, journalsById, data.themes), []);
});

test('visible rows are the filtered rows in the chosen order', () => {
    const rows = projectRows(project, journalsById, data.themes);
    const byAffinity = visibleRows(rows, ADVANCED_DEFAULTS, '', { key: 'affinity', dir: 'desc' });
    assert.equal(byAffinity.length, rows.length);
    const totals = byAffinity.map((row) => row.affinity.total);
    assert.deepEqual(totals, [...totals].sort((a, b) => b - a));
    const q1 = visibleRows(rows, { ...ADVANCED_DEFAULTS, quartiles: ['Q1'] }, '', { key: 'title', dir: 'asc' });
    assert.ok(q1.every((row) => row.journal.quartile === 'Q1'));
    const searched = visibleRows(rows, ADVANCED_DEFAULTS, rows[0].journal.title.toUpperCase(), { key: 'affinity', dir: 'desc' });
    assert.ok(searched.some((row) => row.journal.id === rows[0].journal.id));
});
