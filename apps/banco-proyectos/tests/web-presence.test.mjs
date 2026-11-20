// T18: web presence of the single page app: index.html (title, description, theme color, canonical, Open Graph and Twitter
// tags), the static files of public/ and the nginx rules that serve them. Crawlers do not run JavaScript, so these tags are
// global; the per-page document.title is set in the browser (tests/dom/titulos-paginas.test.jsx).
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { DEFAULT_TITLE } from '../src/lib/page-title.js';

const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('index.html', root), 'utf8');
const SITE = 'https://banco-proyectos-unimayor-production.up.railway.app';

const tag = (re) => html.match(re)?.[1];
const meta = (attr, name) => tag(new RegExp(`<meta\\s+${attr}="${name}"\\s+content="([^"]*)"\\s*/?>`));
const link = (rel) => tag(new RegExp(`<link\\s+rel="${rel}"[^>]*href="([^"]*)"`));

test('index.html is Spanish and its title is the site title the app restores', () => {
    assert.match(html, /<html lang="es">/);
    assert.equal(tag(/<title>([^<]*)<\/title>/), DEFAULT_TITLE);
});

test('meta description is Spanish, informative and at most 160 characters', () => {
    const description = meta('name', 'description');
    assert.ok(description, 'missing description');
    assert.ok(description.length >= 70 && description.length <= 160, `length ${description?.length}`);
    assert.match(description, /proyectos/i);
    assert.match(description, /eventos/i);
    assert.match(description, /revistas|publicar/i);
});

test('theme color is the institutional blue and the canonical link is the production host', () => {
    assert.equal(meta('name', 'theme-color'), '#00428A');
    assert.equal(link('canonical'), `${SITE}/`);
});

test('Open Graph tags are complete and the image URL is absolute on the production host', () => {
    assert.equal(meta('property', 'og:type'), 'website');
    assert.equal(meta('property', 'og:site_name'), 'Banco de Proyectos UNIMAYOR');
    assert.equal(meta('property', 'og:title'), DEFAULT_TITLE);
    assert.equal(meta('property', 'og:description'), meta('name', 'description'));
    assert.equal(meta('property', 'og:locale'), 'es_CO');
    assert.equal(meta('property', 'og:url'), `${SITE}/`);
    assert.equal(meta('property', 'og:image'), `${SITE}/og-image.png`);
    assert.equal(meta('property', 'og:image:type'), 'image/png');
    assert.equal(meta('property', 'og:image:width'), '1200');
    assert.equal(meta('property', 'og:image:height'), '630');
    assert.ok(meta('property', 'og:image:alt')?.length > 10);
});

test('Twitter card is summary_large_image with the same text and image', () => {
    assert.equal(meta('name', 'twitter:card'), 'summary_large_image');
    assert.equal(meta('name', 'twitter:title'), DEFAULT_TITLE);
    assert.equal(meta('name', 'twitter:description'), meta('name', 'description'));
    assert.equal(meta('name', 'twitter:image'), `${SITE}/og-image.png`);
    assert.ok(meta('name', 'twitter:image:alt')?.length > 10);
});

test('the favicon is the brand SVG (not the Vite default) and the files exist in public/', () => {
    assert.equal(link('icon'), '/favicon.svg');
    assert.match(html, /<link rel="icon" type="image\/svg\+xml" href="\/favicon.svg"/);
    assert.ok(!html.includes('vite.svg'));
    const svg = readFileSync(new URL('public/favicon.svg', root), 'utf8');
    assert.match(svg, /^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
    assert.match(svg, /#00428A/i);
    assert.match(svg, /#FFC107/i);
    assert.match(svg.trim(), /<\/svg>$/);
    assert.ok(statSync(new URL('public/favicon.svg', root)).size < 4096);
});

test('apple-touch-icon is a 180x180 PNG', () => {
    assert.equal(link('apple-touch-icon'), '/apple-touch-icon.png');
    const png = readFileSync(new URL('public/apple-touch-icon.png', root));
    assert.equal(png.subarray(1, 4).toString(), 'PNG');
    assert.equal(png.readUInt32BE(16), 180);
    assert.equal(png.readUInt32BE(20), 180);
});

test('og-image.png is a 1200x630 PNG under 150 KB', () => {
    const file = new URL('public/og-image.png', root);
    assert.ok(existsSync(file));
    const png = readFileSync(file);
    assert.equal(png.subarray(1, 4).toString(), 'PNG');
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
    assert.ok(png.length < 150 * 1024, `${png.length} bytes`);
});

test('robots.txt allows everything and has nothing else', () => {
    const robots = readFileSync(new URL('public/robots.txt', root), 'utf8').trim().split(/\r?\n/).map((line) => line.trim());
    assert.deepEqual(robots, ['User-agent: *', 'Allow: /']);
});

test('nginx serves the static files by name (the SPA fallback only catches unknown paths) with their MIME types', () => {
    const conf = readFileSync(new URL('../../deploy/default.conf.template', root), 'utf8');
    assert.match(conf, /try_files \$uri \$uri\/ \/index\.html;/);
    // an existing file wins over the fallback; svg is compressed; mime.types (nginx default) maps png/svg/txt
    assert.match(conf, /gzip_types[^;]*image\/svg\+xml/);
    assert.ok(!/location\s*=?\s*\/?(og-image|favicon|robots)/.test(conf), 'no special location swallows the static files');
});
