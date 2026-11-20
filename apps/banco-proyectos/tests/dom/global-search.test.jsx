// T10 of odd/tasks/mejora-visual.md: global search in the navbar (projects, events, journals), opened with a button,
// Ctrl/Cmd+K or «/». Events and journals are downloaded the first time it opens.
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { deferred, mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID, eventosFixture, publicarFixture } from './fixtures.js';
import { projects } from '../../src/data/projects/index.js';
import { filterProjects } from '../../src/lib/catalog.js';

const CATALOG = '/data/publicar-catalog.json';
const EVENTS = '/data/eventos.json';
const json = (body) => ({ ok: true, status: 200, json: async () => body });
const failure = { ok: false, status: 500, json: async () => ({}) };

// Same fixtures as the other DOM tests plus the journal catalog (an array of journals).
const mockData = (override = () => undefined) => mockDataFetch((path, response) => {
    const custom = override(path);
    if (custom !== undefined) return custom;
    return path === CATALOG ? json(publicarFixture.journals) : response;
});

const BUTTON = 'Buscar en todo el sitio';
const opener = () => screen.getByRole('button', { name: BUTTON });
const dialog = () => screen.getByRole('dialog', { name: BUTTON });
const combobox = () => within(dialog()).getByRole('combobox', { name: 'Buscar proyectos, eventos o revistas' });
const options = () => within(screen.getByRole('listbox')).getAllByRole('option');
const optionNames = () => options().map((option) => option.textContent);
const status = () => within(dialog()).getByRole('status');

async function openApp(url = '/proyectos', override) {
    mockData(override);
    const user = userEvent.setup();
    await renderApp(url);
    return user;
}
// The dialog is a lazy chunk (T16): it is there once its code has downloaded.
const openWithButton = async (user) => { await user.click(opener()); await screen.findByRole('dialog', { name: BUTTON }); return combobox(); };
const search = async (user, text) => { const input = combobox(); await user.clear(input); await user.type(input, text); return input; };
const loaded = () => waitFor(() => expect(within(dialog()).queryByText('Cargando eventos y revistas…')).toBeNull());

describe('the button in the navbar', () => {
    it('is named «Buscar en todo el sitio», shows «Buscar» and the shortcut, and sits in the header next to the links', async () => {
        await openApp();
        const button = opener();
        expect(button.closest('header')).toBeTruthy();
        expect(button.textContent).toMatch(/Buscar/);
        expect(button.textContent).toMatch(/Ctrl K|⌘ K/);
        expect(button.getAttribute('aria-haspopup')).toBe('dialog');
        expect(button.querySelector('svg')).toBeTruthy();
        const nav = screen.getByRole('navigation', { name: 'Principal' });
        for (const name of ['Proyectos', 'Eventos académicos', 'Dónde publicar', 'Mis oportunidades']) {
            expect(within(nav).getByRole('link', { name })).toBeTruthy();
        }
    });

    it('does not download events or journals until it is opened, then downloads each once', async () => {
        mockData();
        const requests = [];
        const original = globalThis.fetch;
        vi.stubGlobal('fetch', vi.fn((url) => { requests.push(new URL(url, 'http://localhost').pathname); return original(url); }));
        const user = userEvent.setup();
        await renderApp('/proyectos');
        await screen.findByRole('region', { name: 'Resultados' });
        expect(requests.filter((path) => path === EVENTS || path === CATALOG)).toEqual([]);
        await openWithButton(user);
        await loaded();
        expect(requests.filter((path) => path === EVENTS)).toHaveLength(1);
        expect(requests.filter((path) => path === CATALOG)).toHaveLength(1);
        await user.keyboard('{Escape}');
        await user.click(opener());
        await loaded();
        expect(requests.filter((path) => path === EVENTS || path === CATALOG)).toHaveLength(2);
    });
});

