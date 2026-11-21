// T23 of odd/tasks/mejora-visual.md: long lists (events, journals, saved opportunities) start with a skip link that is only
// visible while it has the focus («Saltar la lista de …») and moves the focus to what follows the list: the «mostrar
// más» button when there is one, else an end marker. The lists are real lists with their count in the name.
import { cleanup, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID, eventosFixture, publicarFixture } from './fixtures.js';
import { STORAGE_KEY } from '../../src/lib/opportunities.js';

const pad = (n) => String(n).padStart(2, '0');
const ok = (body) => ({ ok: true, status: 200, json: async () => body });
const bigEvents = (count) => ({
    ...eventosFixture,
    events: Array.from({ length: count }, (_, i) => {
        const n = i + 1;
        return {
            id: `ev-${n}`, title: `Evento ${pad(n)}`, name: `Evento ${pad(n)}`, kind: n % 2 ? 'cfp' : 'attend',
            start: `2099-06-${pad(n % 28 + 1)}`, end: `2099-06-${pad(n % 28 + 1)}`, deadline: n % 2 ? `2099-03-${pad(n % 28 + 1)}` : null,
            location: 'Popayán, Colombia', country: 'Colombia', online: false, url: `https://example.org/ev-${n}`, source: 'wikicfp', topics: ['IoT'],
        };
    }),
});
const journalOf = (n) => ({ ...publicarFixture.journals[0], id: `j-${n}`, title: `Revista ${pad(n)}`, quartile: `Q${(n % 4) + 1}` });
const bigPublicar = (count) => ({
    ...publicarFixture,
    journals: Array.from({ length: count }, (_, i) => journalOf(i + 1)),
    projects: publicarFixture.projects.map((project) => ({
        ...project,
        matches: Array.from({ length: count }, (_, i) => ({ journal_id: `j-${i + 1}`, fit: 'fuerte', score: 6, themes: ['agricultura'] })),
    })),
});

const skip = (name) => screen.queryByRole('link', { name });
const focusedText = () => document.activeElement?.textContent;

