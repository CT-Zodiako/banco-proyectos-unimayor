import { test } from 'node:test';
import assert from 'node:assert/strict';
import { wherePublishUrl, EVENTS_URL, eventsForProjectUrl } from '../src/lib/links.js';

test('the journal finder link selects the project', () => {
    assert.equal(wherePublishUrl('proj_199'), '/donde-publicar/index.html?p=proj_199');
});

test('the project id is URL-encoded', () => {
    assert.equal(wherePublishUrl('a b&c'), '/donde-publicar/index.html?p=a%20b%26c');
});

test('the event finder link points to its static page', () => {
    assert.equal(EVENTS_URL, '/eventos/index.html');
});

test('the event finder link selects the project', () => {
    assert.equal(eventsForProjectUrl('proj_001'), '/eventos/index.html?p=proj_001');
    assert.equal(eventsForProjectUrl('a b&c'), '/eventos/index.html?p=a%20b%26c');
});
