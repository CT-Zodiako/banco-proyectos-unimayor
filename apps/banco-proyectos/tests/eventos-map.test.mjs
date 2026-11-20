// Tests for the display helpers of the event cards: map link, modality, comparison table, data status and favorites.
// Ported from pipelines/eventos/tests/map.test.cjs, which rendered the page in a fake DOM; the React components now
// get these values from pure functions in src/lib/eventos. Run: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { comparisonKey, comparisonRows, dataInfoText, dataStatusText, dataUpdatedText, eventFilterChips, KIND_FILTER_LABELS, mapSearchUrl, modalityLabel, physicalLocation, safeUrl } from '../src/lib/eventos/display.js';
import { DEFAULT_STATE } from '../src/lib/eventos/filters.js';
import { favoriteLabel, favoriteSnapshot, toggleFavorite } from '../src/lib/eventos/favorites.js';
import { addOpportunity } from '../src/lib/opportunities.js';

const event = (location, online = false) => ({ title: 'Congreso', kind: 'attend', start: '2099-01-01', end: '2099-01-02', location, online, topics: [], source: 'manual', url: 'https://example.org/event' });

test('physical and hybrid locations link to a safely encoded Google Maps search', () => {
    for (const location of ['Pasto, Colombia', 'Bogotá & Cauca, Colombia']) {
        assert.equal(physicalLocation(event(location)), location);
        const url = new URL(mapSearchUrl(location));
        assert.equal(url.origin, 'https://www.google.com');
        assert.equal(url.pathname, '/maps/search/');
        assert.equal(url.searchParams.get('api'), '1');
        assert.equal(url.searchParams.get('query'), location);
    }
    assert.equal(physicalLocation(event('Pasto, Colombia', true)), 'Pasto, Colombia');
    assert.equal(mapSearchUrl('Bogotá & Cauca, Colombia').includes('&Cauca'), false);
});

test('the physical location is trimmed', () => {
    assert.equal(physicalLocation(event('  Pasto, Colombia ')), 'Pasto, Colombia');
});

test('online and unconfirmed locations do not link to a map', () => {
    for (const item of [event(null, true), event('Online', true), event('Por confirmar'), event(null), event('TBD'), event('N/A'),
        event('Virtual'), event('Fully online'), event('100% Virtual'), event('Hybrid event'), event('   ')]) {
        assert.equal(physicalLocation(item), null);
    }
    assert.equal(physicalLocation({ title: 'Sin lugar' }), null);
    assert.equal(physicalLocation({ location: 42 }), null);
});

test('external links only accept http and https', () => {
    assert.equal(safeUrl('https://example.org/event'), 'https://example.org/event');
    assert.equal(safeUrl('http://example.org/'), 'http://example.org/');
    assert.equal(safeUrl('javascript:alert(1)'), null);
    assert.equal(safeUrl('not a url'), null);
    assert.equal(safeUrl(undefined), null);
});

test('the data generation date is shown, with a fallback when missing', () => {
    assert.equal(dataStatusText('2026-10-31'), 'Listado generado el 31 oct 2026.');
    assert.equal(dataStatusText(undefined), 'Fecha de generación no disponible.');
    assert.equal(dataInfoText('2026-10-31', { wikicfp: 2, ccfddl: 1, manual: 3, other: 4 }),
        'Datos actualizados el 31 oct 2026 · Eventos por fuente: WikiCFP: 2 · CCF Deadlines: 1 · UNIMAYOR: 3 · other: 4.');
    assert.equal(dataInfoText(undefined, undefined), 'Datos actualizados el —.');
});

test('the comparison modality row never claims a modality the data does not prove', () => {
    assert.equal(modalityLabel(event(null, true)), 'En línea');
    assert.equal(modalityLabel(event('Online', true)), 'En línea');
    assert.equal(modalityLabel(event('Pasto, Colombia', true)), 'Confirmar en la fuente');
    assert.equal(modalityLabel(event('Pasto, Colombia')), 'Confirmar en la fuente');
    assert.equal(modalityLabel(event(null)), null);
    assert.equal(modalityLabel(event('Por confirmar')), null);
});

const rowsByLabel = (rows) => Object.fromEntries(rows.map((row) => [row.label, row.values]));

test('the comparison table lists the selected events in selection order', () => {
    const events = [{ ...event('Pasto, Colombia'), id: 'a', title: 'Primero' }, { ...event('Lima, Perú'), id: 'b', title: 'Segundo' }];
    const selected = [comparisonKey(events[1]), comparisonKey(events[0])];
    const { chosen, rows } = comparisonRows(events, selected);
    assert.deepEqual(chosen.map((e) => e.title), ['Segundo', 'Primero']);
    assert.deepEqual(rows.map((row) => row.label), ['Tipo', 'Fechas', 'Cierre', 'Lugar', 'Modalidad', 'Temas', 'Fuente']);
    const byLabel = rowsByLabel(rows);
    assert.deepEqual(byLabel.Tipo, ['Para asistir', 'Para asistir']);
    assert.deepEqual(byLabel.Fechas, ['1–2 ene 2099', '1–2 ene 2099']);
    assert.deepEqual(byLabel.Lugar, ['Lima, Perú', 'Pasto, Colombia']);
    assert.deepEqual(byLabel.Fuente, ['UNIMAYOR', 'UNIMAYOR']);
});

