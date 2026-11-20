import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    COMPARE_PARAM, loadSelection, resolveIds, saveSelection, toggleId, withCompareParam,
} from '../lib/compare-projects';

// The projects chosen for the comparison on /proyectos (T17). The URL param `cmp=id1,id2,id3` is the source of truth, so a
// link or a reload restores the choice; a copy in the session brings it back when the catalog is opened without the param
// (through the menu, «Volver a la lista» ...). The param is additive: invalid ids are ignored, and a catalog URL
// without it is never rewritten while nothing is selected.
// `projects` is the catalog list (anything with an `id`). Returns { ids, toggle, remove, clear } where ids are the valid
// selected ids in the order they were chosen.
export default function useCompareSelection(projects) {
    const location = useLocation();
    const navigate = useNavigate();
    const raw = new URLSearchParams(location.search).get(COMPARE_PARAM);
    const known = useMemo(() => new Set(projects.map((project) => project.id)), [projects]);
    const ids = useMemo(() => resolveIds(raw, known).ids, [raw, known]);
    const { pathname, search, hash } = location;

    const write = useCallback((next) => {
        saveSelection(next);
        navigate(`${withCompareParam(`${pathname}${search}`, next)}${hash}`, { replace: true });
    }, [navigate, pathname, search, hash]);

    useEffect(() => {
        if (raw !== null) {
            if (ids.length > 0) saveSelection(ids);
            return;
        }
        const stored = loadSelection().filter((id) => known.has(id));
        if (stored.length > 0) navigate(`${withCompareParam(`${pathname}${search}`, stored)}${hash}`, { replace: true });
    }, [raw, ids, known, navigate, pathname, search, hash]);

    return {
        ids,
        toggle: useCallback((id) => write(toggleId(ids, id)), [write, ids]),
        remove: useCallback((id) => write(ids.filter((other) => other !== id)), [write, ids]),
        clear: useCallback(() => write([]), [write]),
    };
}
