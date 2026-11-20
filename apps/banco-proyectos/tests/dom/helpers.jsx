import { render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { eventosFixture, publicarFixture } from './fixtures.js';

const FILES = {
    '/data/eventos.json': eventosFixture,
    '/data/publicar-data.json': publicarFixture,
};

const ok = (body) => ({ ok: true, status: 200, json: async () => body });

/** Replaces fetch with a stub that serves the small fixtures for /data/*.json. `respond(path, default)` may return
    a response, a promise of one, or throw/reject, to simulate a slow or failing download. Every request is recorded
    in the returned `requests` array. Any other URL is a 404 so a test never silently loads something unexpected. */
export function mockDataFetch(respond = (path, response) => response) {
    const requests = [];
    vi.stubGlobal('fetch', vi.fn((url) => {
        const path = new URL(url, 'http://localhost').pathname;
        requests.push(path);
        const response = path in FILES ? ok(FILES[path]) : { ok: false, status: 404, json: async () => ({}) };
        return Promise.resolve().then(() => respond(path, response));
    }));
    return { requests };
}

/** Renders the real <App/> (its router, routes and lazy pages) at `url` ("/eventos?kind=cfp#x"). The app modules are
    loaded again for each call so the data cache (src/lib/data-loader.js, src/hooks/useLazyData.js,
    src/lib/projects-loader.js) starts empty.
    By default the light projects index (what the catalog, Home and the search read) is already downloaded
    (`preloadProjects`; the full data is only downloaded by the project page itself) and the call returns once the page chunk of
    the route has loaded (`settle`: no route skeleton left), so a test reads the page as it did before the code was split.
    Pass `{ settle: false, preloadProjects: false }` to look at the loading states themselves. */
export async function renderApp(url, { settle = true, preloadProjects = true } = {}) {
    window.history.replaceState({}, '', url);
    vi.resetModules();
    const { default: App } = await import('../../src/App.jsx');
    if (preloadProjects) await (await import('../../src/lib/projects-loader.js')).loadProjectsIndex();
    const result = render(<App />);
    if (settle) await waitFor(() => { if (document.querySelector('[data-route-loading]')) throw new Error('page still loading'); });
    return result;
}

/** A promise settled from the outside, for a download the test finishes when it chooses. */
export function deferred() {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
    return { promise, resolve, reject };
}
