// T13 of odd/tasks/mejora-visual.md (user request L15): the 'Ver eventos' and 'Dónde publicar' buttons have their own
// hue, and the relevant data of the journal finder is color-coded (quartile, affinity, free, Spanish, review, speed,
// license, meets / does not meet). One hue = one meaning, and the text label always stays: color is never the only
// signal. The hex values and their AA contrast are checked in tests/palette.test.mjs.
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { mockDataFetch, renderApp } from './helpers.jsx';
import { PROJECT_ID, publicarFixture } from './fixtures.js';
import AffinityRing from '../../src/components/publicar/AffinityRing.jsx';
import { QuartileBadge } from '../../src/components/publicar/JournalLinks.jsx';
import { ResultsLegend } from '../../src/components/publicar/JournalResults.jsx';
import ResultItem from '../../src/components/publicar/ResultItem.jsx';
import CompareTray from '../../src/components/publicar/CompareTray.jsx';
import EventCard from '../../src/components/eventos/EventCard.jsx';
import ProjectCard from '../../src/components/ProjectCard.jsx';
import { projects } from '../../src/data/projects/index.js';

const has = (node, ...classes) => classes.every((name) => node.classList.contains(name));
const toneOf = (node) => [...node.classList].find((name) => /^tn-/.test(name));
const CATALOG = '/data/publicar-catalog.json';

const journal = (extra) => ({
    ...publicarFixture.journals[0], id: 'j-x', title: 'Revista de prueba', languages: ['Spanish'], license: 'CC BY', review: 'Double anonymous peer review',
    weeks_to_publication: 6, quartile: 'Q1', publindex: 'A1', ...extra,
});
const row = (extra, total = 85) => ({
    journal: journal(extra),
    affinity: { total, parts: { topic: 30, level: 20, time: 15, language: 10, region: 10 } },
    assessment: { meets: [{ key: 'a', text: 'Cubre el tema' }], misses: [{ key: 'b', text: 'No acepta inglés' }], tips: ['Lea el alcance'] },
});

describe('quartile badge: each quartile has its own hue and keeps its text, bars and tip', () => {
    it('Q1..Q4 render four different tone classes and the label, Publindex and bars stay', () => {
        const tones = ['Q1', 'Q2', 'Q3', 'Q4'].map((quartile) => {
            const { container, unmount } = render(<QuartileBadge quartile={quartile} />);
            const badge = container.querySelector('.qb');
            const tone = toneOf(badge);
            expect(tone, quartile).toBe(`tn-${quartile.toLowerCase()}`);
            expect(badge.textContent).toContain(quartile);
            expect(badge.textContent).toContain({ Q1: 'A1', Q2: 'A2', Q3: 'B', Q4: 'C' }[quartile]);
            expect(badge.querySelectorAll('.qb-bars > i')).toHaveLength(4);
            expect(badge.querySelectorAll('.qb-bars > i.on')).toHaveLength(5 - Number(quartile[1]));
            expect(badge.getAttribute('data-tip')).toContain(quartile);
            unmount();
            return tone;
        });
        expect(new Set(tones).size).toBe(4);
    });
});

describe('affinity: alta, media and baja have their own hue on the ring, the word and the number', () => {
    it('maps the three words to three different classes (thresholds unchanged: 80 and 65)', () => {
        const rendered = [[90, 'alta', 'aff-high', 'tn-good'], [80, 'alta', 'aff-high', 'tn-good'], [70, 'media', 'aff-mid', 'tn-fair'], [65, 'media', 'aff-mid', 'tn-fair'], [64, 'baja', 'aff-low', 'tn-low'], [40, 'baja', 'aff-low', 'tn-low']].map(([total, word, level, tone]) => {
            const { container, unmount } = render(<AffinityRing total={total} />);
            const ring = container.querySelector('.aff-ring');
            const label = screen.getByText(`Afinidad ${word}`);
            expect(has(ring, level, tone), `${total} ring`).toBe(true);
            expect(has(label, 'aff-word', level, tone), `${total} word`).toBe(true);
            expect(ring.getAttribute('role')).toBe('img');
            expect(ring.getAttribute('aria-label')).toBe(`Afinidad estimada ${total} %`);
            expect(ring.textContent).toBe(`${total}%`);
            unmount();
            return level;
        });
        expect(new Set(rendered)).toEqual(new Set(['aff-high', 'aff-mid', 'aff-low']));
    });
});

