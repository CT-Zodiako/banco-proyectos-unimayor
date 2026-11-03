import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { addOpportunity, readOpportunities, removeOpportunity, calendarFile, updateOpportunity, filterOpportunities, exportBackup, previewBackup, importBackup } from '../src/lib/opportunities.js';

function storage(initial = null) {
  let value = initial;
  return { getItem: () => value, setItem: (_, next) => { value = next; }, value: () => value };
}
const event = { type: 'event', id: 'e1', title: 'Congreso', url: 'https://example.org' };
const journal = { type: 'journal', id: 'e1', title: 'Revista', url: 'https://example.org' };

test('all three applications use the same local storage contract', () => {
  const canonical = readFileSync(new URL('../src/lib/opportunities.js', import.meta.url), 'utf8');
  for (const path of ['../../eventos/site/opportunities.js', '../../donde-publicar/site/opportunities.js']) {
    assert.equal(readFileSync(new URL(path, import.meta.url), 'utf8'), canonical);
  }
});

test('favorites persist by type and id, are unique, and can be removed independently', () => {
  const s = storage();
  addOpportunity(s, event); addOpportunity(s, event); addOpportunity(s, journal);
  assert.deepEqual(readOpportunities(s), [event, journal]);
  removeOpportunity(s, event.type, event.id);
  assert.deepEqual(readOpportunities(s), [journal]);
});

test('invalid new entries cannot corrupt existing favorites', () => {
  const s = storage();
  addOpportunity(s, event);
  const before = s.value();
  assert.throws(() => addOpportunity(s, { type: 'event', title: 'Sin ID' }));
  assert.equal(s.value(), before);
});

test('status and notes update only the selected favorite and preserve older records', () => {
  const s = storage();
  addOpportunity(s, event); addOpportunity(s, journal);
  updateOpportunity(s, 'event', 'e1', { status: 'preparing', note: 'Consultar costos' });
  assert.deepEqual(readOpportunities(s), [{ ...event, status: 'preparing', note: 'Consultar costos' }, journal]);
  assert.deepEqual(filterOpportunities(readOpportunities(s), 'review'), [journal]);
  assert.deepEqual(filterOpportunities(readOpportunities(s), 'preparing'), [{ ...event, status: 'preparing', note: 'Consultar costos' }]);
  assert.equal(filterOpportunities(readOpportunities(s), 'all').length, 2);
});

test('invalid updates and missing favorites leave stored data unchanged', () => {
  const s = storage(); addOpportunity(s, event); const before = s.value();
  assert.throws(() => updateOpportunity(s, 'event', 'e1', { status: 'invalid', note: '' }));
  assert.throws(() => updateOpportunity(s, 'event', 'missing', { status: 'review', note: '' }));
  assert.equal(s.value(), before);
});

test('corrupt stored data is not overwritten', () => {
  const s = storage('{broken');
  assert.throws(() => addOpportunity(s, event));
  assert.equal(s.value(), '{broken');
});


test('backup exports and previews new records and duplicates without changing storage', () => {
  const source = storage(); addOpportunity(source, event); addOpportunity(source, journal);
  updateOpportunity(source, 'event', 'e1', { status: 'preparing', note: 'Preparar' });
  const backup = exportBackup(source);
  const destination = storage(); addOpportunity(destination, { ...event, note: 'Mi nota' });
  const before = destination.value();
  assert.deepEqual(previewBackup(destination, backup), { added: 1, duplicates: 1 });
  assert.equal(destination.value(), before);
  assert.deepEqual(importBackup(destination, backup), { added: 1, duplicates: 1 });
  assert.deepEqual(readOpportunities(destination), [{ ...event, note: 'Mi nota' }, journal]);
});

test('import rejects invalid backups without changing stored data', () => {
  const s = storage(); addOpportunity(s, event); const before = s.value();
  for (const data of ['not json', '{}', JSON.stringify({ version: 1, items: [{ ...journal, status: 'invalid' }] }), JSON.stringify({ version: 1, items: [{ ...journal, note: 123 }] })]) {
    assert.throws(() => importBackup(s, data));
    assert.equal(s.value(), before);
  }
});

test('import deduplicates within backup and rechecks current storage before writing', () => {
  const s = storage();
  const data = JSON.stringify({ version: 1, items: [event, event, journal] });
  assert.deepEqual(previewBackup(s, data), { added: 2, duplicates: 1 });
  addOpportunity(s, journal);
  assert.deepEqual(importBackup(s, data), { added: 1, duplicates: 2 });
  assert.deepEqual(readOpportunities(s), [journal, event]);
});

test('calendar export uses an all-day event and escapes text', () => {
  const ics = calendarFile({ ...event, title: 'Congreso, IA; redes', start: '2027-01-31' }, 'start');
  assert.match(ics, /DTSTART;VALUE=DATE:20270131/);
  assert.match(ics, /DTEND;VALUE=DATE:20270201/);
  assert.ok(ics.includes('Congreso\\, IA\\; redes'));
  assert.equal(calendarFile(event, 'start'), null);
});
