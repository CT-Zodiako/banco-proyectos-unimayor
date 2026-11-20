import { useMemo, useRef, useState } from 'react';
import { SORT_DEFAULT_DIR, compareSelectedText } from '../lib/publicar/display';
import { deleteUserPreset, loadUserPresets, saveUserPreset, saveUserPresets } from '../lib/publicar/presets';
import { projectRows, visibleRows } from '../lib/publicar/project';
import { ADVANCED_DEFAULTS, countAdvanced, toggleCompare } from '../lib/publicar/table';

const browserStorage = () => {
    try { return window.localStorage; } catch { return null; }
};

// State and derived rows of the journal list of one project: search, sort, list/table, advanced filters (and their
// saved presets) and the compare selection. Shared by the /donde-publicar page and the project panel so both filter,
// sort and compare with the same logic. The compare selection belongs to one project: choosing another starts again.
export default function useJournalFinder(project, journalsById, themes) {
    const projectId = project ? project.id : null;
    const [query, setQuery] = useState('');
    const [mode, setMode] = useState('list');
    const [sort, setSort] = useState({ key: 'affinity', dir: SORT_DEFAULT_DIR.affinity });
    const [advanced, setAdvanced] = useState(ADVANCED_DEFAULTS);
    const [panelOpen, setPanelOpen] = useState(false);
    const [userPresets, setUserPresets] = useState(() => loadUserPresets(browserStorage()));
    const [compareState, setCompareState] = useState({ projectId: null, ids: [] });
    const toggleButtonRef = useRef(null);
    const countRef = useRef(null);

    const compare = compareState.projectId === projectId ? compareState.ids : [];
    const setCompare = (update) => setCompareState((previous) => ({ projectId, ids: update(previous.projectId === projectId ? previous.ids : []) }));

    const rows = useMemo(() => projectRows(project, journalsById, themes), [project, journalsById, themes]);
    const visible = useMemo(() => visibleRows(rows, advanced, query, sort), [rows, advanced, query, sort]);
    const affinityById = useMemo(() => Object.fromEntries(rows.map((row) => [row.journal.id, row.affinity])), [rows]);
    const comparedJournals = compare.map((id) => journalsById.get(id)).filter(Boolean);

    const patchAdvanced = (patch) => setAdvanced((current) => ({ ...current, ...patch }));
    const commitPresets = (next) => { setUserPresets(next); saveUserPresets(browserStorage(), next); };
    const closePanel = (focusToggle) => {
        setPanelOpen(false);
        if (focusToggle) setTimeout(() => toggleButtonRef.current?.focus(), 0);
    };

    return {
        query, setQuery, mode, setMode, sort, setSort,
        advanced, setAdvanced, patchAdvanced, advancedCount: countAdvanced(advanced),
        panelOpen, setPanelOpen, closePanel, toggleButtonRef, countRef,
        userPresets,
        savePreset: (preset) => commitPresets(saveUserPreset(userPresets, preset)),
        deletePreset: (preset) => commitPresets(deleteUserPreset(userPresets, preset)),
        rows, visible, affinityById,
        compare, comparedJournals,
        toggleCompared: (id) => setCompare((ids) => toggleCompare(ids, id)),
        clearCompared: () => setCompare(() => []),
        compareText: compareSelectedText(mode === 'table' ? compare.length : 0),
    };
}
