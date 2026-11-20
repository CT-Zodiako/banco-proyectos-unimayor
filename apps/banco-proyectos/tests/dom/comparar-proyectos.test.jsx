// T17 of odd/tasks/mejora-visual.md (L19: "Comparar proyectos — Seleccionar 2 o 3 proyectos y verlos lado a lado, como ya
// existe para revistas y eventos"): a «Comparar» toggle on every catalog card (max 3, kept in the `cmp` param of /proyectos
// and in the session), a tray at the bottom of the catalog, and the lazy page /proyectos/comparar?ids=a,b,c with the
// side-by-side table. The catalog keeps the light index; only the comparison page downloads the full data.
import { cleanup, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { deferred, mockDataFetch, renderApp } from './helpers.jsx';
import { projects } from '../../src/data/projects/index.js';
import { splitProjectTitle } from '../../src/lib/catalog.js';

const STORAGE_KEY = 'banco.compareProjects';
const CATALOG_SEARCH_KEY = 'banco.catalogSearch';
const FULL = '../../src/data/projects/index.js';
const PAGE = '../../src/pages/CompareProjects.jsx';
const MESSAGE = 'Máximo 3 proyectos. Quita uno para añadir otro.';

const byId = (id) => projects.find((project) => project.id === id);
const titleOf = (id) => splitProjectTitle(byId(id).titulo).title;
const params = () => new URLSearchParams(window.location.search);

const add = (id) => screen.getByRole('button', { name: `Comparar: ${titleOf(id)}` });
const remove = (id) => screen.getByRole('button', { name: `Quitar de la comparación: ${titleOf(id)}` });
const tray = () => screen.queryByRole('region', { name: 'Proyectos para comparar' });
const compareNow = () => within(tray()).getByRole('button', { name: 'Comparar ahora' });

const openCatalog = async (url = '/proyectos') => {
    mockDataFetch();
    await renderApp(url);
    await screen.findByRole('region', { name: 'Resultados' });
};
const openComparison = async (url) => {
    mockDataFetch();
    await renderApp(url);
    await screen.findByRole('heading', { level: 1, name: 'Comparar proyectos' });
};
const setClipboard = (value) => Object.defineProperty(navigator, 'clipboard', { value, configurable: true, writable: true });

beforeEach(() => { vi.spyOn(console, 'error').mockImplementation(() => {}); }); // a failed chunk is logged by React
afterEach(() => {
    Reflect.deleteProperty(navigator, 'clipboard');
    vi.doUnmock(FULL);
    vi.doUnmock(PAGE);
});

/* ------------------------------- the toggle on each card ------------------------------- */
describe('/proyectos: the «Comparar» toggle of each card', () => {
    it('every card has a toggle named «Comparar: <título>», not pressed, and there is no tray yet', async () => {
        await openCatalog();
        const results = screen.getByRole('region', { name: 'Resultados' });
        const cards = within(results).getAllByRole('article');
        expect(cards).toHaveLength(12);
        for (const card of cards) {
            const toggle = within(card).getByRole('button', { name: /^Comparar: / });
            expect(toggle.getAttribute('aria-pressed')).toBe('false');
            expect(toggle.querySelector('svg')).toBeTruthy();
            expect(toggle.textContent).toMatch(/^Comparar/);
        }
        expect(add('proj_001').closest('article')).toBe(cards[0]);
        expect(tray()).toBeNull();
    });

    it('pressing it selects the project: aria-pressed, the name changes to «Quitar de la comparación: <título>», and pressing again undoes it', async () => {
        await openCatalog();
        const user = userEvent.setup();
        await user.click(add('proj_001'));
        const selected = remove('proj_001');
        expect(selected.getAttribute('aria-pressed')).toBe('true');
        expect(screen.queryByRole('button', { name: `Comparar: ${titleOf('proj_001')}` })).toBeNull();
        await user.click(selected);
        expect(add('proj_001').getAttribute('aria-pressed')).toBe('false');
        expect(tray()).toBeNull();
    });

    it('works with the keyboard: Space and Enter on the focused toggle', async () => {
        await openCatalog();
        const user = userEvent.setup();
        add('proj_002').focus();
        await user.keyboard(' ');
        expect(remove('proj_002').getAttribute('aria-pressed')).toBe('true');
        await user.keyboard('{Enter}');
        expect(add('proj_002').getAttribute('aria-pressed')).toBe('false');
    });

    it('at 3 selected the other toggles are disabled and say «Máximo 3 proyectos. Quita uno para añadir otro.»; the selected ones stay active', async () => {
        await openCatalog();
        const user = userEvent.setup();
        for (const id of ['proj_001', 'proj_002', 'proj_003']) await user.click(add(id));
        const blocked = add('proj_004');
        expect(blocked.disabled).toBe(true);
        expect(blocked.getAttribute('aria-pressed')).toBe('false');
        expect(document.getElementById(blocked.getAttribute('aria-describedby')).textContent).toBe(MESSAGE);
        expect(blocked.closest('[data-tip]')?.getAttribute('data-tip')).toBe(MESSAGE);
        for (const id of ['proj_001', 'proj_002', 'proj_003']) expect(remove(id).disabled).toBe(false);
        const others = screen.getAllByRole('button', { name: /^Comparar: / });
        expect(others).toHaveLength(9);
        expect(others.every((button) => button.disabled)).toBe(true);

        await user.click(remove('proj_002'));
        expect(screen.getAllByRole('button', { name: /^Comparar: / }).every((button) => !button.disabled)).toBe(true);
        expect(add('proj_004').getAttribute('aria-describedby')).toBeNull();
    });
});

/* ------------------------------------- the tray ------------------------------------- */
describe('/proyectos: the comparison tray', () => {
    it('appears with the first selection: a labelled region with a count, one chip per project and «Elige al menos 2»', async () => {
        await openCatalog();
        const user = userEvent.setup();
        await user.click(add('proj_001'));
        const region = tray();
        expect(region).toBeTruthy();
        expect(within(region).getByRole('status').textContent).toMatch(/1 de 3/);
        expect(within(region).getByText(titleOf('proj_001'))).toBeTruthy();
        expect(within(region).getByText('Elige al menos 2')).toBeTruthy();
        expect(compareNow().getAttribute('aria-disabled')).toBe('true');
        expect(within(region).getByRole('button', { name: 'Vaciar comparación' })).toBeTruthy();
    });

    it('«Comparar ahora» does nothing with one project and opens the comparison with two', async () => {
        await openCatalog();
        const user = userEvent.setup();
        await user.click(add('proj_001'));
        await user.click(compareNow());
        expect(window.location.pathname).toBe('/proyectos');

        await user.click(add('proj_002'));
        expect(within(tray()).getByRole('status').textContent).toMatch(/2 de 3/);
        expect(within(tray()).queryByText('Elige al menos 2')).toBeNull();
        expect(compareNow().getAttribute('aria-disabled')).not.toBe('true');
        await user.click(compareNow());
        expect(await screen.findByRole('heading', { level: 1, name: 'Comparar proyectos' })).toBeTruthy();
        expect(window.location.pathname).toBe('/proyectos/comparar');
        expect(params().get('ids')).toBe('proj_001,proj_002');
    });

    it('a chip removes one project (its toggle goes back to «Comparar»); the last removal hides the tray', async () => {
        await openCatalog();
        const user = userEvent.setup();
        await user.click(add('proj_001'));
        await user.click(add('proj_002'));
        await user.click(within(tray()).getByRole('button', { name: `Quitar ${titleOf('proj_001')} de la comparación` }));
        expect(add('proj_001').getAttribute('aria-pressed')).toBe('false');
        expect(within(tray()).getByRole('status').textContent).toMatch(/1 de 3/);
        await user.click(within(tray()).getByRole('button', { name: `Quitar ${titleOf('proj_002')} de la comparación` }));
        expect(tray()).toBeNull();
    });

    it('«Vaciar comparación» clears the selection, the URL and the session copy', async () => {
        await openCatalog('/proyectos?q=sensor');
        const user = userEvent.setup();
        const first = screen.getAllByRole('button', { name: /^Comparar: / })[0];
        await user.click(first);
        expect(params().get('cmp')).toBeTruthy();
        expect(window.sessionStorage.getItem(STORAGE_KEY)).toBeTruthy();
        await user.click(within(tray()).getByRole('button', { name: 'Vaciar comparación' }));
        expect(tray()).toBeNull();
        expect(params().has('cmp')).toBe(false);
        expect(params().get('q')).toBe('sensor');
        expect(window.sessionStorage.getItem(STORAGE_KEY)).toBeNull();
        expect(screen.queryAllByRole('button', { name: /^Quitar de la comparación: / })).toHaveLength(0);
    });

    it('is a stacked, in-flow region of the page container (never covers the last cards), with a polite status', async () => {
        await openCatalog();
        await userEvent.setup().click(add('proj_001'));
        const region = tray();
        expect(region.closest('main')).toBeTruthy();
        expect(region.className).toMatch(/\bsticky\b/);
        const status = within(region).getByRole('status');
        expect(status.getAttribute('aria-live')).toBe('polite');
    });

    it('the selected projects stay in the tray when the filters hide their cards', async () => {
        await openCatalog();
        const user = userEvent.setup();
        await user.click(add('proj_001'));
        await user.type(screen.getByLabelText('Buscar'), 'zzzzqqq');
        await screen.findByText('No encontramos resultados');
        expect(within(tray()).getByText(titleOf('proj_001'))).toBeTruthy();
    });
});

/* ------------------------------ URL param and session copy ------------------------------ */
describe('/proyectos: the selection lives in the URL (cmp) and in the session', () => {
    it('writes cmp=id1,id2 as projects are chosen and keeps the filters and the page of the URL', async () => {
        await openCatalog('/proyectos?area=SBC-IoT&nivel=Avanzado&q=sensor&orden=recientes');
        const before = params();
        const user = userEvent.setup();
        const toggles = screen.getAllByRole('button', { name: /^Comparar: / });
        await user.click(toggles[0]);
        await user.click(toggles[1]);
        const after = params();
        expect(after.get('cmp').split(',')).toHaveLength(2);
        expect(window.location.search).toContain('cmp=');
        expect(after.getAll('area')).toEqual(before.getAll('area'));
        expect(after.getAll('nivel')).toEqual(before.getAll('nivel'));
        expect(after.get('q')).toBe('sensor');
        expect(after.get('orden')).toBe('recientes');
        expect(window.sessionStorage.getItem(STORAGE_KEY)).toBe(after.get('cmp'));
    });

    it('opening /proyectos?cmp=… restores the selection: pressed toggles, tray and count', async () => {
        await openCatalog('/proyectos?cmp=proj_003,proj_001');
        expect(remove('proj_001').getAttribute('aria-pressed')).toBe('true');
        expect(remove('proj_003').getAttribute('aria-pressed')).toBe('true');
        expect(add('proj_002').getAttribute('aria-pressed')).toBe('false');
        expect(within(tray()).getByRole('status').textContent).toMatch(/2 de 3/);
        expect(params().get('cmp')).toBe('proj_003,proj_001');
    });

    it('ignores invalid ids without changing the URL, and truncates to 3', async () => {
        await openCatalog('/proyectos?cmp=zzz,proj_001');
        expect(within(tray()).getByRole('status').textContent).toMatch(/1 de 3/);
        expect(remove('proj_001')).toBeTruthy();
        expect(params().get('cmp')).toBe('zzz,proj_001');

        cleanup();
        await openCatalog('/proyectos?cmp=nope,otro');
        expect(tray()).toBeNull();
        expect(params().get('cmp')).toBe('nope,otro');

        cleanup();
        await openCatalog('/proyectos?cmp=proj_001,proj_002,proj_003,proj_004');
        expect(within(tray()).getByRole('status').textContent).toMatch(/3 de 3/);
        expect(screen.queryByRole('button', { name: `Quitar de la comparación: ${titleOf('proj_004')}` })).toBeNull();
    });

    it('old URLs stay as they are: no cmp is added when nothing is selected', async () => {
        await openCatalog('/proyectos?area=SBC-IoT&nivel=Avanzado&q=sensor&pagina=1');
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: /^Intermedio \d+$/ }));
        await waitFor(() => expect(params().getAll('nivel')).toContain('Intermedio'));
        expect(params().has('cmp')).toBe(false);
        expect(tray()).toBeNull();
        expect(window.sessionStorage.getItem(STORAGE_KEY)).toBeNull();
    });

    it('survives navigation inside the session: leave /proyectos and come back through the menu', async () => {
        await openCatalog();
        const user = userEvent.setup();
        await user.click(add('proj_001'));
        await user.click(add('proj_002'));
        const menu = screen.getByRole('navigation', { name: 'Principal' });
        await user.click(within(menu).getByRole('link', { name: 'Mis oportunidades' }));
        await screen.findByRole('heading', { level: 1, name: 'Mis oportunidades' });
        await user.click(within(menu).getByRole('link', { name: 'Proyectos' }));
        await screen.findByRole('region', { name: 'Resultados' });
        expect(within(tray()).getByRole('status').textContent).toMatch(/2 de 3/);
        expect(remove('proj_001').getAttribute('aria-pressed')).toBe('true');
        expect(params().get('cmp')).toBe('proj_001,proj_002');
    });

    it('«Limpiar filtros» keeps the selection', async () => {
        await openCatalog('/proyectos?cmp=proj_001&q=sensor&nivel=Avanzado');
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Limpiar filtros' }));
        await waitFor(() => expect(params().has('q')).toBe(false));
        expect(params().get('cmp')).toBe('proj_001');
        expect(within(tray()).getByRole('status').textContent).toMatch(/1 de 3/);
    });

    it('the legend of the cards says how to compare', async () => {
        await openCatalog();
        const legend = screen.getByRole('complementary', { name: 'Cómo leer las tarjetas' });
        expect(within(legend).getByText(/Comparar proyectos/)).toBeTruthy();
    });
});

