import { cleanup, configure } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

// Each test loads the app modules again (fresh data cache), so the first screen can take a moment on a slow machine.
configure({ asyncUtilTimeout: 5000 });

// vitest runs without globals, so Testing Library cannot register its own cleanup.
beforeEach(() => {
    // React Router 6 announces its v7 flags on every router mount; that is noise in the test output.
    const warn = console.warn;
    vi.spyOn(console, 'warn').mockImplementation((...args) => {
        if (!String(args[0]).includes('React Router Future Flag Warning')) warn(...args);
    });
    // jsdom does not implement scrolling (ScrollToTop calls it on every route change).
    window.scrollTo = vi.fn();
});

afterEach(() => {
    cleanup();
    window.localStorage.clear();
    window.sessionStorage.clear();
    document.body.removeAttribute('class');
    document.body.removeAttribute('style');
});
