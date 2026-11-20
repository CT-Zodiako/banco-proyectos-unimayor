// T19 of odd/tasks/mejora-visual.md (L22: "acomodemos lo de mis oportunidades … el contenido más organizable y usable"):
// /oportunidades puts the saved items first (summary by status, toolbar, compact cards, list or board) and the backup
// tools in a collapsed panel at the bottom. View state lives in the URL (?tipo, estado, q, orden, vista). The storage key,
// the saved shape and the backup format do not change (tests/opportunities.test.mjs pins them).
import { cleanup, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { STORAGE_KEY } from '../../src/lib/opportunities.js';

const SEED = [
    { type: 'event', id: 'e1', title: 'Congreso IoT Cauca', url: 'https://iot.example.org/cfp', start: '2099-05-10', end: '2099-05-12', deadline: '2099-03-01', status: 'review', note: '' },
    { type: 'event', id: 'e2', title: 'Taller de Robótica Abierta', url: 'https://robot.example.org', start: '2099-06-01', end: '2099-06-01', status: 'preparing', note: 'Pedir carta al tutor' },
    { type: 'event', id: 'e3', title: 'Simposio de Ciberseguridad', url: 'https://ciber.example.org', start: '2099-07-15', deadline: '2099-02-01', status: 'preparing' },
    { type: 'journal', id: 'j1', title: 'Revista Brasileira de Engenharia de Biossistemas', url: 'https://www.scielo.br/rbeb', instructions: 'https://www.scielo.br/rbeb/instrucciones', status: 'submitted', note: 'x'.repeat(80) },
    { type: 'journal', id: 'j2', title: 'Journal of Smart Farming', url: 'https://farm.example.org' },
    { type: 'journal', id: 'j3', title: 'Revista de Electrónica Aplicada', url: 'https://electronica.example.org', status: 'discarded', note: '' },
];
const TITLES = SEED.map((item) => item.title);

// jsdom has no object URLs (the page uses them for the downloads); these stay in place for the timers that revoke them.
beforeEach(() => {
    URL.createObjectURL = vi.fn(() => 'blob:test');
    URL.revokeObjectURL = vi.fn();
});

const stored = () => JSON.parse(window.localStorage.getItem(STORAGE_KEY));
const open = async (url = '/oportunidades', seed = SEED) => {
    if (seed) window.localStorage.setItem(STORAGE_KEY, typeof seed === 'string' ? seed : JSON.stringify(seed));
    mockDataFetch();
    const user = userEvent.setup();
    await renderApp(url);
    await screen.findByRole('heading', { level: 1, name: 'Mis oportunidades' });
    return user;
};
const main = () => document.querySelector('main');
const summary = () => screen.getByRole('region', { name: 'Resumen' });
const list = () => screen.getByRole('region', { name: 'Mis oportunidades' });
const backup = () => screen.getByRole('region', { name: 'Respaldo local' });
const cardTitles = () => within(list()).queryAllByRole('heading', { level: 4 }).map((heading) => heading.textContent);
const card = (title) => within(list()).getByRole('heading', { level: 4, name: title }).closest('article');
const statusButton = (label) => within(summary()).getByRole('button', { name: new RegExp(`^${label}:`) });
const board = () => screen.getByRole('region', { name: 'Tablero por estado' });
const column = (label) => within(board()).getByRole('region', { name: new RegExp(`^${label}`) });
const search = () => window.location.search;
// jsdom's Blob has no text(): read it the way the page's own file reading would.
const readBlob = (blob) => new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsText(blob); });
const noteSummary = (article) => article.querySelector('summary[data-opp-note-summary]');

