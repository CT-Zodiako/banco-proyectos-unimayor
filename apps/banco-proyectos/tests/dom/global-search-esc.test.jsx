// T23 of odd/tasks/mejora-visual.md: Esc (or a second click on the button) while the search dialog chunk is still
// downloading cancels the opening: the dialog never appears and the focus stays where it was. Ctrl+K only opens.
// The chunk is a small stand-in for <GlobalSearchDialog/> (same Esc contract) whose module is held back by a gate the
// test releases when it chooses; the real dialog is covered by global-search.test.jsx.
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { deferred, mockDataFetch, renderApp } from './helpers.jsx';

const MODULE = '../../src/components/GlobalSearchDialog.jsx';
const BUTTON = 'Buscar en todo el sitio';
const opener = () => screen.getByRole('button', { name: BUTTON });
const nothingOpen = () => {
    expect(screen.queryByRole('dialog', { name: BUTTON })).toBeNull();
    expect(screen.queryByRole('status', { name: '' })?.textContent ?? '').not.toMatch(/Cargando la búsqueda/);
};

let gate;
let requested;
const seen = new WeakSet();
beforeEach(() => {
    gate = deferred();
    requested = 0;
    // The stand-in suspends (like a lazy component whose code has not arrived) until the test releases the gate.
    vi.doMock(MODULE, async () => {
        const React = await import('react');
        const Stand = ({ onClose }) => {
            if (!seen.has(gate)) { seen.add(gate); requested += 1; }
            if (!gate.released) throw gate.promise;
            React.useEffect(() => { document.getElementById('stand-in-input')?.focus(); }, []);
            return React.createElement('div', {
                role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Buscar en todo el sitio',
                onKeyDown: (event) => { if (event.key === 'Escape') { event.preventDefault(); onClose({ navigated: false }); } },
            }, React.createElement('input', { id: 'stand-in-input', 'aria-label': 'Buscar' }));
        };
        return { default: Stand };
    });
});
afterEach(() => vi.doUnmock(MODULE));

async function openApp() {
    mockDataFetch();
    const user = userEvent.setup();
    await renderApp('/proyectos');
    return user;
}
// Lets the chunk finish downloading and gives React the time to render what it was waiting for.
const release = async () => { gate.released = true; gate.resolve(); await new Promise((resolve) => setTimeout(resolve, 60)); };

describe('Esc while the search chunk downloads', () => {
    it('after a click: no dialog ever opens, the loading note goes away and the focus stays on the button', async () => {
        const user = await openApp();
        await user.click(opener());
        await waitFor(() => expect(requested).toBe(1));
        expect(screen.getByText('Cargando la búsqueda…')).toBeTruthy();
        await user.keyboard('{Escape}');
        expect(screen.queryByText('Cargando la búsqueda…')).toBeNull();
        await release();
        nothingOpen();
        expect(document.activeElement).toBe(opener());
    });

    it('after Ctrl+K: no dialog ever opens and the focus stays on the element that had it', async () => {
        const user = await openApp();
        const link = screen.getByRole('link', { name: 'Eventos académicos' });
        link.focus();
        fireEvent.keyDown(document, { key: 'k', ctrlKey: true });
        await waitFor(() => expect(requested).toBe(1));
        await user.keyboard('{Escape}');
        await release();
        nothingOpen();
        expect(document.activeElement).toBe(link);
    });

    it('after «/»: no dialog ever opens and the focus does not jump to the button', async () => {
        const user = await openApp();
        const link = screen.getByRole('link', { name: 'Proyectos' });
        link.focus();
        fireEvent.keyDown(document, { key: '/' });
        await waitFor(() => expect(requested).toBe(1));
        await user.keyboard('{Escape}');
        await release();
        nothingOpen();
        expect(document.activeElement).toBe(link);
    });

    it('a second click on the button cancels the opening too', async () => {
        const user = await openApp();
        await user.click(opener());
        await waitFor(() => expect(requested).toBe(1));
        await user.click(opener());
        expect(screen.queryByText('Cargando la búsqueda…')).toBeNull();
        await release();
        nothingOpen();
    });

    it('Ctrl+K while it loads does not cancel: the dialog opens when the chunk arrives', async () => {
        const user = await openApp();
        await user.click(opener());
        await waitFor(() => expect(requested).toBe(1));
        fireEvent.keyDown(document, { key: 'k', ctrlKey: true });
        expect(screen.getByText('Cargando la búsqueda…')).toBeTruthy();
        await release();
        expect(await screen.findByRole('dialog', { name: BUTTON })).toBeTruthy();
    });

    it('after a cancelled opening, the search opens normally the next time and Esc then closes it as before', async () => {
        const user = await openApp();
        await user.click(opener());
        await waitFor(() => expect(requested).toBe(1));
        await user.keyboard('{Escape}');
        await release();
        nothingOpen();
        await user.click(opener());
        expect(await screen.findByRole('dialog', { name: BUTTON })).toBeTruthy();
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByRole('dialog', { name: BUTTON })).toBeNull());
        expect(document.activeElement).toBe(opener());
    });

    it('Esc with the dialog closed and nothing loading does nothing', async () => {
        const user = await openApp();
        await user.keyboard('{Escape}');
        await release();
        nothingOpen();
        expect(requested).toBe(0);
    });
});
