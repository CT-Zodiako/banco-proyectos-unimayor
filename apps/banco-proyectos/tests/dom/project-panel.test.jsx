import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { deferred, mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID } from './fixtures.js';

const PROJECT_URL = `/proyecto/${PROJECT_ID}`;
const panel = () => screen.queryByRole('dialog', { name: /Monitoreo Agrícola Distribuido/ });
const tab = (name) => screen.getByRole('tab', { name });

describe('project slide-over panel: opening', () => {
    it('does not open without ?panel=', async () => {
        mockDataFetch();
        await renderApp(PROJECT_URL);
        await screen.findByRole('heading', { level: 1, name: /Monitoreo Agrícola Distribuido/ });
        expect(panel()).toBeNull();
    });

    it('opens the journals tab from ?panel=revistas and lists the journals', async () => {
        mockDataFetch();
        await renderApp(`${PROJECT_URL}?panel=revistas`);
        const dialog = await screen.findByRole('dialog', { name: /Monitoreo Agrícola Distribuido/ });
        expect(tab(/^Revistas/).getAttribute('aria-selected')).toBe('true');
        expect(tab(/^Eventos/).getAttribute('aria-selected')).toBe('false');
        const results = await within(dialog).findByRole('region', { name: 'Revistas sugeridas' });
        expect(within(results).getAllByRole('article')).toHaveLength(3);
        expect(within(results).getByText('Journal of Smart Farming')).toBeTruthy();
        // The events download only starts when that tab is first shown.
        expect(screen.queryByRole('region', { name: 'Eventos encontrados' })).toBeNull();
    });

    it('opens the events tab from ?panel=eventos and lists the events of the project', async () => {
        const { requests } = mockDataFetch();
        await renderApp(`${PROJECT_URL}?panel=eventos`);
        const dialog = await screen.findByRole('dialog', { name: /Monitoreo Agrícola Distribuido/ });
        expect(tab(/^Eventos/).getAttribute('aria-selected')).toBe('true');
        const results = await within(dialog).findByRole('region', { name: 'Eventos encontrados' });
        // Only the two events sharing the project topic (IoT) are listed.
        expect(within(results).getAllByRole('heading', { level: 2 }).map((h) => h.textContent)).toEqual(
            expect.arrayContaining(['Congreso IoT Cauca 2099', 'Feria IoT y Robótica 2099']),
        );
        expect(within(results).getAllByRole('article')).toHaveLength(2);
        expect(requests).not.toContain('/data/publicar-data.json');
    });

    it('ignores an invalid ?panel= value', async () => {
        mockDataFetch();
        await renderApp(`${PROJECT_URL}?panel=otro`);
        await screen.findByRole('heading', { level: 1, name: /Monitoreo Agrícola Distribuido/ });
        expect(panel()).toBeNull();
        expect(screen.queryByRole('tab')).toBeNull();
    });

    it('opens from the page buttons, which report their state', async () => {
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp(PROJECT_URL);
        const trigger = await screen.findByRole('button', { name: 'Ver los eventos aquí' });
        expect(trigger.getAttribute('aria-expanded')).toBe('false');
        await user.click(trigger);
        await screen.findByRole('dialog', { name: /Monitoreo Agrícola Distribuido/ });
        expect(window.location.search).toBe('?panel=eventos');
        expect(trigger.getAttribute('aria-expanded')).toBe('true');
        expect(tab(/^Eventos/).getAttribute('aria-selected')).toBe('true');
    });
});

