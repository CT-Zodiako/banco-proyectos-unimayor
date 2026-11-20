// "Guardar" of a journal result, on top of the shared Mis oportunidades store (src/lib/opportunities.js).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { favoriteLabel, favoriteSnapshot, toggleFavorite } from '../src/lib/publicar/favorites.js';
import { STORAGE_KEY, addOpportunity, readOpportunities } from '../src/lib/opportunities.js';

function storage(initial = null) {
    const values = new Map(initial === null ? [] : [[STORAGE_KEY, initial]]);
    return { getItem: (key) => (values.has(key) ? values.get(key) : null), setItem: (key, value) => values.set(key, String(value)) };
}
const journal = { id: '7', title: 'Agro Engineering', url: 'https://agro.example/', author_instructions_url: 'https://agro.example/authors' };

test('saving stores a journal item in the shared favorites with its instructions link', () => {
    const store = storage();
    assert.equal(toggleFavorite(store, journal), true);
    assert.deepEqual(readOpportunities(store), [{ type: 'journal', id: '7', title: 'Agro Engineering', url: 'https://agro.example/', instructions: 'https://agro.example/authors' }]);
    assert.deepEqual(favoriteSnapshot(store, '7'), { available: true, saved: true });
});

test('toggling a saved journal removes it and leaves the other favorites alone', () => {
    const store = storage();
    addOpportunity(store, { type: 'event', id: '7', title: 'Evento con el mismo id' });
    toggleFavorite(store, journal);
    assert.equal(toggleFavorite(store, journal), false);
    assert.deepEqual(readOpportunities(store).map((item) => item.type), ['event']);
    assert.deepEqual(favoriteSnapshot(store, '7'), { available: true, saved: false });
});

test('an event with the same id does not count as a saved journal', () => {
    const store = storage();
    addOpportunity(store, { type: 'event', id: '7', title: 'Evento' });
    assert.equal(favoriteSnapshot(store, '7').saved, false);
});

test('unreadable favorites make the button unavailable and a failed write leaves the data untouched', () => {
    assert.deepEqual(favoriteSnapshot(storage('not json'), '7'), { available: false, saved: false });
    assert.deepEqual(favoriteSnapshot(null, '7'), { available: false, saved: false });
    const broken = storage('{"unknown":true}');
    assert.throws(() => toggleFavorite(broken, journal));
    assert.equal(broken.getItem(STORAGE_KEY), '{"unknown":true}');
});

test('the button label tells the state', () => {
    assert.equal(favoriteLabel({ available: true, saved: false }), 'Guardar');
    assert.equal(favoriteLabel({ available: true, saved: true }), 'Guardado');
    assert.equal(favoriteLabel({ available: false, saved: false }), 'Favoritos no disponibles');
});
