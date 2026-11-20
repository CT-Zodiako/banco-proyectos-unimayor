import { useEffect, useMemo, useState, useRef } from 'react';
import { saveCatalogSearch } from '../lib/links';
import { useSearchParams } from 'react-router-dom';
import { Briefcase, ChevronDown, Code, Cpu, Layers, Plus, SlidersHorizontal, X } from 'lucide-react';
import CatalogFilters from '../components/CatalogFilters';
import ProposalDialog from '../components/ProposalDialog';
import ShareSearchButton from '../components/ShareSearchButton';
import ProjectCard, { LevelDots } from '../components/ProjectCard';
import { useProjects } from '../hooks/useProjects';
import { NEW_AREAS } from '../data/projects/areas';
import {
    activeCountLabel, activeFilterChips, areaTags, buildAreaFacets, countByLevel, filterProjects, sortProjects, paginate,
    topSectorGroups, SORTS, DEFAULT_SORT,
} from '../lib/catalog';

const PAGE_SIZE = 12;

// Compact page list: first, last, and the pages around the current one.
const pageWindow = (page, pages) => {
    const wanted = new Set([1, pages, page - 1, page, page + 1].filter((n) => n >= 1 && n <= pages));
    const sorted = [...wanted].sort((a, b) => a - b);
    return sorted.flatMap((n, i) => (i > 0 && n - sorted[i - 1] > 1 ? ['…', n] : [n]));
};

// An applied filter with its group ("Área:") and a button that removes just that one.
const FilterChip = ({ chip, onRemove }) => (
    <span className="filter-chip">
        <span><small>{chip.group}:</small> {chip.text}</span>
        <button type="button" onClick={onRemove} aria-label={`Quitar filtro: ${chip.group}: ${chip.text}`}>
            <X size={15} aria-hidden="true" />
        </button>
    </span>
);

// "How to read each card": one line per element, using the same badges and icons as the cards.
const CardLegend = () => (
    <aside
        aria-label="Cómo leer las tarjetas"
        className="bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-wrap items-center gap-x-[18px] gap-y-2 px-4 py-3 mb-[18px] text-[13px] text-gray-700"
    >
        <b className="text-[13.5px] text-gray-900">Cómo leer cada tarjeta</b>
        <span className="inline-flex items-center gap-[7px]">
            <span className="badge badge-area"><Layers size={15} aria-hidden="true" />Área</span> línea técnica
        </span>
        <span className="inline-flex items-center gap-[7px]">
            <span className="badge badge-sector"><Briefcase size={15} aria-hidden="true" />Sector</span> dónde se aplica
        </span>
        <span className="inline-flex items-center gap-[7px]">
            <span className="badge badge-level"><LevelDots rank={2} />Nivel</span> 1 a 3 puntos
        </span>
        <span className="inline-flex items-center gap-[7px]">
            <Cpu size={16} aria-hidden="true" className="text-sem-text-2" />Hardware = componentes físicos
        </span>
        <span className="inline-flex items-center gap-[7px]">
            <Code size={16} aria-hidden="true" className="text-sem-text-2" />Software = herramientas
        </span>
    </aside>
);