describe('page order, headings and landmarks', () => {
    it('shows the saved content first: header, pointer to the backup, summary, list; the backup panel is last and closed', async () => {
        await open();
        expect(main().querySelector('.page-header')).toBeTruthy();
        const sections = [summary(), list(), backup()];
        sections.reduce((before, next) => {
            expect(before.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
            return next;
        });
        expect(document.querySelector('main .page-header').compareDocumentPosition(summary()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(backup().querySelector('details').open).toBe(false);
        expect(backup().nextElementSibling).toBeNull();
        expect(screen.queryByLabelText('Filtrar por estado', { selector: 'select' })).toBeNull();
    });

    it('has one h1 and an h2 per section (Resumen, Mis oportunidades, Respaldo local), each section a named region', async () => {
        await open();
        expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
        expect(within(main()).getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)).toEqual(['Resumen', 'Mis oportunidades', 'Respaldo local']);
        expect(summary()).toBeTruthy();
        expect(list()).toBeTruthy();
        expect(backup()).toBeTruthy();
    });

    it('keeps the explanation in the header and adds a one-line pointer «Ir al respaldo» that opens the panel', async () => {
        const user = await open();
        expect(within(main()).getByText('Tus oportunidades se guardan solo en este navegador. Exporta un respaldo para no perderlas.')).toBeTruthy();
        expect(within(main().querySelector('.page-header')).getByText(/Guardadas solo en este navegador\. No se sincronizan/)).toBeTruthy();
        const link = screen.getByRole('link', { name: 'Ir al respaldo' });
        expect(link.getAttribute('href')).toBe('#respaldo');
        await user.click(link);
        expect(backup().querySelector('details').open).toBe(true);
        expect(window.location.hash).toBe('');
        expect(document.activeElement).toBe(backup().querySelector('summary'));
    });
});

describe('summary by status', () => {
    it('shows «Guardadas N» and one count card per REAL status (no invented ones)', async () => {
        await open();
        expect(within(summary()).getByText('Guardadas').parentElement.textContent).toBe('Guardadas6');
        const buttons = within(summary()).getAllByRole('button').map((button) => button.getAttribute('aria-label'));
        expect(buttons).toEqual(['Por revisar: 2 oportunidades', 'Preparando: 2 oportunidades', 'Enviado: 1 oportunidad', 'Descartado: 1 oportunidad']);
        for (const [label, tone] of [['Por revisar', 'tn-review'], ['Preparando', 'tn-fair'], ['Enviado', 'tn-lang'], ['Descartado', 'tn-low']]) {
            expect(statusButton(label).classList.contains(tone)).toBe(true);
            expect(statusButton(label).getAttribute('aria-pressed')).toBe('false');
        }
    });

    it('is a labelled group with a visible «Filtrar por estado» text', async () => {
        await open();
        const group = within(summary()).getByRole('group', { name: 'Filtrar por estado' });
        expect(group).toBeTruthy();
        expect(within(summary()).getByText('Filtrar por estado').tagName).not.toBe('OPTION');
        expect(within(group).getAllByRole('button')).toHaveLength(4);
    });

    it('each card toggles the list by that status (aria-pressed, URL) and a second press shows everything again', async () => {
        const user = await open();
        await user.click(statusButton('Preparando'));
        expect(statusButton('Preparando').getAttribute('aria-pressed')).toBe('true');
        expect(search()).toBe('?estado=preparing');
        expect(cardTitles().sort()).toEqual(['Simposio de Ciberseguridad', 'Taller de Robótica Abierta']);
        expect(within(list()).getByRole('status').textContent).toBe('2 oportunidades');
        await user.click(statusButton('Preparando'));
        expect(statusButton('Preparando').getAttribute('aria-pressed')).toBe('false');
        expect(search()).toBe('');
        expect(cardTitles()).toHaveLength(6);
    });

    it('«Ver todas» appears with a status filter and resets it', async () => {
        const user = await open();
        expect(within(summary()).queryByRole('button', { name: 'Ver todas' })).toBeNull();
        await user.click(statusButton('Enviado'));
        expect(cardTitles()).toEqual(['Revista Brasileira de Engenharia de Biossistemas']);
        await user.click(within(summary()).getByRole('button', { name: 'Ver todas' }));
        expect(cardTitles()).toHaveLength(6);
        expect(search()).toBe('');
        expect(within(summary()).queryByRole('button', { name: 'Ver todas' })).toBeNull();
    });

    it('the status counts follow the type and the search (facets), «Guardadas» stays the total', async () => {
        const user = await open();
        await user.click(within(list()).getByRole('button', { name: 'Revistas (3)' }));
        expect(within(summary()).getByText('Guardadas').parentElement.textContent).toBe('Guardadas6');
        expect(within(summary()).getAllByRole('button').map((button) => button.getAttribute('aria-label'))).toEqual(
            ['Por revisar: 1 oportunidad', 'Preparando: 0 oportunidades', 'Enviado: 1 oportunidad', 'Descartado: 1 oportunidad']);
    });
});

describe('toolbar: type, search, sort, view', () => {
    it('type control «Todas / Eventos (n) / Revistas (n)»: aria-pressed buttons, hue-colored, filters and goes to the URL', async () => {
        const user = await open();
        const group = within(list()).getByRole('group', { name: 'Tipo' });
        expect(within(group).getAllByRole('button').map((button) => button.textContent)).toEqual(['Todas', 'Eventos (3)', 'Revistas (3)']);
        expect(within(group).getByRole('button', { name: 'Todas' }).getAttribute('aria-pressed')).toBe('true');
        const events = within(group).getByRole('button', { name: 'Eventos (3)' });
        const journals = within(group).getByRole('button', { name: 'Revistas (3)' });
        expect(events.classList.contains('seg-tone') && events.classList.contains('tn-events')).toBe(true);
        expect(journals.classList.contains('seg-tone') && journals.classList.contains('tn-journals')).toBe(true);
        await user.click(events);
        expect(events.getAttribute('aria-pressed')).toBe('true');
        expect(search()).toBe('?tipo=eventos');
        expect(cardTitles().sort()).toEqual(TITLES.filter((title) => SEED.find((item) => item.title === title).type === 'event').sort());
        await user.click(journals);
        expect(search()).toBe('?tipo=revistas');
        expect(cardTitles()).toHaveLength(3);
        await user.click(within(group).getByRole('button', { name: 'Todas' }));
        expect(search()).toBe('');
    });

    it('«Buscar en mis oportunidades» filters by title, site and note without caring for accents or case', async () => {
        const user = await open();
        const box = within(list()).getByRole('searchbox', { name: 'Buscar en mis oportunidades' });
        await user.type(box, 'ROBOTICA');
        expect(cardTitles()).toEqual(['Taller de Robótica Abierta']);
        expect(search()).toBe('?q=ROBOTICA');
        await user.clear(box);
        await user.type(box, 'electronica');
        expect(cardTitles()).toEqual(['Revista de Electrónica Aplicada']);
        await user.clear(box);
        await user.type(box, 'scielo');
        expect(cardTitles()).toEqual(['Revista Brasileira de Engenharia de Biossistemas']);
        await user.clear(box);
        await user.type(box, 'carta tutor');
        expect(cardTitles()).toEqual(['Taller de Robótica Abierta']);
        await user.clear(box);
        expect(search()).toBe('');
        expect(cardTitles()).toHaveLength(6);
    });

    it('the sort select offers Más recientes, Nombre A-Z, Estado and (the data has closing dates) Fecha límite más próxima', async () => {
        const user = await open();
        const select = within(list()).getByRole('combobox', { name: 'Ordenar por' });
        expect([...select.options].map((option) => option.textContent)).toEqual(['Más recientes', 'Nombre A-Z', 'Estado', 'Fecha límite más próxima']);
        expect(select.value).toBe('recent');
        const listOrder = () => within(list()).getAllByRole('heading', { level: 4 }).map((heading) => heading.textContent);
        // the list is grouped in Eventos then Revistas; the order is inside each group
        expect(listOrder()).toEqual(['Simposio de Ciberseguridad', 'Taller de Robótica Abierta', 'Congreso IoT Cauca', 'Revista de Electrónica Aplicada', 'Journal of Smart Farming', 'Revista Brasileira de Engenharia de Biossistemas']);
        await user.selectOptions(select, 'name');
        expect(search()).toBe('?orden=nombre');
        expect(listOrder()).toEqual(['Congreso IoT Cauca', 'Simposio de Ciberseguridad', 'Taller de Robótica Abierta', 'Journal of Smart Farming', 'Revista Brasileira de Engenharia de Biossistemas', 'Revista de Electrónica Aplicada']);
        await user.selectOptions(select, 'status');
        expect(search()).toBe('?orden=estado');
        expect(listOrder()).toEqual(['Congreso IoT Cauca', 'Simposio de Ciberseguridad', 'Taller de Robótica Abierta', 'Journal of Smart Farming', 'Revista Brasileira de Engenharia de Biossistemas', 'Revista de Electrónica Aplicada']);
        await user.selectOptions(select, 'deadline');
        expect(search()).toBe('?orden=fecha');
        expect(listOrder().slice(0, 3)).toEqual(['Simposio de Ciberseguridad', 'Congreso IoT Cauca', 'Taller de Robótica Abierta']);
        await user.selectOptions(select, 'recent');
        expect(search()).toBe('');
    });

    it('without closing dates in the saved events the sort has no «Fecha límite más próxima»', async () => {
        await open('/oportunidades?orden=fecha', SEED.map(({ deadline: _drop, ...item }) => item)); // eslint-disable-line no-unused-vars
        const select = within(list()).getByRole('combobox', { name: 'Ordenar por' });
        expect([...select.options].map((option) => option.textContent)).toEqual(['Más recientes', 'Nombre A-Z', 'Estado']);
        expect(select.value).toBe('recent');
    });

    it('the view toggle «Lista | Tablero» is an aria-pressed pair stored in ?vista', async () => {
        const user = await open();
        const group = within(list()).getByRole('group', { name: 'Vista' });
        expect(within(group).getByRole('button', { name: 'Lista' }).getAttribute('aria-pressed')).toBe('true');
        expect(within(group).getByRole('button', { name: 'Tablero' }).getAttribute('aria-pressed')).toBe('false');
        expect(screen.queryByRole('region', { name: 'Tablero por estado' })).toBeNull();
        await user.click(within(group).getByRole('button', { name: 'Tablero' }));
        expect(search()).toBe('?vista=tablero');
        expect(within(group).getByRole('button', { name: 'Tablero' }).getAttribute('aria-pressed')).toBe('true');
        expect(board()).toBeTruthy();
        await user.click(within(group).getByRole('button', { name: 'Lista' }));
        expect(search()).toBe('');
        expect(screen.queryByRole('region', { name: 'Tablero por estado' })).toBeNull();
    });

    it('every toolbar control has a visible text label', async () => {
        await open();
        for (const name of ['Buscar en mis oportunidades', 'Ordenar por']) {
            const field = within(list()).getByLabelText(name);
            expect(field.labels[0].textContent).toBe(name);
        }
        for (const name of ['Tipo', 'Vista']) {
            const group = within(list()).getByRole('group', { name });
            expect(within(list()).getAllByText(name).some((node) => !group.contains(node))).toBe(true);
        }
    });
});

describe('the URL restores the view', () => {
    it('?tipo, estado, q, orden and vista are applied on load (board, journals, preparing, search, name)', async () => {
        await open('/oportunidades?tipo=revistas&estado=submitted&q=bio&orden=nombre&vista=tablero');
        expect(within(list()).getByRole('button', { name: 'Revistas (1)' }).getAttribute('aria-pressed')).toBe('true');
        expect(statusButton('Enviado').getAttribute('aria-pressed')).toBe('true');
        expect(within(list()).getByRole('searchbox', { name: 'Buscar en mis oportunidades' }).value).toBe('bio');
        expect(within(list()).getByRole('combobox', { name: 'Ordenar por' }).value).toBe('name');
        expect(within(list()).getByRole('button', { name: 'Tablero' }).getAttribute('aria-pressed')).toBe('true');
        expect(within(board()).getAllByRole('heading', { level: 4 }).map((heading) => heading.textContent)).toEqual(['Revista Brasileira de Engenharia de Biossistemas']);
    });

    it('invalid values fall back to the defaults and unrelated params are kept', async () => {
        const user = await open('/oportunidades?tipo=otro&estado=aceptado&orden=zzz&vista=cubos&utm=1');
        expect(within(list()).getByRole('button', { name: 'Todas' }).getAttribute('aria-pressed')).toBe('true');
        expect(within(summary()).queryByRole('button', { pressed: true })).toBeNull();
        expect(within(list()).getByRole('combobox', { name: 'Ordenar por' }).value).toBe('recent');
        expect(screen.queryByRole('region', { name: 'Tablero por estado' })).toBeNull();
        expect(cardTitles()).toHaveLength(6);
        await user.click(within(list()).getByRole('button', { name: 'Tablero' }));
        expect(search()).toBe('?utm=1&vista=tablero');
    });

    it('changing the view replaces the history entry instead of adding one', async () => {
        const user = await open();
        const before = window.history.length;
        await user.click(statusButton('Enviado'));
        await user.click(within(list()).getByRole('button', { name: 'Tablero' }));
        expect(window.history.length).toBe(before);
    });
});

describe('active filters', () => {
    it('shows removable chips for type, status and search plus «Limpiar filtros» (it keeps sort and view)', async () => {
        const user = await open('/oportunidades?tipo=revistas&estado=review&q=smart&orden=nombre&vista=tablero');
        const chips = within(list()).getByRole('group', { name: 'Filtros activos' });
        expect(within(chips).getAllByRole('button').map((button) => button.getAttribute('aria-label') ?? button.textContent)).toEqual([
            'Quitar filtro: Tipo: Revistas', 'Quitar filtro: Estado: Por revisar', 'Quitar filtro: Búsqueda: “smart”', 'Limpiar filtros']);
        await user.click(within(chips).getByRole('button', { name: 'Quitar filtro: Estado: Por revisar' }));
        expect(search()).toBe('?tipo=revistas&q=smart&orden=nombre&vista=tablero');
        await user.click(within(list()).getByRole('button', { name: 'Limpiar filtros' }));
        expect(search()).toBe('?orden=nombre&vista=tablero');
        expect(within(list()).queryByRole('group', { name: 'Filtros activos' })).toBeNull();
        expect(within(board()).getAllByRole('heading', { level: 4 })).toHaveLength(6);
    });

    it('has no chips and no «Limpiar filtros» without a filter', async () => {
        await open();
        expect(screen.queryByRole('group', { name: 'Filtros activos' })).toBeNull();
        expect(screen.queryByRole('button', { name: 'Limpiar filtros' })).toBeNull();
    });

    it('announces «N oportunidades» in a polite live region that follows the filters', async () => {
        const user = await open();
        const live = within(list()).getByRole('status');
        expect(live.getAttribute('aria-live')).toBe('polite');
        expect(live.textContent).toBe('6 oportunidades');
        await user.click(statusButton('Enviado'));
        expect(live.textContent).toBe('1 oportunidad');
    });
});

describe('board view', () => {
    it('is one column per status with its count, the four statuses always, each card in the column of its status', async () => {
        await open('/oportunidades?vista=tablero');
        const region = board();
        expect(region.getAttribute('tabindex')).toBe('0');
        expect(region.className).toContain('overflow-x-auto');
        const heads = within(region).getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);
        expect(heads).toEqual(['Por revisar 2', 'Preparando 2', 'Enviado 1', 'Descartado 1']);
        expect(within(column('Por revisar')).getAllByRole('heading', { level: 4 }).map((heading) => heading.textContent).sort()).toEqual(['Congreso IoT Cauca', 'Journal of Smart Farming']);
        expect(within(column('Enviado')).getAllByRole('heading', { level: 4 }).map((heading) => heading.textContent)).toEqual(['Revista Brasileira de Engenharia de Biossistemas']);
        expect(within(column('Descartado')).getByText('Revista de Electrónica Aplicada')).toBeTruthy();
    });

    it('an empty column says it is empty', async () => {
        await open('/oportunidades?vista=tablero', SEED.filter((item) => item.status !== 'submitted'));
        expect(within(column('Enviado')).getByText('Sin oportunidades en este estado')).toBeTruthy();
    });

    it('changing the status in a card moves it to the other column, saves it, keeps the saved note and keeps the keyboard focus on it', async () => {
        const user = await open('/oportunidades?vista=tablero');
        const select = within(column('Por revisar')).getByRole('combobox', { name: 'Estado de Congreso IoT Cauca' });
        await user.selectOptions(select, 'submitted');
        expect(within(column('Enviado')).getByRole('heading', { level: 4, name: 'Congreso IoT Cauca' })).toBeTruthy();
        expect(within(column('Por revisar')).queryByRole('heading', { level: 4, name: 'Congreso IoT Cauca' })).toBeNull();
        expect(within(board()).getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent)).toEqual(['Por revisar 1', 'Preparando 2', 'Enviado 2', 'Descartado 1']);
        expect(stored().find((item) => item.id === 'e1')).toMatchObject({ type: 'event', status: 'submitted', note: '' });
        expect(stored()).toHaveLength(6);
        expect(document.activeElement).toBe(within(column('Enviado')).getByRole('combobox', { name: 'Estado de Congreso IoT Cauca' }));
        expect(within(summary()).getByRole('button', { name: /^Enviado: 2 / })).toBeTruthy();
    });

    it('a note being typed survives the move to another column', async () => {
        const user = await open('/oportunidades?vista=tablero');
        const first = card('Journal of Smart Farming');
        await user.click(noteSummary(first));
        await user.type(within(first).getByRole('textbox', { name: 'Nota personal de Journal of Smart Farming' }), 'borrador');
        await user.selectOptions(within(first).getByRole('combobox', { name: 'Estado de Journal of Smart Farming' }), 'preparing');
        const moved = within(column('Preparando')).getByRole('textbox', { name: 'Nota personal de Journal of Smart Farming' });
        expect(moved.value).toBe('borrador');
        expect(stored().find((item) => item.id === 'j2').note ?? '').toBe('');
    });

    it('with a status filter the board only shows that column', async () => {
        await open('/oportunidades?vista=tablero&estado=discarded');
        expect(within(board()).getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent)).toEqual(['Descartado 1']);
    });

    it('scrolls inside its own region (overflow-x-auto with a labelled, focusable region) and its columns have a minimum width', async () => {
        await open('/oportunidades?vista=tablero');
        expect(board().className).toMatch(/overflow-x-auto/);
        expect(board().firstElementChild.className).toMatch(/min-w-/);
    });
});

