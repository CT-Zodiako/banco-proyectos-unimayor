import { Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ChevronLeft, Clock, DollarSign, Cpu, Layers,
    Target, ListChecks,
    ExternalLink, Globe, BookOpen
} from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { wherePublishUrl } from '../lib/links';

const ProjectDetail = () => {
    const { id } = useParams();
    const { projects, loading } = useProjects();

    const project = projects?.find(p => p.id === id);

    if (loading) {
        return <div className="py-20 text-center font-bold">Cargando detalles del proyecto...</div>;
    }

    if (!project) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-2xl font-bold">Proyecto no encontrado</h2>
                <Link to="/proyectos" className="text-institutional-blue mt-4 inline-block">Volver al catálogo</Link>
            </div>
        );
    }

    return (
        <div className="py-8 px-4 max-w-5xl mx-auto space-y-8 pb-20">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Link to="/proyectos" className="flex items-center gap-2 text-gray-500 hover:text-institutional-blue transition-colors font-medium">
                    <ChevronLeft size={20} />
                    Volver a la lista
                </Link>

                <a
                    href={wherePublishUrl(project.id)}
                    className="bg-institutional-yellow hover:bg-yellow-400 text-institutional-blue px-5 py-2.5 rounded-xl font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-yellow-300 transform hover:-translate-y-0.5"
                >
                    <BookOpen size={18} aria-hidden="true" />
                    ¿Dónde publicar este proyecto?
                </a>
            </div>

            <div className="space-y-4">
                <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-widest">
                    <span className="text-institutional-blue">{project.area}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-green-600">{project.sector}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                    {project.titulo}
                </h1>
                <div className="space-y-6 pt-4">
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
                                        <div className="w-1 h-4 bg-institutional-blue rounded-full"></div>
                                        {label}
                                    </h2>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        {text}
                                    </p>
                                </div>
                            );
                        }

                        return (
                            <p key={idx} className="text-lg text-gray-600 leading-relaxed">
                                {trimmed}
                            </p>
                        );
                    })}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Duración', value: project.duracion, icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Presupuesto', value: project.presupuesto, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-50' },
                    { label: 'Hardware', value: `${project.hardware.length} ítems`, icon: Cpu, color: 'text-orange-500', bg: 'bg-orange-50' },
                    { label: 'Software', value: `${project.software.length} herramientas`, icon: Layers, color: 'text-purple-500', bg: 'bg-purple-50' },
                ].map((stat, i) => (
                    <div key={i} className="flex flex-col gap-2 p-4 rounded-2xl border border-gray-100 bg-white shadow-xs">
                        <stat.icon className={stat.color} size={24} />
                        <div>
                            <span className="block text-[10px] font-bold uppercase text-gray-400 tracking-wider font-inter">{stat.label}</span>
                            <span className="text-sm font-bold text-gray-800">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-100">
                {/* Left Column - Tech details */}
                <div className="md:col-span-2 space-y-10">
                    {/* Hardware Necesario - Tabla */}
                    <section>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Cpu size={20} className="text-orange-500" />
                            Hardware Necesario
                        </h3>
                        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-xs">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-orange-50/70 border-b border-gray-200 text-xs font-extrabold uppercase tracking-wider text-orange-900">
                                        <th className="py-3 px-4 w-12 text-center">#</th>
                                        <th className="py-3 px-4">Componente</th>
                                        <th className="py-3 px-4">Categoría</th>
                                        <th className="py-3 px-4">Función / Especificación</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {project.hardware_tabla ? (
                                        project.hardware_tabla.map((item, i) => (
                                            <tr key={i} className="hover:bg-orange-50/20 transition-colors">
                                                <td className="py-3 px-4 text-center font-bold text-orange-600 text-xs">{i + 1}</td>
                                                <td className="py-3 px-4 font-semibold text-gray-800">{item.componente}</td>
                                                <td className="py-3 px-4 text-xs font-medium text-orange-900">
                                                    <span className="inline-block px-2.5 py-1 bg-orange-100/70 rounded-md">
                                                        {item.categoria || 'Hardware'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-xs text-gray-600 font-normal leading-relaxed">{item.funcion || '-'}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        project.hardware.map((item, i) => (
                                            <tr key={i} className="hover:bg-orange-50/20 transition-colors">
                                                <td className="py-3 px-4 text-center font-bold text-orange-600 text-xs">{i + 1}</td>
                                                <td className="py-3 px-4 font-semibold text-gray-800" colSpan={3}>{item}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Software y Plataformas - Tabla */}
                    <section>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Layers size={20} className="text-purple-500" />
                            Software y Plataformas
                        </h3>
                        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-xs">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-purple-50/70 border-b border-gray-200 text-xs font-extrabold uppercase tracking-wider text-purple-900">
                                        <th className="py-3 px-4 w-12 text-center">#</th>
                                        <th className="py-3 px-4">Herramienta</th>
                                        <th className="py-3 px-4">Tipo</th>
                                        <th className="py-3 px-4">Descripción / Uso</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {project.software_tabla ? (
                                        project.software_tabla.map((item, i) => (
                                            <tr key={i} className="hover:bg-purple-50/20 transition-colors">
                                                <td className="py-3 px-4 text-center font-bold text-purple-600 text-xs">{i + 1}</td>
                                                <td className="py-3 px-4 font-semibold text-gray-800">{item.herramienta}</td>
                                                <td className="py-3 px-4 text-xs font-medium text-purple-900">
                                                    <span className="inline-block px-2.5 py-1 bg-purple-100/70 rounded-md">
                                                        {item.tipo || 'Software'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-xs text-gray-600 font-normal leading-relaxed">{item.descripcion || '-'}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        project.software.map((item, i) => (
                                            <tr key={i} className="hover:bg-purple-50/20 transition-colors">
                                                <td className="py-3 px-4 text-center font-bold text-purple-600 text-xs">{i + 1}</td>
                                                <td className="py-3 px-4 font-semibold text-gray-800" colSpan={3}>{item}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <ListChecks size={20} className="text-blue-500" />
                            Pasos de Implementación
                        </h3>
                        <div className="space-y-3">
                            {project.pasos.map((paso, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 bg-white border border-gray-50 rounded-xl shadow-xs">
                                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                        {i + 1}
                                    </span>
                                    <span className="text-gray-700 text-sm font-medium">{paso}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column - Goals & Apps */}
                <div className="space-y-10">
                    <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Target size={20} className="text-institutional-blue" />
                            Objetivos
                        </h3>
                        <ul className="space-y-2">
                            {project.objetivos.map((obj, i) => {
                                if (obj.includes("Objetivo General")) {
                                    const text = obj.replace(/🎯?\s*Objetivo General:?\s*/i, "").trim();
                                    return (
                                        <Fragment key={i}>
                                            <li className="text-sm font-bold text-gray-900 mt-4 first:mt-0">
                                                🎯 Objetivo general
                                            </li>
                                            <li className="text-sm text-gray-600 leading-relaxed ml-4">
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
                                        <li key={i} className="text-sm text-gray-600 leading-relaxed ml-4">
                                            {obj}
                                        </li>
                                    );
                                }

                                return (
                                    <li key={i} className="text-sm text-gray-600 leading-relaxed">
                                        {obj}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    <section className="bg-institutional-blue p-6 rounded-2xl text-white shadow-sm space-y-4">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <Globe size={20} className="text-institutional-yellow" />
                            Impacto Real
                        </h3>
                        <ul className="space-y-3 opacity-90">
                            {project.aplicaciones.map((app, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm font-light">
                                    <div className="w-1.5 h-1.5 bg-institutional-yellow rounded-full mt-1.5 flex-shrink-0" />
                                    {app}
                                </li>
                            ))}
                        </ul>

                        <div className="pt-2">
                            <a
                                href={wherePublishUrl(project.id)}
                                className="w-full py-2.5 px-4 bg-institutional-yellow hover:bg-yellow-400 text-institutional-blue rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                            >
                                <BookOpen size={16} aria-hidden="true" />
                                ¿Dónde publicar este proyecto?
                            </a>
                        </div>
                    </section>

                    {project.referencias.length > 0 && (
                        <section className="p-4 border-2 border-dashed border-gray-100 rounded-2xl">
                            <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-widest">Referencias</h3>
                            <div className="space-y-2">
                                {project.referencias.map((ref, i) => (
                                    <a key={i} href={ref.url} className="flex items-center gap-2 text-institutional-blue hover:underline text-sm font-medium">
                                        <ExternalLink size={14} />
                                        {ref.nombre}
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

        </div>
    );
};

export default ProjectDetail;
