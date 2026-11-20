import { plural } from '../../lib/eventos/display';

const KIND_OPTIONS = [['all', 'Todos'], ['cfp', 'Convocatorias (presentar)'], ['attend', 'Para asistir']];
const inputClass = 'px-2.5 py-2 border border-gray-200 rounded-xl text-sm bg-white text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-institutional-yellow';
const fieldClass = 'inline-flex items-center gap-2 text-sm text-gray-600';

// Filter panel of the event finder. It holds no state: every change goes up through onChange(patch).
const EventFilters = ({ state, hasProject, topics, counts, onChange, searchRef }) => (
    <section role="search" aria-label="Filtros de eventos" className="bg-white border border-gray-100 rounded-2xl shadow-sm px-4 py-3.5 grid gap-3">
        <div className="flex flex-wrap items-center gap-3">
            <div role="group" aria-label="Tipo de evento" className="inline-flex max-w-full w-full sm:w-auto border border-gray-200 rounded-xl overflow-hidden">
                {KIND_OPTIONS.map(([value, label]) => (
                    <button
                        key={value}
                        type="button"
                        aria-pressed={state.kind === value}
                        onClick={() => onChange({ kind: value })}
                        className={`flex-1 sm:flex-none px-3 py-2 text-[13px] font-semibold border-r border-gray-200 last:border-r-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-institutional-yellow ${state.kind === value ? 'bg-institutional-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <label className="sr-only" htmlFor="search">Buscar por nombre o lugar</label>
            <input
                id="search"
                ref={searchRef}
                type="search"
                value={state.query}
                onChange={(event) => onChange({ query: event.target.value })}
                placeholder="Buscar por nombre, ciudad o país…"
                autoComplete="off"
                className={`${inputClass} flex-1 min-w-0 sm:min-w-[220px]`}
            />
        </div>
        <div className="flex flex-wrap items-center gap-3">
            <label className={fieldClass} htmlFor="modality">Modalidad
                <select id="modality" value={state.modality} onChange={(event) => onChange({ modality: event.target.value })} className={inputClass}>
                    <option value="all">Todas</option>
                    <option value="online">En línea</option>
                    <option value="presencial">Presencial</option>
                </select>
            </label>
            <label className="inline-flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={state.colombia} onChange={(event) => onChange({ colombia: event.target.checked })} className="w-4 h-4 accent-institutional-blue" />
                Solo Colombia
            </label>
            <label className={fieldClass} htmlFor="sort">Ordenar
                <select id="sort" value={state.sort} onChange={(event) => onChange({ sort: event.target.value })} className={inputClass}>
                    {hasProject && <option value="affinity">Afinidad</option>}
                    <option value="deadline">Cierre más próximo</option>
                    <option value="start">Fecha del evento</option>
                    <option value="title">Nombre (A–Z)</option>
                </select>
            </label>
        </div>
        <div className="flex flex-wrap items-center gap-3">
            <label className={fieldClass} htmlFor="date-from">Inicio desde
                <input id="date-from" type="date" value={state.dateFrom} onChange={(event) => onChange({ dateFrom: event.target.value })} className={inputClass} />
            </label>
            <label className={fieldClass} htmlFor="date-to">Inicio hasta
                <input id="date-to" type="date" value={state.dateTo} onChange={(event) => onChange({ dateTo: event.target.value })} className={inputClass} />
            </label>
            <label className={fieldClass} htmlFor="location">Ciudad o país
                <input id="location" type="search" value={state.location} onChange={(event) => onChange({ location: event.target.value })} placeholder="Ej.: Popayán" className={inputClass} />
            </label>
        </div>
        <p className="m-0 text-xs text-gray-600">Las fechas filtran por el inicio del evento; se excluyen eventos sin fecha de inicio cuando se usa este filtro.</p>
        <fieldset className="border-0 m-0 p-0 min-w-0">
            <legend className="p-0 mb-2 text-[11.5px] font-bold uppercase tracking-wider text-gray-400">Temas</legend>
            <div className="flex flex-wrap gap-1.5">
                {topics.map((topic) => {
                    const pressed = state.topics.includes(topic);
                    const n = counts[topic] || 0;
                    return (
                        <button
                            key={topic}
                            type="button"
                            aria-pressed={pressed}
                            aria-label={`${topic}, ${plural(n, 'evento', 'eventos')}`}
                            onClick={() => onChange({ topics: pressed ? state.topics.filter((t) => t !== topic) : [...state.topics, topic] })}
                            className={`rounded-full border px-2.5 py-1 text-[13px] font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-institutional-yellow ${pressed ? 'bg-institutional-blue border-institutional-blue text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                        >
                            {topic}
                            <span aria-hidden="true" className={`ml-1 text-xs ${pressed ? 'text-blue-100' : 'text-gray-400'}`}>{n}</span>
                        </button>
                    );
                })}
            </div>
        </fieldset>
    </section>
);

export default EventFilters;
