import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { focusables } from '../lib/focusables';
import { nextTrapIndex } from '../lib/project-panel';

const FIELD = 'w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-institutional-blue outline-none transition-all';
const LABEL = 'text-sm font-bold text-gray-700 uppercase tracking-wider';

// «Proponer proyecto»: a modal dialog. The focus goes to the first field and stays inside (Tab / Shift+Tab wrap), Esc
// closes it, the rest of the app is inert while it is open, and on close the focus returns to the button that opened it.
export default function ProposalDialog({ areas, onClose }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const opener = document.activeElement;
        const root = document.getElementById('root');
        root?.setAttribute('inert', '');
        document.body.style.overflow = 'hidden';
        dialogRef.current?.querySelector('input,select,textarea')?.focus();
        return () => {
            root?.removeAttribute('inert');
            document.body.style.overflow = '';
            if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
        };
    }, []);

    const onKeyDown = (event) => {
        const { key, shiftKey } = event;
        if (key === 'Escape') {
            event.preventDefault();
            onClose();
            return;
        }
        if (key !== 'Tab' || !dialogRef.current) return;
        const items = focusables(dialogRef.current);
        const target = nextTrapIndex(items.length, items.indexOf(document.activeElement), shiftKey);
        if (target === null) return;
        event.preventDefault();
        items[target].focus();
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="proposal-dialog-title" onKeyDown={onKeyDown} className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 id="proposal-dialog-title" className="text-2xl font-bold text-gray-900">Proponer proyecto</h2>
                    <button type="button" onClick={onClose} aria-label="Cerrar" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={24} aria-hidden="true" className="text-gray-500" />
                    </button>
                </div>

                <form className="p-6 space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    alert("El envío de propuestas está en implementación. Por ahora tu proyecto no se guarda.");
                    onClose();
                }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="proposal-title" className={LABEL}>Título del Proyecto</label>
                            <input id="proposal-title" required type="text" placeholder="Ej: Monitor de Calidad de Aire" className={FIELD} />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="proposal-area" className={LABEL}>Área / Tecnología</label>
                            <select id="proposal-area" className={FIELD}>
                                {areas.map((a) => (
                                    <option key={a} value={a}>{a}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="proposal-description" className={LABEL}>Breve Descripción</label>
                        <textarea id="proposal-description" required rows="3" placeholder="Describe el problema y la solución..." className={FIELD}></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="proposal-sector" className={LABEL}>Sector</label>
                            <input id="proposal-sector" required type="text" placeholder="Ej: Agroindustria" className={FIELD} />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="proposal-level" className={LABEL}>Nivel</label>
                            <select id="proposal-level" className={FIELD}>
                                <option>Principiante</option>
                                <option>Intermedio</option>
                                <option>Avanzado</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="proposal-duration" className={LABEL}>Duración Est.</label>
                            <input id="proposal-duration" required type="text" placeholder="Ej: 4 meses" className={FIELD} />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-institutional-blue text-white font-bold rounded-xl hover:bg-blue-900 shadow-lg transition-all"
                        >
                            Guardar Proyecto
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body,
    );
}
