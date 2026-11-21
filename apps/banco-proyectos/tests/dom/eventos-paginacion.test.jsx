// T6 of odd/tasks/mejora-visual.md: /eventos shows 20 events at a time («Mostrar más eventos»), the type selector is a
// group of pill buttons that explains each type and counts its events, and a visit without a project says so.
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID, eventosFixture } from './fixtures.js';

// 45 current events: odd = cfp (23), even = attend (22). Deadlines/starts rise with the number so the order is stable.
const pad = (n) => String(n).padStart(2, '0');
const big = {
    ...eventosFixture,
    events: Array.from({ length: 45 }, (_, i) => {
        const n = i + 1;
        const cfp = n % 2 === 1;
        return {
            id: `ev-${n}`, title: `Evento ${pad(n)}`, name: `Evento ${pad(n)}`, kind: cfp ? 'cfp' : 'attend',
            start: `2099-06-${pad(n % 28 + 1)}`, end: `2099-06-${pad(n % 28 + 1)}`, deadline: cfp ? `2099-03-${pad(n % 28 + 1)}` : null,
            location: 'Popayán, Colombia', country: 'Colombia', online: n % 3 === 0, url: `https://example.org/ev-${n}`, source: 'wikicfp', topics: ['IoT'],
        };
    }),
};
const serve = (data) => (path, response) => (path === '/data/eventos.json' ? { ok: true, status: 200, json: async () => data } : response);

const openBig = async (url = '/eventos') => {
    mockDataFetch(serve(big));
    await renderApp(url);
    await screen.findByRole('region', { name: 'Eventos encontrados' });
};
const cards = () => within(screen.getByRole('region', { name: 'Eventos encontrados' })).queryAllByRole('article');
const more = () => screen.queryByRole('button', { name: 'Mostrar más eventos' });
const status = (text) => screen.getByText(text);

describe('/eventos: show more', () => {
    it('renders only the first 20 cards, says how many are shown and keeps the total in the heading', async () => {
        await openBig();
        expect(cards()).toHaveLength(20);
        expect(status('Mostrando 20 de 45 eventos')).toBeTruthy();
        expect(screen.getByRole('heading', { level: 2, name: '45 eventos vigentes' })).toBeTruthy();
        expect(more()).toBeTruthy();
        const live = status('Mostrando 20 de 45 eventos');
        expect(live.getAttribute('role') === 'status' || live.getAttribute('aria-live') === 'polite').toBe(true);
    });

    it('«Mostrar más eventos» adds 20 each time, keeps the order and hides when everything is shown', async () => {
        await openBig();
        const user = userEvent.setup();
        const titles = () => cards().map((card) => within(card).getByRole('heading', { level: 2 }).textContent);
        const firstPage = titles();
        await user.click(more());
        expect(cards()).toHaveLength(40);
        expect(status('Mostrando 40 de 45 eventos')).toBeTruthy();
        expect(titles().slice(0, 20)).toEqual(firstPage); // same order, the new events come after
        expect(new Set(titles()).size).toBe(40);
        await user.click(more());
        expect(cards()).toHaveLength(45);
        expect(status('Mostrando 45 de 45 eventos')).toBeTruthy();
        expect(more()).toBeNull();
        expect(screen.getByRole('heading', { level: 2, name: '45 eventos vigentes' })).toBeTruthy();
    });

    it('keeps the focus on the page when the last click removes the button', async () => {
        await openBig();
        const user = userEvent.setup();
        await user.click(more());
        expect(document.activeElement).toBe(more()); // still on the button while it exists
        await user.click(more());
        expect(more()).toBeNull();
        expect(document.activeElement).not.toBe(document.body);
        expect(document.activeElement.textContent).toBe('Mostrando 45 de 45 eventos');
    });

    it('goes back to the first 20 when the type, search, sort or topic changes', async () => {
        await openBig();
        const user = userEvent.setup();
        await user.click(more());
        expect(cards()).toHaveLength(40);
        await user.click(screen.getByRole('button', { name: 'Para asistir' })); // 22 attend
        await waitFor(() => expect(status('Mostrando 20 de 22 eventos')).toBeTruthy());
        expect(cards()).toHaveLength(20);
        expect(screen.getByRole('heading', { level: 2, name: '22 eventos vigentes' })).toBeTruthy();

        await user.click(more());
        expect(cards()).toHaveLength(22);
        await user.selectOptions(screen.getByLabelText('Ordenar por'), 'title');
        await waitFor(() => expect(status('Mostrando 20 de 22 eventos')).toBeTruthy());
        expect(cards()).toHaveLength(20);

        await user.click(more());
        await user.click(screen.getByRole('button', { name: /^IoT \d+ eventos?$/ }));
        await waitFor(() => expect(status('Mostrando 20 de 22 eventos')).toBeTruthy());
        expect(cards()).toHaveLength(20);

        await user.click(more());
        await user.type(screen.getByRole('searchbox', { name: 'Buscar por nombre o lugar' }), 'Evento');
        await waitFor(() => expect(cards()).toHaveLength(20));
        expect(more()).toBeTruthy();
    });

    it('does not show the button or the counter when every event fits in one page', async () => {
        mockDataFetch();
        await renderApp('/eventos');
        await screen.findByRole('region', { name: 'Eventos encontrados' });
        expect(cards()).toHaveLength(4);
        expect(more()).toBeNull();
        expect(screen.queryByText(/^Mostrando \d+ de \d+ eventos$/)).toBeNull();
    });

    it('keeps the comparison selection and the URL while paging', async () => {
        await openBig();
        const user = userEvent.setup();
        await user.click(within(cards()[0]).getByRole('button', { name: 'Comparar: Evento 01' }));
        await user.click(more());
        expect(within(cards()[0]).getByRole('button', { name: 'Comparar: Evento 01' }).getAttribute('aria-pressed')).toBe('true');
        expect(window.location.search).toBe('');
    });
});