describe('compact cards', () => {
    it('list view: Eventos and Revistas sections in a one-column grid that has two columns from 1100 px', async () => {
        await open();
        const sections = within(list()).getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);
        expect(sections).toEqual(['Eventos', 'Revistas']);
        for (const grid of list().querySelectorAll('[data-opp-grid]')) {
            expect(grid.className).toContain('grid-cols-1');
            expect(grid.className).toContain('min-[1100px]:grid-cols-2');
        }
        expect(list().querySelectorAll('[data-opp-grid]')).toHaveLength(2);
    });

    it('an event card has the type badge, the status badge in its tone, the title, one meta line and the source button', async () => {
        await open();
        const article = card('Congreso IoT Cauca');
        const badges = [...article.querySelectorAll('.badge')];
        expect(badges.map((badge) => badge.textContent)).toEqual(['Evento', 'Por revisar']);
        expect(badges[0].classList.contains('tn-events') && badges[0].classList.contains('badge-tone')).toBe(true);
        expect(badges[1].classList.contains('tn-review') && badges[1].classList.contains('badge-tone')).toBe(true);
        expect(article.querySelector('[data-opp-meta]').textContent).toBe('10/05/2099 – 12/05/2099 · Cierre 01/03/2099');
        const source = within(article).getByRole('link', { name: /^Fuente oficial/ });
        expect(source.getAttribute('href')).toBe('https://iot.example.org/cfp');
        expect(source.getAttribute('target')).toBe('_blank');
        expect(source.getAttribute('rel')).toBe('noopener noreferrer');
        expect(source.className).toContain('btn-events');
        expect(within(article).queryByRole('link', { name: /Instrucciones para autores/ })).toBeNull();
    });

    it('an event without dates says so; a one-day event shows one date', async () => {
        await open();
        expect(card('Taller de Robótica Abierta').querySelector('[data-opp-meta]').textContent).toBe('01/06/2099');
        cleanup();
        await open('/oportunidades', [{ type: 'event', id: 'x', title: 'Evento sin fechas', url: 'https://x.example.org' }]);
        expect(card('Evento sin fechas').querySelector('[data-opp-meta]').textContent).toBe('Sin fechas guardadas');
    });

    it('a journal card has the teal type badge, the site as meta line and both buttons (source teal, instructions secondary)', async () => {
        await open();
        const article = card('Revista Brasileira de Engenharia de Biossistemas');
        const badges = [...article.querySelectorAll('.badge')];
        expect(badges.map((badge) => badge.textContent)).toEqual(['Revista', 'Enviado']);
        expect(badges[0].classList.contains('tn-journals')).toBe(true);
        expect(badges[1].classList.contains('tn-lang')).toBe(true);
        expect(article.querySelector('[data-opp-meta]').textContent).toBe('scielo.br');
        const source = within(article).getByRole('link', { name: /^Fuente oficial/ });
        const instructions = within(article).getByRole('link', { name: /^Instrucciones para autores/ });
        expect(source.className).toContain('btn-journals');
        expect(instructions.className).toContain('btn-secondary');
        expect(instructions.getAttribute('href')).toBe('https://www.scielo.br/rbeb/instrucciones');
        expect(instructions.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('never links an unsafe address', async () => {
        await open('/oportunidades', [{ type: 'journal', id: 'bad', title: 'Revista con enlace malo', url: 'javascript:alert(1)', instructions: 'data:text/html,hola' }]);
        const article = card('Revista con enlace malo');
        expect(within(article).queryAllByRole('link')).toHaveLength(0);
        expect(article.querySelector('[data-opp-meta]').textContent).toBe('Sin enlace oficial');
    });

    it('every control of a card has an accessible name that includes its title, so no two cards repeat a name', async () => {
        await open();
        const names = [];
        for (const item of SEED) {
            const article = card(item.title);
            const controls = [...article.querySelectorAll('a[href], button, select, textarea, summary')];
            expect(controls.length).toBeGreaterThan(4);
            for (const control of controls) {
                const role = control.tagName === 'SUMMARY' ? 'summary' : control.tagName.toLowerCase();
                const label = control.getAttribute('aria-label') ?? control.labels?.[0]?.textContent ?? control.textContent;
                expect(label, `${role} of «${item.title}»`).toContain(item.title);
                names.push(`${role}|${label}`);
            }
        }
        expect(new Set(names).size).toBe(names.length);
    });

    it('«Quitar» takes the item out of the storage and the list, with the confirm behavior it already had (none)', async () => {
        const user = await open();
        await user.click(within(card('Journal of Smart Farming')).getByRole('button', { name: /^Quitar/ }));
        expect(stored().map((item) => item.id)).toEqual(['e1', 'e2', 'e3', 'j1', 'j3']);
        expect(cardTitles()).not.toContain('Journal of Smart Farming');
        expect(within(summary()).getByText('Guardadas').parentElement.textContent).toBe('Guardadas5');
    });

    it('«Quitar» is a text button in the shared link style with a danger tone, apart from the source buttons', async () => {
        await open();
        const remove = within(card('Congreso IoT Cauca')).getByRole('button', { name: /^Quitar/ });
        expect(remove.className).toContain('link-action');
        expect(remove.className).toContain('opp-remove');
        expect(remove.textContent).toBe('Quitar Congreso IoT Cauca de mis oportunidades');
        expect(remove.firstChild.textContent).toBe('Quitar');
    });

    it('keeps the calendar buttons of events with dates, and they still download an .ics file', async () => {
        const user = await open();
        const create = URL.createObjectURL;
        const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
        const article = card('Congreso IoT Cauca');
        await user.click(within(article).getByRole('button', { name: /^Agregar cierre al calendario/ }));
        expect(create).toHaveBeenCalledTimes(1);
        const blob = create.mock.calls[0][0];
        expect(blob.type).toBe('text/calendar;charset=utf-8');
        expect(await readBlob(blob)).toContain('SUMMARY:Cierre: Congreso IoT Cauca');
        await user.click(within(article).getByRole('button', { name: /^Agregar evento al calendario/ }));
        expect(await readBlob(create.mock.calls[1][0])).toContain('DTSTART;VALUE=DATE:20990510');
        expect(click).toHaveBeenCalledTimes(2);
        expect(within(card('Revista de Electrónica Aplicada')).queryByRole('button', { name: /calendario/ })).toBeNull();
    });

    it('keeps the «Lista de preparación» of each card with its steps and the link to the official source', async () => {
        const user = await open();
        const article = card('Revista Brasileira de Engenharia de Biossistemas');
        await user.click(within(article).getByText(/^Lista de preparación/));
        expect(within(article).getByText('Estos pasos son orientativos; confirme los requisitos en la fuente oficial.')).toBeTruthy();
        expect(within(article).getByRole('link', { name: /^Consultar instrucciones para autores/ }).getAttribute('href')).toBe('https://www.scielo.br/rbeb/instrucciones');
        expect(within(article).getAllByRole('checkbox').length).toBeGreaterThan(2);
        expect(within(article).getByText('Las marcas de esta lista no se guardan.')).toBeTruthy();
    });
});

describe('status and note in a card', () => {
    it('the status select is inline with a visible «Estado» label, lists the real statuses and saves on change', async () => {
        const user = await open();
        const article = card('Journal of Smart Farming');
        const select = within(article).getByRole('combobox', { name: 'Estado de Journal of Smart Farming' });
        expect(select.labels[0].firstChild.textContent).toBe('Estado');
        expect(select.className).toContain('field-select');
        expect([...select.options].map((option) => option.textContent)).toEqual(['Por revisar', 'Preparando', 'Enviado', 'Descartado']);
        expect(select.value).toBe('review');
        await user.selectOptions(select, 'preparing');
        expect(stored().find((item) => item.id === 'j2')).toMatchObject({ type: 'journal', id: 'j2', title: 'Journal of Smart Farming', status: 'preparing', note: '' });
        expect(within(card('Journal of Smart Farming')).getByRole('combobox', { name: 'Estado de Journal of Smart Farming' }).value).toBe('preparing');
        expect([...card('Journal of Smart Farming').querySelectorAll('.badge')].map((badge) => badge.textContent)).toEqual(['Revista', 'Preparando']);
        expect(document.querySelector('[data-opp-announce]').textContent).toBe('Estado de Journal of Smart Farming: Preparando.');
    });

    it('the «Nota» disclosure is closed, shows no preview without a note and an excerpt (60 characters) with one', async () => {
        await open();
        const empty = card('Congreso IoT Cauca');
        expect(empty.querySelector('details[data-opp-note]').open).toBe(false);
        const emptySummary = noteSummary(empty);
        expect(emptySummary.querySelector('[data-opp-note-preview]')).toBeNull();
        expect(emptySummary.textContent).toBe('Nota de Congreso IoT Cauca');
        const short = noteSummary(card('Taller de Robótica Abierta'));
        expect(short.querySelector('[data-opp-note-preview]').textContent).toBe('Pedir carta al tutor');
        expect(short.querySelector('[data-opp-note-dot]')).toBeTruthy();
        const long = noteSummary(card('Revista Brasileira de Engenharia de Biossistemas'));
        expect(long.querySelector('[data-opp-note-preview]').textContent).toBe(`${'x'.repeat(60)}…`);
    });

    it('opening «Nota» shows the labelled textarea; «Guardar nota» saves the note (and only the note) and updates the preview', async () => {
        const user = await open();
        const article = card('Congreso IoT Cauca');
        await user.click(noteSummary(article));
        expect(article.querySelector('details[data-opp-note]').open).toBe(true);
        const field = within(article).getByLabelText('Nota personal de Congreso IoT Cauca');
        expect(field.className).toContain('field-textarea');
        expect(field.labels[0].className).toContain('field-label');
        expect(document.getElementById(field.getAttribute('aria-describedby')).className).toContain('field-hint');
        await user.type(field, 'Pedir carta');
        expect(stored().find((item) => item.id === 'e1').note).toBe('');
        await user.click(within(article).getByRole('button', { name: 'Guardar nota: Congreso IoT Cauca' }));
        expect(await within(article).findByText('Cambios guardados en este navegador.')).toBeTruthy();
        expect(stored().find((item) => item.id === 'e1')).toMatchObject({ status: 'review', note: 'Pedir carta' });
        expect(card('Congreso IoT Cauca').querySelector('[data-opp-note-preview]').textContent).toBe('Pedir carta');
    });

    it('a failing save says so and leaves the stored data as it was', async () => {
        const user = await open();
        const article = card('Congreso IoT Cauca');
        const before = window.localStorage.getItem(STORAGE_KEY);
        await user.click(noteSummary(article));
        await user.type(within(article).getByLabelText('Nota personal de Congreso IoT Cauca'), 'algo');
        const failing = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('cuota'); });
        await user.click(within(article).getByRole('button', { name: 'Guardar nota: Congreso IoT Cauca' }));
        expect(await within(article).findByText('No se pudieron guardar los cambios.')).toBeTruthy();
        failing.mockRestore();
        expect(window.localStorage.getItem(STORAGE_KEY)).toBe(before);
    });

    it('with a status filter active, changing the status of the only visible card leaves the focus on the list heading', async () => {
        const user = await open('/oportunidades?estado=submitted');
        await user.selectOptions(within(card('Revista Brasileira de Engenharia de Biossistemas')).getByRole('combobox', { name: /^Estado de/ }), 'discarded');
        expect(cardTitles()).toEqual([]);
        expect(document.activeElement).toBe(within(list()).getByRole('heading', { level: 2, name: 'Mis oportunidades' }));
        expect(await screen.findByText('Ninguna oportunidad coincide')).toBeTruthy();
    });
});