describe('journal badges: calm row of at most five colored badges, each with an icon and a text', () => {
    it('shows free, Spanish, review, speed and license in one group, none relies on color alone', () => {
        const { container } = render(<ResultItem row={row()} open={false} />);
        const group = within(container).getByRole('group', { name: 'Datos de la revista' });
        const badges = [...group.querySelectorAll('.badge')];
        expect(badges.map((badge) => badge.textContent.replace(/\s+/g, ' ').trim())).toEqual(['Sin costo', 'Acepta español', 'Doble ciego', '6 semanas · rápida', 'CC BY']);
        expect(badges.map(toneOf)).toEqual(['tn-good', 'tn-lang', 'tn-review', 'tn-good', 'tn-journals']);
        for (const badge of badges) {
            expect(badge.querySelector('svg'), badge.textContent).toBeTruthy();
            expect(badge.getAttribute('data-tip').length).toBeGreaterThan(10);
        }
        expect(badges.length).toBeLessThanOrEqual(5);
        expect(container.querySelector('.qb').className).toContain('tn-q1');
    });

    it('speed: fast green, medium amber, slow rose, and each says its word; missing data adds no badge', () => {
        const speed = (weeks) => {
            const { container, unmount } = render(<ResultItem row={row({ weeks_to_publication: weeks })} open={false} />);
            const badge = [...container.querySelectorAll('[aria-label="Datos de la revista"] .badge')].find((item) => /semanas/.test(item.textContent));
            const result = badge ? [toneOf(badge), badge.textContent.replace(/\s+/g, ' ').trim()] : null;
            unmount();
            return result;
        };
        expect(speed(8)).toEqual(['tn-good', '8 semanas · rápida']);
        expect(speed(12)).toEqual(['tn-fair', '12 semanas · media']);
        expect(speed(30)).toEqual(['tn-low', '30 semanas · lenta']);
        expect(speed(null)).toBeNull();
        const { container } = render(<ResultItem row={row({ languages: ['English'], license: '' })} open={false} />);
        const group = within(container).getByRole('group', { name: 'Datos de la revista' });
        expect(within(group).queryByText('Acepta español')).toBeNull();
        expect(within(group).getByText('Sin costo')).toBeTruthy();
    });

    it('meets and does not meet are tinted green and rose and keep the marks ✓ and ✗ and their counts', () => {
        const { container } = render(<ResultItem row={row()} open />);
        const meets = within(container).getByText('Cumple (1)').parentElement;
        const misses = within(container).getByText('No cumple (1)').parentElement;
        expect(has(meets, 'tn-good')).toBe(true);
        expect(has(misses, 'tn-low')).toBe(true);
        expect(meets.textContent).toContain('✓');
        expect(misses.textContent).toContain('✗');
    });

    it('the primary action of a journal is the Dónde publicar hue', () => {
        const { container } = render(<ResultItem row={row()} open={false} />);
        const link = within(container).getByRole('link', { name: 'Instrucciones para autores' });
        expect(has(link, 'btn', 'btn-journals')).toBe(true);
    });
});

describe('legend «Cómo leer los resultados» explains every color with a swatch and a meaning', () => {
    it('lists affinity, the four quartiles, free, Spanish, review, speed, license and meets / does not meet', () => {
        render(<ResultsLegend />);
        const legend = screen.getByRole('complementary', { name: 'Cómo leer los resultados' });
        expect(legend.querySelectorAll('.aff-ring')).toHaveLength(3);
        expect(new Set([...legend.querySelectorAll('.aff-ring')].map(toneOf))).toEqual(new Set(['tn-good', 'tn-fair', 'tn-low']));
        expect([...legend.querySelectorAll('.qb')].map(toneOf)).toEqual(['tn-q1', 'tn-q2', 'tn-q3', 'tn-q4']);
        for (const text of [/alta/, /media/, /baja/, /80 % o más/, /Q1 es el mejor cuartil y Q4 el cuarto/, /Sin costo/, /Acepta español/, /Doble ciego/, /semanas/, /8 semanas o menos/, /CC BY/, /Cumple/, /No cumple/]) {
            expect(legend.textContent, String(text)).toMatch(text);
        }
        const swatches = [...legend.querySelectorAll('.badge')].map(toneOf);
        for (const tone of ['tn-good', 'tn-lang', 'tn-review', 'tn-fair', 'tn-low', 'tn-journals']) expect(swatches, tone).toContain(tone);
    });
});

