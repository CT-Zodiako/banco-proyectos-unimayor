// T13 of odd/tasks/mejora-visual.md: the color palette (meaning of each hue) lives in ONE JS file, src/lib/palette.js.
// src/index.css holds a generated copy (the :root variables and the tone classes .tn-*), tailwind.config.js exposes the
// tones as utilities, and design/system.md lists the same values. Every text/background pair has to reach WCAG AA (4.5:1 for text, 3:1 for graphic marks).
// Run: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import config from '../tailwind.config.js';
import { AA_PAIRS, BUTTON_HUES, TONES, contrastRatio, paletteCss } from '../src/lib/palette.js';

const round = (value) => Math.round(value * 100) / 100;

test('contrastRatio follows the WCAG formula', () => {
    assert.equal(round(contrastRatio('#000000', '#FFFFFF')), 21);
    assert.equal(round(contrastRatio('#FFFFFF', '#FFFFFF')), 1);
    assert.equal(round(contrastRatio('#FFFFFF', '#000000')), 21, 'order does not matter');
    assert.equal(round(contrastRatio('#767676', '#FFFFFF')), 4.54);
    assert.equal(round(contrastRatio('#00428A', '#FFFFFF')), 9.78);
});

test('every text/background pair of the palette reaches its minimum contrast (AA)', () => {
    assert.ok(AA_PAIRS.length >= 30, `only ${AA_PAIRS.length} pairs are checked`);
    for (const { id, fg, bg, min } of AA_PAIRS) {
        const ratio = contrastRatio(fg, bg);
        assert.ok(ratio >= min, `${id}: ${fg} on ${bg} is ${ratio.toFixed(2)}:1, needs ${min}:1`);
    }
});

test('white text on both button gradients (every stop, hover included) is at least 4.5:1', () => {
    for (const [name, hue] of Object.entries(BUTTON_HUES)) {
        for (const stop of [hue.from, hue.to, hue.hoverFrom, hue.hoverTo]) {
            assert.ok(contrastRatio('#FFFFFF', stop) >= 4.5, `${name} ${stop}`);
        }
    }
});

test('the two type buttons and the four quartiles use different hues', () => {
    assert.notEqual(BUTTON_HUES.journals.from, BUTTON_HUES.events.from);
    const quartiles = ['q1', 'q2', 'q3', 'q4'].map((name) => TONES[name]);
    for (const part of ['bg', 'fg', 'line', 'solid']) assert.equal(new Set(quartiles.map((tone) => tone[part])).size, 4, part);
    const affinity = ['good', 'fair', 'low'].map((name) => TONES[name]);
    assert.equal(new Set(affinity.map((tone) => tone.solid)).size, 3);
    assert.notEqual(TONES.journals.solid, TONES.events.solid);
});

test('graphic marks (ring, bars, swatches) are at least 3:1 on white', () => {
    for (const name of ['q1', 'q2', 'q3', 'q4', 'good', 'fair', 'low', 'lang', 'review', 'journals', 'events']) {
        assert.ok(contrastRatio(TONES[name].solid, '#FFFFFF') >= 3, name);
    }
});

test('src/index.css holds an up-to-date copy of the palette: one --tone-* set per tone, one .tn-* class per tone, the button variables', () => {
    const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
    const copy = css.slice(css.indexOf('/* palette:begin'), css.indexOf('/* palette:end */') + '/* palette:end */'.length);
    assert.equal(copy, paletteCss(), 'src/index.css is out of date: refresh the block between palette:begin and palette:end (see src/lib/palette.js)');
    for (const [name, tone] of Object.entries(TONES)) {
        for (const [part, value] of Object.entries(tone)) assert.ok(copy.includes(`--tone-${name}-${part}: ${value};`), `${name} ${part}`);
        assert.ok(copy.includes(`.tn-${name} { --tn-bg: var(--tone-${name}-bg);`), `.tn-${name}`);
    }
    assert.ok(copy.includes(`--btn-journals-from: ${BUTTON_HUES.journals.from};`));
    assert.ok(copy.includes(`--btn-events-to: ${BUTTON_HUES.events.to};`));
});

test('tailwind.config.js exposes the tones as utilities that read those variables', () => {
    for (const name of Object.keys(TONES)) assert.equal(config.theme.extend.colors.tone[name].bg, `var(--tone-${name}-bg)`);
});
