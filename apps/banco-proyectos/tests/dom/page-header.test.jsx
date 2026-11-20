// T15 of odd/tasks/mejora-visual.md (L18: "esta parte no se ve uniform como la de dodne publicar"): /eventos and
// /donde-publicar share ONE header card (PageHeader): hue top border, icon tile, eyebrow, h1, actions on the right
// with the back button and «Mis oportunidades guardadas →» inside the card; then the same vertical order.
// Markup only: routes, hrefs and behavior are the ones pinned by the other DOM tests.
import { cleanup, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID } from './fixtures.js';

const PAGES = [
    { name: '/eventos', url: '/eventos', hue: 'tn-events', back: ['Volver al banco de proyectos', '/proyectos'] },
    { name: `/eventos?p=${PROJECT_ID}`, url: `/eventos?p=${PROJECT_ID}`, hue: 'tn-events', back: ['Volver al banco de proyectos', '/proyectos'] },
    { name: '/donde-publicar', url: '/donde-publicar', hue: 'tn-journals', back: null },
    { name: `/donde-publicar?p=${PROJECT_ID}`, url: `/donde-publicar?p=${PROJECT_ID}`, hue: 'tn-journals', back: ['Volver al proyecto', `/proyecto/${PROJECT_ID}`] },
];

const open = async (url) => {
    mockDataFetch();
    await renderApp(url);
    await screen.findByRole('heading', { level: 1 });
};
const headerOf = () => document.querySelector('main .page-header');
const shell = (node) => [...node.classList].filter((name) => !name.startsWith('tn-')).sort().join(' ');

describe('PageHeader: the same header card on /eventos and /donde-publicar', () => {
    it.each(PAGES)('$name renders one header card with its hue, icon tile, eyebrow and the only h1', async ({ url, hue }) => {
        await open(url);
        const header = headerOf();
        expect(header).toBeTruthy();
        expect(document.querySelectorAll('main .page-header')).toHaveLength(1);
        expect(header.classList.contains('hue-card')).toBe(true);
        expect(header.classList.contains(hue)).toBe(true);
        expect(header.querySelector('.page-header-icon.type-chip')).toBeTruthy();
        expect(header.querySelector('.page-header-eyebrow')?.textContent).toBeTruthy();
        const h1s = screen.getAllByRole('heading', { level: 1 });
        expect(h1s).toHaveLength(1);
        expect(header.contains(h1s[0])).toBe(true);
        expect(h1s[0].classList.contains('page-header-title')).toBe(true);
    });

    it.each(PAGES)('$name has «Mis oportunidades guardadas →» INSIDE the card, in the actions area', async ({ url }) => {
        await open(url);
        const header = headerOf();
        const link = within(header).getByRole('link', { name: /Mis oportunidades guardadas/ });
        expect(link.getAttribute('href')).toBe('/oportunidades');
        expect(header.querySelector('.page-header-actions').contains(link)).toBe(true);
        expect(screen.getAllByRole('link', { name: /Mis oportunidades guardadas/ })).toHaveLength(1);
    });

    it.each(PAGES)('$name keeps the back button (same href) inside the actions, before the saved link', async ({ url, back }) => {
        await open(url);
        const actions = headerOf().querySelector('.page-header-actions');
        if (!back) {
            expect(within(actions).queryByRole('link', { name: /Volver/ })).toBeNull();
            return;
        }
        const link = within(actions).getByRole('link', { name: new RegExp(back[0]) });
        expect(link.getAttribute('href')).toBe(back[1]);
        expect(link.classList.contains('btn-secondary')).toBe(true);
        const saved = within(actions).getByRole('link', { name: /Mis oportunidades guardadas/ });
        expect(link.compareDocumentPosition(saved) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it('both pages use exactly the same card, icon, text and actions classes (only the hue differs)', async () => {
        const signatures = [];
        for (const url of ['/eventos', `/donde-publicar?p=${PROJECT_ID}`]) {
            cleanup();
            await open(url);
            const header = headerOf();
            signatures.push({
                card: shell(header),
                icon: shell(header.querySelector('.page-header-icon')),
                eyebrow: shell(header.querySelector('.page-header-eyebrow')),
                title: shell(header.querySelector('h1')),
                actions: shell(header.querySelector('.page-header-actions')),
                children: [...header.children].map((child) => child.className),
            });
        }
        expect(signatures[0]).toEqual(signatures[1]);
    });
});

describe('Vertical order under the header', () => {
    const siblingsAfterHeader = () => {
        const roots = [...headerOf().parentElement.children];
        return roots.slice(roots.indexOf(headerOf()) + 1);
    };

    it('/eventos: header → data status → project hint → filters', async () => {
        await open('/eventos');
        const [status, hint, filters] = siblingsAfterHeader();
        expect(status).toBe(screen.getByRole('region', { name: 'Estado de los datos' }));
        expect(hint).toBe(document.getElementById('project-hint-title').closest('section'));
        expect(filters).toBe(screen.getByRole('search', { name: 'Filtros de eventos' }));
    });

    it.each(['/donde-publicar', `/donde-publicar?p=${PROJECT_ID}`])('%s: header → data status → tabs', async (url) => {
        await open(url);
        const [status, tabs] = siblingsAfterHeader();
        expect(status).toBe(screen.getByRole('region', { name: 'Estado de los datos' }));
        expect(tabs).toBe(screen.getByRole('tablist', { name: 'Secciones' }));
    });

    it('both pages use the same vertical padding and gap between blocks', async () => {
        const roots = [];
        for (const url of ['/eventos', '/donde-publicar']) {
            cleanup();
            await open(url);
            roots.push(headerOf().parentElement.className.split(/\s+/).filter((name) => /^(py-|space-y-|gap-)/.test(name)).sort());
        }
        expect(roots[0]).toEqual(roots[1]);
        expect(roots[0].length).toBeGreaterThan(0);
    });
});

describe('/eventos project hint card', () => {
    it('uses the events hue (left edge + tint) and the same radius and padding as the filters card, not the blue edge', async () => {
        await open('/eventos');
        const hint = document.getElementById('project-hint-title').closest('section');
        const filters = screen.getByRole('search', { name: 'Filtros de eventos' });
        expect(hint.classList.contains('tn-events')).toBe(true);
        expect(hint.classList.contains('hue-edge')).toBe(true);
        expect(hint.className).not.toContain('border-l-institutional-blue');
        for (const token of ['rounded-2xl', 'p-5', 'shadow-sm']) {
            expect(hint.classList.contains(token), token).toBe(true);
            expect(filters.classList.contains(token), token).toBe(true);
        }
    });
});
