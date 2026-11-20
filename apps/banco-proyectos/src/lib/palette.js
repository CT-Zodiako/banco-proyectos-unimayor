/* The color palette of the "meaning" hues, in ONE place (T13 of odd/tasks/mejora-visual.md, user request L15).
   tailwind.config.js turns TONES into the tone classes (.tn-<name>, which set --tn-bg / --tn-fg / --tn-line / --tn-solid)
   and into the :root variables (--tone-<name>-<part>), and BUTTON_HUES into the gradient variables of the two type
   buttons. design/system.md lists the same values, and tests/palette.test.mjs checks every pair of AA_PAIRS.

   One hue = one meaning:
     journals (teal)   Dónde publicar: its button, tab, card header, search badge and the license badge
     events (purple)   Ver eventos: its button, tab, card header, search badge and the Convocatoria / Para asistir badges
     q1..q4            SCImago quartile, best to last: green, indigo, amber, rose (Publindex A1, A2, B, C share it)
     good / fair / low the favorable / middle / unfavorable end of a scale: affinity alta / media / baja, speed
                       rápida / media / lenta, «Sin costo» and «Cumple» (good), «No cumple» (low)
     lang (blue)       the journal accepts Spanish
     review (slate)    the peer-review type
   Each tone is a soft badge: dark text (fg) on a light tint (bg) with a line, and a solid color for graphic marks
   (rings, bars, swatches). The brand stays blue #00428A and yellow #FFC107. Color never carries a meaning alone:
   every tone sits next to its text label, an icon or bars.

   src/index.css holds a generated copy of these values between the palette:begin and palette:end markers (a plain
   copy, so the dev server needs no Tailwind plugin reload). tests/palette.test.mjs fails when the copy is out of date;
   to refresh it: node -e "import('./src/lib/palette.js').then((m) => console.log(m.paletteCss()))" */

const GOOD = { bg: '#DCFCE7', fg: '#14532D', line: '#86EFAC', solid: '#15803D' };
const FAIR = { bg: '#FEF3C7', fg: '#78350F', line: '#FCD34D', solid: '#B45309' };
const LOW = { bg: '#FFE4E6', fg: '#881337', line: '#FDA4AF', solid: '#BE123C' };
const SECOND = { bg: '#E0E7FF', fg: '#312E81', line: '#A5B4FC', solid: '#4F46E5' };

export const TONES = {
    journals: { bg: '#F0FDFA', fg: '#134E4A', line: '#5EEAD4', solid: '#0F766E' },
    events: { bg: '#FAF5FF', fg: '#581C87', line: '#D8B4FE', solid: '#7E22CE' },
    events2: { bg: '#EDE9FE', fg: '#4C1D95', line: '#C4B5FD', solid: '#6D28D9' },
    q1: GOOD,
    q2: SECOND,
    q3: FAIR,
    q4: LOW,
    good: GOOD,
    fair: FAIR,
    low: LOW,
    lang: { bg: '#DBEAFE', fg: '#1E3A8A', line: '#93C5FD', solid: '#1D4ED8' },
    review: { bg: '#F1F5F9', fg: '#334155', line: '#CBD5E1', solid: '#475569' },
};

/* Gradient stops of the two type buttons (top to bottom), their hover stops and the text color on top of them. */
export const BUTTON_HUES = {
    journals: { from: '#0F766E', to: '#115E59', hoverFrom: '#115E59', hoverTo: '#134E4A', text: '#FFFFFF', softText: '#F0FDFA' },
    events: { from: '#7E22CE', to: '#6B21A8', hoverFrom: '#6B21A8', hoverTo: '#581C87', text: '#FFFFFF', softText: '#FAF5FF' },
};

export const WHITE = '#FFFFFF';
export const BRAND = { blue: '#00428A', yellow: '#FFC107', dark: '#0F172A' };

