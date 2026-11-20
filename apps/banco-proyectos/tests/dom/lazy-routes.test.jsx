// T16 of odd/tasks/mejora-visual.md: every page except Home is its own chunk, downloaded when the route opens. While
// it downloads, <main> shows a polite status with a skeleton shaped like a page; the header, skip link, navigation and
// footer stay in place; a failed download says so and «Reintentar» tries again.
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import RouteLoader from '../../src/components/RouteLoader.jsx';
import { lazyRoute } from '../../src/lib/lazyRoute.jsx';

const ROUTES = [
    ['/proyectos', { level: 1, name: 'Explorar proyectos' }],
    ['/proyecto/proj_001', { level: 1, name: /Monitoreo Agrícola Distribuido/ }],
    ['/acerca', { level: 1, name: 'Sobre el Banco de Proyectos' }],
    ['/contacto', { level: 1, name: 'Contacto' }],
    ['/oportunidades', { level: 1, name: 'Mis oportunidades' }],
    ['/eventos', { level: 1, name: 'Buscador de eventos académicos' }],
    ['/donde-publicar', { level: 1, name: '¿Dónde publicar?' }],
];

const routeStatus = () => within(screen.getByRole('main')).getByRole('status');
const routeLoading = () => document.querySelector('[data-route-loading]');

describe('route fallback while the page code downloads', () => {
    it.each(ROUTES)('%s shows a polite status with a page-shaped skeleton in <main>, then the page', async (url, heading) => {
        mockDataFetch();
        await renderApp(url, { settle: false });
        const status = routeStatus();
        expect(status.textContent).toMatch(/^Cargando/);
        expect(status.getAttribute('data-route-loading')).not.toBeNull();
        expect(status.getAttribute('aria-busy')).toBe('true');
        // header block + cards, drawn with the same pulse as the data skeletons
        expect(status.querySelectorAll('[data-skeleton-block]').length).toBeGreaterThanOrEqual(4);
        // /proyectos already shows its real title and intro in the fallback; the other pages draw theirs with the page
        if (url !== '/proyectos') expect(screen.queryByRole('heading', heading)).toBeNull();

        expect(await screen.findByRole('heading', heading)).toBeTruthy();
        await waitFor(() => expect(routeLoading()).toBeNull());
    });

    it('/proyectos draws its title and intro on the first render and keeps those very elements when the results arrive', async () => {
        mockDataFetch();
        await renderApp('/proyectos', { settle: false });
        const title = screen.getByRole('heading', { level: 1, name: 'Explorar proyectos' });
        const intro = screen.getByText(/Elige un área, ajusta el nivel y abre un proyecto para ver su alcance/);
        expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
        expect(screen.queryByRole('region', { name: 'Resultados' })).toBeNull();
        expect(routeLoading()).not.toBeNull();

        expect(await screen.findByRole('region', { name: 'Resultados' })).toBeTruthy();
        expect(screen.getByRole('heading', { level: 1, name: 'Explorar proyectos' })).toBe(title);
        expect(screen.getByText(/Elige un área, ajusta el nivel/)).toBe(intro);
        expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
        expect(screen.getByRole('button', { name: 'Proponer proyecto' }).disabled).toBe(false);
    });

    it('keeps the skip link, the banner, the navigation and the footer while a page loads', async () => {
        mockDataFetch();
        await renderApp('/proyectos', { settle: false });
        expect(screen.getByRole('link', { name: 'Saltar al contenido' })).toBeTruthy();
        expect(screen.getByRole('banner')).toBeTruthy();
        expect(screen.getByRole('navigation', { name: 'Principal' })).toBeTruthy();
        expect(screen.getByRole('contentinfo')).toBeTruthy();
        const main = screen.getByRole('main');
        expect(main.id).toBe('contenido');
        expect(main.getAttribute('tabindex')).toBe('-1');
        await screen.findByRole('heading', { level: 1, name: 'Explorar proyectos' });
    });

    it('Home is not lazy: its heading is there on the first render', async () => {
        mockDataFetch();
        await renderApp('/', { settle: false });
        expect(screen.getByRole('heading', { level: 1, name: /Banco de Proyectos/ })).toBeTruthy();
        expect(routeLoading()).toBeNull();
    });

    it('a route change shows the fallback of the next page and the page afterwards', async () => {
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp('/');
        await user.click(screen.getByRole('link', { name: 'Mis oportunidades' }));
        expect(await screen.findByRole('heading', { level: 1, name: 'Mis oportunidades' })).toBeTruthy();
        expect(window.location.pathname).toBe('/oportunidades');
    });
});

describe('a page that fails to download', () => {
    // React and jsdom log the error a boundary catches; it is expected here.
    beforeEach(() => { vi.spyOn(console, 'error').mockImplementation(() => {}); });

    const page = (name) => function Page() { return <h1>{name}</h1>; };

    it('shows an alert with «Reintentar» that downloads it again and recovers', async () => {
        let attempts = 0;
        const Page = lazyRoute(() => {
            attempts += 1;
            return attempts === 1 ? Promise.reject(new Error('offline')) : Promise.resolve({ default: page('Página lista') });
        });
        const user = userEvent.setup();
        render(<RouteLoader what="la página"><Page /></RouteLoader>);

        const alert = await screen.findByRole('alert');
        expect(alert.textContent).toContain('No se pudo cargar la página');
        expect(screen.queryByRole('heading', { name: 'Página lista' })).toBeNull();

        await user.click(within(alert).getByRole('button', { name: 'Reintentar' }));
        expect(await screen.findByRole('heading', { name: 'Página lista' })).toBeTruthy();
        expect(screen.queryByRole('alert')).toBeNull();
        expect(attempts).toBe(2);
    });

    it('stays on the alert when the second try fails too, and a third one can still work', async () => {
        let attempts = 0;
        const Page = lazyRoute(() => {
            attempts += 1;
            return attempts < 3 ? Promise.reject(new Error('offline')) : Promise.resolve({ default: page('Al tercer intento') });
        });
        const user = userEvent.setup();
        render(<RouteLoader what="la página"><Page /></RouteLoader>);
        await user.click(await screen.findByRole('button', { name: 'Reintentar' }));
        await user.click(await screen.findByRole('button', { name: 'Reintentar' }));
        expect(await screen.findByRole('heading', { name: 'Al tercer intento' })).toBeTruthy();
    });

    it('downloads a healthy page only once however often it renders', async () => {
        let attempts = 0;
        const Page = lazyRoute(() => { attempts += 1; return Promise.resolve({ default: page('Sana') }); });
        const { rerender } = render(<RouteLoader what="la página"><Page /></RouteLoader>);
        await screen.findByRole('heading', { name: 'Sana' });
        rerender(<RouteLoader what="la página"><Page /></RouteLoader>);
        expect(screen.getByRole('heading', { name: 'Sana' })).toBeTruthy();
        expect(attempts).toBe(1);
    });

    it('RouteLoader supplies its own Suspense fallback', async () => {
        const Page = lazyRoute(() => Promise.resolve({ default: page('Con fallback propio') }));
        render(<RouteLoader what="la página"><Page /></RouteLoader>);
        expect(document.querySelector('[data-route-loading]')).not.toBeNull();
        expect(await screen.findByRole('heading', { name: 'Con fallback propio' })).toBeTruthy();
    });
});
