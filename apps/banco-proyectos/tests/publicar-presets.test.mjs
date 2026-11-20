// Saved filters of the journal finder: built-in presets plus the user's own, kept in localStorage.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PRESET_STORAGE_KEY, deleteUserPreset, loadUserPresets, saveUserPreset, saveUserPresets } from '../src/lib/publicar/presets.js';
import { ADVANCED_DEFAULTS, makePreset } from '../src/lib/publicar/table.js';

function storage(initial = null) {
    const values = new Map(initial === null ? [] : [[PRESET_STORAGE_KEY, initial]]);
    return { getItem: (key) => (values.has(key) ? values.get(key) : null), setItem: (key, value) => values.set(key, String(value)) };
}

test('the saved filters live under their own key', () => {
    assert.equal(PRESET_STORAGE_KEY, 'donde-publicar.presets.v1');
});

test('no stored value means no saved filters', () => {
    assert.deepEqual(loadUserPresets(storage()), []);
    assert.deepEqual(loadUserPresets(null), []);
});

test('unreadable or malformed storage is ignored instead of breaking the page', () => {
    assert.deepEqual(loadUserPresets(storage('not json')), []);
    assert.deepEqual(loadUserPresets(storage('{"label":"x"}')), []);
    assert.deepEqual(loadUserPresets({ getItem() { throw new Error('denied'); } }), []);
});

test('only entries with a label and a filters object are kept', () => {
    const good = { id: 'user-a', label: 'A', filters: { ccBy: true } };
    const stored = JSON.stringify([good, null, { label: 3, filters: {} }, { label: 'B' }, { label: 'C', filters: 'x' }]);
    assert.deepEqual(loadUserPresets(storage(stored)), [good]);
});

test('saving writes the list as JSON and survives a storage that refuses writes', () => {
    const store = storage();
    const preset = makePreset('Mi grupo', { ...ADVANCED_DEFAULTS, quartiles: ['Q1'] });
    saveUserPresets(store, [preset]);
    assert.deepEqual(loadUserPresets(store), [preset]);
    assert.doesNotThrow(() => saveUserPresets({ setItem() { throw new Error('full'); } }, [preset]));
    assert.doesNotThrow(() => saveUserPresets(null, [preset]));
});

test('saving a preset with the same name replaces the earlier one and keeps the order of the rest', () => {
    const first = makePreset('Uno', { quartiles: ['Q1'] });
    const second = makePreset('Dos', { ccBy: true });
    const again = makePreset('uno', { minAffinity: 70 });
    assert.equal(first.id, again.id);
    assert.deepEqual(saveUserPreset([first, second], again), [second, again]);
    assert.deepEqual(saveUserPreset([], first), [first]);
});

test('deleting a preset removes only that one', () => {
    const first = makePreset('Uno', { quartiles: ['Q1'] });
    const second = makePreset('Dos', { ccBy: true });
    assert.deepEqual(deleteUserPreset([first, second], first), [second]);
});
