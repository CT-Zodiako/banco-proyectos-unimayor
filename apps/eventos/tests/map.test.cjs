const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const filters = require('../site/filters.js');

function render(events, generated = undefined) {
  class Node {
    constructor(tag = 'div') { this.tagName = tag; this.children = []; this.attrs = {}; this.dataset = {}; this.hidden = false; this.value = ''; this.firstChild = null; }
    setAttribute(k, v) { this.attrs[k] = String(v); }
    appendChild(n) { this.children.push(n); this.firstChild = this.children[0]; return n; }
    append(...nodes) { nodes.forEach(n => this.appendChild(n)); }
    replaceChildren(...nodes) { this.children = []; this.append(...nodes); }
    addEventListener() {}
    focus() {}
    before() {}
  }
  const nodes = new Map();
  const document = {
    createElement: tag => new Node(tag), createTextNode: text => ({ textContent: text }),
    querySelector: selector => { if (!nodes.has(selector)) nodes.set(selector, new Node()); return nodes.get(selector); },
    querySelectorAll: () => [], head: new Node(),
  };
  const window = { EVFilters: filters, EVENTOS: { events, topics: [], projects: [], generated }, location: { search: '', pathname: '/eventos/' }, history: { replaceState() {} } };
  vm.runInNewContext(fs.readFileSync(require.resolve('../site/app.js'), 'utf8'), { window, document, URL, Date, Map });
  const cards = nodes.get('#results').children;
  cards.statusDate = nodes.get('#data-status-date').textContent;
  return cards;
}
const event = (location, online = false) => ({ title: 'Congreso', kind: 'attend', start: '2099-01-01', end: '2099-01-02', location, online, topics: [], source: 'manual', url: 'https://example.org/event' });
function all(node) { return [node, ...(node.children || []).flatMap(all)]; }

test('physical and hybrid locations link to a safely encoded Google Maps search', () => {
  const cards = render([event('Pasto, Colombia', true), event('Bogotá & Cauca, Colombia')]);
  for (const [card, location] of cards.map((c, i) => [c, ['Pasto, Colombia', 'Bogotá & Cauca, Colombia'][i]])) {
    const links = all(card).filter(n => n.tagName === 'a');
    const map = links.find(n => n.textContent === 'Ver mapa ampliado');
    assert.ok(map);
    const url = new URL(map.attrs.href);
    assert.equal(url.origin, 'https://www.google.com');
    assert.equal(url.pathname, '/maps/search/');
    assert.equal(url.searchParams.get('api'), '1');
    assert.equal(url.searchParams.get('query'), location);
    assert.equal(map.attrs.target, '_blank');
    assert.equal(map.attrs.rel, 'noopener noreferrer');
    assert.ok(links.some(n => n.attrs.href === 'https://example.org/event'));
  }
});

test('the data generation date is shown, with a fallback when missing', () => {
  assert.equal(render([], '2026-10-31').statusDate, 'Listado generado el 31 oct 2026.');
  assert.equal(render([]).statusDate, 'Fecha de generación no disponible.');
});

test('the published location appears only once on the card', () => {
  const card = render([event('Pasto, Colombia')])[0];
  assert.equal(all(card).filter(n => n.textContent === 'Pasto, Colombia').length, 1);
});

test('online and unconfirmed locations do not link to a map', () => {
  for (const card of render([event(null, true), event('Online', true), event('Por confirmar'), event(null)])) {
    assert.ok(!all(card).some(n => n.textContent === 'Ver mapa ampliado'));
  }
});

function memoryStorage(initial = null, failWrites = false) {
  let value = initial;
  return { getItem: () => value, setItem: (_, next) => { if (failWrites) throw new Error('QuotaExceededError'); value = next; }, value: () => value };
}

/* Renders cards with clickable listeners and the real opportunities.js module loaded through import(). */
function renderInteractive(events, localStorage = memoryStorage(), { failImport = false } = {}) {
  class Node {
    constructor(tag = 'div') { this.tagName = tag; this.children = []; this.attrs = {}; this.dataset = {}; this.listeners = {}; this.hidden = false; this.disabled = false; this.value = ''; this.firstChild = null; }
    setAttribute(k, v) { this.attrs[k] = String(v); }
    appendChild(n) { this.children.push(n); this.firstChild = this.children[0]; return n; }
    append(...nodes) { nodes.forEach(n => this.appendChild(n)); }
    replaceChildren(...nodes) { this.children = []; this.append(...nodes); }
    addEventListener(type, listener) { this.listeners[type] = listener; }
    click() { this.listeners.click(); }
    focus() {}
    before() {}
  }
  const nodes = new Map();
  const document = {
    createElement: tag => new Node(tag), createTextNode: text => ({ textContent: text }),
    querySelector: selector => { if (!nodes.has(selector)) nodes.set(selector, new Node()); return nodes.get(selector); },
    querySelectorAll: () => [], head: new Node(),
  };
  const window = { EVFilters: filters, EVENTOS: { events, topics: [], projects: [] }, location: { search: '', pathname: '/eventos/' }, history: { replaceState() {} } };
  const file = require.resolve('../site/app.js');
  const script = new vm.Script(fs.readFileSync(file, 'utf8'), { filename: file, importModuleDynamically: failImport ? () => Promise.reject(new Error('blocked')) : vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER });
  script.runInNewContext({ window, document, localStorage, URL, Date, Map });
  return nodes;
}