const ProjectsPage = () => {
    const { projects, loading } = useProjects();
    const [params, setParams] = useSearchParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const resultsRef = useRef(null);
    const headingRef = useRef(null);

    // Remember the filters so the project detail can link back to this exact view.
    useEffect(() => { saveCatalogSearch(params.toString() ? `?${params.toString()}` : ''); }, [params]);

    const query = params.get('q') ?? '';
    // params only changes identity when the URL changes, so these stay stable between renders.
    const selectedAreas = useMemo(() => params.getAll('area'), [params]);
    const selectedLevels = useMemo(() => params.getAll('nivel'), [params]);
    const sector = params.get('sector') ?? '';
    const sort = SORTS.some((s) => s.value === params.get('orden')) ? params.get('orden') : DEFAULT_SORT;

    // Every filter change goes back to page 1; replace keeps typing out of the browser history.
    const update = (mutate, { keepPage = false } = {}) => {
        const next = new URLSearchParams(params);
        mutate(next);
        if (!keepPage) next.delete('pagina');
        setParams(next, { replace: true });
    };
    const setSingle = (key, value) => update((next) => (value ? next.set(key, value) : next.delete(key)));
    const toggleMulti = (key, value) => update((next) => {
        const values = next.getAll(key);
        next.delete(key);
        (values.includes(value) ? values.filter((v) => v !== value) : [...values, value]).forEach((v) => next.append(key, v));
    });
    // The button that removes a filter disappears with it: the focus goes to the results heading, not to the page.
    const focusResults = () => headingRef.current?.focus({ preventScroll: true });
    const clearAll = () => {
        setParams(new URLSearchParams(sort === DEFAULT_SORT ? {} : { orden: sort }), { replace: true });
        focusResults();
    };

    const allProjects = useMemo(() => (loading || !projects ? [] : projects), [loading, projects]);
    // Area counts reflect the other active filters, so they tell how many results each checkbox would add.
    const withoutAreaFilter = useMemo(
        () => filterProjects(allProjects, { query, levels: selectedLevels, sector }),
        [allProjects, query, selectedLevels, sector],
    );
    const facets = useMemo(() => buildAreaFacets(withoutAreaFilter), [withoutAreaFilter]);
    // Same idea for the level counts: the other filters apply, the levels themselves do not.
    const levelCounts = useMemo(
        () => countByLevel(filterProjects(allProjects, { query, areas: selectedAreas, sector })),
        [allProjects, query, selectedAreas, sector],
    );
    const filtered = useMemo(
        () => sortProjects(filterProjects(withoutAreaFilter, { areas: selectedAreas }), sort),
        [withoutAreaFilter, selectedAreas, sort],
    );
    const { items, page, pages } = paginate(filtered, params.get('pagina'), PAGE_SIZE);

    const sectors = useMemo(() => [...new Set(allProjects.map((p) => p.sector).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es')), [allProjects]);
    const sectorSuggestions = useMemo(() => topSectorGroups(allProjects, 3), [allProjects]);
    const areaCount = useMemo(() => new Set(allProjects.flatMap(areaTags)).size, [allProjects]);
    const proposalAreas = useMemo(() => [...new Set(allProjects.flatMap(areaTags))].sort((a, b) => a.localeCompare(b, 'es')), [allProjects]);

    const goToPage = (n) => {
        update((next) => (n > 1 ? next.set('pagina', String(n)) : next.delete('pagina')), { keepPage: true });
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const chips = activeFilterChips({ areas: selectedAreas, levels: selectedLevels, sector, query });
    const hasFilters = chips.length > 0;
    const removeChip = ({ kind, value }) => {
        if (kind === 'area') toggleMulti('area', value);
        else if (kind === 'nivel') toggleMulti('nivel', value);
        else setSingle(kind === 'sector' ? 'sector' : 'q', '');
        focusResults();
    };
    const one = filtered.length === 1;

    return (
        <div className="py-8 px-4 max-w-7xl mx-auto">
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold leading-tight text-gray-900 mb-1.5">Explorar proyectos</h1>
                    <p className="text-[15px] text-sem-text-2">
                        <strong className="text-institutional-blue">{allProjects.length} proyectos</strong> en {areaCount} áreas · {NEW_AREAS.length} áreas nuevas este semestre
                    </p>
                    <p className="mt-1.5 max-w-[62ch] text-[14.5px] text-gray-700">
                        Elige un área, ajusta el nivel y abre un proyecto para ver su alcance, materiales y dónde publicarlo.
                    </p>
                </div>
                <button type="button" onClick={() => setIsModalOpen(true)} className="btn btn-primary btn-lg focus-ring">
                    <Plus size={18} aria-hidden="true" />
                    Proponer proyecto
                </button>
            </div>

            <button
                type="button"
                onClick={() => setFiltersOpen((open) => !open)}
                aria-expanded={filtersOpen}
                aria-controls="catalog-filters"
                className="min-[960px]:hidden w-full mb-3 flex items-center gap-2.5 min-h-[48px] px-4 rounded-xl border border-sem-control-line bg-white text-base font-bold text-gray-900 focus-ring"
            >
                <SlidersHorizontal size={16} aria-hidden="true" />
                Filtros
                {hasFilters && <span className="count-badge">{activeCountLabel(chips.length)}</span>}
                <ChevronDown size={18} aria-hidden="true" className={`ml-auto text-sem-text-2 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className="grid grid-cols-1 min-[960px]:grid-cols-[300px_minmax(0,1fr)] gap-7 items-start">
                <div id="catalog-filters" className={`${filtersOpen ? 'block' : 'hidden'} min-[960px]:block min-[960px]:sticky min-[960px]:top-24 min-[960px]:max-h-[calc(100vh-7rem)] min-[960px]:overflow-y-auto`}>
                    <CatalogFilters
                        facets={facets}
                        query={query}
                        onQueryChange={(v) => setSingle('q', v)}
                        selectedAreas={selectedAreas}
                        onToggleArea={(a) => toggleMulti('area', a)}
                        selectedLevels={selectedLevels}
                        onToggleLevel={(l) => toggleMulti('nivel', l)}
                        sector={sector}
                        onSectorChange={(v) => setSingle('sector', v)}
                        sectors={sectors}
                        sectorSuggestions={sectorSuggestions}
                        activeCount={chips.length}
                        levelCounts={levelCounts}
                    />
                </div>

                <section aria-label="Resultados" ref={resultsRef} className="scroll-mt-24 min-w-0">
                    <div className="flex flex-wrap justify-between items-end gap-4 mb-2.5">
                        <h2 ref={headingRef} tabIndex={-1} aria-live="polite" className="text-[22px] font-extrabold leading-tight text-gray-900">
                            {filtered.length} {one ? 'proyecto' : 'proyectos'}{' '}
                            <span className="ml-1.5 text-[15px] font-medium text-sem-text-2">
                                {hasFilters ? `que ${one ? 'cumple' : 'cumplen'} tus filtros` : (one ? 'disponible' : 'disponibles')}
                            </span>
                        </h2>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            <ShareSearchButton />
                            <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-700">
                                Ordenar por
                                <select
                                    value={sort}
                                    onChange={(e) => setSingle('orden', e.target.value === DEFAULT_SORT ? '' : e.target.value)}
                                    className="field-select"
                                >
                                    {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                                </select>
                            </label>
                        </div>
                    </div>

                    {hasFilters && (
                        <div role="group" aria-label="Filtros activos" className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="mr-0.5 text-[13.5px] font-semibold text-gray-700">Filtros activos:</span>
                            {chips.map((chip) => <FilterChip key={chip.id} chip={chip} onRemove={() => removeChip(chip)} />)}
                            <button type="button" onClick={clearAll} className="link-action focus-ring rounded">Limpiar filtros</button>
                        </div>
                    )}

                    <CardLegend />

                    {items.length > 0 ? (
                        <div className="grid grid-cols-1 min-[1101px]:grid-cols-2 gap-5">
                            {items.map((project) => <ProjectCard key={project.id} project={project} />)}
                        </div>
                    ) : (
                        <div className="py-16 text-center border border-dashed border-sem-control-line rounded-2xl bg-white">
                            <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
                            <h3 className="text-xl font-bold text-gray-800">No encontramos resultados</h3>
                            <p className="text-sem-text-2">Intente con otros términos o quite algunos filtros.</p>
                        </div>
                    )}

                    {pages > 1 && (
                        <nav aria-label="Paginación" className="flex justify-center items-center flex-wrap gap-1.5 mt-7">
                            <p className="w-full mb-1 text-center text-[13.5px] text-sem-text-2">
                                Página {page} de {pages} · {PAGE_SIZE} proyectos por página
                            </p>
                            <button
                                type="button"
                                onClick={() => goToPage(page - 1)}
                                disabled={page === 1}
                                aria-label="Página anterior"
                                className="page-btn focus-ring"
                            >
                                <span aria-hidden="true">←</span> Anterior
                            </button>
                            {pageWindow(page, pages).map((n, i) => (n === '…'
                                ? <span key={`gap-${i}`} className="h-10 px-2 grid place-items-center text-sem-text-2">…</span>
                                : (
                                    <button
                                        key={n}
                                        type="button"
                                        onClick={() => goToPage(n)}
                                        aria-current={n === page ? 'page' : undefined}
                                        aria-label={n === page ? `Página ${n}, actual` : `Página ${n}`}
                                        className="page-btn focus-ring"
                                    >
                                        {n}
                                    </button>
                                )))}
                            <button
                                type="button"
                                onClick={() => goToPage(page + 1)}
                                disabled={page === pages}
                                aria-label="Página siguiente"
                                className="page-btn focus-ring"
                            >
                                Siguiente <span aria-hidden="true">→</span>
                            </button>
                        </nav>
                    )}
                </section>
            </div>

            {isModalOpen && <ProposalDialog areas={proposalAreas} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default ProjectsPage;
