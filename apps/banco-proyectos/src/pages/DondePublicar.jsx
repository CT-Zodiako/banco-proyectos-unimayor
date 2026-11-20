import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import publicarData from '../data/publicar-data.json';
import CatalogView from '../components/publicar/CatalogView';
import CompareTray from '../components/publicar/CompareTray';
import FiltersPanel from '../components/publicar/FiltersPanel';
import HelpView from '../components/publicar/HelpView';
import JournalTable from '../components/publicar/JournalTable';
import ResultItem from '../components/publicar/ResultItem';
import { FOCUS, INPUT, NOTE } from '../components/publicar/classes';
import { SORT_DEFAULT_DIR, compareSelectedText, filterChips, nextSort } from '../lib/publicar/display';
import { deleteUserPreset, loadUserPresets, saveUserPreset, saveUserPresets } from '../lib/publicar/presets';
import { projectRows, requestedProjectId, visibleRows } from '../lib/publicar/project';
import { ADVANCED_DEFAULTS, countAdvanced, dataStatus, toggleCompare } from '../lib/publicar/table';

const { projects, journals, themes } = publicarData;
const projectsById = new Map(projects.map((project) => [project.id, project]));
const journalsById = new Map(journals.map((journal) => [journal.id, journal]));
const PAGE_TITLE = '¿Dónde publicar este proyecto? · Banco de Proyectos · UNIMAYOR';
const TABS = [['project', 'Revistas del proyecto'], ['catalog', 'Catálogo completo'], ['help', 'Cómo leer esta página']];
const SORT_OPTIONS = [['affinity', 'Mayor afinidad'], ['quartile', 'Mejor cuartil'], ['weeks', 'Publicación más rápida'], ['sjr', 'Mayor SJR'], ['h_index', 'Mayor índice H'], ['title', 'Nombre (A–Z)']];
const MODES = [['list', 'Lista'], ['table', 'Tabla']];

const browserStorage = () => {
    try { return window.localStorage; } catch { return null; }
};

