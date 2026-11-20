import { List, Search, SlidersHorizontal, Table2 } from 'lucide-react';
import { FOCUS } from './classes';
import { SORT_DEFAULT_DIR } from '../../lib/publicar/display';
import { activeCountLabel } from '../../lib/catalog';

const SORT_OPTIONS = [['affinity', 'Mayor afinidad'], ['quartile', 'Mejor cuartil'], ['weeks', 'Publicación más rápida'], ['sjr', 'Mayor SJR'], ['h_index', 'Mayor índice H'], ['title', 'Nombre (A–Z)']];
const MODES = [['list', 'Lista', List], ['table', 'Tabla', Table2]];

// Search, sort, list/table switch and the button of the advanced filters of one project's journal list. Every control
// has a visible label. Shared by the /donde-publicar page and the project panel; it holds no state.
export default function JournalToolbar({ query, onQuery, sort, onSort, mode, onMode, filtersOpen, onToggleFilters, advancedCount, toggleRef }) {
    return (
        <div role="search" className="flex flex-wrap items-end gap-x-3 gap-y-3">
            <div className="min-w-[240px] flex-1">
                <label htmlFor="publicar-table-search" className="field-label mb-1">Buscar revistas</label>
                <div className="relative">
                    <Search className="absolute left-[13px] top-1/2 -mt-2 text-sem-text-2" size={16} aria-hidden="true" />
                    <input
                        id="publicar-table-search"
                        type="search"
                        value={query}
                        onChange={(event) => onQuery(event.target.value)}
                        placeholder="Revista, país o editorial"
                        autoComplete="off"
                        className="field-input"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="publicar-sort-select" className="field-label mb-1">Ordenar por</label>
                <select id="publicar-sort-select" value={sort.key} onChange={(event) => onSort({ key: event.target.value, dir: SORT_DEFAULT_DIR[event.target.value] })} className="field-select !h-11">
                    {SORT_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
            </div>
            <div>
                <span className="field-label mb-1">Vista</span>
                <div role="group" aria-label="Vista de resultados" className="seg [&>button]:min-h-[42px]">
                    {MODES.map(([value, label, Icon]) => (
                        <button key={value} type="button" aria-pressed={mode === value} onClick={() => onMode(value)}>
                            <Icon size={16} aria-hidden="true" />
                            {label}
                        </button>
                    ))}
                </div>
            </div>
            <button
                ref={toggleRef}
                type="button"
                aria-expanded={filtersOpen}
                aria-controls="publicar-adv-panel"
                onClick={onToggleFilters}
                className={`btn btn-secondary btn-lg ${filtersOpen ? '!bg-sem-area-bg' : ''} ${FOCUS}`}
            >
                <SlidersHorizontal size={16} aria-hidden="true" />
                Filtros personalizados
                {advancedCount > 0 && (
                    <>
                        <span className="count-badge" aria-hidden="true">{advancedCount}</span>
                        <span className="sr-only">({activeCountLabel(advancedCount)})</span>
                    </>
                )}
            </button>
        </div>
    );
}
