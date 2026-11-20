import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, CalendarDays, Layers, Search, X } from 'lucide-react';
import useLazyData from '../hooks/useLazyData';
import { useProjects } from '../hooks/useProjects';
import { DATA_FILES } from '../lib/data-loader';
import { localIsoDate } from '../lib/eventos/filters';
import { focusables } from '../lib/focusables';
import {
    EXAMPLE_SEARCHES, GROUPS, highlightParts, indexEvents, indexJournals, indexProjects, resultCount, resultTarget,
    searchAll, viewAllTarget,
} from '../lib/globalSearch';
import { nextTrapIndex } from '../lib/project-panel';

const TITLE = 'Buscar en todo el sitio';
const BADGES = {
    project: { className: 'badge badge-area', Icon: Layers },
    event: { className: 'badge badge-tone tn-events', Icon: CalendarDays },
    journal: { className: 'badge badge-tone tn-journals', Icon: BookOpen },
};
const OPTION = 'flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left';
const ROW_ACTIVE = 'bg-blue-50 shadow-[inset_3px_0_0_0_#00428A]';

const isPending = (state) => state.status === 'idle' || state.status === 'loading';
const plural = (n) => `${n} ${n === 1 ? 'resultado' : 'resultados'}`;

function failureText(eventsFailed, journalsFailed) {
    if (eventsFailed && journalsFailed) return 'No se pudieron cargar los eventos ni las revistas. Se muestran solo proyectos.';
    if (eventsFailed) return 'No se pudieron cargar los eventos. Se muestran proyectos y revistas.';
    if (journalsFailed) return 'No se pudieron cargar las revistas. Se muestran proyectos y eventos.';
    return '';
}

// The matched part of a text, marked with <mark> (the letters stay the way the data spells them).
const Highlighted = ({ text, query }) => highlightParts(text, query).map((part, index) => (
    part.match
        ? <mark key={index} className="rounded-[2px] bg-institutional-yellow/45 px-px text-inherit">{part.text}</mark>
        : part.text
));

