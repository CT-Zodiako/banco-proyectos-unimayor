import { useId, useState } from 'react';
import { BookOpen, CalendarDays, ChevronDown, ExternalLink, ListChecks, StickyNote } from 'lucide-react';
import { STATUS_LABELS } from '../../lib/opportunities';
import { formatDmy } from '../../lib/eventos/dates';
import { STATUS_KEYS, STATUS_TONES, itemKey, itemStatus, noteExcerpt, siteName } from '../../lib/opportunitiesView';
import { submissionGuide } from '../../lib/submissionGuide';

function safeUrl(value) {
    try {
        const url = new URL(value);
        return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
    } catch { return null; }
}

// One line under the title: the dates of an event (and its closing date) or the site of a journal. The saved data holds
// nothing else (no place, country or quartile), and the storage shape does not change.
function metaLine(item) {
    if (item.type === 'journal') return siteName(item.url) || 'Sin enlace oficial';
    const start = formatDmy(item.start);
    const end = formatDmy(item.end);
    const dates = start && end && end !== start ? `${start} – ${end}` : start || end;
    const closing = formatDmy(item.deadline);
    return [dates, closing && `Cierre ${closing}`].filter(Boolean).join(' · ') || 'Sin fechas guardadas';
}

const Title = ({ children }) => <span className="sr-only"> de {children}</span>;

