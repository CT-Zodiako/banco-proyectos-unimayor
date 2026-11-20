// T7 of odd/tasks/mejora-visual.md: findings of the keyboard / screen-reader-proxy / Lighthouse audit, one test per
// finding. Markup, focus handling and copy only: filters, URLs, routes and data behave as before.
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { computeAccessibleName } from 'dom-accessibility-api';
import { describe, expect, it, vi } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID, publicarFixture } from './fixtures.js';

const TOUCH_QUERY = '(hover: none), (max-width: 959px)';
// jsdom has no matchMedia: a stub that says the device has no hover (a phone) or does (a desktop).
const stubDevice = (touch) => vi.stubGlobal('matchMedia', (query) => ({
    matches: touch && query === TOUCH_QUERY, media: query, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {},
}));

const open = async (url, name) => {
    mockDataFetch();
    await renderApp(url);
    await screen.findByRole('heading', { level: 1, name });
};
const levelsOf = () => screen.getAllByRole('heading').map((heading) => Number(heading.tagName[1]));
const expectNoSkips = (levels) => levels.forEach((level, index) => {
    if (index > 0) expect(level, `heading ${index + 1} is h${level} after h${levels[index - 1]} in [${levels.join(',')}]`).toBeLessThanOrEqual(levels[index - 1] + 1);
});

describe('journal cards: heading levels', () => {
    it('/donde-publicar?p=… never goes from the h1 to the h3 of a journal', async () => {
        await open(`/donde-publicar?p=${PROJECT_ID}`, /Monitoreo agrícola con MQTT/);
        await screen.findByRole('heading', { level: 3, name: /Journal of Smart Farming/ });
        const levels = levelsOf();
        expect(levels).toContain(3);
        expectNoSkips(levels);
        const results = screen.getByRole('region', { name: 'Revistas sugeridas' });
        expect(within(results).getByRole('heading', { level: 2, name: 'Revistas sugeridas' })).toBeTruthy();
    });

    it('the «Cómo leer esta página» tab does not skip levels either', async () => {
        await open(`/donde-publicar?p=${PROJECT_ID}`, /Monitoreo agrícola con MQTT/);
        await userEvent.setup().click(screen.getByRole('tab', { name: /^Cómo leer esta página/ }));
        const help = screen.getByRole('tabpanel', { name: /^Cómo leer esta página/ });
        expect(within(help).getAllByRole('heading').length).toBeGreaterThan(0);
        expectNoSkips(levelsOf());
        expect(within(help).queryAllByRole('heading', { level: 3 })).toHaveLength(0);
        expect(within(help).getByRole('table', { name: /Cuartil SCImago/ })).toBeTruthy();
    });
});

describe('names that contain the visible text (WCAG 2.5.3)', () => {
    const PAGES = [['/', /Banco de Proyectos/], ['/proyectos', 'Explorar proyectos'], ['/eventos', /eventos académicos/i], [`/donde-publicar?p=${PROJECT_ID}`, /Monitoreo agrícola con MQTT/]];
    const squash = (text) => text.replace(/\s+/g, '').toLowerCase();
    const visibleText = (element) => {
        const copy = element.cloneNode(true);
        copy.querySelectorAll('[aria-hidden="true"], .sr-only, svg').forEach((node) => node.remove());
        return copy.textContent;
    };

    it.each(PAGES)('every link and button of %s names itself with the words it shows', async (url, h1) => {
        await open(url, h1);
        const offenders = [...document.querySelectorAll('a[href], button')]
            .filter((element) => visibleText(element).trim())
            // The event type pills (T6) are named by their label; the count and the one-line description they also show are
            // their accessible description (aria-describedby), which is how a screen reader reads them after the name.
            .filter((element) => !element.hasAttribute('aria-describedby'))
            .filter((element) => !squash(computeAccessibleName(element)).includes(squash(visibleText(element))))
            .map((element) => `"${visibleText(element).trim().slice(0, 40)}" is named "${computeAccessibleName(element)}"`);
        expect(offenders).toEqual([]);
    });

    it('a topic chip is named with its topic, the number it shows and the word for it', async () => {
        await open('/eventos', /eventos académicos/i);
        const chip = screen.getByRole('button', { name: /^IoT 2 eventos$/ });
        expect(chip.textContent.replace(/\s+/g, ' ').trim()).toBe('IoT 2 eventos');
        expect(chip.hasAttribute('aria-label')).toBe(false);
    });

    it('the logo link is named with the institution it shows and says where it goes; the logo image is decorative', async () => {
        await open('/proyectos', 'Explorar proyectos');
        const logo = within(screen.getByRole('banner')).getByRole('link', { name: /Institución Universitaria Colegio Mayor del Cauca.*Ir al inicio/ });
        expect(logo.getAttribute('href')).toBe('/');
        expect(logo.querySelector('img').getAttribute('alt')).toBe('');
        expect(logo.querySelector('img').parentElement.className).toContain('flex-none'); // flex must not squeeze the logo (aspect ratio)
    });
});