describe('backup panel', () => {
    // jsdom's File has no text() (browsers do, and the page calls it): add it.
    const file = (text, name = 'respaldo.json') => Object.assign(new File([text], name, { type: 'application/json' }), { text: async () => text });
    const openPanel = async (user) => {
        await user.click(within(backup()).getByText('Respaldo local'));
        expect(backup().querySelector('details').open).toBe(true);
    };

    it('is a collapsed <details> titled «Respaldo local» with the explanation, export and the import step inside', async () => {
        const user = await open();
        await openPanel(user);
        const panel = backup();
        expect(within(panel).getByText(/El archivo contiene sus oportunidades, estados y notas\. Guárdelo en un lugar seguro\./)).toBeTruthy();
        expect(within(panel).getByText(/almacenamiento de este navegador/)).toBeTruthy();
        const exportButton = within(panel).getByRole('button', { name: 'Exportar respaldo' });
        expect(exportButton.className).toContain('btn btn-primary');
        expect(within(panel).getByRole('button', { name: 'Importar respaldo' })).toBeTruthy();
        const input = within(panel).getByLabelText('Seleccionar respaldo para importar');
        expect(input.type).toBe('file');
        expect(input.getAttribute('accept')).toBe('application/json,.json');
        expect(input.className).toContain('sr-only');
        expect(input.labels[0].className).toContain('field-label');
        expect(document.getElementById(input.getAttribute('aria-describedby')).className).toContain('field-hint');
        expect(within(panel).getByText('Ningún archivo seleccionado')).toBeTruthy();
    });

    it('«Importar respaldo» opens the file picker', async () => {
        const user = await open();
        await openPanel(user);
        const input = within(backup()).getByLabelText('Seleccionar respaldo para importar');
        const click = vi.spyOn(input, 'click').mockImplementation(() => {});
        await user.click(within(backup()).getByRole('button', { name: 'Importar respaldo' }));
        expect(click).toHaveBeenCalledTimes(1);
    });

    it('«Exportar respaldo» downloads mis-oportunidades.json with version 1 and the saved items, unchanged', async () => {
        const user = await open();
        await openPanel(user);
        const create = URL.createObjectURL;
        let downloaded = null;
        vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function click() { downloaded = this.download; });
        await user.click(within(backup()).getByRole('button', { name: 'Exportar respaldo' }));
        expect(downloaded).toBe('mis-oportunidades.json');
        const blob = create.mock.calls[0][0];
        expect(blob.type).toBe('application/json;charset=utf-8');
        expect(JSON.parse(await readBlob(blob))).toEqual({ version: 1, items: SEED });
        expect(within(backup()).getByText('Respaldo descargado.')).toBeTruthy();
    });

    it('import: shows the file name, the preview, then «Confirmar importación» adds only the new items and the list updates', async () => {
        const user = await open('/oportunidades', SEED.slice(0, 2));
        await openPanel(user);
        const incoming = JSON.stringify({ version: 1, items: [SEED[0], { ...SEED[2] }, SEED[3]] });
        await user.upload(within(backup()).getByLabelText('Seleccionar respaldo para importar'), file(incoming, 'mi-copia.json'));
        expect(await within(backup()).findByText(/Se agregarán 2 oportunidades; 1 duplicadas no se modificarán\./)).toBeTruthy();
        expect(within(backup()).getByText('Archivo seleccionado: mi-copia.json')).toBeTruthy();
        expect(stored()).toHaveLength(2);
        await user.click(within(backup()).getByRole('button', { name: 'Confirmar importación' }));
        expect(await within(backup()).findByText('Importación terminada: 2 agregadas y 1 duplicadas conservadas sin cambios.')).toBeTruthy();
        expect(stored().map((item) => item.id)).toEqual(['e1', 'e2', 'e3', 'j1']);
        expect(cardTitles()).toHaveLength(4);
        expect(within(summary()).getByText('Guardadas').parentElement.textContent).toBe('Guardadas4');
        expect(within(backup()).queryByRole('button', { name: 'Confirmar importación' })).toBeNull();
        expect(within(backup()).getByText('Ningún archivo seleccionado')).toBeTruthy();
    });

    it('import: an invalid file explains it and changes nothing', async () => {
        const user = await open();
        await openPanel(user);
        const before = window.localStorage.getItem(STORAGE_KEY);
        await user.upload(within(backup()).getByLabelText('Seleccionar respaldo para importar'), file('{no es json'));
        expect(await within(backup()).findByText('No se pudo leer el respaldo. Verifique el archivo. No se modificaron los datos.')).toBeTruthy();
        expect(within(backup()).queryByRole('button', { name: 'Confirmar importación' })).toBeNull();
        expect(window.localStorage.getItem(STORAGE_KEY)).toBe(before);
    });

    it('import works from an empty list too', async () => {
        const user = await open('/oportunidades', null);
        await openPanel(user);
        await user.upload(within(backup()).getByLabelText('Seleccionar respaldo para importar'), file(JSON.stringify({ version: 1, items: SEED.slice(0, 1) })));
        await user.click(await within(backup()).findByRole('button', { name: 'Confirmar importación' }));
        expect(await screen.findByRole('heading', { level: 4, name: 'Congreso IoT Cauca' })).toBeTruthy();
    });
});

