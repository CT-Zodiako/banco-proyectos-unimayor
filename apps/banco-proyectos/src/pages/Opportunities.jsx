import { useRef, useState } from 'react';
import { calendarFile, exportBackup, filterOpportunities, importBackup, MAX_BACKUP_SIZE, previewBackup, readOpportunities, removeOpportunity, STATUS_LABELS, updateOpportunity } from '../lib/opportunities';
import { submissionGuide } from '../lib/submissionGuide';

function BackupControls({ onImport }) {
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
    return <section className="rounded-2xl border border-gray-200 bg-white p-5 space-y-3" aria-labelledby="backup-title">
        <h2 id="backup-title" className="text-xl font-bold">Respaldo local</h2>
        <p className="text-sm text-gray-600">El archivo contiene sus oportunidades, estados y notas. Guárdelo en un lugar seguro.</p>
        <button type="button" onClick={download} className="btn-primary">Exportar respaldo</button>
        <label className="grid gap-2 text-sm font-semibold">Seleccionar respaldo para importar
            <input type="file" accept="application/json,.json" onChange={selectFile} className="font-normal" />
        </label>
        {preview && <div className="space-y-2"><p>Se agregarán {preview.added} oportunidades; {preview.duplicates} duplicadas no se modificarán. La comparación se volverá a hacer al importar.</p>
            <button type="button" onClick={confirmImport} className="btn-primary">Confirmar importación</button></div>}
        <p role="status" className="text-sm text-gray-600">{message}</p>
    </section>;
}

function OpportunityEditor({ item, onSave }) {
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
    return <form onSubmit={submit} className="grid gap-3 border-t border-gray-100 pt-4">
        <label className="grid gap-1 text-sm font-semibold">Estado
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-lg border border-gray-200 p-2 font-normal">
                {Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
        </label>
        <label className="grid gap-1 text-sm font-semibold">Nota personal
            <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={2} className="rounded-lg border border-gray-200 p-2 font-normal" />
        </label>
        <div><button type="submit" className="btn-primary">Guardar cambios</button></div>
        <p role="status" className="text-sm text-gray-600">{message}</p>
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
        <div><h1 className="text-3xl font-bold">Mis oportunidades</h1><p className="text-gray-600 mt-2">Guardadas solo en este navegador. No se sincronizan entre dispositivos y pueden perderse si se borran los datos del navegador.</p></div>
        {items === null && <p role="alert">No se pueden leer los favoritos guardados. No se modificaron los datos.</p>}
        {error && <p role="alert">{error}</p>}
        <BackupControls onImport={setItems} />
        {items && <label className="flex flex-wrap items-center gap-3 text-sm font-semibold">Filtrar por estado
            <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-lg border border-gray-200 bg-white p-2 font-normal">
                <option value="all">Todos</option>
                {Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
        </label>}
        {items && ['event', 'journal'].map((type) => <section key={type} className="space-y-3">
            <h2 className="text-xl font-bold">{type === 'event' ? 'Eventos' : 'Revistas'}</h2>
            {!visible.some((item) => item.type === type) && <p className="text-gray-600">{filter === 'all' ? (type === 'event' ? 'Todavía no hay eventos guardados.' : 'Todavía no hay revistas guardadas.') : 'No hay oportunidades con este estado.'}</p>}
            {visible.filter((item) => item.type === type).map((item) => <article key={item.id} className="rounded-2xl border border-gray-200 bg-white p-5 space-y-3">
                <h3 className="font-bold">{item.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm">
                    {safeUrl(item.url) && <a className="text-institutional-blue underline" href={safeUrl(item.url)} target="_blank" rel="noopener noreferrer">Fuente oficial ↗</a>}
                    {safeUrl(item.instructions) && <a className="text-institutional-blue underline" href={safeUrl(item.instructions)} target="_blank" rel="noopener noreferrer">Instrucciones para autores ↗</a>}
                    {type === 'event' && item.start && <button type="button" onClick={() => downloadCalendar(item, 'start')} className="text-institutional-blue underline">Agregar evento al calendario</button>}
                    {type === 'event' && item.deadline && <button type="button" onClick={() => downloadCalendar(item, 'deadline')} className="text-institutional-blue underline">Agregar cierre al calendario</button>}
                    <button type="button" onClick={() => remove(item)} className="text-institutional-blue underline">Quitar</button>
                </div>
                <OpportunityEditor item={item} onSave={setItems} />
                <details className="text-sm text-gray-700"><summary className="cursor-pointer font-semibold text-institutional-blue">Lista de preparación</summary>
                    <p className="mt-2 text-gray-600">Estos pasos son orientativos; confirme los requisitos en la fuente oficial.</p>
                    {(safeUrl(item.instructions) || safeUrl(item.url)) ? <a className="mt-2 inline-block text-institutional-blue underline" href={safeUrl(item.instructions) || safeUrl(item.url)} target="_blank" rel="noopener noreferrer">{type === 'journal' && safeUrl(item.instructions) ? 'Consultar instrucciones para autores ↗' : 'Consultar fuente oficial ↗'}</a> : <p className="mt-2 text-gray-600">No hay un enlace oficial disponible.</p>}
                    <ol className="mt-3 space-y-2">
                        {submissionGuide(type).map((step) => <li key={step}><label className="flex gap-2"><input type="checkbox" />{step}</label></li>)}
                    </ol><p className="mt-2 text-gray-600">Las marcas de esta lista no se guardan.</p>
                </details>
            </article>)}
        </section>)}
    </div>;
}
