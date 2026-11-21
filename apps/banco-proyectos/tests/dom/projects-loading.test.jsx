// T16 of odd/tasks/mejora-visual.md: the 286 projects are a separate chunk (src/data/projects), loaded on demand by
// useProjects. T16b: the catalog, the Home figures and the global search read a light index of them
// (src/data/projects-index.js, useProjectsIndex) and only the project page loads the full data. Pages that need data wait
// on a skeleton, a failure says so with «Reintentar», and the data itself does not change.
import { act, fireEvent, renderHook, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { deferred, mockDataFetch, renderApp } from './helpers.jsx';
import { projects } from '../../src/data/projects/index.js';
import { projectsIndex } from '../../src/data/projects-index.js';

const FULL = '../../src/data/projects/index.js';
const INDEX = '../../src/data/projects-index.js';

beforeEach(() => { vi.spyOn(console, 'error').mockImplementation(() => {}); }); // the failed chunk is logged by React and jsdom
afterEach(() => { vi.doUnmock(FULL); vi.doUnmock(INDEX); vi.unstubAllGlobals(); });

// Replaces a data module (the light index by default) for the next renderApp()/import: `gate` holds the download,
// `failures` makes the first N fail. `attempts` counts how many times the app asked for it.
function controlProjects({ module = INDEX, gate = null, failures = 0 } = {}) {
    const state = { attempts: 0, failures };
    vi.doMock(module, async (importOriginal) => {
        state.attempts += 1;
        if (gate) await gate.promise;
        if (state.attempts <= state.failures) throw new Error('chunk failed');
        return importOriginal();
    });
    return state;
}

async function freshHook(options, name = 'useProjects') {
    vi.resetModules();
    const hooks = await import('../../src/hooks/useProjects.js');
    return renderHook(() => hooks[name](options));
}

describe('useProjects', () => {
    it('starts loading with an empty list and ends with the same 286 projects of the data files', async () => {
        const { result } = await freshHook();
        expect(result.current.loading).toBe(true);
        expect(result.current.projects).toEqual([]);
        expect(result.current.error).toBe(null);
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.projects).toHaveLength(286);
        expect(result.current.projects).toEqual(projects);
        expect(result.current.error).toBe(null);
    });

    it('does not download anything while it is disabled', async () => {
        const state = controlProjects({ module: FULL });
        const { result } = await freshHook({ enabled: false });
        await act(async () => { await new Promise((resolve) => setTimeout(resolve, 30)); });
        expect(state.attempts).toBe(0);
        expect(result.current.loading).toBe(false);
        expect(result.current.projects).toEqual([]);
    });

    it('a second user gets the loaded projects on its first render', async () => {
        const { result } = await freshHook();
        await waitFor(() => expect(result.current.loading).toBe(false));
        const { useProjects } = await import('../../src/hooks/useProjects.js');
        const second = renderHook(() => useProjects());
        expect(second.result.current.loading).toBe(false);
        expect(second.result.current.projects).toHaveLength(286);
    });

    it('reports a failed download and loads on retry()', async () => {
        controlProjects({ module: FULL, failures: 1 });
        const { result } = await freshHook();
        await waitFor(() => expect(result.current.error).toBeTruthy());
        expect(result.current.loading).toBe(false);
        expect(result.current.projects).toEqual([]);
        act(() => result.current.retry());
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.error).toBe(null);
        expect(result.current.projects).toHaveLength(286);
    });
});

describe('useProjectsIndex', () => {
    it('starts loading with an empty list and ends with the committed light index', async () => {
        const { result } = await freshHook(undefined, 'useProjectsIndex');
        expect(result.current.loading).toBe(true);
        expect(result.current.projects).toEqual([]);
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.projects).toHaveLength(286);
        expect(result.current.projects).toEqual(projectsIndex);
        expect(result.current.error).toBe(null);
    });

    it('does not download while disabled, and reports a failure that retry() recovers', async () => {
        const idle = controlProjects();
        const disabled = await freshHook({ enabled: false }, 'useProjectsIndex');
        await act(async () => { await new Promise((resolve) => setTimeout(resolve, 30)); });
        expect(idle.attempts).toBe(0);
        expect(disabled.result.current.loading).toBe(false);

        vi.doUnmock(INDEX);
        controlProjects({ failures: 1 });
        const { result } = await freshHook(undefined, 'useProjectsIndex');
        await waitFor(() => expect(result.current.error).toBeTruthy());
        act(() => result.current.retry());
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.projects).toHaveLength(286);
    });

    it('does not need the full projects: it works when that chunk is broken', async () => {
        controlProjects({ module: FULL, failures: 99 });
        const { result } = await freshHook(undefined, 'useProjectsIndex');
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.projects).toHaveLength(286);
        expect(result.current.error).toBe(null);
    });
});

