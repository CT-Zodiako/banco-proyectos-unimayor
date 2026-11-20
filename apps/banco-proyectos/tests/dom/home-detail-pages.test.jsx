import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID } from './fixtures.js';
import { projects } from '../../src/data/projects/index.js';
import { buildAreaFacets, areaTags } from '../../src/lib/catalog.js';
import { STORAGE_KEY } from '../../src/lib/opportunities.js';
import { eventsForProjectUrl, wherePublishUrl, EVENTS_URL, PUBLISH_URL } from '../../src/lib/links.js';

const project = projects.find((p) => p.id === PROJECT_ID);
const open = async (url) => {
    mockDataFetch();
    await renderApp(url);
};

describe('Home: tools and metrics', () => {
    it('offers one entry card per main tool with a one-line description and the right link', async () => {
        await open('/');
        const tools = await screen.findByRole('region', { name: '¿Qué quieres hacer?' });
        const cards = within(tools).getAllByRole('article');
        expect(cards).toHaveLength(3);
        const expected = [
            ['Explorar proyectos', '/proyectos', /Filtra por área, nivel y sector/, 'btn btn-primary'],
            ['Buscar eventos', EVENTS_URL, /Congresos y convocatorias/, 'btn btn-events'], // T13: own hue instead of btn-secondary
            ['Dónde publicar', PUBLISH_URL, /Revistas de acceso abierto/, 'btn btn-journals'],
        ];
        expected.forEach(([name, href, description, classes], index) => {
            const link = within(cards[index]).getByRole('link', { name });
            expect(link.getAttribute('href')).toBe(href);
            for (const cls of classes.split(' ')) expect(link.className).toContain(cls);
            expect(within(cards[index]).getByText(description)).toBeTruthy();
            expect(within(cards[index]).getByRole('heading', { level: 3 })).toBeTruthy();
        });
    });

    it('labels four different metrics with numbers derived from the data', async () => {
        await open('/');
        const list = await screen.findByRole('list', { name: 'Cifras del banco' });
        const areas = new Set(projects.flatMap(areaTags));
        const sectors = new Set(projects.map((p) => p.sector).filter(Boolean));
        const newAreas = buildAreaFacets(projects).flatMap((f) => f.areas).filter((a) => a.isNew).length;
        const values = within(list).getAllByRole('listitem').map((li) => [li.querySelector('[data-metric-label]').textContent, li.querySelector('[data-metric-value]').textContent]);
        expect(values).toEqual([
            ['Proyectos', String(projects.length)],
            ['Áreas tecnológicas', String(areas.size)],
            ['Sectores de aplicación', String(sectors.size)],
            ['Áreas nuevas este semestre', String(newAreas)],
        ]);
        expect(newAreas).toBeGreaterThan(0);
        expect(screen.queryByText('Proyectos Encontrados')).toBeNull();
        expect(screen.queryByText('Proyectos Totales')).toBeNull();
        within(list).getAllByRole('listitem').forEach((li) => expect(li.querySelector('[data-metric-help]').textContent.length).toBeGreaterThan(10));
    });

    it('keeps the hero call to action to the catalog', async () => {
        await open('/');
        const hero = await screen.findByRole('heading', { level: 1, name: /Banco de Proyectos/ });
        const link = within(hero.closest('section')).getByRole('link', { name: 'Ver Catálogo de Proyectos' });
        expect(link.getAttribute('href')).toBe('/proyectos');
    });
});