const channel = (value) => {
    const unit = value / 255;
    return unit <= 0.03928 ? unit / 12.92 : ((unit + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex) => {
    const number = parseInt(hex.slice(1), 16);
    return 0.2126 * channel((number >> 16) & 255) + 0.7152 * channel((number >> 8) & 255) + 0.0722 * channel(number & 255);
};

/** WCAG 2.x contrast ratio of two #RRGGBB colors (1 to 21); the order does not matter. */
export function contrastRatio(first, second) {
    const [light, dark] = [luminance(first), luminance(second)].sort((a, b) => b - a);
    return (light + 0.05) / (dark + 0.05);
}

/** "15 118 110" for the css rgb(R G B / alpha) notation (colored shadows). */
export const rgbTriplet = (hex) => [16, 8, 0].map((shift) => (parseInt(hex.slice(1), 16) >> shift) & 255).join(' ');

/* Every text/background pair the page uses, with its minimum (4.5 text, 3 graphic marks). */
const toneNames = Object.keys(TONES);
export const AA_PAIRS = [
    ...toneNames.flatMap((name) => [
        { id: `${name}: text on its tint`, fg: TONES[name].fg, bg: TONES[name].bg, min: 4.5 },
        { id: `${name}: text on white`, fg: TONES[name].fg, bg: WHITE, min: 4.5 },
        { id: `${name}: solid mark on white`, fg: TONES[name].solid, bg: WHITE, min: 3 },
    ]),
    ...Object.entries(BUTTON_HUES).flatMap(([name, hue]) => [
        { id: `${name} button: white on top stop`, fg: hue.text, bg: hue.from, min: 4.5 },
        { id: `${name} button: white on bottom stop`, fg: hue.text, bg: hue.to, min: 4.5 },
        { id: `${name} button hover: white on top stop`, fg: hue.text, bg: hue.hoverFrom, min: 4.5 },
        { id: `${name} button hover: white on bottom stop`, fg: hue.text, bg: hue.hoverTo, min: 4.5 },
        { id: `${name} selected tab: description on the gradient`, fg: hue.softText, bg: hue.from, min: 4.5 },
    ]),
    { id: 'Convocatoria badge: white on filled purple', fg: WHITE, bg: BUTTON_HUES.events.to, min: 4.5 },
    { id: 'journals count pill: white on solid', fg: WHITE, bg: TONES.journals.solid, min: 4.5 },
    { id: 'events count pill: white on solid', fg: WHITE, bg: TONES.events.solid, min: 4.5 },
    { id: 'navbar dot journals on brand blue', fg: TONES.journals.line, bg: BRAND.blue, min: 3 },
    { id: 'navbar dot events on brand blue', fg: TONES.events.line, bg: BRAND.blue, min: 3 },
    { id: 'brand blue text on white', fg: BRAND.blue, bg: WHITE, min: 4.5 },
    { id: 'attention badge: dark text on #FFF8E1', fg: BRAND.dark, bg: '#FFF8E1', min: 4.5 },
];

/** The generated block of src/index.css: :root variables of every tone and button hue, and one .tn-<tone> class per tone
    (it sets --tn-bg, --tn-fg, --tn-line, --tn-solid from the variables). */
export function paletteCss() {
    const variables = [
        ...Object.entries(TONES).flatMap(([name, tone]) => Object.entries(tone).map(([part, value]) => `--tone-${name}-${part}: ${value};`)),
        ...Object.entries(BUTTON_HUES).flatMap(([name, hue]) => [
            `--btn-${name}-from: ${hue.from};`, `--btn-${name}-to: ${hue.to};`,
            `--btn-${name}-hover-from: ${hue.hoverFrom};`, `--btn-${name}-hover-to: ${hue.hoverTo};`,
            `--btn-${name}-soft-text: ${hue.softText};`, `--btn-${name}-glow: ${rgbTriplet(hue.to)};`,
        ]),
    ];
    const classes = Object.keys(TONES).map((name) => `.tn-${name} { --tn-bg: var(--tone-${name}-bg); --tn-fg: var(--tone-${name}-fg); --tn-line: var(--tone-${name}-line); --tn-solid: var(--tone-${name}-solid); }`);
    return [
        '/* palette:begin (generated from src/lib/palette.js: see the note there) */',
        ':root {', ...variables.map((line) => `  ${line}`), '}',
        ...classes,
        '/* palette:end */',
    ].join('\n');
}
