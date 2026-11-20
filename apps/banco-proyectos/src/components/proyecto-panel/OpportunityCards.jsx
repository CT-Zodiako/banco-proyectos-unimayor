import { BookOpen, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { panelFullUrl } from '../../lib/project-panel';

const CARDS = [
    {
        tab: 'revistas',
        tone: 'tn-journals',
        button: 'btn btn-journals',
        title: 'Dónde publicar',
        Icon: BookOpen,
        text: 'Revistas de acceso abierto sin cobro a autores, ordenadas por su afinidad con este proyecto, con filtros y comparación. Datos de DOAJ y SCImago.',
        open: 'Ver las revistas aquí',
        full: 'Abrir página completa de revistas ↗',
    },
    {
        tab: 'eventos',
        tone: 'tn-events',
        button: 'btn btn-events',
        title: 'A qué eventos ir',
        Icon: CalendarDays,
        text: 'Congresos con convocatoria para presentar el proyecto y eventos para asistir, ordenados por afinidad. Confirme fechas y sede en el sitio oficial.',
        open: 'Ver los eventos aquí',
        full: 'Abrir página completa de eventos ↗',
    },
];

// Summary of the two finders on the project page, with the buttons that open the slide-over panel. The links to the
// full pages stay available beside each button.
export default function OpportunityCards({ projectId, openTab, onOpen }) {
    return (
        <div role="group" aria-label="Oportunidades para este proyecto" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CARDS.map(({ tab, tone, button, title, Icon, text, open, full }) => (
                <section key={tab} aria-labelledby={`opp-${tab}`} className={`${tone} hue-card bg-white border border-gray-100 rounded-2xl shadow-sm px-5 py-[18px] grid gap-2.5 content-start`}>
                    <h2 id={`opp-${tab}`} className="m-0 flex items-center gap-2.5 text-[17px] font-bold text-gray-900">
                        <span className="type-chip grid h-9 w-9 flex-none place-items-center rounded-full" aria-hidden="true"><Icon size={18} /></span>
                        {title}
                    </h2>
                    <p className="m-0 text-sm text-gray-700">{text}</p>
                    <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
                        <button
                            type="button"
                            data-panel-trigger={tab}
                            aria-haspopup="dialog"
                            aria-expanded={openTab === tab}
                            onClick={(event) => onOpen(tab, event.currentTarget)}
                            className={button}
                        >
                            <span className="type-ico" aria-hidden="true"><Icon size={14} /></span>
                            {open}
                        </button>
                        <Link to={panelFullUrl(tab, projectId)} className="link-action">{full}</Link>
                    </div>
                </section>
            ))}
        </div>
    );
}