/* -------------------------------- «Comparar con otros» -------------------------------- */
describe('the project page: «Comparar con otros»', () => {
    it('adds the project to the selection and goes to the catalog with the tray', async () => {
        mockDataFetch();
        await renderApp('/proyecto/proj_001');
        const user = userEvent.setup();
        await user.click(await screen.findByRole('button', { name: 'Comparar con otros' }));
        await screen.findByRole('region', { name: 'Resultados' });
        expect(window.location.pathname).toBe('/proyectos');
        expect(params().get('cmp')).toBe('proj_001');
        expect(within(tray()).getByRole('status').textContent).toMatch(/1 de 3/);
    });

    it('is disabled with the reason when 3 other projects are already selected', async () => {
        window.sessionStorage.setItem(STORAGE_KEY, 'proj_002,proj_003,proj_004');
        mockDataFetch();
        await renderApp('/proyecto/proj_001');
        const button = await screen.findByRole('button', { name: 'Comparar con otros' });
        expect(button.disabled).toBe(true);
        expect(document.getElementById(button.getAttribute('aria-describedby')).textContent).toBe(MESSAGE);
    });
});

/* ------------------------------- the comparison page ------------------------------- */
const tableOf = (count) => screen.getByRole('table', { name: `Comparación de ${count} proyectos` });
const rowOf = (table, label) => within(table).getByRole('rowheader', { name: new RegExp(`^${label}`) }).closest('tr');
const hasRow = (table, label) => within(table).queryByRole('rowheader', { name: new RegExp(`^${label}`) }) !== null;