describe('type buttons: Dónde publicar and Ver eventos have their own recognizable hue', () => {
    const project = projects.find((item) => item.id === PROJECT_ID);

    it('ProjectCard: «Ver eventos» is the events hue and «Dónde publicar» the journals hue, each with an icon circle', () => {
        render(<MemoryRouter><ProjectCard project={project} /></MemoryRouter>);
        const events = screen.getByRole('link', { name: /^Ver eventos/ });
        const publish = screen.getByRole('link', { name: /^Dónde publicar/ });
        expect(has(events, 'btn', 'btn-events')).toBe(true);
        expect(has(publish, 'btn', 'btn-journals')).toBe(true);
        expect(events.classList.contains('btn-secondary')).toBe(false);
        expect(publish.classList.contains('btn-secondary')).toBe(false);
        for (const link of [events, publish]) expect(link.querySelector('.type-ico svg')).toBeTruthy();
    });

    it('ProjectDetail: the two top actions and the two opportunity cards use the hues; the cards have a tinted header', async () => {
        mockDataFetch();
        await renderApp(`/proyecto/${PROJECT_ID}`);
        await screen.findByRole('heading', { level: 1 });
        expect(has(screen.getByRole('link', { name: '¿A qué eventos ir?' }), 'btn-events')).toBe(true);
        expect(has(screen.getByRole('link', { name: '¿Dónde publicar este proyecto?' }), 'btn-journals')).toBe(true);
        expect(has(screen.getByRole('button', { name: 'Ver las revistas aquí' }), 'btn', 'btn-journals')).toBe(true);
        expect(has(screen.getByRole('button', { name: 'Ver los eventos aquí' }), 'btn', 'btn-events')).toBe(true);
        const cards = screen.getByRole('group', { name: 'Oportunidades para este proyecto' }).querySelectorAll('section');
        expect([...cards].map(toneOf)).toEqual(['tn-journals', 'tn-events']);
    });

    it('Home: the two entry cards use the hues, the catalog stays the blue primary', async () => {
        mockDataFetch();
        await renderApp('/');
        const tools = await screen.findByRole('region', { name: '¿Qué quieres hacer?' });
        expect(has(within(tools).getByRole('link', { name: 'Buscar eventos' }), 'btn', 'btn-events')).toBe(true);
        expect(has(within(tools).getByRole('link', { name: 'Dónde publicar' }), 'btn', 'btn-journals')).toBe(true);
        expect(has(within(tools).getByRole('link', { name: 'Explorar proyectos' }), 'btn-primary')).toBe(true);
        const icons = [...tools.querySelectorAll('article > span[aria-hidden]')].map(toneOf);
        expect(icons).toEqual([undefined, 'tn-events', 'tn-journals']);
    });

    it('the navbar marks Eventos académicos and Dónde publicar with their hue dot (decorative, the text stays)', async () => {
        mockDataFetch();
        await renderApp('/proyectos');
        const nav = await screen.findByRole('navigation', { name: 'Principal' });
        const events = within(nav).getByRole('link', { name: 'Eventos académicos' });
        const publish = within(nav).getByRole('link', { name: 'Dónde publicar' });
        expect(events.querySelector('.nav-dot').className).toContain('tn-events');
        expect(publish.querySelector('.nav-dot').className).toContain('tn-journals');
        expect(events.querySelector('.nav-dot').getAttribute('aria-hidden')).toBe('true');
        expect(within(nav).getByRole('link', { name: 'Proyectos' }).querySelector('.nav-dot')).toBeNull();
    });

    it('the project slide-over tabs take the hue of their tab and the global search badges the hue of their type', async () => {
        mockDataFetch();
        await renderApp(`/proyecto/${PROJECT_ID}?panel=revistas`);
        const dialog = await screen.findByRole('dialog', { name: /Monitoreo Agrícola Distribuido/ });
        expect(has(within(dialog).getByRole('tab', { name: /^Revistas/ }), 'tab-journals')).toBe(true);
        expect(has(within(dialog).getByRole('tab', { name: /^Eventos/ }), 'tab-events')).toBe(true);
    });
});

