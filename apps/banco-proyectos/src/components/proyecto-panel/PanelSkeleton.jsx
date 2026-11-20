// Placeholder shapes shown while data downloads. The pulse stops with prefers-reduced-motion (motion-safe).
const PULSE = 'bg-gray-100 motion-safe:animate-pulse';
const block = (className) => <i data-skeleton-block="" className={`block ${PULSE} ${className}`} />;

// The header card of a finder page (icon tile, eyebrow, title, one description line, the action link).
export function SkeletonHeader() {
    return (
        <div data-skeleton-header="" className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 border-t-4 border-t-gray-200 bg-white p-5">
            <div className="flex min-w-0 flex-1 items-center gap-4">
                {block('h-14 w-14 flex-none rounded-2xl')}
                <div className="grid min-w-0 flex-1 grid-cols-1 justify-items-start gap-2.5">
                    {block('h-3 w-32 rounded-xl')}
                    {block('h-6 w-64 max-w-full rounded-xl')}
                    {block('h-3.5 w-80 max-w-full rounded-xl')}
                </div>
            </div>
            {block('h-4 w-44 max-w-full rounded-xl')}
        </div>
    );
}

// A list of result rows: a round badge and three text lines each.
export function SkeletonRows({ rows = 4 }) {
    return (
        <div className="grid gap-2.5">
            {Array.from({ length: rows }, (_, index) => (
                <div key={index} className="grid grid-cols-[72px_1fr] gap-4 rounded-2xl border border-gray-100 bg-white p-4">
                    {block('h-[72px] w-[72px] rounded-full')}
                    <div>
                        <div className="mb-2.5">{block('h-3.5 rounded-xl')}</div>
                        <div className="mb-2.5">{block('h-3.5 w-[70%] rounded-xl')}</div>
                        {block('h-3.5 w-[45%] rounded-xl')}
                    </div>
                </div>
            ))}
        </div>
    );
}

// Placeholder rows while the lazy data of a tab or page downloads (the journal data is ~2.4 MB). `withHeader` puts the
// page header block above the rows, for a whole page that waits for its data.
export default function PanelSkeleton({ rows = 4, withHeader = false }) {
    return (
        <div role="status" aria-label="Cargando">
            {withHeader && <SkeletonHeader />}
            <SkeletonRows rows={rows} />
        </div>
    );
}