describe('empty states', () => {
    it('nothing saved: a friendly explanation with a link to each finder and no summary or toolbar', async () => {
        await open('/oportunidades', null);
        const empty = within(list()).getByText('Todavía no guardaste oportunidades').closest('[data-opp-empty]');
        expect(within(empty).getByText(/Guardar/)).toBeTruthy();
        const events = within(empty).getByRole('link', { name: /Buscar eventos/ });
        const journals = within(empty).getByRole('link', { name: /Dónde publicar/ });
        expect(events.getAttribute('href')).toBe('/eventos');
        expect(events.className).toContain('btn-events');
        expect(journals.getAttribute('href')).toBe('/donde-publicar');
        expect(journals.className).toContain('btn-journals');
        expect(screen.queryByRole('region', { name: 'Resumen' })).toBeNull();
        expect(screen.queryByRole('searchbox')).toBeNull();
        expect(screen.queryByText(/Todavía no hay (eventos|revistas) guardad/)).toBeNull();
        expect(backup()).toBeTruthy();
        expect(within(main()).getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)).toEqual(['Mis oportunidades', 'Respaldo local']);
    });

    it('no result for the filters: «Ninguna oportunidad coincide» with ONE «Limpiar filtros» that brings everything back', async () => {
        const user = await open('/oportunidades?q=zzzz&tipo=eventos');
        expect(within(list()).getByText('Ninguna oportunidad coincide')).toBeTruthy();
        expect(within(list()).getByRole('status').textContent).toBe('0 oportunidades');
        expect(within(list()).getAllByRole('button', { name: 'Limpiar filtros' })).toHaveLength(1);
        await user.click(within(list()).getByRole('button', { name: 'Limpiar filtros' }));
        expect(cardTitles()).toHaveLength(6);
        expect(search()).toBe('');
    });

    it('a type with nothing saved shows no section and no «Todavía no hay…» row', async () => {
        await open('/oportunidades', SEED.filter((item) => item.type === 'journal'));
        expect(within(list()).getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent)).toEqual(['Revistas']);
        expect(screen.queryByText(/Todavía no hay/)).toBeNull();
        expect(screen.queryByText('No hay oportunidades con este estado.')).toBeNull();
    });

    it('unreadable saved data: explains it, does not touch the data and keeps the backup panel', async () => {
        await open('/oportunidades', '{roto');
        expect(await screen.findByText('No se pueden leer los favoritos guardados. No se modificaron los datos.')).toBeTruthy();
        expect(window.localStorage.getItem(STORAGE_KEY)).toBe('{roto');
        expect(backup()).toBeTruthy();
        expect(screen.queryByRole('region', { name: 'Resumen' })).toBeNull();
    });
});

