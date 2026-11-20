import { useCallback, useEffect, useState } from 'react';
import { loadProjects, loadProjectsIndex, loadedProjects, loadedProjectsIndex } from '../lib/projects-loader.js';

const NONE = [];

// Shared by both hooks: `load` starts the download of one chunk and `peek` returns it once loaded. Returns
// { projects, loading, error, status, retry }: `projects` is [] until they arrive, `loading` is true while they are on
// their way, `error` holds the failure of a download that can be tried again with retry(). With `enabled: false`
// nothing is downloaded (status 'idle'), so a page can wait until the data is needed.
function useLoadedProjects(load, peek, enabled) {
    const [state, setState] = useState({ status: 'idle', error: null });
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        if (!enabled || peek()) return undefined;
        let cancelled = false;
        setState({ status: 'loading', error: null });
        load()
            .then(() => { if (!cancelled) setState({ status: 'ready', error: null }); })
            .catch((error) => { if (!cancelled) setState({ status: 'error', error }); });
        return () => { cancelled = true; };
    }, [load, peek, enabled, attempt]);

    const retry = useCallback(() => setAttempt((count) => count + 1), []);

    // Another component may have loaded them already (a page, the search): no waiting, not even one render.
    const projects = peek();
    if (projects) return { projects, loading: false, error: null, status: 'ready', retry };
    if (state.status === 'error') return { projects: NONE, loading: false, error: state.error, status: 'error', retry };
    const loading = enabled;
    return { projects: NONE, loading, error: null, status: loading ? 'loading' : 'idle', retry };
}

/** The full projects (the project page): every field of src/data/projects. */
export const useProjects = ({ enabled = true } = {}) => useLoadedProjects(loadProjects, loadedProjects, enabled);

/** The light index (catalog, global search, Home figures): id, title, description, area, sector, level, duration and the
    hardware and software counts of each project, in the same order and with the same values as the full data. */
export const useProjectsIndex = ({ enabled = true } = {}) => useLoadedProjects(loadProjectsIndex, loadedProjectsIndex, enabled);
