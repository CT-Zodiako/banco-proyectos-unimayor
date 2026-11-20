// Tests for src/lib/eventos/dates.js (T8 of odd/tasks/mejora-visual.md): Spanish dd/mm/aaaa text <-> ISO "YYYY-MM-DD".
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatDmy, isValidRange, maskDmyInput, parseDmy } from '../src/lib/eventos/dates.js';

test('parseDmy: a real dd/mm/aaaa date becomes ISO, with or without leading zeros and surrounding spaces', () => {
    assert.equal(parseDmy('15/03/2027'), '2027-03-15');
    assert.equal(parseDmy('5/3/2027'), '2027-03-05');
    assert.equal(parseDmy(' 01/12/2026 '), '2026-12-01');
    assert.equal(parseDmy('29/02/2028'), '2028-02-29'); // leap year
    assert.equal(parseDmy('31/12/2099'), '2099-12-31');
});

test('parseDmy: impossible, incomplete or malformed text is null', () => {
    for (const text of ['31/02/2027', '29/02/2027', '00/03/2027', '15/13/2027', '32/01/2027', '15/03/27', '15/03', '15032027', '2027-03-15', 'ab/cd/efgh', '', '   ', '15/03/2027/1', '15/03/1800']) {
        assert.equal(parseDmy(text), null, JSON.stringify(text));
    }
    assert.equal(parseDmy(null), null);
    assert.equal(parseDmy(undefined), null);
});

test('formatDmy: ISO becomes dd/mm/aaaa; anything else becomes an empty string', () => {
    assert.equal(formatDmy('2027-03-15'), '15/03/2027');
    assert.equal(formatDmy('2026-11-05'), '05/11/2026');
    for (const value of ['', null, undefined, '2027-3-15', '15/03/2027', 'x', '2027-02-31']) assert.equal(formatDmy(value), '', String(value));
});

test('parseDmy and formatDmy are inverse for valid dates', () => {
    for (const iso of ['2026-01-01', '2027-03-15', '2028-02-29', '2099-12-31']) assert.equal(parseDmy(formatDmy(iso)), iso);
});

test('maskDmyInput: typing digits inserts the slashes and stops at eight digits', () => {
    assert.equal(maskDmyInput(''), '');
    assert.equal(maskDmyInput('1'), '1');
    assert.equal(maskDmyInput('15'), '15'); // no trailing slash, so Backspace can delete the last digit
    assert.equal(maskDmyInput('150'), '15/0');
    assert.equal(maskDmyInput('1503'), '15/03');
    assert.equal(maskDmyInput('15032'), '15/03/2');
    assert.equal(maskDmyInput('15032027'), '15/03/2027');
    assert.equal(maskDmyInput('150320271234'), '15/03/2027');
    assert.equal(maskDmyInput('15/03/2027'), '15/03/2027'); // already masked text is stable
    assert.equal(maskDmyInput(maskDmyInput('15032027')), '15/03/2027');
});

test('maskDmyInput: letters are dropped and typed or pasted separators are understood', () => {
    assert.equal(maskDmyInput('a1b5'), '15');
    assert.equal(maskDmyInput('abc'), '');
    assert.equal(maskDmyInput('/'), '');
    assert.equal(maskDmyInput('5/'), '05/');
    assert.equal(maskDmyInput('5/3'), '05/3');
    assert.equal(maskDmyInput('5/3/'), '05/03/');
    assert.equal(maskDmyInput('5/3/2027'), '05/03/2027');
    assert.equal(maskDmyInput('15-03-2027'), '15/03/2027');
    assert.equal(maskDmyInput('15.03.2027'), '15/03/2027');
    assert.equal(maskDmyInput('15 03 2027'), '15/03/2027');
    assert.equal(maskDmyInput('15/03/20271'), '15/03/2027');
    assert.equal(maskDmyInput('15/072'), '15/07/2'); // the user kept typing after the mask's own slash
    assert.equal(maskDmyInput('15/07/209'), '15/07/209');
    assert.equal(maskDmyInput('1/2/3/4'), '12/34');
    assert.equal(maskDmyInput(null), '');
});

test('isValidRange: an empty bound or from <= to is valid; from after to is not', () => {
    assert.equal(isValidRange('', ''), true);
    assert.equal(isValidRange('2027-03-15', ''), true);
    assert.equal(isValidRange('', '2027-03-15'), true);
    assert.equal(isValidRange('2027-03-15', '2027-03-15'), true);
    assert.equal(isValidRange('2027-03-14', '2027-03-15'), true);
    assert.equal(isValidRange('2027-03-16', '2027-03-15'), false);
    assert.equal(isValidRange(undefined, null), true);
});
