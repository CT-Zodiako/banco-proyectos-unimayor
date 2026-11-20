import { ChevronDown } from 'lucide-react';

// "Estado de los datos" as one compact line ("Datos actualizados el 16 nov 2026 · DOAJ y SCImago · Más información")
// that expands (native <details>) to the full text, passed as children.
export default function DataStatus({ updated, source, children }) {
    return (
        <section aria-label="Estado de los datos">
            <details className="data-status">
                <summary>
                    <span className="data-status-dot" aria-hidden="true" />
                    <span><b className="font-bold text-gray-900">{updated}</b>{source ? ` · ${source}` : ''}</span>
                    <span className="data-status-more">
                        <span className="when-closed">Más información</span>
                        <span className="when-open">Menos información</span>
                        <ChevronDown size={16} aria-hidden="true" className="transition-transform" />
                    </span>
                </summary>
                <div className="data-status-body">{children}</div>
            </details>
        </section>
    );
}