describe('/eventos: markup of the filters and the cards', () => {
    it('lays the three filter sections out so that no grid cell stays empty', async () => {
        await open('/eventos', /eventos académicos/i);
        const filters = screen.getByRole('search', { name: 'Filtros de eventos' });
        const dates = within(filters).getByRole('group', { name: 'Fechas' });
        const grid = dates.parentElement;
        expect(grid.contains(within(filters).getByRole('group', { name: 'Búsqueda' }))).toBe(true);
        expect(grid.className).toContain('md:grid-cols-2');
        expect(grid.className).toContain('xl:grid-cols-3');
        expect(dates.className).toContain('md:col-span-2'); // two columns: «Fechas» takes the whole last row
        expect(dates.className).toContain('xl:col-span-1'); // three columns: one cell each
    });

    it('«Ver mapa» is inside the value (dd) of its fact: a dl holds only dt and dd (inside div groups)', async () => {
        await open('/eventos', /eventos académicos/i);
        const map = screen.getAllByRole('link', { name: /^Ver mapa de / })[0];
        expect(map.parentElement.tagName).toBe('DD');
        for (const dl of document.querySelectorAll('article dl')) {
            for (const child of dl.children) {
                const inner = child.tagName === 'DIV' ? [...child.children] : [child];
                inner.forEach((node) => expect(['DT', 'DD'], node.outerHTML.slice(0, 80)).toContain(node.tagName));
            }
        }
    });
});

describe('landmarks and tables with names', () => {
    it('the journal search of a project has a name', async () => {
        await open(`/donde-publicar?p=${PROJECT_ID}`, /Monitoreo agrícola con MQTT/);
        expect(screen.getByRole('search', { name: 'Buscar y ordenar revistas' })).toBeTruthy();
    });

    it('every catalog journal groups its links under its own name instead of being one more navigation landmark', async () => {
        mockDataFetch((path, response) => (path === '/data/publicar-catalog.json' ? { ok: true, status: 200, json: async () => publicarFixture.journals } : response));
        await renderApp('/donde-publicar');
        await screen.findByRole('heading', { level: 3, name: /Journal of Smart Farming/ });
        expect(screen.queryAllByRole('navigation', { name: 'Enlaces de la revista' })).toHaveLength(0);
        expect(screen.getAllByRole('navigation')).toHaveLength(1);
        const group = screen.getByRole('group', { name: 'Enlaces de Journal of Smart Farming' });
        expect(within(group).getByRole('link', { name: 'Sitio de la revista' })).toBeTruthy();
    });
});

describe('tooltips without hover', () => {
    const areaBadge = () => document.querySelector('.badge-area[data-tip]');
    const help = () => screen.getByRole('status', { name: 'Ayuda' });

    it('on a touch device a tap on a badge shows its tip in a status region; a second tap, a tap elsewhere or Esc hides it', async () => {
        stubDevice(true);
        const user = userEvent.setup();
        await open('/proyectos', 'Explorar proyectos');
        expect(help().textContent).toBe('');
        await user.click(areaBadge());
        expect(help().textContent).toBe(areaBadge().getAttribute('data-tip'));
        await user.click(areaBadge());
        expect(help().textContent).toBe('');

        await user.click(areaBadge());
        const level = document.querySelector('.badge-level[data-tip]');
        await user.click(level);
        expect(help().textContent).toBe(level.getAttribute('data-tip'));
        await user.click(screen.getByRole('heading', { level: 1, name: 'Explorar proyectos' }));
        expect(help().textContent).toBe('');

        await user.click(areaBadge());
        expect(help().textContent).not.toBe('');
        await user.keyboard('{Escape}');
        expect(help().textContent).toBe('');
    });

    it('a link or button that carries a tip still just does its job: its visible label is enough and no tip pops up', async () => {
        stubDevice(true);
        const user = userEvent.setup();
        await open('/proyectos', 'Explorar proyectos');
        const link = document.querySelector('a[data-tip]');
        await user.click(link);
        expect(help().textContent).toBe('');
        await waitFor(() => expect(window.location.pathname).not.toBe('/proyectos'));
    });

    it('with a mouse (hover available) nothing changes: the CSS tooltip is the only one and no status text is added', async () => {
        stubDevice(false);
        const user = userEvent.setup();
        await open('/proyectos', 'Explorar proyectos');
        await user.click(areaBadge());
        expect(help().textContent).toBe('');
    });
});

