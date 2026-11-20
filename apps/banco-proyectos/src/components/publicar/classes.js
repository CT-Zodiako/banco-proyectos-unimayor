// Class strings shared by the journal finder components. They map to the shared classes of src/index.css
// (.btn, .field-select, .focus-ring, .badge-*), the same ones /proyectos uses (design: design/mejora-visual/04-componentes.html).
export const FOCUS = 'focus-ring';
// Fit of a journal with the project: green = very good fit, blue = technology, gray = sector (text on a tint, AA).
export const FIT_CLASSES = { fuerte: 'border-green-200 bg-sem-success-bg text-sem-success-fg', tecnologia: 'badge-area', sector: 'badge-sector' };
// Information banner (blue): what the user needs to know before acting; yellow is kept for attention.
export const NOTE = 'rounded-xl border border-sem-area-line bg-sem-area-bg px-4 py-3 text-[13.5px] text-gray-900';
export const INPUT = 'field-select';
export const BTN = 'btn btn-secondary';
export const BTN_PRIMARY = 'btn btn-primary';
export const BTN_SECONDARY = 'btn btn-secondary';
export const DOWNLOAD = 'btn btn-secondary';
export const LINK = 'link-action';
// Palette tones (src/lib/palette.js) as full class names, so Tailwind finds them: one hue = one meaning.
export const TONE_CLASS = {
    journals: 'tn-journals', events: 'tn-events', events2: 'tn-events2', q1: 'tn-q1', q2: 'tn-q2', q3: 'tn-q3', q4: 'tn-q4',
    good: 'tn-good', fair: 'tn-fair', low: 'tn-low', lang: 'tn-lang', review: 'tn-review',
};
// Affinity level (alta / media / baja) on the ring and on the word: green, amber, rose.
export const AFFINITY_CLASS = { high: 'aff-high tn-good', mid: 'aff-mid tn-fair', low: 'aff-low tn-low' };
