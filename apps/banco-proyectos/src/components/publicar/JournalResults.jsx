import JournalTable from './JournalTable';
import { QuartileBadge } from './JournalLinks';
import ResultItem from './ResultItem';
import { BTN_SECONDARY, NOTE } from './classes';
import { nextSort } from '../../lib/publicar/display';
import { AFFINITY_THRESHOLDS } from '../../lib/publicar/table';

// One line above the results: what the affinity words and the quartile mean (same badge and ring as the rows).
export function ResultsLegend({ className = '' }) {
    const { high, mid } = AFFINITY_THRESHOLDS;
    return (
        <aside aria-label="Cómo leer los resultados" className={`flex flex-wrap items-center gap-x-[18px] gap-y-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[13px] text-gray-700 shadow-sm ${className}`}>
            <b className="text-[13.5px] text-gray-900">Cómo leer los resultados</b>
            <span className="inline-flex flex-wrap items-center gap-x-2">
                <span className="aff-ring !h-6 !w-6" style={{ '--v': 70 }} aria-hidden="true"><i className="block h-[14px] w-[14px] rounded-full bg-white" /></span>
                <span><b className="text-gray-900">Afinidad</b>: encaje con tu proyecto; <b>alta</b> {high} % o más, <b>media</b> {mid} a {high - 1} %, <b>baja</b> menos de {mid} %</span>
            </span>
            <span className="inline-flex flex-wrap items-center gap-x-2">
                <QuartileBadge quartile="Q1" showPublindex={false} />
                <span><b className="text-gray-900">Cuartil</b>: Q1 es el mejor cuartil y Q4 el cuarto</span>
            </span>
        </aside>
    );
}

export function AffinityNote({ className = '' }) {
    return (
        <p className={`${NOTE} ${className}`}><strong>La afinidad no es una probabilidad de aceptación.</strong> Se calcula con el encaje temático (40), la exigencia del cuartil frente al nivel del proyecto (25), el tiempo de publicación (15), el idioma (10) y si la revista es iberoamericana (10). La aceptación depende de la calidad del artículo y de la revisión por pares; lea el alcance de cada revista y confirme en su sitio que no cobra antes de enviar.</p>
    );
}

// The journals of one project as a ranked list or a comparison table, or the empty message. `limit` shows only the
// first rows and onMore (with it) adds the "Cargar más" button; the page shows every row.
export default function JournalResults({ rows, mode, sort, onSort, compare, onToggleCompare, limit = Infinity, onMore, onClearFilters, listClassName = '' }) {
    const shown = rows.slice(0, limit);
    return (
        <>
            {rows.length > 0 && mode === 'list' && (
                <div className={`grid gap-2.5 ${listClassName}`}>
                    {shown.map((row, index) => <ResultItem key={row.journal.id} row={row} open={index === 0} />)}
                </div>
            )}
            {rows.length > 0 && mode === 'table' && (
                <JournalTable rows={shown} sort={sort} compare={compare} onSort={(id) => onSort((current) => nextSort(current, id))} onToggleCompare={onToggleCompare} />
            )}
            {rows.length === 0 && !onClearFilters && (
                <p className="text-center p-7 text-sem-text-2 border border-dashed border-sem-control-line rounded-2xl bg-white">Ninguna revista cumple estos filtros. Quite algunos filtros o pruebe otro filtro guardado.</p>
            )}
            {rows.length === 0 && onClearFilters && (
                <div className="text-center p-7 text-sem-text-2 border border-dashed border-sem-control-line rounded-2xl bg-white">
                    <p>Ninguna revista cumple estos filtros. Quite algunos filtros o pruebe otro filtro guardado.</p>
                    <button type="button" onClick={onClearFilters} className={`${BTN_SECONDARY} mt-3`}>Quitar los filtros</button>
                </div>
            )}
            {onMore && rows.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4 text-[13.5px] text-gray-700">
                    <span aria-live="polite">Mostrando {shown.length} de {rows.length}</span>
                    {shown.length < rows.length && <button type="button" onClick={onMore} className={BTN_SECONDARY}>Cargar más</button>}
                </div>
            )}
        </>
    );
}
