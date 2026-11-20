// T8 of odd/tasks/mejora-visual.md: the «Inicio desde» / «Inicio hasta» filters of Eventos are Spanish dd/mm/aaaa text
// fields with helper text, inline validation and an optional native calendar. The state and the URL still hold ISO dates.
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID } from './fixtures.js';

const openEventos = async (url = '/eventos') => {
    mockDataFetch();
    await renderApp(url);
    await screen.findByRole('region', { name: 'Eventos encontrados' });
};
const titles = (scope = screen) => within(scope.getByRole ? scope.getByRole('region', { name: 'Eventos encontrados' }) : scope)
    .queryAllByRole('heading', { level: 2 }).map((h) => h.textContent).sort();
const ALL = ['Congreso IoT Cauca 2099', 'Feria IoT y Robótica 2099', 'Simposio de Ciberseguridad 2099', 'Taller de Robótica Abierta'];
const FROM_JULY = ['Feria IoT y Robótica 2099', 'Simposio de Ciberseguridad 2099'];

afterEach(() => { delete HTMLInputElement.prototype.showPicker; });

describe('/eventos: date fields in Spanish', () => {
    it('are text inputs with a visible label, dd/mm/aaaa placeholder, numeric keypad, no autocomplete and a helper text', async () => {
        await openEventos();
        const filters = screen.getByRole('search', { name: 'Filtros de eventos' });
        for (const [label, id] of [['Inicio desde', 'date-from'], ['Inicio hasta', 'date-to']]) {
            const input = within(filters).getByLabelText(label);
            expect(input.id).toBe(id);
            expect(input.tagName).toBe('INPUT');
            expect(input.type).toBe('text');
            expect(input.placeholder).toBe('dd/mm/aaaa');
            expect(input.getAttribute('inputmode')).toBe('numeric');
            expect(input.getAttribute('autocomplete')).toBe('off');
            expect(input.getAttribute('maxlength')).toBe('10');
            expect(input.getAttribute('aria-invalid')).not.toBe('true');
            expect(input.value).toBe('');
            const help = document.getElementById(input.getAttribute('aria-describedby').split(' ')[0]);
            expect(help.textContent).toBe('Escribe la fecha como dd/mm/aaaa, por ejemplo 15/03/2027');
            expect(filters.querySelector(`label[for="${id}"]`).classList.contains('sr-only')).toBe(false);
        }
        expect(filters.querySelector('input[type="date"]')).toBeNull();
    });

    it('typing only digits adds the slashes and filters by the ISO date (list and URL)', async () => {
        await openEventos();
        const user = userEvent.setup();
        const input = screen.getByLabelText('Inicio desde');
        await user.type(input, '15072099');
        expect(input.value).toBe('15/07/2099');
        await waitFor(() => expect(window.location.search).toBe('?desde=2099-07-15'));
        expect(titles()).toEqual(FROM_JULY);
        expect(input.getAttribute('aria-invalid')).not.toBe('true');
        expect(screen.queryByRole('alert')).toBeNull();
    });

    it('the «hasta» field filters the same way', async () => {
        await openEventos();
        await userEvent.setup().type(screen.getByLabelText('Inicio hasta'), '31/05/2099');
        await waitFor(() => expect(window.location.search).toBe('?hasta=2099-05-31'));
        expect(titles()).toEqual(['Congreso IoT Cauca 2099']);
    });

    it('an impossible date shows the inline error on blur, keeps the state and the list, and is linked with aria', async () => {
        await openEventos();
        const user = userEvent.setup();
        const input = screen.getByLabelText('Inicio desde');
        await user.type(input, '31022099');
        expect(input.value).toBe('31/02/2099');
        await user.tab(); // blur
        const error = await screen.findByText('Fecha no válida. Usa dd/mm/aaaa.');
        expect(error.getAttribute('role')).toBe('alert');
        expect(input.getAttribute('aria-invalid')).toBe('true');
        expect(input.getAttribute('aria-describedby').split(' ')).toContain(error.id);
        expect(window.location.search).toBe('');
        expect(titles()).toEqual(ALL);
        expect(screen.queryByRole('group', { name: 'Filtros activos' })).toBeNull();
    });

    it('Enter validates too, an incomplete date is an error, and typing it again clears the error', async () => {
        await openEventos();
        const user = userEvent.setup();
        const input = screen.getByLabelText('Inicio desde');
        await user.type(input, '15072099');
        await waitFor(() => expect(window.location.search).toBe('?desde=2099-07-15'));

        await user.clear(input);
        await user.type(input, '3102{Enter}'); // incomplete
        expect(await screen.findByText('Fecha no válida. Usa dd/mm/aaaa.')).toBeTruthy();
        expect(input.getAttribute('aria-invalid')).toBe('true');
        expect(titles()).toEqual(ALL); // clearing removed the filter; the incomplete text did not set a new one
        expect(window.location.search).toBe('');

        await user.clear(input);
        await user.type(input, '15072099');
        await waitFor(() => expect(window.location.search).toBe('?desde=2099-07-15'));
        expect(screen.queryByText('Fecha no válida. Usa dd/mm/aaaa.')).toBeNull();
        expect(input.getAttribute('aria-invalid')).not.toBe('true');
        expect(titles()).toEqual(FROM_JULY);
    });

    it('editing a valid date into an invalid one does not change the filter until it is valid', async () => {
        await openEventos('/eventos?desde=2099-07-15');
        const user = userEvent.setup();
        const input = screen.getByLabelText('Inicio desde');
        expect(input.value).toBe('15/07/2099');
        await user.type(input, '{Backspace}'); // 15/07/209
        await user.tab();
        expect(await screen.findByText('Fecha no válida. Usa dd/mm/aaaa.')).toBeTruthy();
        expect(window.location.search).toBe('?desde=2099-07-15');
        expect(titles()).toEqual(FROM_JULY);
        await user.type(input, '9');
        await waitFor(() => expect(screen.queryByText('Fecha no válida. Usa dd/mm/aaaa.')).toBeNull());
    });

    it('clearing the field removes the filter and its chip', async () => {
        await openEventos('/eventos?desde=2099-07-15');
        const user = userEvent.setup();
        expect(within(screen.getByRole('group', { name: 'Filtros activos' })).getByText('15/07/2099')).toBeTruthy();
        await user.clear(screen.getByLabelText('Inicio desde'));
        await waitFor(() => expect(window.location.search).toBe(''));
        expect(screen.queryByRole('group', { name: 'Filtros activos' })).toBeNull();
        expect(titles()).toEqual(ALL);
    });

    it('loading the URL with ISO params shows dd/mm/aaaa in the fields and in the chips, and removing a chip empties its field', async () => {
        await openEventos('/eventos?desde=2099-06-01&hasta=2099-07-31');
        const user = userEvent.setup();
        expect(screen.getByLabelText('Inicio desde').value).toBe('01/06/2099');
        expect(screen.getByLabelText('Inicio hasta').value).toBe('31/07/2099');
        const active = screen.getByRole('group', { name: 'Filtros activos' });
        expect(within(active).getByText('01/06/2099')).toBeTruthy();
        expect(within(active).getByText('31/07/2099')).toBeTruthy();
        expect(titles()).toEqual(['Simposio de Ciberseguridad 2099', 'Taller de Robótica Abierta']);
        expect(window.location.search).toBe('?desde=2099-06-01&hasta=2099-07-31'); // untouched by the render

        await user.click(within(active).getByRole('button', { name: 'Quitar filtro: Inicio desde: 01/06/2099' }));
        await waitFor(() => expect(window.location.search).toBe('?hasta=2099-07-31'));
        expect(screen.getByLabelText('Inicio desde').value).toBe('');
        expect(screen.getByLabelText('Inicio hasta').value).toBe('31/07/2099');
    });

    it('a chip removed while the field holds invalid text empties the field and its error', async () => {
        await openEventos('/eventos?desde=2099-07-15');
        const user = userEvent.setup();
        const input = screen.getByLabelText('Inicio desde');
        await user.type(input, '{Backspace}');
        await user.tab();
        await screen.findByText('Fecha no válida. Usa dd/mm/aaaa.');
        await user.click(screen.getByRole('button', { name: 'Quitar filtro: Inicio desde: 15/07/2099' }));
        await waitFor(() => expect(window.location.search).toBe(''));
        expect(input.value).toBe('');
        expect(screen.queryByText('Fecha no válida. Usa dd/mm/aaaa.')).toBeNull();
    });

    it('«desde» later than «hasta» shows a clear message, keeps the page working and goes away when fixed', async () => {
        await openEventos('/eventos?desde=2099-08-01&hasta=2099-06-01');
        const user = userEvent.setup();
        const message = screen.getByText(/«Inicio desde» es posterior a «Inicio hasta»/);
        expect(message.getAttribute('role')).toBe('alert');
        expect(screen.getByLabelText('Inicio hasta').getAttribute('aria-describedby').split(' ')).toContain(message.id);
        expect(screen.getByRole('heading', { level: 2, name: 'Sin resultados' })).toBeTruthy();
        expect(screen.getByRole('region', { name: 'Eventos encontrados' })).toBeTruthy();

        const to = screen.getByLabelText('Inicio hasta');
        await user.clear(to);
        await user.type(to, '31/12/2099');
        await waitFor(() => expect(screen.queryByText(/es posterior a/)).toBeNull());
        expect(titles()).toEqual(['Feria IoT y Robótica 2099']);
    });

    it('no range message when the dates are equal or only one is set', async () => {
        await openEventos('/eventos?desde=2099-06-01&hasta=2099-06-01');
        expect(screen.queryByText(/es posterior a/)).toBeNull();
        expect(titles()).toEqual(['Taller de Robótica Abierta']);
    });
});

