import { useState } from 'react';
import { formatDate, formatRange } from '../../lib/eventos/filters';
import { affinityLevel } from '../../lib/eventos/affinity';
import { KIND_LABELS, SOURCE_LABELS, affinityBreakdown, daysBadge, locationText, mapSearchUrl, physicalLocation, safeUrl } from '../../lib/eventos/display';
import { favoriteLabel, favoriteSnapshot, toggleFavorite } from '../../lib/eventos/favorites';

const RING_COLORS = { high: '#15803D', mid: '#1D4ED8', low: '#EA580C' }; // green-700, blue-700, orange-600
const buttonClass = 'text-[13px] font-semibold px-3.5 py-2 rounded-lg border border-institutional-blue text-center whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-institutional-yellow disabled:opacity-55 disabled:cursor-not-allowed';

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
            className={`${buttonClass} bg-white text-institutional-blue hover:bg-blue-50`}
        >
            {failed ? 'No se pudo guardar' : favoriteLabel(snapshot)}
        </button>
    );
}

function AffinityRing({ total }) {
    const color = RING_COLORS[affinityLevel(total)];
    return (
        <div
            role="img"
            aria-label={`Afinidad estimada ${total} %`}
            className="w-[72px] h-[72px] rounded-full grid place-items-center"
            style={{ background: `conic-gradient(${color} ${total}%, #F3F4F6 0)` }}
        >
            <div className="w-[58px] h-[58px] rounded-full bg-white grid place-items-center text-center leading-none">
                <span>
                    <b className="block text-lg text-gray-900">{total}%</b>
                    <span className="block mt-[3px] text-[9.5px] text-gray-500 uppercase tracking-wide">afinidad</span>
                </span>
            </div>
        </div>
    );
}

function AffinityDetails({ event, affinity, today }) {
    return (
        <details className="mt-2 text-[13px]">
            <summary className="cursor-pointer text-institutional-blue font-semibold inline-block rounded">¿Por qué {affinity.total} %?</summary>
            <div className="grid grid-cols-[minmax(0,1fr)_64px_40px] sm:grid-cols-[minmax(150px,210px)_minmax(80px,1fr)_48px] gap-x-2.5 gap-y-1 items-center mt-2 text-gray-600">
                {affinityBreakdown(event, affinity, today).map((part) => (
                    <div key={part.key} className="contents">
                        <span>{part.label}</span>
                        <i role="img" aria-label={`${part.value} de ${part.max}`} className="block h-2 rounded-full bg-gray-100 overflow-hidden">
                            <span className="block h-full bg-institutional-blue" style={{ width: `${part.percent}%` }} />
                        </i>
                        <em className="not-italic text-xs text-gray-500 text-right tabular-nums">{part.value}/{part.max}</em>
                        <small className="col-span-full text-xs text-gray-500 -mt-0.5 mb-1">{part.detail}</small>
                    </div>
                ))}
            </div>
        </details>
    );
}

function Fact({ label, value }) {
    return value ? <div className="flex gap-1.5 items-baseline"><dt className="font-semibold text-gray-500">{label}</dt><dd className="m-0">{value}</dd></div> : null;
}

const Tag = ({ className, children }) => <span className={`inline-block text-[11.5px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap ${className}`}>{children}</span>;

// One event: badges, facts, topics, optional affinity (when a project is selected), compare/save/source actions and map.
const EventCard = ({ event, affinity, today, selected, compareFull, onToggleCompare }) => {
    const isCfp = event.kind === 'cfp';
    const badge = daysBadge(event, today);
    const where = physicalLocation(event);
    const sourceUrl = safeUrl(event.url);
    const sourceLabel = isCfp ? 'Ver convocatoria' : 'Ver evento';
    const columns = affinity ? 'sm:grid-cols-[84px_minmax(0,1fr)_auto]' : 'sm:grid-cols-[minmax(0,1fr)_auto]';
    return (
        <article className={`bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-blue-100 hover:shadow-md transition-shadow px-[18px] py-4 grid grid-cols-1 ${columns} gap-x-[18px] gap-y-2 items-start`}>
            {affinity && <AffinityRing total={affinity.total} />}
            <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                    <Tag className={isCfp ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}>{KIND_LABELS[event.kind] || event.kind}</Tag>
                    {event.online && <Tag className="bg-gray-100 text-gray-700">En línea</Tag>}
                    {badge && <Tag className={badge.soon ? 'bg-orange-50 text-orange-700 border border-orange-600' : 'bg-blue-50 text-blue-800'}>{badge.text}</Tag>}
                </div>
                <h2 className="m-0 text-[17px] leading-snug font-bold text-gray-900">{event.title}</h2>
                {event.name && event.name !== event.title && <p className="mt-0.5 mb-2 text-[13.5px] text-gray-600">{event.name}</p>}
                <dl className="flex flex-wrap gap-x-[18px] gap-y-1 mt-2 mb-2 text-[13.5px] text-gray-700">
                    <Fact label="Fechas" value={formatRange(event.start, event.end) || 'Por confirmar'} />
                    <Fact label="Lugar" value={locationText(event)} />
                    {event.deadline && <Fact label={isCfp ? 'Cierre de envíos' : 'Cierre de inscripción'} value={formatDate(event.deadline)} />}
                </dl>
                <div className="flex flex-wrap gap-1.5" aria-label="Temas">
                    {(event.topics || []).map((topic) => <span key={topic} className="bg-gray-100 text-gray-700 rounded-full px-2.5 py-0.5 text-xs font-medium">{topic}</span>)}
                </div>
                {affinity && <AffinityDetails event={event} affinity={affinity} today={today} />}
            </div>
            <div className="flex flex-row sm:flex-col flex-wrap sm:flex-nowrap gap-2 items-center sm:items-end justify-between sm:justify-start sm:text-right">
                <button
                    type="button"
                    aria-pressed={selected}
                    aria-label={`Comparar ${event.title}`}
                    disabled={!selected && compareFull}
                    onClick={() => onToggleCompare(event)}
                    className={`${buttonClass} text-institutional-blue ${selected ? 'bg-blue-50' : 'bg-white hover:bg-blue-50'}`}
                >
                    {selected ? 'Quitar de comparación' : 'Comparar'}
                </button>
                <FavoriteButton event={event} />
                <span className="text-xs text-gray-500">Fuente: {SOURCE_LABELS[event.source] || event.source}</span>
                {sourceUrl && (
                    <a
                        href={sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${sourceLabel}: ${event.title} (se abre en una pestaña nueva)`}
                        className={`${buttonClass} bg-institutional-blue text-white hover:bg-blue-800`}
                    >
                        {sourceLabel}
                    </a>
                )}
            </div>
            {where && (
                <div className="col-span-full border-t border-gray-100 pt-3.5 mt-1 text-sm">
                    <strong>Ubicación publicada</strong>
                    <p className="mt-1 mb-3 text-gray-600">El mapa se basa en el lugar publicado; confirme la sede en la fuente oficial.</p>
                    <a
                        href={mapSearchUrl(where)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ver mapa de ${where} en Google Maps (se abre en una pestaña nueva)`}
                        className={`${buttonClass} inline-block bg-white text-institutional-blue hover:bg-blue-50`}
                    >
                        Ver mapa ampliado
                    </a>
                </div>
            )}
        </article>
    );
};

export default EventCard;