describe('/proyectos/comparar: the table', () => {
    it('with 2 projects: header with the shared PageHeader, one column per project and the rows of the data', async () => {
        await openComparison('/proyectos/comparar?ids=proj_001,proj_002');
        const header = document.querySelector('main .page-header');
        expect(header).toBeTruthy();
        expect(header.classList.contains('hue-card')).toBe(true);
        expect(header.contains(screen.getByRole('heading', { level: 1 }))).toBe(true);
        expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);

        const table = tableOf(2);
        const heads = within(table).getAllByRole('columnheader');
        expect(heads).toHaveLength(3);
        expect(heads[0].textContent).toBe('Dato');
        expect(heads[1].textContent).toContain('Proyecto 1');
        expect(heads[2].textContent).toContain('Proyecto 2');
        for (const id of ['proj_001', 'proj_002']) {
            const link = within(table).getByRole('link', { name: titleOf(id) });
            expect(link.getAttribute('href')).toBe(`/proyecto/${id}`);
        }
        for (const th of heads) expect(th.getAttribute('scope')).toBe('col');
        for (const label of ['Problema', 'Descripción', 'Área', 'Sector', 'Nivel', 'Duración', 'Presupuesto', 'Hardware', 'Software', 'Habilidades', 'Objetivo general', 'Objetivos específicos', 'Dónde se aplica']) {
            const rowHeader = within(table).getByRole('rowheader', { name: new RegExp(`^${label}`) });
            expect(rowHeader.getAttribute('scope')).toBe('row');
        }
        for (const section of ['Resumen', 'Clasificación', 'Alcance', 'Objetivos', 'Impacto']) {
            const heading = within(table).getByText(section).closest('th');
            expect(heading.getAttribute('scope')).toBe('rowgroup');
        }
    });

    it('with 3 projects there are 3 columns and every row has 3 cells with the data of each project', async () => {
        await openComparison('/proyectos/comparar?ids=proj_001,proj_002,proj_161');
        const table = tableOf(3);
        expect(within(table).getAllByRole('columnheader')).toHaveLength(4);
        const area = within(rowOf(table, 'Área')).getAllByRole('cell');
        expect(area.map((cell) => cell.textContent)).toEqual([byId('proj_001').area, byId('proj_002').area, byId('proj_161').area]);
        const level = within(rowOf(table, 'Nivel')).getAllByRole('cell');
        expect(level.map((cell) => cell.textContent)).toEqual(['Intermedio', 'Avanzado', 'Intermedio-Avanzado'].map((text) => expect.stringContaining(text)));
        expect(level[1].querySelector('.level-dots')).toBeTruthy();
        expect(level[1].querySelectorAll('.level-dots i.on')).toHaveLength(3);
        expect(level[0].querySelectorAll('.level-dots i.on')).toHaveLength(1);
        const hardware = within(rowOf(table, 'Hardware')).getAllByRole('cell');
        expect(hardware[0].textContent).toContain(String(byId('proj_001').hardware_tabla.length));
        expect(hardware[0].textContent).toContain(byId('proj_001').hardware_tabla[0].componente);
        expect(within(hardware[2]).getAllByRole('listitem')).toHaveLength(byId('proj_161').hardware_tabla.length);
        const specific = within(rowOf(table, 'Objetivos específicos')).getAllByRole('cell');
        expect(within(specific[2]).getAllByRole('listitem')).toHaveLength(3);
        expect(within(rowOf(table, 'Descripción')).getAllByRole('cell')[0].textContent).toMatch(/^Red de sensores distribuidos/);
    });

    it('each column has the actions: Ver proyecto, Dónde publicar, Ver eventos (type hues) and Quitar', async () => {
        await openComparison('/proyectos/comparar?ids=proj_001,proj_002');
        const table = tableOf(2);
        const actions = within(table).getByRole('rowheader', { name: 'Acciones' }).closest('tr');
        const cells = within(actions).getAllByRole('cell');
        expect(cells).toHaveLength(2);
        const [first] = cells;
        const view = within(first).getByRole('link', { name: /^Ver proyecto/ });
        expect(view.getAttribute('href')).toBe('/proyecto/proj_001');
        const publish = within(first).getByRole('link', { name: /^Dónde publicar/ });
        expect(publish.getAttribute('href')).toBe('/donde-publicar?p=proj_001');
        expect(publish.classList.contains('btn-journals')).toBe(true);
        const events = within(first).getByRole('link', { name: /^Ver eventos/ });
        expect(events.getAttribute('href')).toBe('/eventos?p=proj_001');
        expect(events.classList.contains('btn-events')).toBe(true);
        expect(view.getAttribute('aria-label')).toContain(titleOf('proj_001'));
        expect(within(first).getByRole('button', { name: /^Quitar/ })).toBeTruthy();
    });

    it('the table scrolls inside its own box (focusable, named) and keeps a sticky first column; the page does not overflow', async () => {
        await openComparison('/proyectos/comparar?ids=proj_001,proj_002,proj_003');
        const table = tableOf(3);
        const box = table.closest('[tabindex="0"]');
        expect(box).toBeTruthy();
        expect(box.getAttribute('role')).toBe('region');
        expect(box.getAttribute('aria-label')).toBe('Tabla de comparación, se desplaza hacia los lados');
        expect(box.className).toMatch(/overflow-x-auto/);
        const rowHeader = within(table).getByRole('rowheader', { name: /^Área/ });
        expect(rowHeader.className).toMatch(/\bsticky\b/);
        expect(rowHeader.className).toMatch(/left-0/);
    });
});

