import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { projects } from '../../src/data/projects/index.js';

// T27 of odd/tasks/mejora-visual.md: the project data stores `referencias` as a list of citation texts (the validator
// in scripts/projects-validation.mjs demands texts), so the project page has to show each text, not an empty link.
const byId = (id) => projects.find((p) => p.id === id);

describe('ProjectDetail: referencias are citation texts', () => {
    it('shows every reference of a project as readable text, not as links without a name', async () => {
        const project = byId('proj_237');
        expect(project.referencias.length).toBeGreaterThan(0);
        mockDataFetch();
        await renderApp('/proyecto/proj_237');
        const heading = await screen.findByRole('heading', { level: 2, name: 'Referencias' });
        const section = heading.closest('section');
        for (const reference of project.referencias) {
            expect(within(section).getByText(reference)).toBeTruthy();
        }
        expect(within(section).queryAllByRole('link')).toHaveLength(0);
        expect(within(section).getAllByRole('listitem')).toHaveLength(project.referencias.length);
    });

    it('has no Referencias section for a project without references', async () => {
        expect(byId('proj_001').referencias).toEqual([]);
        mockDataFetch();
        await renderApp('/proyecto/proj_001');
        await screen.findByRole('heading', { level: 1, name: /Proyecto 1:/ });
        expect(screen.queryByRole('heading', { name: 'Referencias' })).toBeNull();
    });
});
