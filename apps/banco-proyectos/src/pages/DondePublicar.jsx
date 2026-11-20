import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import publicarData from '../data/publicar-data.json';
import CatalogView from '../components/publicar/CatalogView';
import Chips from '../components/publicar/Chips';
import CompareTray from '../components/publicar/CompareTray';
import FiltersPanel from '../components/publicar/FiltersPanel';
import HelpView from '../components/publicar/HelpView';
import JournalResults, { AffinityNote } from '../components/publicar/JournalResults';
import JournalToolbar from '../components/publicar/JournalToolbar';
import { FOCUS, INPUT, NOTE } from '../components/publicar/classes';
import useJournalFinder from '../hooks/useJournalFinder';
import { requestedProjectId } from '../lib/publicar/project';
import { ADVANCED_DEFAULTS, dataStatus } from '../lib/publicar/table';

const { projects, journals, themes } = publicarData;
const projectsById = new Map(projects.map((project) => [project.id, project]));
const journalsById = new Map(journals.map((journal) => [journal.id, journal]));
const PAGE_TITLE = '¿Dónde publicar este proyecto? · Banco de Proyectos · UNIMAYOR';
const TABS = [['project', 'Revistas del proyecto'], ['catalog', 'Catálogo completo'], ['help', 'Cómo leer esta página']];

function ProjectPicker({ onSelect }) {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-[18px] max-w-[720px]">
            <label htmlFor="publicar-picker-select" className="block text-[13px] font-semibold text-gray-600 mb-1.5">Proyecto</label>
            <select id="publicar-picker-select" value="" onChange={(event) => onSelect(event.target.value)} className={`w-full ${INPUT}`}>
                <option value="">Seleccione un proyecto…</option>
                {projects.map((project) => <option key={project.id} value={project.id}>{project.number}. {project.title}</option>)}
            </select>
            <p className="mt-2 mb-0 text-[13px] text-gray-500">También puede abrir esta página desde el botón «¿Dónde publicar este proyecto?» de cada proyecto del banco.</p>
        </div>
    );
}

