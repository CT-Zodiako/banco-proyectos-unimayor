import { Link } from 'react-router-dom';
import { BTN_PRIMARY, FOCUS } from '../publicar/classes';

// «Abrir la página completa»: the existing finder page of the project, for when the panel is not enough.
export function EscapeLink({ to, label, className = '' }) {
    return (
        <Link to={to} className={`inline-flex items-center gap-1.5 text-[13px] font-bold text-institutional-blue no-underline border border-blue-100 bg-white rounded-lg px-3.5 py-2 min-h-9 hover:bg-blue-50 ${FOCUS} ${className}`}>
            {label}
        </Link>
    );
}

export function EscapeCard({ ariaLabel, children, to, label }) {
    return (
        <aside aria-label={ariaLabel} className="mt-5 p-4 grid gap-2.5 bg-blue-50 border border-blue-100 rounded-2xl shadow-sm">
            <p className="m-0 text-[13.5px] text-gray-700">{children}</p>
            <EscapeLink to={to} label={label} className="justify-self-start" />
        </aside>
    );
}

export function LoadError({ what, onRetry }) {
    return (
        <div role="alert" className="text-center p-7 text-gray-600 border border-dashed border-gray-200 rounded-2xl bg-white">
            <p className="mb-3">No se pudo cargar {what}. Revise su conexión e intente de nuevo.</p>
            <button type="button" onClick={onRetry} className={BTN_PRIMARY}>Reintentar</button>
        </div>
    );
}

export function NoData({ children }) {
    return <div className="text-center p-7 text-gray-600 border border-dashed border-gray-200 rounded-2xl bg-white">{children}</div>;
}