describe('opening', () => {
    it('the button opens a modal dialog named by its title, with the focus in a labelled combobox', async () => {
        const user = await openApp();
        const input = await openWithButton(user);
        const box = dialog();
        expect(box.getAttribute('aria-modal')).toBe('true');
        expect(within(box).getByRole('heading', { name: BUTTON })).toBeTruthy();
        // The focus is set by the dialog's mount effect, which can run just after the dialog appears.
        await waitFor(() => expect(document.activeElement).toBe(input));
        expect(input.getAttribute('aria-expanded')).toBe('false');
        expect(within(box).getByRole('button', { name: 'Cerrar' })).toBeTruthy();
    });

    it('Ctrl+K and Cmd+K open it from anywhere, even from a text field', async () => {
        const user = await openApp();
        await user.keyboard('{Control>}k{/Control}');
        expect(await screen.findByRole('dialog', { name: BUTTON })).toBeTruthy();
        await user.keyboard('{Escape}');
        expect(screen.queryByRole('dialog')).toBeNull();
        await user.keyboard('{Meta>}k{/Meta}');
        expect(await screen.findByRole('dialog', { name: BUTTON })).toBeTruthy();
        await user.keyboard('{Escape}');
        await user.click(screen.getAllByRole('searchbox')[0]);
        await user.keyboard('{Control>}k{/Control}');
        expect(await screen.findByRole('dialog', { name: BUTTON })).toBeTruthy();
    });

    it('«/» opens it when the focus is not in a field, and types the slash when it is', async () => {
        const user = await openApp();
        await user.keyboard('/');
        expect(await screen.findByRole('dialog', { name: BUTTON })).toBeTruthy();
        expect(combobox().value).toBe('');
        await user.keyboard('{Escape}');

        const field = screen.getAllByRole('searchbox')[0];
        await user.click(field);
        await user.keyboard('a/b');
        expect(screen.queryByRole('dialog')).toBeNull();
        expect(field.value).toBe('a/b');

        const select = document.createElement('select');
        document.body.append(select);
        select.focus();
        fireEvent.keyDown(select, { key: '/' });
        const editable = document.createElement('div');
        editable.setAttribute('contenteditable', 'true');
        document.body.append(editable);
        fireEvent.keyDown(editable, { key: '/' });
        expect(screen.queryByRole('dialog')).toBeNull();
        select.remove();
        editable.remove();
    });

    it('«/» with Ctrl/Alt and Ctrl+K while another modal dialog is open do nothing', async () => {
        const user = await openApp();
        fireEvent.keyDown(document.body, { key: '/', ctrlKey: true });
        fireEvent.keyDown(document.body, { key: '/', altKey: true });
        expect(screen.queryByRole('dialog')).toBeNull();
        await user.click(screen.getByRole('button', { name: 'Proponer proyecto' }));
        await screen.findByRole('dialog', { name: 'Proponer proyecto' }); // a lazy chunk (T16)
        await user.keyboard('{Control>}k{/Control}');
        expect(screen.getAllByRole('dialog')).toHaveLength(1);
        expect(screen.getByRole('dialog', { name: 'Proponer proyecto' })).toBeTruthy();
    });

    it('the rest of the app is inert and the page cannot scroll while it is open', async () => {
        mockData();
        window.history.replaceState({}, '', '/proyectos');
        vi.resetModules();
        const host = document.createElement('div');
        host.id = 'root';
        document.body.append(host);
        const { default: App } = await import('../../src/App.jsx');
        render(<App />, { container: host });
        const user = userEvent.setup();
        await user.click(opener());
        await screen.findByRole('dialog', { name: BUTTON });
        expect(host.hasAttribute('inert')).toBe(true);
        expect(document.body.style.overflow).toBe('hidden');
        await user.keyboard('{Escape}');
        expect(host.hasAttribute('inert')).toBe(false);
        expect(document.body.style.overflow).toBe('');
        cleanup();
        host.remove();
    });
});

