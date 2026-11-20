import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { projects } from '../../src/data/projects/index.js';
import { filterProjects } from '../../src/lib/catalog.js';
import { eventsForProjectUrl, wherePublishUrl } from '../../src/lib/links.js';

const total = projects.length;
const first = projects.find((project) => project.id === 'proj_001');

const results = () => screen.getByRole('region', { name: 'Resultados' });
const heading = () => within(results()).getByRole('heading', { level: 2 }).textContent;
const cards = () => within(results()).queryAllByRole('article');
const activeGroup = () => screen.queryByRole('group', { name: 'Filtros activos' });
const open = async (url = '/proyectos') => {
    mockDataFetch();
    await renderApp(url);
    await screen.findByRole('region', { name: 'Resultados' });
};
const areaBox = (name) => screen.getByRole('checkbox', { name: new RegExp(`^${name} \\d+$`) });
const levelChip = (name) => screen.getByRole('button', { name: new RegExp(`^${name} \\d+$`) });

describe('/proyectos page text', () => {
    it('explains the page under the title and the cards in a legend', async () => {
        await open();
        expect(screen.getByRole('heading', { level: 1, name: 'Explorar proyectos' })).toBeTruthy();
        expect(screen.getByText(/Elige un área, ajusta el nivel y abre un proyecto/)).toBeTruthy();
        const legend = screen.getByRole('complementary', { name: 'Cómo leer las tarjetas' });
        expect(within(legend).getByText('Cómo leer cada tarjeta')).toBeTruthy();
        expect(within(legend).getByText(/Hardware = componentes físicos/)).toBeTruthy();
        expect(within(legend).getByText(/Software = herramientas/)).toBeTruthy();
    });

    it('the filters explain each section with a one-line helper', async () => {
        await open();
        const filters = screen.getByRole('complementary', { name: 'Filtros' });
        expect(within(filters).getByRole('heading', { level: 2, name: 'Filtros' })).toBeTruthy();
        expect(within(filters).getByText(/Combina búsqueda, área, nivel y sector/)).toBeTruthy();
        for (const title of ['Área', 'Nivel de dificultad']) expect(within(filters).getByRole('heading', { level: 3, name: title })).toBeTruthy();
        expect(within(filters).getByLabelText('Buscar')).toBeTruthy();
        expect(within(filters).getByLabelText('Sector de aplicación')).toBeTruthy();
        expect(within(filters).getByText(/Busca en títulos, problemas y tecnologías/)).toBeTruthy();
        expect(within(filters).getByText(/Los puntos van de 1 de 3/)).toBeTruthy();
        expect(within(filters).getByText(/Escribe un sector o elige uno de los \d+ disponibles/)).toBeTruthy();
    });

    it('shows the page count under the results', async () => {
        await open();
        const pages = Math.ceil(total / 12);
        expect(within(screen.getByRole('navigation', { name: 'Paginación' })).getByText(`Página 1 de ${pages} · 12 proyectos por página`)).toBeTruthy();
    });
});

