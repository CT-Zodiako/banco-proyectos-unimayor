// T3 of odd/tasks/mejora-visual.md: the visual language of /proyectos (sections with helpers, chips, badges, one
// primary action, compact data line) applied to /eventos and /donde-publicar. Markup and copy only: the filters,
// URLs and data behave as in filters.test.jsx.
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import EventCard from '../../src/components/eventos/EventCard.jsx';
import { affinityWord } from '../../src/lib/publicar/table.js';
import { localIsoDate } from '../../src/lib/eventos/filters.js';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID } from './fixtures.js';

const openEventos = async (url = '/eventos') => {
    mockDataFetch();
    await renderApp(url);
    await screen.findByRole('region', { name: 'Eventos encontrados' });
};
const cardOf = (title) => within(screen.getByRole('region', { name: 'Eventos encontrados' })).getAllByRole('article')
    .find((article) => within(article).getByRole('heading', { level: 2 }).textContent === title);

describe('/eventos: data status', () => {
    it('is one compact line with the update date and expands to the full text with <details>', async () => {
        await openEventos();
        const status = screen.getByRole('region', { name: 'Estado de los datos' });
        const details = status.querySelector('details');
        expect(details).toBeTruthy();
        expect(details.open).toBe(false);
        const summary = details.querySelector('summary');
        expect(summary.textContent).toContain('Datos actualizados el 10 nov 2026');
        expect(summary.textContent).toContain('Más información');
        expect(status.textContent).toContain('Listado generado el 10 nov 2026.');
        expect(status.textContent).toContain('WikiCFP, ccf-deadlines y Devpost');
        expect(status.textContent).toContain('Confirme fechas y sede en el sitio oficial.');

        await userEvent.setup().click(summary);
        expect(details.open).toBe(true);
    });
});

describe('/eventos: filters grouped in labeled sections', () => {
    it('explains each section with a one-line helper and keeps the two date controls with a visible label (Spanish dd/mm/aaaa text fields, T8)', async () => {
        await openEventos();
        const filters = screen.getByRole('search', { name: 'Filtros de eventos' });
        expect(within(filters).getByRole('heading', { level: 2, name: 'Filtros' })).toBeTruthy();
        for (const name of ['Tipo de evento', 'Búsqueda', 'Modalidad y ubicación', 'Fechas', 'Temas']) {
            expect(within(filters).getByRole('group', { name }), name).toBeTruthy();
        }
        expect(within(filters).getByText(/Elige entre convocatorias para presentar tu trabajo y eventos para asistir/)).toBeTruthy();
        expect(within(filters).getByText(/Se filtra por la fecha de inicio del evento/)).toBeTruthy();
        expect(within(filters).getByText(/Elige uno o varios temas/)).toBeTruthy();

        for (const [label, id] of [['Inicio desde', 'date-from'], ['Inicio hasta', 'date-to']]) {
            const input = within(filters).getByLabelText(label);
            expect(input.type).toBe('text');
            expect(input.id).toBe(id);
            const labelEl = filters.querySelector(`label[for="${id}"]`);
            expect(labelEl.classList.contains('sr-only')).toBe(false); // visible, not hidden
        }
        const search = within(filters).getByRole('searchbox', { name: 'Buscar por nombre o lugar' });
        expect(filters.querySelector('label[for="search"]').classList.contains('sr-only')).toBe(false);
        expect(search).toBeTruthy();
        expect(within(filters).getByLabelText('Modalidad')).toBeTruthy();
        expect(within(filters).getByRole('checkbox', { name: 'Solo Colombia' })).toBeTruthy();
        expect(within(filters).getByLabelText('Ciudad o país')).toBeTruthy();
        expect(within(filters).getByLabelText('Ordenar por')).toBeTruthy();
    });

    it('the date inputs still filter by start date and write the URL', async () => {
        await openEventos();
        fireEvent.change(screen.getByLabelText('Inicio desde'), { target: { value: '01/07/2099' } });
        await waitFor(() => expect(window.location.search).toBe('?desde=2099-07-01'));
        const titles = within(screen.getByRole('region', { name: 'Eventos encontrados' })).getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
        expect(titles.sort()).toEqual(['Feria IoT y Robótica 2099', 'Simposio de Ciberseguridad 2099']);
    });

    it('topic pills are shared .chip buttons with aria-pressed and a readable count', async () => {
        await openEventos();
        const user = userEvent.setup();
        const iot = screen.getByRole('button', { name: /^IoT 2 eventos$/ });
        expect(iot.classList.contains('chip')).toBe(true);
        expect(iot.getAttribute('aria-pressed')).toBe('false');
        expect(iot.textContent).toContain('IoT');
        expect(iot.querySelector('.chip-count').textContent).toBe('2');
        await user.click(iot);
        await waitFor(() => expect(screen.getByRole('button', { name: /^IoT 2 eventos$/ }).getAttribute('aria-pressed')).toBe('true'));
    });
});