describe('project slide-over panel: tabs', () => {
    it('switches tabs with the arrow keys, Home and End, moving the focus and the URL', async () => {
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp(`${PROJECT_URL}?panel=revistas`);
        await screen.findByRole('dialog', { name: /Monitoreo Agrícola Distribuido/ });
        tab(/^Revistas/).focus();

        await user.keyboard('{ArrowRight}');
        await waitFor(() => expect(tab(/^Eventos/).getAttribute('aria-selected')).toBe('true'));
        expect(document.activeElement).toBe(tab(/^Eventos/));
        expect(window.location.search).toBe('?panel=eventos');
        expect(await screen.findByRole('region', { name: 'Eventos encontrados' })).toBeTruthy();

        await user.keyboard('{ArrowRight}'); // wraps to the first tab
        await waitFor(() => expect(tab(/^Revistas/).getAttribute('aria-selected')).toBe('true'));
        expect(document.activeElement).toBe(tab(/^Revistas/));
        expect(window.location.search).toBe('?panel=revistas');

        await user.keyboard('{ArrowLeft}'); // wraps to the last tab
        await waitFor(() => expect(tab(/^Eventos/).getAttribute('aria-selected')).toBe('true'));

        await user.keyboard('{Home}');
        await waitFor(() => expect(tab(/^Revistas/).getAttribute('aria-selected')).toBe('true'));
        await user.keyboard('{End}');
        await waitFor(() => expect(tab(/^Eventos/).getAttribute('aria-selected')).toBe('true'));
    });

    it('switches tabs by clicking and shows only the active view', async () => {
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp(`${PROJECT_URL}?panel=revistas`);
        await screen.findByRole('dialog', { name: /Monitoreo Agrícola Distribuido/ });
        await screen.findByRole('region', { name: 'Revistas sugeridas' });

        await user.click(tab(/^Eventos/));
        expect(window.location.search).toBe('?panel=eventos');
        expect(await screen.findByRole('region', { name: 'Eventos encontrados' })).toBeTruthy();
        // The journals view stays mounted but hidden: it is not exposed to assistive technology.
        expect(screen.queryByRole('region', { name: 'Revistas sugeridas' })).toBeNull();
        expect(screen.getByRole('tabpanel', { name: /Eventos/ })).toBeTruthy();

        await user.click(tab(/^Revistas/));
        expect(window.location.search).toBe('?panel=revistas');
        expect(screen.getByRole('region', { name: 'Revistas sugeridas' })).toBeTruthy();
        expect(screen.queryByRole('region', { name: 'Eventos encontrados' })).toBeNull();
    });

    it('keeps the other query params when it opens and switches', async () => {
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp(`${PROJECT_URL}?x=1`);
        await user.click(await screen.findByRole('button', { name: 'Ver las revistas aquí' }));
        await screen.findByRole('dialog', { name: /Monitoreo Agrícola Distribuido/ });
        expect(window.location.search).toBe('?x=1&panel=revistas');
        await user.click(tab(/^Eventos/));
        expect(window.location.search).toBe('?x=1&panel=eventos');
    });
});

