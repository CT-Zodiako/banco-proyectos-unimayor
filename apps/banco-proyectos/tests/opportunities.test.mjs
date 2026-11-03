import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { addOpportunity, readOpportunities, removeOpportunity, calendarFile, updateOpportunity, filterOpportunities, exportBackup, previewBackup, importBackup, MAX_BACKUP_SIZE } from '../src/lib/opportunities.js';

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

const unfold = (ics) => ics.replaceAll('\r\n ', '');
const octets = (line) => Buffer.byteLength(line, 'utf8');

test('calendar export folds long lines at 75 octets with a leading space on continuations', () => {
    const title = 'Congreso internacional de ingeniería, ciencia de datos y redes; edición especial 2027 en Popayán';
    const ics = calendarFile({ ...event, title, start: '2027-01-31' }, 'start');
    const lines = ics.split('\r\n');
    assert.ok(lines.every((line) => octets(line) <= 75));
    assert.ok(lines.some((line) => line.startsWith(' ')));
    assert.ok(unfold(ics).includes(`SUMMARY:${title.replaceAll(',', '\\,').replaceAll(';', '\\;')}\r\n`));
    assert.match(unfold(ics), /DTSTART;VALUE=DATE:20270131\r\nDTEND;VALUE=DATE:20270201\r\n/);
    assert.match(unfold(ics), /UID:e1-start@unimayor\r\n/);
});

test('calendar folding never splits a multi-byte UTF-8 character', () => {
    const title = 'ñáéíóú€😀'.repeat(20);
    const ics = calendarFile({ ...event, title, start: '2027-01-31' }, 'start');
    const lines = ics.split('\r\n');
    assert.ok(lines.length > 13);
    for (const line of lines) {
        assert.ok(octets(line) <= 75);
        assert.ok(line.isWellFormed());
    }
    assert.ok(unfold(ics).includes(`SUMMARY:${title}\r\n`));
});

test('backups larger than the shared size limit are rejected without changing stored data', () => {
    assert.equal(MAX_BACKUP_SIZE, 5 * 1024 * 1024);
    const s = storage(); addOpportunity(s, event); const before = s.value();
    assert.throws(() => importBackup(s, ' '.repeat(MAX_BACKUP_SIZE + 1)), /demasiado grande/);
    assert.equal(s.value(), before);
});

test('carriage returns are escaped so a title cannot break the calendar structure', () => {
  const ics = calendarFile({ ...event, title: 'Congreso\r\nX-INJECTED:1', start: '2027-01-31' }, 'start');
  const lines = ics.split('\r\n');
  assert.ok(!lines.some((line) => line.startsWith('X-INJECTED')));
  assert.ok(lines.some((line) => line.startsWith('SUMMARY:Congreso\\nX-INJECTED:1')));
});

test('the calendar file ends with a single CRLF terminator', () => {
  const ics = calendarFile({ ...event, start: '2027-01-31' }, 'start');
  assert.ok(ics.endsWith('END:VCALENDAR\r\n'));
  assert.ok(!ics.endsWith('\r\n\r\n'));
});

test('the backup limit is measured in UTF-8 bytes, matching File.size', () => {
  const s = storage();
  const item = { type: 'event', id: 'big', title: 'ñ'.repeat(3 * 1024 * 1024) };
  const text = JSON.stringify({ version: 1, items: [item] });
  assert.ok(text.length < 5 * 1024 * 1024 && Buffer.byteLength(text, 'utf8') > 5 * 1024 * 1024);
  const before = s.value();
  assert.throws(() => importBackup(s, text), /demasiado grande/);
  assert.equal(s.value(), before);
});

test('a lone carriage return is escaped like any other line break', () => {
  const ics = calendarFile({ ...event, title: 'Congreso\rX-INJECTED:1', start: '2027-01-31' }, 'start');
  assert.ok(!ics.split('\r\n').some((line) => line.startsWith('X-INJECTED')));
  assert.ok(ics.includes('SUMMARY:Congreso\\nX-INJECTED:1'));
});

test('a large oversized backup is rejected without touching stored data', () => {
  const s = storage(); addOpportunity(s, event); const before = s.value();
  assert.throws(() => importBackup(s, 'x'.repeat(5 * 1024 * 1024 + 1)), /demasiado grande/);
  assert.equal(s.value(), before);
});
