// T18: /oportunidades uses the shared PageHeader (hue «projects», eyebrow «Banco de proyectos», back link to the catalog)
// and does not link to itself. Backup, filter and forms keep their behavior (their tests are the other DOM files).
import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';

const open = async () => {
    mockDataFetch();
    await renderApp('/oportunidades');
    await screen.findByRole('heading', { level: 1, name: 'Mis oportunidades' });
};
const header = () => document.querySelector('main .page-header');

describe('/oportunidades header', () => {
    it('is the shared header card with the projects hue, icon tile, eyebrow and the only h1', async () => {
        await open();
        expect(document.querySelectorAll('main .page-header')).toHaveLength(1);
        expect(header().classList.contains('hue-card')).toBe(true);
        expect(header().classList.contains('tn-projects')).toBe(true);
        expect(header().querySelector('.page-header-icon.type-chip')).toBeTruthy();
        expect(header().querySelector('.page-header-eyebrow').textContent).toBe('Banco de proyectos');
        const h1s = screen.getAllByRole('heading', { level: 1 });
        expect(h1s).toHaveLength(1);
        expect(header().contains(h1s[0])).toBe(true);
        expect(h1s[0].classList.contains('page-header-title')).toBe(true);
    });

    it('keeps the explanation of where the data is kept', async () => {
        await open();
        expect(within(header()).getByText(/Guardadas solo en este navegador\. No se sincronizan entre dispositivos/)).toBeTruthy();
    });

    it('has the back link to the catalog in the actions and no link to itself', async () => {
        await open();
        const actions = header().querySelector('.page-header-actions');
        const back = within(actions).getByRole('link', { name: /Volver a los proyectos/ });
        expect(back.getAttribute('href')).toBe('/proyectos');
        expect(back.classList.contains('btn-secondary')).toBe(true);
        expect(screen.queryByRole('link', { name: /Mis oportunidades guardadas/ })).toBeNull();
        expect(within(document.querySelector('main')).queryAllByRole('link').filter((link) => link.getAttribute('href') === '/oportunidades')).toHaveLength(0);
    });

    it('the header is the first block of the page, before the backup controls and the filter', async () => {
        await open();
        const page = header().parentElement;
        expect(page.firstElementChild).toBe(header());
        const backup = screen.getByRole('heading', { level: 2, name: 'Respaldo local' });
        expect(header().compareDocumentPosition(backup) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Exportar respaldo' })).toBeTruthy();
        expect(screen.getByLabelText('Filtrar por estado')).toBeTruthy();
    });

    it('the other pages with a header still link to the saved opportunities', async () => {
        mockDataFetch();
        await renderApp('/eventos');
        await screen.findByRole('heading', { level: 1 });
        expect(screen.getAllByRole('link', { name: /Mis oportunidades guardadas/ })).toHaveLength(1);
    });
});
