import { useCallback, useEffect, useState } from 'react';
import { loadData } from '../lib/data-loader';

const loaded = new Map();

// Downloads a data file (public/data/<file>, see lib/data-loader.js) the first time `enabled` is true and keeps it for
// the rest of the session. The loader shares one download between the page and the project panel and forgets a failed
// one, so retry() downloads again. Returns { status: 'idle' | 'loading' | 'ready' | 'error', data, retry }.
export default function useLazyData(file, enabled) {
    const [state, setState] = useState(() => (loaded.has(file) ? { status: 'ready', data: loaded.get(file) } : { status: 'idle', data: null }));
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        if (!enabled || loaded.has(file)) return undefined;
        let cancelled = false;
        setState({ status: 'loading', data: null });
        loadData(file)
            .then((data) => {
                loaded.set(file, data);
                if (!cancelled) setState({ status: 'ready', data });
            })
            .catch(() => { if (!cancelled) setState({ status: 'error', data: null }); });
        return () => { cancelled = true; };
    }, [enabled, file, attempt]);

    const retry = useCallback(() => setAttempt((count) => count + 1), []);
    // Another component may have loaded the file while this one was idle.
    if (state.status !== 'ready' && loaded.has(file)) return { status: 'ready', data: loaded.get(file), retry };
    return { ...state, retry };
}