describe('the initial state', () => {
    it('explains how to use it and offers three example searches that run when clicked', async () => {
        const user = await openApp();
        await openWithButton(user);
        const box = dialog();
        expect(within(box).getByText(/Escribe para buscar proyectos, eventos y revistas/)).toBeTruthy();
        const examples = within(box).getByRole('group', { name: 'Prueba con' });
        expect(within(examples).getAllByRole('button').map((b) => b.textContent)).toEqual(['sensores', 'ciberseguridad', 'Colombia']);
        expect(screen.queryByRole('listbox')).toBeNull();
        await user.click(within(examples).getByRole('button', { name: 'ciberseguridad' }));
        expect(combobox().value).toBe('ciberseguridad');
        expect(document.activeElement).toBe(combobox());
        expect(screen.getByRole('listbox')).toBeTruthy();
        expect(within(box).queryByRole('group', { name: 'Prueba con' })).toBeNull();
    });
});

describe('results', () => {
    it('are grouped under Proyectos, Eventos and Revistas, at most five per group plus a «Ver todos» entry with the full count', async () => {
        const user = await openApp();
        await openWithButton(user);
        await loaded();
        await search(user, 'colombia');
        const total = filterProjects(projects, { query: 'colombia' }).length;
        expect(total).toBeGreaterThan(5);

        const listbox = screen.getByRole('listbox');
        expect(listbox.getAttribute('aria-label')).toBe('Resultados');
        const groups = within(listbox).getAllByRole('group');
        expect(groups.map((group) => group.getAttribute('aria-label') || document.getElementById(group.getAttribute('aria-labelledby')).textContent)).toEqual(['Proyectos', 'Eventos', 'Revistas']);
        const [proyectos, eventos, revistas] = groups.map((group) => within(group).getAllByRole('option'));
        expect(proyectos).toHaveLength(6);
        expect(proyectos.at(-1).textContent).toBe(`Ver todos los resultados en Proyectos (${total})`);
        expect(eventos.map((o) => o.textContent)).toEqual([
            expect.stringContaining('Congreso IoT Cauca 2099'),
            expect.stringContaining('Feria IoT y Robótica 2099'),
            'Ver todos los resultados en Eventos (2)',
        ]);
        expect(revistas).toHaveLength(2);
        expect(revistas[0].textContent).toContain('Revista Colombiana de Sensores');
        expect(revistas.at(-1).textContent).toBe('Ver todos los resultados en Revistas (1)');
    });

    it('show a type badge, the title with the matched text in <mark> and one meta line', async () => {
        const user = await openApp();
        await openWithButton(user);
        await loaded();
        await search(user, 'sensores');
        const journal = options().find((option) => option.textContent.includes('Revista Colombiana de Sensores'));
        const badge = journal.querySelector('.badge');
        expect(badge.textContent).toBe('Revista');
        expect(Array.from(journal.querySelectorAll('mark')).map((mark) => mark.textContent)).toEqual(['Sensores']);
        expect(journal.textContent).toContain('Colombia · Cuartil Q3');

        await search(user, 'congreso iot');
        const [event] = options();
        expect(event.querySelector('.badge').textContent).toBe('Evento');
        expect(Array.from(event.querySelectorAll('mark')).map((mark) => mark.textContent)).toEqual(['Congreso', 'IoT']);
        expect(event.textContent).toContain('10–12 may 2099 · Popayán, Colombia');

        await search(user, 'gateway iot');
        const [project] = options();
        expect(project.querySelector('.badge').textContent).toBe('Proyecto');
        expect(project.textContent).toContain('Gateway IoT Multi-Protocolo para Edificio Inteligente');
        expect(project.textContent).toContain('SBC-IoT · Avanzado');
    });

    it('ignore accents and case', async () => {
        const user = await openApp();
        await openWithButton(user);
        await loaded();
        await search(user, 'ELECTRONICA aplicada');
        expect(optionNames().some((name) => name.includes('Revista de Electrónica Aplicada'))).toBe(true);
    });

    it('are announced as «N resultados» in a status region; one result is «1 resultado»', async () => {
        const user = await openApp();
        await openWithButton(user);
        await loaded();
        await search(user, 'colombia');
        const total = filterProjects(projects, { query: 'colombia' }).length + 2 + 1;
        expect(within(status()).getByText(`${total} resultados`)).toBeTruthy();
        await search(user, 'congreso iot');
        expect(within(status()).getByText('1 resultado')).toBeTruthy();
    });

    it('say so when nothing matches, and keep the combobox collapsed', async () => {
        const user = await openApp();
        const input = await openWithButton(user);
        await loaded();
        await search(user, 'zzzz');
        expect(within(dialog()).getByText('Sin resultados para «zzzz». Prueba con otro término.')).toBeTruthy();
        expect(screen.queryByRole('listbox')).toBeNull();
        expect(input.getAttribute('aria-expanded')).toBe('false');
        expect(input.hasAttribute('aria-activedescendant')).toBe(false);
        expect(within(status()).getByText('0 resultados')).toBeTruthy();
    });
});