describe('/eventos: «Calendario» button', () => {
    it('is hidden when the browser cannot open a native picker', async () => {
        await openEventos();
        expect(screen.queryByRole('button', { name: /Calendario/ })).toBeNull();
    });

    it('opens the native date picker (a hidden type=date, lang=es) and a pick filters by ISO date', async () => {
        const showPicker = vi.fn();
        HTMLInputElement.prototype.showPicker = showPicker;
        await openEventos();
        const user = userEvent.setup();
        const filters = screen.getByRole('search', { name: 'Filtros de eventos' });
        const buttons = within(filters).getAllByRole('button', { name: /^Calendario/ });
        expect(buttons.map((b) => b.textContent)).toEqual(['Calendario', 'Calendario']);
        expect(buttons.map((b) => b.getAttribute('aria-label'))).toEqual(['Calendario: elegir Inicio desde', 'Calendario: elegir Inicio hasta']);

        const hidden = filters.querySelectorAll('input[type="date"]');
        expect(hidden).toHaveLength(2);
        for (const input of hidden) {
            expect(input.getAttribute('lang')).toBe('es');
            expect(input.getAttribute('aria-hidden')).toBe('true');
            expect(input.tabIndex).toBe(-1);
            expect(input.classList.contains('sr-only')).toBe(true);
        }
        await user.click(buttons[0]);
        expect(showPicker).toHaveBeenCalledTimes(1);
        expect(showPicker.mock.contexts[0]).toBe(hidden[0]);

        fireEvent.change(hidden[0], { target: { value: '2099-07-15' } });
        await waitFor(() => expect(window.location.search).toBe('?desde=2099-07-15'));
        expect(screen.getByLabelText('Inicio desde').value).toBe('15/07/2099');
        expect(titles()).toEqual(FROM_JULY);
        expect(hidden[0].value).toBe('2099-07-15'); // the picker opens on the chosen day next time
    });

    it('a pick replaces an invalid text and its error', async () => {
        HTMLInputElement.prototype.showPicker = vi.fn();
        await openEventos();
        const user = userEvent.setup();
        const input = screen.getByLabelText('Inicio hasta');
        await user.type(input, '31022099');
        await user.tab();
        await screen.findByText('Fecha no válida. Usa dd/mm/aaaa.');
        fireEvent.change(document.querySelectorAll('input[type="date"]')[1], { target: { value: '2099-06-30' } });
        await waitFor(() => expect(window.location.search).toBe('?hasta=2099-06-30'));
        expect(input.value).toBe('30/06/2099');
        expect(screen.queryByText('Fecha no válida. Usa dd/mm/aaaa.')).toBeNull();
    });
});

