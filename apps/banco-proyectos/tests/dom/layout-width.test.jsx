import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID } from './fixtures.js';

const CONTAINER = 'page-container';
const hasContainer = (node) => node.classList.contains(CONTAINER);

const open = async (url) => {
    mockDataFetch();
    await renderApp(url);
};

describe('Wide screens: one shared page container', () => {
    it('header, main and footer use the same .page-container rule (no private max-w-7xl)', async () => {
        await open('/proyectos');
        await screen.findByRole('heading', { level: 1, name: 'Explorar proyectos' });
        const header = document.querySelector('header nav > div');
        const main = document.querySelector('main');
        const footer = document.querySelector('footer > div');
        for (const node of [header, main, footer]) {
            expect(hasContainer(node)).toBe(true);
            expect(node.className).not.toContain('max-w-7xl');
        }
    });

    it('the catalog page does not nest a second container or horizontal padding inside main', async () => {
        await open('/proyectos');
        const heading = await screen.findByRole('heading', { level: 1, name: 'Explorar proyectos' });
        const root = document.querySelector('main').firstElementChild;
        expect(root.contains(heading)).toBe(true);
        expect(root.className).not.toMatch(/max-w-7xl|mx-auto|\bpx-\d/);
        expect(document.querySelectorAll(`.${CONTAINER}`).length).toBe(3);
    });

    it('the compare tray (fixed variant) reuses the shared container', async () => {
        const { default: CompareTray } = await import('../../src/components/publicar/CompareTray.jsx');
        const { render } = await import('@testing-library/react');
        const { container } = render(<CompareTray journals={[]} affinityById={new Map()} onRemove={() => {}} onClear={() => {}} onHeight={() => {}} />);
        const inner = container.querySelector('aside > div');
        expect(inner.className).toContain(CONTAINER);
        expect(inner.className).not.toContain('max-w-7xl');
    });

    it('the project cards grid goes to 3 columns from 1700px and keeps 2 columns before that', async () => {
        await open('/proyectos');
        await screen.findByRole('heading', { level: 1, name: 'Explorar proyectos' });
        const grid = document.querySelector('section[aria-label="Resultados"] article').parentElement;
        expect(grid.className).toContain('min-[1101px]:grid-cols-2');
        expect(grid.className).toContain('min-[1700px]:grid-cols-3');
    });

    it('keeps the detail route inside the same container', async () => {
        await open(`/proyecto/${PROJECT_ID}`);
        await screen.findByRole('heading', { level: 1 });
        expect(hasContainer(document.querySelector('main'))).toBe(true);
    });
});
