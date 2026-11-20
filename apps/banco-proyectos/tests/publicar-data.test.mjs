// The committed journal data (written by apps/donde-publicar/pipeline/build.py) is what the React page reads.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (name) => JSON.parse(readFileSync(new URL(`../src/data/${name}`, import.meta.url), 'utf8'));
const data = read('publicar-data.json');
const catalog = read('publicar-catalog.json');

test('the journal data is plain JSON with the payload keys the page reads', () => {
    assert.deepEqual(Object.keys(data), ['generated', 'sources', 'themes', 'projects', 'journals']);
    assert.match(data.generated, /^\d{4}-\d{2}-\d{2}$/);
    assert.deepEqual(Object.keys(data.sources), ['doaj_free_journals', 'scimago_ranked_issns', 'diamond_ranked_journals', 'doaj_downloaded', 'scimago_edition']);
    assert.ok(data.projects.length > 0);
    assert.ok(data.journals.length > 0);
});

test('every project carries the profile and the matches the affinity estimate needs', () => {
    const journalIds = new Set(data.journals.map((journal) => journal.id));
    const projectIds = new Set();
    for (const project of data.projects) {
        assert.equal(projectIds.has(project.id), false, `duplicate id ${project.id}`);
        projectIds.add(project.id);
        assert.equal(typeof project.title, 'string');
        assert.ok(Array.isArray(project.themes.tech));
        assert.ok(Array.isArray(project.themes.domain));
        for (const theme of [...project.themes.tech, ...project.themes.domain]) assert.ok(theme in data.themes, `unknown theme ${theme}`);
        for (const match of project.matches) {
            assert.ok(journalIds.has(match.journal_id), `${project.id} matches unknown journal ${match.journal_id}`);
            assert.ok(['fuerte', 'tecnologia', 'sector'].includes(match.fit));
        }
    }
});

test('every journal has a quartile and the fields the cards and the table show', () => {
    for (const journal of [...data.journals, ...catalog]) {
        assert.equal(typeof journal.id, 'string');
        assert.equal(typeof journal.title, 'string');
        assert.ok(['Q1', 'Q2', 'Q3', 'Q4'].includes(journal.quartile));
        assert.ok(Array.isArray(journal.languages));
        assert.ok(Array.isArray(journal.categories));
        assert.ok(Array.isArray(journal.templates));
    }
});

test('the catalog is the on-demand list of every ranked diamond journal', () => {
    assert.ok(catalog.length >= data.journals.length);
    const ids = new Set(catalog.map((journal) => journal.id));
    assert.equal(ids.size, catalog.length);
});
