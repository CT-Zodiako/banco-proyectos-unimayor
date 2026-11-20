import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID } from './fixtures.js';

const EVENTS_TITLES = ['Congreso IoT Cauca 2099', 'Taller de Robótica Abierta', 'Simposio de Ciberseguridad 2099', 'Feria IoT y Robótica 2099'];

describe('/eventos filters', () => {
    const results = () => screen.getByRole('region', { name: 'Eventos encontrados' });
    const titles = () => within(results()).queryAllByRole('heading', { level: 2 }).map((heading) => heading.textContent);
    const open = async () => {
        mockDataFetch();
        await renderApp('/eventos');
        await screen.findByRole('region', { name: 'Eventos encontrados' });
    };

    it('lists every event at first', async () => {
        await open();
        expect(titles().sort()).toEqual([...EVENTS_TITLES].sort());
        expect(screen.getByText('4 eventos vigentes')).toBeTruthy();
        expect(screen.queryByRole('button', { name: 'Limpiar filtros' })).toBeNull();
    });

    it('the kind filter narrows the cards and writes the URL', async () => {
        await open();
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Convocatorias (presentar)' }));
        await waitFor(() => expect(titles().sort()).toEqual(['Congreso IoT Cauca 2099', 'Simposio de Ciberseguridad 2099']));
        expect(screen.getByRole('button', { name: 'Convocatorias (presentar)' }).getAttribute('aria-pressed')).toBe('true');
        expect(screen.getByRole('button', { name: 'Todos' }).getAttribute('aria-pressed')).toBe('false');
        expect(window.location.search).toBe('?kind=cfp');
        expect(screen.getByText('2 eventos vigentes')).toBeTruthy();

        await user.click(screen.getByRole('button', { name: 'Para asistir' }));
        await waitFor(() => expect(titles().sort()).toEqual(['Feria IoT y Robótica 2099', 'Taller de Robótica Abierta']));
        expect(window.location.search).toBe('?kind=attend');
    });

    it('a topic filter narrows the cards and writes the URL; a second topic widens it', async () => {
        await open();
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: /^IoT, 2 eventos$/ }));
        await waitFor(() => expect(titles().sort()).toEqual(['Congreso IoT Cauca 2099', 'Feria IoT y Robótica 2099']));
        expect(window.location.search).toBe('?tema=IoT');
        expect(screen.getByRole('button', { name: /^IoT, / }).getAttribute('aria-pressed')).toBe('true');

        await user.click(screen.getByRole('button', { name: /^Ciberseguridad, / }));
        await waitFor(() => expect(titles()).toHaveLength(3));
        expect(window.location.search).toBe('?tema=IoT%2CCiberseguridad');
    });

    it('kind and topic combine, and «Limpiar filtros» restores every event and the plain URL', async () => {
        await open();
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Convocatorias (presentar)' }));
        await user.click(screen.getByRole('button', { name: /^IoT, / }));
        await waitFor(() => expect(titles()).toEqual(['Congreso IoT Cauca 2099']));
        expect(window.location.search).toBe('?kind=cfp&tema=IoT');

        await user.click(screen.getByRole('button', { name: 'Limpiar filtros' }));
        await waitFor(() => expect(titles()).toHaveLength(4));
        expect(window.location.search).toBe('');
        expect(screen.getByRole('button', { name: 'Todos' }).getAttribute('aria-pressed')).toBe('true');
        expect(screen.queryByRole('button', { name: 'Limpiar filtros' })).toBeNull();
    });

    it('reads the filters from the URL it is opened with', async () => {
        mockDataFetch();
        await renderApp('/eventos?kind=attend&tema=Robótica');
        await screen.findByRole('region', { name: 'Eventos encontrados' });
        expect(titles().sort()).toEqual(['Feria IoT y Robótica 2099', 'Taller de Robótica Abierta']);
        expect(screen.getByRole('button', { name: 'Para asistir' }).getAttribute('aria-pressed')).toBe('true');
    });

    it('shows an empty state with a way back when nothing matches', async () => {
        await open();
        const user = userEvent.setup();
        await user.type(screen.getByRole('searchbox', { name: 'Buscar por nombre o lugar' }), 'zzzz');
        await waitFor(() => expect(titles()).toEqual([]));
        expect(screen.getByText('Sin resultados')).toBeTruthy();
        await user.click(within(results()).getByRole('button', { name: 'Limpiar filtros' }));
        await waitFor(() => expect(titles()).toHaveLength(4));
        expect(window.location.search).toBe('');
    });
});

