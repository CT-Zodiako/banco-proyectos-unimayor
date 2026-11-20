import { useCallback, useEffect, useState } from 'react';

const loaded = new Map();

// Downloads a data module with a dynamic import the first time `enabled` is true (the journal data is ~2.4 MB, the
// events ~280 KB) and keeps it for the rest of the session. loader() must resolve to the module (its default is the
// data). Returns { status: 'idle' | 'loading' | 'ready' | 'error', data, retry }.
export default function useLazyData(key, loader, enabled) {
    const [state, setState] = useState(() => (loaded.has(key) ? { status: 'ready', data: loaded.get(key) } : { status: 'idle', data: null }));
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        if (!enabled || loaded.has(key)) return undefined;
        let cancelled = false;
        setState({ status: 'loading', data: null });
        loader()
            .then((module) => {
                loaded.set(key, module.default);
                if (!cancelled) setState({ status: 'ready', data: module.default });
            })
            .catch(() => { if (!cancelled) setState({ status: 'error', data: null }); });
        return () => { cancelled = true; };
    }, [enabled, key, loader, attempt]);

    const retry = useCallback(() => setAttempt((count) => count + 1), []);
    // Another component may have loaded the module while this one was idle.
    if (state.status !== 'ready' && loaded.has(key)) return { status: 'ready', data: loaded.get(key), retry };
    return { ...state, retry };
}