// Compact card of one saved opportunity: type and status badges, title, one meta line, source buttons, the status select
// (saved as soon as it changes), a «Nota» disclosure and the preparation checklist. Every control name carries the title.
export default function OpportunityCard({ item, draft, onDraft, onStatus, onNote, onRemove, onCalendar, registerStatus }) {
    const uid = useId();
    const key = itemKey(item);
    const isEvent = item.type === 'event';
    const status = itemStatus(item);
    const url = safeUrl(item.url);
    const instructions = safeUrl(item.instructions);
    const excerpt = noteExcerpt(item.note);
    const [message, setMessage] = useState('');
    // A card that moves to another board column is mounted again: a note being typed keeps the disclosure open.
    const [noteOpen] = useState(draft !== undefined);
    const TypeIcon = isEvent ? CalendarDays : BookOpen;

    function submitNote(event) {
        event.preventDefault();
        setMessage(onNote(item, draft ?? item.note ?? '') ? 'Cambios guardados en este navegador.' : 'No se pudieron guardar los cambios.');
    }

    return <article aria-labelledby={`${uid}-title`} className={`hue-card ${isEvent ? 'tn-events' : 'tn-journals'} flex min-w-0 flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm`}>
        <div className="flex flex-wrap items-center gap-1.5">
            <span className={`badge badge-tone ${isEvent ? 'tn-events' : 'tn-journals'}`}><TypeIcon size={13} aria-hidden="true" />{isEvent ? 'Evento' : 'Revista'}</span>
            <span className={`badge badge-tone tn-${STATUS_TONES[status]}`}><span className="opp-dot" aria-hidden="true" />{STATUS_LABELS[status]}</span>
        </div>
        <div className="min-w-0">
            <h4 id={`${uid}-title`} className="m-0 break-words text-[16px] font-bold leading-snug text-gray-900">{item.title}</h4>
            <p data-opp-meta className="m-0 mt-1 break-words text-[13.5px] text-gray-700">{metaLine(item)}</p>
        </div>
        {(url || instructions || (isEvent && (item.start || item.deadline))) && <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
            {url && <a className={`btn ${isEvent ? 'btn-events' : 'btn-journals'}`} href={url} target="_blank" rel="noopener noreferrer">
                Fuente oficial<ExternalLink size={14} aria-hidden="true" /><Title>{item.title} (se abre en otra pestaña)</Title>
            </a>}
            {instructions && <a className="btn btn-secondary" href={instructions} target="_blank" rel="noopener noreferrer">
                Instrucciones para autores<ExternalLink size={14} aria-hidden="true" /><Title>{item.title} (se abre en otra pestaña)</Title>
            </a>}
            {isEvent && item.start && <button type="button" onClick={() => onCalendar(item, 'start')} className="link-action">Agregar evento al calendario<Title>{item.title}</Title></button>}
            {isEvent && item.deadline && <button type="button" onClick={() => onCalendar(item, 'deadline')} className="link-action">Agregar cierre al calendario<Title>{item.title}</Title></button>}
        </div>}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-gray-200 pt-3">
            <div className="flex items-center gap-2">
                <label htmlFor={`${uid}-status`} className="text-[13px] font-bold text-gray-900">Estado<Title>{item.title}</Title></label>
                <select id={`${uid}-status`} ref={(element) => registerStatus(key, element)} value={status} onChange={(event) => onStatus(item, event.target.value)} className="field-select !h-9 text-[13.5px]">
                    {STATUS_KEYS.map((value) => <option key={value} value={value}>{STATUS_LABELS[value]}</option>)}
                </select>
            </div>
            <button type="button" onClick={() => onRemove(item)} className="link-action opp-remove">Quitar<span className="sr-only"> {item.title} de mis oportunidades</span></button>
        </div>
        <details data-opp-note open={noteOpen} className="opp-details">
            <summary data-opp-note-summary>
                <StickyNote size={15} aria-hidden="true" className="flex-none text-institutional-blue" />
                <span className="font-bold text-gray-900">Nota</span><Title>{item.title}</Title>
                {excerpt && <><span data-opp-note-dot className="opp-note-dot" aria-hidden="true" /><span data-opp-note-preview className="min-w-0 flex-1 truncate font-normal text-gray-700">{excerpt}</span></>}
                <ChevronDown size={16} aria-hidden="true" className="opp-chevron ml-auto flex-none text-institutional-blue" />
            </summary>
            <form onSubmit={submitNote} className="grid gap-2 pt-2">
                <div>
                    <label htmlFor={`${uid}-note`} className="field-label text-[13px]">Nota personal<Title>{item.title}</Title></label>
                    <p id={`${uid}-note-hint`} className="field-hint">Solo se guarda en este navegador.</p>
                    <textarea id={`${uid}-note`} aria-describedby={`${uid}-note-hint`} value={draft ?? item.note ?? ''} onChange={(event) => { setMessage(''); onDraft(key, event.target.value); }} rows={3} className="field-textarea" />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button type="submit" aria-label={`Guardar nota: ${item.title}`} className="btn btn-primary">Guardar nota</button>
                    <p aria-live="polite" className="m-0 flex items-center gap-1.5 text-[13px] text-gray-700">{message}</p>
                </div>
            </form>
        </details>
        <details className="opp-details">
            <summary>
                <ListChecks size={15} aria-hidden="true" className="flex-none text-institutional-blue" />
                <span className="font-bold text-gray-900">Lista de preparación</span><Title>{item.title}</Title>
                <ChevronDown size={16} aria-hidden="true" className="opp-chevron ml-auto flex-none text-institutional-blue" />
            </summary>
            <div className="pt-2 text-sm text-gray-700">
                <p className="m-0">Estos pasos son orientativos; confirme los requisitos en la fuente oficial.</p>
                {(instructions || url)
                    ? <a className="link-action mt-1 inline-block" href={instructions || url} target="_blank" rel="noopener noreferrer">{!isEvent && instructions ? 'Consultar instrucciones para autores ↗' : 'Consultar fuente oficial ↗'}<Title>{item.title}</Title></a>
                    : <p className="m-0 mt-2">No hay un enlace oficial disponible.</p>}
                <ol aria-label={`Pasos de preparación de ${item.title}`} className="m-0 mt-3 space-y-2 pl-0 list-none">
                    {submissionGuide(item.type).map((step) => <li key={step}><label className="flex items-start gap-2"><input type="checkbox" className="mt-0.5 h-4 w-4 flex-none accent-institutional-blue" />{step}</label></li>)}
                </ol>
                <p className="m-0 mt-2">Las marcas de esta lista no se guardan.</p>
            </div>
        </details>
    </article>;
}
