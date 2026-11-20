import { ChevronDown } from 'lucide-react';
import useInitialOpen from '../hooks/useInitialOpen';

// A legend as a native <details> inside an <aside aria-label>: «Cómo leer …» with a one-line hint and a chevron in the
// <summary>, the unchanged legend in the body. Open from 700 px, collapsed below (useInitialOpen), user-toggleable with the
// mouse, touch or the keyboard (summary is a tab stop; Enter and Space toggle it). `open` is only the initial state, so
// React never closes it again after the visitor opened it.
export default function CollapsibleLegend({ label, title = label, hint, className = '', bodyClassName = '', children }) {
    const initiallyOpen = useInitialOpen();
    return (
        <aside aria-label={label} className={`legend-card ${className}`}>
            <details open={initiallyOpen}>
                <summary>
                    <span className="legend-title">{title}</span>
                    <span className="legend-hint">{hint}</span>
                    <ChevronDown size={18} aria-hidden="true" className="legend-chevron" />
                </summary>
                <div className={`legend-body ${bodyClassName}`}>{children}</div>
            </details>
        </aside>
    );
}
