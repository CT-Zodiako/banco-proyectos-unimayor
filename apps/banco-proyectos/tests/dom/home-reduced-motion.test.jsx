import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';

// Own file: framer-motion keeps the reduced-motion preference in module state that is read once, so the media query
// must be stubbed before the first render of the file.
describe('Home with prefers-reduced-motion', () => {
    it('draws the hero text and the metrics at their final place from the first frame', async () => {
        const matchMedia = vi.fn((query) => ({ matches: query.includes('prefers-reduced-motion'), media: query, addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {} }));
        vi.stubGlobal('matchMedia', matchMedia);
        mockDataFetch();
        await renderApp('/');
        const hero = await screen.findByRole('heading', { level: 1, name: /Banco de Proyectos/ });
        expect(hero.style.opacity).not.toBe('0');
        expect(hero.style.transform).not.toMatch(/translateX\(-/);
        expect(hero.nextElementSibling.style.opacity).not.toBe('0');
        const list = screen.getByRole('list', { name: 'Cifras del banco' });
        list.querySelectorAll('li').forEach((li) => expect(li.style.opacity).not.toBe('0'));
    });
});