describe('/proyectos: «Proponer proyecto» dialog', () => {
    const openDialog = async () => {
        const user = userEvent.setup();
        await open('/proyectos', 'Explorar proyectos');
        const opener = screen.getByRole('button', { name: 'Proponer proyecto' });
        await user.click(opener);
        // the dialog is a lazy chunk: it appears once its code has downloaded
        return { user, opener, dialog: await screen.findByRole('dialog', { name: 'Proponer proyecto' }) };
    };

    it('is a modal dialog named by its title, with the focus inside and a closing button with a name', async () => {
        const { dialog } = await openDialog();
        expect(dialog.getAttribute('aria-modal')).toBe('true');
        expect(dialog.contains(document.activeElement)).toBe(true);
        expect(within(dialog).getByRole('button', { name: 'Cerrar' })).toBeTruthy();
    });

    it('labels each field', async () => {
        const { dialog } = await openDialog();
        for (const label of ['Título del Proyecto', 'Área / Tecnología', 'Breve Descripción', 'Sector', 'Nivel', 'Duración Est.']) {
            expect(within(dialog).getByLabelText(label), label).toBeTruthy();
        }
    });

    it('keeps the focus inside with Tab and Shift+Tab', async () => {
        const { user, dialog } = await openDialog();
        for (let i = 0; i < 14; i++) {
            await user.tab();
            expect(dialog.contains(document.activeElement), `Tab ${i + 1}`).toBe(true);
        }
        for (let i = 0; i < 14; i++) {
            await user.tab({ shift: true });
            expect(dialog.contains(document.activeElement), `Shift+Tab ${i + 1}`).toBe(true);
        }
    });

    it('closes with Esc and with Cancelar and gives the focus back to «Proponer proyecto»', async () => {
        const { user, opener } = await openDialog();
        await user.keyboard('{Escape}');
        expect(screen.queryByRole('dialog')).toBeNull();
        expect(document.activeElement).toBe(opener);
        await user.click(opener);
        await user.click(await screen.findByRole('button', { name: 'Cancelar' }));
        expect(screen.queryByRole('dialog')).toBeNull();
        expect(document.activeElement).toBe(opener);
    });
});

describe('focus after removing a filter', () => {
    it('/proyectos: removing a chip or clearing the filters leaves the focus on the results heading, not on the page', async () => {
        const user = userEvent.setup();
        mockDataFetch();
        await renderApp('/proyectos?area=SBC-IoT&nivel=Intermedio');
        const results = await screen.findByRole('region', { name: 'Resultados' });
        const heading = within(results).getByRole('heading', { level: 2 });
        await user.click(within(screen.getByRole('group', { name: 'Filtros activos' })).getByRole('button', { name: 'Quitar filtro: Nivel: Intermedio' }));
        expect(document.activeElement).toBe(heading);
        screen.getByRole('button', { name: /Intermedio \d+/ }).focus();
        await user.click(within(screen.getByRole('group', { name: 'Filtros activos' })).getByRole('button', { name: 'Limpiar filtros' }));
        expect(window.location.search).toBe('');
        expect(document.activeElement).toBe(within(screen.getByRole('region', { name: 'Resultados' })).getByRole('heading', { level: 2 }));
    });

    it('/eventos: removing a chip leaves the focus on the results heading', async () => {
        const user = userEvent.setup();
        await open('/eventos?tema=IoT', /eventos académicos/i);
        await user.click(within(screen.getByRole('group', { name: 'Filtros activos' })).getByRole('button', { name: 'Quitar filtro: Tema: IoT' }));
        await waitFor(() => expect(window.location.search).toBe(''));
        expect(document.activeElement).toBe(screen.getByRole('heading', { level: 2, name: /eventos vigentes/ }));
    });
});

describe('/proyectos: the filter column', () => {
    it('on wide screens it is sticky but never taller than the window, and it scrolls inside, so every control can be reached', async () => {
        await open('/proyectos', 'Explorar proyectos');
        const column = document.getElementById('catalog-filters');
        expect(column.className).toContain('min-[960px]:sticky');
        expect(column.className).toContain('min-[960px]:max-h-[calc(100vh-7rem)]');
        expect(column.className).toContain('min-[960px]:overflow-y-auto');
    });
});