describe('keyboard', () => {
    it('the combobox points at the listbox and at the active option, which starts at the first result', async () => {
        const user = await openApp();
        await openWithButton(user);
        await loaded();
        const input = await search(user, 'colombia');
        const listbox = screen.getByRole('listbox');
        expect(input.getAttribute('aria-expanded')).toBe('true');
        expect(input.getAttribute('aria-controls')).toBe(listbox.id);
        expect(input.getAttribute('aria-autocomplete')).toBe('list');
        const [first] = options();
        expect(input.getAttribute('aria-activedescendant')).toBe(first.id);
        expect(first.getAttribute('aria-selected')).toBe('true');
        expect(options().filter((o) => o.getAttribute('aria-selected') === 'true')).toHaveLength(1);
    });

    it('ArrowDown and ArrowUp move across the groups and wrap around; the focus stays in the input', async () => {
        const user = await openApp();
        await openWithButton(user);
        await loaded();
        const input = await search(user, 'colombia');
        const all = options();
        expect(all).toHaveLength(6 + 3 + 2);
        const active = () => document.getElementById(input.getAttribute('aria-activedescendant'));
        for (let i = 1; i < all.length; i++) {
            await user.keyboard('{ArrowDown}');
            expect(active(), `down ${i}`).toBe(all[i]);
        }
        expect(active().textContent).toBe('Ver todos los resultados en Revistas (1)');
        await user.keyboard('{ArrowDown}');
        expect(active()).toBe(all[0]);
        await user.keyboard('{ArrowUp}');
        expect(active()).toBe(all.at(-1));
        for (let i = 0; i < 2; i++) await user.keyboard('{ArrowUp}');
        expect(active()).toBe(all.at(-3));
        expect(active().closest('[role="group"]').getAttribute('aria-labelledby')).toBeTruthy();
        expect(document.activeElement).toBe(input);
    });

    it('typing again puts the active option back on the first result', async () => {
        const user = await openApp();
        await openWithButton(user);
        await loaded();
        const input = await search(user, 'colombia');
        await user.keyboard('{ArrowDown}{ArrowDown}');
        await user.type(input, ' ');
        expect(input.getAttribute('aria-activedescendant')).toBe(options()[0].id);
    });
});

