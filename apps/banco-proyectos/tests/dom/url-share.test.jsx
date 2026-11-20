// T9 of odd/tasks/mejora-visual.md: filters live in the URL (catalog, Eventos, journal finder) and every one of those
// pages has a «Compartir esta búsqueda» button that copies the current address. Existing params keep their meaning.
import { cleanup, fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID } from './fixtures.js';
import { projects } from '../../src/data/projects/index.js';
import { areaTags, filterProjects } from '../../src/lib/catalog.js';

const SHARE = 'Compartir esta búsqueda';
const COPIED = 'Enlace copiado';
const FAILED = 'No se pudo copiar. Copia la dirección del navegador.';

const setClipboard = (value) => Object.defineProperty(navigator, 'clipboard', { value, configurable: true, writable: true });
afterEach(() => {
    Reflect.deleteProperty(navigator, 'clipboard');
    Reflect.deleteProperty(document, 'execCommand');
});

const shareButton = () => screen.getByRole('button', { name: SHARE });
const params = () => new URLSearchParams(window.location.search);

// Same URL loaded in a fresh app (what opening a shared link does).
const reopen = async (url, ready) => {
    cleanup();
    mockDataFetch();
    await renderApp(url);
    await ready();
};

/* ---------------------------------- /proyectos ---------------------------------- */
const catalogReady = () => screen.findByRole('region', { name: 'Resultados' });
const catalogHeading = () => within(screen.getByRole('region', { name: 'Resultados' })).getByRole('heading', { level: 2 }).textContent;
const catalogCards = () => within(screen.getByRole('region', { name: 'Resultados' })).queryAllByRole('article').map((card) => card.textContent);
const chipTexts = () => Array.from(screen.getByRole('group', { name: 'Filtros activos' }).querySelectorAll('.filter-chip')).map((chip) => chip.textContent);
const openCatalog = async (url = '/proyectos') => { mockDataFetch(); await renderApp(url); await catalogReady(); };

describe('/proyectos: filters in the URL', () => {
    it('area + level + search written through the UI end up in the URL, and the same URL restores them', async () => {
        await openCatalog();
        const user = userEvent.setup();
        await user.click(screen.getByRole('checkbox', { name: /^SBC-IoT \d+$/ }));
        await user.click(screen.getByRole('button', { name: /^Avanzado \d+$/ }));
        await user.type(screen.getByLabelText('Buscar'), 'sensor');
        await waitFor(() => expect(params().get('q')).toBe('sensor'));
        expect(params().getAll('area')).toEqual(['SBC-IoT']);
        expect(params().getAll('nivel')).toEqual(['Avanzado']);
        const expected = filterProjects(projects, { areas: ['SBC-IoT'], levels: ['Avanzado'], query: 'sensor' }).length;
        expect(catalogHeading()).toContain(`${expected} `);
        const heading = catalogHeading();
        const cards = catalogCards();
        const chips = chipTexts();

        await reopen(`/proyectos${window.location.search}`, catalogReady);
        expect(catalogHeading()).toBe(heading);
        expect(catalogCards()).toEqual(cards);
        expect(chipTexts()).toEqual(chips);
        expect(screen.getByLabelText('Buscar').value).toBe('sensor');
        expect(screen.getByRole('checkbox', { name: /^SBC-IoT \d+$/ }).checked).toBe(true);
        expect(screen.getByRole('button', { name: /^Avanzado \d+$/ }).getAttribute('aria-pressed')).toBe('true');
    });

    it('sector, sort and page are in the URL and come back from it', async () => {
        const first = projects.find((project) => project.sector);
        const url = `/proyectos?sector=${encodeURIComponent(first.sector)}&orden=recientes&pagina=1`;
        await openCatalog(url);
        const expected = filterProjects(projects, { sector: first.sector }).length;
        expect(catalogHeading()).toContain(`${expected} `);
        expect(screen.getByLabelText('Ordenar por').value).toBe('recientes');
        expect(chipTexts().join(' ')).toContain(first.sector);
    });

    it('an old link with repeated area params and a page keeps loading the same results', async () => {
        const other = projects.flatMap(areaTags).find((area) => area !== 'SBC-IoT');
        const search = `?area=SBC-IoT&area=${encodeURIComponent(other)}&nivel=Avanzado`;
        await openCatalog(`/proyectos${search}`);
        const expected = filterProjects(projects, { areas: ['SBC-IoT', other], levels: ['Avanzado'] }).length;
        expect(catalogHeading()).toContain(`${expected} `);
        expect(screen.getByRole('checkbox', { name: /^SBC-IoT \d+$/ }).checked).toBe(true);
        expect(screen.getByRole('checkbox', { name: new RegExp(`^${other.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\d+$`) }).checked).toBe(true);
        expect(window.location.search).toBe(search);
    });
});