describe('keyboard', () => {
    it('Tab goes through the summary, the toolbar and then the first card in reading order', async () => {
        const user = await open();
        const pointer = screen.getByRole('link', { name: 'Ir al respaldo' });
        pointer.focus();
        const order = [pointer.textContent];
        for (let step = 0; step < 14; step += 1) {
            await user.tab();
            order.push(document.activeElement.getAttribute('aria-label') ?? document.activeElement.textContent.trim());
        }
        const at = (text) => order.findIndex((entry) => entry.startsWith(text));
        expect(at('Ir al respaldo')).toBeGreaterThan(-1);
        expect(at('Por revisar:')).toBeGreaterThan(at('Ir al respaldo'));
        expect(at('Descartado:')).toBeGreaterThan(at('Por revisar:'));
        expect(at('Todas')).toBeGreaterThan(at('Descartado:'));
        expect(at('Eventos (3)')).toBeGreaterThan(at('Todas'));
        expect(at('Lista')).toBeGreaterThan(at('Revistas (3)'));
    });

    it('the type control, the view toggle and the count cards are real buttons reachable and pressable with Enter and Space', async () => {
        const user = await open();
        const button = within(list()).getByRole('button', { name: 'Revistas (3)' });
        button.focus();
        await user.keyboard('{Enter}');
        expect(search()).toBe('?tipo=revistas');
        statusButton('Enviado').focus();
        await user.keyboard(' ');
        expect(search()).toBe('?tipo=revistas&estado=submitted');
    });
});
