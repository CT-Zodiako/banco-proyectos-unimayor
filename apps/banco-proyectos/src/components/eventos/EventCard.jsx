import { useState } from 'react';
import { CalendarDays, ChevronDown, Clock, FileText, MapPin, Users, Wifi } from 'lucide-react';
import AffinityRing from '../publicar/AffinityRing';
import { formatDate, formatRange } from '../../lib/eventos/filters';
import { AFFINITY_THRESHOLDS, affinityLevel } from '../../lib/eventos/affinity';
import { KIND_LABELS, SOURCE_LABELS, affinityBreakdown, daysBadge, locationText, mapSearchUrl, physicalLocation, safeUrl } from '../../lib/eventos/display';
import { favoriteLabel, favoriteSnapshot, toggleFavorite } from '../../lib/eventos/favorites';

const browserStorage = () => {
    try { return window.localStorage; } catch { return null; }
};

// "Guardar" uses the same store as the Mis oportunidades page; the label tells whether the event is saved.
function FavoriteButton({ event }) {
    const [snapshot, setSnapshot] = useState(() => favoriteSnapshot(browserStorage(), event.id));
    const [failed, setFailed] = useState(false);
    function toggle() {
        try {
            const saved = toggleFavorite(browserStorage(), event);
            setSnapshot({ available: true, saved });
            setFailed(false);
        } catch { setFailed(true); }
    }
    return (
        <button
            type="button"
            onClick={toggle}
            disabled={!snapshot.available}
            aria-label={`Guardar ${event.title} en mis oportunidades`}
            className="btn btn-secondary"
        >
            {failed ? 'No se pudo guardar' : favoriteLabel(snapshot)}
        </button>
    );
}

function AffinityDetails({ event, affinity, today }) {
    return (
        <details className="group mt-2 text-[13px]">
            <summary className="focus-ring inline-flex min-h-[32px] cursor-pointer list-none flex-wrap items-center gap-x-1.5 rounded-md py-1 text-[13.5px] font-semibold text-institutional-blue hover:text-blue-800 [&::-webkit-details-marker]:hidden">
                <span className="underline underline-offset-[3px]">Ver por qué {affinity.total} % de afinidad</span>
                <ChevronDown size={15} aria-hidden="true" className="flex-none transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-2 grid grid-cols-[minmax(0,1fr)_64px_40px] items-center gap-x-2.5 gap-y-1 text-gray-700 sm:grid-cols-[minmax(150px,210px)_minmax(80px,1fr)_48px]">
                {affinityBreakdown(event, affinity, today).map((part) => (
                    <div key={part.key} className="contents">
                        <span>{part.label}</span>
                        <i role="img" aria-label={`${part.value} de ${part.max}`} className="block h-2 overflow-hidden rounded-full bg-gray-100">
                            <span className="block h-full bg-institutional-blue" style={{ width: `${part.percent}%` }} />
                        </i>
                        <em className="text-right text-xs not-italic tabular-nums text-sem-text-2">{part.value}/{part.max}</em>
                        <small className="col-span-full -mt-0.5 mb-1 text-xs text-sem-text-2">{part.detail}</small>
                    </div>
                ))}
            </div>
        </details>
    );
}

// One fact of the card: icon + visible label + value (dates, place, closing date).
function Fact({ icon: Icon, label, value, children }) {
    return value ? (
        <div className="flex flex-wrap items-center gap-x-2">
            <dt className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold text-sem-text-2">
                <Icon size={15} aria-hidden="true" className="flex-none" />
                {label}
            </dt>
            <dd className="m-0 flex flex-wrap items-center gap-x-2 font-medium text-gray-900">{value}{children}</dd>
        </div>
    ) : null;
}