describe('/proyectos: «Compartir esta búsqueda»', () => {
    it('is a secondary button with an icon and the label, also with no filters, and copies the exact current href', async () => {
        await openCatalog();
        const writeText = vi.fn().mockResolvedValue();
        setClipboard({ writeText });
        const button = shareButton();
        expect(button.classList.contains('btn')).toBe(true);
        expect(button.classList.contains('btn-secondary')).toBe(true);
        expect(button.querySelector('svg[aria-hidden="true"]')).not.toBeNull();
        expect(button.disabled).toBe(false);
        // The live region exists, empty, before anything happens.
        const region = button.parentElement.querySelector('[role="status"]');
        expect(region).not.toBeNull();
        expect(region.textContent).toBe('');
        fireEvent.click(button);
        await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
        expect(writeText).toHaveBeenCalledWith(window.location.href);
        expect(window.location.href).toBe('http://localhost:3000/proyectos');
        expect((await screen.findByText(COPIED)).closest('[role="status"]')).toBe(region);
        expect(shareButton().textContent).toContain(SHARE);
    });

    it('copies the URL with the applied filters', async () => {
        await openCatalog('/proyectos?area=SBC-IoT&nivel=Avanzado&q=riego');
        const writeText = vi.fn().mockResolvedValue();
        setClipboard({ writeText });
        fireEvent.click(shareButton());
        await screen.findByText(COPIED);
        expect(writeText).toHaveBeenCalledWith('http://localhost:3000/proyectos?area=SBC-IoT&nivel=Avanzado&q=riego');
    });

    it('the confirmation goes away after about three seconds and the button label never changes', async () => {
        await openCatalog();
        setClipboard({ writeText: vi.fn().mockResolvedValue() });
        fireEvent.click(shareButton());
        await screen.findByText(COPIED);
        await waitFor(() => expect(screen.queryByText(COPIED)).toBeNull(), { timeout: 4500 });
        expect(shareButton().textContent).toContain(SHARE);
    });

    it('shows the failure message when the clipboard rejects and nothing else can copy', async () => {
        await openCatalog();
        setClipboard({ writeText: vi.fn().mockRejectedValue(new Error('NotAllowedError')) });
        fireEvent.click(shareButton());
        const message = await screen.findByText(FAILED);
        expect(message.closest('[role="status"]')).not.toBeNull();
        expect(screen.queryByText(COPIED)).toBeNull();
        expect(shareButton().textContent).toContain(SHARE);
    });

    it('falls back to a temporary textarea + execCommand when navigator.clipboard is undefined', async () => {
        await openCatalog('/proyectos?q=riego');
        setClipboard(undefined);
        let copied = null;
        document.execCommand = vi.fn((command) => {
            copied = { command, value: document.querySelector('textarea')?.value };
            return true;
        });
        fireEvent.click(shareButton());
        await screen.findByText(COPIED);
        expect(copied).toEqual({ command: 'copy', value: 'http://localhost:3000/proyectos?q=riego' });
        expect(document.querySelector('textarea')).toBeNull();
    });
});

/* ----------------------------------- /eventos ----------------------------------- */
const eventsReady = () => screen.findByRole('region', { name: 'Eventos encontrados' });
const eventTitles = () => within(screen.getByRole('region', { name: 'Eventos encontrados' })).queryAllByRole('heading', { level: 2 }).map((h) => h.textContent).sort();
const eventsHeading = () => screen.getByRole('heading', { level: 2, name: /^(\d+ eventos? vigentes?|Sin resultados)/ }).textContent;
const openEventos = async (url = '/eventos') => { mockDataFetch(); await renderApp(url); await eventsReady(); };

