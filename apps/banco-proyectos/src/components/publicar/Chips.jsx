import { X } from 'lucide-react';
import { filterChips } from '../../lib/publicar/display';

// Removable chips of the active advanced filters, plus "Limpiar todo".
export default function Chips({ advanced, onRemove, onClear }) {
    const chips = filterChips(advanced);
    if (chips.length === 0) return null;
    return (
        <div role="group" aria-label="Filtros activos" className="contents">
            <span className="text-[13.5px] font-semibold text-gray-700">Filtros activos:</span>
            {chips.map(([key, label]) => (
                <span key={key} className="filter-chip">
                    {label}
                    <button type="button" onClick={() => onRemove(key)} aria-label={`Quitar filtro ${label}`}><X size={15} aria-hidden="true" /></button>
                </span>
            ))}
            <button type="button" onClick={onClear} className="link-action focus-ring rounded">Limpiar todo</button>
        </div>
    );
}
