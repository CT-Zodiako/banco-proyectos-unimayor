import { useId, useRef, useState } from 'react';
import { ChevronDown, DatabaseBackup, Download, Upload } from 'lucide-react';
import { exportBackup, importBackup, MAX_BACKUP_SIZE, previewBackup, readOpportunities } from '../../lib/opportunities';

// «Respaldo local»: a collapsed panel at the bottom of the page. Export and import keep the exact flow they had: export
// downloads mis-oportunidades.json; import reads the file, shows how many items would be added and waits for the
// confirmation before it writes anything.
export default function BackupPanel({ open, onToggle, summaryRef, onImport }) {
    const titleId = useId();
    const fileId = useId();
    const inputRef = useRef(null);
    const [backup, setBackup] = useState(null);
    const [preview, setPreview] = useState(null);
    const [fileName, setFileName] = useState('');
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
        setBackup(null); setPreview(null); setFileName(''); setMessage('');
        if (!file) return;
        try {
            if (file.size > MAX_BACKUP_SIZE) throw new Error('Archivo demasiado grande');
            const text = await file.text();
            const result = previewBackup(localStorage, text);
            if (token !== selection.current) return;
            setBackup(text); setPreview(result); setFileName(file.name);
        } catch {
            if (token === selection.current) setMessage('No se pudo leer el respaldo. Verifique el archivo. No se modificaron los datos.');
        }
    }
    function confirmImport() {
        try {
            const result = importBackup(localStorage, backup);
            onImport(readOpportunities(localStorage));
            setBackup(null); setPreview(null); setFileName('');
            setMessage(`Importación terminada: ${result.added} agregadas y ${result.duplicates} duplicadas conservadas sin cambios.`);
        } catch { setMessage('No se pudo completar la importación. Revise sus oportunidades antes de volver a intentarlo.'); }
    }

    return <section id="respaldo" aria-labelledby={titleId} className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white shadow-sm">
        <details open={open} onToggle={(event) => onToggle(event.currentTarget.open)} className="opp-backup">
            <summary ref={summaryRef} className="flex min-h-[56px] cursor-pointer list-none items-center gap-3 rounded-2xl px-5 py-3">
                <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-sem-area-bg text-institutional-blue" aria-hidden="true"><DatabaseBackup size={18} /></span>
                <div className="min-w-0 flex-1">
                    <h2 id={titleId} className="m-0 text-xl font-bold text-gray-900">Respaldo local</h2>
                    <span className="block text-[13.5px] text-sem-text-2">Exporte o importe sus oportunidades, estados y notas</span>
                </div>
                <ChevronDown size={20} aria-hidden="true" className="opp-chevron flex-none text-institutional-blue" />
            </summary>
            <div className="space-y-5 border-t border-gray-200 px-5 pb-5 pt-4">
                <p className="m-0 max-w-3xl text-[13.5px] text-sem-text-2">El archivo contiene sus oportunidades, estados y notas. Guárdelo en un lugar seguro. Sus oportunidades viven en el almacenamiento de este navegador: si borra los datos del navegador o usa otro equipo, no estarán; un respaldo las conserva.</p>
                <div className="grid gap-6 min-[900px]:grid-cols-2">
                    <div className="space-y-3">
                        <h3 className="m-0 text-[15px] font-bold text-gray-900">1. Exportar</h3>
                        <p className="m-0 text-[13.5px] text-gray-700">Descarga un archivo .json con todo lo que tiene guardado.</p>
                        <button type="button" onClick={download} className="btn btn-primary btn-lg"><Download size={16} aria-hidden="true" />Exportar respaldo</button>
                    </div>
                    <div className="space-y-3">
                        <h3 className="m-0 text-[15px] font-bold text-gray-900">2. Importar</h3>
                        <div>
                            <label htmlFor={fileId} className="field-label">Seleccionar respaldo para importar</label>
                            <p id={`${fileId}-hint`} className="field-hint">Archivo .json que descargó antes con «Exportar respaldo». Se muestra una vista previa antes de importar.</p>
                            <input ref={inputRef} id={fileId} aria-describedby={`${fileId}-hint`} tabIndex={-1} type="file" accept="application/json,.json" onChange={selectFile} className="sr-only" />
                            <div className="flex flex-wrap items-center gap-3">
                                <button type="button" onClick={() => inputRef.current?.click()} className="btn btn-secondary btn-lg"><Upload size={16} aria-hidden="true" />Importar respaldo</button>
                                <span className="min-w-0 break-all text-[13.5px] text-gray-700">{fileName ? `Archivo seleccionado: ${fileName}` : 'Ningún archivo seleccionado'}</span>
                            </div>
                        </div>
                        {preview && <div className="space-y-2"><p className="m-0 text-sm text-gray-900">Se agregarán {preview.added} oportunidades; {preview.duplicates} duplicadas no se modificarán. La comparación se volverá a hacer al importar.</p>
                            <button type="button" onClick={confirmImport} className="btn btn-primary">Confirmar importación</button></div>}
                    </div>
                </div>
                <p role="status" className="m-0 text-sm text-gray-700">{message}</p>
            </div>
        </details>
    </section>;
}
