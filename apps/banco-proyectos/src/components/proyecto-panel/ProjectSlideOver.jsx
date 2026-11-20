import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { EscapeLink } from './PanelParts';
import EventsTab from './EventsTab';
import JournalsTab from './JournalsTab';
import { BTN, FOCUS } from '../publicar/classes';
import { focusables } from '../../lib/focusables';
import { PANEL_TABS, nextTab, nextTrapIndex, panelFullUrl } from '../../lib/project-panel';

const TAB_LABELS = { revistas: 'Revistas', eventos: 'Eventos' };
// Slide-over of the project page (design 02): the journals and events of the project without leaving it.
// mode "push": wide screens, the page shifts left (class on <body>, see index.css) and stays usable.
// mode "modal": "Ampliar" or a screen of up to 1100 px; a scrim covers the page, the rest of the app is inert, the
// focus is trapped and the page does not scroll. Esc closes it; the focus goes to the panel on open, and back to
// the opener on close (useProjectPanel). prefers-reduced-motion drops the slide animation (index.css).
export default function ProjectSlideOver({ project, tab, mode, expanded, onExpandedChange, onSelectTab, onClose }) {
    const modal = mode === 'modal';
    const slideRef = useRef(null);
    const headerRef = useRef(null);
    const closeRef = useRef(null);
    const mounted = useRef(new Set());
    const [slots, setSlots] = useState({ footer: null, sheet: null });
    const [headerHeight, setHeaderHeight] = useState(120);
    const [meta, setMeta] = useState({ revistas: null, eventos: null });
    mounted.current.add(tab);

    const setFooterSlot = useCallback((element) => setSlots((current) => ({ ...current, footer: element })), []);
    const setSheetSlot = useCallback((element) => setSlots((current) => ({ ...current, sheet: element })), []);
    const onJournalMeta = useCallback((value) => setMeta((current) => ({ ...current, revistas: value })), []);
    const onEventMeta = useCallback((value) => setMeta((current) => ({ ...current, eventos: value })), []);

    // Focus into the panel on open.
    useEffect(() => { closeRef.current?.focus({ preventScroll: true }); }, []);

    // The filters sheet starts under the header, whatever its height (it wraps on small screens).
    useLayoutEffect(() => {
        const header = headerRef.current;
        if (!header) return undefined;
        const measure = () => setHeaderHeight(header.offsetHeight);
        measure();
        if (typeof ResizeObserver === 'undefined') return undefined;
        const observer = new ResizeObserver(measure);
        observer.observe(header);
        return () => observer.disconnect();
    }, []);

    // Push mode: the page makes room (CSS on body). Modal: the rest of the app is inert and does not scroll.
    useEffect(() => {
        const root = document.getElementById('root');
        if (mode === 'push') document.body.classList.add('project-panel-push');
        if (modal) {
            root?.setAttribute('inert', '');
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.classList.remove('project-panel-push');
            root?.removeAttribute('inert');
            document.body.style.overflow = '';
        };
    }, [mode, modal]);

    // Esc closes the panel, unless the event was already used (the filters sheet closes itself on Esc) or it clears
    // a search field. Outside the panel only an Esc with nothing focused counts.
    useEffect(() => {
        const onKeyDown = ({ key, defaultPrevented, target }) => {
            if (key !== 'Escape' || defaultPrevented) return;
            if (target instanceof HTMLInputElement && target.type === 'search' && target.value) return;
            if (slideRef.current?.contains(target) || target === document.body) onClose();
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onClose]);

    const onSlideKeyDown = (event) => {
        const { key, shiftKey } = event;
        if (key !== 'Tab' || !modal || !slideRef.current) return;
        const items = focusables(slideRef.current);
        const target = nextTrapIndex(items.length, items.indexOf(document.activeElement), shiftKey);
        if (target === null) return;
        event.preventDefault();
        items[target].focus();
    };

    const onTabKeyDown = (event) => {
        const { key } = event;
        const next = nextTab(tab, key);
        if (!next) return;
        event.preventDefault();
        onSelectTab(next);
        document.getElementById(`panel-tab-${next}`)?.focus();
    };

    const emoji = (meta.revistas && meta.revistas.emoji) || (meta.eventos && meta.eventos.emoji) || '📁';
    const width = expanded ? 'w-[min(1180px,100vw)]' : 'w-[min(760px,100vw)]';
    return createPortal(
        <>
            {modal && <div aria-hidden="true" onClick={onClose} className="fixed inset-0 z-[55] bg-institutional-dark/50" />}
            <div
                ref={slideRef}
                role="dialog"
                aria-modal={modal}
                aria-labelledby="panel-title"
                onKeyDown={onSlideKeyDown}
                className={`project-panel-slide fixed top-0 right-0 bottom-0 z-[60] flex flex-col bg-institutional-light border-l border-gray-200 shadow-xl max-[760px]:w-screen max-[760px]:border-l-0 ${width}`}
            >
                <div ref={headerRef} className="flex-none bg-white border-b border-gray-200 pt-3.5 px-5 max-[760px]:pt-2.5 max-[760px]:px-3">
                    <div className="flex flex-wrap items-start gap-3">
                        <div className="w-11 h-11 max-[760px]:w-9 max-[760px]:h-9 rounded-2xl bg-blue-50 grid place-items-center text-[22px] flex-none" aria-hidden="true">{emoji}</div>
                        <div className="flex-1 min-w-[200px] max-[760px]:min-w-0">
                            <p className="m-0 text-xs font-bold text-gray-500 uppercase tracking-wider">{['Proyecto', project.area, project.nivel].filter(Boolean).join(' · ')}</p>
                            <h2 id="panel-title" className="m-0 mt-px text-base max-[760px]:text-[15px] font-bold text-gray-900 leading-snug">{project.titulo}</h2>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 max-[760px]:w-full max-[760px]:flex-nowrap">
                            <EscapeLink to={panelFullUrl(tab, project.id)} label="Abrir en la página completa ↗" className="max-[760px]:flex-[2] max-[760px]:justify-center max-[760px]:whitespace-normal max-[760px]:text-center" />
                            <button type="button" aria-pressed={expanded} onClick={() => onExpandedChange(!expanded)} className={`${BTN} max-[760px]:hidden`}>
                                {expanded ? '⤡ Reducir' : '⤢ Ampliar'}
                            </button>
                            <button ref={closeRef} type="button" onClick={onClose} className={`${BTN} max-[760px]:flex-1`}>✕ Cerrar</button>
                        </div>
                    </div>
                    <div role="tablist" aria-label="Oportunidades del proyecto" onKeyDown={onTabKeyDown} className="flex gap-1 mt-2.5 overflow-x-auto overflow-y-hidden">
                        {PANEL_TABS.map((id) => {
                            const selected = tab === id;
                            const count = meta[id] && meta[id].count;
                            return (
                                <button
                                    key={id}
                                    type="button"
                                    role="tab"
                                    id={`panel-tab-${id}`}
                                    aria-controls={`panel-view-${id}`}
                                    aria-selected={selected}
                                    tabIndex={selected ? 0 : -1}
                                    onClick={() => onSelectTab(id)}
                                    className={`px-4 py-3 -mb-px min-h-11 text-[15px] max-[760px]:text-sm max-[760px]:px-3 font-semibold whitespace-nowrap border-b-[3px] ${FOCUS} focus-visible:-outline-offset-[3px] ${selected ? 'text-institutional-blue border-institutional-blue' : 'text-gray-600 border-transparent hover:text-institutional-blue'}`}
                                >
                                    {TAB_LABELS[id]}
                                    {typeof count === 'number' && <span className={`ml-1.5 inline-block rounded-full px-2 py-px text-xs font-bold ${selected ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{count}</span>}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex-1 overflow-auto relative px-5 pt-4 pb-6 max-[760px]:p-3 scroll-pb-20">
                    <section id="panel-view-revistas" role="tabpanel" aria-labelledby="panel-tab-revistas" tabIndex={0} hidden={tab !== 'revistas'} className={FOCUS}>
                        {mounted.current.has('revistas') && <JournalsTab project={project} active={tab === 'revistas'} slots={slots} onMeta={onJournalMeta} />}
                    </section>
                    <section id="panel-view-eventos" role="tabpanel" aria-labelledby="panel-tab-eventos" tabIndex={0} hidden={tab !== 'eventos'} className={FOCUS}>
                        {mounted.current.has('eventos') && <EventsTab project={project} onMeta={onEventMeta} />}
                    </section>
                </div>
                <div ref={setFooterSlot} className="flex-none empty:hidden" />
                <div
                    ref={setSheetSlot}
                    style={{ top: headerHeight }}
                    className="absolute bottom-0 right-0 z-[6] w-[min(400px,100%)] overflow-y-auto bg-white shadow-xl border-l border-gray-200 empty:hidden"
                />
            </div>
        </>,
        document.body,
    );
}
