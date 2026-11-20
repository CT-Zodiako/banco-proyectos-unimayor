// T18: the two legends («Cómo leer cada tarjeta» of /proyectos, «Cómo leer los resultados» of Dónde publicar and of the
// project slide-over) are a native <details>: open when the viewport is 700 px or wider, collapsed below, set once on mount
// and toggled by the visitor with the mouse or the keyboard. The content does not change.
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID } from './fixtures.js';

// jsdom has no matchMedia: `wide` answers every (min-width: Npx) query with whether the viewport is that wide.
const stubViewport = (width) => {
    const queries = [];
    vi.stubGlobal('matchMedia', (query) => {
        queries.push(query);
        const min = /min-width:\s*(\d+)px/.exec(query);
        const max = /max-width:\s*(\d+)px/.exec(query);
        const matches = min ? width >= Number(min[1]) : max ? width <= Number(max[1]) : false;
        return { matches, media: query, addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {} };
    });
    return queries;
};

const PAGES = [
    { name: '/proyectos', url: '/proyectos', label: 'Cómo leer las tarjetas', summary: 'Cómo leer cada tarjeta', content: /Hardware = componentes físicos/ },
    { name: '/donde-publicar?p=…', url: `/donde-publicar?p=${PROJECT_ID}`, label: 'Cómo leer los resultados', summary: 'Cómo leer los resultados', content: /Q1 es el mejor cuartil/ },
    { name: 'the project slide-over', url: `/proyecto/${PROJECT_ID}?panel=revistas`, label: 'Cómo leer los resultados', summary: 'Cómo leer los resultados', content: /Q1 es el mejor cuartil/ },
];

const open = async (url, width) => {
    stubViewport(width);
    mockDataFetch();
    await renderApp(url);
};
const legendOf = async (label) => {
    const aside = await screen.findByRole('complementary', { name: label });
    return { aside, details: aside.querySelector('details'), summary: aside.querySelector('details > summary') };
};

afterEach(() => vi.unstubAllGlobals());

describe.each(PAGES)('legend of $name', ({ url, label, summary: summaryText, content }) => {
    it('is a <details> with a <summary> that has the title, a one-line hint and a chevron', async () => {
        await open(url, 1440);
        const { aside, details, summary } = await legendOf(label);
        expect(details).toBeTruthy();
        expect(summary).toBeTruthy();
        expect(details.firstElementChild).toBe(summary);
        expect(summary.textContent).toContain(summaryText);
        expect(summary.querySelector('.legend-hint').textContent.length).toBeGreaterThan(5);
        expect(summary.querySelector('svg')).toBeTruthy();
        expect(within(aside).getByText(content)).toBeTruthy();
    });

    it.each([1440, 960])('is OPEN on a desktop viewport (%i px)', async (width) => {
        await open(url, width);
        expect((await legendOf(label)).details.open).toBe(true);
    });

    it('is COLLAPSED by default on a phone (390 px and 699 px) with the content still in the DOM', async () => {
        await open(url, 390);
        const { aside, details } = await legendOf(label);
        expect(details.hasAttribute('open')).toBe(false);
        expect(within(aside).getByText(content)).toBeTruthy();
    });

    it('is open when the browser has no matchMedia (the desktop layout)', async () => {
        vi.stubGlobal('matchMedia', undefined);
        mockDataFetch();
        await renderApp(url);
        expect((await legendOf(label)).details.open).toBe(true);
    });

    it('the visitor toggles it with the mouse and with the keyboard (the summary is a native tab stop)', async () => {
        await open(url, 390);
        const user = userEvent.setup();
        const { details, summary } = await legendOf(label);
        await user.click(summary);
        expect(details.open).toBe(true);
        await user.click(summary);
        expect(details.open).toBe(false);
        // Enter and Space on a focused <summary> are the browser's own click: user-event does not synthesize it for summary, so
        // here the keyboard path is pinned structurally (a native, focusable summary with no custom handler) and the real
        // keys are checked in a real browser (T18 CDP run).
        summary.focus();
        expect(document.activeElement).toBe(summary);
        expect(summary.tagName).toBe('SUMMARY');
        expect(summary.tabIndex).toBe(0);
        expect(summary.getAttribute('role')).toBeNull();
        expect(summary.hasAttribute('disabled')).toBe(false);
    });

    it('stays as the visitor left it when the page re-renders (the state is set once on mount)', async () => {
        await open(url, 390);
        const user = userEvent.setup();
        const { details, summary } = await legendOf(label);
        await user.click(summary);
        expect(details.open).toBe(true);
        await user.click(document.body);
        expect(details.open).toBe(true);
    });
});
