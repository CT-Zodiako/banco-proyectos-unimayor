import { useId } from 'react';
import { STATUS_TONES, groupByStatus } from '../../lib/opportunitiesView';

function Column({ column, renderCard }) {
    const headingId = useId();
    return <section aria-labelledby={headingId} className={`hue-card tn-${STATUS_TONES[column.status]} flex min-w-0 flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-3`}>
        <h3 id={headingId} className="m-0 flex items-center justify-between gap-2 text-[15px] font-bold text-gray-900">
            <span className="flex items-center gap-2"><span className="opp-dot" aria-hidden="true" />{column.label}</span>{' '}
            <span className="count-pill">{column.items.length}</span>
        </h3>
        {column.items.length === 0
            ? <p className="m-0 rounded-xl border border-dashed border-sem-control-line px-3 py-6 text-center text-[13.5px] text-sem-text-2">Sin oportunidades en este estado</p>
            : column.items.map(renderCard)}
    </section>;
}

// «Tablero»: one column per status (a status filter keeps only its column). It scrolls sideways inside its own region,
// (relative: the visually-hidden texts of the cards must be clipped by it, not widen the page) which takes the focus (Tab, then the arrow keys scroll it); a card changes column with the status select inside it.
export default function OpportunitiesBoard({ items, status, renderCard }) {
    const columns = groupByStatus(items).filter((column) => status === 'all' || column.status === status);
    return <div role="region" aria-label="Tablero por estado" tabIndex={0} className="focus-ring relative -mx-1 overflow-x-auto rounded-xl px-1 pb-3 pt-1">
        <div className={`grid grid-flow-col auto-cols-[minmax(17rem,1fr)] items-start gap-4 ${columns.length > 1 ? 'min-w-[71rem]' : ''}`}>
            {columns.map((column) => <Column key={column.status} column={column} renderCard={renderCard} />)}
        </div>
    </div>;
}
