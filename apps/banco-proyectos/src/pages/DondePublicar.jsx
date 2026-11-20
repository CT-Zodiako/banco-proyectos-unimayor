import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CatalogView from '../components/publicar/CatalogView';
import Chips from '../components/publicar/Chips';
import CompareTray from '../components/publicar/CompareTray';
import FiltersPanel from '../components/publicar/FiltersPanel';
import DataGate from '../components/DataGate';
import DataStatus from '../components/publicar/DataStatus';
import HelpView from '../components/publicar/HelpView';
import JournalResults, { AffinityNote, ResultsLegend } from '../components/publicar/JournalResults';
import JournalToolbar from '../components/publicar/JournalToolbar';
import { FOCUS } from '../components/publicar/classes';
import useJournalFinder from '../hooks/useJournalFinder';
import { DATA_FILES } from '../lib/data-loader';
import { requestedProjectId } from '../lib/publicar/project';
import { nextTabId } from '../lib/publicar/tabs';
import { dataUpdatedText } from '../lib/publicar/display';
import { ADVANCED_DEFAULTS, dataStatus } from '../lib/publicar/table';

const PAGE_TITLE = '¿Dónde publicar este proyecto? · Banco de Proyectos · UNIMAYOR';
const TABS = [
    ['project', 'Revistas del proyecto', 'Ordenadas por afinidad con tu proyecto'],
    ['catalog', 'Catálogo completo', 'Todas las revistas, sin elegir proyecto'],
    ['help', 'Cómo leer esta página', 'Qué significan afinidad y cuartil'],
];
const TAB_IDS = TABS.map(([id]) => id);

// Project tab without a project: say what it needs and offer both ways out (pick a project, or browse the catalog).
function ProjectEmptyState({ projects, onSelect, onOpenCatalog }) {
    return (
        <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-5 py-6 max-w-[720px]">
                <div className="w-[52px] h-[52px] rounded-2xl bg-blue-50 grid place-items-center text-[26px]" aria-hidden="true">🔎</div>
                <h2 className="mt-3 mb-1.5 text-lg font-bold text-gray-900">Elige un proyecto para ver las revistas ordenadas por afinidad</h2>
                <p className="m-0 text-[14.5px] text-gray-700">Cada revista se compara con el sector y la tecnología de un proyecto del banco. Si todavía no tienes uno, puedes explorar todas las revistas en el catálogo completo.</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                    <Link to="/proyectos" className={`btn btn-primary btn-lg ${FOCUS}`}>Elegir un proyecto</Link>
                    <button type="button" onClick={onOpenCatalog} className={`btn btn-secondary btn-lg ${FOCUS}`}>Ver el catálogo completo</button>
                </div>
            </div>
            <ProjectPicker projects={projects} onSelect={onSelect} />
        </div>
    );
}

function ProjectPicker({ projects, onSelect }) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-[18px] max-w-[720px]">
            <label htmlFor="publicar-picker-select" className="field-label mb-1.5">Proyecto</label>
            <select id="publicar-picker-select" value="" onChange={(event) => onSelect(event.target.value)} className="field-select !h-11 w-full">
                <option value="">Seleccione un proyecto…</option>
                {projects.map((project) => <option key={project.id} value={project.id}>{project.number}. {project.title}</option>)}
            </select>
            <p className="mt-2 mb-0 text-[13px] text-sem-text-2">También puede abrir esta página desde el botón «¿Dónde publicar este proyecto?» de cada proyecto del banco.</p>
        </div>
    );
}

