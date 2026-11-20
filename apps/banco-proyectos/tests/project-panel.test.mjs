import test from 'node:test';
import assert from 'node:assert/strict';
import {
    PANEL_PUSHED_STATE, PANEL_TABS, closePlan, nextShown, nextTab, nextTrapIndex, panelFullUrl, panelMode, parsePanel, withPanel,
} from '../src/lib/project-panel.js';

test('parsePanel reads ?panel=revistas|eventos and ignores anything else', () => {
    assert.equal(parsePanel('?panel=revistas'), 'revistas');
    assert.equal(parsePanel('?panel=eventos'), 'eventos');
    assert.equal(parsePanel('?x=1&panel=eventos&y=2'), 'eventos');
    assert.equal(parsePanel(''), null);
    assert.equal(parsePanel('?panel='), null);
    assert.equal(parsePanel('?panel=otra'), null);
    assert.equal(parsePanel('?panel=REVISTAS'), null);
    assert.equal(parsePanel(undefined), null);
    assert.equal(parsePanel(null), null);
});

test('withPanel sets, replaces and removes the panel param keeping the other params', () => {
    assert.equal(withPanel('', 'revistas'), '?panel=revistas');
    assert.equal(withPanel('?panel=revistas', 'eventos'), '?panel=eventos');
    assert.equal(withPanel('?a=1', 'eventos'), '?a=1&panel=eventos');
    assert.equal(withPanel('?panel=eventos&a=1', null), '?a=1');
    assert.equal(withPanel('?panel=eventos', null), '');
    assert.equal(withPanel('', null), '');
    assert.equal(withPanel('?a=1', 'invalida'), '?a=1');
    assert.equal(withPanel('?panel=eventos', 'invalida'), '');
});

test('nextTab moves between tabs with the arrow keys, wrapping, and Home/End', () => {
    assert.deepEqual(PANEL_TABS, ['revistas', 'eventos']);
    assert.equal(nextTab('revistas', 'ArrowRight'), 'eventos');
    assert.equal(nextTab('eventos', 'ArrowRight'), 'revistas');
    assert.equal(nextTab('revistas', 'ArrowLeft'), 'eventos');
    assert.equal(nextTab('eventos', 'ArrowLeft'), 'revistas');
    assert.equal(nextTab('eventos', 'Home'), 'revistas');
    assert.equal(nextTab('revistas', 'End'), 'eventos');
    assert.equal(nextTab('revistas', 'Enter'), null);
    assert.equal(nextTab('revistas', 'ArrowDown'), null);
});

test('panelMode: closed, push on wide screens, modal when expanded or narrow', () => {
    assert.equal(panelMode({ open: false, expanded: false, narrow: false }), 'closed');
    assert.equal(panelMode({ open: false, expanded: true, narrow: true }), 'closed');
    assert.equal(panelMode({ open: true, expanded: false, narrow: false }), 'push');
    assert.equal(panelMode({ open: true, expanded: true, narrow: false }), 'modal');
    assert.equal(panelMode({ open: true, expanded: false, narrow: true }), 'modal');
    assert.equal(panelMode({ open: true, expanded: true, narrow: true }), 'modal');
});

test('panelFullUrl is the existing finder URL of the project', () => {
    assert.equal(panelFullUrl('revistas', 'proj_001'), '/donde-publicar?p=proj_001');
    assert.equal(panelFullUrl('eventos', 'proj_001'), '/eventos?p=proj_001');
    assert.equal(panelFullUrl('revistas', 'a b'), '/donde-publicar?p=a%20b');
});

test('nextTrapIndex wraps Tab and Shift+Tab inside the panel and ignores moves that stay inside', () => {
    assert.equal(nextTrapIndex(4, 3, false), 0);
    assert.equal(nextTrapIndex(4, 0, true), 3);
    assert.equal(nextTrapIndex(4, -1, false), 0);
    assert.equal(nextTrapIndex(4, -1, true), 3);
    assert.equal(nextTrapIndex(4, 1, false), null);
    assert.equal(nextTrapIndex(4, 2, true), null);
    assert.equal(nextTrapIndex(0, 0, false), null);
    assert.equal(nextTrapIndex(1, 0, false), 0);
    assert.equal(nextTrapIndex(1, 0, true), 0);
});

test('closePlan goes back only when the panel entry was pushed by the page', () => {
    assert.deepEqual(PANEL_PUSHED_STATE, { panelPushed: true });
    assert.equal(closePlan(PANEL_PUSHED_STATE), 'back');
    assert.equal(closePlan({ panelPushed: true, other: 1 }), 'back');
    assert.equal(closePlan(null), 'replace');
    assert.equal(closePlan(undefined), 'replace');
    assert.equal(closePlan({ panelPushed: false }), 'replace');
    assert.equal(closePlan('x'), 'replace');
});

test('nextShown reveals one more page without passing the total', () => {
    assert.equal(nextShown(8, 60, 10), 18);
    assert.equal(nextShown(55, 60, 10), 60);
    assert.equal(nextShown(60, 60, 10), 60);
    assert.equal(nextShown(8, 3, 10), 3);
    assert.equal(nextShown(0, 0, 10), 0);
});
