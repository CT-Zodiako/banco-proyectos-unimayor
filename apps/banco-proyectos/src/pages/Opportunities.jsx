import { useId, useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { calendarFile, exportBackup, filterOpportunities, importBackup, MAX_BACKUP_SIZE, previewBackup, readOpportunities, removeOpportunity, STATUS_LABELS, updateOpportunity } from '../lib/opportunities';
import { submissionGuide } from '../lib/submissionGuide';

// Error line: red text and icon on a tint, always with words (role="alert" announces it).
function ErrorNote({ children }) {
    return <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-sem-danger-fg">
        <AlertCircle size={18} aria-hidden="true" className="mt-px flex-none" />{children}
    </p>;
}

function BackupControls({ onImport }) {
    const fileId = useId();
    const [backup, setBackup] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState('');
    const selection = useRef(0);
    function download() {
        try {
            const blob = new Blob([exportBackup(localStorage)], { type: 'application/json;charset=utf-8' });
            const href = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = href;
            anchor.download = 'mis-oportunidades.json';
            anchor.click();
            setTimeout(() => URL.revokeObjectURL(href), 1000);
            setMessage('Respaldo descargado.');
        } catch { setMessage('No se pudo exportar el respaldo. No se modificaron los datos.'); }
    }
    async function selectFile(event) {
        const token = ++selection.current;
        const file = event.target.files[0];
        event.target.value = '';
        setBackup(null); setPreview(null); setMessage('');
        if (!file) return;
        try {
            if (file.size > MAX_BACKUP_SIZE) throw new Error('Archivo demasiado grande');
            const text = await file.text();
            const result = previewBackup(localStorage, text);
            if (token !== selection.current) return;
            setBackup(text); setPreview(result);
        } catch {
            if (token === selection.current) setMessage('No se pudo leer el respaldo. Verifique el archivo. No se modificaron los datos.');
        }
    }
    function confirmImport() {
        try {
            const result = importBackup(localStorage, backup);
            onImport(readOpportunities(localStorage));
            setBackup(null); setPreview(null);
            setMessage(`Importación terminada: ${result.added} agregadas y ${result.duplicates} duplicadas conservadas sin cambios.`);
        } catch { setMessage('No se pudo completar la importación. Revise sus oportunidades antes de volver a intentarlo.'); }
    }
    return <section className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4" aria-labelledby="backup-title">
        <div>
            <h2 id="backup-title" className="text-xl font-bold text-gray-900">Respaldo local</h2>
            <p className="mt-1 text-[13.5px] text-sem-text-2">El archivo contiene sus oportunidades, estados y notas. Guárdelo en un lugar seguro.</p>
        </div>
        <div><button type="button" onClick={download} className="btn btn-primary btn-lg">Exportar respaldo</button></div>
        <div>
            <label htmlFor={fileId} className="field-label">Seleccionar respaldo para importar</label>
            <p id={`${fileId}-hint`} className="field-hint">Archivo .json que descargó antes con «Exportar respaldo». Se muestra una vista previa antes de importar.</p>
            <input id={fileId} aria-describedby={`${fileId}-hint`} type="file" accept="application/json,.json" onChange={selectFile} className="text-sm text-gray-900 file:mr-3 file:cursor-pointer file:rounded-lg file:border file:border-institutional-blue file:bg-white file:px-3.5 file:py-1.5 file:text-[13.5px] file:font-semibold file:text-institutional-blue hover:file:bg-sem-area-bg" />
        </div>
        {preview && <div className="space-y-2"><p className="text-sm text-gray-900">Se agregarán {preview.added} oportunidades; {preview.duplicates} duplicadas no se modificarán. La comparación se volverá a hacer al importar.</p>
            <button type="button" onClick={confirmImport} className="btn btn-primary">Confirmar importación</button></div>}
        <p role="status" className="text-sm text-gray-700">{message}</p>
    </section>;
}

function OpportunityEditor({ item, onSave }) {
    const uid = useId();
    const [status, setStatus] = useState(item.status || 'review');
    const [note, setNote] = useState(item.note || '');
    const [message, setMessage] = useState('');
    function submit(event) {
        event.preventDefault();
        try {
            updateOpportunity(localStorage, item.type, item.id, { status, note });
            onSave(readOpportunities(localStorage));
            setMessage('Cambios guardados en este navegador.');
        } catch { setMessage('No se pudieron guardar los cambios.'); }
    }
    return <form onSubmit={submit} className="grid gap-4 border-t border-gray-200 pt-4">
        <div>
            <label htmlFor={`${uid}-status`} className="field-label">Estado</label>
            <p id={`${uid}-status-hint`} className="field-hint">En qué punto va esta oportunidad.</p>
            <select id={`${uid}-status`} aria-describedby={`${uid}-status-hint`} value={status} onChange={(event) => setStatus(event.target.value)} className="field-select">
                {Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
        </div>
        <div>
            <label htmlFor={`${uid}-note`} className="field-label">Nota personal</label>
            <p id={`${uid}-note-hint`} className="field-hint">Solo se guarda en este navegador.</p>
            <textarea id={`${uid}-note`} aria-describedby={`${uid}-note-hint`} value={note} onChange={(event) => setNote(event.target.value)} rows={2} className="field-textarea" />
        </div>
        <div><button type="submit" className="btn btn-primary">Guardar cambios</button></div>
        <p role="status" className="text-sm text-gray-700">{message}</p>
    </form>;
}

function safeUrl(value) {
    try {
        const url = new URL(value);
        return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
    } catch { return null; }
}

export default function Opportunities() {
    const [items, setItems] = useState(() => {
        try { return readOpportunities(localStorage); } catch { return null; }
    });
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const filterId = useId();
    const visible = items ? filterOpportunities(items, filter) : [];
    function remove(item) {
        try {
            removeOpportunity(localStorage, item.type, item.id);
            setItems(readOpportunities(localStorage));
        } catch { setError('No se pudieron actualizar los favoritos.'); }
    }
    function downloadCalendar(item, field) {
        const content = calendarFile(item, field);
        if (!content) { setError('La fecha no está disponible para el calendario.'); return; }
        const href = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }));
        const anchor = document.createElement('a');
        anchor.href = href;
        anchor.download = `${field === 'deadline' ? 'cierre' : 'evento'}.ics`;
        anchor.click();
        setTimeout(() => URL.revokeObjectURL(href), 1000);
    }
    return <div className="py-10 space-y-6">
        <div><h1 className="text-3xl font-extrabold leading-tight text-gray-900">Mis oportunidades</h1><p className="text-gray-700 mt-2 max-w-3xl">Guardadas solo en este navegador. No se sincronizan entre dispositivos y pueden perderse si se borran los datos del navegador.</p></div>
        {items === null && <ErrorNote>No se pueden leer los favoritos guardados. No se modificaron los datos.</ErrorNote>}
        {error && <ErrorNote>{error}</ErrorNote>}
        <BackupControls onImport={setItems} />
        {items && <div>
            <label htmlFor={filterId} className="field-label">Filtrar por estado</label>
            <p id={`${filterId}-hint`} className="field-hint">Muestra solo las oportunidades con el estado elegido.</p>
            <select id={filterId} aria-describedby={`${filterId}-hint`} value={filter} onChange={(event) => setFilter(event.target.value)} className="field-select">
                <option value="all">Todos</option>
                {Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
        </div>}
        {items && ['event', 'journal'].map((type) => <section key={type} className="space-y-3" aria-labelledby={`opp-${type}`}>
            <h2 id={`opp-${type}`} className="text-xl font-bold text-gray-900">{type === 'event' ? 'Eventos' : 'Revistas'}</h2>
            {!visible.some((item) => item.type === type) && <p className="text-gray-700">{filter === 'all' ? (type === 'event' ? 'Todavía no hay eventos guardados.' : 'Todavía no hay revistas guardadas.') : 'No hay oportunidades con este estado.'}</p>}
            {visible.filter((item) => item.type === type).map((item) => <article key={item.id} className="rounded-2xl border border-gray-200 bg-white p-5 space-y-3">
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    {safeUrl(item.url) && <a className="link-action" href={safeUrl(item.url)} target="_blank" rel="noopener noreferrer">Fuente oficial ↗</a>}
                    {safeUrl(item.instructions) && <a className="link-action" href={safeUrl(item.instructions)} target="_blank" rel="noopener noreferrer">Instrucciones para autores ↗</a>}
                    {type === 'event' && item.start && <button type="button" onClick={() => downloadCalendar(item, 'start')} className="link-action">Agregar evento al calendario</button>}
                    {type === 'event' && item.deadline && <button type="button" onClick={() => downloadCalendar(item, 'deadline')} className="link-action">Agregar cierre al calendario</button>}
                    <button type="button" onClick={() => remove(item)} className="link-action">Quitar</button>
                </div>
                <OpportunityEditor item={item} onSave={setItems} />
                <details className="text-sm text-gray-700"><summary className="cursor-pointer font-semibold text-institutional-blue underline underline-offset-[3px]">Lista de preparación</summary>
                    <p className="mt-2 text-gray-700">Estos pasos son orientativos; confirme los requisitos en la fuente oficial.</p>
                    {(safeUrl(item.instructions) || safeUrl(item.url)) ? <a className="link-action mt-2 inline-block" href={safeUrl(item.instructions) || safeUrl(item.url)} target="_blank" rel="noopener noreferrer">{type === 'journal' && safeUrl(item.instructions) ? 'Consultar instrucciones para autores ↗' : 'Consultar fuente oficial ↗'}</a> : <p className="mt-2 text-gray-700">No hay un enlace oficial disponible.</p>}
                    <ol className="mt-3 space-y-2">
                        {submissionGuide(type).map((step) => <li key={step}><label className="flex items-start gap-2"><input type="checkbox" className="mt-0.5 h-4 w-4 flex-none accent-institutional-blue" />{step}</label></li>)}
                    </ol><p className="mt-2 text-gray-700">Las marcas de esta lista no se guardan.</p>
                </details>
            </article>)}
        </section>)}
    </div>;
}
