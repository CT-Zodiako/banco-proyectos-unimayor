// T5 of odd/tasks/mejora-visual.md: /donde-publicar without a project opens on the full catalog, the tabs say what
// each one holds, and the project tab explains itself instead of looking empty. Markup, copy and default tab only.
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID } from './fixtures.js';

const open = async (url) => {
    mockDataFetch();
    await renderApp(url);
    await screen.findByRole('tablist', { name: 'Secciones' });
};
const tab = (name) => screen.getByRole('tab', { name });
const selected = () => screen.getAllByRole('tab').filter((el) => el.getAttribute('aria-selected') === 'true').map((el) => el.textContent);

describe('/donde-publicar default tab', () => {
    it('opens on «Catálogo completo» with its catalog visible when no project is chosen', async () => {
        await open('/donde-publicar');
        expect(tab(/^Catálogo completo/).getAttribute('aria-selected')).toBe('true');
        expect(tab(/^Revistas del proyecto/).getAttribute('aria-selected')).toBe('false');
        expect(selected()).toHaveLength(1);
        expect(await screen.findByRole('heading', { name: 'Catálogo de revistas diamante con cuartil' })).toBeTruthy();
        expect(screen.getByRole('tabpanel', { name: /^Catálogo completo/ }).hidden).toBe(false);
        expect(document.getElementById('publicar-view-project').hidden).toBe(true);
    });

    it('keeps «Revistas del proyecto» selected when ?p is a valid project', async () => {
        await open(`/donde-publicar?p=${PROJECT_ID}`);
        expect(tab(/^Revistas del proyecto/).getAttribute('aria-selected')).toBe('true');
        expect(tab(/^Catálogo completo/).getAttribute('aria-selected')).toBe('false');
        expect(screen.getByRole('heading', { level: 1, name: 'Monitoreo agrícola con MQTT' })).toBeTruthy();
        expect(screen.getByRole('tabpanel', { name: /^Revistas del proyecto/ }).hidden).toBe(false);
    });

    it('opens on the catalog too when ?p is not a known project', async () => {
        await open('/donde-publicar?p=proj_inexistente');
        expect(selected()).toHaveLength(1);
        expect(tab(/^Catálogo completo/).getAttribute('aria-selected')).toBe('true');
    });

    it('has one h1 without a project', async () => {
        await open('/donde-publicar');
        expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    });
});

describe('/donde-publicar tabs', () => {
    it('says in one line what each tab holds', async () => {
        await open('/donde-publicar');
        const list = screen.getByRole('tablist', { name: 'Secciones' });
        expect(within(list).getAllByRole('tab')).toHaveLength(3);
        expect(tab(/^Revistas del proyecto/).textContent).toContain('Ordenadas por afinidad con tu proyecto');
        expect(tab(/^Catálogo completo/).textContent).toContain('Todas las revistas, sin elegir proyecto');
        expect(tab(/^Cómo leer esta página/).textContent).toContain('Qué significan afinidad y cuartil');
    });

    it('switches with a click and with Left / Right / Home / End, moving the focus', async () => {
        await open('/donde-publicar');
        const user = userEvent.setup();
        tab(/^Catálogo completo/).focus();
        await user.keyboard('{ArrowRight}');
        await waitFor(() => expect(tab(/^Cómo leer/).getAttribute('aria-selected')).toBe('true'));
        expect(document.activeElement).toBe(tab(/^Cómo leer/));
        await user.keyboard('{ArrowRight}'); // wraps
        await waitFor(() => expect(tab(/^Revistas del proyecto/).getAttribute('aria-selected')).toBe('true'));
        await user.keyboard('{ArrowLeft}'); // wraps back
        await waitFor(() => expect(tab(/^Cómo leer/).getAttribute('aria-selected')).toBe('true'));
        await user.keyboard('{Home}');
        await waitFor(() => expect(tab(/^Revistas del proyecto/).getAttribute('aria-selected')).toBe('true'));
        await user.keyboard('{End}');
        await waitFor(() => expect(tab(/^Cómo leer/).getAttribute('aria-selected')).toBe('true'));
        await user.click(tab(/^Catálogo completo/));
        expect(selected()).toHaveLength(1);
        expect(tab(/^Catálogo completo/).getAttribute('aria-selected')).toBe('true');
    });

    it('only the selected tab is in the tab order', async () => {
        await open('/donde-publicar');
        expect(tab(/^Catálogo completo/).tabIndex).toBe(0);
        expect(tab(/^Revistas del proyecto/).tabIndex).toBe(-1);
        expect(tab(/^Cómo leer/).tabIndex).toBe(-1);
    });
});

describe('/donde-publicar project tab without a project', () => {
    it('explains what to do, links to /proyectos and offers the catalog', async () => {
        await open('/donde-publicar');
        const user = userEvent.setup();
        await user.click(tab(/^Revistas del proyecto/));
        const panel = screen.getByRole('tabpanel', { name: /^Revistas del proyecto/ });
        expect(panel.hidden).toBe(false);
        expect(within(panel).getByText('Elige un proyecto para ver las revistas ordenadas por afinidad')).toBeTruthy();
        expect(within(panel).getByRole('link', { name: 'Elegir un proyecto' }).getAttribute('href')).toBe('/proyectos');
        // The project picker that was already there stays.
        expect(within(panel).getByLabelText('Proyecto')).toBeTruthy();

        await user.click(within(panel).getByRole('button', { name: 'Ver el catálogo completo' }));
        expect(tab(/^Catálogo completo/).getAttribute('aria-selected')).toBe('true');
        expect(document.getElementById('publicar-view-catalog').hidden).toBe(false);
    });

    it('picking a project in the picker keeps today\'s behavior: the project tab lists its journals', async () => {
        await open('/donde-publicar');
        const user = userEvent.setup();
        await user.click(tab(/^Revistas del proyecto/));
        await user.selectOptions(screen.getByLabelText('Proyecto'), PROJECT_ID);
        expect(await screen.findByRole('heading', { level: 1, name: 'Monitoreo agrícola con MQTT' })).toBeTruthy();
        expect(window.location.search).toBe(`?p=${PROJECT_ID}`);
        expect(tab(/^Revistas del proyecto/).getAttribute('aria-selected')).toBe('true');
    });
});

describe('/donde-publicar saved opportunities link', () => {
    it.each(['/donde-publicar', `/donde-publicar?p=${PROJECT_ID}`])('keeps its href on %s and sits outside the tab bar', async (url) => {
        await open(url);
        const link = screen.getByRole('link', { name: /Mis oportunidades guardadas/ });
        expect(link.getAttribute('href')).toBe('/oportunidades');
        expect(screen.getByRole('tablist', { name: 'Secciones' }).contains(link)).toBe(false);
    });
});