describe('choosing a result', () => {
    const route = () => `${window.location.pathname}${window.location.search}`;

    it('Enter on a project opens its page and closes the dialog', async () => {
        const user = await openApp('/oportunidades');
        await openWithButton(user);
        await search(user, 'gateway iot multi-protocolo');
        await user.keyboard('{Enter}');
        expect(route()).toBe('/proyecto/proj_002');
        expect(screen.queryByRole('dialog')).toBeNull();
        expect(await screen.findByRole('heading', { level: 1, name: /Gateway IoT Multi-Protocolo/ })).toBeTruthy();
    });

    it('a click on a project does the same', async () => {
        const user = await openApp();
        await openWithButton(user);
        await search(user, 'gateway iot multi-protocolo');
        await user.click(options()[0]);
        expect(route()).toBe('/proyecto/proj_002');
        expect(screen.queryByRole('dialog')).toBeNull();
    });

    it('Enter on an event filters /eventos by its name, which shows that event', async () => {
        const user = await openApp();
        await openWithButton(user);
        await loaded();
        await search(user, 'robotica abierta');
        await user.keyboard('{Enter}');
        expect(route()).toBe('/eventos?q=Taller+de+Rob%C3%B3tica+Abierta');
        expect(screen.queryByRole('dialog')).toBeNull();
        expect(await screen.findByRole('heading', { level: 2, name: 'Taller de Robótica Abierta' })).toBeTruthy();
        expect(screen.queryByRole('heading', { level: 2, name: 'Congreso IoT Cauca 2099' })).toBeNull();
    });

    it('Enter on a journal opens the catalog tab of Dónde publicar searched by its name', async () => {
        const user = await openApp();
        await openWithButton(user);
        await loaded();
        await search(user, 'smart farming');
        await user.keyboard('{Enter}');
        expect(window.location.pathname).toBe('/donde-publicar');
        expect(new URLSearchParams(window.location.search).get('seccion') ?? 'catalogo').toBe('catalogo');
        const tab = await screen.findByRole('tab', { name: /Catálogo completo/ });
        expect(tab.getAttribute('aria-selected')).toBe('true');
        expect((await screen.findByRole('searchbox', { name: 'Buscar revista, tema o país' })).value).toBe('Journal of Smart Farming');
        expect(await screen.findByRole('heading', { level: 3, name: 'Journal of Smart Farming' })).toBeTruthy();
        expect(screen.queryByRole('heading', { level: 3, name: 'Revista Colombiana de Sensores' })).toBeNull();
    });

    it('choosing a journal while already on Dónde publicar switches to the catalog and applies the search', async () => {
        const user = await openApp(`/donde-publicar?p=${PROJECT_ID}`);
        await screen.findByRole('heading', { level: 1, name: /Monitoreo agrícola con MQTT/ });
        expect(screen.getByRole('tab', { name: /Revistas del proyecto/ }).getAttribute('aria-selected')).toBe('true');
        await openWithButton(user);
        await loaded();
        await search(user, 'electronica aplicada');
        await user.keyboard('{Enter}');
        await waitFor(() => expect(screen.getByRole('tab', { name: /Catálogo completo/ }).getAttribute('aria-selected')).toBe('true'));
        expect((await screen.findByRole('searchbox', { name: 'Buscar revista, tema o país' })).value).toBe('Revista de Electrónica Aplicada');
        expect(await screen.findByRole('heading', { level: 3, name: 'Revista de Electrónica Aplicada' })).toBeTruthy();
        expect(screen.queryByRole('heading', { level: 3, name: 'Journal of Smart Farming' })).toBeNull();
    });

    it('«Ver todos los resultados en Proyectos» opens /proyectos with the search applied', async () => {
        const user = await openApp('/oportunidades');
        await openWithButton(user);
        await search(user, 'colombia');
        await user.click(screen.getByRole('option', { name: /^Ver todos los resultados en Proyectos/ }));
        expect(route()).toBe('/proyectos?q=colombia');
        expect(screen.queryByRole('dialog')).toBeNull();
        const results = await screen.findByRole('region', { name: 'Resultados' });
        expect(within(results).getByRole('heading', { level: 2 }).textContent).toContain(String(filterProjects(projects, { query: 'colombia' }).length));
    });

    it('«Ver todos los resultados en Eventos» opens /eventos?q=…, and «…en Revistas» the catalog with the query', async () => {
        const user = await openApp('/oportunidades');
        await openWithButton(user);
        await loaded();
        await search(user, 'colombia');
        await user.click(screen.getByRole('option', { name: /^Ver todos los resultados en Eventos/ }));
        expect(route()).toBe('/eventos?q=colombia');
        expect(await screen.findByRole('heading', { level: 2, name: 'Feria IoT y Robótica 2099' })).toBeTruthy();

        await user.click(opener());
        await loaded();
        await search(user, 'colombia');
        await user.click(screen.getByRole('option', { name: /^Ver todos los resultados en Revistas/ }));
        expect(window.location.pathname).toBe('/donde-publicar');
        expect((await screen.findByRole('searchbox', { name: 'Buscar revista, tema o país' })).value).toBe('colombia');
        expect(await screen.findByRole('heading', { level: 3, name: 'Revista Colombiana de Sensores' })).toBeTruthy();
        expect(screen.queryByRole('heading', { level: 3, name: 'Journal of Smart Farming' })).toBeNull();
    });

    it('Enter with no results does nothing', async () => {
        const user = await openApp('/oportunidades');
        await openWithButton(user);
        await loaded();
        await search(user, 'zzzz');
        await user.keyboard('{Enter}');
        expect(route()).toBe('/oportunidades');
        expect(await screen.findByRole('dialog', { name: BUTTON })).toBeTruthy();
    });
});