describe('project slide-over panel: closing', () => {
    it('closes with Esc and returns the focus to the button that opened it', async () => {
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp(PROJECT_URL);
        const trigger = await screen.findByRole('button', { name: 'Ver las revistas aquí' });
        await user.click(trigger);
        await screen.findByRole('dialog', { name: /Monitoreo Agrícola Distribuido/ });
        // The focus moves into the panel on open.
        expect(document.activeElement).toBe(screen.getByRole('button', { name: /Cerrar/ }));

        await user.keyboard('{Escape}');
        await waitFor(() => expect(panel()).toBeNull());
        await waitFor(() => expect(document.activeElement).toBe(trigger));
        expect(window.location.search).toBe('');
        expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('closes an URL-opened panel with Esc, drops the param and focuses that tab\'s button in the page', async () => {
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp(`${PROJECT_URL}?panel=eventos&x=1`);
        await screen.findByRole('dialog', { name: /Monitoreo Agrícola Distribuido/ });

        await user.keyboard('{Escape}');
        await waitFor(() => expect(panel()).toBeNull());
        expect(window.location.search).toBe('?x=1');
        expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Ver los eventos aquí' }));
    });

    it('closes with the Cerrar button', async () => {
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp(`${PROJECT_URL}?panel=revistas`);
        await screen.findByRole('dialog', { name: /Monitoreo Agrícola Distribuido/ });
        await user.click(screen.getByRole('button', { name: /Cerrar/ }));
        await waitFor(() => expect(panel()).toBeNull());
        expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Ver las revistas aquí' }));
    });
});

describe('project slide-over panel: «Abrir en la página completa»', () => {
    it('links to the journal finder of the project on the journals tab and to the event finder on the events tab', async () => {
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp(`${PROJECT_URL}?panel=revistas`);
        const dialog = await screen.findByRole('dialog', { name: /Monitoreo Agrícola Distribuido/ });
        const header = () => within(dialog).getByRole('link', { name: /Abrir en la página completa/ });
        expect(header().getAttribute('href')).toBe(`/donde-publicar?p=${PROJECT_ID}`);
        const card = await within(dialog).findByRole('complementary', { name: 'Vista general de revistas' });
        expect(within(card).getByRole('link', { name: /Abrir la página completa de revistas/ }).getAttribute('href')).toBe(`/donde-publicar?p=${PROJECT_ID}`);

        await user.click(tab(/^Eventos/));
        await waitFor(() => expect(header().getAttribute('href')).toBe(`/eventos?p=${PROJECT_ID}`));
        const eventsCard = await within(dialog).findByRole('complementary', { name: 'Vista general de eventos' });
        expect(within(eventsCard).getByRole('link', { name: /Abrir la página completa de eventos/ }).getAttribute('href')).toBe(`/eventos?p=${PROJECT_ID}`);
    });

    it('navigates to the full page with the project preselected', async () => {
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp(`${PROJECT_URL}?panel=eventos`);
        const dialog = await screen.findByRole('dialog', { name: /Monitoreo Agrícola Distribuido/ });
        await user.click(within(dialog).getByRole('link', { name: /Abrir en la página completa/ }));
        expect(await screen.findByRole('heading', { level: 1, name: 'Buscador de eventos académicos' })).toBeTruthy();
        expect(window.location.pathname).toBe('/eventos');
        expect(window.location.search).toBe(`?p=${PROJECT_ID}`);
        expect(await screen.findByText('Eventos para el proyecto · SBC-IoT · Intermedio')).toBeTruthy();
    });
});

describe('project slide-over panel: loading and errors', () => {
    it.each([
        ['revistas', '/data/publicar-data.json', 'Revistas sugeridas'],
        ['eventos', '/data/eventos.json', 'Eventos encontrados'],
    ])('shows the skeleton while the %s data downloads, then the content', async (panelTab, file, region) => {
        const download = deferred();
        mockDataFetch((path, response) => (path === file ? download.promise.then(() => response) : response));
        await renderApp(`${PROJECT_URL}?panel=${panelTab}`);
        const dialog = await screen.findByRole('dialog', { name: /Monitoreo Agrícola Distribuido/ });
        expect(await within(dialog).findByRole('status', { name: 'Cargando' })).toBeTruthy();
        expect(within(dialog).queryByRole('region', { name: region })).toBeNull();

        download.resolve();
        expect(await within(dialog).findByRole('region', { name: region })).toBeTruthy();
        expect(within(dialog).queryByRole('status', { name: 'Cargando' })).toBeNull();
    });

    it('shows an error with «Reintentar» when the download fails, and recovers on retry', async () => {
        let attempts = 0;
        const { requests } = mockDataFetch((path, response) => {
            if (path !== '/data/publicar-data.json') return response;
            attempts += 1;
            if (attempts === 1) throw new Error('network down');
            return response;
        });
        const user = userEvent.setup();
        await renderApp(`${PROJECT_URL}?panel=revistas`);
        const dialog = await screen.findByRole('dialog', { name: /Monitoreo Agrícola Distribuido/ });
        const alert = await within(dialog).findByRole('alert');
        expect(alert.textContent).toContain('No se pudo cargar las revistas');
        expect(within(dialog).queryByRole('region', { name: 'Revistas sugeridas' })).toBeNull();

        await user.click(within(alert).getByRole('button', { name: 'Reintentar' }));
        expect(await within(dialog).findByRole('region', { name: 'Revistas sugeridas' })).toBeTruthy();
        expect(within(dialog).queryByRole('alert')).toBeNull();
        expect(requests.filter((path) => path === '/data/publicar-data.json')).toHaveLength(2);
    });

    it('treats an HTTP error as a failed download', async () => {
        mockDataFetch((path, response) => (path === '/data/eventos.json' ? { ok: false, status: 503, json: async () => ({}) } : response));
        await renderApp(`${PROJECT_URL}?panel=eventos`);
        const dialog = await screen.findByRole('dialog', { name: /Monitoreo Agrícola Distribuido/ });
        const alert = await within(dialog).findByRole('alert');
        expect(alert.textContent).toContain('No se pudo cargar los eventos');
        expect(within(alert).getByRole('button', { name: 'Reintentar' })).toBeTruthy();
    });
});
