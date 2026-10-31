import { useState } from 'react';
import { X, ExternalLink, Globe, Search, Settings, Plus, Edit2, Trash2, RotateCcw, Check, Power, AlertCircle, Bookmark } from 'lucide-react';
import { usePublishingPlatforms } from '../hooks/usePublishingPlatforms';

const PublishingModal = ({ isOpen, onClose, project }) => {
    const {
        platforms,
        addPlatform,
        updatePlatform,
        togglePlatformStatus,
        deletePlatform,
        resetToDefaults,
        getPlatformsForTopic
    } = usePublishingPlatforms();

    const [activeTab, setActiveTab] = useState('recommendations'); // 'recommendations' | 'config'
    const [searchQuery, setSearchQuery] = useState(project ? project.area : '');
    const [tableSearch, setTableSearch] = useState('');
    const [editingPlatform, setEditingPlatform] = useState(null); // null or platform object
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Form state for Add/Edit
    const [formData, setFormData] = useState({
        subjectArea: 'SBC-IoT',
        section: 'Acceso Abierto',
        platform: '',
        url: '',
        logo: '🌐',
        description: '',
        priority: 1,
        order: 1,
        status: 'activo'
    });

    if (!isOpen || !project) return null;

    const topic = project.area;
    const { openAccess, specialized, alternativeDirectories } = getPlatformsForTopic(topic);

    const handleOpenPlatformUrl = (urlTemplate, currentQuery) => {
        const queryTerm = encodeURIComponent(currentQuery || topic);
        let finalUrl = urlTemplate.replace('{query}', queryTerm);
        window.open(finalUrl, '_blank', 'noopener,noreferrer');
    };

    const handleOpenAddForm = () => {
        setEditingPlatform(null);
        setFormData({
            subjectArea: topic || 'SBC-IoT',
            section: 'Acceso Abierto',
            platform: '',
            url: 'https://doaj.org/search/articles?q={query}',
            logo: '🌐',
            description: '',
            priority: 1,
            order: (platforms.length + 1),
            status: 'activo'
        });
        setIsFormOpen(true);
    };

    const handleOpenEditForm = (item) => {
        setEditingPlatform(item);
        setFormData({ ...item });
        setIsFormOpen(true);
    };

    const handleSaveForm = (e) => {
        e.preventDefault();
        if (editingPlatform) {
            updatePlatform(editingPlatform.id, formData);
        } else {
            addPlatform(formData);
        }
        setIsFormOpen(false);
    };

    const filteredTablePlatforms = platforms.filter(p => {
        if (!tableSearch) return true;
        const q = tableSearch.toLowerCase();
        return p.platform.toLowerCase().includes(q) ||
            p.subjectArea.toLowerCase().includes(q) ||
            p.section.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q);
    });

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
            <div className="bg-white rounded-3xl w-full max-w-5xl my-8 max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100">

                {/* Modal Header */}
                <div className="p-6 bg-gradient-to-r from-institutional-blue via-blue-900 to-institutional-blue text-white flex justify-between items-center relative">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-institutional-yellow uppercase tracking-widest mb-1">
                            <Globe size={16} /> Publicación Científica & Divulgación
                        </div>
                        <h2 className="text-2xl font-black tracking-tight">¿Dónde publicar este proyecto?</h2>
                        <p className="text-xs opacity-80 mt-1">
                            Proyecto: <span className="font-semibold text-white">{project.titulo}</span> ({topic})
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation Tabs */}
                <div className="flex border-b border-gray-100 bg-gray-50/50 px-6 pt-3 gap-2">
                    <button
                        onClick={() => setActiveTab('recommendations')}
                        className={`px-5 py-3 font-bold text-sm rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${activeTab === 'recommendations'
                                ? 'bg-white text-institutional-blue border-institutional-blue shadow-sm'
                                : 'text-gray-500 hover:text-gray-800 border-transparent'
                            }`}
                    >
                        <Bookmark size={18} />
                        Plataformas Recomendadas
                        <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-institutional-blue">
                            {openAccess.length + specialized.length + alternativeDirectories.length}
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab('config')}
                        className={`px-5 py-3 font-bold text-sm rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${activeTab === 'config'
                                ? 'bg-white text-institutional-blue border-institutional-blue shadow-sm'
                                : 'text-gray-500 hover:text-gray-800 border-transparent'
                            }`}
                    >
                        <Settings size={18} />
                        ⚙️ Tabla de Configuración Editable
                        <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
                            {platforms.length}
                        </span>
                    </button>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">

                    {/* TAB 1: RECOMMENDATIONS VIEW */}
                    {activeTab === 'recommendations' && (
                        <div className="space-y-8">
                            {/* Search Term Bar */}
                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
                                    <Search className="text-institutional-blue" size={20} />
                                    <div className="w-full">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Término / Temática de búsqueda pasados a la plataforma:</label>
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full text-sm font-bold text-gray-800 outline-none border-b border-gray-200 focus:border-institutional-blue py-0.5"
                                            placeholder="Ingresa temática o palabra clave..."
                                        />
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400 italic flex-shrink-0">
                                    Al hacer clic en cualquier plataforma, se abrirá en una nueva pestaña pasando este término.
                                </span>
                            </div>

                            {/* Section 1: Open Access */}
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                                        1. Acceso Abierto (Open Access)
                                    </h3>
                                    <span className="text-xs text-gray-400">Prioridad: DOAJ, SciELO, Redalyc, OpenAlex</span>
                                </div>

                                {openAccess.length === 0 ? (
                                    <div className="p-6 bg-white rounded-2xl text-center text-gray-400 text-sm border border-gray-100">
                                        No hay plataformas de acceso abierto activas configuradas para esta temática.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {openAccess.map((plat) => (
                                            <div key={plat.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-2xl">{plat.logo || '🔓'}</span>
                                                            <h4 className="font-bold text-gray-900 group-hover:text-institutional-blue transition-colors">
                                                                {plat.platform}
                                                            </h4>
                                                        </div>
                                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-green-50 text-green-700 rounded-full border border-green-200">
                                                            Prio #{plat.priority || 1}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 leading-relaxed">
                                                        {plat.description}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => handleOpenPlatformUrl(plat.url, searchQuery)}
                                                    className="w-full py-2.5 px-4 bg-gray-50 hover:bg-institutional-blue text-gray-700 hover:text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border border-gray-200 hover:border-transparent group-hover:shadow-sm"
                                                >
                                                    Buscar en {plat.platform.split('(')[0].trim()}
                                                    <ExternalLink size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* Section 2: Specialized Search Engines */}
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
                                        2. Buscadores Especializados & Indexadoras
                                    </h3>
                                    <span className="text-xs text-gray-400">IEEE Xplore, Springer, Elsevier, PubMed, MDPI, NASA NTRS</span>
                                </div>

                                {specialized.length === 0 ? (
                                    <div className="p-6 bg-white rounded-2xl text-center text-gray-400 text-sm border border-gray-100">
                                        No hay buscadores especializados activos configurados para esta temática.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {specialized.map((plat) => (
                                            <div key={plat.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-2xl">{plat.logo || '⚡'}</span>
                                                            <h4 className="font-bold text-gray-900 group-hover:text-institutional-blue transition-colors">
                                                                {plat.platform}
                                                            </h4>
                                                        </div>
                                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                                                            Prio #{plat.priority || 1}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 leading-relaxed">
                                                        {plat.description}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => handleOpenPlatformUrl(plat.url, searchQuery)}
                                                    className="w-full py-2.5 px-4 bg-gray-50 hover:bg-institutional-blue text-gray-700 hover:text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border border-gray-200 hover:border-transparent group-hover:shadow-sm"
                                                >
                                                    Buscar en {plat.platform.split('(')[0].trim()}
                                                    <ExternalLink size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* Section 3: Alternative Directories */}
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                                        3. Directorios Alternativos de Búsqueda de Publicación
                                    </h3>
                                    <span className="text-xs text-gray-400">Google Scholar, Semantic Scholar, ResearchGate</span>
                                </div>

                                {alternativeDirectories.length === 0 ? (
                                    <div className="p-6 bg-white rounded-2xl text-center text-gray-400 text-sm border border-gray-100">
                                        No hay directorios alternativos activos configurados.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {alternativeDirectories.map((plat) => (
                                            <div key={plat.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-2xl">{plat.logo || '📂'}</span>
                                                            <h4 className="font-bold text-gray-900 group-hover:text-institutional-blue transition-colors">
                                                                {plat.platform}
                                                            </h4>
                                                        </div>
                                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
                                                            Prio #{plat.priority || 1}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 leading-relaxed">
                                                        {plat.description}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => handleOpenPlatformUrl(plat.url, searchQuery)}
                                                    className="w-full py-2.5 px-4 bg-gray-50 hover:bg-institutional-blue text-gray-700 hover:text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border border-gray-200 hover:border-transparent group-hover:shadow-sm"
                                                >
                                                    Buscar en {plat.platform.split('(')[0].trim()}
                                                    <ExternalLink size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        </div>
                    )}

                    {/* TAB 2: EDITABLE CONFIGURATION TABLE VIEW */}
                    {activeTab === 'config' && (
                        <div className="space-y-6">
                            {/* Control Bar */}
                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="relative w-full md:w-72">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Filtrar tabla por área, plataforma o sección..."
                                        value={tableSearch}
                                        onChange={(e) => setTableSearch(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-institutional-blue"
                                    />
                                </div>

                                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                                    <button
                                        onClick={handleOpenAddForm}
                                        className="px-4 py-2 bg-institutional-blue text-white rounded-xl font-bold text-xs hover:bg-blue-900 transition-all flex items-center gap-2 shadow-sm"
                                    >
                                        <Plus size={16} /> Agregar Plataforma
                                    </button>

                                    <button
                                        onClick={() => {
                                            if (window.confirm("¿Deseas restablecer la tabla a la configuración predeterminada?")) {
                                                resetToDefaults();
                                            }
                                        }}
                                        className="px-3 py-2 text-gray-600 hover:text-red-600 bg-gray-100 hover:bg-red-50 rounded-xl font-medium text-xs transition-all flex items-center gap-1.5 border border-gray-200"
                                    >
                                        <RotateCcw size={14} /> Restablecer
                                    </button>
                                </div>
                            </div>

                            {/* Informational banner */}
                            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-900 flex items-center gap-2">
                                <AlertCircle size={16} className="text-institutional-blue flex-shrink-0" />
                                <span>
                                    Los cambios realizados en esta tabla se guardan automáticamente en tu navegador (sin necesidad de modificar el código fuente). Puedes activar, desactivar, agregar o modificar cualquier plataforma.
                                </span>
                            </div>

                            {/* Table */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-gray-50 border-b border-gray-200 font-bold text-gray-600 uppercase tracking-wider">
                                        <tr>
                                            <th className="p-3">Estado</th>
                                            <th className="p-3">Área Temática</th>
                                            <th className="p-3">Sección</th>
                                            <th className="p-3">Plataforma</th>
                                            <th className="p-3">URL / Búsqueda</th>
                                            <th className="p-3">Prio/Orden</th>
                                            <th className="p-3 text-right">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredTablePlatforms.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="p-8 text-center text-gray-400">
                                                    No hay plataformas registradas en la tabla que coincidan con la búsqueda.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredTablePlatforms.map((row) => (
                                                <tr key={row.id} className={`hover:bg-gray-50/80 transition-colors ${row.status === 'inactivo' ? 'opacity-50 bg-gray-50/40' : ''}`}>
                                                    <td className="p-3">
                                                        <button
                                                            onClick={() => togglePlatformStatus(row.id)}
                                                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase transition-all ${row.status === 'activo'
                                                                    ? 'bg-green-100 text-green-800 border border-green-200'
                                                                    : 'bg-gray-200 text-gray-600 border border-gray-300'
                                                                }`}
                                                            title="Haz clic para activar o desactivar"
                                                        >
                                                            <Power size={10} />
                                                            {row.status}
                                                        </button>
                                                    </td>
                                                    <td className="p-3 font-semibold text-gray-900">
                                                        {row.subjectArea}
                                                    </td>
                                                    <td className="p-3">
                                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                                                row.section === 'Acceso Abierto' ? 'bg-green-50 text-green-700'
                                                                : row.section === 'Directorios Alternativos' ? 'bg-purple-50 text-purple-700'
                                                                : 'bg-blue-50 text-blue-700'
                                                            }`}>
                                                            {row.section}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 font-bold text-gray-800 flex items-center gap-1.5">
                                                        <span>{row.logo}</span>
                                                        <span>{row.platform}</span>
                                                    </td>
                                                    <td className="p-3 max-w-xs truncate text-gray-500 font-mono text-[11px]" title={row.url}>
                                                        {row.url}
                                                    </td>
                                                    <td className="p-3 text-gray-600">
                                                        #{row.priority || 1} / Ord:{row.order || 1}
                                                    </td>
                                                    <td className="p-3 text-right">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <button
                                                                onClick={() => handleOpenEditForm(row)}
                                                                className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                                                                title="Editar registro"
                                                            >
                                                                <Edit2 size={14} />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    if (window.confirm(`¿Seguro que deseas eliminar ${row.platform}?`)) {
                                                                        deletePlatform(row.id);
                                                                    }
                                                                }}
                                                                className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                                                title="Eliminar registro"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sub-modal Form for Add / Edit */}
                {isFormOpen && (
                    <div className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-gray-100 space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                <h3 className="text-lg font-bold text-gray-900">
                                    {editingPlatform ? 'Editar Plataforma de Publicación' : 'Agregar Nueva Plataforma'}
                                </h3>
                                <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Área Temática</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.subjectArea}
                                            onChange={(e) => setFormData({ ...formData, subjectArea: e.target.value })}
                                            className="w-full p-2.5 rounded-xl border border-gray-200 font-medium"
                                            placeholder="Ej: SBC-IoT, AIoT, etc."
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Sección</label>
                                        <select
                                            value={formData.section}
                                            onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                            className="w-full p-2.5 rounded-xl border border-gray-200 font-medium"
                                        >
                                            <option value="Acceso Abierto">Acceso Abierto</option>
                                            <option value="Buscadores Especializados">Buscadores Especializados</option>
                                            <option value="Directorios Alternativos">Directorios Alternativos</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div className="col-span-2">
                                        <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Nombre de la Plataforma</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.platform}
                                            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                            className="w-full p-2.5 rounded-xl border border-gray-200 font-bold"
                                            placeholder="Ej: IEEE Xplore, DOAJ"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Logo / Emoji</label>
                                        <input
                                            type="text"
                                            value={formData.logo}
                                            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                                            className="w-full p-2.5 rounded-xl border border-gray-200 text-center font-bold"
                                            placeholder="🔓"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                                        URL de la Plataforma / Búsqueda (usa <code className="text-institutional-blue font-mono">{'{query}'}</code> para insertar búsqueda)
                                    </label>
                                    <input
                                        type="url"
                                        required
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        className="w-full p-2.5 rounded-xl border border-gray-200 font-mono text-[11px]"
                                        placeholder="https://doaj.org/search/articles?q={query}"
                                    />
                                </div>

                                <div>
                                    <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Descripción Breve</label>
                                    <textarea
                                        rows={2}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full p-2.5 rounded-xl border border-gray-200"
                                        placeholder="Descripción de la revista o plataforma..."
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Prioridad (1-5)</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={formData.priority}
                                            onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 1 })}
                                            className="w-full p-2.5 rounded-xl border border-gray-200 font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Orden</label>
                                        <input
                                            type="number"
                                            value={formData.order}
                                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                                            className="w-full p-2.5 rounded-xl border border-gray-200 font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Estado</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full p-2.5 rounded-xl border border-gray-200 font-bold"
                                        >
                                            <option value="activo">Activo</option>
                                            <option value="inactivo">Inactivo</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-2 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsFormOpen(false)}
                                        className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-2.5 bg-institutional-blue text-white font-bold rounded-xl hover:bg-blue-900 shadow-md flex items-center justify-center gap-1"
                                    >
                                        <Check size={16} /> Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default PublishingModal;
