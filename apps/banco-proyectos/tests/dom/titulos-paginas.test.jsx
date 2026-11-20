// T18 (S3-S4 of odd/tasks/mejora-visual.md): every page sets a meaningful document.title client side and gives the
// default one back when the route changes. Nothing is announced (no live region): the screen reader gets the route change
// through the existing focus management, which this file does not touch.
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID } from './fixtures.js';

const SITE = 'Banco de Proyectos UNIMAYOR';

const titleAt = async (url, heading) => {
    mockDataFetch();
    await renderApp(url);
    await screen.findByRole('heading', { level: 1, name: heading });
    return document.title;
};

describe('document.title per route', () => {
    it.each([
        ['/proyectos', /Explorar proyectos/, `Explorar proyectos · ${SITE}`],
        ['/proyectos/comparar', /Comparar proyectos/, `Comparar proyectos · ${SITE}`],
        ['/oportunidades', 'Mis oportunidades', `Mis oportunidades · ${SITE}`],
        ['/acerca', /Sobre el Banco/, `Sobre el Banco · ${SITE}`],
        ['/contacto', 'Contacto', `Contacto · ${SITE}`],
        ['/eventos', /eventos académicos/i, `Eventos académicos · ${SITE}`],
        ['/donde-publicar', /¿Dónde publicar\?/, `Dónde publicar · ${SITE}`],
        ['/ruta-que-no-existe', 'Página no encontrada', `Página no encontrada · ${SITE}`],
        ['/proyecto/no-existe', 'Proyecto no encontrado', `Proyecto no encontrado · ${SITE}`],
    ])('%s → «%s»', async (url, heading, expected) => {
        expect(await titleAt(url, heading)).toBe(expected);
    });

    it('/ has the site title (no page prefix), the one of index.html', async () => {
        mockDataFetch();
        await renderApp('/');
        await screen.findByRole('heading', { level: 1 });
        expect(document.title).toMatch(new RegExp(`^${SITE}`));
        expect(document.title).not.toMatch(/·/);
    });

    it('a project page says «Proyecto N: título» and the site', async () => {
        mockDataFetch();
        await renderApp(`/proyecto/${PROJECT_ID}`);
        await screen.findByRole('heading', { level: 1 });
        await waitFor(() => expect(document.title).toMatch(new RegExp(`^Proyecto 1: .+ · ${SITE}$`)));
        // the number and the emoji of the heading are not repeated twice
        expect(document.title).not.toMatch(/Proyecto 1: .*Proyecto 1:/);
    });

    it('/eventos and /donde-publicar with a project name the project first', async () => {
        const eventos = await titleAt(`/eventos?p=${PROJECT_ID}`, /eventos académicos/i);
        expect(eventos).toBe(`Monitoreo agrícola con MQTT · Eventos académicos · ${SITE}`);
        cleanup();
        const publicar = await titleAt(`/donde-publicar?p=${PROJECT_ID}`, 'Monitoreo agrícola con MQTT');
        expect(publicar).toBe(`Monitoreo agrícola con MQTT · Dónde publicar · ${SITE}`);
    });

    it('changes with the route and does not keep the previous page title', async () => {
        mockDataFetch();
        await renderApp('/acerca');
        await screen.findByRole('heading', { level: 1, name: /Sobre el Banco/ });
        expect(document.title).toBe(`Sobre el Banco · ${SITE}`);
        await userEvent.setup().click(screen.getAllByRole('link', { name: 'Contacto' }).at(-1));
        await screen.findByRole('heading', { level: 1, name: 'Contacto' });
        await waitFor(() => expect(document.title).toBe(`Contacto · ${SITE}`));
    });

    it('goes back to the site title when the page unmounts', async () => {
        mockDataFetch();
        const view = await renderApp('/oportunidades');
        await screen.findByRole('heading', { level: 1, name: 'Mis oportunidades' });
        expect(document.title).toBe(`Mis oportunidades · ${SITE}`);
        view.unmount();
        expect(document.title).toBe(SITE);
    });

    it('announces nothing: no new live region is added for the title', async () => {
        mockDataFetch();
        await renderApp('/acerca');
        await screen.findByRole('heading', { level: 1, name: /Sobre el Banco/ });
        expect(document.querySelectorAll('[aria-live]').length).toBeLessThanOrEqual(1);
        expect(document.querySelector('[data-document-title]')).toBeNull();
    });
});
