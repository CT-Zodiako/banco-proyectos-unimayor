import { Briefcase, Check, ChevronDown, Search } from 'lucide-react';
import { LEVELS, activeCountLabel, levelRank } from '../lib/catalog';
import { LevelDots } from './ProjectCard';

const NewBadge = () => <span className="badge badge-new">Nuevo</span>;

// A filter section: visible title, then one line that says what it does.
const SectionTitle = ({ children, hint }) => (
    <>
        <legend className="float-left w-full p-0"><h3 className="text-[15px] font-bold text-gray-900">{children}</h3></legend>
        <p className="field-hint clear-both mb-2.5">{hint}</p>
    </>
);

const CatalogFilters = ({
    facets, query, onQueryChange, selectedAreas, onToggleArea, selectedLevels, onToggleLevel,
    sector, onSectorChange, sectors, sectorSuggestions, activeCount = 0, levelCounts = {},
}) => (
    <aside aria-label="Filtros" className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between gap-2 mb-1">
            <h2 className="text-lg font-extrabold text-gray-900">Filtros</h2>
            <span className={activeCount > 0 ? 'count-badge' : 'count-pill'}>{activeCountLabel(activeCount)}</span>
        </div>
        <p className="mb-4 text-[13px] text-sem-text-2">
            Combina búsqueda, área, nivel y sector. Los números indican cuántos proyectos hay en cada opción.
        </p>

        <div>
            <label htmlFor="catalog-search" className="field-label">Buscar</label>
            <p id="catalog-search-hint" className="field-hint">Busca en títulos, problemas y tecnologías.</p>
            <div className="relative">
                <Search className="absolute left-[13px] top-1/2 -mt-2 text-sem-text-2" size={16} aria-hidden="true" />
                <input
                    id="catalog-search"
                    type="search"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder="EEG, invernadero, MQTT"
                    aria-describedby="catalog-search-hint"
                    className="field-input"
                />
            </div>
        </div>

        <fieldset className="mt-5 pt-[18px] border-0 border-t border-gray-200 min-w-0">
            <SectionTitle hint="Elige una o varias áreas técnicas. Abre un grupo para ver sus áreas.">Área</SectionTitle>
            {facets.map((family, index) => {
                const selectedHere = family.areas.filter((a) => selectedAreas.includes(a.name)).length;
                return (
                    <details
                        key={family.name}
                        open={selectedHere > 0 || index === 0}
                        className="border-t border-gray-100 first-of-type:border-t-0 py-1 group"
                    >
                        <summary className="flex items-center gap-2 min-h-[40px] cursor-pointer list-none px-1 rounded-lg text-[14.5px] font-bold text-gray-900 hover:bg-gray-50 [&::-webkit-details-marker]:hidden focus-ring">
                            <span className="flex-1">{family.name}</span>
                            {selectedHere > 0 && (
                                <span className="grid place-items-center flex-none min-w-[22px] h-[22px] rounded-full bg-institutional-blue text-white text-xs font-bold" title={`${selectedHere} elegidas`}>
                                    <span aria-hidden="true">{selectedHere}</span>
                                    <span className="sr-only">{selectedHere} elegidas</span>
                                </span>
                            )}
                            <span className="count-pill">{family.count}</span>
                            <ChevronDown size={16} aria-hidden="true" className="text-sem-text-2 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="pt-0.5 pb-2">
                            {family.areas.map((area) => {
                                const checked = selectedAreas.includes(area.name);
                                return (
                                    <label
                                        key={area.name}
                                        className={`flex items-center gap-2.5 min-h-[36px] px-2.5 py-1.5 rounded-lg text-sm cursor-pointer ${checked
                                            ? 'bg-sem-area-bg text-sem-area-fg font-bold'
                                            : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => onToggleArea(area.name)}
                                            className="w-[18px] h-[18px] m-0 flex-none cursor-pointer accent-institutional-blue focus-ring"
                                        />
                                        <span>{area.name}</span>
                                        {area.isNew && <NewBadge />}
                                        <span className={`count-pill ml-auto ${checked ? '!bg-sem-area-line !text-sem-area-fg' : ''}`}>{area.count}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </details>
                );
            })}
        </fieldset>

        <fieldset className="mt-5 pt-[18px] border-0 border-t border-gray-200 min-w-0">
            <SectionTitle hint="Los puntos van de 1 de 3 (Intermedio) a 3 de 3 (Avanzado). Puedes marcar varios.">Nivel de dificultad</SectionTitle>
            <div className="flex flex-wrap gap-2">
                {LEVELS.map((level) => {
                    const pressed = selectedLevels.includes(level);
                    return (
                        <button
                            key={level}
                            type="button"
                            aria-pressed={pressed}
                            onClick={() => onToggleLevel(level)}
                            className="chip"
                        >
                            <Check size={15} aria-hidden="true" className="chip-check flex-none" />
                            <LevelDots rank={levelRank(level)} />
                            {level}
                            {level in levelCounts && <span className="chip-count">{levelCounts[level]}</span>}
                        </button>
                    );
                })}
            </div>
        </fieldset>

        <div className="mt-5 pt-[18px] border-t border-gray-200">
            <label htmlFor="catalog-sector" className="field-label">Sector de aplicación</label>
            <p id="catalog-sector-hint" className="field-hint">
                Escribe un sector o elige uno de los {sectors.length} disponibles.
            </p>
            <div className="relative">
                <Briefcase className="absolute left-[13px] top-1/2 -mt-2 text-sem-text-2" size={16} aria-hidden="true" />
                <input
                    id="catalog-sector"
                    type="search"
                    list="catalog-sector-options"
                    value={sector}
                    onChange={(e) => onSectorChange(e.target.value)}
                    placeholder="Ej.: Agricultura"
                    aria-describedby="catalog-sector-hint"
                    className="field-input"
                />
            </div>
            <datalist id="catalog-sector-options">
                {sectors.map((s) => <option key={s} value={s} />)}
            </datalist>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[13px] text-sem-text-2">
                <span>Más usados:</span>
                {sectorSuggestions.map((s) => (
                    <button
                        key={s}
                        type="button"
                        aria-pressed={sector === s}
                        onClick={() => onSectorChange(sector === s ? '' : s)}
                        className="chip chip-sm"
                    >
                        {s}
                    </button>
                ))}
            </div>
        </div>
    </aside>
);

export default CatalogFilters;
