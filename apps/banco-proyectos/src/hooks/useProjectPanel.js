import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PANEL_NARROW_QUERY, PANEL_PUSHED_STATE, closePlan, panelMode, parsePanel, withPanel } from '../lib/project-panel';
import useMediaQuery from './useMediaQuery';

// Open state of the project panel, kept in the URL (?panel=revistas|eventos): opening pushes a history entry so Back
// closes it, switching tabs replaces it. When it closes by any route (button, Esc, scrim, Back) the focus returns to
// the control that opened it, or to that tab's trigger in the page when the panel was opened by the URL.
export default function useProjectPanel() {
    const { search, state } = useLocation();
    const navigate = useNavigate();
    const narrow = useMediaQuery(PANEL_NARROW_QUERY);
    const [expanded, setExpanded] = useState(false);
    const tab = parsePanel(search);
    const triggerRef = useRef(null);
    const lastTab = useRef(tab);

    const open = useCallback((next, trigger) => {
        triggerRef.current = trigger || null;
        navigate({ search: withPanel(search, next) }, { state: PANEL_PUSHED_STATE });
    }, [navigate, search]);
    const select = useCallback((next) => navigate({ search: withPanel(search, next) }, { replace: true, state }), [navigate, search, state]);
    const close = useCallback(() => {
        if (closePlan(state) === 'back') navigate(-1);
        else navigate({ search: withPanel(search, null) }, { replace: true });
    }, [navigate, search, state]);

    useEffect(() => {
        if (lastTab.current && !tab) {
            const trigger = triggerRef.current && triggerRef.current.isConnected ? triggerRef.current : document.querySelector(`[data-panel-trigger="${lastTab.current}"]`);
            setExpanded(false);
            if (trigger) trigger.focus();
        }
        lastTab.current = tab;
    }, [tab]);

    return { tab, open, select, close, expanded, setExpanded, mode: panelMode({ open: tab !== null, expanded, narrow }) };
}
