import { useEffect, useRef, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { formatDmy, maskDmyInput, parseDmy } from '../../lib/eventos/dates';

export const DATE_ERROR = 'Fecha no válida. Usa dd/mm/aaaa.';

// Browsers that can open the native picker from a button (HTMLInputElement.showPicker). Without it the button is not shown.
const canShowPicker = () => typeof HTMLInputElement !== 'undefined' && typeof HTMLInputElement.prototype.showPicker === 'function';

/** Spanish date field: the visitor types dd/mm/aaaa (slashes are added while typing) and the state keeps the ISO
    "YYYY-MM-DD" value. `value` is that ISO string ('' = no filter) and onChange(iso) is only called with a complete,
    real date or ''. An invalid text is reported inline on blur/Enter and never reaches the state. The «Calendario»
    button opens the browser's native date picker through a visually hidden <input type="date" lang="es">. */
const DateField = ({ id, label, value, onChange, describedBy = '' }) => {
    const [text, setText] = useState(() => formatDmy(value));
    const [invalid, setInvalid] = useState(false);
    const [pickable] = useState(canShowPicker);
    const pickerRef = useRef(null);
    const errorId = `${id}-error`;

    // The value changed from outside (URL, a removed chip, «Limpiar filtros»): show it unless the text already means it.
    const textRef = useRef(text);
    textRef.current = text;
    useEffect(() => {
        const current = textRef.current;
        if (current === '' ? value === '' : parseDmy(current) === value) return;
        setText(formatDmy(value));
        setInvalid(false);
    }, [value]);

    const commit = (iso) => { if (iso !== value) onChange(iso); };

    const handleChange = (event) => {
        const masked = maskDmyInput(event.target.value);
        setText(masked);
        setInvalid(false);
        if (masked === '') commit('');
        else {
            const iso = parseDmy(masked);
            if (iso) commit(iso);
        }
    };

    const validate = () => {
        if (text === '') return setInvalid(false);
        const iso = parseDmy(text);
        if (!iso) return setInvalid(true);
        setInvalid(false);
        setText(formatDmy(iso));
        return commit(iso);
    };

    const handlePick = (event) => {
        const iso = event.target.value;
        setText(formatDmy(iso));
        setInvalid(false);
        commit(iso);
    };

    const openPicker = () => {
        try { pickerRef.current?.showPicker(); } catch { /* the browser refused to open it: the text field still works */ }
    };

    return (
        <div className="min-w-0">
            <label htmlFor={id} className="field-label mb-1 !text-[13.5px]">{label}</label>
            <div className="relative flex flex-wrap items-center gap-2">
                <input
                    id={id}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={10}
                    placeholder="dd/mm/aaaa"
                    value={text}
                    onChange={handleChange}
                    onBlur={validate}
                    onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); validate(); } }}
                    aria-invalid={invalid ? 'true' : undefined}
                    aria-describedby={[describedBy, invalid ? errorId : ''].filter(Boolean).join(' ') || undefined}
                    className="field-input !h-10 !w-auto min-w-[7.5rem] flex-1 !px-3"
                />
                {pickable && (
                    <>
                        <button type="button" onClick={openPicker} aria-label={`Calendario: elegir ${label}`} className="btn btn-secondary focus-ring !min-h-[40px] flex-none !px-2.5">
                            <CalendarDays size={15} aria-hidden="true" />
                            Calendario
                        </button>
                        <input
                            ref={pickerRef}
                            type="date"
                            lang="es"
                            tabIndex={-1}
                            aria-hidden="true"
                            value={value}
                            onChange={handlePick}
                            className="sr-only left-0 top-full"
                        />
                    </>
                )}
            </div>
            {invalid && <p id={errorId} role="alert" className="field-error">{DATE_ERROR}</p>}
        </div>
    );
};

export default DateField;