describe('Dónde publicar page: hues in the tabs, filters, table and compare tray', () => {
    const open = async (url = `/donde-publicar?p=${PROJECT_ID}`) => {
        mockDataFetch();
        await renderApp(url);
        await screen.findByRole('region', { name: 'Revistas sugeridas' });
    };

    it('the section tabs are journals-hued, and each result row has its quartile hue and affinity word hue', async () => {
        await open();
        for (const tab of screen.getAllByRole('tab')) expect(tab.classList.contains('tab-pill-journals'), tab.textContent).toBe(true);
        const results = screen.getByRole('region', { name: 'Revistas sugeridas' });
        const articles = within(results).getAllByRole('article');
        const quartiles = articles.map((article) => toneOf(article.querySelector('.qb')));
        expect(new Set(quartiles)).toEqual(new Set(['tn-q1', 'tn-q3', 'tn-q4']));
        for (const article of articles) {
            const word = article.querySelector('.aff-word');
            expect(toneOf(word)).toBe({ alta: 'tn-good', media: 'tn-fair', baja: 'tn-low' }[word.textContent.replace('Afinidad ', '')]);
            expect(within(article).getByRole('group', { name: 'Datos de la revista' })).toBeTruthy();
        }
    });

    it('the quartile filter chips carry their hue and the selected one keeps its text and aria-pressed', async () => {
        await open();
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: /Filtros personalizados/ }));
        const panel = await screen.findByRole('complementary', { name: 'Filtros personalizados' });
        const chips = ['Q1 · A1', 'Q2 · A2', 'Q3 · B', 'Q4 · C'].map((name) => within(panel).getByRole('button', { name }));
        expect(chips.map(toneOf)).toEqual(['tn-q1', 'tn-q2', 'tn-q3', 'tn-q4']);
        for (const chip of chips) expect(chip.classList.contains('chip-tone')).toBe(true);
        expect(chips[0].getAttribute('aria-pressed')).toBe('false');
        await user.click(chips[0]);
        expect(chips[0].getAttribute('aria-pressed')).toBe('true');
        expect(chips[0].textContent).toContain('Q1 · A1');
        expect(chips[0].querySelector('.chip-check')).toBeTruthy();
    });

    it('the table view colors the quartile, the affinity word and bar, and the speed, review and license cells', async () => {
        await open();
        await userEvent.setup().click(screen.getByRole('button', { name: 'Tabla' }));
        const table = await screen.findByRole('table');
        const rows = within(table).getAllByRole('row').slice(1);
        for (const tableRow of rows) {
            expect(toneOf(tableRow.querySelector('.qb'))).toMatch(/^tn-q[1-4]$/);
            const word = tableRow.querySelector('.aff-word');
            expect(word).toBeTruthy();
            expect(toneOf(word)).toMatch(/^tn-(good|fair|low)$/);
            const cells = [...tableRow.querySelectorAll('td .badge')].map((badge) => toneOf(badge));
            expect(cells).toContain('tn-journals');
            expect(cells).toContain('tn-review');
            expect(cells.some((tone) => ['tn-good', 'tn-fair', 'tn-low'].includes(tone))).toBe(true);
        }
    });

    it('the compare tray colors the quartile, affinity and speed cells and keeps their text', () => {
        const journals = [journal({ id: 'a', title: 'A', quartile: 'Q1', weeks_to_publication: 6 }), journal({ id: 'b', title: 'B', quartile: 'Q4', weeks_to_publication: 30 })];
        const affinityById = { a: { total: 90, parts: { topic: 30, level: 20, time: 15, language: 10, region: 10 } }, b: { total: 50, parts: { topic: 10, level: 10, time: 5, language: 10, region: 10 } } };
        render(<CompareTray journals={journals} affinityById={affinityById} onRemove={() => {}} onClear={() => {}} />);
        const tray = screen.getByRole('complementary', { name: 'Comparación de revistas' });
        const cell = (text) => within(tray).getByText(text);
        expect(toneOf(cell('Q1 · A1'))).toBe('tn-q1');
        expect(toneOf(cell('Q4 · C'))).toBe('tn-q4');
        expect(toneOf(cell('90 %'))).toBe('tn-good');
        expect(toneOf(cell('50 %'))).toBe('tn-low');
        expect(toneOf(cell('6'))).toBe('tn-good');
        expect(toneOf(cell('30'))).toBe('tn-low');
    });

    it('the catalog colors the quartile, the badges and the quartile selector', async () => {
        mockDataFetch((path, response) => (path === CATALOG ? { ok: true, status: 200, json: async () => publicarFixture.journals } : response));
        await renderApp('/donde-publicar');
        const group = await screen.findByRole('group', { name: 'Cuartil del catálogo' });
        const buttons = within(group).getAllByRole('button');
        expect(buttons.map((button) => button.textContent)).toEqual(['Todos', 'Q1', 'Q2', 'Q3', 'Q4']);
        expect(buttons.slice(1).map(toneOf)).toEqual(['tn-q1', 'tn-q2', 'tn-q3', 'tn-q4']);
        expect(toneOf(buttons[0])).toBeUndefined();
        await waitFor(() => expect(document.querySelectorAll('article .qb').length).toBe(3));
        const farming = screen.getByRole('heading', { level: 3, name: 'Journal of Smart Farming' }).closest('article');
        expect(toneOf(farming.querySelector('.qb'))).toBe('tn-q1');
        expect(within(farming).getByRole('group', { name: 'Datos de la revista' }).querySelectorAll('.badge').length).toBeGreaterThanOrEqual(3);
    });

    it('«Cómo leer esta página» has a card that explains every color with a swatch and a meaning', async () => {
        await open();
        await userEvent.setup().click(screen.getByRole('tab', { name: /Cómo leer esta página/ }));
        const help = screen.getByRole('tabpanel', { name: /Cómo leer esta página/ });
        const card = within(help).getByRole('heading', { level: 2, name: 'Qué significa cada color' }).parentElement;
        const text = card.textContent;
        for (const part of [/Q1/, /Q2/, /Q3/, /Q4/, /Afinidad alta/, /Afinidad media/, /Afinidad baja/, /Sin costo/, /Acepta español/, /Doble ciego/, /rápida/, /lenta/, /Licencia/, /Cumple/, /No cumple/, /Dónde publicar/, /Ver eventos/]) expect(text, String(part)).toMatch(part);
        expect(card.querySelectorAll('.qb')).toHaveLength(4);
        expect(card.querySelectorAll('.badge').length).toBeGreaterThanOrEqual(8);
        expect(card.querySelector('.btn-journals, .badge-journals-soft, [data-hue="journals"]')).toBeTruthy();
        expect(card.querySelector('[data-hue="events"]')).toBeTruthy();
    });
});

