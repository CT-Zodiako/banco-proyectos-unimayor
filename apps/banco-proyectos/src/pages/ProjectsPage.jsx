import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Plus, X } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../hooks/useProjects';

const ProjectsPage = () => {
    const { projects, loading } = useProjects();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeArea, setActiveArea] = useState('Todos');
    const [activeSector, setActiveSector] = useState('Todos');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Dynamically compute areas and sectors from the project data
    const areas = useMemo(() => {
        if (!projects) return [];
        const unique = new Set();
        projects.forEach(p => {
            if (p.area) {
                p.area.split('+').forEach(a => unique.add(a.trim()));
            }
        });
        return [...unique].sort();
    }, [projects]);

    const sectors = useMemo(() => {
        if (!projects) return [];
        const unique = new Set();
        projects.forEach(p => {
            if (p.sector) unique.add(p.sector);
        });
        return [...unique].sort();
    }, [projects]);

    const filteredProjects = useMemo(() => {
        if (loading || !projects) return [];
        return projects.filter((project) => {
            const matchesSearch = project.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.sector.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesArea = activeArea === 'Todos' ||
                (project.area && project.area.toLowerCase().includes(activeArea.toLowerCase()));

            const matchesSector = activeSector === 'Todos' ||
                (project.sector && project.sector === activeSector);

            return matchesSearch && matchesArea && matchesSector;
        });
    }, [searchTerm, activeArea, activeSector, projects, loading]);

    return (
        <div className="py-8 px-4 max-w-7xl mx-auto">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1 text-gray-500 hover:text-institutional-blue transition-colors mb-4 font-medium group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Volver al inicio
                    </Link>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Explorar Proyectos</h1>
                    <p className="text-gray-500">Filtrar por tecnología, sector o palabras clave para encontrar lo que buscas.</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-institutional-blue text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={20} />
                    Agregar Proyecto
                </button>
            </div>

            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                activeArea={activeArea}
                setActiveArea={setActiveArea}
                activeSector={activeSector}
                setActiveSector={setActiveSector}
                areas={areas}
                sectors={sectors}
            />

            <div className="mt-8 flex justify-between items-center mb-6">
                <span className="text-gray-600 font-medium">
                    Mostrando <span className="text-institutional-blue font-bold">{filteredProjects.length}</span> proyectos
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="py-20 text-center">
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-gray-800">No encontramos resultados</h3>
                    <p className="text-gray-500">Intenta con otros términos o cambia los filtros.</p>
                </div>
            )}

            {/* Modal de Agregar Proyecto */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-2xl font-bold text-gray-900">Nuevo Proyecto</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={24} className="text-gray-500" />
                            </button>
                        </div>

                        <form className="p-6 space-y-6" onSubmit={(e) => {
                            e.preventDefault();
                            alert("¡Proyecto enviado con éxito! (Simulación: los datos se guardarán cuando el sistema de Firebase esté activo)");
                            setIsModalOpen(false);
                        }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Título del Proyecto</label>
                                    <input required type="text" placeholder="Ej: Monitor de Calidad de Aire" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-institutional-blue outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Área / Tecnología</label>
                                    <select className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-institutional-blue outline-none transition-all">
                                        {areas.map(a => (
                                            <option key={a} value={a}>{a}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Breve Descripción</label>
                                <textarea required rows="3" placeholder="Describe el problema y la solución..." className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-institutional-blue outline-none transition-all"></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Sector</label>
                                    <input required type="text" placeholder="Ej: Agroindustria" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-institutional-blue outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Nivel</label>
                                    <select className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-institutional-blue outline-none transition-all">
                                        <option>Principiante</option>
                                        <option>Intermedio</option>
                                        <option>Avanzado</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Duración Est.</label>
                                    <input required type="text" placeholder="Ej: 4 meses" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-institutional-blue outline-none transition-all" />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-institutional-blue text-white font-bold rounded-xl hover:bg-blue-900 shadow-lg transition-all"
                                >
                                    Guardar Proyecto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsPage;