describe('/donde-publicar filters', () => {
    const results = () => screen.getByRole('region', { name: 'Revistas sugeridas' });
    const titles = () => within(results()).queryAllByRole('article').map((article) => within(article).getByRole('heading', { level: 3 }).textContent.replace(/Q\d.*$/, '').trim());
    const open = async () => {
        mockDataFetch();
        await renderApp(`/donde-publicar?p=${PROJECT_ID}`);
        await screen.findByRole('region', { name: 'Revistas sugeridas' });
    };
    const count = () => screen.getByText(/ revistas$/, { selector: 'span[aria-live="polite"]' }).textContent;

    it('lists the journals of the project at first', async () => {
        await open();
        expect(titles().sort()).toEqual(['Journal of Smart Farming', 'Revista Colombiana de Sensores', 'Revista de Electrónica Aplicada']);
        expect(count()).toBe('3 de 3 revistas');
    });

    it('the search narrows the list and clearing it restores every journal', async () => {
        await open();
        const user = userEvent.setup();
        const search = screen.getByRole('searchbox', { name: 'Buscar revistas' });
        await user.type(search, 'sensores');
        await waitFor(() => expect(titles()).toEqual(['Revista Colombiana de Sensores']));
        expect(count()).toBe('1 de 3 revistas');

        await user.clear(search);
        await waitFor(() => expect(titles()).toHaveLength(3));
        expect(count()).toBe('3 de 3 revistas');
    });

    it('a search without matches shows the empty message', async () => {
        await open();
        const user = userEvent.setup();
        await user.type(screen.getByRole('searchbox', { name: 'Buscar revistas' }), 'zzzz');
        await waitFor(() => expect(titles()).toEqual([]));
        expect(within(results()).getByText(/Ninguna revista cumple estos filtros/)).toBeTruthy();
        expect(count()).toBe('0 de 3 revistas');
    });

    it('a custom filter narrows the list, shows a chip, and «Limpiar todo» restores the list', async () => {
        await open();
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: /Filtros personalizados/ }));
        const panel = await screen.findByRole('complementary', { name: 'Filtros personalizados' });
        await user.click(within(panel).getByRole('button', { name: 'Q1 · A1' }));
        await waitFor(() => expect(titles()).toEqual(['Journal of Smart Farming']));
        expect(count()).toBe('1 de 3 revistas');
        expect(within(panel).getByRole('button', { name: 'Q1 · A1' }).getAttribute('aria-pressed')).toBe('true');

        await user.click(screen.getByRole('button', { name: 'Limpiar todo' }));
        await waitFor(() => expect(titles()).toHaveLength(3));
        expect(screen.queryByRole('button', { name: 'Limpiar todo' })).toBeNull();
        expect(count()).toBe('3 de 3 revistas');
    });

    it('a chip removes just its own filter', async () => {
        await open();
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: /Filtros personalizados/ }));
        const panel = await screen.findByRole('complementary', { name: 'Filtros personalizados' });
        await user.click(within(panel).getByRole('button', { name: 'Q3 · B' }));
        await waitFor(() => expect(titles()).toEqual(['Revista Colombiana de Sensores']));
        await user.click(screen.getByRole('button', { name: /^Quitar filtro/ }));
        await waitFor(() => expect(titles()).toHaveLength(3));
    });
});
