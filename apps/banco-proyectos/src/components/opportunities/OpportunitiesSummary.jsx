import { useId } from 'react';
import { Check } from 'lucide-react';
import { STATUS_LABELS } from '../../lib/opportunities';
import { STATUS_KEYS, STATUS_TONES } from '../../lib/opportunitiesView';

const countText = (n) => `${n} ${n === 1 ? 'oportunidad' : 'oportunidades'}`;

// «Resumen»: the total saved and one count card per status. Each card is a toggle filter (aria-pressed): pressing it
// lists only that status, pressing it again (or «Ver todas») lists everything. Counts follow the type and the search.
export default function OpportunitiesSummary({ total, counts, status, onStatus }) {
    const headingId = useId();
    const labelId = useId();
    return <section aria-labelledby={headingId} className="space-y-3">
        <h2 id={headingId} className="m-0 text-xl font-bold text-gray-900">Resumen</h2>
        <div className="flex flex-col gap-3 min-[900px]:flex-row min-[900px]:items-end">
            <p className="stat-total m-0"><span className="stat-label">Guardadas</span><span className="stat-n">{total}</span></p>
            <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex items-center justify-between gap-3">
                    <p id={labelId} className="m-0 text-sm font-bold text-gray-900">Filtrar por estado</p>
                    {status !== 'all' && <button type="button" onClick={() => onStatus('all')} className="link-action">Ver todas</button>}
                </div>
                <div role="group" aria-labelledby={labelId} className="grid grid-cols-2 gap-2.5 min-[900px]:grid-cols-4">
                    {STATUS_KEYS.map((key) => <button
                        key={key}
                        type="button"
                        aria-pressed={status === key}
                        aria-label={`${STATUS_LABELS[key]}: ${countText(counts[key])}`}
                        onClick={() => onStatus(status === key ? 'all' : key)}
                        className={`stat-card tn-${STATUS_TONES[key]}`}
                    >
                        <span className="stat-label"><span className="opp-dot" aria-hidden="true" />{STATUS_LABELS[key]}<Check size={14} aria-hidden="true" className="stat-check" /></span>
                        <span className="stat-n">{counts[key]}</span>
                    </button>)}
                </div>
            </div>
        </div>
    </section>;
}