// Journals for one project, chosen with ?p=<project id> (or the picker). With no valid project it shows the picker.
// Design 04: list ranked by estimated affinity with a custom filters panel; design 02: comparison table.
// Filters, sort and the compare selection are page state; the project is in the URL so a link can be shared.
export default function DondePublicar() {
    const { search, hash } = useLocation();
    const navigate = useNavigate();
    const project = projectsById.get(requestedProjectId(search, hash)) || null;

    const [tab, setTab] = useState('project');
    const [trayHeight, setTrayHeight] = useState(0);
    const finder = useJournalFinder(project, journalsById, themes);
    const { rows, visible, advanced, compare, comparedJournals } = finder;

    useEffect(() => {
        document.title = project ? `${project.title} · ¿Dónde publicar?` : PAGE_TITLE;
        return () => { document.title = 'Banco de Proyectos IoT - UNIMAYOR'; };
    }, [project]);

    const trayVisible = tab === 'project' && finder.mode === 'table' && project !== null && comparedJournals.length > 0;
    const onTrayHeight = useCallback((height) => setTrayHeight(height ? height + 16 : 0), []);

    const selectProject = (id) => navigate({ search: projectsById.has(id) ? `?p=${encodeURIComponent(id)}` : '' }, { replace: true });

    return (
        <div className="py-4 space-y-4" style={{ paddingBottom: trayVisible ? trayHeight : undefined }}>
            <div role="tablist" aria-label="Secciones" className="flex gap-1 border-b border-gray-200 overflow-x-auto overflow-y-hidden">
                {TABS.map(([id, label]) => (
                    <button
                        key={id}
                        type="button"
                        role="tab"
                        id={`publicar-tab-${id}`}
                        aria-controls={`publicar-view-${id}`}
                        aria-selected={tab === id}
                        onClick={() => setTab(id)}
                        className={`px-3.5 py-2.5 -mb-px text-sm font-semibold whitespace-nowrap border-b-[3px] ${FOCUS} ${tab === id ? 'text-institutional-blue border-institutional-blue' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <p><Link to="/oportunidades" className="text-institutional-blue underline">Mis oportunidades guardadas →</Link></p>

            <section aria-label="Estado de los datos" className={NOTE}>
                <strong>Estado de los datos</strong>
                <p className="mt-1">{dataStatus(publicarData)}</p>
                <p className="mt-1">El catálogo se actualiza automáticamente cada semana con una descarga nueva de DOAJ; la fecha de DOAJ indica cuándo se descargó. SCImago publica su ranking una vez al año: la edición indica el año del ranking usado. Confirme costos, requisitos y cuartil en las fuentes oficiales.</p>
            </section>

            <section id="publicar-view-project" role="tabpanel" aria-labelledby="publicar-tab-project" hidden={tab !== 'project'} className="space-y-4">
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-5 py-4 flex flex-wrap items-center gap-3.5">
                    <div className="w-[52px] h-[52px] rounded-2xl bg-blue-50 grid place-items-center text-[26px] flex-shrink-0" aria-hidden="true">{project ? project.emoji || '📁' : '🔎'}</div>
                    <div className="min-w-0">
                        <p className="m-0 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            {project ? `¿Dónde publicar? · Proyecto ${project.number} · ${project.area} · ${project.level}` : '¿Dónde publicar?'}
                        </p>
                        <h1 className="mt-0.5 mb-0 text-xl leading-snug font-bold text-gray-900">{project ? project.title : 'Elija un proyecto'}</h1>
                    </div>
                    <Link
                        to={project ? `/proyecto/${encodeURIComponent(project.id)}` : '/proyectos'}
                        className={`md:ml-auto text-sm font-semibold text-institutional-blue whitespace-nowrap border border-blue-100 rounded-lg px-3.5 py-2 bg-white hover:bg-blue-50 ${FOCUS}`}
                    >
                        {project ? '← Volver al proyecto' : '← Volver al banco de proyectos'}
                    </Link>
                </div>

                {!project && <ProjectPicker onSelect={selectProject} />}

                {project && (
                    <div className="space-y-2.5">
                        <JournalToolbar
                            query={finder.query}
                            onQuery={finder.setQuery}
                            sort={finder.sort}
                            onSort={finder.setSort}
                            mode={finder.mode}
                            onMode={finder.setMode}
                            filtersOpen={finder.panelOpen}
                            onToggleFilters={() => finder.setPanelOpen((open) => !open)}
                            advancedCount={finder.advancedCount}
                            toggleRef={finder.toggleButtonRef}
                        />

                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                            <span ref={finder.countRef} aria-live="polite">
                                <b>{visible.length}</b> de {rows.length} revistas{finder.compareText}
                            </span>
                            <Chips advanced={advanced} onRemove={(key) => finder.patchAdvanced({ [key]: ADVANCED_DEFAULTS[key] })} onClear={() => finder.setAdvanced(ADVANCED_DEFAULTS)} />
                        </div>

                        <div className={`grid grid-cols-1 gap-5 items-start ${finder.panelOpen ? 'min-[1100px]:grid-cols-[minmax(0,1fr)_380px]' : ''}`}>
                            <section aria-label="Revistas sugeridas">
                                <JournalResults rows={visible} mode={finder.mode} sort={finder.sort} onSort={finder.setSort} compare={compare} onToggleCompare={finder.toggleCompared} />
                                <AffinityNote className="mt-3.5" />
                            </section>

                            {finder.panelOpen && (
                                <FiltersPanel
                                    advanced={advanced}
                                    shown={visible.length}
                                    userPresets={finder.userPresets}
                                    onChange={finder.patchAdvanced}
                                    onReset={() => finder.setAdvanced(ADVANCED_DEFAULTS)}
                                    onApplyPreset={finder.setAdvanced}
                                    onSavePreset={finder.savePreset}
                                    onDeletePreset={finder.deletePreset}
                                    onClose={() => finder.closePanel(true)}
                                    onApply={() => { finder.closePanel(false); finder.countRef.current?.scrollIntoView({ block: 'center' }); }}
                                />
                            )}
                        </div>
                    </div>
                )}
            </section>

            <section id="publicar-view-catalog" role="tabpanel" aria-labelledby="publicar-tab-catalog" hidden={tab !== 'catalog'}>
                <CatalogView active={tab === 'catalog'} />
            </section>

            <section id="publicar-view-help" role="tabpanel" aria-labelledby="publicar-tab-help" hidden={tab !== 'help'}>
                <HelpView data={publicarData} />
            </section>

            {trayVisible && (
                <CompareTray
                    journals={comparedJournals}
                    affinityById={finder.affinityById}
                    onRemove={finder.toggleCompared}
                    onClear={finder.clearCompared}
                    onHeight={onTrayHeight}
                />
            )}

            <footer className="border-t border-gray-200 pt-4 text-[13px] text-gray-500">
                <p>Datos: <a href="https://doaj.org/" target="_blank" rel="noopener noreferrer" className="text-institutional-blue underline">DOAJ</a> y <a href="https://www.scimagojr.com/" target="_blank" rel="noopener noreferrer" className="text-institutional-blue underline">SCImago Journal &amp; Country Rank</a>. Banco de Proyectos · UNIMAYOR, Popayán.</p>
            </footer>
        </div>
    );
}
