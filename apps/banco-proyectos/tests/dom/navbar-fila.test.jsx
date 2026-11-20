// T14 of odd/tasks/mejora-visual.md: the header stays on ONE row from 1280px up after the «Buscar» button was added.
// jsdom has no layout, so these tests pin the markup that makes it possible (the long brand text shrinks and is
// truncated, the search label hides visually between 1024 and 1536px) and that nothing else changed (names, landmarks).
import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';

const INSTITUTION = 'Institución Universitaria Colegio Mayor del Cauca';
const classes = (node) => node.className.split(/\s+/);

const open = async () => {
    mockDataFetch();
    await renderApp('/proyectos');
    return screen.getByRole('navigation', { name: 'Principal' });
};

describe('Navbar: one row from 1280px', () => {
    it('the institution name can shrink and truncate (from 1280px, where the header is one row), and the full name stays in a title', async () => {
        const nav = await open();
        const name = within(nav).getByText(INSTITUTION);
        expect(classes(name)).toContain('min-[1280px]:truncate');
        expect(name.getAttribute('title')).toBe(INSTITUTION);
        expect(classes(name.parentElement)).toContain('min-w-0');
        expect(classes(name.closest('a'))).toContain('min-w-0');
    });

    it('the subtitle truncates too, and the home link keeps its accessible name', async () => {
        const nav = await open();
        const subtitle = within(nav).getByText('Laboratorio de Física y Sistemas Embebidos');
        expect(classes(subtitle)).toContain('min-[1280px]:truncate');
        const home = within(nav).getByRole('link', { name: /Institución Universitaria Colegio Mayor del Cauca.*Ir al inicio/ });
        expect(home.getAttribute('href')).toBe('/');
    });

    it('the «Buscar» word hides visually between 1024 and 1536px but stays in the DOM and the accessible name', async () => {
        const nav = await open();
        const button = within(nav).getByRole('button', { name: 'Buscar en todo el sitio' });
        const label = [...button.querySelectorAll('span')].find((span) => span.textContent === 'Buscar');
        expect(label).toBeTruthy();
        expect(label.className).toContain('min-[1024px]:max-[1535px]:sr-only');
        expect(button.getAttribute('aria-label')).toBe('Buscar en todo el sitio');
        expect(button.textContent).toMatch(/Buscar/);
        expect(button.querySelector('kbd').textContent).toMatch(/Ctrl K|⌘ K/);
    });

    it('the nav links keep a compact padding between 1024 and 1536px and the same current-page markers', async () => {
        const nav = await open();
        const current = within(nav).getByRole('link', { name: 'Proyectos' });
        expect(current.getAttribute('aria-current')).toBe('page');
        expect(classes(current)).toContain('border-b-white');
        for (const name of ['Proyectos', 'Eventos académicos', 'Dónde publicar', 'Mis oportunidades']) {
            const link = within(nav).getByRole('link', { name });
            expect(classes(link)).toContain('min-[1024px]:max-[1535px]:px-2.5');
        }
        expect(within(nav).getByRole('link', { name: 'Eventos académicos' }).querySelector('.nav-dot.tn-events')).toBeTruthy();
        expect(within(nav).getByRole('link', { name: 'Dónde publicar' }).querySelector('.nav-dot.tn-journals')).toBeTruthy();
    });
});
