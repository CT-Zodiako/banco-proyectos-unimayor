import { Fragment, useEffect, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';
import { BTN_SECONDARY, FOCUS } from './classes';
import { numberOrNull, toggled } from '../../lib/publicar/display';
import { PRESETS, applyPreset, makePreset } from '../../lib/publicar/table';

// The quartile chips wear the hue of their quartile (a small swatch always, the tint when pressed); the text and the check stay.
const QUARTILE_PILLS = [['Q1', 'Q1 · A1', 'chip-tone tn-q1'], ['Q2', 'Q2 · A2', 'chip-tone tn-q2'], ['Q3', 'Q3 · B', 'chip-tone tn-q3'], ['Q4', 'Q4 · C', 'chip-tone tn-q4']];
const FIT_PILLS = [['fuerte', 'Sector + tecnología'], ['tecnologia', 'Solo tecnología']];
const SMALL_INPUT = 'w-full h-10 px-2.5 text-[13px] border border-sem-control-line rounded-xl bg-white text-gray-900 placeholder:text-sem-text-2 placeholder:opacity-100';
const CHECK = 'flex min-h-[32px] items-center gap-2 py-[3px] text-[13.5px] text-gray-700 cursor-pointer';
const CHECKBOX = `w-[18px] h-[18px] accent-institutional-blue ${FOCUS}`;

// A filter group: bold title, then one line that says what it does.
const Group = ({ legend, hint, children }) => (
    <fieldset className="border-0 border-t border-gray-200 m-0 py-3 min-w-0">
        <legend className="float-left w-full p-0 text-[14.5px] font-bold text-gray-900">{legend}</legend>
        <p className="field-hint clear-both">{hint}</p>
        <div>{children}</div>
    </fieldset>
);

function Pills({ options, selected, onToggle }) {
    return (
        <div className="flex flex-wrap gap-1.5">
            {options.map(([value, label, tone]) => (
                <button
                    key={value}
                    type="button"
                    aria-pressed={selected.includes(value)}
                    onClick={() => onToggle(value)}
                    className={`chip chip-sm ${tone || ''}`}
                >
                    <Check size={14} aria-hidden="true" className="chip-check flex-none" />
                    {tone && <span className="chip-dot" aria-hidden="true" />}
                    {label}
                </button>
            ))}
        </div>
    );
}

function Range({ id, label, output, ...props }) {
    return (
        <div className="grid grid-cols-[1fr_96px] gap-2.5 items-center">
            <input id={id} type="range" aria-label={label} className={`w-full accent-institutional-blue ${FOCUS}`} {...props} />
            <output htmlFor={id} className="text-[13px] font-bold text-institutional-blue text-right tabular-nums">{output}</output>
        </div>
    );
}

/** Numeric field that keeps what the user types ("0," while writing 0,2) and shows the value again when it changes
    from outside (reset, saved filter). */
function NumberField({ id, label, value, onChange, format, ...props }) {
    const [text, setText] = useState(() => (value === null ? '' : format(value)));
    useEffect(() => {
        if (numberOrNull(text) !== value) setText(value === null ? '' : format(value));
    }, [value]); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <label className="flex flex-col gap-1 text-[12.5px] font-semibold text-gray-700" htmlFor={id}>
            {label}
            <input
                id={id}
                value={text}
                onChange={(event) => { setText(event.target.value); onChange(numberOrNull(event.target.value)); }}
                autoComplete="off"
                className={`${SMALL_INPUT} ${FOCUS}`}
                {...props}
            />
        </label>
    );
}

