// T24 of odd/tasks/mejora-visual.md: the «Proponer proyecto» button is gone. Its form only showed an alert and saved
// nothing, so /proyectos offers no way to «propose» a project until a real way to receive proposals exists.
// The catalog itself (title, summary, intro, results) is unchanged.
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { CatalogHeader } from '../../src/components/CatalogSkeleton.jsx';

const PROPOSE = /proponer|propuesta/i;

describe('/proyectos has no «Proponer proyecto»', () => {
    it('has no button or link named «Proponer proyecto» (nor any «propuesta» control), and no dialog', async () => {
        mockDataFetch();
        await renderApp('/proyectos');
        await screen.findByRole('region', { name: 'Resultados' });
        expect(screen.queryByRole('button', { name: PROPOSE })).toBeNull();
        expect(screen.queryByRole('link', { name: PROPOSE })).toBeNull();
        expect(screen.queryByRole('dialog')).toBeNull();
        expect(screen.queryByText(/Proponer proyecto/)).toBeNull();
    });

    it('does not show it while the page loads either, and pressing the page controls never calls alert', async () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        mockDataFetch();
        const user = userEvent.setup();
        await renderApp('/proyectos', { settle: false, preloadProjects: false });
        await screen.findByRole('heading', { level: 1, name: 'Explorar proyectos' });
        expect(screen.queryByRole('button', { name: PROPOSE })).toBeNull();
        const results = await screen.findByRole('region', { name: 'Resultados' });
        expect(screen.queryByRole('button', { name: PROPOSE })).toBeNull();
        // every control of the page header area is something other than a proposal
        const header = screen.getByRole('heading', { level: 1, name: 'Explorar proyectos' }).parentElement.parentElement;
        expect(within(header).queryAllByRole('button')).toHaveLength(0);
        expect(within(header).queryAllByRole('link')).toHaveLength(0);
        await user.click(within(results).getAllByRole('article')[0]);
        expect(alertSpy).not.toHaveBeenCalled();
    });

    it('still renders the title, the summary, the intro and the results', async () => {
        mockDataFetch();
        await renderApp('/proyectos');
        expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
        expect(screen.getByRole('heading', { level: 1, name: 'Explorar proyectos' })).toBeTruthy();
        expect(screen.getByText(/en \d+ áreas · \d+ áreas nuevas este semestre/)).toBeTruthy();
        expect(screen.getByText(/Elige un área, ajusta el nivel y abre un proyecto/)).toBeTruthy();
        const results = await screen.findByRole('region', { name: 'Resultados' });
        expect(within(results).getAllByRole('article')).toHaveLength(12);
    });
});

describe('the catalog header and its placeholder', () => {
    it('the skeleton header (no summary yet) shows the title, a placeholder summary, the intro and no button', () => {
        const { container } = render(<CatalogHeader summary={null} />);
        expect(screen.getByRole('heading', { level: 1, name: 'Explorar proyectos' })).toBeTruthy();
        expect(screen.getByText(/Elige un área, ajusta el nivel y abre un proyecto/)).toBeTruthy();
        expect(container.querySelector('[data-skeleton-block]')).not.toBeNull();
        expect(container.querySelector('button, a, [role=button]')).toBeNull();
        expect(container.textContent).not.toMatch(PROPOSE);
    });

    it('with a summary it shows it in the same place and still no button', () => {
        const { container } = render(<CatalogHeader summary={<strong>3 proyectos</strong>} />);
        expect(screen.getByText('3 proyectos')).toBeTruthy();
        expect(container.querySelector('[data-skeleton-block]')).toBeNull();
        expect(container.querySelector('button')).toBeNull();
    });
});
