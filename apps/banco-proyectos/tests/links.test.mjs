import { test } from 'node:test';
import assert from 'node:assert/strict';
import { wherePublishUrl, PUBLISH_URL, LEGACY_PUBLISH_PATH, EVENTS_URL, LEGACY_EVENTS_PATH, eventsForProjectUrl, catalogUrl } from '../src/lib/links.js';

test('the journal finder is a route of this app', () => {
    assert.equal(PUBLISH_URL, '/donde-publicar');
});

test('the legacy static journal finder URL is kept as an alias', () => {
    assert.equal(LEGACY_PUBLISH_PATH, '/donde-publicar/index.html');
});

test('the journal finder link selects the project', () => {
    assert.equal(wherePublishUrl('proj_199'), '/donde-publicar?p=proj_199');
});

test('the project id is URL-encoded', () => {
    assert.equal(wherePublishUrl('a b&c'), '/donde-publicar?p=a%20b%26c');
});

test('the event finder is a route of this app', () => {
    assert.equal(EVENTS_URL, '/eventos');
});

test('the legacy static event finder URL is kept as an alias', () => {
    assert.equal(LEGACY_EVENTS_PATH, '/eventos/index.html');
});

test('the event finder link selects the project', () => {
    assert.equal(eventsForProjectUrl('proj_001'), '/eventos?p=proj_001');
    assert.equal(eventsForProjectUrl('a b&c'), '/eventos?p=a%20b%26c');
});

test('going back to the catalog keeps its filters', () => {
    assert.equal(catalogUrl('?area=Rob%C3%B3tica&nivel=Avanzado&pagina=2'), '/proyectos?area=Rob%C3%B3tica&nivel=Avanzado&pagina=2');
    assert.equal(catalogUrl(''), '/proyectos');
    assert.equal(catalogUrl(null), '/proyectos');
    assert.equal(catalogUrl('area=x'), '/proyectos');
    assert.equal(catalogUrl('?a=1#x//evil'), '/proyectos?a=1');
});