describe('/proyectos cards', () => {
    it('shows the kicker, the title without its prefix, the labelled problem and the readable badges', async () => {
        await open();
        const card = cards()[0];
        expect(within(card).getByText('Proyecto 1')).toBeTruthy();
        const title = within(card).getByRole('heading', { level: 3 });
        expect(title.textContent).not.toMatch(/^Proyecto \d+:/);
        expect(title.textContent).toBe(first.titulo.replace(/^\S+ Proyecto 1:\s*/, ''));
        expect(within(card).getByText('Problema:')).toBeTruthy();
        expect(within(card).getByText(first.area).closest('[data-tip]').getAttribute('data-tip')).toMatch(/^Área:/);
        expect(within(card).getByText(first.sector).closest('[data-tip]').getAttribute('data-tip')).toMatch(/^Sector:/);
        // The level reads as words with a 1-of-3 count, never only as dots.
        const level = within(card).getByText(first.nivel).closest('[data-tip]');
        expect(level.getAttribute('data-tip')).toBe('Nivel 1 de 3: Intermedio');
        expect(level.textContent).toContain('Nivel 1 de 3');
    });

    it('names Hardware, Software and Duración with words and a tooltip', async () => {
        await open();
        const card = cards()[0];
        const meta = within(card).getByRole('list', { name: 'Datos del proyecto' });
        const hw = within(meta).getByText(/^Hardware/).closest('[data-tip]');
        expect(hw.getAttribute('data-tip')).toContain(`Hardware: ${first.hardware.length} componentes físicos`);
        const sw = within(meta).getByText(/^Software/).closest('[data-tip]');
        expect(sw.getAttribute('data-tip')).toContain(`Software: ${first.software.length} herramientas`);
        const duration = within(meta).getByText(first.duracion).closest('[data-tip]');
        expect(duration.getAttribute('data-tip')).toBe(`Duración estimada: ${first.duracion}`);
    });

    it('offers «Ver eventos» and «Dónde publicar» as buttons with the same links as before', async () => {
        await open();
        const card = cards()[0];
        const events = within(card).getByRole('link', { name: /^Ver eventos/ });
        const publish = within(card).getByRole('link', { name: /^Dónde publicar/ });
        expect(events.getAttribute('href')).toBe(eventsForProjectUrl(first.id));
        expect(publish.getAttribute('href')).toBe(wherePublishUrl(first.id));
        expect(events.getAttribute('data-tip')).toMatch(/eventos|Congresos/);
        expect(within(card).getByRole('link', { name: first.titulo.replace(/^\S+ Proyecto 1:\s*/, '') }).getAttribute('href')).toBe(`/proyecto/${first.id}`);
    });
});