describe('/proyectos/comparar: differences', () => {
    const open = () => openComparison('/proyectos/comparar?ids=proj_001,proj_002,proj_003');

    it('marks the rows whose values differ with a «Difiere» chip and a tint (on by default); equal rows have none', async () => {
        await open();
        const table = tableOf(3);
        const toggle = screen.getByRole('checkbox', { name: 'Resaltar diferencias' });
        expect(toggle.checked).toBe(true);
        expect(screen.getByRole('checkbox', { name: 'Ocultar filas iguales' }).checked).toBe(false);
        for (const label of ['Nivel', 'Sector', 'Hardware']) {
            const row = rowOf(table, label);
            expect(row.getAttribute('data-differs')).toBe('true');
            expect(within(row).getByText('Difiere')).toBeTruthy();
        }
        // proj_001, 002 and 003 share their area and budget
        for (const label of ['Área', 'Presupuesto']) {
            const row = rowOf(table, label);
            expect(row.getAttribute('data-differs')).toBe('false');
            expect(within(row).queryByText('Difiere')).toBeNull();
        }
    });

    it('«Resaltar diferencias» off removes the chips and the tint but keeps every row', async () => {
        await open();
        const user = userEvent.setup();
        await user.click(screen.getByRole('checkbox', { name: 'Resaltar diferencias' }));
        const table = tableOf(3);
        expect(within(table).queryByText('Difiere')).toBeNull();
        expect(rowOf(table, 'Nivel').getAttribute('data-differs')).toBeNull();
        expect(hasRow(table, 'Área')).toBe(true);
        expect(hasRow(table, 'Nivel')).toBe(true);
        await user.click(screen.getByRole('checkbox', { name: 'Resaltar diferencias' }));
        expect(within(tableOf(3)).getAllByText('Difiere').length).toBeGreaterThan(0);
    });

    it('«Ocultar filas iguales» hides the rows that are the same (and a section left empty) and brings them back', async () => {
        await open();
        const user = userEvent.setup();
        await user.click(screen.getByRole('checkbox', { name: 'Ocultar filas iguales' }));
        let table = tableOf(3);
        expect(hasRow(table, 'Área')).toBe(false);
        expect(hasRow(table, 'Presupuesto')).toBe(false);
        expect(hasRow(table, 'Nivel')).toBe(true);
        expect(hasRow(table, 'Hardware')).toBe(true);
        // the actions are not data: they always stay
        expect(within(table).getByRole('rowheader', { name: 'Acciones' })).toBeTruthy();
        await user.click(screen.getByRole('checkbox', { name: 'Ocultar filas iguales' }));
        table = tableOf(3);
        expect(hasRow(table, 'Área')).toBe(true);
        expect(hasRow(table, 'Presupuesto')).toBe(true);
    });

    it('works with highlighting off: hiding equal rows does not need the chips', async () => {
        await open();
        const user = userEvent.setup();
        await user.click(screen.getByRole('checkbox', { name: 'Resaltar diferencias' }));
        await user.click(screen.getByRole('checkbox', { name: 'Ocultar filas iguales' }));
        const table = tableOf(3);
        expect(hasRow(table, 'Área')).toBe(false);
        expect(hasRow(table, 'Nivel')).toBe(true);
        expect(within(table).queryByText('Difiere')).toBeNull();
    });

    it('a repeated id counts once: this is a 2-project comparison', async () => {
        await openComparison('/proyectos/comparar?ids=proj_001,proj_001,proj_002');
        expect(tableOf(2)).toBeTruthy();
    });
});