test('the comparison table shows «No informado» for missing data and ignores unknown selections', () => {
    const events = [{ ...event(null), id: 'e', title: 'Sin datos', start: null, end: null }];
    const { chosen, rows } = comparisonRows(events, [comparisonKey(events[0]), JSON.stringify(['event', 'missing'])]);
    assert.equal(chosen.length, 1);
    const byLabel = rowsByLabel(rows);
    for (const label of ['Fechas', 'Cierre', 'Lugar', 'Modalidad', 'Temas']) assert.deepEqual(byLabel[label], ['No informado']);
    assert.deepEqual(comparisonRows(events, []).chosen, []);
});

test('comparison keys are keyed by type and id like the saved opportunities', () => {
    assert.equal(comparisonKey({ id: 'ev1' }), '["event","ev1"]');
});

function memoryStorage(initial = null, failWrites = false) {
    let value = initial;
    return { getItem: () => value, setItem: (_, next) => { if (failWrites) throw new Error('QuotaExceededError'); value = next; }, value: () => value };
}
const saved = { ...event('Pasto, Colombia'), id: 'ev1' };

test('the favorite button saves the event, then removes it on a second click', () => {
    const storage = memoryStorage();
    assert.deepEqual(favoriteSnapshot(storage, 'ev1'), { available: true, saved: false });
    assert.equal(favoriteLabel({ available: true, saved: false }), 'Guardar');
    assert.equal(toggleFavorite(storage, saved), true);
    assert.equal(favoriteLabel(favoriteSnapshot(storage, 'ev1')), 'Guardado');
    const items = JSON.parse(storage.value());
    assert.equal(items.length, 1);
    assert.equal(items[0].type, 'event');
    assert.equal(items[0].id, 'ev1');
    assert.equal(items[0].title, 'Congreso');
    assert.equal(items[0].url, 'https://example.org/event');
    assert.equal(items[0].start, '2099-01-01');
    assert.equal(items[0].end, '2099-01-02');
    assert.equal(toggleFavorite(storage, saved), false);
    assert.deepEqual(JSON.parse(storage.value()), []);
});

test('a journal with the same id is not mistaken for the saved event', () => {
    const storage = memoryStorage();
    addOpportunity(storage, { type: 'journal', id: 'ev1', title: 'Revista' });
    assert.equal(favoriteSnapshot(storage, 'ev1').saved, false);
    toggleFavorite(storage, saved);
    assert.deepEqual(JSON.parse(storage.value()).map((item) => item.type), ['journal', 'event']);
});

test('a storage failure leaves the saved favorites untouched', () => {
    const before = JSON.stringify([{ type: 'journal', id: 'j1', title: 'Revista' }]);
    const storage = memoryStorage(before, true);
    assert.equal(favoriteSnapshot(storage, 'ev1').saved, false);
    assert.throws(() => toggleFavorite(storage, saved));
    assert.equal(storage.value(), before);
});

test('unreadable favorites make the button unavailable', () => {
    const storage = memoryStorage('{"not":"a list"}');
    const snapshot = favoriteSnapshot(storage, 'ev1');
    assert.deepEqual(snapshot, { available: false, saved: false });
    assert.equal(favoriteLabel(snapshot), 'Favoritos no disponibles');
    assert.deepEqual(favoriteSnapshot(null, 'ev1'), { available: false, saved: false });
    assert.equal(storage.value(), '{"not":"a list"}');
});

test('the compact data line says when the listing was updated, with a fallback when the date is missing', () => {
    assert.equal(dataUpdatedText('2026-11-16'), 'Datos actualizados el 16 nov 2026');
    assert.equal(dataUpdatedText(undefined), 'Fecha de actualización no disponible');
    assert.equal(dataUpdatedText(''), 'Fecha de actualización no disponible');
});

test('the kind filter has one label per value, shared by the buttons and the chips', () => {
    assert.deepEqual(KIND_FILTER_LABELS, { all: 'Todos', cfp: 'Convocatorias (presentar)', attend: 'Para asistir' });
});

test('active filter chips: none by default, one per applied filter, each with the patch that removes only it', () => {
    assert.deepEqual(eventFilterChips(DEFAULT_STATE), []);
    assert.deepEqual(eventFilterChips({ ...DEFAULT_STATE, project: 'proj_001', sort: 'start' }), []);

    const state = {
        ...DEFAULT_STATE, kind: 'cfp', query: ' iot ', modality: 'online', colombia: true, location: 'Popayán',
        dateFrom: '2099-06-01', dateTo: '2099-07-31', topics: ['IoT', 'Robótica'],
    };
    const chips = eventFilterChips(state);
    assert.deepEqual(chips.map(({ group, text }) => [group, text]), [
        ['Tipo', 'Convocatorias (presentar)'], ['Búsqueda', 'iot'], ['Modalidad', 'En línea'], ['Ubicación', 'Solo Colombia'],
        ['Ciudad o país', 'Popayán'], ['Inicio desde', '01/06/2099'], ['Inicio hasta', '31/07/2099'], ['Tema', 'IoT'], ['Tema', 'Robótica'],
    ]);
    assert.equal(new Set(chips.map((chip) => chip.id)).size, chips.length);
    assert.deepEqual(chips.map((chip) => chip.patch), [
        { kind: 'all' }, { query: '' }, { modality: 'all' }, { colombia: false }, { location: '' },
        { dateFrom: '' }, { dateTo: '' }, { topics: ['Robótica'] }, { topics: ['IoT'] },
    ]);
    assert.equal(eventFilterChips({ ...DEFAULT_STATE, modality: 'presencial' })[0].text, 'Presencial');
    assert.deepEqual(state.topics, ['IoT', 'Robótica']); // the state is not modified
});