describe('only the project page downloads the full projects', () => {
    it.each([
        ['/', 'the Home figures'],
        ['/proyectos', 'the catalog'],
        ['/oportunidades', 'Mis oportunidades'],
    ])('%s (%s) never asks for the full data', async (url) => {
        const full = controlProjects({ module: FULL });
        mockDataFetch();
        await renderApp(url, { preloadProjects: false });
        await act(async () => { await new Promise((resolve) => setTimeout(resolve, 60)); });
        expect(full.attempts).toBe(0);
    });

    it('the global search over the catalog does not ask for it either', async () => {
        const full = controlProjects({ module: FULL });
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp('/proyectos');
        await user.click(screen.getByRole('button', { name: 'Buscar en todo el sitio' }));
        const dialog = await screen.findByRole('dialog', { name: 'Buscar en todo el sitio' });
        fireEvent.change(within(dialog).getByRole('combobox'), { target: { value: 'sensor' } });
        await waitFor(() => expect(within(dialog).getAllByRole('option').length).toBeGreaterThan(0));
        expect(full.attempts).toBe(0);
    });

    it('/proyecto/:id asks for the full data once and does not need the light index', async () => {
        const full = controlProjects({ module: FULL });
        const index = controlProjects({ module: INDEX, failures: 99 });
        mockDataFetch();
        await renderApp('/proyecto/proj_001', { preloadProjects: false });
        expect(await screen.findByRole('heading', { level: 1, name: /Monitoreo Agrícola Distribuido/ })).toBeTruthy();
        expect(full.attempts).toBe(1);
        expect(index.attempts).toBe(0);
    });

    it('the project page shows the full detail (hardware table) that the index does not carry', async () => {
        mockDataFetch();
        await renderApp('/proyecto/proj_001');
        const first = projects.find((project) => project.id === 'proj_001');
        expect(await screen.findByText(first.hardware_tabla[0].componente)).toBeTruthy();
    });
});

