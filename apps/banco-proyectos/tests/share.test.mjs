// Tests for src/lib/share.js: copying the current address to the clipboard, with a textarea fallback. Run: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { COPIED_MS, FAILED_MS, SHARE_COPIED, SHARE_FAILED, copyText } from '../src/lib/share.js';

const URL_TEXT = 'http://localhost:5173/proyectos?area=SBC-IoT&nivel=Avanzado&q=riego';

// A document double that records what the fallback does with its temporary textarea.
function fakeDocument({ execResult = true, execThrows = false } = {}) {
    const log = { appended: [], removed: [], valueAtCopy: null, command: null, focused: 0 };
    const textarea = {
        value: '', style: {}, attrs: {},
        setAttribute(name, value) { this.attrs[name] = value; },
        select() { log.selected = true; },
        setSelectionRange() {},
    };
    const previous = { focus() { log.focused += 1; } };
    const document = {
        activeElement: previous,
        createElement: (tag) => { assert.equal(tag, 'textarea'); return textarea; },
        body: {
            appendChild: (node) => { log.appended.push(node); },
            removeChild: (node) => { log.removed.push(node); },
        },
        execCommand: (command) => {
            log.command = command;
            log.valueAtCopy = textarea.value;
            if (execThrows) throw new Error('blocked');
            return execResult;
        },
    };
    return { document, log, textarea };
}

test('the messages and delays are the agreed copy', () => {
    assert.equal(SHARE_COPIED, 'Enlace copiado');
    assert.equal(SHARE_FAILED, 'No se pudo copiar. Copia la dirección del navegador.');
    assert.equal(COPIED_MS, 3000);
    assert.ok(FAILED_MS >= COPIED_MS);
});

test('uses navigator.clipboard.writeText with the exact text and never touches the document', async () => {
    const written = [];
    const { document, log } = fakeDocument();
    const ok = await copyText(URL_TEXT, { navigator: { clipboard: { writeText: async (text) => { written.push(text); } } }, document });
    assert.equal(ok, true);
    assert.deepEqual(written, [URL_TEXT]);
    assert.equal(log.appended.length, 0);
    assert.equal(log.command, null);
});

test('falls back to a temporary textarea + execCommand("copy") when navigator.clipboard is undefined', async () => {
    const { document, log, textarea } = fakeDocument();
    const ok = await copyText(URL_TEXT, { navigator: {}, document });
    assert.equal(ok, true);
    assert.equal(log.command, 'copy');
    assert.equal(log.valueAtCopy, URL_TEXT);
    assert.equal(log.selected, true);
    assert.deepEqual(log.appended, [textarea]);
    assert.deepEqual(log.removed, [textarea], 'the temporary textarea is removed again');
    assert.equal(textarea.attrs.readonly, '');
    assert.equal(log.focused, 1, 'the focus goes back to the control that had it');
});

test('falls back too when writeText rejects, and succeeds if the fallback copies', async () => {
    const { document, log } = fakeDocument();
    const clipboard = { writeText: async () => { throw new Error('NotAllowedError'); } };
    assert.equal(await copyText(URL_TEXT, { navigator: { clipboard }, document }), true);
    assert.equal(log.valueAtCopy, URL_TEXT);
});

test('reports failure when the clipboard rejects and there is no execCommand', async () => {
    const clipboard = { writeText: async () => { throw new Error('NotAllowedError'); } };
    const document = { activeElement: null, createElement: () => ({ style: {}, setAttribute() {}, select() {}, setSelectionRange() {} }), body: { appendChild() {}, removeChild() {} } };
    assert.equal(await copyText(URL_TEXT, { navigator: { clipboard }, document }), false);
});

test('reports failure when execCommand returns false or throws, and still removes the textarea', async () => {
    for (const options of [{ execResult: false }, { execThrows: true }]) {
        const { document, log, textarea } = fakeDocument(options);
        assert.equal(await copyText(URL_TEXT, { navigator: undefined, document }), false);
        assert.deepEqual(log.removed, [textarea]);
    }
});

test('reports failure without a clipboard and without a document', async () => {
    assert.equal(await copyText(URL_TEXT, { navigator: undefined, document: undefined }), false);
});
