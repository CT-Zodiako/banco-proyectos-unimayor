import { FOCUS } from './classes';
import { filterChips } from '../../lib/publicar/display';

// Removable chips of the active advanced filters, plus "Limpiar todo".
export default function Chips({ advanced, onRemove, onClear }) {
    const chips = filterChips(advanced);
    return (
        <div className="contents" aria-label="Filtros activos">
            {chips.map(([key, label]) => (
                <span key={key} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 rounded-full py-[5px] pr-2 pl-3 text-[13px] font-semibold">
                    {label}
                    <button type="button" onClick={() => onRemove(key)} aria-label={`Quitar filtro ${label}`} className={`border-0 bg-blue-100 text-blue-700 w-[18px] h-[18px] rounded-full text-xs leading-none cursor-pointer ${FOCUS}`}>×</button>
                </span>
            ))}
            {chips.length > 0 && (
                <button type="button" onClick={onClear} className={`border-0 bg-transparent text-institutional-blue text-[13px] font-semibold underline cursor-pointer rounded ${FOCUS}`}>Limpiar todo</button>
            )}
        </div>
    );
}
