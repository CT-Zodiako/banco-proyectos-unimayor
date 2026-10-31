import React from 'react';
import { Search } from 'lucide-react';
import { LEVELS } from '../lib/catalog';

const NewBadge = () => (
    <span className="bg-institutional-yellow text-institutional-dark text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full">
        Nuevo
    </span>
);

const SectionTitle = ({ children }) => (
    <legend className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">{children}</legend>
);

const CatalogFilters = ({
    facets, query, onQueryChange, selectedAreas, onToggleArea, selectedLevels, onToggleLevel,
    sector, onSectorChange, sectors, sectorSuggestions,
}) => (
    <aside aria-label="Filtros" className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
        <label htmlFor="catalog-search" className="sr-only">Buscar proyectos</label>
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} aria-hidden="true" />
            <input
                id="catalog-search"
                type="search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Buscar: EEG, invernadero, microservicios…"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-institutional-blue focus:border-transparent outline-none"
            />
        </div>

        <fieldset className="mt-6">
            <SectionTitle>Área</SectionTitle>
            {facets.map((family, index) => {
                const hasSelection = family.areas.some((a) => selectedAreas.includes(a.name));
                return (
                    <details
                        key={family.name}
                        open={hasSelection || index === 0}
                        className="border-t border-gray-100 first-of-type:border-t-0 py-2.5 group"
                    >
                        <summary className="flex justify-between items-center cursor-pointer list-none text-sm font-semibold text-gray-900 [&::-webkit-details-marker]:hidden rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-institutional-yellow">
                            {family.name}
                            <span className="text-gray-400 font-medium">{family.count}</span>
                        </summary>
                        <div className="mt-1.5">
                            {family.areas.map((area) => (
                                <label key={area.name} className="flex items-center gap-2 py-1 pl-1 text-[13.5px] text-gray-700 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedAreas.includes(area.name)}
                                        onChange={() => onToggleArea(area.name)}
                                        className="w-4 h-4 accent-institutional-blue"
                                    />
                                    <span>{area.name}</span>
                                    {area.isNew && <NewBadge />}
                                    <span className="ml-auto text-xs text-gray-400">{area.count}</span>
                                </label>
                            ))}
                        </div>
                    </details>
                );
            })}
        </fieldset>

        <fieldset className="mt-5">
            <SectionTitle>Nivel</SectionTitle>
            <div className="flex flex-wrap gap-1.5">
                {LEVELS.map((level) => {
                    const pressed = selectedLevels.includes(level);
                    return (
                        <button
                            key={level}
                            type="button"
                            aria-pressed={pressed}
                            onClick={() => onToggleLevel(level)}
                            className={`px-3 py-1.5 rounded-full text-[13px] font-medium border transition-colors ${pressed
                                ? 'bg-institutional-blue border-institutional-blue text-white'
                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                        >
                            {level}
                        </button>
                    );
                })}
            </div>
        </fieldset>

        <fieldset className="mt-5">
            <SectionTitle>Sector de aplicación</SectionTitle>
            <label htmlFor="catalog-sector" className="sr-only">Sector de aplicación</label>
            <input
                id="catalog-sector"
                type="search"
                list="catalog-sector-options"
                value={sector}
                onChange={(e) => onSectorChange(e.target.value)}
                placeholder="Escriba un sector…"
                aria-describedby="catalog-sector-hint"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-institutional-blue focus:border-transparent outline-none"
            />
            <datalist id="catalog-sector-options">
                {sectors.map((s) => <option key={s} value={s} />)}
            </datalist>
            <p id="catalog-sector-hint" className="mt-1.5 text-xs text-gray-500">
                {sectors.length} sectores · los más usados:{' '}
                {sectorSuggestions.map((s, i) => (
                    <React.Fragment key={s}>
                        {i > 0 && ', '}
                        <button type="button" onClick={() => onSectorChange(s)} className="text-institutional-blue hover:underline">
                            {s}
                        </button>
                    </React.Fragment>
                ))}
            </p>
        </fieldset>
    </aside>
);

export default CatalogFilters;
