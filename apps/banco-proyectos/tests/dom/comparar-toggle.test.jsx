// T23 of odd/tasks/mejora-visual.md: every «Comparar» toggle uses the standard toggle-button pattern. The accessible name
// is constant («Comparar: <título>», which contains the visible label «Comparar», WCAG 2.5.3), the visible label is
// constant too, and the state is exposed only through aria-pressed plus a visible check icon (not color alone).
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID, publicarFixture } from './fixtures.js';
import { projects } from '../../src/data/projects/index.js';
import { splitProjectTitle } from '../../src/lib/catalog.js';

const titleOf = (id) => splitProjectTitle(projects.find((project) => project.id === id).titulo).title;
const MESSAGE = 'Máximo 3 proyectos. Quita uno para añadir otro.';
const icon = (button) => button.querySelector('svg')?.getAttribute('class') ?? '';
const nameOf = (button) => button.getAttribute('aria-label');

describe('project cards', () => {
    const open = async () => {
        mockDataFetch();
        await renderApp('/proyectos');
        await screen.findByRole('region', { name: 'Resultados' });
        return userEvent.setup();
    };
    const toggle = (id) => screen.getByRole('button', { name: `Comparar: ${titleOf(id)}` });

    it('keeps the name and the visible label «Comparar» in every state; only aria-pressed and the icon change', async () => {
        const user = await open();
        const button = toggle('proj_001');
        expect(button.textContent).toBe('Comparar');
        expect(button.getAttribute('aria-pressed')).toBe('false');
        expect(icon(button)).toMatch(/lucide-scale/);
        expect(nameOf(button)).toContain(button.textContent);

        await user.click(button);
        const pressed = toggle('proj_001');
        expect(pressed).toBe(button); // the same element: nothing was replaced
        expect(pressed.textContent).toBe('Comparar');
        expect(nameOf(pressed)).toBe(`Comparar: ${titleOf('proj_001')}`);
        expect(pressed.getAttribute('aria-pressed')).toBe('true');
        expect(icon(pressed)).toMatch(/lucide-check/);
        expect(screen.queryByRole('button', { name: /^Quitar de la comparación/ })).toBeNull();

        await user.click(pressed);
        expect(toggle('proj_001').getAttribute('aria-pressed')).toBe('false');
        expect(toggle('proj_001').textContent).toBe('Comparar');
        expect(icon(toggle('proj_001'))).toMatch(/lucide-scale/);
    });

    it('Space toggles it from the keyboard and the name stays the same', async () => {
        const user = await open();
        toggle('proj_002').focus();
        await user.keyboard(' ');
        expect(document.activeElement).toBe(toggle('proj_002'));
        expect(toggle('proj_002').getAttribute('aria-pressed')).toBe('true');
        await user.keyboard(' ');
        expect(toggle('proj_002').getAttribute('aria-pressed')).toBe('false');
    });

    it('at the limit the unselected ones are disabled with the explanation and the selected ones keep their name and stay active', async () => {
        const user = await open();
        for (const id of ['proj_001', 'proj_002', 'proj_003']) await user.click(toggle(id));
        const blocked = toggle('proj_004');
        expect(blocked.disabled).toBe(true);
        expect(blocked.getAttribute('aria-pressed')).toBe('false');
        expect(blocked.textContent).toBe('Comparar');
        expect(document.getElementById(blocked.getAttribute('aria-describedby')).textContent).toBe(MESSAGE);
        for (const id of ['proj_001', 'proj_002', 'proj_003']) {
            expect(toggle(id).disabled).toBe(false);
            expect(toggle(id).getAttribute('aria-pressed')).toBe('true');
        }
        await user.click(toggle('proj_002'));
        expect(toggle('proj_004').disabled).toBe(false);
    });
});

describe('event cards', () => {
    const TITLE = 'Congreso IoT Cauca 2099';
    it('keeps «Comparar: <título>» and the label «Comparar»; aria-pressed and the check icon show the state; Space toggles', async () => {
        mockDataFetch();
        await renderApp('/eventos');
        await screen.findByRole('region', { name: 'Eventos encontrados' });
        const user = userEvent.setup();
        const button = screen.getByRole('button', { name: `Comparar: ${TITLE}` });
        expect(button.textContent).toBe('Comparar');
        expect(button.getAttribute('aria-pressed')).toBe('false');
        expect(icon(button)).toMatch(/lucide-scale/);

        await user.click(button);
        const pressed = screen.getByRole('button', { name: `Comparar: ${TITLE}` });
        expect(pressed).toBe(button);
        expect(pressed.textContent).toBe('Comparar');
        expect(pressed.getAttribute('aria-pressed')).toBe('true');
        expect(icon(pressed)).toMatch(/lucide-check/);
        expect(screen.queryByRole('button', { name: /Quitar de comparación/ })).toBeNull();

        pressed.focus();
        await user.keyboard(' ');
        expect(screen.getByRole('button', { name: `Comparar: ${TITLE}` }).getAttribute('aria-pressed')).toBe('false');
    });
});

describe('journal comparison table', () => {
    it('each row has a «Comparar: <título>» control whose name is constant and whose state is its checked property', async () => {
        mockDataFetch();
        await renderApp(`/donde-publicar?p=${PROJECT_ID}&vista=tabla`);
        const user = userEvent.setup();
        const title = publicarFixture.journals[0].title;
        const box = await screen.findByRole('checkbox', { name: `Comparar: ${title}` });
        expect(box.checked).toBe(false);
        await user.click(box);
        const checked = screen.getByRole('checkbox', { name: `Comparar: ${title}` });
        expect(checked).toBe(box);
        expect(checked.checked).toBe(true);
        expect(screen.queryByRole('checkbox', { name: /^Quitar/ })).toBeNull();
    });
});