describe('/proyectos/comparar: edge cases', () => {
    it('without ids: a friendly empty state with a link to the catalog and no table', async () => {
        await openComparison('/proyectos/comparar');
        expect(screen.queryByRole('table')).toBeNull();
        const empty = screen.getByRole('heading', { level: 2, name: 'Elige al menos 2 proyectos para compararlos' });
        expect(empty).toBeTruthy();
        expect(screen.getByText(/Marca «Comparar» en 2 o 3 tarjetas del catálogo/)).toBeTruthy();
        const link = screen.getByRole('link', { name: 'Elegir proyectos en el catálogo' });
        expect(link.getAttribute('href')).toBe('/proyectos');
    });

    it('with a single valid id it is the same empty state', async () => {
        await openComparison('/proyectos/comparar?ids=proj_001');
        expect(screen.queryByRole('table')).toBeNull();
        expect(screen.getByRole('heading', { level: 2, name: 'Elige al menos 2 proyectos para compararlos' })).toBeTruthy();
        expect(screen.getByRole('link', { name: 'Elegir proyectos en el catálogo' }).getAttribute('href')).toBe('/proyectos?cmp=proj_001');
    });

    it('unknown ids are ignored and a note says which', async () => {
        await openComparison('/proyectos/comparar?ids=proj_001,zzz,proj_002');
        expect(tableOf(2)).toBeTruthy();
        const note = screen.getByRole('status', { name: 'Avisos de la comparación' });
        expect(note.textContent).toContain('Se ignoró 1 proyecto que no existe: zzz.');
    });

    it('only unknown ids: empty state that also names them', async () => {
        await openComparison('/proyectos/comparar?ids=zzz,yyy');
        expect(screen.queryByRole('table')).toBeNull();
        expect(screen.getByRole('status', { name: 'Avisos de la comparación' }).textContent).toContain('Se ignoraron 2 proyectos que no existen: zzz, yyy.');
        expect(screen.getByRole('link', { name: 'Elegir proyectos en el catálogo' })).toBeTruthy();
    });

    it('more than 3 ids: the first 3 are compared and a note says how many were left out', async () => {
        await openComparison('/proyectos/comparar?ids=proj_001,proj_002,proj_003,proj_004,proj_005');
        const table = tableOf(3);
        expect(within(table).getAllByRole('columnheader')).toHaveLength(4);
        expect(within(table).queryByRole('link', { name: titleOf('proj_004') })).toBeNull();
        expect(screen.getByRole('status', { name: 'Avisos de la comparación' }).textContent).toContain('Se comparan solo los 3 primeros; se ignoraron 2 más.');
    });

    it('without notes the notes region is not in the page', async () => {
        await openComparison('/proyectos/comparar?ids=proj_001,proj_002');
        expect(screen.queryByRole('status', { name: 'Avisos de la comparación' })).toBeNull();
    });

    it('«Quitar» takes a project out of the URL and the session; with fewer than 2 left it shows the empty state', async () => {
        window.sessionStorage.setItem(STORAGE_KEY, 'proj_001,proj_002,proj_003');
        await openComparison('/proyectos/comparar?ids=proj_001,proj_002,proj_003');
        const user = userEvent.setup();
        await user.click(within(tableOf(3)).getByRole('button', { name: `Quitar de la comparación: ${titleOf('proj_002')}` }));
        expect(params().get('ids')).toBe('proj_001,proj_003');
        expect(window.sessionStorage.getItem(STORAGE_KEY)).toBe('proj_001,proj_003');
        expect(within(tableOf(2)).queryByRole('link', { name: titleOf('proj_002') })).toBeNull();
        await user.click(within(tableOf(2)).getByRole('button', { name: `Quitar de la comparación: ${titleOf('proj_003')}` }));
        expect(await screen.findByRole('heading', { level: 2, name: 'Elige al menos 2 proyectos para compararlos' })).toBeTruthy();
        expect(params().get('ids')).toBe('proj_001');
    });

    it('«Volver a los proyectos» goes back to the catalog with its previous filters and this selection', async () => {
        window.sessionStorage.setItem(CATALOG_SEARCH_KEY, '?area=SBC-IoT&nivel=Avanzado&pagina=2');
        await openComparison('/proyectos/comparar?ids=proj_001,proj_002');
        const back = screen.getByRole('link', { name: /Volver a los proyectos/ });
        expect(back.getAttribute('href')).toBe('/proyectos?area=SBC-IoT&nivel=Avanzado&pagina=2&cmp=proj_001,proj_002');
        expect(document.querySelector('main .page-header').contains(back)).toBe(true);
    });

    it('without a saved catalog view the back link is /proyectos with the selection', async () => {
        await openComparison('/proyectos/comparar?ids=proj_001,proj_002');
        expect(screen.getByRole('link', { name: /Volver a los proyectos/ }).getAttribute('href')).toBe('/proyectos?cmp=proj_001,proj_002');
    });

    it('«Mis oportunidades guardadas →» is in the header like on the other pages', async () => {
        await openComparison('/proyectos/comparar?ids=proj_001,proj_002');
        expect(within(document.querySelector('main .page-header')).getByRole('link', { name: 'Mis oportunidades guardadas →' }).getAttribute('href')).toBe('/oportunidades');
    });
});

