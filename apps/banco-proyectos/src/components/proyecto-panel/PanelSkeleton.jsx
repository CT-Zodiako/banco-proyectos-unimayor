// Placeholder rows while the lazy data of a tab downloads (the journal data is ~2.4 MB).
export default function PanelSkeleton({ rows = 4 }) {
    const pulse = 'bg-gray-100 motion-safe:animate-pulse';
    return (
        <div role="status" aria-label="Cargando" className="grid gap-2.5">
            {Array.from({ length: rows }, (_, index) => (
                <div key={index} className="grid grid-cols-[72px_1fr] gap-4 p-4 bg-white border border-gray-100 rounded-2xl">
                    <i className={`block w-[72px] h-[72px] rounded-full ${pulse}`} />
                    <div>
                        <i className={`block h-3.5 mb-2.5 rounded-xl ${pulse}`} />
                        <i className={`block h-3.5 mb-2.5 w-[70%] rounded-xl ${pulse}`} />
                        <i className={`block h-3.5 w-[45%] rounded-xl ${pulse}`} />
                    </div>
                </div>
            ))}
        </div>
    );
}