describe('/eventos: filters in the URL', () => {
    it('search + place + modality written through the UI end up in the URL, and the same URL restores them', async () => {
        await openEventos();
        const user = userEvent.setup();
        await user.type(screen.getByLabelText('Buscar por nombre o lugar'), 'iot');
        await user.type(screen.getByLabelText('Ciudad o país'), 'Popayán');
        await user.selectOptions(screen.getByLabelText('Modalidad'), 'presencial');
        await waitFor(() => expect(params().get('modalidad')).toBe('presencial'));
        expect(params().get('q')).toBe('iot');
        expect(params().get('lugar')).toBe('Popayán');
        expect(eventTitles()).toEqual(['Congreso IoT Cauca 2099']);
        const heading = eventsHeading();
        expect(heading).toBe('1 evento vigente');

        await reopen(`/eventos${window.location.search}`, eventsReady);
        expect(eventTitles()).toEqual(['Congreso IoT Cauca 2099']);
        expect(eventsHeading()).toBe(heading);
        expect(screen.getByLabelText('Buscar por nombre o lugar').value).toBe('iot');
        expect(screen.getByLabelText('Ciudad o país').value).toBe('Popayán');
        expect(screen.getByLabelText('Modalidad').value).toBe('presencial');
        const chips = Array.from(screen.getByRole('group', { name: 'Filtros activos' }).querySelectorAll('.filter-chip')).map((chip) => chip.textContent);
        expect(chips.join(' ')).toContain('Popayán');
        expect(chips.join(' ')).toContain('iot');
    });

    it('type, topic, sort and dates are in the URL too', async () => {
        await openEventos('/eventos?kind=cfp&tema=IoT&orden=title&desde=2099-01-01&hasta=2099-12-31&co=1');
        expect(eventTitles()).toEqual(['Congreso IoT Cauca 2099']);
        expect(screen.getByLabelText('Ordenar por').value).toBe('title');
        expect(screen.getByLabelText('Inicio desde').value).toBe('01/01/2099');
        expect(screen.getByLabelText('Solo Colombia').checked).toBe(true);
        expect(screen.getByRole('button', { name: 'Convocatorias (presentar)' }).getAttribute('aria-pressed')).toBe('true');
        expect(window.location.search).toBe('?kind=cfp&tema=IoT&orden=title&desde=2099-01-01&hasta=2099-12-31&co=1');
    });

    it('an old link with a project keeps listing the events of that project', async () => {
        await openEventos(`/eventos?p=${PROJECT_ID}`);
        expect(eventTitles()).toEqual(['Congreso IoT Cauca 2099', 'Feria IoT y Robótica 2099']);
        expect(params().get('p')).toBe(PROJECT_ID);
    });
});

describe('/eventos: «Compartir esta búsqueda»', () => {
    it('copies the exact current href with the filters, announces it and keeps the label', async () => {
        await openEventos('/eventos?kind=cfp&q=iot');
        const writeText = vi.fn().mockResolvedValue();
        setClipboard({ writeText });
        const button = shareButton();
        expect(button.classList.contains('btn-secondary')).toBe(true);
        expect(button.querySelector('svg[aria-hidden="true"]')).not.toBeNull();
        fireEvent.click(button);
        expect((await screen.findByText(COPIED)).closest('[role="status"]')).not.toBeNull();
        expect(writeText).toHaveBeenCalledWith('http://localhost:3000/eventos?kind=cfp&q=iot');
        expect(shareButton().textContent).toContain(SHARE);
    });

    it('works with no filters (shares the page URL)', async () => {
        await openEventos();
        const writeText = vi.fn().mockResolvedValue();
        setClipboard({ writeText });
        fireEvent.click(shareButton());
        await screen.findByText(COPIED);
        expect(writeText).toHaveBeenCalledWith('http://localhost:3000/eventos');
    });

    it('shows the failure message when the clipboard rejects', async () => {
        await openEventos();
        setClipboard({ writeText: vi.fn().mockRejectedValue(new Error('NotAllowedError')) });
        fireEvent.click(shareButton());
        expect((await screen.findByText(FAILED)).closest('[role="status"]')).not.toBeNull();
        expect(screen.queryByText(COPIED)).toBeNull();
    });

    it('falls back to execCommand when navigator.clipboard is undefined', async () => {
        await openEventos('/eventos?q=iot');
        setClipboard(undefined);
        let value = null;
        document.execCommand = vi.fn(() => { value = document.querySelector('textarea')?.value; return true; });
        fireEvent.click(shareButton());
        await screen.findByText(COPIED);
        expect(value).toBe('http://localhost:3000/eventos?q=iot');
    });
});

/* ------------------------------- /donde-publicar -------------------------------- */
const finderReady = () => screen.findByRole('search', { name: 'Buscar y ordenar revistas' });
const finderCount = () => document.querySelector('[aria-live="polite"] b')?.parentElement.textContent.replace(/\s+/g, ' ').trim();
const openFinder = async (url = `/donde-publicar?p=${PROJECT_ID}`) => { mockDataFetch(); await renderApp(url); await finderReady(); };

