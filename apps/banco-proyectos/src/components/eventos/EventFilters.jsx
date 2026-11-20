import { Check, MapPin, Search } from 'lucide-react';
import { KIND_FILTER_LABELS, eventFilterChips, plural } from '../../lib/eventos/display';
import { activeCountLabel } from '../../lib/catalog';

// A filter section: visible title, then one line that says what it does (same pattern as the project catalog).
const Section = ({ title, hint, className = '', children }) => (
    <fieldset className={`m-0 min-w-0 border-0 p-0 ${className}`}>
        <legend className="float-left w-full p-0"><h3 className="text-[15px] font-bold text-gray-900">{title}</h3></legend>
        <p className="field-hint clear-both">{hint}</p>
        {children}
    </fieldset>
);

const Field = ({ id, label, children }) => (
    <div className="min-w-0">
        <label htmlFor={id} className="field-label mb-1 !text-[13.5px]">{label}</label>
        {children}
    </div>
);

// Filter panel of the event finder. It holds no state: every change goes up through onChange(patch).
const EventFilters = ({ state, hasProject, topics, counts, onChange, searchRef }) => {
    const activeCount = eventFilterChips(state).length;
    return (
        <section role="search" aria-label="Filtros de eventos" className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-extrabold text-gray-900">Filtros</h2>
                    <span className={activeCount > 0 ? 'count-badge' : 'count-pill'}>{activeCountLabel(activeCount)}</span>
                </div>
                <div className="flex items-center gap-2.5">
                    <label htmlFor="sort" className="text-sm font-semibold text-gray-700">Ordenar por</label>
                    <select id="sort" value={state.sort} onChange={(event) => onChange({ sort: event.target.value })} className="field-select">
                        {hasProject && <option value="affinity">Afinidad</option>}
                        <option value="deadline">Cierre más próximo</option>
                        <option value="start">Fecha del evento</option>
                        <option value="title">Nombre (A–Z)</option>
                    </select>
                </div>
            </div>
            <p className="mb-4 mt-1 text-[13px] text-sem-text-2">
                Combina tipo, búsqueda, modalidad, fechas y temas. Los números de cada tema indican cuántos eventos vigentes hay.
            </p>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] gap-x-10 gap-y-5">
                <Section title="Tipo de evento" hint="Elige entre convocatorias para presentar tu trabajo y eventos para asistir.">
                    <div className="seg w-full sm:w-auto">
                        {Object.entries(KIND_FILTER_LABELS).map(([value, label]) => (
                            <button key={value} type="button" aria-pressed={state.kind === value} onClick={() => onChange({ kind: value })}>
                                {label}
                            </button>
                        ))}
                    </div>
                </Section>

                <Section title="Búsqueda" hint="Busca en el nombre del evento y en su lugar.">
                    <label htmlFor="search" className="field-label mb-1 !text-[13.5px]">Buscar por nombre o lugar</label>
                    <div className="relative">
                        <Search className="absolute left-[13px] top-1/2 -mt-2 text-sem-text-2" size={16} aria-hidden="true" />
                        <input
                            id="search"
                            ref={searchRef}
                            type="search"
                            value={state.query}
                            onChange={(event) => onChange({ query: event.target.value })}
                            placeholder="Ej.: IoT, Popayán, Lima"
                            autoComplete="off"
                            className="field-input"
                        />
                    </div>
                </Section>

                <Section title="Modalidad y ubicación" hint="Cómo se realiza el evento y en qué ciudad o país.">
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(140px,100%),1fr))] gap-3">
                        <Field id="modality" label="Modalidad">
                            <select id="modality" value={state.modality} onChange={(event) => onChange({ modality: event.target.value })} className="field-select w-full">
                                <option value="all">Todas</option>
                                <option value="online">En línea</option>
                                <option value="presencial">Presencial</option>
                            </select>
                        </Field>
                        <Field id="location" label="Ciudad o país">
                            <div className="relative">
                                <MapPin className="absolute left-[13px] top-1/2 -mt-2 text-sem-text-2" size={16} aria-hidden="true" />
                                <input id="location" type="search" value={state.location} onChange={(event) => onChange({ location: event.target.value })} placeholder="Ej.: Popayán" className="field-input !h-10" />
                            </div>
                        </Field>
                    </div>
                    <label className="mt-2 inline-flex min-h-[36px] cursor-pointer items-center gap-2.5 text-sm font-semibold text-gray-700">
                        <input type="checkbox" checked={state.colombia} onChange={(event) => onChange({ colombia: event.target.checked })} className="h-[18px] w-[18px] cursor-pointer accent-institutional-blue focus-ring" />
                        Solo Colombia
                    </label>
                </Section>

                <Section title="Fechas" hint="Se filtra por la fecha de inicio del evento. Si usas este filtro, se excluyen los eventos sin fecha de inicio.">
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(140px,100%),1fr))] gap-3">
                        <Field id="date-from" label="Inicio desde">
                            <input id="date-from" type="date" value={state.dateFrom} onChange={(event) => onChange({ dateFrom: event.target.value })} className="field-input !h-10 !pl-3" />
                        </Field>
                        <Field id="date-to" label="Inicio hasta">
                            <input id="date-to" type="date" value={state.dateTo} onChange={(event) => onChange({ dateTo: event.target.value })} className="field-input !h-10 !pl-3" />
                        </Field>
                    </div>
                </Section>
            </div>

            <Section title="Temas" hint="Elige uno o varios temas. El número indica cuántos eventos vigentes hay." className="mt-5 border-t pt-[18px]">
                <div className="flex flex-wrap gap-2">
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
                                className="chip chip-sm"
                            >
                                <Check size={14} aria-hidden="true" className="chip-check flex-none" />
                                {topic}
                                <span aria-hidden="true" className="chip-count">{n}</span>
                            </button>
                        );
                    })}
                </div>
            </Section>
        </section>
    );
};

export default EventFilters;