describe('the catalog of Dónde publicar reads ?q', () => {
    it('/donde-publicar?seccion=catalogo&q=… opens the catalog already searched', async () => {
        await openApp('/donde-publicar?seccion=catalogo&q=sensores');
        expect((await screen.findByRole('searchbox', { name: 'Buscar revista, tema o país' })).value).toBe('sensores');
        expect(await screen.findByRole('heading', { level: 3, name: 'Revista Colombiana de Sensores' })).toBeTruthy();
        expect(screen.queryByRole('heading', { level: 3, name: 'Journal of Smart Farming' })).toBeNull();
    });

    it('/donde-publicar?q=… (no project: the catalog is the first section) searches the catalog too, as the address left by the global search does', async () => {
        await openApp('/donde-publicar?q=sensores');
        expect((await screen.findByRole('searchbox', { name: 'Buscar revista, tema o país' })).value).toBe('sensores');
        expect(await screen.findByRole('heading', { level: 3, name: 'Revista Colombiana de Sensores' })).toBeTruthy();
        expect(screen.queryByRole('heading', { level: 3, name: 'Journal of Smart Farming' })).toBeNull();
    });

    it('with a project the page still opens on its journals and ?q keeps searching them, not the catalog', async () => {
        await openApp(`/donde-publicar?p=${PROJECT_ID}&q=farming`);
        expect((await screen.findByRole('searchbox', { name: 'Buscar revista, tema o país', hidden: true })).value).toBe('');
        expect(screen.getByRole('tab', { name: /Revistas del proyecto/ }).getAttribute('aria-selected')).toBe('true');
    });

    it('without ?q the catalog still lists every journal', async () => {
        await openApp('/donde-publicar');
        expect(await screen.findAllByRole('heading', { level: 3 })).toHaveLength(3);
    });
});

describe('closing', () => {
    it('Esc closes it and gives the focus back to the button that opened it', async () => {
        const user = await openApp();
        await openWithButton(user);
        await user.keyboard('{Escape}');
        expect(screen.queryByRole('dialog')).toBeNull();
        await waitFor(() => expect(document.activeElement).toBe(opener()));
    });

    it('Esc gives the focus back to the element that had it when Ctrl+K was pressed', async () => {
        const user = await openApp();
        const link = within(screen.getByRole('navigation', { name: 'Principal' })).getByRole('link', { name: 'Dónde publicar' });
        link.focus();
        await user.keyboard('{Control>}k{/Control}');
        // The dialog is a lazy chunk (T16): wait until it is there instead of assuming it already is.
        await screen.findByRole('dialog', { name: BUTTON });
        await waitFor(() => expect(combobox()).toBe(document.activeElement));
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByRole('dialog', { name: BUTTON })).toBeNull());
        await waitFor(() => expect(document.activeElement).toBe(link));
    });

    it('Esc with nothing focused (opened with «/») leaves the focus on the Buscar button', async () => {
        const user = await openApp();
        await user.keyboard('/');
        await screen.findByRole('dialog', { name: BUTTON }); // a lazy chunk (T16): Esc has to find the dialog open
        await user.keyboard('{Escape}');
        await waitFor(() => expect(document.activeElement).toBe(opener()));
    });

    it('the Cerrar button and a click on the backdrop close it too', async () => {
        const user = await openApp();
        await openWithButton(user);
        await user.click(within(dialog()).getByRole('button', { name: 'Cerrar' }));
        expect(screen.queryByRole('dialog')).toBeNull();
        await user.click(opener());
        fireEvent.mouseDown(dialog().parentElement);
        expect(screen.queryByRole('dialog')).toBeNull();
        await user.click(opener());
        fireEvent.mouseDown(combobox());
        expect(screen.queryByRole('dialog')).not.toBeNull();
    });

    it('Tab and Shift+Tab keep the focus inside the dialog', async () => {
        const user = await openApp();
        await openWithButton(user);
        await loaded();
        await search(user, 'colombia');
        const box = dialog();
        for (let i = 0; i < 8; i++) {
            await user.tab();
            expect(box.contains(document.activeElement), `Tab ${i + 1}`).toBe(true);
        }
        for (let i = 0; i < 8; i++) {
            await user.tab({ shift: true });
            expect(box.contains(document.activeElement), `Shift+Tab ${i + 1}`).toBe(true);
        }
    });

    it('the query is empty again when it is reopened', async () => {
        const user = await openApp();
        await openWithButton(user);
        await search(user, 'colombia');
        await user.keyboard('{Escape}');
        await user.click(opener());
        expect(combobox().value).toBe('');
    });
});