function Presets({ advanced, userPresets, onApply, onSave, onDelete }) {
    const [formOpen, setFormOpen] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const nameRef = useRef(null);
    const newRef = useRef(null);
    const items = [...PRESETS.map((preset) => ({ preset, own: false })), ...userPresets.map((preset) => ({ preset, own: true }))];

    function submit(event) {
        event.preventDefault();
        try {
            onSave(makePreset(name, advanced));
            setName('');
            setError('');
            setFormOpen(false);
            newRef.current?.focus();
        } catch (failure) {
            setError(failure.message);
        }
    }
    const linkButton = `link-action !min-h-[28px] !py-0.5 !text-[12.5px] ${FOCUS}`;
    return (
        <div className="mt-3 text-[12.5px] text-sem-text-2 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-semibold text-gray-700">Filtros guardados:</span>
            {items.map(({ preset, own }, index) => (
                <Fragment key={`${own ? 'own' : 'built-in'}-${preset.id}`}>
                    <span className="inline-flex items-center gap-[3px]">
                        <button type="button" title="Aplicar este filtro guardado" onClick={() => onApply(preset)} className={linkButton}>{preset.label}</button>
                        {own && (
                            <button type="button" aria-label={`Borrar el filtro guardado ${preset.label}`} onClick={() => onDelete(preset)} className={`grid h-6 w-6 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-sem-text-2 hover:bg-gray-100 ${FOCUS}`}><X size={14} aria-hidden="true" /></button>
                        )}
                    </span>
                    {index < items.length - 1 && '·'}
                </Fragment>
            ))}
            <button
                ref={newRef}
                type="button"
                onClick={() => { setFormOpen((open) => !open); setTimeout(() => nameRef.current?.focus(), 0); }}
                className={linkButton}
            >
                + Guardar actual
            </button>
            {formOpen && (
                <form onSubmit={submit} className="flex flex-wrap gap-1.5 w-full mt-1">
                    <label htmlFor="publicar-preset-name" className="sr-only">Nombre del filtro guardado</label>
                    <input
                        id="publicar-preset-name"
                        ref={nameRef}
                        type="text"
                        maxLength={40}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Nombre, p. ej. Mi grupo"
                        className={`flex-1 min-w-[140px] h-9 px-2.5 text-[13px] border border-sem-control-line rounded-lg ${FOCUS}`}
                    />
                    <button type="submit" className="btn btn-primary !min-h-[36px]">Guardar</button>
                    <span role="alert" className="w-full text-sem-danger-fg">{error}</span>
                </form>
            )}
        </div>
    );
}