/* app.js marks data-favorite-ready once the import settles; waiting on it avoids racing the click listener. */
async function favoriteSettled(button) {
  const deadline = Date.now() + 2000;
  while (button.dataset.favoriteReady === undefined) {
    if (Date.now() > deadline) throw new Error('The favorite button never set data-favorite-ready.');
    await new Promise(resolve => setTimeout(resolve, 5));
  }
}

async function renderFavorite(localStorage) {
  const nodes = renderInteractive([{ ...event('Pasto, Colombia'), id: 'ev1' }], localStorage);
  const button = all(nodes.get('#results').children[0]).find(n => (n.attrs['aria-label'] || '').startsWith('Guardar Congreso'));
  await favoriteSettled(button);
  return button;
}

test('the favorite button has its own class, separate from the comparison button', async () => {
  const button = await renderFavorite(memoryStorage());
  assert.equal(button.dataset.favoriteReady, 'true');
  assert.ok(button.className.split(' ').includes('favorite-button'));
  assert.ok(!button.className.split(' ').includes('compare-button'));
});

test('the favorite button saves the event, then removes it on a second click', async () => {
  const storage = memoryStorage();
  const button = await renderFavorite(storage);
  assert.equal(button.textContent, 'Guardar');
  button.click();
  assert.equal(button.textContent, 'Guardado');
  const saved = JSON.parse(storage.value());
  assert.equal(saved.length, 1);
  assert.equal(saved[0].type, 'event');
  assert.equal(saved[0].id, 'ev1');
  assert.equal(saved[0].title, 'Congreso');
  assert.equal(saved[0].url, 'https://example.org/event');
  button.click();
  assert.equal(button.textContent, 'Guardar');
  assert.deepEqual(JSON.parse(storage.value()), []);
});

test('a storage failure leaves the saved favorites untouched', async () => {
  const before = JSON.stringify([{ type: 'journal', id: 'j1', title: 'Revista' }]);
  const storage = memoryStorage(before, true);
  const button = await renderFavorite(storage);
  assert.equal(button.textContent, 'Guardar');
  button.click();
  assert.equal(button.textContent, 'No se pudo guardar');
  assert.equal(storage.value(), before);
});

test('a favorite button whose module fails to load is marked as settled and disabled', async () => {
  const nodes = renderInteractive([{ ...event('Pasto, Colombia'), id: 'ev1' }], memoryStorage(), { failImport: true });
  const button = all(nodes.get('#results').children[0]).find(n => (n.attrs['aria-label'] || '').startsWith('Guardar Congreso'));
  await favoriteSettled(button);
  assert.equal(button.dataset.favoriteReady, 'false');
  assert.equal(button.textContent, 'Favoritos no disponibles');
  assert.equal(button.disabled, true);
  assert.equal(button.listeners.click, undefined);
});

function compareAndRead(nodes, titles) {
  for (const title of titles) {
    const button = all({ children: nodes.get('#results').children }).find(n => n.attrs && n.attrs['aria-label'] === `Comparar ${title}`);
    button.click();
  }
  const head = nodes.get('#comparison-head').children[0].children.slice(1).map(n => n.textContent);
  const rows = Object.fromEntries(nodes.get('#comparison-body').children.map(row => [row.children[0].textContent, row.children.slice(1).map(n => n.textContent)]));
  return { head, rows };
}

test('the comparison table lists the selected events in selection order', () => {
  const events = [{ ...event('Pasto, Colombia'), id: 'a', title: 'Primero' }, { ...event('Lima, Perú'), id: 'b', title: 'Segundo' }];
  const nodes = renderInteractive(events);
  const { head } = compareAndRead(nodes, ['Segundo', 'Primero']);
  assert.deepEqual(head, ['Segundo', 'Primero']);
  assert.equal(nodes.get('#comparison').hidden, false);
  const pressed = all({ children: nodes.get('#results').children }).filter(n => n.attrs && n.attrs['aria-pressed'] === 'true');
  assert.equal(pressed.length, 2);
  assert.ok(pressed.every(n => n.textContent === 'Quitar de comparación'));
});

test('the comparison modality row never claims a modality the data does not prove', () => {
  const online = [{ ...event(null, true), id: 'a', title: 'Solo virtual' }, { ...event('Online', true), id: 'b', title: 'Virtual con texto' }];
  assert.deepEqual(compareAndRead(renderInteractive(online), online.map(e => e.title)).rows.Modalidad, ['En línea', 'En línea']);
  const located = [{ ...event('Pasto, Colombia', true), id: 'c', title: 'Con sede y en línea' }, { ...event('Pasto, Colombia'), id: 'd', title: 'Con sede' }];
  assert.deepEqual(compareAndRead(renderInteractive(located), located.map(e => e.title)).rows.Modalidad,
    ['Confirmar en la fuente', 'Confirmar en la fuente']);
  const unknown = [{ ...event(null), id: 'e', title: 'Sin datos' }, { ...event('Por confirmar'), id: 'f', title: 'Sede pendiente' }];
  assert.deepEqual(compareAndRead(renderInteractive(unknown), unknown.map(e => e.title)).rows.Modalidad, ['No informado', 'No informado']);
});