// One event: type badge and the closing-soon badge when applicable, title, subtitle, facts with icons, topics, optional
// affinity (when a project is selected), and the actions: primary "Ver convocatoria", secondary Guardar / Comparar and a
// tertiary "Ver mapa" next to the place.
const EventCard = ({ event, affinity, today, selected, compareFull, onToggleCompare }) => {
    const isCfp = event.kind === 'cfp';
    const badge = daysBadge(event, today);
    const where = physicalLocation(event);
    const sourceUrl = safeUrl(event.url);
    const sourceLabel = isCfp ? 'Ver convocatoria' : 'Ver evento';
    const KindIcon = isCfp ? FileText : Users;
    return (
        <article className="flex flex-col gap-3.5 min-[1536px]:grid min-[1536px]:grid-cols-[minmax(0,1fr)_auto] min-[1536px]:gap-x-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:border-sem-area-line hover:shadow-md">
            <div className="flex gap-4">
                {affinity && <AffinityRing total={affinity.total} level={affinityLevel(affinity.total)} thresholds={AFFINITY_THRESHOLDS} />}
                <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-1.5">
                        <span className={`badge ${isCfp ? 'badge-events' : 'badge-events-soft'}`}>
                            <KindIcon size={15} aria-hidden="true" className="flex-none" />
                            {KIND_LABELS[event.kind] || event.kind}
                        </span>
                        {event.online && (
                            <span className="badge badge-sector"><Wifi size={15} aria-hidden="true" className="flex-none" />En línea</span>
                        )}
                        {badge && (
                            <span className={`badge ${badge.soon ? 'badge-attn' : 'badge-sector'}`}>
                                <Clock size={15} aria-hidden="true" className="flex-none" />
                                {badge.text}
                            </span>
                        )}
                    </div>
                    <h2 className="m-0 text-[18px] font-bold leading-snug text-gray-900">{event.title}</h2>
                    {event.name && event.name !== event.title && <p className="mb-0 mt-1 text-sm text-sem-text-2">{event.name}</p>}
                    <dl className="mb-0 mt-3 flex flex-wrap gap-x-[22px] gap-y-1.5 text-[13.5px]">
                        <Fact icon={CalendarDays} label="Fechas" value={formatRange(event.start, event.end) || 'Por confirmar'} />
                        <Fact icon={MapPin} label="Lugar" value={locationText(event)}>
                            {where && (
                                <a
                                    href={mapSearchUrl(where)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Ver mapa de ${where} en Google Maps (se abre en una pestaña nueva)`}
                                    data-tip="Abre Google Maps con el lugar publicado; confirme la sede en la fuente oficial"
                                    className="btn btn-tertiary !min-h-[28px] !px-1.5 !text-[13px]"
                                >
                                    Ver mapa
                                </a>
                            )}
                        </Fact>
                        {event.deadline && <Fact icon={Clock} label={isCfp ? 'Cierre de envíos' : 'Cierre de inscripción'} value={formatDate(event.deadline)} />}
                    </dl>
                    {(event.topics || []).length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Temas">
                            {event.topics.map((topic) => <span key={topic} className="badge badge-sector !font-medium">{topic}</span>)}
                        </div>
                    )}
                    {affinity && <AffinityDetails event={event} affinity={affinity} today={today} />}
                </div>
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3.5 min-[1536px]:mt-0 min-[1536px]:w-[210px] min-[1536px]:flex-col min-[1536px]:items-stretch min-[1536px]:border-l min-[1536px]:border-t-0 min-[1536px]:pl-8 min-[1536px]:pt-0">
                {sourceUrl && (
                    <a
                        href={sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${sourceLabel}: ${event.title} (se abre en una pestaña nueva)`}
                        className="btn btn-events"
                    >
                        {sourceLabel}
                    </a>
                )}
                <FavoriteButton event={event} />
                <button
                    type="button"
                    aria-pressed={selected}
                    aria-label={`Comparar ${event.title}`}
                    disabled={!selected && compareFull}
                    onClick={() => onToggleCompare(event)}
                    className={`btn btn-secondary ${selected ? '!bg-sem-area-bg' : ''}`}
                >
                    {selected ? 'Quitar de comparación' : 'Comparar'}
                </button>
                <span className="text-[13px] text-sem-text-2 sm:ml-auto min-[1536px]:ml-0">Fuente: {SOURCE_LABELS[event.source] || event.source}</span>
            </div>
        </article>
    );
};

export default EventCard;
