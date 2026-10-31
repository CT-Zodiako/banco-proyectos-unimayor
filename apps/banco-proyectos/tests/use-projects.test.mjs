import test from 'node:test';
import assert from 'node:assert/strict';
import { useProjects } from '../src/hooks/useProjects.js';
import { projects } from '../src/data/projects/index.js';

test('useProjects returns the local projects with the async-source shape', () => {
    const result = useProjects();
    assert.deepEqual(Object.keys(result).sort(), ['error', 'loading', 'projects']);
    assert.equal(result.projects, projects);
    assert.equal(result.loading, false);
    assert.equal(result.error, null);
    assert.ok(result.projects.length > 0);
});
