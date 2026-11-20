import { FOCUS, INPUT } from './classes';
import { SORT_DEFAULT_DIR } from '../../lib/publicar/display';

const SORT_OPTIONS = [['affinity', 'Mayor afinidad'], ['quartile', 'Mejor cuartil'], ['weeks', 'Publicación más rápida'], ['sjr', 'Mayor SJR'], ['h_index', 'Mayor índice H'], ['title', 'Nombre (A–Z)']];
const MODES = [['list', 'Lista'], ['table', 'Tabla']];

// Search, sort, list/table switch and the button of the advanced filters of one project's journal list.
// Shared by the /donde-publicar page and the project panel; it holds no state.
export default function JournalToolbar({ query, onQuery, sort, onSort, mode, onMode, filtersOpen, onToggleFilters, advancedCount, toggleRef }) {
    return (
        <div role="search" className="flex flex-wrap items-center gap-2.5">
            <label htmlFor="publicar-table-search" className="sr-only">Buscar revistas</label>
            <input
                id="publicar-table-search"
                type="search"
                value={query}
                onChange={(event) => onQuery(event.target.value)}
                placeholder="Buscar revista, país o editorial…"
                autoComplete="off"
                className={`${INPUT} flex-1 min-w-[240px] !py-[11px] !px-3.5`}
            />
            <label htmlFor="publicar-sort-select" className="inline-flex items-center gap-2 text-sm text-gray-600">
                Ordenar
                <select id="publicar-sort-select" value={sort.key} onChange={(event) => onSort({ key: event.target.value, dir: SORT_DEFAULT_DIR[event.target.value] })} className={INPUT}>
                    {SORT_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
            </label>
            <div role="group" aria-label="Vista de resultados" className="inline-flex border border-gray-200 rounded-xl overflow-hidden">
                {MODES.map(([value, label]) => (
                    <button
                        key={value}
                        type="button"
                        aria-pressed={mode === value}
                        onClick={() => onMode(value)}
                        className={`px-3 py-2 text-[13px] font-semibold border-r border-gray-200 last:border-r-0 ${FOCUS} ${mode === value ? 'bg-institutional-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <button
                ref={toggleRef}
                type="button"
                aria-expanded={filtersOpen}
                aria-controls="publicar-adv-panel"
                onClick={onToggleFilters}
                className={`inline-flex items-center gap-2 px-4 py-[11px] rounded-xl border border-institutional-blue bg-institutional-blue text-white text-sm font-semibold hover:bg-blue-800 ${FOCUS}`}
            >
                <span aria-hidden="true">⚙</span> Filtros personalizados
                {advancedCount > 0 && <span className="bg-institutional-yellow text-institutional-dark rounded-full text-xs font-bold px-2 py-px">{advancedCount}</span>}
            </button>
        </div>
    );
}
