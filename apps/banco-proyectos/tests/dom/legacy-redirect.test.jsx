import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID } from './fixtures.js';

const location = () => ({ pathname: window.location.pathname, search: window.location.search, hash: window.location.hash });

describe('LegacyRedirect: old static page URLs land on the React routes', () => {
    it('/eventos/index.html keeps the query and the hash', async () => {
        mockDataFetch();
        await renderApp(`/eventos/index.html?p=${PROJECT_ID}#x`);
        await waitFor(() => expect(location()).toEqual({ pathname: '/eventos', search: `?p=${PROJECT_ID}`, hash: '#x' }));
        // The redirected page is the event finder with the project of the old link selected.
        expect(await screen.findByRole('heading', { level: 1, name: 'Buscador de eventos académicos' })).toBeTruthy();
        expect(await screen.findByText('Eventos para el proyecto · SBC-IoT · Intermedio')).toBeTruthy();
    });

    it('/donde-publicar/index.html keeps the query and the hash', async () => {
        mockDataFetch();
        await renderApp(`/donde-publicar/index.html?p=${PROJECT_ID}#x`);
        await waitFor(() => expect(location()).toEqual({ pathname: '/donde-publicar', search: `?p=${PROJECT_ID}`, hash: '#x' }));
        expect(await screen.findByRole('heading', { level: 1, name: 'Monitoreo agrícola con MQTT' })).toBeTruthy();
    });

    it('still redirects when there is no query or hash', async () => {
        mockDataFetch();
        await renderApp('/eventos/index.html');
        await waitFor(() => expect(location()).toEqual({ pathname: '/eventos', search: '', hash: '' }));
        expect(await screen.findByRole('heading', { level: 1, name: 'Buscador de eventos académicos' })).toBeTruthy();
    });

    it('replaces the old entry, so Back does not return to the redirecting URL', async () => {
        mockDataFetch();
        const before = window.history.length;
        await renderApp('/donde-publicar/index.html?p=proj_001');
        await waitFor(() => expect(window.location.pathname).toBe('/donde-publicar'));
        expect(window.history.length).toBe(before);
    });
});
