import React, { useMemo, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, X, SlidersHorizontal } from 'lucide-react';
import CatalogFilters from '../components/CatalogFilters';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../hooks/useProjects';
import { NEW_AREAS } from '../data/projects/areas';
import {
    areaTags, buildAreaFacets, filterProjects, sortProjects, paginate, topSectorGroups, SORTS,
} from '../lib/catalog';

const PAGE_SIZE = 12;

// Compact page list: first, last, and the pages around the current one.
const pageWindow = (page, pages) => {
    const wanted = new Set([1, pages, page - 1, page, page + 1].filter((n) => n >= 1 && n <= pages));
    const sorted = [...wanted].sort((a, b) => a - b);
    return sorted.flatMap((n, i) => (i > 0 && n - sorted[i - 1] > 1 ? ['…', n] : [n]));
};

const FilterChip = ({ label, onRemove }) => (
    <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 rounded-full pl-3 pr-1.5 py-1 text-[13px] font-semibold">
        {label}
        <button
            type="button"
            onClick={onRemove}
            aria-label={`Quitar filtro ${label}`}
            className="w-[18px] h-[18px] rounded-full bg-blue-100 hover:bg-blue-200 grid place-items-center"
        >
            <X size={11} aria-hidden="true" />
        </button>
    </span>
);

const ProjectsPage = () => {
    const { projects, loading } = useProjects();
    const [params, setParams] = useSearchParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const resultsRef = useRef(null);

    const query = params.get('q') ?? '';
    const selectedAreas = params.getAll('area');
    const selectedLevels = params.getAll('nivel');
    const sector = params.get('sector') ?? '';
    const sort = SORTS.some((s) => s.value === params.get('orden')) ? params.get('orden') : 'recientes';

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
    const clearAll = () => setParams(new URLSearchParams(sort === 'recientes' ? {} : { orden: sort }), { replace: true });

    const allProjects = loading || !projects ? [] : projects;
    // Area counts reflect the other active filters, so they tell how many results each checkbox would add.
    const withoutAreaFilter = useMemo(
        () => filterProjects(allProjects, { query, levels: selectedLevels, sector }),
        [allProjects, query, selectedLevels.join('|'), sector],
    );
    const facets = useMemo(() => buildAreaFacets(withoutAreaFilter), [withoutAreaFilter]);
    const filtered = useMemo(
        () => sortProjects(filterProjects(withoutAreaFilter, { areas: selectedAreas }), sort),
        [withoutAreaFilter, selectedAreas.join('|'), sort],
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

    const hasFilters = selectedAreas.length > 0 || selectedLevels.length > 0 || sector || query;

    return (
        <div className="py-8 px-4 max-w-7xl mx-auto">
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-1.5">Explorar Proyectos</h1>
                    <p className="text-gray-500">
                        <strong className="text-institutional-blue">{allProjects.length} proyectos</strong> en {areaCount} áreas · {NEW_AREAS.length} áreas nuevas este semestre
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-institutional-blue text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
                >
                    <Plus size={18} aria-hidden="true" />
                    Proponer proyecto
                </button>
            </div>

            <button
                type="button"
                onClick={() => setFiltersOpen((open) => !open)}
                aria-expanded={filtersOpen}
                aria-controls="catalog-filters"
                className="lg:hidden w-full mb-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700"
            >
                <SlidersHorizontal size={16} aria-hidden="true" />
                {filtersOpen ? 'Ocultar filtros' : 'Filtros'}
                {(selectedAreas.length + selectedLevels.length + (sector ? 1 : 0)) > 0 && (
                    <span className="bg-institutional-blue text-white rounded-full text-xs px-2 py-0.5">
                        {selectedAreas.length + selectedLevels.length + (sector ? 1 : 0)}
                    </span>
                )}
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-7 items-start">
                <div id="catalog-filters" className={`${filtersOpen ? 'block' : 'hidden'} lg:block lg:sticky lg:top-24`}>
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
                />
                </div>

                <section aria-label="Resultados" ref={resultsRef} className="scroll-mt-24">
                    <div className="flex flex-wrap justify-between items-center gap-3 mb-3.5">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600" aria-live="polite">
                            <span><b className="text-gray-900">{filtered.length}</b> resultados</span>
                            {selectedAreas.map((a) => <FilterChip key={a} label={a} onRemove={() => toggleMulti('area', a)} />)}
                            {selectedLevels.map((l) => <FilterChip key={l} label={l} onRemove={() => toggleMulti('nivel', l)} />)}
                            {sector && <FilterChip label={`Sector: ${sector}`} onRemove={() => setSingle('sector', '')} />}
                            {query && <FilterChip label={`“${query}”`} onRemove={() => setSingle('q', '')} />}
                            {hasFilters && (
                                <button type="button" onClick={clearAll} className="text-[13px] font-semibold text-institutional-blue underline">
                                    Limpiar todo
                                </button>
                            )}
                        </div>
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                            Ordenar
                            <select
                                value={sort}
                                onChange={(e) => setSingle('orden', e.target.value === 'recientes' ? '' : e.target.value)}
                                className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-700"
                            >
                                {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                            </select>
                        </label>
                    </div>

                    {items.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
                            {items.map((project) => <ProjectCard key={project.id} project={project} />)}
                        </div>
                    ) : (
                        <div className="py-16 text-center border border-dashed border-gray-200 rounded-2xl bg-white">
                            <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
                            <h2 className="text-xl font-bold text-gray-800">No encontramos resultados</h2>
                            <p className="text-gray-500">Intente con otros términos o quite algunos filtros.</p>
                        </div>
                    )}

                    {pages > 1 && (
                        <nav aria-label="Paginación" className="flex justify-center flex-wrap gap-1.5 mt-7">
                            <button
                                type="button"
                                onClick={() => goToPage(page - 1)}
                                disabled={page === 1}
                                className="h-[38px] px-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 disabled:opacity-40"
                            >
                                ← Anterior
                            </button>
                            {pageWindow(page, pages).map((n, i) => (n === '…'
                                ? <span key={`gap-${i}`} className="h-[38px] px-2 grid place-items-center text-gray-400">…</span>
                                : (
                                    <button
                                        key={n}
                                        type="button"
                                        onClick={() => goToPage(n)}
                                        aria-current={n === page ? 'page' : undefined}
                                        className={`min-w-[38px] h-[38px] px-2.5 rounded-xl border text-sm ${n === page
                                            ? 'bg-institutional-blue border-institutional-blue text-white'
                                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        {n}
                                    </button>
                                )))}
                            <button
                                type="button"
                                onClick={() => goToPage(page + 1)}
                                disabled={page === pages}
                                className="h-[38px] px-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 disabled:opacity-40"
                            >
                                Siguiente →
                            </button>
                        </nav>
                    )}
                </section>
            </div>

            {/* Modal de Agregar Proyecto */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-2xl font-bold text-gray-900">Proponer proyecto</h2>
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
                                        {proposalAreas.map(a => (
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
