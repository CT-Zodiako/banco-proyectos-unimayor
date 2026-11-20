import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Summary of the project selected with ?p=<id>: the event list is ranked by affinity with it.
const ProjectPanel = ({ project, onShowAll }) => (
    <section className="bg-white border border-gray-200 rounded-2xl shadow-sm px-5 py-4 grid grid-cols-[auto_minmax(0,1fr)] md:grid-cols-[auto_minmax(0,1fr)_auto] gap-x-4 gap-y-3 items-center" aria-labelledby="project-title">
        <div className="w-[52px] h-[52px] rounded-2xl bg-blue-50 grid place-items-center text-[26px]" aria-hidden="true">{project.emoji || '📁'}</div>
        <div className="min-w-0">
            <p className="text-xs font-bold text-sem-text-2 uppercase tracking-wider">
                {['Eventos para el proyecto', project.area, project.level].filter(Boolean).join(' · ')}
            </p>
            <h2 id="project-title" className="mt-0.5 mb-1.5 text-[19px] leading-snug font-bold text-gray-900">{project.title}</h2>
            <div className="flex flex-wrap gap-1.5" aria-label="Temas del proyecto">
                {(project.topics || []).map((topic) => (
                    <span key={topic} className="badge badge-area !font-medium">{topic}</span>
                ))}
            </div>
        </div>
        <div className="col-span-full md:col-span-1 flex md:flex-col flex-wrap gap-2 items-center md:items-stretch justify-between">
            <button type="button" onClick={onShowAll} className="btn btn-secondary">
                Ver todos los eventos
            </button>
            <Link to={`/proyecto/${encodeURIComponent(project.id)}`} className="btn btn-tertiary focus-ring"><ArrowLeft size={15} aria-hidden="true" />Volver al proyecto</Link>
        </div>
        <p className="col-span-full m-0 pt-2.5 border-t border-gray-100 text-[13px] text-sem-text-2">
            La afinidad es una estimación por temas y palabras clave, no una probabilidad de aceptación.
        </p>
    </section>
);

export default ProjectPanel;