describe('/eventos: active filters', () => {
    it('shows chips for each applied filter with a button that removes only that one, and «Limpiar filtros»', async () => {
        await openEventos();
        const user = userEvent.setup();
        expect(screen.queryByRole('group', { name: 'Filtros activos' })).toBeNull();
        expect(screen.getByText('Sin filtros activos')).toBeTruthy();

        await user.click(screen.getByRole('button', { name: 'Convocatorias (presentar)' }));
        await user.click(screen.getByRole('button', { name: /^IoT \d+ eventos?$/ }));
        await waitFor(() => expect(window.location.search).toBe('?kind=cfp&tema=IoT'));
        const active = screen.getByRole('group', { name: 'Filtros activos' });
        expect(within(active).getByText('Convocatorias (presentar)')).toBeTruthy();
        expect(within(active).getByText('IoT')).toBeTruthy();
        expect(screen.getByText('2 activos')).toBeTruthy();
        expect(screen.getByRole('heading', { level: 2, name: '1 evento vigente' })).toBeTruthy();

        await user.click(within(active).getByRole('button', { name: 'Quitar filtro: Tipo: Convocatorias (presentar)' }));
        await waitFor(() => expect(window.location.search).toBe('?tema=IoT'));
        expect(screen.getByText('1 activo')).toBeTruthy();

        await user.click(within(screen.getByRole('group', { name: 'Filtros activos' })).getByRole('button', { name: 'Limpiar filtros' }));
        await waitFor(() => expect(window.location.search).toBe(''));
        expect(screen.queryByRole('group', { name: 'Filtros activos' })).toBeNull();
        expect(screen.getByRole('heading', { level: 2, name: '4 eventos vigentes' })).toBeTruthy();
    });

    it('a chip for a date filter names the group and shows the formatted date', async () => {
        await openEventos('/eventos?desde=2099-07-01');
        const active = screen.getByRole('group', { name: 'Filtros activos' });
        expect(within(active).getByText('Inicio desde:')).toBeTruthy();
        expect(within(active).getByText('01/07/2099')).toBeTruthy();
        await userEvent.setup().click(within(active).getByRole('button', { name: 'Quitar filtro: Inicio desde: 01/07/2099' }));
        await waitFor(() => expect(window.location.search).toBe(''));
    });
});

