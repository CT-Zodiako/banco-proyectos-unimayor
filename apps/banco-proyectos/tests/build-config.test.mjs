import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ROUTE_PRELOADS, manualChunks, preloadMap } from '../vite.config.js';

const root = '/Users/x/banco/';
const chunkOf = (id) => manualChunks(`${root}${id}`);

test('vendor libraries go to their own chunks', () => {
    assert.equal(chunkOf('node_modules/react/index.js'), 'react');
    assert.equal(chunkOf('node_modules/react-dom/client.js'), 'react');
    assert.equal(chunkOf('node_modules/scheduler/index.js'), 'react');
    assert.equal(chunkOf('node_modules/react-router-dom/dist/index.js'), 'router');
    assert.equal(chunkOf('node_modules/react-router/dist/index.js'), 'router');
    assert.equal(chunkOf('node_modules/@remix-run/router/dist/router.js'), 'router');
    assert.equal(chunkOf('node_modules/framer-motion/dist/es/index.mjs'), 'motion');
    assert.equal(chunkOf('node_modules/motion-dom/dist/es/index.mjs'), 'motion');
    assert.equal(chunkOf('node_modules/lucide-react/dist/esm/icons/clock.js'), 'icons');
});

test('the 236 projects go to projects-data, but areas.js (read by the catalog at startup) and the app code do not', () => {
    assert.equal(chunkOf('src/data/baseProjects.js'), 'projects-data');
    assert.equal(chunkOf('src/data/projects/index.js'), 'projects-data');
    assert.equal(chunkOf('src/data/projects/robotica.js'), 'projects-data');
    assert.equal(chunkOf('src/data/projects/areas.js'), undefined);
    assert.equal(chunkOf('src/data/projects-index.js'), 'projects-index');
    assert.equal(chunkOf('src/lib/catalog.js'), undefined);
    assert.equal(chunkOf('src/pages/ProjectsPage.jsx'), undefined);
    assert.equal(chunkOf('node_modules/some-other-lib/index.js'), undefined);
});

const chunk = (fileName, name, imports = [], extra = {}) => ({ type: 'chunk', fileName, name, imports, ...extra });
const bundle = Object.fromEntries([
    chunk('assets/index.js', 'index', ['assets/react.js'], { isEntry: true }),
    chunk('assets/react.js', 'react'),
    chunk('assets/ProjectsCatalog.js', 'ProjectsCatalog', ['assets/react.js', 'assets/ProjectCard.js']),
    chunk('assets/ProjectCard.js', 'ProjectCard', ['assets/react.js']),
    chunk('assets/projects-data.js', 'projects-data'),
    chunk('assets/projects-index.js', 'projects-index'),
    chunk('assets/Eventos.js', 'Eventos', ['assets/useLazyData.js']),
    chunk('assets/useLazyData.js', 'useLazyData'),
    { type: 'asset', fileName: 'assets/index.css' },
].map((item) => [item.fileName, item]));

test('preloadMap lists, per route, its page chunk and what it needs, without what the entry already loads', () => {
    const map = Object.fromEntries(preloadMap(bundle, '/'));
    assert.deepEqual(map['^/proyectos/?$'], ['/assets/ProjectsCatalog.js', '/assets/ProjectCard.js', '/assets/projects-index.js']);
    // the project page needs the full data, not the light index
    assert.ok(map['^/proyecto/'].includes('/assets/projects-data.js'));
    assert.ok(!map['^/proyecto/'].includes('/assets/projects-index.js'));
    assert.deepEqual(map['^/eventos/?$'], ['/assets/Eventos.js', '/assets/useLazyData.js']);
});

test('preloadMap skips routes whose chunks are not in the bundle and honors the base path', () => {
    const routes = preloadMap(bundle, '/banco/').map(([pattern]) => pattern);
    // /proyecto/:id has no page chunk here, but it still needs the full projects data
    assert.deepEqual(routes, ['^/proyectos/?$', '^/proyecto/', '^/eventos/?$']);
    assert.deepEqual(Object.fromEntries(preloadMap(bundle, '/'))['^/proyecto/'], ['/assets/projects-data.js']);
    assert.ok(preloadMap(bundle, '/banco/')[0][1].every((url) => url.startsWith('/banco/assets/')));
});

test('every route pattern is a valid regular expression that matches its own URL', () => {
    const urls = { '^/proyectos/?$': '/proyectos', '^/proyecto/': '/proyecto/proj_001', '^/eventos/?$': '/eventos', '^/donde-publicar/?$': '/donde-publicar', '^/oportunidades/?$': '/oportunidades', '^/acerca/?$': '/acerca', '^/contacto/?$': '/contacto' };
    assert.deepEqual(ROUTE_PRELOADS.map(([pattern]) => pattern), Object.keys(urls));
    for (const [pattern] of ROUTE_PRELOADS) assert.ok(new RegExp(pattern).test(urls[pattern]), pattern);
    assert.equal(new RegExp('^/proyectos/?$').test('/proyecto/proj_001'), false);
});

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('index.html keeps the preconnects and loads the Inter stylesheet without blocking the first paint', () => {
    assert.match(html, /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">/);
    assert.match(html, /<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>/);
    const fonts = html.match(/<link [^>]*fonts\.googleapis\.com\/css2[^>]*>/g);
    assert.equal(fonts.length, 2);
    const [blockingFree, fallback] = fonts;
    assert.match(blockingFree, /media="print"/);
    assert.match(blockingFree, /onload="this\.media='all'"/);
    assert.match(blockingFree, /display=swap/);
    assert.match(html, /<noscript>\s*<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com\/css2[^>]*display=swap">\s*<\/noscript>/);
    assert.doesNotMatch(fallback.replace(/<noscript>/, ''), /media="print"/);
    // only the weights the page uses
    for (const link of fonts) assert.match(link, /Inter:wght@400;500;600;700/);
});