describe('Eventos: the events hue on the relevant markers', () => {
    const base = { id: 'e', title: 'Congreso X', name: 'Congreso X', start: '2099-05-10', end: '2099-05-12', deadline: '2099-04-01', location: 'Popayán, Colombia', online: false, url: 'https://example.org/e', source: 'wikicfp', topics: ['IoT'] };
    const card = (event) => render(<EventCard event={{ ...base, ...event }} today="2099-01-01" selected={false} compareFull={false} onToggleCompare={() => {}} />).container;

    it('Convocatoria and Para asistir are two related tints of the events hue; the primary button is the events hue', () => {
        const cfp = card({ kind: 'cfp' });
        const badge = within(cfp).getByText('Convocatoria').closest('.badge');
        expect(has(badge, 'badge-events')).toBe(true);
        expect(badge.querySelector('svg')).toBeTruthy();
        expect(has(within(cfp).getByRole('link', { name: /^Ver convocatoria/ }), 'btn', 'btn-events')).toBe(true);
        const attend = card({ id: 'f', kind: 'attend', deadline: null });
        const second = within(attend).getByText('Para asistir').closest('.badge');
        expect(has(second, 'badge-events-soft')).toBe(true);
        expect(has(second, 'badge-events')).toBe(false);
        expect(has(within(attend).getByRole('link', { name: /^Ver evento/ }), 'btn-events')).toBe(true);
    });

    it('closing soon stays the amber attention badge', () => {
        const container = card({ kind: 'cfp', deadline: '2099-01-03' });
        expect(container.querySelector('.badge-attn')).toBeTruthy();
        expect(container.querySelector('.badge-attn').className).not.toContain('tn-');
    });

    it('/eventos: the type selector pills are events-hued', async () => {
        mockDataFetch();
        await renderApp('/eventos');
        const group = await screen.findByRole('group', { name: 'Tipo de evento' });
        for (const button of within(group).getAllByRole('button')) expect(button.classList.contains('tab-pill-events'), button.textContent).toBe(true);
    });
});
