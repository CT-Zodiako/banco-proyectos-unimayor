// T16 of odd/tasks/mejora-visual.md: every JSON download shows a skeleton shaped like the page while it arrives, and a
// failure says what could not be loaded with a «Reintentar» button that downloads it again.
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { deferred, mockDataFetch, renderApp } from './helpers.jsx';
import { publicarFixture } from './fixtures.js';

const EVENTS = '/data/eventos.json';
const PUBLISH = '/data/publicar-data.json';
const CATALOG = '/data/publicar-catalog.json';
const json = (body) => ({ ok: true, status: 200, json: async () => body });
const loadingStatus = () => screen.getByRole('status', { name: 'Cargando' });

describe.each([
    ['/eventos', EVENTS, 'los eventos', { level: 1, name: 'Buscador de eventos académicos' }],
    ['/donde-publicar?p=proj_001', PUBLISH, 'las revistas', { level: 1, name: 'Monitoreo agrícola con MQTT' }],
])('%s', (url, file, what, heading) => {
    it('shows a skeleton with a header block and cards while the data downloads, then the page', async () => {
        const download = deferred();
        mockDataFetch((path, response) => (path === file ? download.promise.then(() => response) : response));
        await renderApp(url);
        const skeleton = await screen.findByRole('status', { name: 'Cargando' });
        expect(skeleton.querySelector('[data-skeleton-header]')).not.toBeNull();
        expect(skeleton.querySelectorAll('[data-skeleton-block]').length).toBeGreaterThanOrEqual(4);
        expect(screen.queryByRole('heading', heading)).toBeNull();
        expect(screen.queryByRole('alert')).toBeNull();

        download.resolve();
        expect(await screen.findByRole('heading', heading)).toBeTruthy();
        expect(screen.queryByRole('status', { name: 'Cargando' })).toBeNull();
    });

    it('says what could not be loaded and «Reintentar» downloads it again and recovers', async () => {
        let attempts = 0;
        const { requests } = mockDataFetch((path, response) => {
            if (path !== file) return response;
            attempts += 1;
            if (attempts === 1) throw new Error('network down');
            return response;
        });
        const user = userEvent.setup();
        await renderApp(url);
        const alert = await screen.findByRole('alert');
        expect(alert.textContent).toContain(`No se pudo cargar ${what}`);
        expect(screen.queryByRole('heading', heading)).toBeNull();
        expect(screen.queryByRole('status', { name: 'Cargando' })).toBeNull();

        await user.click(within(alert).getByRole('button', { name: 'Reintentar' }));
        expect(await screen.findByRole('heading', heading)).toBeTruthy();
        expect(screen.queryByRole('alert')).toBeNull();
        expect(requests.filter((path) => path === file)).toHaveLength(2);
    });

    it('treats an HTTP error as a failed download', async () => {
        mockDataFetch((path, response) => (path === file ? { ok: false, status: 503, json: async () => ({}) } : response));
        await renderApp(url);
        const alert = await screen.findByRole('alert');
        expect(alert.textContent).toContain(`No se pudo cargar ${what}`);
        expect(within(alert).getByRole('button', { name: 'Reintentar' })).toBeTruthy();
    });
});

describe('/donde-publicar catalog tab', () => {
    const open = async (respond) => {
        mockDataFetch((path, response) => respond(path, path === CATALOG ? json(publicarFixture.journals) : response));
        await renderApp('/donde-publicar');
    };

    it('shows a list skeleton while the catalog downloads, then the journals', async () => {
        const download = deferred();
        await open((path, response) => (path === CATALOG ? download.promise.then(() => response) : response));
        await screen.findByRole('heading', { name: 'Catálogo de revistas diamante con cuartil' });
        const panel = screen.getByRole('tabpanel', { name: /^Catálogo completo/ });
        expect(within(panel).getByRole('status', { name: 'Cargando' })).toBeTruthy();
        expect(within(panel).getByText('Cargando catálogo…')).toBeTruthy();

        download.resolve();
        await waitFor(() => expect(within(panel).queryByRole('status', { name: 'Cargando' })).toBeNull());
        expect(within(panel).getByText(/^Mostrando \d+ de \d+ revistas$/)).toBeTruthy();
    });

    it('says the catalog could not be loaded and «Reintentar» recovers', async () => {
        let attempts = 0;
        await open((path, response) => {
            if (path !== CATALOG) return response;
            attempts += 1;
            if (attempts === 1) throw new Error('network down');
            return response;
        });
        const user = userEvent.setup();
        const panel = await screen.findByRole('tabpanel', { name: /^Catálogo completo/ });
        expect(await within(panel).findByText('No se pudo cargar el catálogo.')).toBeTruthy();
        expect(within(panel).queryByRole('status', { name: 'Cargando' })).toBeNull();
        await user.click(within(panel).getByRole('button', { name: 'Reintentar' }));
        expect(await within(panel).findByText(/^Mostrando \d+ de \d+ revistas$/)).toBeTruthy();
        expect(attempts).toBe(2);
    });
});

describe('the skeleton helper stays out of the way', () => {
    it('a loaded page has no leftover status named «Cargando»', async () => {
        mockDataFetch();
        await renderApp('/eventos');
        await screen.findByRole('heading', { level: 1, name: 'Buscador de eventos académicos' });
        expect(screen.queryByRole('status', { name: 'Cargando' })).toBeNull();
        expect(loadingStatus).toThrow();
    });
});
