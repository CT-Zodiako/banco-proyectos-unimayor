import { m, useReducedMotion } from 'framer-motion';
import { Briefcase, FolderOpen, Layers, Sparkles } from 'lucide-react';

// One color, one meaning (src/index.css): blue = area, gray = sector, yellow = new. Projects are neutral blue (the catalog).
const ITEMS = [
    { key: 'projects', label: 'Proyectos', help: 'Proyectos académicos disponibles en el catálogo.', Icon: FolderOpen, tile: 'border-sem-area-line bg-sem-area-bg text-sem-area-fg' },
    { key: 'areas', label: 'Áreas tecnológicas', help: 'Líneas técnicas distintas, como IoT, redes o robótica.', Icon: Layers, tile: 'border-sem-area-line bg-sem-area-bg text-sem-area-fg' },
    { key: 'sectors', label: 'Sectores de aplicación', help: 'Campos donde se aplican los proyectos.', Icon: Briefcase, tile: 'border-gray-200 bg-sem-sector-bg text-sem-sector-fg' },
    { key: 'newAreas', label: 'Áreas nuevas este semestre', help: 'Áreas con la etiqueta «Nuevo» en el catálogo.', Icon: Sparkles, tile: 'border-institutional-yellow bg-sem-attention-bg text-institutional-dark' },
];

// While the projects are still downloading the figure is a dash (same size, so nothing moves when the number arrives).
const MetricCard = ({ label, help, value, Icon, tile }) => {
    const reduceMotion = useReducedMotion();
    return (
        <m.li
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3.5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
        >
            <span className={`grid h-11 w-11 flex-none place-items-center rounded-xl border ${tile}`} aria-hidden="true">
                <Icon size={22} />
            </span>
            <div className="min-w-0">
                <span data-metric-value className="block text-3xl font-extrabold leading-none text-gray-900 tabular-nums">{value}</span>
                <span data-metric-label className="mt-1.5 block text-[15px] font-bold leading-snug text-gray-900">{label}</span>
                <span data-metric-help className="mt-0.5 block text-[13px] leading-snug text-sem-text-2">{help}</span>
            </div>
        </m.li>
    );
};

// metrics: { projects, areas, sectors, newAreas }, all counted from the project data by the page; null while the data
// has not arrived.
const MetricsSection = ({ metrics }) => (
    <ul aria-label="Cifras del banco" aria-busy={metrics ? undefined : 'true'} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ITEMS.map(({ key, ...item }) => <MetricCard key={key} value={metrics ? metrics[key] : '—'} {...item} />)}
    </ul>
);

export default MetricsSection;
