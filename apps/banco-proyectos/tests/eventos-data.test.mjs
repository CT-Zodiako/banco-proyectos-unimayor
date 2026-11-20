// The committed event data (written by apps/eventos/pipeline/build.py) is what the React page reads.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const file = new URL('../public/data/eventos.json', import.meta.url);
const data = JSON.parse(readFileSync(file, 'utf8'));

test('the event data is plain JSON with the payload keys the page reads', () => {
    assert.deepEqual(Object.keys(data), ['generated', 'sources', 'topics', 'events', 'projects']);
    assert.match(data.generated, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(data.topics.length > 0);
    assert.ok(data.events.length > 0);
    assert.ok(data.projects.length > 0);
    assert.equal('sample' in data, false);
});

test('every event has the fields the cards and filters need', () => {
    const ids = new Set();
    for (const event of data.events) {
        assert.equal(typeof event.id, 'string');
        assert.equal(ids.has(event.id), false, `duplicate id ${event.id}`);
        ids.add(event.id);
        assert.equal(typeof event.title, 'string');
        assert.ok(['cfp', 'attend'].includes(event.kind));
        assert.ok(Array.isArray(event.topics));
        for (const topic of event.topics) assert.ok(data.topics.includes(topic), `unknown topic ${topic}`);
        assert.ok(['wikicfp', 'ccfddl', 'devpost', 'manual'].includes(event.source));
    }
});

test('the source counts add up to the events in the file', () => {
    const total = Object.values(data.sources).reduce((sum, n) => sum + n, 0);
    assert.equal(total, data.events.length);
});

test('projects carry the profile used for the affinity estimate', () => {
    for (const project of data.projects) {
        assert.equal(typeof project.id, 'string');
        assert.equal(typeof project.title, 'string');
        assert.ok(Array.isArray(project.topics));
        assert.ok(Array.isArray(project.keywords));
    }
});

test('no sample data ships with the app', () => {
    assert.equal(existsSync(new URL('../src/data/sample-data.js', import.meta.url)), false);
    assert.equal(existsSync(new URL('../src/data/eventos-sample.json', import.meta.url)), false);
});