describe('project panel: same date fields', () => {
    it('the events tab of the project panel uses the dd/mm/aaaa fields and filters by them', async () => {
        mockDataFetch();
        await renderApp(`/proyecto/${PROJECT_ID}?panel=eventos`);
        const dialog = await screen.findByRole('dialog', { name: /Monitoreo Agrícola Distribuido/ });
        await within(dialog).findByRole('region', { name: 'Eventos encontrados' });
        const user = userEvent.setup();
        const input = within(dialog).getByLabelText('Inicio desde');
        expect(input.type).toBe('text');
        expect(input.placeholder).toBe('dd/mm/aaaa');
        expect(within(dialog).getByText('Escribe la fecha como dd/mm/aaaa, por ejemplo 15/03/2027')).toBeTruthy();
        await user.type(input, '01072099');
        expect(input.value).toBe('01/07/2099');
        await waitFor(() => expect(titles(within(dialog))).toEqual(['Feria IoT y Robótica 2099']));

        await user.clear(input);
        await user.type(input, '31022099');
        await user.tab();
        expect(await within(dialog).findByText('Fecha no válida. Usa dd/mm/aaaa.')).toBeTruthy();
        expect(titles(within(dialog))).toEqual(['Congreso IoT Cauca 2099', 'Feria IoT y Robótica 2099']); // cleared; the invalid text sets nothing
    });
});
