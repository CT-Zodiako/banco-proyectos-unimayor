// T16 of odd/tasks/mejora-visual.md: the heavy pieces are separate chunks. The global search dialog downloads on the
// first use (or when the pointer or the keyboard reaches its button), the proposal dialog when it opens, and a page
// when the pointer or the keyboard reaches its link in the navigation.
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';

const loads = { search: 0, proposal: 0, eventos: 0 };
const MODULES = {
    '../../src/components/GlobalSearchDialog.jsx': (React, key) => ({ onClose }) => React.createElement('div', { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Buscar en todo el sitio' },
        React.createElement('button', { type: 'button', onClick: () => onClose({}) }, `Cerrar ${key}`)),
    '../../src/components/ProposalDialog.jsx': (React) => ({ onClose }) => React.createElement('div', { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Proponer proyecto' },
        React.createElement('button', { type: 'button', onClick: onClose }, 'Cerrar propuesta')),
    '../../src/pages/Eventos.jsx': (React) => () => React.createElement('h1', null, 'Eventos de prueba'),
};
const COUNTER = { '../../src/components/GlobalSearchDialog.jsx': 'search', '../../src/components/ProposalDialog.jsx': 'proposal', '../../src/pages/Eventos.jsx': 'eventos' };

// Each test registers the stand-ins again: a factory runs when its module is first imported, so the counters tell
// whether (and when) the app asked for the chunk.
beforeEach(() => {
    Object.assign(loads, { search: 0, proposal: 0, eventos: 0 });
    for (const [path, component] of Object.entries(MODULES)) {
        vi.doMock(path, async () => {
            const React = await import('react');
            loads[COUNTER[path]] += 1;
            return { default: component(React, 'buscador') };
        });
    }
});
afterEach(() => { for (const path of Object.keys(MODULES)) vi.doUnmock(path); });

describe('dialogs are downloaded when they are needed', () => {
    it('the search dialog is not downloaded until its button is used, and then opens', async () => {
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp('/proyectos');
        expect(loads.search).toBe(0);
        await user.click(screen.getByRole('button', { name: 'Buscar en todo el sitio' }));
        expect(await screen.findByRole('dialog', { name: 'Buscar en todo el sitio' })).toBeTruthy();
        expect(loads.search).toBe(1);
    });

    it('Ctrl+K opens it too', async () => {
        mockDataFetch();
        await renderApp('/proyectos');
        expect(loads.search).toBe(0);
        fireEvent.keyDown(document, { key: 'k', ctrlKey: true });
        expect(await screen.findByRole('dialog', { name: 'Buscar en todo el sitio' })).toBeTruthy();
    });

    it('the pointer on the search button starts the download before the click', async () => {
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp('/proyectos');
        await user.hover(screen.getByRole('button', { name: 'Buscar en todo el sitio' }));
        await waitFor(() => expect(loads.search).toBe(1));
        expect(screen.queryByRole('dialog')).toBeNull();
    });

    it('the proposal dialog is not downloaded until «Proponer proyecto» is pressed', async () => {
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp('/proyectos');
        expect(loads.proposal).toBe(0);
        await user.click(screen.getByRole('button', { name: /Proponer proyecto/ }));
        expect(await screen.findByRole('dialog', { name: 'Proponer proyecto' })).toBeTruthy();
        expect(loads.proposal).toBe(1);
    });
});

describe('navigation links prefetch their page', () => {
    it('does not download Eventos until the pointer reaches its link, and does not navigate by itself', async () => {
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp('/');
        expect(loads.eventos).toBe(0);
        await user.hover(within(screen.getByRole('navigation', { name: 'Principal' })).getByRole('link', { name: 'Eventos académicos' }));
        await waitFor(() => expect(loads.eventos).toBe(1));
        expect(window.location.pathname).toBe('/');
    });

    it('keyboard focus on the link prefetches it as well', async () => {
        mockDataFetch();
        await renderApp('/');
        within(screen.getByRole('navigation', { name: 'Principal' })).getByRole('link', { name: 'Eventos académicos' }).focus();
        await waitFor(() => expect(loads.eventos).toBe(1));
    });
});
