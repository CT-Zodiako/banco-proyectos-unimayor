import { test } from 'node:test';
import assert from 'node:assert/strict';
import { submissionGuide } from '../src/lib/submissionGuide.js';

test('event guide covers preparing and submitting a presentation without claiming requirements', () => {
    const guide = submissionGuide('event');
    assert.ok(guide.some((step) => /convocatoria/i.test(step)));
    assert.ok(guide.some((step) => /resumen/i.test(step)));
    assert.ok(guide.some((step) => /env[ií]/i.test(step)));
    assert.ok(guide.length > 2);
});

test('journal guide covers scope, manuscript and submission without claiming requirements', () => {
    const guide = submissionGuide('journal');
    assert.ok(guide.some((step) => /alcance/i.test(step)));
    assert.ok(guide.some((step) => /manuscrito/i.test(step)));
    assert.ok(guide.some((step) => /env[ií]/i.test(step)));
    assert.ok(guide.length > 2);
});

test('unsupported types receive no guide', () => {
    assert.deepEqual(submissionGuide('other'), []);
});
