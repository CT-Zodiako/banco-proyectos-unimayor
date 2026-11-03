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

/* Renders one card with clickable listeners and the real opportunities.js module loaded through import(). */
async function renderFavorite(localStorage) {
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
  const window = { EVFilters: filters, EVENTOS: { events: [{ ...event('Pasto, Colombia'), id: 'ev1' }], topics: [], projects: [] }, location: { search: '', pathname: '/eventos/' }, history: { replaceState() {} } };
  const file = require.resolve('../site/app.js');
  const script = new vm.Script(fs.readFileSync(file, 'utf8'), { filename: file, importModuleDynamically: vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER });
  script.runInNewContext({ window, document, localStorage, URL, Date, Map });
  const button = all(nodes.get('#results').children[0]).find(n => (n.attrs['aria-label'] || '').startsWith('Guardar Congreso'));
  for (let i = 0; i < 100 && !button.listeners.click && !button.disabled; i++) await new Promise(resolve => setTimeout(resolve, 5));
  return button;
}

test('the favorite button has its own class, separate from the comparison button', async () => {
  const button = await renderFavorite(memoryStorage());
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
