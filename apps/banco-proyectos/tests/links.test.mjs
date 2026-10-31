import { test } from 'node:test';
import assert from 'node:assert/strict';
import { wherePublishUrl } from '../src/lib/links.js';

test('the journal finder link selects the project', () => {
    assert.equal(wherePublishUrl('proj_199'), '/donde-publicar/index.html?p=proj_199');
});

test('the project id is URL-encoded', () => {
    assert.equal(wherePublishUrl('a b&c'), '/donde-publicar/index.html?p=a%20b%26c');
});