describe('/donde-publicar: finder state in the URL', () => {
    it('search, view and a quartile filter go to the URL (keeping ?p) and the same URL restores them', async () => {
        await openFinder();
        const user = userEvent.setup();
        await user.type(screen.getByLabelText('Buscar revistas'), 'revista');
        await user.click(screen.getByRole('button', { name: /Tabla/ }));
        await user.click(screen.getByRole('button', { name: /Filtros personalizados/ }));
        await user.click(screen.getByRole('button', { name: 'Q3 · B' }));
        await waitFor(() => expect(params().get('cuartil')).toBe('Q3'));
        expect(params().get('p')).toBe(PROJECT_ID);
        expect(params().get('q')).toBe('revista');
        expect(params().get('vista')).toBe('tabla');
        expect(finderCount()).toContain('1 de 3 revistas');

        await reopen(`/donde-publicar${window.location.search}`, finderReady);
        expect(screen.getByLabelText('Buscar revistas').value).toBe('revista');
        expect(screen.getByRole('button', { name: /Tabla/ }).getAttribute('aria-pressed')).toBe('true');
        expect(finderCount()).toContain('1 de 3 revistas');
        expect(screen.getByRole('group', { name: 'Filtros activos' })).toBeTruthy();
        expect(params().get('p')).toBe(PROJECT_ID);
    });

    it('sort and the section are restored from the URL', async () => {
        await openFinder(`/donde-publicar?p=${PROJECT_ID}&orden=title`);
        expect(screen.getByLabelText('Ordenar por').value).toBe('title');
        cleanup();
        mockDataFetch();
        await renderApp(`/donde-publicar?p=${PROJECT_ID}&seccion=ayuda`);
        await screen.findByRole('tablist', { name: 'Secciones' });
        expect(screen.getByRole('tab', { name: /^Cómo leer esta página/ }).getAttribute('aria-selected')).toBe('true');
    });

    it('a tab change is written to the URL and the default tab leaves it clean', async () => {
        await openFinder();
        const user = userEvent.setup();
        await user.click(screen.getByRole('tab', { name: /^Catálogo completo/ }));
        await waitFor(() => expect(params().get('seccion')).toBe('catalogo'));
        await user.click(screen.getByRole('tab', { name: /^Revistas del proyecto/ }));
        await waitFor(() => expect(window.location.search).toBe(`?p=${PROJECT_ID}`));
    });

    it('old links keep working: ?p alone, the #<id> hash and an unknown project', async () => {
        await openFinder(`/donde-publicar?p=${PROJECT_ID}`);
        expect(finderCount()).toContain('3 de 3 revistas');
        expect(window.location.search).toBe(`?p=${PROJECT_ID}`);
        cleanup();
        await openFinder(`/donde-publicar#${PROJECT_ID}`);
        expect(finderCount()).toContain('3 de 3 revistas');
        expect(window.location.hash).toBe(`#${PROJECT_ID}`);
        cleanup();
        mockDataFetch();
        await renderApp('/donde-publicar?p=proj_inexistente');
        await screen.findByRole('tablist', { name: 'Secciones' });
        expect(screen.getByRole('tab', { name: /^Catálogo completo/ }).getAttribute('aria-selected')).toBe('true');
    });
});

describe('/donde-publicar: «Compartir esta búsqueda»', () => {
    it('sits on the finder toolbar and copies the exact current href, announcing «Enlace copiado»', async () => {
        await openFinder(`/donde-publicar?p=${PROJECT_ID}&q=sensores&vista=tabla`);
        const writeText = vi.fn().mockResolvedValue();
        setClipboard({ writeText });
        const button = shareButton();
        expect(within(screen.getByRole('search', { name: 'Buscar y ordenar revistas' })).getByRole('button', { name: SHARE })).toBe(button);
        expect(button.classList.contains('btn-secondary')).toBe(true);
        expect(button.querySelector('svg[aria-hidden="true"]')).not.toBeNull();
        fireEvent.click(button);
        expect((await screen.findByText(COPIED)).closest('[role="status"]')).not.toBeNull();
        expect(writeText).toHaveBeenCalledWith(`http://localhost:3000/donde-publicar?p=${PROJECT_ID}&q=sensores&vista=tabla`);
        expect(shareButton().textContent).toContain(SHARE);
    });

    it('works with no filters, shows the failure message and falls back without a clipboard', async () => {
        await openFinder();
        setClipboard({ writeText: vi.fn().mockRejectedValue(new Error('NotAllowedError')) });
        fireEvent.click(shareButton());
        expect((await screen.findByText(FAILED)).closest('[role="status"]')).not.toBeNull();

        setClipboard(undefined);
        let value = null;
        document.execCommand = vi.fn(() => { value = document.querySelector('textarea')?.value; return true; });
        fireEvent.click(shareButton());
        await screen.findByText(COPIED);
        expect(value).toBe(`http://localhost:3000/donde-publicar?p=${PROJECT_ID}`);
        expect(screen.queryByText(FAILED)).toBeNull();
    });

    it('is not offered where there is no finder toolbar (no project)', async () => {
        mockDataFetch();
        await renderApp('/donde-publicar');
        await screen.findByRole('tablist', { name: 'Secciones' });
        expect(screen.queryByRole('button', { name: SHARE })).toBeNull();
    });
});
