import { Component, Suspense } from 'react';
import PageSkeleton from './PageSkeleton';
import { retryFailedChunks } from '../lib/lazyRoute';
import { LoadError } from './proyecto-panel/PanelParts';

class Boundary extends Component {
    state = { error: null };

    static getDerivedStateFromError(error) { return { error }; }

    retry = () => {
        retryFailedChunks();
        this.setState({ error: null });
    };

    render() {
        if (this.state.error) return this.props.renderError(this.retry);
        return this.props.children;
    }
}

// Wraps lazy pages: the page skeleton (or the page's own `fallback`) while the chunk downloads, an alert with «Reintentar» when it fails.
export default function RouteLoader({ what, fallback, children }) {
    return (
        <Boundary renderError={(retry) => <div className="py-8"><LoadError what={what} onRetry={retry} /></div>}>
            <Suspense fallback={fallback ?? <PageSkeleton what={what} />}>{children}</Suspense>
        </Boundary>
    );
}

// Wraps lazy dialogs (search, proposal, project panel): nothing visible while the chunk downloads, and a small card
// over the page when it fails, with «Reintentar» and «Cerrar» (which closes the dialog that never opened).
export function DialogLoader({ what, onClose, children }) {
    return (
        <Boundary
            renderError={(retry) => (
                <div role="presentation" className="fixed inset-x-3 top-24 z-[100] mx-auto max-w-md rounded-2xl bg-white shadow-2xl">
                    <LoadError what={what} onRetry={retry} />
                    <div className="px-7 pb-5 text-center">
                        <button type="button" onClick={onClose} className="btn btn-tertiary">Cerrar</button>
                    </div>
                </div>
            )}
        >
            <Suspense fallback={<span role="status" className="sr-only">Cargando {what}…</span>}>{children}</Suspense>
        </Boundary>
    );
}
