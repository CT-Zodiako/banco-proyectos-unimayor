import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../eventos/EventCard';
import EventComparison from '../eventos/EventComparison';
import EventFilters from '../eventos/EventFilters';
import { BTN_SECONDARY, FOCUS } from '../publicar/classes';
import { EscapeCard, LoadError, NoData } from './PanelParts';
import PanelSkeleton from './PanelSkeleton';
import useEventResults from '../../hooks/useEventResults';
import useLazyData from '../../hooks/useLazyData';
import useMediaQuery from '../../hooks/useMediaQuery';
import { DATA_FILES } from '../../lib/data-loader';
import { comparisonKey, dataStatusText, plural } from '../../lib/eventos/display';
import { DEFAULT_STATE, MAX_COMPARISON, stateToQuery, toggleComparison } from '../../lib/eventos/filters';
import { nextShown, panelFullUrl } from '../../lib/project-panel';

const PAGE_SIZE = 6;
const MORE_SIZE = 10;
const INITIAL_STATE = { ...DEFAULT_STATE, sort: 'affinity' };

function EventsLoaded({ data, project, onMeta }) {
    const dataProject = useMemo(() => data.projects.find((candidate) => candidate.id === project.id) || null, [data, project.id]);
    const narrow = useMediaQuery('(max-width: 760px)');
    const [state, setState] = useState(INITIAL_STATE);
    const [filtersOpen, setFiltersOpen] = useState(() => !narrow);
    const [selected, setSelected] = useState([]);
    const [limit, setLimit] = useState(PAGE_SIZE);
    const searchRef = useRef(null);
    const { today, ranked, affinityByEvent, counts, shown, noProjectEvents } = useEventResults({ events: data.events, project: dataProject, state });

    useEffect(() => { onMeta({ count: ranked.length, emoji: dataProject ? dataProject.emoji : null }); }, [onMeta, ranked.length, dataProject]);

    const fullUrl = panelFullUrl('eventos', project.id);
    if (!dataProject || noProjectEvents) {
        return (
            <NoData>
                <p className="mb-3">{dataProject ? 'Ningún evento vigente comparte temas con este proyecto.' : 'Todavía no hay eventos sugeridos para este proyecto.'}</p>
                <Link to={fullUrl} className="font-semibold text-institutional-blue underline">Abrir en la página completa</Link>
            </NoData>
        );
    }

    const update = (patch) => setState((current) => ({ ...current, ...patch }));
    const isFiltered = stateToQuery({ ...state, project: null, sort: DEFAULT_STATE.sort }) !== '';
    const clearFilters = () => { setState({ ...DEFAULT_STATE, topics: [], sort: state.sort }); searchRef.current?.focus(); };
    const visible = shown.slice(0, limit);
    return (
        <div className="space-y-3">
            <p className="m-0 text-[13.5px] text-gray-600">Congresos con convocatoria para presentar el proyecto y eventos para asistir, por afinidad. {dataStatusText(data.generated)} Confirme fechas y sede en el sitio oficial.</p>
            <button
                type="button"
                aria-expanded={filtersOpen}
                aria-controls="panel-event-filters"
                onClick={() => setFiltersOpen((open) => !open)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-institutional-blue text-sm font-semibold hover:bg-blue-800 hover:text-white max-[760px]:w-full max-[760px]:justify-center ${FOCUS} ${filtersOpen ? 'bg-white text-institutional-blue' : 'bg-institutional-blue text-white'}`}
            >
                <span aria-hidden="true">⚙</span> {filtersOpen ? 'Ocultar filtros' : 'Más filtros'}
            </button>
            <div id="panel-event-filters" hidden={!filtersOpen}>
                <EventFilters state={state} hasProject topics={data.topics} counts={counts} onChange={update} searchRef={searchRef} />
            </div>

            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600" aria-live="polite">
                    {shown.length ? `${plural(shown.length, 'evento vigente', 'eventos vigentes')} afines al proyecto` : 'Sin resultados'}
                </span>
                {isFiltered && shown.length > 0 && (
                    <button type="button" onClick={clearFilters} className={`text-[13px] font-semibold text-institutional-blue underline rounded ${FOCUS}`}>Limpiar filtros</button>
                )}
            </div>

            <EventComparison events={data.events} selected={selected} onClear={() => setSelected([])} />

            <section aria-label="Eventos encontrados">
                <div className="grid gap-3">
                    {visible.map((event) => {
                        const key = comparisonKey(event);
                        return (
                            <EventCard
                                key={event.id}
                                event={event}
                                affinity={affinityByEvent.get(event)}
                                today={today}
                                selected={selected.includes(key)}
                                compareFull={selected.length >= MAX_COMPARISON}
                                onToggleCompare={() => setSelected((current) => toggleComparison(current, key))}
                            />
                        );
                    })}
                </div>
                {shown.length === 0 && (
                    <div className="text-center p-7 text-gray-500 border border-dashed border-gray-200 rounded-2xl bg-white">
                        <p className="mb-3">Ningún evento vigente cumple estos filtros.</p>
                        <button type="button" onClick={clearFilters} className={BTN_SECONDARY}>Limpiar filtros</button>
                    </div>
                )}
                {shown.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-4 text-[13.5px] text-gray-600">
                        <span aria-live="polite">Mostrando {visible.length} de {shown.length}</span>
                        {visible.length < shown.length && (
                            <button type="button" onClick={() => setLimit((current) => nextShown(current, shown.length, MORE_SIZE))} className={BTN_SECONDARY}>Cargar más</button>
                        )}
                    </div>
                )}
            </section>
            <EscapeCard ariaLabel="Vista general de eventos" to={fullUrl} label="Abrir la página completa de eventos ↗">
                <strong>¿Quiere ver más allá de este proyecto?</strong> La página completa lista los eventos de todos los temas y enlaza con Mis oportunidades guardadas.
            </EscapeCard>
        </div>
    );
}

export default function EventsTab({ project, onMeta }) {
    const { status, data, retry } = useLazyData(DATA_FILES.eventos, true);
    if (status === 'error') return <LoadError what="los eventos" onRetry={retry} />;
    if (status !== 'ready') return <PanelSkeleton rows={3} />;
    return <EventsLoaded data={data} project={project} onMeta={onMeta} />;
}
