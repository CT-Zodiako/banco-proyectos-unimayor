import { useId } from 'react';
import { Kanban, List, Search, X } from 'lucide-react';
import { SORT_LABELS, VIEW_LABELS, TYPE_LABELS } from '../../lib/opportunitiesView';

// Type, search, sort and view of «Mis oportunidades», each with a visible label. Everything lives in the URL (the page
// owns the state and replaces the history entry).
export default function OpportunitiesToolbar({ state, typeCounts, withDeadlines, onChange }) {
    const typeId = useId();
    const searchId = useId();
    const sortId = useId();
    const viewId = useId();
    const sorts = Object.entries(SORT_LABELS).filter(([value]) => value !== 'deadline' || withDeadlines);
    const types = [['all', 'Todas', ''], ['event', `Eventos (${typeCounts.event})`, 'seg-tone tn-events'], ['journal', `Revistas (${typeCounts.journal})`, 'seg-tone tn-journals']];
    return <div className="grid gap-x-4 gap-y-3 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-[auto_minmax(14rem,1fr)_auto_auto]">
        <div>
            <p id={typeId} className="field-label mb-1.5">Tipo</p>
            <div role="group" aria-labelledby={typeId} className="seg">
                {types.map(([value, label, tone]) => <button key={value} type="button" aria-pressed={state.type === value} onClick={() => onChange({ type: value })} className={`${tone} !min-h-[44px] whitespace-nowrap`}>{label}</button>)}
            </div>
        </div>
        <div>
            <label htmlFor={searchId} className="field-label mb-1.5">Buscar en mis oportunidades</label>
            <div className="relative">
                <Search className="pointer-events-none absolute left-[13px] top-1/2 -mt-2 text-sem-text-2" size={16} aria-hidden="true" />
                <input id={searchId} type="search" value={state.query} onChange={(event) => onChange({ query: event.target.value })} placeholder="Título, sitio o nota" className="field-input" />
            </div>
        </div>
        <div>
            <label htmlFor={sortId} className="field-label mb-1.5">Ordenar por</label>
            <select id={sortId} value={state.sort} onChange={(event) => onChange({ sort: event.target.value })} className="field-select !h-11 w-full min-[700px]:w-auto">
                {sorts.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
        </div>
        <div>
            <p id={viewId} className="field-label mb-1.5">Vista</p>
            <div role="group" aria-labelledby={viewId} className="seg">
                <button type="button" aria-pressed={state.view === 'list'} onClick={() => onChange({ view: 'list' })} className="!min-h-[44px] whitespace-nowrap"><List size={15} aria-hidden="true" />{VIEW_LABELS.list}</button>
                <button type="button" aria-pressed={state.view === 'board'} onClick={() => onChange({ view: 'board' })} className="!min-h-[44px] whitespace-nowrap"><Kanban size={15} aria-hidden="true" />{VIEW_LABELS.board}</button>
            </div>
        </div>
    </div>;
}

/** The removable chips of the active filters and «Limpiar filtros» (the page decides when to show «Limpiar filtros»). */
export function ActiveFilters({ state, statusLabels, onChange, onClear, showClear }) {
    const chips = [];
    if (state.type !== 'all') chips.push({ id: 'type', group: 'Tipo', text: TYPE_LABELS[state.type], patch: { type: 'all' } });
    if (state.status !== 'all') chips.push({ id: 'status', group: 'Estado', text: statusLabels[state.status], patch: { status: 'all' } });
    if (state.query.trim()) chips.push({ id: 'query', group: 'Búsqueda', text: `“${state.query.trim()}”`, patch: { query: '' } });
    if (!chips.length) return null;
    return <div role="group" aria-label="Filtros activos" className="flex flex-wrap items-center gap-2">
        <span className="mr-0.5 text-[13.5px] font-semibold text-gray-700">Filtros activos:</span>
        {chips.map((chip) => <span key={chip.id} className="filter-chip">
            <span><small>{chip.group}:</small> {chip.text}</span>
            <button type="button" onClick={() => onChange(chip.patch)} aria-label={`Quitar filtro: ${chip.group}: ${chip.text}`}><X size={15} aria-hidden="true" /></button>
        </span>)}
        {showClear && <button type="button" onClick={onClear} className="link-action focus-ring rounded">Limpiar filtros</button>}
    </div>;
}