describe('ProjectDetail: sections, metrics and actions', () => {
    it('shows area, sector and level as badges with the same meaning as the cards', async () => {
        await open(`/proyecto/${PROJECT_ID}`);
        const h1 = await screen.findByRole('heading', { level: 1 });
        const badges = within(h1.closest('header'));
        expect(badges.getByText(project.area).closest('.badge').className).toContain('badge-area');
        expect(badges.getByText(project.sector).closest('.badge').className).toContain('badge-sector');
        const level = badges.getByText(project.nivel).closest('.badge');
        expect(level.className).toContain('badge-level');
        expect(level.querySelectorAll('.level-dots > i')).toHaveLength(3);
        expect(level.textContent).toMatch(/Nivel \d de 3/);
    });

    it('names each section and says in one line what it is for', async () => {
        await open(`/proyecto/${PROJECT_ID}`);
        await screen.findByRole('heading', { level: 1 });
        const sections = [
            ['Hardware necesario', /Componentes físicos/],
            ['Software y plataformas', /Herramientas, lenguajes y plataformas/],
            ['Pasos de implementación', /orden sugerido/],
            ['Objetivos', /Qué busca lograr/],
            ['Impacto real', /Dónde puede aplicarse/],
        ];
        for (const [name, helper] of sections) {
            const heading = screen.getByRole('heading', { level: 2, name });
            const section = heading.closest('section');
            expect(section.getAttribute('aria-labelledby')).toBe(heading.id);
            expect(within(section).getByText(helper)).toBeTruthy();
        }
    });

    it('lists hardware, software, duration and budget with a label, icon and tooltip', async () => {
        await open(`/proyecto/${PROJECT_ID}`);
        await screen.findByRole('heading', { level: 1 });
        const list = screen.getByRole('list', { name: 'Datos del proyecto' });
        const items = within(list).getAllByRole('listitem');
        expect(items.map((li) => li.querySelector('[data-metric-label]').textContent)).toEqual(['Hardware', 'Software', 'Duración', 'Presupuesto']);
        expect(items.map((li) => li.querySelector('[data-metric-value]').textContent)).toEqual([
            `${project.hardware.length} ${project.hardware.length === 1 ? 'componente' : 'componentes'}`,
            `${project.software.length} ${project.software.length === 1 ? 'herramienta' : 'herramientas'}`,
            project.duracion,
            project.presupuesto,
        ]);
        items.forEach((li) => {
            expect(li.querySelector('svg')).toBeTruthy();
            expect(li.getAttribute('data-tip').length).toBeGreaterThan(10);
        });
        expect(items[0].getAttribute('data-tip')).toMatch(/Hardware: .*componentes físicos \(placas, sensores, actuadores\)/);
        expect(items[1].getAttribute('data-tip')).toMatch(/Software: .*\(lenguajes, plataformas, librerías\)/);
    });

    it('has the panel buttons and the page links in the hue of their tool', async () => {
        await open(`/proyecto/${PROJECT_ID}`);
        await screen.findByRole('heading', { level: 1 });
        // T13: the two panel buttons take the hue of their tool (journals teal, events purple) instead of the blue primary.
        for (const [name, hue] of [['Ver las revistas aquí', 'btn-journals'], ['Ver los eventos aquí', 'btn-events']]) {
            expect(screen.getByRole('button', { name }).className).toContain(hue);
        }
        const events = screen.getAllByRole('link', { name: '¿A qué eventos ir?' });
        const publish = screen.getAllByRole('link', { name: '¿Dónde publicar este proyecto?' });
        expect(events).toHaveLength(1);
        expect(publish).toHaveLength(1);
        expect(events[0].getAttribute('href')).toBe(eventsForProjectUrl(PROJECT_ID));
        expect(publish[0].getAttribute('href')).toBe(wherePublishUrl(PROJECT_ID));
        expect(events[0].className).toContain('btn-events'); // T13: the two page links wear their tool's hue too
        expect(publish[0].className).toContain('btn-journals');
        expect(screen.getByRole('link', { name: /Volver a la lista/ }).getAttribute('href')).toMatch(/^\/proyectos/);
    });

    it('opens the panel from the primary action as before', async () => {
        const user = userEvent.setup();
        await open(`/proyecto/${PROJECT_ID}`);
        await user.click(await screen.findByRole('button', { name: 'Ver los eventos aquí' }));
        expect(await screen.findByRole('dialog', { name: /Monitoreo Agrícola Distribuido/ })).toBeTruthy();
        expect(window.location.search).toBe('?panel=eventos');
    });
});