describe('/eventos: event card', () => {
    it('has badges, labeled facts with icons, one primary action and the secondary Guardar / Comparar', async () => {
        await openEventos();
        const user = userEvent.setup();
        const card = cardOf('Congreso IoT Cauca 2099');
        const badges = card.querySelectorAll('.badge');
        expect([...badges].map((badge) => badge.textContent)).toContain('Convocatoria');
        for (const label of ['Fechas', 'Lugar', 'Cierre de envíos']) expect(within(card).getByText(label)).toBeTruthy();
        expect(card.querySelectorAll('dl svg').length).toBeGreaterThanOrEqual(3);
        expect(within(card).getByText('Popayán, Colombia')).toBeTruthy();

        const primary = within(card).getByRole('link', { name: /^Ver convocatoria: Congreso IoT Cauca 2099/ });
        expect(primary.classList.contains('btn-events')).toBe(true); // T13: the events hue replaces the blue primary
        expect(primary.getAttribute('href')).toBe('https://example.org/iot-cauca');
        expect(primary.textContent).toBe('Ver convocatoria');

        const save = within(card).getByRole('button', { name: 'Guardar Congreso IoT Cauca 2099 en mis oportunidades' });
        const compare = within(card).getByRole('button', { name: 'Comparar: Congreso IoT Cauca 2099' });
        expect(save.classList.contains('btn-secondary')).toBe(true);
        expect(compare.classList.contains('btn-secondary')).toBe(true);
        expect(compare.getAttribute('aria-pressed')).toBe('false');
        await user.click(compare);
        expect(within(card).getByRole('button', { name: 'Comparar: Congreso IoT Cauca 2099' }).getAttribute('aria-pressed')).toBe('true');
        expect(compare.textContent).toBe('Comparar'); // T23: the visible label does not change with the state
        await user.click(save);
        expect(within(card).getByRole('button', { name: 'Guardar Congreso IoT Cauca 2099 en mis oportunidades' }).textContent).not.toBe('No se pudo guardar');
    });

    it('replaces the repeated «Ubicación publicada» block with a compact «Ver mapa» that still opens the map', async () => {
        await openEventos();
        expect(screen.queryByText('Ubicación publicada')).toBeNull();
        expect(screen.queryByText('Ver mapa ampliado')).toBeNull();
        expect(screen.queryByText(/El mapa se basa en el lugar publicado/)).toBeNull();
        const card = cardOf('Congreso IoT Cauca 2099');
        const map = within(card).getByRole('link', { name: 'Ver mapa de Popayán, Colombia en Google Maps (se abre en una pestaña nueva)' });
        expect(map.textContent).toBe('Ver mapa');
        expect(map.classList.contains('btn-tertiary')).toBe(true);
        expect(map.getAttribute('target')).toBe('_blank');
        expect(map.getAttribute('rel')).toBe('noopener noreferrer');
        const url = new URL(map.getAttribute('href'));
        expect(url.origin + url.pathname).toBe('https://www.google.com/maps/search/');
        expect(url.searchParams.get('query')).toBe('Popayán, Colombia');
        expect(map.getAttribute('data-tip')).toMatch(/confirme la sede en la fuente oficial/);
        // every card with a published place reaches its own map
        const lima = within(cardOf('Simposio de Ciberseguridad 2099')).getByRole('link', { name: /^Ver mapa de Lima, Perú/ });
        expect(new URL(lima.getAttribute('href')).searchParams.get('query')).toBe('Lima, Perú');
    });

    it('shows the attention badge only when the event closes soon', () => {
        const today = localIsoDate(new Date());
        const base = { id: 'e', title: 'Evento', name: 'Evento', kind: 'cfp', start: '2099-05-10', end: '2099-05-12', location: 'Popayán, Colombia', online: false, url: 'https://example.org/e', source: 'wikicfp', topics: ['IoT'] };
        const attention = (deadline) => {
            const { container, unmount } = render(<EventCard event={{ ...base, deadline }} today={today} selected={false} compareFull={false} onToggleCompare={() => {}} />);
            const found = [...container.querySelectorAll('.badge-attn')].map((badge) => badge.textContent);
            unmount();
            return found;
        };
        expect(attention(today)).toEqual(['cierra hoy']);
        expect(attention('2099-01-01')).toEqual([]);
        expect(attention(null)).toEqual([]);
    });

    it('with a project, the affinity is a ring plus the words alta, media or baja, and a link to see why', async () => {
        await openEventos(`/eventos?p=${PROJECT_ID}`);
        const card = cardOf('Congreso IoT Cauca 2099');
        const ring = within(card).getByRole('img', { name: /^Afinidad estimada \d+ %$/ });
        expect(ring.classList.contains('aff-ring')).toBe(true);
        expect(within(card).getByText(/^Afinidad (alta|media|baja)$/)).toBeTruthy();
        const summary = card.querySelector('summary');
        expect(summary.textContent).toMatch(/^Ver por qué \d+ % de afinidad$/);
        expect(card.textContent).not.toContain('¿Por qué');
        await userEvent.setup().click(summary);
        expect(within(card).getByText('Temas en común')).toBeTruthy();
    });
});

