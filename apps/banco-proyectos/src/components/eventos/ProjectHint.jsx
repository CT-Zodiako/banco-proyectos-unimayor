import { Link } from 'react-router-dom';

// Shown when /eventos has no project: the list works without one (every event), and picking a project is optional.
// It only reports the choice up through onSelect(projectId); the page decides what the URL becomes.
const ProjectHint = ({ projects, onSelect }) => (
    <section aria-labelledby="project-hint-title" className="rounded-2xl border border-gray-200 border-l-[5px] border-l-institutional-blue bg-white px-5 py-3.5 shadow-sm">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
            <div className="min-w-0 flex-1 basis-[280px]">
                <p id="project-hint-title" className="m-0 text-[15px] font-bold text-gray-900">Elige un proyecto para ordenar los eventos por afinidad</p>
                <p className="m-0 mt-0.5 text-[13px] text-sem-text-2">Es opcional: sin proyecto ves todos los eventos vigentes.</p>
            </div>
            <div className="flex min-w-0 flex-wrap items-center gap-2.5">
                <label htmlFor="event-project" className="text-sm font-semibold text-gray-700">Proyecto</label>
                <select
                    id="event-project"
                    value=""
                    onChange={(event) => event.target.value && onSelect(event.target.value)}
                    className="field-select w-full min-w-0 sm:w-[260px]"
                >
                    <option value="">Sin proyecto</option>
                    {projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}
                </select>
                <Link to="/proyectos" className="btn btn-secondary focus-ring">Elegir un proyecto</Link>
            </div>
        </div>
    </section>
);

export default ProjectHint;