describe('/proyectos filters state', () => {
    it('shows no active chips and a neutral heading at first', async () => {
        await open();
        expect(activeGroup()).toBeNull();
        expect(screen.queryByRole('button', { name: 'Limpiar filtros' })).toBeNull();
        expect(heading()).toBe(`${total} proyectos disponibles`);
        expect(cards()).toHaveLength(12);
        expect(within(screen.getByRole('complementary', { name: 'Filtros' })).getByText('Sin filtros activos')).toBeTruthy();
    });

    it('an area shows its chip, the count badge and the result heading, and writes the URL', async () => {
        await open();
        const user = userEvent.setup();
        await user.click(areaBox('SBC-IoT'));
        const expected = filterProjects(projects, { areas: ['SBC-IoT'] }).length;
        await waitFor(() => expect(heading()).toBe(`${expected} proyectos que cumplen tus filtros`));
        expect(window.location.search).toBe('?area=SBC-IoT');
        const group = activeGroup();
        expect(within(group).getByText('Filtros activos:')).toBeTruthy();
        expect(within(group).getByText('Área:')).toBeTruthy();
        expect(within(group).getByRole('button', { name: 'Quitar filtro: Área: SBC-IoT' })).toBeTruthy();
        expect(within(screen.getByRole('complementary', { name: 'Filtros' })).getByText('1 activo')).toBeTruthy();
        expect(areaBox('SBC-IoT').checked).toBe(true);
    });

    it('a level chip is pressed, shows its count and a removable active chip', async () => {
        await open();
        const user = userEvent.setup();
        const expectedCount = projects.filter((project) => project.nivel === 'Avanzado').length;
        expect(levelChip('Avanzado').textContent).toContain(String(expectedCount));
        await user.click(levelChip('Avanzado'));
        await waitFor(() => expect(heading()).toBe(`${expectedCount} proyectos que cumplen tus filtros`));
        expect(levelChip('Avanzado').getAttribute('aria-pressed')).toBe('true');
        expect(levelChip('Intermedio').getAttribute('aria-pressed')).toBe('false');
        expect(window.location.search).toBe('?nivel=Avanzado');
        expect(within(activeGroup()).getByRole('button', { name: 'Quitar filtro: Nivel: Avanzado' })).toBeTruthy();
    });

    it('removing one active chip updates the results and keeps the other filters', async () => {
        await open();
        const user = userEvent.setup();
        await user.click(areaBox('SBC-IoT'));
        await user.click(levelChip('Avanzado'));
        const both = filterProjects(projects, { areas: ['SBC-IoT'], levels: ['Avanzado'] }).length;
        await waitFor(() => expect(heading()).toBe(`${both} proyectos que cumplen tus filtros`));
        expect(window.location.search).toBe('?area=SBC-IoT&nivel=Avanzado');

        await user.click(within(activeGroup()).getByRole('button', { name: 'Quitar filtro: Área: SBC-IoT' }));
        const onlyLevel = filterProjects(projects, { levels: ['Avanzado'] }).length;
        await waitFor(() => expect(heading()).toBe(`${onlyLevel} proyectos que cumplen tus filtros`));
        expect(window.location.search).toBe('?nivel=Avanzado');
        expect(areaBox('SBC-IoT').checked).toBe(false);
        expect(within(activeGroup()).queryByRole('button', { name: /Área: SBC-IoT/ })).toBeNull();
    });

    it('sector and search show chips with their own labels and each one removes only itself', async () => {
        await open();
        const user = userEvent.setup();
        await user.type(screen.getByLabelText('Buscar'), 'invernadero');
        await user.type(screen.getByLabelText('Sector de aplicación'), 'Agricultura');
        const expected = filterProjects(projects, { query: 'invernadero', sector: 'Agricultura' }).length;
        await waitFor(() => expect(heading()).toBe(`${expected} ${expected === 1 ? 'proyecto que cumple' : 'proyectos que cumplen'} tus filtros`));
        const group = activeGroup();
        expect(within(group).getByRole('button', { name: 'Quitar filtro: Sector: Agricultura' })).toBeTruthy();
        expect(within(group).getByRole('button', { name: 'Quitar filtro: Búsqueda: “invernadero”' })).toBeTruthy();

        await user.click(within(group).getByRole('button', { name: 'Quitar filtro: Búsqueda: “invernadero”' }));
        const onlySector = filterProjects(projects, { sector: 'Agricultura' }).length;
        await waitFor(() => expect(heading()).toBe(`${onlySector} proyectos que cumplen tus filtros`));
        expect(screen.getByLabelText('Buscar').value).toBe('');
        expect(screen.getByLabelText('Sector de aplicación').value).toBe('Agricultura');
    });

    it('«Limpiar filtros» removes every filter, keeps the chosen sort and restores the full list', async () => {
        await open('/proyectos?orden=recientes&area=SBC-IoT&nivel=Avanzado&q=riego&sector=Agro');
        const user = userEvent.setup();
        expect(activeGroup()).not.toBeNull();
        await user.click(screen.getByRole('button', { name: 'Limpiar filtros' }));
        await waitFor(() => expect(heading()).toBe(`${total} proyectos disponibles`));
        expect(window.location.search).toBe('?orden=recientes');
        expect(activeGroup()).toBeNull();
        expect(screen.queryByRole('button', { name: 'Limpiar filtros' })).toBeNull();
        expect(screen.getByLabelText('Buscar').value).toBe('');
        expect(within(screen.getByRole('complementary', { name: 'Filtros' })).getByText('Sin filtros activos')).toBeTruthy();
    });

    it('a search without matches reports zero projects, shows the empty state and can be cleared', async () => {
        await open();
        const user = userEvent.setup();
        await user.type(screen.getByLabelText('Buscar'), 'zzzzqqq');
        await waitFor(() => expect(heading()).toBe('0 proyectos que cumplen tus filtros'));
        expect(cards()).toHaveLength(0);
        expect(screen.getByText('No encontramos resultados')).toBeTruthy();
        expect(screen.queryByRole('navigation', { name: 'Paginación' })).toBeNull();
        await user.click(screen.getByRole('button', { name: 'Limpiar filtros' }));
        await waitFor(() => expect(heading()).toBe(`${total} proyectos disponibles`));
        expect(cards()).toHaveLength(12);
        expect(window.location.search).toBe('');
    });

    it('reads the filters from the URL: chips, count badge and the pressed states', async () => {
        await open('/proyectos?nivel=Intermedio&nivel=Avanzado&area=AIoT');
        const group = activeGroup();
        expect(within(group).getAllByRole('button', { name: /^Quitar filtro: / })).toHaveLength(3);
        expect(within(screen.getByRole('complementary', { name: 'Filtros' })).getByText('3 activos')).toBeTruthy();
        expect(levelChip('Intermedio').getAttribute('aria-pressed')).toBe('true');
        expect(levelChip('Intermedio-Avanzado').getAttribute('aria-pressed')).toBe('false');
        const expected = filterProjects(projects, { areas: ['AIoT'], levels: ['Intermedio', 'Avanzado'] }).length;
        expect(heading()).toBe(`${expected} proyectos que cumplen tus filtros`);
    });
});