describe('/proyectos/comparar: share', () => {
    it('«Compartir comparación» copies the address of the comparison with the valid ids only', async () => {
        const user = userEvent.setup(); // user-event installs its own clipboard: the stub goes in after it
        const writeText = vi.fn().mockResolvedValue();
        setClipboard({ writeText });
        await openComparison('/proyectos/comparar?ids=proj_002,zzz,proj_001');
        await user.click(screen.getByRole('button', { name: 'Compartir comparación' }));
        expect(writeText).toHaveBeenCalledWith(`${window.location.origin}/proyectos/comparar?ids=proj_002,proj_001`);
        expect(await screen.findByText('Enlace copiado')).toBeTruthy();
    });

    it('the catalog keeps its own «Compartir esta búsqueda» label', async () => {
        await openCatalog();
        expect(screen.getByRole('button', { name: 'Compartir esta búsqueda' })).toBeTruthy();
    });
});

describe('/proyectos/comparar: loading and errors', () => {
    function controlFull({ gate = null, failures = 0 } = {}) {
        const state = { attempts: 0, failures };
        vi.doMock(FULL, async (importOriginal) => {
            state.attempts += 1;
            if (gate) await gate.promise;
            if (state.attempts <= state.failures) throw new Error('chunk failed');
            return importOriginal();
        });
        return state;
    }

    it('shows a loading status while the page and the full data download, then the table', async () => {
        const gate = deferred();
        controlFull({ gate });
        mockDataFetch();
        await renderApp('/proyectos/comparar?ids=proj_001,proj_002', { settle: false, preloadProjects: false });
        const status = within(screen.getByRole('main')).getByRole('status');
        expect(status.textContent).toMatch(/^Cargando la comparación/);
        expect(status.getAttribute('aria-busy')).toBe('true');
        expect(screen.queryByRole('table')).toBeNull();
        gate.resolve();
        expect(await screen.findByRole('heading', { level: 1, name: 'Comparar proyectos' })).toBeTruthy();
        expect(tableOf(2)).toBeTruthy();
    });

    it('says it could not load and «Reintentar» recovers', async () => {
        const state = controlFull({ failures: 1 });
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp('/proyectos/comparar?ids=proj_001,proj_002', { settle: false, preloadProjects: false });
        const alert = await screen.findByRole('alert');
        expect(alert.textContent).toContain('No se pudo cargar la comparación');
        await user.click(within(alert).getByRole('button', { name: 'Reintentar' }));
        expect(await screen.findByRole('heading', { level: 1, name: 'Comparar proyectos' })).toBeTruthy();
        expect(tableOf(2)).toBeTruthy();
        expect(state.attempts).toBe(2);
    });
});