describe('/eventos: type selector', () => {
    const group = () => screen.getByRole('group', { name: 'Tipo de evento' });
    const pill = (name) => within(group()).getByRole('button', { name });
    const describedBy = (el) => el.getAttribute('aria-describedby').split(' ').map((id) => document.getElementById(id).textContent).join(' ');
    const openSmall = async (url = '/eventos') => {
        mockDataFetch();
        await renderApp(url);
        await screen.findByRole('region', { name: 'Eventos encontrados' });
    };

    it('is a group of three pill buttons (not tabs) that reuse the .tab-bar / .tab-pill styles', async () => {
        await openSmall();
        expect(screen.queryByRole('tablist')).toBeNull();
        const buttons = within(group()).getAllByRole('button');
        expect(buttons.map((b) => b.getAttribute('aria-pressed'))).toEqual(['true', 'false', 'false']);
        for (const button of buttons) expect(button.classList.contains('tab-pill')).toBe(true);
        expect(buttons[0].parentElement.classList.contains('tab-bar')).toBe(true);
        expect(pill('Todos')).toBe(buttons[0]);
        expect(pill('Convocatorias (presentar)')).toBe(buttons[1]);
        expect(pill('Para asistir')).toBe(buttons[2]);
    });

    it('says in one line what each type is', async () => {
        await openSmall();
        expect(pill('Todos').textContent).toContain('Congresos y eventos juntos');
        expect(pill('Convocatorias (presentar)').textContent).toContain('Congresos con fecha límite para enviar tu trabajo');
        expect(pill('Para asistir').textContent).toContain('Talleres, charlas, ferias y hackatones');
        expect(describedBy(pill('Convocatorias (presentar)'))).toContain('Congresos con fecha límite para enviar tu trabajo');
    });

    it('shows how many events each type has and the number follows the other filters', async () => {
        await openSmall();
        expect(pill('Todos').textContent).toContain('4 eventos');
        expect(pill('Convocatorias (presentar)').textContent).toContain('2 eventos');
        expect(pill('Para asistir').textContent).toContain('2 eventos');
        expect(describedBy(pill('Para asistir'))).toContain('2 eventos');

        const user = userEvent.setup();
        await user.selectOptions(screen.getByLabelText('Modalidad'), 'online');
        await waitFor(() => expect(pill('Para asistir').textContent).toContain('1 evento'));
        expect(pill('Todos').textContent).toContain('1 evento');
        expect(pill('Convocatorias (presentar)').textContent).toContain('0 eventos');
        // selecting a type does not change the counts of the others
        await user.click(pill('Convocatorias (presentar)'));
        await waitFor(() => expect(pill('Convocatorias (presentar)').getAttribute('aria-pressed')).toBe('true'));
        expect(pill('Para asistir').textContent).toContain('1 evento');
    });

    it('works with the keyboard (Tab, Enter and Space) and writes the same URL as before', async () => {
        await openSmall();
        const user = userEvent.setup();
        pill('Convocatorias (presentar)').focus();
        await user.keyboard('{Enter}');
        await waitFor(() => expect(window.location.search).toBe('?kind=cfp'));
        expect(pill('Convocatorias (presentar)').getAttribute('aria-pressed')).toBe('true');
        pill('Para asistir').focus();
        await user.keyboard(' ');
        await waitFor(() => expect(window.location.search).toBe('?kind=attend'));
        expect(pill('Para asistir').getAttribute('aria-pressed')).toBe('true');
        expect(pill('Todos').getAttribute('aria-pressed')).toBe('false');
        // every pill is in the tab order
        for (const button of within(group()).getAllByRole('button')) expect(button.tabIndex).toBe(0);
    });
});

describe('/eventos: without a project', () => {
    const hint = () => screen.queryByText('Elige un proyecto para ordenar los eventos por afinidad');
    it('says it is optional and offers a project select and a link to choose one', async () => {
        mockDataFetch();
        await renderApp('/eventos');
        await screen.findByRole('region', { name: 'Eventos encontrados' });
        expect(hint()).toBeTruthy();
        const select = screen.getByRole('combobox', { name: 'Proyecto' });
        expect(within(select).getAllByRole('option').map((o) => o.textContent)).toContain('Monitoreo agrícola con MQTT');
        const link = screen.getByRole('link', { name: 'Elegir un proyecto' });
        expect(link.getAttribute('href')).toBe('/proyectos');
        expect(screen.getByText(/Es opcional/)).toBeTruthy();
    });

    it('choosing a project in the select opens the project view and keeps the other filters', async () => {
        mockDataFetch();
        await renderApp('/eventos?kind=cfp');
        await screen.findByRole('region', { name: 'Eventos encontrados' });
        const user = userEvent.setup();
        await user.selectOptions(screen.getByRole('combobox', { name: 'Proyecto' }), PROJECT_ID);
        await waitFor(() => expect(window.location.search).toBe(`?p=${PROJECT_ID}&kind=cfp`));
        expect(hint()).toBeNull();
        expect(screen.getByRole('heading', { level: 2, name: 'Monitoreo agrícola con MQTT' })).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Ver todos los eventos' })).toBeTruthy();
    });

    it('does not show the hint when a project is selected', async () => {
        mockDataFetch();
        await renderApp(`/eventos?p=${PROJECT_ID}`);
        await screen.findByRole('region', { name: 'Eventos encontrados' });
        expect(hint()).toBeNull();
        expect(screen.queryByRole('link', { name: 'Elegir un proyecto' })).toBeNull();
        expect(screen.getByRole('button', { name: 'Ver todos los eventos' })).toBeTruthy();
    });
});