describe('/proyectos narrow screens', () => {
    it('the filters fold behind a button that reports its state and counts the active filters', async () => {
        await open();
        const user = userEvent.setup();
        const toggle = screen.getByRole('button', { name: /^Filtros/ });
        expect(toggle.getAttribute('aria-expanded')).toBe('false');
        const panel = document.getElementById(toggle.getAttribute('aria-controls'));
        expect(panel).not.toBeNull();
        expect(panel.contains(screen.getByRole('complementary', { name: 'Filtros' }))).toBe(true);

        await user.click(toggle);
        expect(toggle.getAttribute('aria-expanded')).toBe('true');
        await user.click(toggle);
        expect(toggle.getAttribute('aria-expanded')).toBe('false');

        await user.click(levelChip('Avanzado'));
        await waitFor(() => expect(screen.getByRole('button', { name: /^Filtros/ }).textContent).toMatch(/1 activo/));
    });
});

describe('main navigation', () => {
    const current = () => screen.getAllByRole('link').filter((link) => link.getAttribute('aria-current') === 'page').map((link) => link.textContent.trim());

    it('has a «Proyectos» item to /proyectos, marked as the current page there', async () => {
        await open();
        const nav = screen.getByRole('navigation', { name: 'Principal' });
        const item = within(nav).getByRole('link', { name: 'Proyectos' });
        expect(item.getAttribute('href')).toBe('/proyectos');
        expect(item.getAttribute('aria-current')).toBe('page');
        expect(within(nav).getByRole('link', { name: 'Eventos académicos' }).getAttribute('aria-current')).toBeNull();
        expect(within(nav).getByRole('link', { name: 'Dónde publicar' }).getAttribute('aria-current')).toBeNull();
        expect(within(nav).getByRole('link', { name: 'Mis oportunidades' }).getAttribute('aria-current')).toBeNull();
    });

    it('marks Eventos, Dónde publicar and Mis oportunidades on their own pages', async () => {
        mockDataFetch();
        await renderApp('/eventos');
        await screen.findByRole('region', { name: 'Eventos encontrados' });
        expect(current()).toEqual(['Eventos académicos']);
    });

    it('marks «Proyectos» on a project page and nothing in the nav on a page without item', async () => {
        mockDataFetch();
        await renderApp('/proyecto/proj_001');
        await screen.findByRole('heading', { level: 1, name: /Monitoreo Agrícola Distribuido/ });
        expect(current()).toEqual(['Proyectos']);
    });

    it('marks Mis oportunidades', async () => {
        mockDataFetch();
        await renderApp('/oportunidades');
        expect(current()).toEqual(['Mis oportunidades']);
    });
});
