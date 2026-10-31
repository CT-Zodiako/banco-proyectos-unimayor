import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Globe, Award } from 'lucide-react';
import MetricsSection from '../components/MetricsSection';
import { useProjects } from '../hooks/useProjects';

const Home = () => {
    const { projects } = useProjects();

    const metrics = React.useMemo(() => {
        if (!projects || projects.length === 0) {
            return { total: 0, found: 0, areas: 0, sectors: 0 };
        }
        const uniqueAreas = new Set();
        projects.forEach(p => {
            if (p.area) {
                p.area.split('+').forEach(a => uniqueAreas.add(a.trim()));
            }
        });
        const uniqueSectors = new Set(projects.map(p => p.sector).filter(Boolean));
        return {
            total: projects.length,
            found: projects.length,
            areas: uniqueAreas.size,
            sectors: uniqueSectors.size
        };
    }, [projects]);


    return (
        <div className="space-y-12 pb-12">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center overflow-hidden rounded-3xl mt-6 bg-gradient-to-br from-institutional-blue via-blue-900 to-institutional-blue">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-institutional-yellow/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
                </div>

                <div className="relative z-10 px-8 md:px-16 max-w-2xl text-white space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl md:text-5xl font-extrabold leading-tight"
                    >
                        Banco de Proyectos <span className="text-institutional-yellow">Académicos</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg opacity-90 leading-relaxed"
                    >
                        Explora las iniciativas tecnológicas, desarrollos de IoT y sistemas embebidos creados por nuestra comunidad académica.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <a href="/proyectos" className="bg-institutional-yellow text-institutional-blue px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all inline-block">
                            Ver Catálogo de Proyectos
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Metrics Section */}
            <section className="px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Award className="text-institutional-blue" />
                    Impacto en Cifras
                </h2>
                <MetricsSection metrics={metrics} />
            </section>

            {/* Institutional Info */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-institutional-blue mb-4">
                        <BookOpen size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Sobre el Laboratorio</h3>
                    <p className="text-gray-600 leading-relaxed">
                        El Laboratorio de Física y Sistemas Embebidos es un espacio de innovación técnica y científica orientado al desarrollo de competencias en hardware avanzado, conectividad inalámbrica y procesamiento de datos.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-institutional-yellow mb-4">
                        <Users size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Nuestra Comunidad</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Estudiantes y docentes de programas tecnológicos y profesionales colaboran en la creación de soluciones reales para desafíos regionales utilizando herramientas de vanguardia.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
