import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID } from './fixtures.js';

// Every route of the app. `ready` waits until the page (some are lazy) has drawn its h1.
const ROUTES = [
    { url: '/', h1: /Banco de Proyectos/ },
    { url: '/proyectos', h1: 'Explorar proyectos' },
    { url: `/proyecto/${PROJECT_ID}`, h1: /Monitoreo Agrícola Distribuido/ },
    { url: '/oportunidades', h1: 'Mis oportunidades' },
    { url: '/contacto', h1: 'Contacto' },
    { url: '/acerca', h1: 'Sobre el Banco de Proyectos' },
    { url: '/eventos', h1: /eventos académicos/i },
    { url: `/donde-publicar?p=${PROJECT_ID}`, h1: /Monitoreo agrícola con MQTT/ },
    { url: '/ruta-que-no-existe', h1: 'Página no encontrada' },
];

const open = async ({ url, h1 }) => {
    mockDataFetch();
    await renderApp(url);
    await screen.findByRole('heading', { level: 1, name: h1 });
};

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),summary,[tabindex]:not([tabindex="-1"])';
const pageLandmark = (selector) => [...document.querySelectorAll(selector)].filter((el) => !el.closest('main,article,section,aside,dialog'));

describe('skip link', () => {
    it('is the first focusable element and moves the focus to the main content without touching the URL', async () => {
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp('/proyectos?area=Redes');
        await screen.findByRole('region', { name: 'Resultados' });
        const skip = screen.getByRole('link', { name: 'Saltar al contenido' });
        expect(document.querySelector(FOCUSABLE)).toBe(skip);
        expect(skip.getAttribute('href')).toBe('#contenido');
        await user.tab();
        expect(document.activeElement).toBe(skip);
        await user.keyboard('{Enter}');
        const main = screen.getByRole('main');
        expect(main.id).toBe('contenido');
        expect(document.activeElement).toBe(main);
        expect(window.location.pathname + window.location.search + window.location.hash).toBe('/proyectos?area=Redes');
    });
});

describe.each(ROUTES)('page structure of $url', (route) => {
    it('has one banner, one main, one footer and one main navigation', async () => {
        await open(route);
        expect(pageLandmark('header')).toHaveLength(1);
        expect(screen.getAllByRole('main')).toHaveLength(1);
        expect(pageLandmark('footer')).toHaveLength(1);
        expect(screen.getAllByRole('navigation', { name: 'Principal' })).toHaveLength(1);
        expect(pageLandmark('header')[0].contains(screen.getByRole('navigation', { name: 'Principal' }))).toBe(true);
    });

    it('has exactly one h1 and its headings never skip a level', async () => {
        await open(route);
        expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
        const levels = screen.getAllByRole('heading').map((h) => Number(h.tagName[1]));
        levels.forEach((level, index) => {
            if (index > 0) expect(level, `heading ${index} (${screen.getAllByRole('heading')[index].textContent}) after level ${levels[index - 1]}`).toBeLessThanOrEqual(levels[index - 1] + 1);
        });
    });

    it('gives every button and link an accessible name', async () => {
        await open(route);
        expect(screen.queryAllByRole('button', { name: /^\s*$/ }).map((el) => el.outerHTML)).toEqual([]);
        expect(screen.queryAllByRole('link', { name: /^\s*$/ }).map((el) => el.outerHTML)).toEqual([]);
    });

    it('labels every form field', async () => {
        await open(route);
        const fields = [...document.querySelectorAll('input:not([type=hidden]), select, textarea')];
        for (const field of fields) {
            const named = field.getAttribute('aria-label') || field.getAttribute('aria-labelledby') || field.closest('label') || (field.id && document.querySelector(`label[for="${field.id}"]`));
            expect(Boolean(named), field.outerHTML).toBe(true);
        }
    });
});

describe('footer', () => {
    it('lists the same destinations as before under h2 headings', async () => {
        await open(ROUTES[0]);
        const footer = pageLandmark('footer')[0];
        expect(within(footer).getAllByRole('heading').map((h) => [h.tagName, h.textContent])).toEqual([
            ['H2', 'UNIMAYOR'], ['H2', 'Enlaces rápidos'], ['H2', 'Contacto'],
        ]);
        const hrefs = within(footer).getAllByRole('link').map((a) => a.getAttribute('href'));
        expect(hrefs).toEqual(['/', '/proyectos', '/eventos', '/donde-publicar', '/acerca', '/contacto']);
    });
});
