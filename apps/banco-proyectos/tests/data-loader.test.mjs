// The big JSON files are static files under /data/ fetched at runtime; this is the pure part of the shared loader.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createDataLoader, dataUrl, DATA_FILES } from '../src/lib/data-loader.js';

const okResponse = (body) => ({ ok: true, status: 200, json: async () => body });

test('dataUrl puts the file under <base>/data/ whatever the base looks like', () => {
    assert.equal(dataUrl('/', 'eventos.json'), '/data/eventos.json');
    assert.equal(dataUrl('/banco/', 'eventos.json'), '/banco/data/eventos.json');
    assert.equal(dataUrl('/banco', 'eventos.json'), '/banco/data/eventos.json');
    assert.equal(dataUrl('./', 'eventos.json'), './data/eventos.json');
    assert.equal(dataUrl('', 'eventos.json'), '/data/eventos.json');
});

test('the three data files are named as they are served', () => {
    assert.deepEqual(DATA_FILES, {
        publicar: 'publicar-data.json',
        catalog: 'publicar-catalog.json',
        eventos: 'eventos.json',
    });
});

test('load fetches the file once and every caller shares the same promise', async () => {
    const urls = [];
    const loader = createDataLoader(async (url) => { urls.push(url); return okResponse({ n: 1 }); }, '/');
    const first = loader.load('eventos.json');
    const second = loader.load('eventos.json');
    assert.equal(first, second);
    assert.deepEqual(await first, { n: 1 });
    assert.deepEqual(await loader.load('eventos.json'), { n: 1 });
    assert.deepEqual(urls, ['/data/eventos.json']);
});

test('each file is fetched on its own', async () => {
    const urls = [];
    const loader = createDataLoader(async (url) => { urls.push(url); return okResponse(url); }, '/x/');
    assert.equal(await loader.load('a.json'), '/x/data/a.json');
    assert.equal(await loader.load('b.json'), '/x/data/b.json');
    assert.deepEqual(urls, ['/x/data/a.json', '/x/data/b.json']);
});

test('a network failure rejects and is not cached, so a retry fetches again', async () => {
    let calls = 0;
    const loader = createDataLoader(async () => {
        calls += 1;
        if (calls === 1) throw new Error('offline');
        return okResponse({ ok: true });
    }, '/');
    await assert.rejects(loader.load('eventos.json'), /offline/);
    assert.deepEqual(await loader.load('eventos.json'), { ok: true });
    assert.equal(calls, 2);
});

test('an HTTP error status rejects with the status and is not cached', async () => {
    let status = 404;
    const loader = createDataLoader(async () => (status === 200 ? okResponse([1]) : { ok: false, status, json: async () => ({}) }), '/');
    await assert.rejects(loader.load('missing.json'), /404/);
    status = 200;
    assert.deepEqual(await loader.load('missing.json'), [1]);
});

test('a body that is not JSON rejects and is not cached', async () => {
    let bad = true;
    const loader = createDataLoader(async () => ({ ok: true, status: 200, json: async () => { if (bad) throw new SyntaxError('Unexpected token <'); return [2]; } }), '/');
    await assert.rejects(loader.load('eventos.json'), SyntaxError);
    bad = false;
    assert.deepEqual(await loader.load('eventos.json'), [2]);
});

test('a failed load leaves another file that is still cached alone', async () => {
    let calls = 0;
    const loader = createDataLoader(async (url) => { calls += 1; if (url.endsWith('bad.json')) throw new Error('x'); return okResponse(url); }, '/');
    await loader.load('good.json');
    await assert.rejects(loader.load('bad.json'));
    await loader.load('good.json');
    assert.equal(calls, 2);
});
