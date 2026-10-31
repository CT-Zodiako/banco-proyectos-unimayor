import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Cpu, Layers, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    // Extraer el emoji y el resto del título de forma segura
    const firstSpaceIndex = project.titulo.indexOf(' ');
    const firstPart = project.titulo.substring(0, firstSpaceIndex);

    // Si la primera parte parece un emoji (longitud corta), lo separamos
    const looksLikeEmoji = firstPart.length <= 4;
    const emoji = looksLikeEmoji ? firstPart : '🚀';
    const displayTitle = looksLikeEmoji ? project.titulo.substring(firstSpaceIndex).trim() : project.titulo;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
        >
            <Link to={`/proyecto/${project.id}`} className="block p-6 cursor-pointer">
                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-blue-100 transition-colors flex-shrink-0">
                        {emoji}
                    </div>
                    <div className="space-y-1 flex-1">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-institutional-blue group-hover:underline transition-all">
                            {displayTitle}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                            {project.descripcion.split(/\n\n|\n/).find(p => p.toLowerCase().startsWith('problema:'))?.replace(/problema:\s*/i, '') || project.descripcion}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-bold uppercase tracking-wider">
                        {project.area}
                    </span>
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs font-semibold">
                        {project.sector}
                    </span>
                    <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded-md text-xs font-semibold">
                        {project.nivel}
                    </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-50">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-blue-600">
                            <Clock size={16} />
                            <span className="text-xs font-bold uppercase text-gray-400">Duración</span>
                        </div>
                        <span className="text-sm font-bold text-gray-700">{project.duracion}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-green-600">
                            <DollarSign size={16} />
                            <span className="text-xs font-bold uppercase text-gray-400">Presp.</span>
                        </div>
                        <span className="text-sm font-bold text-gray-700">{project.presupuesto}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-orange-600">
                            <Cpu size={16} />
                            <span className="text-xs font-bold uppercase text-gray-400">Hardware</span>
                        </div>
                        <span className="text-sm font-bold text-gray-700">{project.hardware.length}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-purple-600">
                            <Layers size={16} />
                            <span className="text-xs font-bold uppercase text-gray-400">Software</span>
                        </div>
                        <span className="text-sm font-bold text-gray-700">{project.software.length}</span>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <div className="flex items-center gap-2 text-institutional-blue font-bold text-sm group-hover:gap-3 transition-all">
                        Ver Detalles
                        <ChevronRight size={18} />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProjectCard;
