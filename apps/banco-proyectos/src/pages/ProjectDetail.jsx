import { Fragment } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    ChevronLeft, Clock, DollarSign, Cpu, Layers, Briefcase,
    Target, ListChecks,
    Globe, BookOpen, CalendarDays, Code, Scale
} from 'lucide-react';
import OpportunityCards from '../components/proyecto-panel/OpportunityCards';
import PageSkeleton from '../components/PageSkeleton';
import { DialogLoader } from '../components/RouteLoader';
import { lazyRoute } from '../lib/lazyRoute';
import { LoadError } from '../components/proyecto-panel/PanelParts';
import { LevelDots } from '../components/ProjectCard';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useProjects } from '../hooks/useProjects';
import useProjectPanel from '../hooks/useProjectPanel';
import { projectTitle } from '../lib/page-title';
import { isNewProject, levelRank } from '../lib/catalog';
import { wherePublishUrl, eventsForProjectUrl, savedCatalogUrl } from '../lib/links';
import { FULL_MESSAGE, MAX_COMPARE, loadSelection, saveSelection, withCompareParam } from '../lib/compare-projects';

// The slide-over (and the events and journals tabs inside it) downloads the first time a panel opens.
const ProjectSlideOver = lazyRoute(() => import('../components/proyecto-panel/ProjectSlideOver'));

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

// Section title with one line that says what the section is for. The id labels the <section>.
const SectionHeading = ({ id, Icon, title, help }) => (
    <div className="mb-4">
        <h2 id={id} className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Icon size={20} className="text-gray-700 flex-none" aria-hidden="true" />
            {title}
        </h2>
        <p className="mt-1 text-[13.5px] text-sem-text-2">{help}</p>
    </div>
);

