import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { isNewProject } from '../lib/catalog';
import { wherePublishUrl } from '../lib/links';

// Splits "🌾 Proyecto 1: Título" into the emoji and the visible title.
const splitTitle = (titulo) => {
    const firstSpace = titulo.indexOf(' ');
    const first = titulo.substring(0, firstSpace);
    return first.length <= 4 ? { emoji: first, title: titulo.substring(firstSpace).trim() } : { emoji: '🚀', title: titulo };
};

const problemOf = (descripcion) =>
    descripcion.split(/\n\n|\n/).find((p) => p.toLowerCase().startsWith('problema:'))?.replace(/problema:\s*/i, '') || descripcion;

const ProjectCard = ({ project }) => {
    const reduceMotion = useReducedMotion();
    const { emoji, title } = splitTitle(project.titulo);

    return (
        <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={reduceMotion ? undefined : { y: -4 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col"
        >
            <div className="flex gap-3.5">
                <div className="w-[52px] h-[52px] bg-blue-50 rounded-2xl flex items-center justify-center text-[26px] flex-shrink-0" aria-hidden="true">
                    {emoji}
                </div>
                <div className="min-w-0">
                    <h3 className="text-[17px] leading-snug font-bold text-gray-900">
                        <Link to={`/proyecto/${project.id}`} className="hover:text-institutional-blue hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-institutional-yellow rounded">
                            {title}
                        </Link>
                    </h3>
                    <p className="mt-1 text-[13.5px] text-gray-600 line-clamp-2">{problemOf(project.descripcion)}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3.5 mb-3.5">
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[11.5px] font-bold uppercase tracking-wide">{project.area}</span>
                {isNewProject(project) && (
                    <span className="px-1.5 py-0.5 bg-institutional-yellow text-institutional-dark rounded-full text-[10px] font-bold uppercase tracking-wide self-center">Nuevo</span>
                )}
                <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-md text-[11.5px] font-semibold">{project.sector}</span>
                <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded-md text-[11.5px] font-semibold">{project.nivel}</span>
            </div>

            <div className="mt-auto pt-3.5 border-t border-gray-100 flex justify-between items-center text-[12.5px] text-gray-500">
                <div className="flex gap-3.5">
                    <span title="Componentes de hardware">HW <b className="text-gray-700">{project.hardware.length}</b></span>
                    <span title="Herramientas de software">SW <b className="text-gray-700">{project.software.length}</b></span>
                    <span>{project.duracion}</span>
                </div>
                <a
                    href={wherePublishUrl(project.id)}
                    className="inline-flex items-center gap-1.5 font-semibold text-institutional-blue hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-institutional-yellow rounded"
                >
                    <BookOpen size={14} aria-hidden="true" />
                    Dónde publicar
                </a>
            </div>
        </motion.article>
    );
};

export default ProjectCard;
