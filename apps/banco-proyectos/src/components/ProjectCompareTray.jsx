import { Scale, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MAX_COMPARE, compareUrl } from '../lib/compare-projects';
import { prefetchComparison } from '../lib/routeChunks';

// «Proyectos para comparar»: the tray of /proyectos while 1 to 3 projects are chosen. It is the visual language of the
// journal comparison tray (white card, border, shadow) but it is `sticky` at the bottom of the page instead of fixed: it
// stays on screen while the catalog scrolls and, at the end of the page, it rests in the flow above the footer, so it
// never covers the last cards or the footer and needs no reserved padding. Mini chips name each project (with a ×), the
// status says «N de 3», and «Comparar ahora» opens the comparison once there are at least 2 (it stays focusable when
// there are fewer, with aria-disabled and the hint «Elige al menos 2» as its description).
// `selected` is [{ id, title }] in the order chosen.
export default function ProjectCompareTray({ selected, onRemove, onClear }) {
    const navigate = useNavigate();
    const count = selected.length;
    const ready = count >= 2;
    const open = () => { if (ready) navigate(compareUrl(selected.map((project) => project.id))); };

    return (
        <section
            role="region"
            aria-label="Proyectos para comparar"
            className="sticky bottom-3 z-20 mt-8 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-xl"
        >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
                <div className="flex flex-none items-center gap-2 text-[15px] font-bold text-gray-900">
                    <Scale size={18} aria-hidden="true" className="text-institutional-blue" />
                    <span role="status" aria-live="polite">
                        {count} de {MAX_COMPARE}
                        <span className="sr-only"> proyectos para comparar</span>
                    </span>
                </div>
                <ul aria-label="Proyectos elegidos" className="m-0 flex min-w-0 flex-1 basis-full list-none gap-2 overflow-x-auto p-0 min-[700px]:basis-[240px] min-[700px]:flex-wrap min-[700px]:overflow-visible">
                    {selected.map((project) => (
                        <li key={project.id} className="min-w-0 max-w-[85%] flex-none min-[700px]:max-w-full min-[700px]:flex-initial">
                            <span className="filter-chip max-w-full min-[700px]:max-w-[15rem] min-[1100px]:max-w-[22rem]">
                                <span className="min-w-0 truncate" title={project.title}>{project.title}</span>
                                <button type="button" onClick={() => onRemove(project.id)} aria-label={`Quitar ${project.title} de la comparación`}>
                                    <X size={15} aria-hidden="true" />
                                </button>
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 min-[700px]:ml-auto">
                    {!ready && <span id="compare-tray-hint" className="text-[13.5px] font-semibold text-sem-text-2">Elige al menos 2</span>}
                    <button type="button" onClick={onClear} className="link-action focus-ring rounded">Vaciar comparación</button>
                    <button
                        type="button"
                        onClick={open}
                        onMouseEnter={ready ? prefetchComparison : undefined}
                        onFocus={ready ? prefetchComparison : undefined}
                        aria-disabled={ready ? undefined : 'true'}
                        aria-describedby={ready ? undefined : 'compare-tray-hint'}
                        className="btn btn-primary btn-lg focus-ring"
                    >
                        Comparar ahora
                    </button>
                </div>
            </div>
        </section>
    );
}