// Side panel with every advanced filter at once (all are combined with AND) and the saved filters.
// It holds no filter state: every change goes up through onChange(patch).
// embedded: the project panel shows it as a full-height sheet inside the panel instead of a sticky card, and Escape
// closes only the sheet (the panel stays open).
export default function FiltersPanel({ advanced: a, shown, userPresets, onChange, onReset, onApplyPreset, onSavePreset, onDeletePreset, onClose, onApply, embedded = false }) {
    const closeRef = useRef(null);
    useEffect(() => { closeRef.current?.focus(); }, []);
    const setReview = (kind, checked) => {
        const double = kind === 'double' ? checked : a.reviews.includes('double');
        const single = kind === 'single' ? checked : a.reviews.includes('single') || a.reviews.includes('open');
        onChange({ reviews: [...(double ? ['double'] : []), ...(single ? ['single', 'open'] : [])] });
    };
    return (
        <aside
            id="publicar-adv-panel"
            aria-labelledby="publicar-adv-title"
            onKeyDown={(event) => {
                if (event.key !== 'Escape') return;
                if (embedded) { event.preventDefault(); event.stopPropagation(); }
                onClose();
            }}
            className={embedded ? 'bg-white p-[18px] min-h-full' : 'bg-white border border-gray-200 rounded-2xl shadow-xl p-[18px] min-[1100px]:sticky min-[1100px]:top-4 min-[1100px]:max-h-[calc(100vh-32px)] overflow-y-auto max-[1099px]:order-first'}
        >
            <div className="flex items-center justify-between mb-1">
                <h2 id="publicar-adv-title" className="m-0 text-lg font-extrabold text-gray-900">Filtros personalizados</h2>
                <button ref={closeRef} type="button" aria-label="Cerrar filtros" onClick={onClose} className={`grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 ${FOCUS}`}><X size={16} aria-hidden="true" /></button>
            </div>
            <p className="m-0 mb-2 text-[13px] text-sem-text-2">Combine las variables que necesite; se aplican todas a la vez.</p>

            <Group legend="Afinidad mínima" hint="Oculta las revistas con poco encaje con tu proyecto.">
                <Range id="publicar-adv-affinity" label="Afinidad mínima" min={0} max={100} step={5} value={a.minAffinity}
                    onChange={(event) => onChange({ minAffinity: Number(event.target.value) })} output={a.minAffinity ? `${a.minAffinity} %` : 'Sin mínimo'} />
            </Group>
            <Group legend="Cuartil · Publindex" hint="Q1 es el mejor cuartil; A1 a C es la categoría Publindex equivalente.">
                <Pills options={QUARTILE_PILLS} selected={a.quartiles} onToggle={(value) => onChange({ quartiles: toggled(a.quartiles, value) })} />
            </Group>
            <Group legend="Tiempo máximo a publicación" hint="Semanas típicas entre el envío y la publicación.">
                <Range id="publicar-adv-weeks" label="Semanas máximas" min={4} max={52} step={2} value={a.maxWeeks ?? 52}
                    onChange={(event) => onChange({ maxWeeks: Number(event.target.value) >= 52 ? null : Number(event.target.value) })} output={a.maxWeeks === null ? 'Sin límite' : `${a.maxWeeks} semanas`} />
            </Group>
            <Group legend="Idioma y región" hint="Idioma en que puedes enviar y país de la revista.">
                <div className="grid grid-cols-2 gap-2">
                    <select aria-label="Idioma de envío" value={a.language} onChange={(event) => onChange({ language: event.target.value })} className={`${SMALL_INPUT} ${FOCUS}`}>
                        <option value="any">Cualquier idioma</option>
                        <option value="Spanish">Español</option>
                        <option value="English">Inglés</option>
                        <option value="Portuguese">Portugués</option>
                    </select>
                    <select aria-label="Región de la revista" value={a.region} onChange={(event) => onChange({ region: event.target.value })} className={`${SMALL_INPUT} ${FOCUS}`}>
                        <option value="all">Todas las regiones</option>
                        <option value="iberoamerica">Iberoamérica</option>
                        <option value="colombia">Colombia</option>
                    </select>
                </div>
            </Group>
            <Group legend="Calidad e impacto" hint="Valores mínimos de SJR e índice H.">
                <div className="grid grid-cols-2 gap-2">
                    <NumberField id="publicar-adv-sjr" label="SJR mínimo" value={a.minSjr} format={(value) => value.toLocaleString('es-CO')}
                        onChange={(minSjr) => onChange({ minSjr })} type="text" inputMode="decimal" placeholder="Ej.: 0,20" />
                    <NumberField id="publicar-adv-h" label="Índice H mínimo" value={a.minH} format={String}
                        onChange={(minH) => onChange({ minH })} type="number" min="0" step="1" inputMode="numeric" placeholder="Ej.: 10" />
                </div>
            </Group>
            <Group legend="Proceso editorial" hint="Tipo de revisión por pares y licencia de uso.">
                <label className={CHECK}><input type="checkbox" className={CHECKBOX} checked={a.reviews.includes('double')} onChange={(event) => setReview('double', event.target.checked)} /> Revisión doble ciego</label>
                <label className={CHECK}><input type="checkbox" className={CHECKBOX} checked={a.reviews.includes('single') || a.reviews.includes('open')} onChange={(event) => setReview('single', event.target.checked)} /> Revisión simple ciego o abierta</label>
                <label className={CHECK}><input type="checkbox" className={CHECKBOX} checked={a.ccBy} onChange={(event) => onChange({ ccBy: event.target.checked })} /> Solo licencia CC BY</label>
            </Group>
            <Group legend="Encaje" hint="Qué tanto coincide la revista con el sector y la tecnología del proyecto.">
                <Pills options={FIT_PILLS} selected={a.fits} onToggle={(value) => onChange({ fits: toggled(a.fits, value) })} />
            </Group>

            <div className="flex gap-2 mt-3">
                <button type="button" onClick={onReset} className={`${BTN_SECONDARY} flex-1`}>Restablecer</button>
                <button type="button" onClick={onApply} className="btn btn-primary flex-1 !whitespace-normal">
                    Ver {shown} revista{shown === 1 ? '' : 's'}
                </button>
            </div>
            <Presets advanced={a} userPresets={userPresets} onApply={(preset) => onApplyPreset(applyPreset(preset))} onSave={onSavePreset} onDelete={onDeletePreset} />
        </aside>
    );
}