function Chips({ advanced, onRemove, onClear }) {
    const chips = filterChips(advanced);
    return (
        <div className="contents" aria-label="Filtros activos">
            {chips.map(([key, label]) => (
                <span key={key} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 rounded-full py-[5px] pr-2 pl-3 text-[13px] font-semibold">
                    {label}
                    <button type="button" onClick={() => onRemove(key)} aria-label={`Quitar filtro ${label}`} className={`border-0 bg-blue-100 text-blue-700 w-[18px] h-[18px] rounded-full text-xs leading-none cursor-pointer ${FOCUS}`}>×</button>
                </span>
            ))}
            {chips.length > 0 && (
                <button type="button" onClick={onClear} className={`border-0 bg-transparent text-institutional-blue text-[13px] font-semibold underline cursor-pointer rounded ${FOCUS}`}>Limpiar todo</button>
            )}
        </div>
    );
}

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
    const projectId = project ? project.id : null;

    const [tab, setTab] = useState('project');
    const [query, setQuery] = useState('');
    const [mode, setMode] = useState('list');
    const [sort, setSort] = useState({ key: 'affinity', dir: SORT_DEFAULT_DIR.affinity });
    const [advanced, setAdvanced] = useState(ADVANCED_DEFAULTS);
    const [panelOpen, setPanelOpen] = useState(false);
    const [userPresets, setUserPresets] = useState(() => loadUserPresets(browserStorage()));
    const [trayHeight, setTrayHeight] = useState(0);
    // The compare selection belongs to one project: choosing another one starts it again.
    const [compareState, setCompareState] = useState({ projectId: null, ids: [] });
    const compare = compareState.projectId === projectId ? compareState.ids : [];
    const setCompare = (update) => setCompareState((previous) => ({ projectId, ids: update(previous.projectId === projectId ? previous.ids : []) }));
    const toggleButtonRef = useRef(null);
    const countRef = useRef(null);

    useEffect(() => {
        document.title = project ? `${project.title} · ¿Dónde publicar?` : PAGE_TITLE;
        return () => { document.title = 'Banco de Proyectos IoT - UNIMAYOR'; };
    }, [project]);

    const rows = useMemo(() => projectRows(project, journalsById, themes), [project]);
    const visible = useMemo(() => visibleRows(rows, advanced, query, sort), [rows, advanced, query, sort]);
    const affinityById = useMemo(() => Object.fromEntries(rows.map((row) => [row.journal.id, row.affinity])), [rows]);
    const comparedJournals = compare.map((id) => journalsById.get(id)).filter(Boolean);
    const trayVisible = tab === 'project' && mode === 'table' && project !== null && comparedJournals.length > 0;
    const onTrayHeight = useCallback((height) => setTrayHeight(height ? height + 16 : 0), []);

    const selectProject = (id) => navigate({ search: projectsById.has(id) ? `?p=${encodeURIComponent(id)}` : '' }, { replace: true });
    const patchAdvanced = (patch) => setAdvanced((current) => ({ ...current, ...patch }));
    const commitPresets = (next) => { setUserPresets(next); saveUserPresets(browserStorage(), next); };
    const closePanel = (focusToggle) => {
        setPanelOpen(false);
        if (focusToggle) setTimeout(() => toggleButtonRef.current?.focus(), 0);
    };
    const toggleCompared = (id) => setCompare((ids) => toggleCompare(ids, id));
    const advancedCount = countAdvanced(advanced);

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
                        <div role="search" className="flex flex-wrap items-center gap-2.5">
                            <label htmlFor="publicar-table-search" className="sr-only">Buscar revistas</label>
                            <input
                                id="publicar-table-search"
                                type="search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Buscar revista, país o editorial…"
                                autoComplete="off"
                                className={`${INPUT} flex-1 min-w-[240px] !py-[11px] !px-3.5`}
                            />
                            <label htmlFor="publicar-sort-select" className="inline-flex items-center gap-2 text-sm text-gray-600">
                                Ordenar
                                <select id="publicar-sort-select" value={sort.key} onChange={(event) => setSort({ key: event.target.value, dir: SORT_DEFAULT_DIR[event.target.value] })} className={INPUT}>
                                    {SORT_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                                </select>
                            </label>
                            <div role="group" aria-label="Vista de resultados" className="inline-flex border border-gray-200 rounded-xl overflow-hidden">
                                {MODES.map(([value, label]) => (
                                    <button
                                        key={value}
                                        type="button"
                                        aria-pressed={mode === value}
                                        onClick={() => setMode(value)}
                                        className={`px-3 py-2 text-[13px] font-semibold border-r border-gray-200 last:border-r-0 ${FOCUS} ${mode === value ? 'bg-institutional-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                            <button
                                ref={toggleButtonRef}
                                type="button"
                                aria-expanded={panelOpen}
                                aria-controls="publicar-adv-panel"
                                onClick={() => setPanelOpen((open) => !open)}
                                className={`inline-flex items-center gap-2 px-4 py-[11px] rounded-xl border border-institutional-blue bg-institutional-blue text-white text-sm font-semibold hover:bg-blue-800 ${FOCUS}`}
                            >
                                <span aria-hidden="true">⚙</span> Filtros personalizados
                                {advancedCount > 0 && <span className="bg-institutional-yellow text-institutional-dark rounded-full text-xs font-bold px-2 py-px">{advancedCount}</span>}
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                            <span ref={countRef} aria-live="polite">
                                <b>{visible.length}</b> de {rows.length} revistas{compareSelectedText(mode === 'table' ? compare.length : 0)}
                            </span>
                            <Chips advanced={advanced} onRemove={(key) => patchAdvanced({ [key]: ADVANCED_DEFAULTS[key] })} onClear={() => setAdvanced(ADVANCED_DEFAULTS)} />
                        </div>

                        <div className={`grid grid-cols-1 gap-5 items-start ${panelOpen ? 'min-[1100px]:grid-cols-[minmax(0,1fr)_380px]' : ''}`}>
                            <section aria-label="Revistas sugeridas">
                                {visible.length > 0 && mode === 'list' && (
                                    <div className="grid gap-2.5">
                                        {visible.map((row, index) => <ResultItem key={row.journal.id} row={row} open={index === 0} />)}
                                    </div>
                                )}
                                {visible.length > 0 && mode === 'table' && (
                                    <JournalTable rows={visible} sort={sort} compare={compare} onSort={(id) => setSort((current) => nextSort(current, id))} onToggleCompare={toggleCompared} />
                                )}
                                {visible.length === 0 && (
                                    <p className="text-center p-7 text-gray-500 border border-dashed border-gray-200 rounded-2xl bg-white">Ninguna revista cumple estos filtros. Quite algunos filtros o pruebe otro filtro guardado.</p>
                                )}
                                <p className={`${NOTE} mt-3.5`}><strong>La afinidad no es una probabilidad de aceptación.</strong> Se calcula con el encaje temático (40), la exigencia del cuartil frente al nivel del proyecto (25), el tiempo de publicación (15), el idioma (10) y si la revista es iberoamericana (10). La aceptación depende de la calidad del artículo y de la revisión por pares; lea el alcance de cada revista y confirme en su sitio que no cobra antes de enviar.</p>
                            </section>

                            {panelOpen && (
                                <FiltersPanel
                                    advanced={advanced}
                                    shown={visible.length}
                                    userPresets={userPresets}
                                    onChange={patchAdvanced}
                                    onReset={() => setAdvanced(ADVANCED_DEFAULTS)}
                                    onApplyPreset={setAdvanced}
                                    onSavePreset={(preset) => commitPresets(saveUserPreset(userPresets, preset))}
                                    onDeletePreset={(preset) => commitPresets(deleteUserPreset(userPresets, preset))}
                                    onClose={() => closePanel(true)}
                                    onApply={() => { closePanel(false); countRef.current?.scrollIntoView({ block: 'center' }); }}
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
                    affinityById={affinityById}
                    onRemove={toggleCompared}
                    onClear={() => setCompare(() => [])}
                    onHeight={onTrayHeight}
                />
            )}

            <footer className="border-t border-gray-200 pt-4 text-[13px] text-gray-500">
                <p>Datos: <a href="https://doaj.org/" target="_blank" rel="noopener noreferrer" className="text-institutional-blue underline">DOAJ</a> y <a href="https://www.scimagojr.com/" target="_blank" rel="noopener noreferrer" className="text-institutional-blue underline">SCImago Journal &amp; Country Rank</a>. Banco de Proyectos · UNIMAYOR, Popayán.</p>
            </footer>
        </div>
    );
}