/* ------------------------------- the performance contract ------------------------------- */
describe('lazy loading: only the comparison page downloads the full data and its code', () => {
    function count() {
        const loads = { full: 0, page: 0 };
        vi.doMock(FULL, async (importOriginal) => { loads.full += 1; return importOriginal(); });
        vi.doMock(PAGE, async (importOriginal) => { loads.page += 1; return importOriginal(); });
        return loads;
    }

    it('the catalog never requests the full data nor the comparison page, even with 3 projects selected and the tray open', async () => {
        const loads = count();
        mockDataFetch();
        await renderApp('/proyectos', { preloadProjects: false });
        await screen.findByRole('region', { name: 'Resultados' });
        const user = userEvent.setup();
        for (const id of ['proj_001', 'proj_002', 'proj_003']) await user.click(add(id));
        expect(tray()).toBeTruthy();
        await new Promise((resolve) => setTimeout(resolve, 60));
        expect(loads).toEqual({ full: 0, page: 0 });
    });

    it('opening the comparison requests the page once and the full data once', async () => {
        const loads = count();
        mockDataFetch();
        await renderApp('/proyectos', { preloadProjects: false });
        await screen.findByRole('region', { name: 'Resultados' });
        const user = userEvent.setup();
        await user.click(add('proj_001'));
        await user.click(add('proj_002'));
        expect(loads).toEqual({ full: 0, page: 0 });
        await user.click(compareNow());
        await screen.findByRole('heading', { level: 1, name: 'Comparar proyectos' });
        expect(loads).toEqual({ full: 1, page: 1 });
    });

    it('the pointer on «Comparar ahora» starts the download before the click', async () => {
        const loads = count();
        mockDataFetch();
        await renderApp('/proyectos');
        await screen.findByRole('region', { name: 'Resultados' });
        const user = userEvent.setup();
        await user.click(add('proj_001'));
        await user.click(add('proj_002'));
        await user.hover(compareNow());
        await waitFor(() => expect(loads.page).toBe(1));
        expect(window.location.pathname).toBe('/proyectos');
    });
});
