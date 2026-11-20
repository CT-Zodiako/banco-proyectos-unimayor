import test from 'node:test';
import assert from 'node:assert/strict';
import { createProjectsLoader, loadProjects, loadedProjects } from '../src/lib/projects-loader.js';
import { projects } from '../src/data/projects/index.js';

const source = [{ id: 'a' }, { id: 'b' }];

test('nothing is loaded until load() is called, and peek() says so', () => {
    let calls = 0;
    const loader = createProjectsLoader(async () => { calls += 1; return { projects: source }; });
    assert.equal(loader.peek(), null);
    assert.equal(calls, 0);
});

test('load() resolves with the projects of the module, then peek() returns them synchronously', async () => {
    const loader = createProjectsLoader(async () => ({ projects: source }));
    assert.equal(await loader.load(), source);
    assert.equal(loader.peek(), source);
});

test('several callers share one download', async () => {
    let calls = 0;
    const loader = createProjectsLoader(async () => { calls += 1; return { projects: source }; });
    const [first, second] = await Promise.all([loader.load(), loader.load()]);
    await loader.load();
    assert.equal(first, second);
    assert.equal(calls, 1);
});

test('a failed download is not kept: the next load() tries again and can succeed', async () => {
    let calls = 0;
    const loader = createProjectsLoader(async () => {
        calls += 1;
        if (calls === 1) throw new Error('chunk failed');
        return { projects: source };
    });
    await assert.rejects(loader.load(), /chunk failed/);
    assert.equal(loader.peek(), null);
    assert.equal(await loader.load(), source);
    assert.equal(calls, 2);
});

test('the default loader serves the same 236 projects the scripts and tests import from src/data/projects', async () => {
    assert.equal(loadedProjects(), null);
    const loaded = await loadProjects();
    assert.equal(loaded, projects);
    assert.equal(loaded.length, 236);
    assert.equal(loadedProjects(), projects);
});
