import { Link } from 'react-router-dom';

// Summary of the project selected with ?p=<id>: the event list is ranked by affinity with it.
const ProjectPanel = ({ project, onShowAll }) => (
    <section className="bg-white border border-gray-100 rounded-2xl shadow-sm px-5 py-4 grid grid-cols-[auto_minmax(0,1fr)] md:grid-cols-[auto_minmax(0,1fr)_auto] gap-x-4 gap-y-3 items-center" aria-labelledby="project-title">
        <div className="w-[52px] h-[52px] rounded-2xl bg-blue-50 grid place-items-center text-[26px]" aria-hidden="true">{project.emoji || '📁'}</div>
        <div className="min-w-0">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {['Eventos para el proyecto', project.area, project.level].filter(Boolean).join(' · ')}
            </p>
            <h2 id="project-title" className="mt-0.5 mb-1.5 text-[19px] leading-snug font-bold text-gray-900">{project.title}</h2>
            <div className="flex flex-wrap gap-1.5" aria-label="Temas del proyecto">
                {(project.topics || []).map((topic) => (
                    <span key={topic} className="bg-blue-50 text-blue-700 rounded-full px-2.5 py-0.5 text-xs font-medium">{topic}</span>
                ))}
            </div>
        </div>
        <div className="col-span-full md:col-span-1 flex md:flex-col flex-wrap gap-2 items-center md:items-stretch justify-between">
            <button type="button" onClick={onShowAll} className="px-3.5 py-2 rounded-lg border border-institutional-blue bg-white text-institutional-blue text-[13px] font-semibold hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-institutional-yellow">
                Ver todos los eventos
            </button>
            <Link to={`/proyecto/${encodeURIComponent(project.id)}`} className="text-[13px] font-semibold text-institutional-blue text-center hover:underline">← Volver al proyecto</Link>
        </div>
        <p className="col-span-full m-0 pt-2.5 border-t border-gray-100 text-[13px] text-gray-600">
            La afinidad es una estimación por temas y palabras clave, no una probabilidad de aceptación.
        </p>
    </section>
);

export default ProjectPanel;