const TABLE_HEAD = 'bg-gray-100 border-b border-gray-200 text-xs font-extrabold uppercase tracking-wider text-gray-900';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { projects, loading, error, retry } = useProjects();
    const panel = useProjectPanel();

    const project = projects?.find(p => p.id === id);
    useDocumentTitle(project ? projectTitle(project.titulo) : !loading && !error ? 'Proyecto no encontrado' : '');

    if (error) return <div className="py-8"><LoadError what="el proyecto" onRetry={retry} /></div>;
    if (loading) return <PageSkeleton what="el proyecto" />;

    if (!project) {
        return (
            <div className="py-20 text-center">
                <h1 className="text-2xl font-bold">Proyecto no encontrado</h1>
                <Link to={savedCatalogUrl()} className="btn btn-secondary mt-4">Volver al catálogo</Link>
            </div>
        );
    }

    // «Comparar con otros»: adds this project to the comparison selection (kept in the session) and opens the catalog on the
    // view the visitor came from, where the tray shows the selection. With 3 other projects already chosen it is disabled.
    const selection = loadSelection();
    const compareFull = selection.length >= MAX_COMPARE && !selection.includes(project.id);
    const compareWithOthers = () => {
        const next = selection.includes(project.id) ? selection : [...selection, project.id];
        saveSelection(next);
        navigate(withCompareParam(savedCatalogUrl(), next));
    };

    const rank = levelRank(project.nivel);
    const hardware = project.hardware.length;
    const software = project.software.length;
    const stats = [
        { label: 'Hardware', value: plural(hardware, 'componente', 'componentes'), icon: Cpu, tip: `Hardware: ${plural(hardware, 'componente físico', 'componentes físicos')} (placas, sensores, actuadores)` },
        { label: 'Software', value: plural(software, 'herramienta', 'herramientas'), icon: Code, tip: `Software: ${plural(software, 'herramienta', 'herramientas')} (lenguajes, plataformas, librerías)` },
        { label: 'Duración', value: project.duracion, icon: Clock, tip: `Duración estimada: ${project.duracion}` },
        { label: 'Presupuesto', value: project.presupuesto, icon: DollarSign, tip: `Presupuesto estimado: ${project.presupuesto}` },
    ];

    return (
        <div className="py-8 px-4 max-w-5xl mx-auto space-y-8 pb-20">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <Link to={savedCatalogUrl()} className="btn btn-tertiary btn-lg -ml-2 !text-gray-700 hover:!text-institutional-blue">
                    <ChevronLeft size={20} aria-hidden="true" />
                    Volver a la lista
                </Link>

                <div className="flex flex-wrap gap-2">
                    <Link
                        to={eventsForProjectUrl(project.id)}
                        className="btn btn-events btn-lg !whitespace-normal text-center"
                        data-tip="Congresos y convocatorias afines a este proyecto"
                    >
                        <span className="type-ico" aria-hidden="true"><CalendarDays size={16} /></span>
                        ¿A qué eventos ir?
                    </Link>
                    <Link
                        to={wherePublishUrl(project.id)}
                        className="btn btn-journals btn-lg !whitespace-normal text-center"
                        data-tip="Revistas donde podrías publicar este proyecto"
                    >
                        <span className="type-ico" aria-hidden="true"><BookOpen size={16} /></span>
                        ¿Dónde publicar este proyecto?
                    </Link>
                    <span className="inline-flex" data-tip={compareFull ? FULL_MESSAGE : 'Elige otros proyectos y ponlos lado a lado'}>
                        <button
                            type="button"
                            onClick={compareWithOthers}
                            disabled={compareFull}
                            aria-describedby={compareFull ? 'compare-full-note' : undefined}
                            className="btn btn-secondary btn-lg !whitespace-normal text-center"
                        >
                            <Scale size={18} aria-hidden="true" />
                            Comparar con otros
                        </button>
                    </span>
                    {compareFull && <p id="compare-full-note" className="sr-only">{FULL_MESSAGE}</p>}
                </div>
            </div>

            <div className="space-y-4">
                <header className="space-y-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="badge badge-area" data-tip="Área: la línea técnica del proyecto">
                            <Layers size={15} aria-hidden="true" className="flex-none" />
                            <span className="sr-only">Área: </span>{project.area}
                        </span>
                        {isNewProject(project) && (
                            <span className="badge badge-new" data-tip="Nuevo: proyecto incorporado este semestre">Nuevo</span>
                        )}
                        <span className="badge badge-sector" data-tip="Sector: dónde se aplica">
                            <Briefcase size={15} aria-hidden="true" className="flex-none" />
                            <span className="sr-only">Sector: </span>{project.sector}
                        </span>
                        <span className="badge badge-level" data-tip={`Nivel ${rank} de 3: ${project.nivel}`}>
                            <LevelDots rank={rank} />
                            <span className="sr-only">Nivel {rank} de 3: </span>{project.nivel}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight break-words">
                        {project.titulo}
                    </h1>
                </header>
                <div className="space-y-6 pt-2">
                    {project.descripcion.split(/\n\n|\n/).map((paragraph, idx) => {
                        const trimmed = paragraph.trim();
                        if (!trimmed) return null;

                        const isProblem = trimmed.toLowerCase().startsWith('problema:');
                        const isDesc = trimmed.toLowerCase().startsWith('descripción:') || trimmed.toLowerCase().startsWith('descripcion:');

                        if (isProblem || isDesc) {
                            const label = isProblem ? 'Problema' : 'Descripción';
                            const text = trimmed.replace(/^(problema|descripción|descripcion):\s*/i, '').trim();
                            return (
                                <div key={idx} className="space-y-2">
                                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                        <span className="block w-1 h-4 bg-institutional-blue rounded-full" aria-hidden="true"></span>
                                        {label}
                                    </h2>
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        {text}
                                    </p>
                                </div>
                            );
                        }

                        return (
                            <p key={idx} className="text-lg text-gray-700 leading-relaxed">
                                {trimmed}
                            </p>
                        );
                    })}
                </div>
            </div>

            {/* Key figures: same words as the legend of the catalog cards */}
            <ul aria-label="Datos del proyecto" className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map(({ label, value, icon: Icon, tip }) => (
                    <li key={label} data-tip={tip} className="flex flex-col lg:flex-row items-start gap-3 p-4 rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <span className="grid h-10 w-10 flex-none place-items-center rounded-xl border border-gray-200 bg-sem-sector-bg text-sem-sector-fg" aria-hidden="true">
                            <Icon size={20} />
                        </span>
                        <div className="min-w-0">
                            <span data-metric-label className="block text-[13px] font-semibold text-sem-text-2">{label}</span>
                            <span data-metric-value className="block text-[15px] font-bold leading-snug text-gray-900">{value}</span>
                        </div>
                    </li>
                ))}
            </ul>

            <OpportunityCards projectId={project.id} openTab={panel.tab} onOpen={panel.open} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                {/* Left Column - Tech details */}
                <div className="md:col-span-2 min-w-0 space-y-10">
                    {/* Hardware Necesario - Tabla */}
                    <section aria-labelledby="sec-hardware">
                        <SectionHeading id="sec-hardware" Icon={Cpu} title="Hardware necesario" help="Componentes físicos que necesitas: placas, sensores y actuadores, con su función." />
                        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <caption className="sr-only">Componentes de hardware del proyecto</caption>
                                <thead>
                                    <tr className={TABLE_HEAD}>
                                        <th scope="col" className="py-3 px-4 w-12 text-center">#</th>
                                        <th scope="col" className="py-3 px-4">Componente</th>
                                        <th scope="col" className="py-3 px-4">Categoría</th>
                                        <th scope="col" className="py-3 px-4">Función / Especificación</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {project.hardware_tabla ? (
                                        project.hardware_tabla.map((item, i) => (
                                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-3 px-4 text-center font-bold text-sem-text-2 text-xs">{i + 1}</td>
                                                <td className="py-3 px-4 font-semibold text-gray-900">{item.componente}</td>
                                                <td className="py-3 px-4">
                                                    <span className="badge badge-sector">
                                                        {item.categoria || 'Hardware'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-[13px] text-gray-700 font-normal leading-relaxed">{item.funcion || '-'}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        project.hardware.map((item, i) => (
                                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-3 px-4 text-center font-bold text-sem-text-2 text-xs">{i + 1}</td>
                                                <td className="py-3 px-4 font-semibold text-gray-900" colSpan={3}>{item}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Software y Plataformas - Tabla */}
                    <section aria-labelledby="sec-software">
                        <SectionHeading id="sec-software" Icon={Layers} title="Software y plataformas" help="Herramientas, lenguajes y plataformas que se usan, con su tipo y su uso." />
                        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <caption className="sr-only">Herramientas de software del proyecto</caption>
                                <thead>
                                    <tr className={TABLE_HEAD}>
                                        <th scope="col" className="py-3 px-4 w-12 text-center">#</th>
                                        <th scope="col" className="py-3 px-4">Herramienta</th>
                                        <th scope="col" className="py-3 px-4">Tipo</th>
                                        <th scope="col" className="py-3 px-4">Descripción / Uso</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {project.software_tabla ? (
                                        project.software_tabla.map((item, i) => (
                                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-3 px-4 text-center font-bold text-sem-text-2 text-xs">{i + 1}</td>
                                                <td className="py-3 px-4 font-semibold text-gray-900">{item.herramienta}</td>
                                                <td className="py-3 px-4">
                                                    <span className="badge badge-sector">
                                                        {item.tipo || 'Software'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-[13px] text-gray-700 font-normal leading-relaxed">{item.descripcion || '-'}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        project.software.map((item, i) => (
                                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-3 px-4 text-center font-bold text-sem-text-2 text-xs">{i + 1}</td>
                                                <td className="py-3 px-4 font-semibold text-gray-900" colSpan={3}>{item}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section aria-labelledby="sec-pasos">
                        <SectionHeading id="sec-pasos" Icon={ListChecks} title="Pasos de implementación" help="El orden sugerido para construir el proyecto, paso a paso." />
                        <ol className="space-y-3">
                            {project.pasos.map((paso, i) => (
                                <li key={i} className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                                    <span className="flex-shrink-0 w-6 h-6 bg-institutional-blue text-white rounded-full flex items-center justify-center text-xs font-bold" aria-hidden="true">
                                        {i + 1}
                                    </span>
                                    <span className="text-gray-900 text-sm font-medium"><span className="sr-only">Paso {i + 1}: </span>{paso}</span>
                                </li>
                            ))}
                        </ol>
                    </section>
                </div>

                {/* Right Column - Goals & Apps */}
                <div className="min-w-0 space-y-10">
                    <section aria-labelledby="sec-objetivos" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <SectionHeading id="sec-objetivos" Icon={Target} title="Objetivos" help="Qué busca lograr el proyecto." />
                        <ul className="space-y-2">
                            {project.objetivos.map((obj, i) => {
                                if (obj.includes("Objetivo General")) {
                                    const text = obj.replace(/🎯?\s*Objetivo General:?\s*/i, "").trim();
                                    return (
                                        <Fragment key={i}>
                                            <li className="text-sm font-bold text-gray-900 mt-4 first:mt-0">
                                                🎯 Objetivo general
                                            </li>
                                            <li className="text-sm text-gray-700 leading-relaxed ml-4">
                                                • {text}
                                            </li>
                                        </Fragment>
                                    );
                                }

                                if (obj.includes("Objetivos Específicos")) {
                                    return (
                                        <li key={i} className="text-sm font-bold text-gray-900 mt-4">
                                            📌 Objetivos específicos
                                        </li>
                                    );
                                }

                                if (obj.startsWith("•")) {
                                    return (
                                        <li key={i} className="text-sm text-gray-700 leading-relaxed ml-4">
                                            {obj}
                                        </li>
                                    );
                                }

                                return (
                                    <li key={i} className="text-sm text-gray-700 leading-relaxed">
                                        {obj}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    <section aria-labelledby="sec-impacto" className="bg-institutional-blue p-6 rounded-2xl text-white shadow-sm">
                        <div className="mb-4">
                            <h2 id="sec-impacto" className="text-lg font-bold flex items-center gap-2">
                                <Globe size={20} className="text-institutional-yellow flex-none" aria-hidden="true" />
                                Impacto real
                            </h2>
                            <p className="mt-1 text-[13.5px] text-blue-100">Dónde puede aplicarse lo que se construye.</p>
                        </div>
                        <ul className="space-y-3">
                            {project.aplicaciones.map((app, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <div className="w-1.5 h-1.5 bg-institutional-yellow rounded-full mt-1.5 flex-shrink-0" aria-hidden="true" />
                                    {app}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {project.referencias.length > 0 && (
                        <section aria-labelledby="sec-referencias" className="p-4 border-2 border-dashed border-gray-300 rounded-2xl">
                            <h2 id="sec-referencias" className="text-sm font-bold text-gray-900 uppercase tracking-widest">Referencias</h2>
                            <p className="mt-1 mb-3 text-[13px] text-sem-text-2">Fuentes para profundizar.</p>
                            {/* The data holds each reference as a citation text (scripts/projects-validation.mjs). */}
                            <ul className="space-y-2">
                                {project.referencias.map((ref, i) => (
                                    <li key={i} className="text-sm leading-snug text-sem-text-2 [overflow-wrap:anywhere]">{ref}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>

            {panel.tab && (
                <DialogLoader what="el panel" onClose={panel.close}>
                    <ProjectSlideOver
                        project={project}
                        tab={panel.tab}
                        mode={panel.mode}
                        expanded={panel.expanded}
                        onExpandedChange={panel.setExpanded}
                        onSelectTab={panel.select}
                        onClose={panel.close}
                    />
                </DialogLoader>
            )}
        </div>
    );
};

export default ProjectDetail;
