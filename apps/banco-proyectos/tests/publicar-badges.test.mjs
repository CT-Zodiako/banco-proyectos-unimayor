// T13: the colored badges of a journal and the speed scale come from real fields of the data
// (languages, review, weeks_to_publication, license); nothing is invented. Run: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WEEKS_FAST, WEEKS_MEDIUM, journalBadges, journalPlace, speedLevel } from '../src/lib/publicar/display.js';

const journal = (extra) => ({
    title: 'Revista X', country: 'Colombia', languages: ['Spanish', 'English'], license: 'CC BY', review: 'Double anonymous peer review', weeks_to_publication: 10, ...extra,
});

test('speed has three levels with the thresholds the finder already uses for the time score (8 and 16 weeks)', () => {
    assert.equal(WEEKS_FAST, 8);
    assert.equal(WEEKS_MEDIUM, 16);
    assert.deepEqual([4, 8, 9, 16, 17, 100].map(speedLevel), ['fast', 'fast', 'mid', 'mid', 'slow', 'slow']);
    assert.equal(speedLevel(null), null);
    assert.equal(speedLevel(undefined), null);
});

test('a journal has at most five badges, in a fixed order, each with a label, a tone and a tip', () => {
    const badges = journalBadges(journal());
    assert.deepEqual(badges.map((badge) => badge.id), ['free', 'spanish', 'review', 'speed', 'license']);
    assert.deepEqual(badges.map((badge) => badge.label), ['Sin costo', 'Acepta español', 'Doble ciego', '10 semanas', 'CC BY']);
    assert.deepEqual(badges.map((badge) => badge.tone), ['good', 'lang', 'review', 'fair', 'journals']);
    for (const badge of badges) assert.ok(badge.tip.length > 10, badge.id);
    assert.match(badges[3].tip, /media/);
});

test('speed tone follows the weeks: fast green, medium amber, slow rose; the tip says the word', () => {
    const speed = (weeks) => journalBadges(journal({ weeks_to_publication: weeks })).find((badge) => badge.id === 'speed');
    assert.deepEqual([speed(6).tone, speed(6).word], ['good', 'rápida']);
    assert.deepEqual([speed(12).tone, speed(12).word], ['fair', 'media']);
    assert.deepEqual([speed(30).tone, speed(30).word], ['low', 'lenta']);
    assert.match(speed(6).tip, /rápida/);
});

test('missing data never produces a badge: no Spanish, unspecified review, no weeks, no license', () => {
    const badges = journalBadges(journal({ languages: ['English'], review: 'Unspecified peer review', weeks_to_publication: null, license: '' }));
    assert.deepEqual(badges.map((badge) => badge.id), ['free']);
    assert.equal(journalBadges(journal({ review: 'Open peer review' })).find((badge) => badge.id === 'review').label, 'Abierta');
});

test('the meta line without the facts that now are badges keeps country and languages', () => {
    assert.equal(journalPlace(journal()), 'Colombia · Español, Inglés');
    assert.equal(journalPlace(journal({ country: '', languages: [] })), '');
});