describe('Opportunities: fields and buttons', () => {
    const seed = () => window.localStorage.setItem(STORAGE_KEY, JSON.stringify([
        { type: 'event', id: 'e1', title: 'Congreso IoT', url: 'https://example.org/e1', start: '2099-05-10', status: 'review', note: '' },
    ]));

    it('uses the shared button and field classes with visible labels and helper text', async () => {
        seed();
        await open('/oportunidades');
        await screen.findByRole('heading', { level: 1, name: 'Mis oportunidades' });
        expect(screen.getByRole('button', { name: 'Exportar respaldo' }).className).toContain('btn btn-primary');
        expect(screen.getByLabelText('Filtrar por estado').className).toContain('field-select');
        expect(screen.getByLabelText('Estado').className).toContain('field-select');
        expect(screen.getByLabelText('Nota personal').className).toContain('field-textarea');
        expect(screen.getByRole('button', { name: 'Guardar cambios' }).className).toContain('btn btn-primary');
        for (const label of ['Filtrar por estado', 'Estado', 'Nota personal', 'Seleccionar respaldo para importar']) {
            const field = screen.getByLabelText(label);
            expect(field.labels[0].className).toContain('field-label');
            expect(document.getElementById(field.getAttribute('aria-describedby')).className).toContain('field-hint');
        }
    });

    it('still saves a status and note to the browser storage', async () => {
        seed();
        const user = userEvent.setup();
        await open('/oportunidades');
        await user.selectOptions(await screen.findByLabelText('Estado'), 'preparing');
        await user.type(screen.getByLabelText('Nota personal'), 'Pedir carta');
        await user.click(screen.getByRole('button', { name: 'Guardar cambios' }));
        expect(await screen.findByText('Cambios guardados en este navegador.')).toBeTruthy();
        expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY))[0]).toMatchObject({ status: 'preparing', note: 'Pedir carta' });
    });

    it('marks removal and calendar actions as links styled by the shared class', async () => {
        seed();
        await open('/oportunidades');
        for (const name of ['Quitar', 'Agregar evento al calendario']) {
            expect((await screen.findByRole('button', { name })).className).toContain('link-action');
        }
        expect(screen.getByRole('link', { name: /Fuente oficial/ }).className).toContain('link-action');
    });
});

describe('About and Contact', () => {
    it('About groups its content under h2 headings and keeps the text readable', async () => {
        await open('/acerca');
        await screen.findByRole('heading', { level: 1, name: 'Sobre el Banco de Proyectos' });
        expect(within(screen.getByRole('main')).getAllByRole('heading', { level: 2 }).map((h) => h.textContent)).toEqual([
            'Nuestra Misión', 'Calidad Académica', 'Institución Universitaria Colegio Mayor del Cauca',
        ]);
        expect(document.querySelector('main [class*="opacity-"]')).toBeNull();
    });

    it('Contact lists place, e-mail, phone and hours under h2 headings, none in low-contrast gray', async () => {
        await open('/contacto');
        await screen.findByRole('heading', { level: 1, name: 'Contacto' });
        expect(within(screen.getByRole('main')).getAllByRole('heading', { level: 2 }).map((h) => h.textContent)).toEqual([
            'Ubicación', 'Correo Electrónico', 'Teléfono', 'Horarios de Atención',
        ]);
        const main = within(screen.getByRole('main'));
        expect(main.getByText('sdionizio@unimayor.edu.co')).toBeTruthy();
        expect(main.getByText('(+57) 602 824 1109')).toBeTruthy();
        expect(document.querySelector('main .text-gray-400, main .text-gray-500')).toBeNull();
    });
});
