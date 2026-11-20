import test from 'node:test';
import assert from 'node:assert/strict';
import { useProjects } from '../src/hooks/useProjects.js';
import { loadProjects } from '../src/lib/projects-loader.js';
import { projects } from '../src/data/projects/index.js';

// useProjects used to return the bundled list synchronously. It now loads the data chunk on demand (a React hook:
// its states, retry and the pages that wait on it are covered in tests/dom/projects-loading.test.jsx); this pins what
// can be checked without React: the hook exists and the chunk serves the very objects of src/data/projects.
test('useProjects is a hook that reads the on-demand projects chunk', async () => {
    assert.equal(typeof useProjects, 'function');
    assert.equal(useProjects.length, 0);
    assert.equal(await loadProjects(), projects);
    assert.ok(projects.length > 0);
});
