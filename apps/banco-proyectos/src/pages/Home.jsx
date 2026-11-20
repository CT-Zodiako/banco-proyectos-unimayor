import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BookOpen, CalendarDays, Compass, Layers, Users } from 'lucide-react';
import MetricsSection from '../components/MetricsSection';
import { useProjects } from '../hooks/useProjects';
import { areaTags, buildAreaFacets } from '../lib/catalog';
import { EVENTS_URL, PUBLISH_URL } from '../lib/links';

// The three main tools. The first is the primary action of the page (blue); events and journals have their own hue
// (purple and teal, as everywhere else); `tone` colors the card header and the icon circle.
const TOOLS = [
    {
        key: 'proyectos', to: '/proyectos', Icon: Layers, title: 'Catálogo de proyectos', action: 'Explorar proyectos', primary: true,
        text: 'Filtra por área, nivel y sector y abre el detalle de cada proyecto.',
    },
    {
        key: 'eventos', to: EVENTS_URL, Icon: CalendarDays, title: 'Eventos académicos', action: 'Buscar eventos', primary: false, button: 'btn-events', tone: 'tn-events',
        text: 'Congresos y convocatorias afines a tu proyecto, ordenados por afinidad.',
    },
    {
        key: 'revistas', to: PUBLISH_URL, Icon: BookOpen, title: 'Revistas para publicar', action: 'Dónde publicar', primary: false, button: 'btn-journals', tone: 'tn-journals',
        text: 'Revistas de acceso abierto sin cobro a autores, con filtros y comparación.',
    },
];

const Home = () => {
    const { projects } = useProjects();
    const reduceMotion = useReducedMotion();
    // With reduced motion the text is drawn at its final place from the first frame (no fade, no slide).
    const enter = (initial) => (reduceMotion ? false : initial);

    const metrics = useMemo(() => {
        if (!projects || projects.length === 0) {
            return { projects: 0, areas: 0, sectors: 0, newAreas: 0 };
        }
        const uniqueAreas = new Set(projects.flatMap(areaTags));
        const uniqueSectors = new Set(projects.map(p => p.sector).filter(Boolean));
        const newAreas = buildAreaFacets(projects).flatMap((family) => family.areas).filter((area) => area.isNew).length;
        return {
            projects: projects.length,
            areas: uniqueAreas.size,
            sectors: uniqueSectors.size,
            newAreas
        };
    }, [projects]);


    return (
        <div className="space-y-12 pb-12">
            {/* Hero Section */}
            <section className="relative min-h-[400px] flex items-center overflow-hidden rounded-3xl mt-6 py-12 bg-gradient-to-br from-institutional-blue via-blue-900 to-institutional-blue">
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-institutional-yellow/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
                </div>

                <div className="relative z-10 px-6 sm:px-8 md:px-16 max-w-2xl text-white space-y-6">
                    <motion.h1
                        initial={enter({ opacity: 0, x: -20 })}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl md:text-5xl font-extrabold leading-tight"
                    >
                        Banco de Proyectos <span className="text-institutional-yellow">Académicos</span>
                    </motion.h1>
                    <motion.p
                        initial={enter({ opacity: 0, x: -20 })}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-blue-50 leading-relaxed"
                    >
                        Explora las iniciativas tecnológicas, desarrollos de IoT y sistemas embebidos creados por nuestra comunidad académica.
                    </motion.p>
                    <motion.div
                        initial={enter({ opacity: 0, y: 20 })}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link to="/proyectos" className="bg-institutional-yellow text-institutional-blue px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:bg-yellow-300 transition-all inline-block focus-ring">
                            Ver Catálogo de Proyectos
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Main tools */}
            <section aria-labelledby="home-tools">
                <h2 id="home-tools" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Compass className="text-institutional-blue" aria-hidden="true" />
                    ¿Qué quieres hacer?
                </h2>
                <p className="mt-1 mb-6 text-[15px] text-sem-text-2">Tres herramientas para elegir un proyecto y decidir dónde presentarlo.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {TOOLS.map(({ key, to, Icon, title, action, text, primary, button, tone }) => (
                        <article key={key} aria-labelledby={`tool-${key}`} className={`flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm ${tone ? `hue-card ${tone}` : 'border-t-4 border-t-institutional-blue'}`}>
                            <span className={`grid h-11 w-11 place-items-center rounded-xl ${tone ? `type-chip ${tone}` : 'border border-sem-area-line bg-sem-area-bg text-sem-area-fg'}`} aria-hidden="true">
                                <Icon size={22} />
                            </span>
                            <h3 id={`tool-${key}`} className="text-lg font-bold text-gray-900">{title}</h3>
                            <p className="text-[14.5px] leading-normal text-sem-text-2">{text}</p>
                            <div className="mt-auto pt-1">
                                <Link to={to} className={`btn btn-lg ${button || (primary ? 'btn-primary' : 'btn-secondary')}`}>
                                    {button && <span className="type-ico" aria-hidden="true"><Icon size={16} /></span>}
                                    {action}
                                    <ArrowRight size={16} aria-hidden="true" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Metrics Section */}
            <section aria-labelledby="home-metrics">
                <h2 id="home-metrics" className="text-2xl font-bold text-gray-900">El banco en cifras</h2>
                <p className="mt-1 mb-6 text-[15px] text-sem-text-2">Cuánto contiene el catálogo hoy, contado desde los datos de los proyectos.</p>
                <MetricsSection metrics={metrics} />
            </section>

            {/* Institutional Info */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <div className="w-12 h-12 bg-sem-area-bg rounded-xl flex items-center justify-center text-institutional-blue mb-4" aria-hidden="true">
                        <BookOpen size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Sobre el Laboratorio</h2>
                    <p className="text-gray-700 leading-relaxed">
                        El Laboratorio de Física y Sistemas Embebidos es un espacio de innovación técnica y científica orientado al desarrollo de competencias en hardware avanzado, conectividad inalámbrica y procesamiento de datos.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <div className="w-12 h-12 bg-sem-attention-bg border border-institutional-yellow rounded-xl flex items-center justify-center text-institutional-dark mb-4" aria-hidden="true">
                        <Users size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Nuestra Comunidad</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Estudiantes y docentes de programas tecnológicos y profesionales colaboran en la creación de soluciones reales para desafíos regionales utilizando herramientas de vanguardia.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
