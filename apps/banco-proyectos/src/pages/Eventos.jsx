import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import DataGate from '../components/DataGate';
import EventCard from '../components/eventos/EventCard';
import EventComparison from '../components/eventos/EventComparison';
import EventFilters from '../components/eventos/EventFilters';
import ProjectPanel from '../components/eventos/ProjectPanel';
import DataStatus from '../components/publicar/DataStatus';
import useEventResults from '../hooks/useEventResults';
import { DATA_FILES } from '../lib/data-loader';
import { comparisonKey, dataInfoText, dataStatusText, dataUpdatedText, eventFilterChips, plural } from '../lib/eventos/display';
import { DEFAULT_STATE, MAX_COMPARISON, parseQuery, stateToQuery, toggleComparison } from '../lib/eventos/filters';

const PAGE_TITLE = 'Buscador de eventos académicos · Banco de Proyectos · UNIMAYOR';

// Filters live in the URL (?p, kind, tema, modalidad, co, q, orden, desde, hasta, lugar), so a search can be shared.
// With ?p=<project id> only the events sharing a topic with that project are listed, ranked by estimated affinity.
function EventosPage({ eventosData }) {
    const { events, topics: knownTopics, projects, generated, sources } = eventosData;
    const projectsById = useMemo(() => new Map(projects.map((item) => [item.id, item])), [projects]);
    const { search } = useLocation();
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);
    const [projectMissing, setProjectMissing] = useState(false);
    const searchRef = useRef(null);

    const requested = useMemo(() => {
        const parsed = parseQuery(search);
        return { ...parsed, topics: parsed.topics.filter((topic) => knownTopics.includes(topic)) };
    }, [search, knownTopics]);
    const project = (requested.project && projectsById.get(requested.project)) || null;
    // An unknown project id is dropped, and so is the affinity sort that needs a project.
    const state = useMemo(() => {
        if (project) return requested;
        const { project: _unknown, ...rest } = requested; // eslint-disable-line no-unused-vars
        return { ...rest, sort: rest.sort === 'affinity' ? DEFAULT_STATE.sort : rest.sort };
    }, [requested, project]);

    const go = (next) => {
        const query = stateToQuery(next);
        navigate({ search: query ? `?${query}` : '' }, { replace: true });
    };
    const update = (patch) => go({ ...state, ...patch });

    // An unknown ?p= is reported once and removed from the URL.
    useEffect(() => {
        if (!requested.project) return;
        if (project) {
            setProjectMissing(false);
            return;
        }
        setProjectMissing(true);
        const query = stateToQuery(state);
        navigate({ search: query ? `?${query}` : '' }, { replace: true });
    }, [requested.project, project, state, navigate]);

    useEffect(() => {
        document.title = project ? `${project.title} · Eventos académicos` : PAGE_TITLE;
        return () => { document.title = 'Banco de Proyectos IoT - UNIMAYOR'; };
    }, [project]);

    const { today, affinityByEvent, counts, shown, noProjectEvents } = useEventResults({ events, project, state });

    const isFiltered = stateToQuery({ ...state, project: null, sort: DEFAULT_STATE.sort }) !== '';
    const chips = eventFilterChips(state);

    function clearFilters() {
        go({ ...DEFAULT_STATE, topics: [], sort: state.sort, ...(state.project ? { project: state.project } : {}) });
        searchRef.current?.focus();
    }
    function showAllEvents() {
        const { project: _drop, ...rest } = state; // eslint-disable-line no-unused-vars
        go({ ...rest, sort: rest.sort === 'affinity' ? DEFAULT_STATE.sort : rest.sort });
        searchRef.current?.focus();
    }

    return (
        <div className="py-8 space-y-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5">
                <div>
                    <p className="text-xs font-bold text-sem-text-2 uppercase tracking-wider">Banco de Proyectos</p>
                    <h1 className="mt-1 mb-1.5 text-3xl max-md:text-[24px] leading-tight font-extrabold text-gray-900">Buscador de eventos académicos</h1>
                    <p className="max-w-3xl text-[15px] text-gray-700">
                        Encuentre <strong>congresos con convocatoria</strong> para presentar su proyecto y <strong>eventos para asistir</strong>: talleres, charlas, ferias y hackatones.
                    </p>
                </div>
                <Link to="/proyectos" className="btn btn-secondary self-start focus-ring"><ArrowLeft size={16} aria-hidden="true" />Volver al banco de proyectos</Link>
            </div>

            <p><Link to="/oportunidades" className="link-action focus-ring rounded">Mis oportunidades guardadas →</Link></p>

            <DataStatus updated={dataUpdatedText(generated)}>
                <p>{dataStatusText(generated)}</p>
                <p>El listado se actualiza automáticamente cada semana con WikiCFP, ccf-deadlines y Devpost; si alguna fuente no responde, se conserva el listado anterior. La fecha indica cuándo se generó el listado, no cuándo se verificó cada evento. Confirme fechas y sede en el sitio oficial.</p>
            </DataStatus>

            {projectMissing && (
                <p role="status" className="rounded-xl border border-gray-200 border-l-[5px] border-l-institutional-yellow bg-sem-attention-bg px-4 py-3 text-sm text-institutional-dark">No se encontró el proyecto</p>
            )}
            {project && <ProjectPanel project={project} onShowAll={showAllEvents} />}

            <EventFilters state={state} hasProject={Boolean(project)} topics={knownTopics} counts={counts} onChange={update} searchRef={searchRef} />

            <div className="space-y-2.5">
                <h2 aria-live="polite" className="text-[22px] font-extrabold leading-tight text-gray-900">
                    {shown.length
                        ? `${plural(shown.length, 'evento vigente', 'eventos vigentes')}${project ? ' afines al proyecto' : ''}`
                        : 'Sin resultados'}
                </h2>
                {chips.length > 0 && (
                    <div role="group" aria-label="Filtros activos" className="flex flex-wrap items-center gap-2">
                        <span className="mr-0.5 text-[13.5px] font-semibold text-gray-700">Filtros activos:</span>
                        {chips.map((chip) => (
                            <span key={chip.id} className="filter-chip">
                                <span><small>{chip.group}:</small> {chip.text}</span>
                                <button type="button" onClick={() => update(chip.patch)} aria-label={`Quitar filtro: ${chip.group}: ${chip.text}`}>
                                    <X size={15} aria-hidden="true" />
                                </button>
                            </span>
                        ))}
                        {isFiltered && shown.length > 0 && (
                            <button type="button" onClick={clearFilters} className="link-action focus-ring rounded">Limpiar filtros</button>
                        )}
                    </div>
                )}
            </div>

            <EventComparison events={events} selected={selected} onClear={() => setSelected([])} />

            <section aria-label="Eventos encontrados">
                <div className="grid gap-4">
                    {shown.map((event) => {
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
                {shown.length === 0 && !noProjectEvents && (
                    <div className="text-center p-7 text-sem-text-2 border border-dashed border-sem-control-line rounded-2xl bg-white">
                        <p className="mb-3">Ningún evento vigente cumple estos filtros.</p>
                        <button type="button" onClick={clearFilters} className="btn btn-secondary">Limpiar filtros</button>
                    </div>
                )}
                {noProjectEvents && (
                    <div className="text-center p-7 text-sem-text-2 border border-dashed border-sem-control-line rounded-2xl bg-white">
                        <p className="mb-3">Ningún evento vigente comparte temas con este proyecto.</p>
                        <button type="button" onClick={showAllEvents} className="btn btn-secondary">Ver todos los eventos</button>
                    </div>
                )}
            </section>

            <footer className="border-t border-gray-200 pt-4 text-[13px] text-sem-text-2 space-y-1.5">
                <p>{dataInfoText(generated, sources)}</p>
                <p>Las fechas se obtienen automáticamente y pueden cambiar: confírmelas siempre en el sitio oficial de cada evento. Banco de Proyectos · UNIMAYOR, Popayán.</p>
            </footer>
        </div>
    );
}

// The event data is a static file downloaded when the page opens (the project panel shares the same download).
export default function Eventos() {
    return <DataGate file={DATA_FILES.eventos} what="los eventos" rows={5}>{(data) => <EventosPage eventosData={data} />}</DataGate>;
}