describe('/donde-publicar: data status', () => {
    const open = async () => {
        mockDataFetch();
        await renderApp(`/donde-publicar?p=${PROJECT_ID}`);
        await screen.findByRole('region', { name: 'Revistas sugeridas' });
    };

    it('is one compact line with the update date and expands to the full text with <details>', async () => {
        await open();
        const status = screen.getByRole('region', { name: 'Estado de los datos' });
        const details = status.querySelector('details');
        expect(details.open).toBe(false);
        const summary = details.querySelector('summary');
        expect(summary.textContent).toContain('Datos actualizados el 10 nov 2026');
        expect(summary.textContent).toContain('DOAJ y SCImago');
        expect(summary.textContent).toContain('Más información');
        expect(status.textContent).toContain('Catálogo generado el 2026-11-10. DOAJ: 2026-11-10 · SCImago: edición 2025.');
        expect(status.textContent).toContain('Confirme costos, requisitos y cuartil en las fuentes oficiales.');
        await userEvent.setup().click(summary);
        expect(details.open).toBe(true);
    });

    it('the toolbar labels each control, switches Lista / Tabla with aria-pressed and counts the custom filters', async () => {
        await open();
        const user = userEvent.setup();
        const toolbar = screen.getByRole('search');
        expect(toolbar.querySelector('label[for="publicar-table-search"]').classList.contains('sr-only')).toBe(false);
        expect(within(toolbar).getByRole('searchbox', { name: 'Buscar revistas' })).toBeTruthy();
        expect(within(toolbar).getByLabelText('Ordenar por')).toBeTruthy();
        const view = within(toolbar).getByRole('group', { name: 'Vista de resultados' });
        const list = within(view).getByRole('button', { name: 'Lista' });
        const table = within(view).getByRole('button', { name: 'Tabla' });
        expect(list.getAttribute('aria-pressed')).toBe('true');
        expect(table.getAttribute('aria-pressed')).toBe('false');
        expect(view.classList.contains('seg')).toBe(true);
        expect(screen.queryByRole('table')).toBeNull();

        await user.click(table);
        expect(table.getAttribute('aria-pressed')).toBe('true');
        expect(list.getAttribute('aria-pressed')).toBe('false');
        expect(await screen.findByRole('table')).toBeTruthy();
        await user.click(list);
        expect(list.getAttribute('aria-pressed')).toBe('true');
        expect(screen.queryByRole('table')).toBeNull();

        const filtersButton = within(toolbar).getByRole('button', { name: /Filtros personalizados/ });
        expect(filtersButton.querySelector('.count-badge')).toBeNull();
        await user.click(filtersButton);
        const panel = await screen.findByRole('complementary', { name: 'Filtros personalizados' });
        await user.click(within(panel).getByRole('button', { name: 'Q1 · A1' }));
        await waitFor(() => expect(within(toolbar).getByRole('button', { name: /Filtros personalizados/ }).querySelector('.count-badge').textContent).toBe('1'));
    });

    it('a one-line legend above the results explains the affinity words and the quartile', async () => {
        await open();
        const legend = screen.getByRole('complementary', { name: 'Cómo leer los resultados' });
        for (const text of [/Afinidad/, /alta/, /media/, /baja/, /Q1/, /mejor cuartil/]) expect(legend.textContent, String(text)).toMatch(text);
        const results = screen.getByRole('region', { name: 'Revistas sugeridas' });
        expect(legend.compareDocumentPosition(within(results).getAllByRole('article')[0]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it('a result row shows the affinity as a ring with its word, a readable quartile badge and the actions', async () => {
        await open();
        const user = userEvent.setup();
        const results = screen.getByRole('region', { name: 'Revistas sugeridas' });
        const row = within(results).getAllByRole('article').find((article) => within(article).getByRole('heading', { level: 3 }).textContent.startsWith('Journal of Smart Farming'));

        const ring = within(row).getByRole('img', { name: /^Afinidad estimada \d+ %$/ });
        const total = Number(ring.getAttribute('aria-label').match(/\d+/)[0]);
        expect(ring.classList.contains('aff-ring')).toBe(true);
        expect(within(row).getByText(`Afinidad ${affinityWord(total)}`)).toBeTruthy();
        const summary = row.querySelector('summary');
        expect(summary.textContent).toMatch(new RegExp(`^Ver por qué ${total} % de afinidad`));
        expect(row.textContent).not.toContain('¿Por qué');

        const quartile = row.querySelector('.qb');
        expect(quartile.textContent).toContain('Q1');
        expect(quartile.textContent).toContain('A1');
        expect(quartile.getAttribute('data-tip')).toBe('Q1 · mejor cuartil en SCImago · Publindex A1');
        expect(row.querySelector('.bg-\\[\\#c27c0e\\]')).toBeNull();

        const instructions = within(row).getByRole('link', { name: 'Instrucciones para autores' });
        expect(instructions.classList.contains('btn-journals')).toBe(true); // T13: the journals hue replaces the blue primary
        const save = within(row).getByRole('button', { name: 'Guardar Journal of Smart Farming en mis oportunidades' });
        expect(save.classList.contains('btn-secondary')).toBe(true);
        const more = within(row).getByRole('group', { name: 'Más información' });
        expect(more.textContent).toContain('Más información');
        for (const name of ['Alcance', 'Sitio', 'DOAJ', 'SCImago']) {
            const link = within(more).getByRole('link', { name });
            expect(link.classList.contains('btn-tertiary')).toBe(true);
            expect(link.getAttribute('target')).toBe('_blank');
        }
        expect(within(more).getByRole('link', { name: 'Alcance' }).getAttribute('href')).toBe('https://example.org/j-farming/alcance');

        await user.click(summary);
        expect(within(row).getByText(/^Cumple \(/)).toBeTruthy();
    });

    it('no quartile uses the old colors, white text on #c27c0e (3.40:1) among them', async () => {
        await open();
        const html = document.body.innerHTML;
        for (const color of ['c27c0e', '1b7f3b', '2f6fd0', '8a5a9e']) expect(html.toLowerCase()).not.toContain(color);
        const results = screen.getByRole('region', { name: 'Revistas sugeridas' });
        const badges = [...results.querySelectorAll('article .qb')].map((badge) => badge.textContent.slice(0, 2));
        expect(new Set(badges)).toEqual(new Set(['Q1', 'Q3', 'Q4']));
    });

    it('the table view also says the affinity with a word', async () => {
        await open();
        await userEvent.setup().click(screen.getByRole('button', { name: 'Tabla' }));
        const table = await screen.findByRole('table');
        const rows = within(table).getAllByRole('row').slice(1);
        for (const row of rows) expect(within(row).getByText(/^(alta|media|baja)$/)).toBeTruthy();
        expect(within(table).getAllByText(/^Q[1-4]/, { selector: '.qb' }).length).toBe(rows.length);
    });
});
