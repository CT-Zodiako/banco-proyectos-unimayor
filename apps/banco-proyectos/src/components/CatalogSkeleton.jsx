import { Plus } from 'lucide-react';

const BLOCK = 'block bg-gray-100 motion-safe:animate-pulse';

// Title, summary line and «Proponer proyecto» of /proyectos. While the projects index downloads the summary is a
// placeholder of the same height and the button waits, so the title and the intro are on screen from the first paint
// and nothing moves when the real numbers arrive.
export function CatalogHeader({ summary, onPropose }) {
    return (
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h1 className="text-3xl font-extrabold leading-tight text-gray-900 mb-1.5">Explorar proyectos</h1>
                <p className="text-[15px] text-sem-text-2">
                    {summary ?? <i data-skeleton-block="" className={`${BLOCK} h-[22px] w-72 max-w-full rounded-xl`} />}
                </p>
                <p className="mt-1.5 max-w-[62ch] text-[14.5px] text-gray-700">
                    Elige un área, ajusta el nivel y abre un proyecto para ver su alcance, materiales y dónde publicarlo.
                </p>
            </div>
            <button type="button" onClick={onPropose} disabled={!onPropose} className="btn btn-primary btn-lg focus-ring">
                <Plus size={18} aria-hidden="true" />
                Proponer proyecto
            </button>
        </div>
    );
}

// The grid of /proyectos with placeholders (filters column from 960 px, cards in 1/2/3 columns). It is the loading state
// while the index downloads and the fallback (`route`, marked data-route-loading) while the results chunk downloads, so
// the one replaces the other without a change.
export function CatalogGridSkeleton({ route = false }) {
    return (
        <div role="status" aria-busy="true" data-route-loading={route ? '' : undefined}>
            <span className="sr-only">Cargando los proyectos…</span>
            <div aria-hidden="true" className="grid grid-cols-1 min-[960px]:grid-cols-[300px_minmax(0,1fr)] gap-7 items-start">
                <div className="hidden h-[640px] rounded-2xl border border-gray-100 bg-white min-[960px]:block" />
                <div className="grid grid-cols-1 min-[1101px]:grid-cols-2 min-[1700px]:grid-cols-3 gap-5">
                    {Array.from({ length: 4 }, (_, index) => (
                        <div key={index} className="grid h-[330px] content-start gap-3.5 rounded-2xl border border-gray-100 bg-white p-5">
                            <i data-skeleton-block="" className={`${BLOCK} h-[52px] w-[52px] rounded-2xl`} />
                            <i data-skeleton-block="" className={`${BLOCK} h-5 w-[85%] rounded-xl`} />
                            <i data-skeleton-block="" className={`${BLOCK} h-3.5 rounded-xl`} />
                            <i data-skeleton-block="" className={`${BLOCK} h-3.5 w-[60%] rounded-xl`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
