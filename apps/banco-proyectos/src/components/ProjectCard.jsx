import { m, useReducedMotion } from 'framer-motion';
import { BookOpen, Briefcase, CalendarDays, Clock, Code, Cpu, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { isNewProject, levelRank, splitProjectTitle } from '../lib/catalog';
import { wherePublishUrl, eventsForProjectUrl } from '../lib/links';
import { prefetchProject } from '../lib/routeChunks';

const problemOf = (descripcion) =>
    descripcion.split(/\n\n|\n/).find((p) => p.toLowerCase().startsWith('problema:'))?.replace(/problema:\s*/i, '') || descripcion;

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

// Three dots, filled from the left; decorative, the level is always written next to them.
export const LevelDots = ({ rank }) => (
    <span className="level-dots" aria-hidden="true">
        {[1, 2, 3].map((n) => <i key={n} className={n <= rank ? 'on' : ''} />)}
    </span>
);

const ProjectCard = ({ project }) => {
    const reduceMotion = useReducedMotion();
    const { emoji, number, title } = splitProjectTitle(project.titulo);
    const rank = levelRank(project.nivel);
    const titleId = `project-title-${project.id}`;
    const forProject = ` del proyecto ${number ?? title}`;
    // The catalog gives light entries (counts); a full project also works.
    const hardware = project.hardwareCount ?? project.hardware.length;
    const software = project.softwareCount ?? project.software.length;

    return (
        <m.article
            aria-labelledby={titleId}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={reduceMotion ? undefined : { y: -4 }}
            className="bg-white rounded-2xl border border-gray-200 hover:border-sem-area-line shadow-sm hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col gap-3.5"
        >
            <div className="flex gap-3.5">
                <div className="w-[52px] h-[52px] bg-blue-50 rounded-2xl flex items-center justify-center text-[26px] flex-shrink-0" aria-hidden="true">
                    {emoji}
                </div>
                <div className="min-w-0">
                    {number !== null && <p className="text-[12.5px] font-semibold text-sem-text-2">Proyecto {number}</p>}
                    <h3 id={titleId} className="mt-px text-[18px] leading-[1.3] font-bold text-gray-900 line-clamp-3">
                        <Link to={`/proyecto/${project.id}`} onMouseEnter={prefetchProject} onFocus={prefetchProject} className="hover:text-institutional-blue hover:underline hover:underline-offset-[3px] focus-ring rounded">
                            {title}
                        </Link>
                    </h3>
                </div>
            </div>

            <p className="text-sm leading-normal text-sem-text-2 line-clamp-2">
                <b className="font-bold text-gray-700">Problema:</b> {problemOf(project.descripcion)}
            </p>

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

            <div className="mt-auto pt-3.5 border-t border-gray-100 flex flex-col gap-3">
                <ul aria-label="Datos del proyecto" className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13.5px] text-gray-700">
                    <li className="inline-flex items-center gap-1.5" data-tip={`Hardware: ${plural(hardware, 'componente físico', 'componentes físicos')} (placas, sensores, actuadores)`}>
                        <Cpu size={16} aria-hidden="true" className="text-sem-text-2" />
                        <span>Hardware <b className="font-bold text-gray-900">{hardware}</b><span className="sr-only"> {hardware === 1 ? 'componente' : 'componentes'}</span></span>
                    </li>
                    <li className="inline-flex items-center gap-1.5" data-tip={`Software: ${plural(software, 'herramienta', 'herramientas')} (lenguajes, plataformas, librerías)`}>
                        <Code size={16} aria-hidden="true" className="text-sem-text-2" />
                        <span>Software <b className="font-bold text-gray-900">{software}</b><span className="sr-only"> {software === 1 ? 'herramienta' : 'herramientas'}</span></span>
                    </li>
                    <li className="inline-flex items-center gap-1.5" data-tip={`Duración estimada: ${project.duracion}`}>
                        <Clock size={16} aria-hidden="true" className="text-sem-text-2" />
                        <span>{project.duracion}</span>
                    </li>
                </ul>
                <div className="flex flex-wrap gap-2">
                    <Link to={eventsForProjectUrl(project.id)} className="btn btn-events" data-tip="Congresos y convocatorias afines a este proyecto">
                        <span className="type-ico" aria-hidden="true"><CalendarDays size={14} /></span>
                        Ver eventos<span className="sr-only">{forProject}</span>
                    </Link>
                    <Link to={wherePublishUrl(project.id)} className="btn btn-journals" data-tip="Revistas donde podrías publicar este proyecto">
                        <span className="type-ico" aria-hidden="true"><BookOpen size={14} /></span>
                        Dónde publicar<span className="sr-only">{forProject}</span>
                    </Link>
                </div>
            </div>
        </m.article>
    );
};

export default ProjectCard;