describe('pages that need the projects', () => {
    it('/proyectos keeps the page skeleton until the data chunk arrives, then lists the projects', async () => {
        const gate = deferred();
        controlProjects({ gate });
        mockDataFetch();
        await renderApp('/proyectos', { settle: false, preloadProjects: false });
        expect(within(screen.getByRole('main')).getByRole('status').textContent).toMatch(/^Cargando/);
        expect(screen.queryByRole('region', { name: 'Resultados' })).toBeNull();
        // once the page code is there, the title and the intro are on screen while the index is still on its way
        expect(await screen.findByRole('heading', { level: 1, name: 'Explorar proyectos' })).toBeTruthy();
        expect(screen.getByText(/Elige un área, ajusta el nivel y abre un proyecto/)).toBeTruthy();
        const loading = screen.getByText('Cargando los proyectos…').closest('[role=status]');
        expect(loading.textContent).toBe('Cargando los proyectos…');
        expect(loading.getAttribute('aria-busy')).toBe('true');
        expect(loading.querySelectorAll('[data-skeleton-block]').length).toBeGreaterThanOrEqual(4);
        expect(screen.queryByRole('button', { name: 'Proponer proyecto' })).toBeNull();
        expect(screen.queryByRole('region', { name: 'Resultados' })).toBeNull();
        gate.resolve();
        const results = await screen.findByRole('region', { name: 'Resultados' });
        expect(screen.queryByText('Cargando los proyectos…')).toBeNull();
        expect(screen.queryByRole('button', { name: 'Proponer proyecto' })).toBeNull();
        expect(within(results).getAllByRole('article')).toHaveLength(12);
        expect(within(screen.getByRole('navigation', { name: 'Paginación' })).getByText(`Página 1 de ${Math.ceil(projects.length / 12)} · 12 proyectos por página`)).toBeTruthy();
    });

    it('/proyectos says the projects could not be loaded and «Reintentar» recovers', async () => {
        const state = controlProjects({ failures: 99 });
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp('/proyectos', { settle: false, preloadProjects: false });
        const alert = await screen.findByRole('alert');
        expect(alert.textContent).toContain('No se pudo cargar');
        expect(screen.queryByRole('region', { name: 'Resultados' })).toBeNull();
        state.failures = 0;
        await user.click(within(alert).getByRole('button', { name: 'Reintentar' }));
        expect(await screen.findByRole('region', { name: 'Resultados' })).toBeTruthy();
        expect(screen.queryByRole('alert')).toBeNull();
    });

    it('/proyecto/:id waits for the data, then shows the project; an unknown id still says «Proyecto no encontrado»', async () => {
        const gate = deferred();
        controlProjects({ module: FULL, gate });
        mockDataFetch();
        await renderApp('/proyecto/proj_001', { settle: false, preloadProjects: false });
        expect(within(screen.getByRole('main')).getByRole('status')).toBeTruthy();
        gate.resolve();
        expect(await screen.findByRole('heading', { level: 1, name: /Monitoreo Agrícola Distribuido/ })).toBeTruthy();
    });

    it('/proyecto/proj_inexistente says «Proyecto no encontrado» once the data is loaded', async () => {
        mockDataFetch();
        await renderApp('/proyecto/proj_inexistente');
        expect(await screen.findByRole('heading', { name: 'Proyecto no encontrado' })).toBeTruthy();
    });

    it('Home draws its page at once; the figures show a placeholder until the projects arrive, then the real counts', async () => {
        const gate = deferred();
        controlProjects({ gate });
        mockDataFetch();
        await renderApp('/', { settle: false, preloadProjects: false });
        expect(screen.getByRole('heading', { level: 1, name: /Banco de Proyectos/ })).toBeTruthy();
        const figures = () => [...document.querySelectorAll('[data-metric-value]')].map((node) => node.textContent);
        expect(figures()).toHaveLength(4);
        expect(figures().every((text) => text === '—')).toBe(true);
        gate.resolve();
        await waitFor(() => expect(figures()[0]).toBe(String(projects.length)));
        expect(figures().every((text) => /^\d+$/.test(text))).toBe(true);
    });

    it('Home asks for the projects only when the figures come near the viewport', async () => {
        const observers = [];
        vi.stubGlobal('IntersectionObserver', class {
            constructor(callback) { this.callback = callback; observers.push(this); }
            observe(target) { this.target = target; }
            unobserve() {}
            disconnect() {}
        });
        const state = controlProjects();
        mockDataFetch();
        await renderApp('/', { settle: false, preloadProjects: false });
        await act(async () => { await new Promise((resolve) => setTimeout(resolve, 30)); });
        expect(state.attempts).toBe(0);
        expect(observers.length).toBeGreaterThan(0);
        act(() => observers.forEach((observer) => observer.callback([{ isIntersecting: true, target: observer.target }])));
        await waitFor(() => expect(state.attempts).toBe(1));
        await waitFor(() => expect(document.querySelector('[data-metric-value]').textContent).toBe(String(projects.length)));
    });

    it('Home says the figures could not be loaded and «Reintentar» brings them back', async () => {
        controlProjects({ failures: 1 });
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp('/', { settle: false, preloadProjects: false });
        const alert = await screen.findByRole('alert');
        expect(alert.textContent).toContain('No se pudo cargar');
        await user.click(within(alert).getByRole('button', { name: 'Reintentar' }));
        await waitFor(() => expect(document.querySelector('[data-metric-value]').textContent).toBe(String(projects.length)));
        expect(screen.queryByRole('alert')).toBeNull();
    });

    it('the global search says it is loading the projects, then finds them', async () => {
        const gate = deferred();
        controlProjects({ gate });
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp('/acerca', { settle: false, preloadProjects: false });
        await screen.findByRole('heading', { level: 1, name: 'Sobre el Banco de Proyectos' });
        await user.click(screen.getByRole('button', { name: 'Buscar en todo el sitio' }));
        const dialog = await screen.findByRole('dialog', { name: 'Buscar en todo el sitio' });
        expect(within(dialog).getByText('Cargando proyectos…')).toBeTruthy();
        fireEvent.change(within(dialog).getByRole('combobox'), { target: { value: 'sensor' } });
        expect(within(dialog).queryByText(/Sin resultados/)).toBeNull();
        gate.resolve();
        await waitFor(() => expect(within(dialog).queryByText('Cargando proyectos…')).toBeNull());
        expect(within(dialog).getAllByRole('option').length).toBeGreaterThan(0);
    });
});