// Command-palette style search of projects (bundled), events and journals (downloaded the first time this opens).
// The input is a combobox over one listbox: the arrows move an "active" option across the groups while the focus stays
// in the input, Enter or a click opens it. Each group ends with a «Ver todos los resultados» option.
export default function GlobalSearchDialog({ onClose }) {
    const navigate = useNavigate();
    const dialogRef = useRef(null);
    const inputRef = useRef(null);
    const ids = useId();
    const inputId = `${ids}-input`;
    const listId = `${ids}-list`;
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(0);
    const { projects } = useProjects();
    const events = useLazyData(DATA_FILES.eventos, true);
    const journals = useLazyData(DATA_FILES.catalog, true);
    const today = useMemo(() => localIsoDate(new Date()), []);

    useEffect(() => {
        const root = document.getElementById('root');
        root?.setAttribute('inert', '');
        document.body.style.overflow = 'hidden';
        inputRef.current?.focus();
        return () => {
            root?.removeAttribute('inert');
            document.body.style.overflow = '';
        };
    }, []);

    const eventList = events.status === 'ready' && Array.isArray(events.data?.events) ? events.data.events : null;
    const journalList = journals.status === 'ready' && Array.isArray(journals.data) ? journals.data : null;
    const indexes = useMemo(() => ({
        project: indexProjects(projects),
        event: eventList ? indexEvents(eventList, today) : [],
        journal: journalList ? indexJournals(journalList) : [],
    }), [projects, eventList, journalList, today]);

    const text = query.trim();
    const groups = useMemo(() => searchAll(indexes, text), [indexes, text]);
    const pending = isPending(events) || isPending(journals);
    const eventsFailed = events.status === 'error';
    const journalsFailed = journals.status === 'error';

    // Every option in the order it is listed (results of a group, then its «Ver todos»), with the id the combobox points at.
    const options = useMemo(() => groups.flatMap((group) => [
        ...group.items.map((entry) => ({ kind: 'result', group, entry, target: resultTarget(entry) })),
        { kind: 'all', group, target: viewAllTarget(group.type, text) },
    ]).map((option, index) => ({ ...option, id: `${ids}-option-${index}` })), [groups, text, ids]);
    const current = options.length ? Math.min(active, options.length - 1) : -1;
    const activeId = current >= 0 ? options[current].id : undefined;

    useEffect(() => {
        if (activeId) document.getElementById(activeId)?.scrollIntoView?.({ block: 'nearest' });
    }, [activeId]);

    const choose = (option) => {
        if (!option) return;
        navigate(option.target.to, option.target.state ? { state: option.target.state } : undefined);
        onClose({ navigated: true });
    };

    const onInputKeyDown = (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            if (!options.length) return;
            const step = event.key === 'ArrowDown' ? 1 : -1;
            setActive((current + step + options.length) % options.length);
        } else if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
            event.preventDefault();
            choose(options[current]);
        }
    };

    // Esc closes; Tab and Shift+Tab wrap inside the dialog.
    const onDialogKeyDown = (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            onClose({ navigated: false });
            return;
        }
        if (event.key !== 'Tab' || !dialogRef.current) return;
        const items = focusables(dialogRef.current);
        const target = nextTrapIndex(items.length, items.indexOf(document.activeElement), event.shiftKey);
        if (target === null) return;
        event.preventDefault();
        items[target].focus();
    };

    const runExample = (example) => {
        setQuery(example);
        setActive(0);
        inputRef.current?.focus();
    };

    const retry = () => {
        if (eventsFailed) events.retry();
        if (journalsFailed) journals.retry();
    };

    const message = pending ? 'Cargando eventos y revistas…' : failureText(eventsFailed, journalsFailed);

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 p-3 pt-[6vh] backdrop-blur-sm sm:p-4 sm:pt-[10vh]"
            onMouseDown={(event) => { if (event.target === event.currentTarget) onClose({ navigated: false }); }}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${ids}-title`}
                onKeyDown={onDialogKeyDown}
                className="flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5">
                    <h2 id={`${ids}-title`} className="text-base font-bold text-gray-900">{TITLE}</h2>
                    <button type="button" onClick={() => onClose({ navigated: false })} aria-label="Cerrar" className="focus-ring -mr-1.5 rounded-full p-2 text-gray-600 hover:bg-gray-100">
                        <X size={20} aria-hidden="true" />
                    </button>
                </div>

                <div className="border-b border-gray-100 px-4 py-3">
                    <label htmlFor={inputId} className="sr-only">Buscar proyectos, eventos o revistas</label>
                    <div className="relative">
                        <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -mt-[9px] text-sem-text-2" />
                        <input
                            ref={inputRef}
                            id={inputId}
                            type="text"
                            role="combobox"
                            aria-expanded={options.length > 0}
                            aria-controls={listId}
                            aria-autocomplete="list"
                            aria-activedescendant={activeId}
                            value={query}
                            onChange={(event) => { setQuery(event.target.value); setActive(0); }}
                            onKeyDown={onInputKeyDown}
                            placeholder="Proyecto, evento o revista"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck={false}
                            enterKeyHint="go"
                            className="field-input !h-11 w-full !pl-10"
                        />
                    </div>
                    <div className="mt-2 flex min-h-[20px] flex-wrap items-center gap-x-3 gap-y-1">
                        <div role="status" className="text-[13px] text-gray-700">
                            {message && <p>{message}</p>}
                            {!pending && text && <p>{plural(resultCount(groups))}</p>}
                        </div>
                        {!pending && (eventsFailed || journalsFailed) && (
                            <button type="button" onClick={retry} className="btn btn-tertiary !min-h-[32px]">Reintentar</button>
                        )}
                    </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto">
                    {!text && (
                        <div className="space-y-4 px-4 py-4 text-sm text-gray-700">
                            <div>
                                <p className="font-semibold text-gray-900">Escribe para buscar proyectos, eventos y revistas en un solo lugar.</p>
                                <p className="mt-1 text-sem-text-2">Usa ↑ ↓ para moverte entre los resultados, Enter para abrir uno y Esc para cerrar.</p>
                            </div>
                            <div role="group" aria-labelledby={`${ids}-examples`} className="flex flex-wrap items-center gap-2">
                                <span id={`${ids}-examples`} className="text-[13px] font-semibold text-sem-text-2">Prueba con</span>
                                {EXAMPLE_SEARCHES.map((example) => (
                                    <button key={example} type="button" onClick={() => runExample(example)} className="btn btn-secondary !min-h-[36px]">{example}</button>
                                ))}
                            </div>
                        </div>
                    )}

                    {text && !pending && groups.length === 0 && (
                        <p className="px-4 py-8 text-center text-sm text-gray-700">Sin resultados para «{text}». Prueba con otro término.</p>
                    )}

                    {groups.length > 0 && (
                        <div id={listId} role="listbox" aria-label="Resultados" onMouseDown={(event) => event.preventDefault()} className="py-1">
                            {groups.map((group) => {
                                const { label, badge } = GROUPS.find((item) => item.type === group.type);
                                const { className, Icon } = BADGES[group.type];
                                return (
                                    <div key={group.type} role="group" aria-labelledby={`${ids}-group-${group.type}`}>
                                        <div id={`${ids}-group-${group.type}`} className="px-4 pb-1 pt-3 text-xs font-bold uppercase tracking-wider text-sem-text-2">{label}</div>
                                        {options.filter((option) => option.group === group).map((option) => {
                                            const index = options.indexOf(option);
                                            const isActive = index === current;
                                            const props = {
                                                id: option.id,
                                                role: 'option',
                                                'aria-selected': isActive,
                                                onClick: () => choose(option),
                                                onMouseMove: () => { if (!isActive) setActive(index); },
                                            };
                                            if (option.kind === 'all') {
                                                return (
                                                    <div key={option.id} {...props} className={`${OPTION} text-[14px] font-semibold text-institutional-blue ${isActive ? ROW_ACTIVE : ''}`}>
                                                        <span className="min-w-0 flex-1 underline-offset-2">{`Ver todos los resultados en ${label} (${group.total})`}</span>
                                                        <ArrowRight size={16} aria-hidden="true" className="flex-none" />
                                                    </div>
                                                );
                                            }
                                            return (
                                                <div key={option.id} {...props} className={`${OPTION} ${isActive ? ROW_ACTIVE : ''}`}>
                                                    <span className={`${className} flex-none`}>
                                                        <Icon size={14} aria-hidden="true" className="flex-none" />
                                                        {badge}
                                                    </span>
                                                    {' '}
                                                    <span className="min-w-0 flex-1">
                                                        <span className="block line-clamp-2 break-words text-[15px] font-semibold leading-snug text-gray-900"><Highlighted text={option.entry.title} query={text} /></span>
                                                        {' '}
                                                        {option.entry.meta && <span className="block truncate text-[13px] text-sem-text-2">{option.entry.meta}</span>}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body,
    );
}