describe('/eventos', () => {
    const SKIP = 'Saltar la lista de eventos';
    const open = async (count) => {
        mockDataFetch((path, response) => (path === '/data/eventos.json' ? ok(bigEvents(count)) : response));
        await renderApp('/eventos');
        await screen.findByRole('region', { name: 'Eventos encontrados' });
        return userEvent.setup();
    };
    const region = () => screen.getByRole('region', { name: 'Eventos encontrados' });

    it('starts the list with a skip link that is a focusable link with the skip-link style, after the filters and before the first card', async () => {
        await open(45);
        const link = skip(SKIP);
        expect(link).toBeTruthy();
        expect(link.classList.contains('skip-link')).toBe(true);
        expect(link.tabIndex).toBe(0);
        expect(link.getAttribute('href')).toMatch(/^#/);
        const first = within(region()).getAllByRole('article')[0];
        expect(link.compareDocumentPosition(first) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(region().contains(link)).toBe(true);
        const filters = screen.getByRole('group', { name: 'Tipo de evento' });
        expect(filters.compareDocumentPosition(link) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it('Tab from the last filter chip reaches it before any card control, and Enter moves the focus to «Mostrar más eventos»', async () => {
        const user = await open(45);
        const link = skip(SKIP);
        const controls = [...document.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex="0"]')];
        const index = controls.indexOf(link);
        expect(index).toBeGreaterThan(0);
        controls[index - 1].focus();
        await user.tab();
        expect(document.activeElement).toBe(link);
        await user.keyboard('{Enter}');
        expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Mostrar más eventos' }));
        expect(window.location.hash).toBe('');
    });

    it('works with the end marker when «Mostrar más eventos» is gone: the target is focusable (tabindex -1), named and after the last card', async () => {
        const user = await open(25);
        await user.click(screen.getByRole('button', { name: 'Mostrar más eventos' }));
        expect(screen.queryByRole('button', { name: 'Mostrar más eventos' })).toBeNull();
        skip(SKIP).focus();
        await user.keyboard('{Enter}');
        const target = document.activeElement;
        expect(target).not.toBe(document.body);
        expect(target.getAttribute('tabindex')).toBe('-1');
        expect(target.textContent).toBe('Fin de la lista de eventos');
        const cards = within(region()).getAllByRole('article');
        expect(cards[cards.length - 1].compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it('the list is a real list (ul) with one item per card and its count in the name', async () => {
        const user = await open(45);
        const list = within(region()).getByRole('list', { name: 'Lista de 45 eventos' });
        expect(list.tagName).toBe('UL');
        expect(list.querySelectorAll(':scope > li')).toHaveLength(20);
        expect(within(list).getAllByRole('article')).toHaveLength(20);
        await user.click(screen.getByRole('button', { name: 'Mostrar más eventos' }));
        expect(within(region()).getByRole('list', { name: 'Lista de 45 eventos' }).querySelectorAll(':scope > li')).toHaveLength(40);
    });

    it('is not shown for a short list (4 events) but the list keeps its semantics', async () => {
        await open(4);
        expect(skip(SKIP)).toBeNull();
        expect(within(region()).getByRole('list', { name: 'Lista de 4 eventos' })).toBeTruthy();
    });
});

describe('/donde-publicar', () => {
    const serve = (count, catalogCount) => mockDataFetch((path, response) => {
        if (path === '/data/publicar-data.json') return ok(bigPublicar(count));
        if (path === '/data/publicar-catalog.json') return ok(Array.from({ length: catalogCount }, (_, i) => journalOf(i + 1)));
        return response;
    });
    const SKIP = 'Saltar la lista de revistas';

    it('the journals of a project: skip link before the list, Enter focuses the end marker after the last journal (list and table views)', async () => {
        serve(8, 20);
        const user = userEvent.setup();
        await renderApp(`/donde-publicar?p=${PROJECT_ID}`);
        await screen.findAllByRole('article');
        const link = skip(SKIP);
        expect(link).toBeTruthy();
        expect(link.classList.contains('skip-link')).toBe(true);
        const list = screen.getByRole('list', { name: 'Lista de 8 revistas' });
        expect(list.tagName).toBe('UL');
        expect(list.querySelectorAll(':scope > li')).toHaveLength(8);
        expect(link.compareDocumentPosition(list) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        link.focus();
        await user.keyboard('{Enter}');
        expect(focusedText()).toBe('Fin de la lista de revistas');
        expect(document.activeElement.getAttribute('tabindex')).toBe('-1');
        expect(list.compareDocumentPosition(document.activeElement) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

        cleanup();
        serve(8, 20);
        await renderApp(`/donde-publicar?p=${PROJECT_ID}&vista=tabla`);
        await screen.findAllByRole('checkbox', { name: /^Comparar: / });
        skip(SKIP).focus();
        await user.keyboard('{Enter}');
        expect(focusedText()).toBe('Fin de la lista de revistas');
    });

    it('is not shown for a short list of journals', async () => {
        mockDataFetch();
        await renderApp(`/donde-publicar?p=${PROJECT_ID}`);
        await screen.findAllByRole('article');
        expect(skip(SKIP)).toBeNull();
    });

    it('the catalog: skip link before the cards, Enter focuses «Ver más revistas»; with everything shown it focuses the end marker', async () => {
        serve(8, 20);
        const user = userEvent.setup();
        await renderApp('/donde-publicar');
        await screen.findByRole('list', { name: 'Lista de 20 revistas' });
        const link = skip(SKIP);
        expect(link).toBeTruthy();
        expect(screen.getByRole('list', { name: 'Lista de 20 revistas' }).querySelectorAll(':scope > li')).toHaveLength(15);
        link.focus();
        await user.keyboard('{Enter}');
        expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Ver más revistas' }));
        await user.click(screen.getByRole('button', { name: 'Ver más revistas' }));
        expect(screen.queryByRole('button', { name: 'Ver más revistas' })).toBeNull();
        skip(SKIP).focus();
        await user.keyboard('{Enter}');
        expect(focusedText()).toBe('Fin de la lista de revistas');
    });
});

describe('/oportunidades', () => {
    const SKIP = 'Saltar la lista de oportunidades';
    const item = (n) => ({ type: n % 2 ? 'event' : 'journal', id: `s${n}`, title: `Guardada ${pad(n)}`, url: `https://example.org/${n}`, start: '2099-05-10', end: '2099-05-12' });
    const open = async (count, url = '/oportunidades') => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from({ length: count }, (_, i) => item(i + 1))));
        mockDataFetch();
        await renderApp(url);
        await screen.findByRole('heading', { level: 1, name: 'Mis oportunidades' });
        return userEvent.setup();
    };
    beforeEach(() => window.localStorage.clear());

    it('long saved list: skip link before the list, Enter focuses the end marker after the last card', async () => {
        const user = await open(8);
        const link = skip(SKIP);
        expect(link).toBeTruthy();
        expect(link.classList.contains('skip-link')).toBe(true);
        link.focus();
        await user.keyboard('{Enter}');
        expect(focusedText()).toBe('Fin de la lista de oportunidades');
        expect(document.activeElement.getAttribute('tabindex')).toBe('-1');
        const cards = screen.getAllByRole('article');
        expect(cards[cards.length - 1].compareDocumentPosition(document.activeElement) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it('is not shown with a few saved items', async () => {
        await open(3);
        expect(skip(SKIP)).toBeNull();
        expect(screen.getAllByRole('article')).toHaveLength(3);
    });
});
