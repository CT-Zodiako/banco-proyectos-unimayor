import { SkeletonHeader } from './proyecto-panel/PanelSkeleton';

const CARD = 'rounded-2xl border border-gray-100 bg-white p-5';
const line = (className) => <i data-skeleton-block="" className={`block bg-gray-100 motion-safe:animate-pulse ${className}`} />;

// Fallback of a page whose code (or data) is on its way: the header block and a grid of cards, tall enough that the
// footer does not jump into view and out again when the page arrives. A polite status for screen readers; `what` is
// the thing being loaded ("los proyectos").
export default function PageSkeleton({ what = 'la página' }) {
    return (
        <div role="status" aria-busy="true" data-route-loading="" className="min-h-[70vh] py-8">
            <span className="sr-only">Cargando {what}…</span>
            <div aria-hidden="true">
                <SkeletonHeader />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }, (_, index) => (
                        <div key={index} className={`${CARD} grid gap-3`}>
                            {line('h-4 w-24 rounded-xl')}
                            {line('h-5 w-[85%] rounded-xl')}
                            {line('h-3.5 rounded-xl')}
                            {line('h-3.5 w-[60%] rounded-xl')}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
