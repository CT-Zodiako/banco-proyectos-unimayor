import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';

const DropdownFilter = ({ label, icon, options, activeValue, onSelect, colorClass }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const isActive = activeValue && activeValue !== 'Todos';
    const displayLabel = isActive ? activeValue : label;

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(o => !o)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all border shadow-sm
                    ${isActive
                        ? `${colorClass} text-white border-transparent shadow-md`
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
            >
                {icon}
                <span className="max-w-[160px] truncate">{displayLabel}</span>
                {isActive
                    ? <X size={14} className="ml-1 flex-shrink-0" onClick={(e) => { e.stopPropagation(); onSelect('Todos'); setOpen(false); }} />
                    : <ChevronDown size={15} className={`flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                }
            </button>

            {open && (
                <div className="absolute top-full mt-2 left-0 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 w-72 max-h-80 overflow-y-auto py-2">
                    <button
                        onClick={() => { onSelect('Todos'); setOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm font-semibold transition-colors
                            ${'Todos' === activeValue ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Todos
                    </button>
                    <div className="border-t border-gray-100 my-1" />
                    {options.map(opt => (
                        <button
                            key={opt}
                            onClick={() => { onSelect(opt); setOpen(false); }}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors
                                ${opt === activeValue ? 'bg-blue-50 text-institutional-blue font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const SearchBar = ({ searchTerm, setSearchTerm, activeArea, setActiveArea, activeSector, setActiveSector, areas, sectors }) => {
    return (
        <div className="space-y-4 mb-8">
            {/* Search Input Row */}
            <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar proyectos por título, descripción o sector..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-institutional-blue focus:border-transparent outline-none transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Filter Buttons Row */}
            <div className="flex flex-wrap items-center gap-2">
                {/* Todos button */}
                <button
                    onClick={() => { setActiveArea('Todos'); setActiveSector('Todos'); }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border shadow-sm
                        ${activeArea === 'Todos' && activeSector === 'Todos'
                            ? 'bg-institutional-blue text-white border-institutional-blue shadow-md'
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    Todos
                </button>

                {/* Separator */}
                <div className="w-px h-7 bg-gray-200 mx-1" />

                {/* Área Tecnológica Dropdown */}
                <DropdownFilter
                    label="Área Tecnológica"
                    icon={<span className="text-base leading-none">💻</span>}
                    options={areas}
                    activeValue={activeArea}
                    onSelect={setActiveArea}
                    colorClass="bg-institutional-blue"
                />

                {/* Sectores de Aplicación Dropdown */}
                <DropdownFilter
                    label="Sector de Aplicación"
                    icon={<span className="text-base leading-none">🏭</span>}
                    options={sectors}
                    activeValue={activeSector}
                    onSelect={setActiveSector}
                    colorClass="bg-emerald-600"
                />

                {/* Active filters display */}
                {(activeArea !== 'Todos' || activeSector !== 'Todos') && (
                    <button
                        onClick={() => { setActiveArea('Todos'); setActiveSector('Todos'); }}
                        className="ml-auto flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <X size={13} /> Limpiar filtros
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