// Journals for one project, chosen with ?p=<project id> (or the picker). With no valid project it shows the picker.
// Design 04: list ranked by estimated affinity with a custom filters panel; design 02: comparison table.
// Filters, sort and the compare selection are page state; the project is in the URL so a link can be shared.
function DondePublicarPage({ publicarData }) {
    const { projects, journals, themes } = publicarData;
    const projectsById = useMemo(() => new Map(projects.map((item) => [item.id, item])), [projects]);
    const journalsById = useMemo(() => new Map(journals.map((journal) => [journal.id, journal])), [journals]);
    const { search, hash } = useLocation();
    const navigate = useNavigate();
    const project = projectsById.get(requestedProjectId(search, hash)) || null;

    // With a project the page opens on its journals; without one, on the catalog (which needs no project).
    const [tab, setTab] = useState(project ? 'project' : 'catalog');
    const [trayHeight, setTrayHeight] = useState(0);
    const finder = useJournalFinder(project, journalsById, themes);
    const { rows, visible, advanced, compare, comparedJournals } = finder;

    useEffect(() => {
        document.title = project ? `${project.title} · ¿Dónde publicar?` : PAGE_TITLE;
        return () => { document.title = 'Banco de Proyectos IoT - UNIMAYOR'; };
    }, [project]);

    const trayVisible = tab === 'project' && finder.mode === 'table' && project !== null && comparedJournals.length > 0;
    const onTrayHeight = useCallback((height) => setTrayHeight(height ? height + 16 : 0), []);

    const onTabKeyDown = (event) => {
        const next = nextTabId(TAB_IDS, tab, event.key);
        if (!next) return;
        event.preventDefault();
        setTab(next);
        document.getElementById(`publicar-tab-${next}`)?.focus();
    };

    const selectProject = (id) => navigate({ search: projectsById.has(id) ? `?p=${encodeURIComponent(id)}` : '' }, { replace: true });

    return (
        <div className="py-4 space-y-4" style={{ paddingBottom: trayVisible ? trayHeight : undefined }}>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-5 py-4 flex flex-wrap items-center gap-3.5">
                <div className="w-[52px] h-[52px] rounded-2xl bg-blue-50 grid place-items-center text-[26px] flex-shrink-0" aria-hidden="true">{project ? project.emoji || '📁' : '🔎'}</div>
                <div className="min-w-0">
                    <p className="m-0 text-xs font-bold text-sem-text-2 uppercase tracking-wider">
                        {project ? `¿Dónde publicar? · Proyecto ${project.number} · ${project.area} · ${project.level}` : 'Revistas de acceso abierto diamante'}
                    </p>
                    <h1 className="mt-0.5 mb-0 text-xl leading-snug font-bold text-gray-900">{project ? project.title : '¿Dónde publicar?'}</h1>
                </div>
                <div className="flex flex-wrap items-center gap-2 md:ml-auto">
                    {project && <Link to={`/proyecto/${encodeURIComponent(project.id)}`} className={`btn btn-secondary ${FOCUS}`}>← Volver al proyecto</Link>}
                    <Link to="/oportunidades" className="link-action focus-ring rounded">Mis oportunidades guardadas →</Link>
                </div>
            </div>

            <div role="tablist" aria-label="Secciones" onKeyDown={onTabKeyDown} className="tab-bar">
                {TABS.map(([id, label, description]) => (
                    <button
                        key={id}
                        type="button"
                        role="tab"
                        id={`publicar-tab-${id}`}
                        aria-controls={`publicar-view-${id}`}
                        aria-selected={tab === id}
                        tabIndex={tab === id ? 0 : -1}
                        onClick={() => setTab(id)}
                        className={`tab-pill ${FOCUS}`}
                    >
                        <span className="tab-pill-label">{label}</span>
                        <span className="tab-pill-desc">{description}</span>
                    </button>
                ))}
            </div>

            <DataStatus updated={dataUpdatedText(publicarData)} source="DOAJ y SCImago">
                <p>{dataStatus(publicarData)}</p>
                <p>El catálogo se actualiza automáticamente cada semana con una descarga nueva de DOAJ; la fecha de DOAJ indica cuándo se descargó. SCImago publica su ranking una vez al año: la edición indica el año del ranking usado. Confirme costos, requisitos y cuartil en las fuentes oficiales.</p>
            </DataStatus>

            <section id="publicar-view-project" role="tabpanel" aria-labelledby="publicar-tab-project" hidden={tab !== 'project'} className="space-y-4">
                {!project && <ProjectEmptyState projects={projects} onSelect={selectProject} onOpenCatalog={() => setTab('catalog')} />}

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

                        <div className="flex flex-wrap items-center gap-2 text-[14.5px] text-gray-700">
                            <span ref={finder.countRef} aria-live="polite">
                                <b>{visible.length}</b> de {rows.length} revistas{finder.compareText}
                            </span>
                            <Chips advanced={advanced} onRemove={(key) => finder.patchAdvanced({ [key]: ADVANCED_DEFAULTS[key] })} onClear={() => finder.setAdvanced(ADVANCED_DEFAULTS)} />
                        </div>

                        <div className={`grid grid-cols-1 gap-5 items-start ${finder.panelOpen ? 'min-[1100px]:grid-cols-[minmax(0,1fr)_380px]' : ''}`}>
                            <section aria-label="Revistas sugeridas" className="min-w-0">
                                <ResultsLegend className="mb-3" />
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

            <footer className="border-t border-gray-200 pt-4 text-[13px] text-sem-text-2">
                <p>Datos: <a href="https://doaj.org/" target="_blank" rel="noopener noreferrer" className="text-institutional-blue underline">DOAJ</a> y <a href="https://www.scimagojr.com/" target="_blank" rel="noopener noreferrer" className="text-institutional-blue underline">SCImago Journal &amp; Country Rank</a>. Banco de Proyectos · UNIMAYOR, Popayán.</p>
            </footer>
        </div>
    );
}

// The journal data is a static file downloaded when the page opens (the project panel shares the same download).
export default function DondePublicar() {
    return <DataGate file={DATA_FILES.publicar} what="las revistas" rows={5}>{(data) => <DondePublicarPage publicarData={data} />}</DataGate>;
}
