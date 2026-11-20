import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import eventosData from '../data/eventos.json';
import EventCard from '../components/eventos/EventCard';
import EventComparison from '../components/eventos/EventComparison';
import EventFilters from '../components/eventos/EventFilters';
import ProjectPanel from '../components/eventos/ProjectPanel';
import { rankForProject } from '../lib/eventos/affinity';
import { comparisonKey, dataInfoText, dataStatusText, plural } from '../lib/eventos/display';
import { DEFAULT_STATE, MAX_COMPARISON, filterEvents, localIsoDate, parseQuery, sortEvents, stateToQuery, toggleComparison, topicCounts } from '../lib/eventos/filters';

const { events, topics: knownTopics, projects, generated, sources } = eventosData;
const projectsById = new Map(projects.map((project) => [project.id, project]));
const PAGE_TITLE = 'Buscador de eventos académicos · Banco de Proyectos · UNIMAYOR';

// Filters live in the URL (?p, kind, tema, modalidad, co, q, orden, desde, hasta, lugar), so a search can be shared.
// With ?p=<project id> only the events sharing a topic with that project are listed, ranked by estimated affinity.
export default function Eventos() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const today = useMemo(() => localIsoDate(new Date()), []);
    const [selected, setSelected] = useState([]);
    const [projectMissing, setProjectMissing] = useState(false);
    const searchRef = useRef(null);

    const requested = useMemo(() => {
        const parsed = parseQuery(search);
        return { ...parsed, topics: parsed.topics.filter((topic) => knownTopics.includes(topic)) };
    }, [search]);
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

    const ranked = useMemo(() => (project ? rankForProject(events, project, today) : []), [project, today]);
    const affinityByEvent = useMemo(() => new Map(ranked.map((item) => [item.event, item.affinity])), [ranked]);
    const baseEvents = useMemo(() => (project ? ranked.map((item) => item.event) : events), [project, ranked]);

    // Counts follow every other filter, so each pill tells how many results selecting it would add.
    const counts = useMemo(
        () => topicCounts(filterEvents(baseEvents, { ...state, topics: [], today })),
        [baseEvents, state, today],
    );
    const shown = useMemo(() => {
        // Ranked events are already in affinity order; filterEvents keeps the order it receives.
        const filtered = filterEvents(baseEvents, { ...state, today });
        return state.sort === 'affinity' ? filtered : sortEvents(filtered, state.sort);
    }, [baseEvents, state, today]);

    const isFiltered = stateToQuery({ ...state, project: null, sort: DEFAULT_STATE.sort }) !== '';
    const noProjectEvents = Boolean(project) && ranked.length === 0;

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
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Banco de Proyectos</p>
                    <h1 className="mt-1 mb-1.5 text-2xl max-md:text-[21px] leading-snug font-bold text-gray-900">Buscador de eventos académicos</h1>
                    <p className="max-w-3xl text-[15px] text-gray-600">
                        Encuentre <strong>congresos con convocatoria</strong> para presentar su proyecto y <strong>eventos para asistir</strong>: talleres, charlas, ferias y hackatones.
                    </p>
                </div>
                <Link to="/proyectos" className="text-sm font-semibold text-institutional-blue whitespace-nowrap border border-blue-100 rounded-lg px-3.5 py-2 bg-white self-start hover:bg-blue-50">← Volver al banco de proyectos</Link>
            </div>

            <p><Link to="/oportunidades" className="text-institutional-blue underline">Mis oportunidades guardadas →</Link></p>

            <section aria-label="Estado de los datos" className="bg-white border-l-4 border-institutional-yellow rounded-r-xl px-3.5 py-2.5 text-[13.5px] text-gray-700 shadow-sm">
                <strong>Estado de los datos</strong>
                <p className="mt-1">{dataStatusText(generated)}</p>
                <p className="mt-1">El listado se actualiza automáticamente cada semana con WikiCFP, ccf-deadlines y Devpost; si alguna fuente no responde, se conserva el listado anterior. La fecha indica cuándo se generó el listado, no cuándo se verificó cada evento. Confirme fechas y sede en el sitio oficial.</p>
            </section>

            {projectMissing && (
                <p role="status" className="bg-white border-l-4 border-institutional-yellow rounded-r-xl px-3.5 py-2.5 text-[13.5px] text-gray-700 shadow-sm">No se encontró el proyecto</p>
            )}
            {project && <ProjectPanel project={project} onShowAll={showAllEvents} />}

            <EventFilters state={state} hasProject={Boolean(project)} topics={knownTopics} counts={counts} onChange={update} searchRef={searchRef} />

            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600" aria-live="polite">
                    {shown.length
                        ? `${plural(shown.length, 'evento vigente', 'eventos vigentes')}${project ? ' afines al proyecto' : ''}`
                        : 'Sin resultados'}
                </span>
                {isFiltered && shown.length > 0 && (
                    <button type="button" onClick={clearFilters} className="text-[13px] font-semibold text-institutional-blue underline rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-institutional-yellow">Limpiar filtros</button>
                )}
            </div>

            <EventComparison events={events} selected={selected} onClear={() => setSelected([])} />

            <section aria-label="Eventos encontrados">
                <div className="grid gap-3">
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
                    <div className="text-center p-7 text-gray-500 border border-dashed border-gray-200 rounded-2xl bg-white">
                        <p className="mb-3">Ningún evento vigente cumple estos filtros.</p>
                        <button type="button" onClick={clearFilters} className="px-4 py-2.5 rounded-lg border border-institutional-blue bg-white text-institutional-blue font-semibold hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-institutional-yellow">Limpiar filtros</button>
                    </div>
                )}
                {noProjectEvents && (
                    <div className="text-center p-7 text-gray-500 border border-dashed border-gray-200 rounded-2xl bg-white">
                        <p className="mb-3">Ningún evento vigente comparte temas con este proyecto.</p>
                        <button type="button" onClick={showAllEvents} className="px-4 py-2.5 rounded-lg border border-institutional-blue bg-white text-institutional-blue font-semibold hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-institutional-yellow">Ver todos los eventos</button>
                    </div>
                )}
            </section>

            <footer className="border-t border-gray-200 pt-4 text-[13px] text-gray-500 space-y-1.5">
                <p>{dataInfoText(generated, sources)}</p>
                <p>Las fechas se obtienen automáticamente y pueden cambiar: confírmelas siempre en el sitio oficial de cada evento. Banco de Proyectos · UNIMAYOR, Popayán.</p>
            </footer>
        </div>
    );
}