describe('loading and failures', () => {
    it('shows «Cargando eventos y revistas…» while they download, and projects can already be searched', async () => {
        const events = deferred();
        const catalog = deferred();
        const user = await openApp('/proyectos', (path) => (path === EVENTS ? events.promise : path === CATALOG ? catalog.promise : undefined));
        await openWithButton(user);
        expect(within(status()).getByText('Cargando eventos y revistas…')).toBeTruthy();
        await search(user, 'gateway iot');
        expect(optionNames().some((name) => name.includes('Gateway IoT Multi-Protocolo'))).toBe(true);
        expect(within(status()).getByText('Cargando eventos y revistas…')).toBeTruthy();
        events.resolve(json(eventosFixture));
        catalog.resolve(json(publicarFixture.journals));
        await waitFor(() => expect(within(dialog()).queryByText('Cargando eventos y revistas…')).toBeNull());
    });

    it('a failed events file keeps projects and journals and says so', async () => {
        const user = await openApp('/proyectos', (path) => (path === EVENTS ? failure : undefined));
        await openWithButton(user);
        expect(await within(dialog()).findByText('No se pudieron cargar los eventos. Se muestran proyectos y revistas.')).toBeTruthy();
        await search(user, 'colombia');
        const groups = within(screen.getByRole('listbox')).getAllByRole('group');
        expect(groups).toHaveLength(2);
        expect(optionNames().some((name) => name.includes('Revista Colombiana de Sensores'))).toBe(true);
    });

    it('a failed journal file keeps projects and events and says so', async () => {
        const user = await openApp('/proyectos', (path) => (path === CATALOG ? failure : undefined));
        await openWithButton(user);
        expect(await within(dialog()).findByText('No se pudieron cargar las revistas. Se muestran proyectos y eventos.')).toBeTruthy();
        await search(user, 'colombia');
        expect(optionNames().some((name) => name.includes('Congreso IoT Cauca 2099'))).toBe(true);
        expect(optionNames().some((name) => name.includes('Revista Colombiana'))).toBe(false);
    });

    it('both files failing leaves projects only; «Reintentar» downloads them again', async () => {
        let broken = true;
        const user = await openApp('/proyectos', (path) => (broken && (path === CATALOG || path === EVENTS) ? failure : undefined));
        await openWithButton(user);
        expect(await within(dialog()).findByText('No se pudieron cargar los eventos ni las revistas. Se muestran solo proyectos.')).toBeTruthy();
        await search(user, 'colombia');
        expect(within(screen.getByRole('listbox')).getAllByRole('group')).toHaveLength(1);
        broken = false;
        await user.click(within(dialog()).getByRole('button', { name: 'Reintentar' }));
        await waitFor(() => expect(within(dialog()).queryByText(/No se pudieron cargar/)).toBeNull());
        await waitFor(() => expect(within(screen.getByRole('listbox')).getAllByRole('group')).toHaveLength(3));
    });
});
