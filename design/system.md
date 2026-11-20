# Design system — Banco de Proyectos UNIMAYOR

Captured from the project sources (read only). Primary app: `apps/banco-proyectos`.
Updated after the visual refinement (`odd/tasks/mejora-visual.md`, T2-T4, direction `design/mejora-visual/01-refinado-fiel.html`):
same identity (institutional blue, yellow, Inter, white cards), one meaning per color, shared component classes in
`apps/banco-proyectos/src/index.css` instead of per-page class strings.
Updated again for T13 (user request L15: «los botones de dónde publicar y ver eventos con color, y la información relevante con un color — Q1 uno, Q2 otro»): the earlier neutral quartile and single-blue affinity ring were deliberately reversed, see «Meaning hues» below.
Tailwind v3 default palette values are listed only for the utility classes the app actually uses
(found by scanning `apps/banco-proyectos/src/**/*.jsx`).

## Colors

### Brand (source: `apps/banco-proyectos/tailwind.config.js`, `apps/banco-proyectos/src/index.css`)

| Token | Value | Usage |
|---|---|---|
| `institutional.blue` / `--blue-primary` | `#00428A` | Primary actions, links, active states, area badge text, hero gradient, blue ring of the focus style |
| `institutional.yellow` / `--yellow-accent` | `#FFC107` | New / attention / focus: `.badge-new`, hero button, icons on blue, yellow ring of the focus style |
| `institutional.light` | `#F8FAFC` | Page background |
| `institutional.dark` | `#0F172A` | Footer background, text on yellow and on `--sem-attention-bg`, tooltip background |
| `accent.pink` | `#ED64A6` | Defined in `tailwind.config.js`, not used by any page |
| `accent.green` | `#48BB78` | Defined in `tailwind.config.js`, not used by any page |
| `accent.orange` | `#ED8936` | Defined in `tailwind.config.js`, not used by any page |

### Semantic tokens (source: `apps/banco-proyectos/src/index.css` `:root`, exposed as `sem-*` colors in `apps/banco-proyectos/tailwind.config.js`)

| Token | Value | Usage |
|---|---|---|
| `--sem-area-bg` / `sem-area-bg` | `#EFF6FF` | Area badge, hover of secondary buttons and chips, info banners, icon tiles (blue-50) |
| `--sem-area-fg` / `sem-area-fg` | `#00428A` | Area badge text, icon on `--sem-area-bg` |
| `--sem-area-line` / `sem-area-line` | `#DBEAFE` | Border of area badges, filter chips and info banners (blue-100) |
| `--sem-sector-bg` / `sem-sector-bg` | `#F3F4F6` | Sector badge, neutral metadata tiles (gray-100) |
| `--sem-sector-fg` / `sem-sector-fg` | `#374151` | Sector badge text (gray-700) |
| `--sem-level-bg` / `sem-level-bg` | `#FFF7ED` | Level badge background (orange-50) |
| `--sem-level-fg` / `sem-level-fg` | `#111827` | Level badge text (gray-900) |
| `--sem-level-dot` / `sem-level-dot` | `#C2410C` | Filled level dots (orange-700) |
| `--sem-attention-bg` / `sem-attention-bg` | `#FFF8E1` | `.badge-attn`, attention tiles; dark text on top |
| `--sem-control-line` / `sem-control-line` | `#6B7280` | Border of fields, chips, segmented controls and empty level dots (gray-500) |
| `--sem-text-2` / `sem-text-2` | `#4B5563` | Minimum color of secondary text, helper lines and placeholders (gray-600) |
| `--sem-success-bg` / `sem-success-bg` | `#F0FDF4` | Success tint (green-50) |
| `--sem-success-fg` / `sem-success-fg` | `#15803D` | Success text, data-status dot, strong journal fit (green-700) |
| `--sem-danger-fg` / `sem-danger-fg` | `#B91C1C` | Error text on `bg-red-50` (red-700) |
| `--sem-blue-hover` | `#1E40AF` | Hover of primary actions (blue-800), defined in `:root` |
| `--sem-blue-soft` | `#DBEAFE` | Soft blue (blue-100), defined in `:root` |

### Meaning hues (T13; source: `apps/banco-proyectos/src/lib/palette.js`)

One JS file holds every hex value of the hues that carry a meaning, the button gradients, the contrast helper (`contrastRatio`) and the list of every pair that must reach AA (`AA_PAIRS`). `src/index.css` holds a generated copy between `/* palette:begin */` and `/* palette:end */` (the `--tone-<name>-<part>` and `--btn-<name>-*` variables and one `.tn-<name>` class per tone, which sets `--tn-bg`, `--tn-fg`, `--tn-line`, `--tn-solid`); `tests/palette.test.mjs` fails when that copy is out of date and when any pair is below its minimum. `tailwind.config.js` exposes the tones as utilities (`bg-tone-q1-bg`, `text-tone-q1-fg`, `border-tone-q1-line`, `bg-tone-q1-solid`) that read the same variables. A tone is a soft badge: dark text (`fg`) on a light tint (`bg`) with a `line` border, plus a `solid` color for graphic marks (rings, bars, swatches, quartile chips). Refresh the CSS copy with `node -e "import('./src/lib/palette.js').then((m) => console.log(m.paletteCss()))"` in `apps/banco-proyectos`.

| Tone class | Means | bg (tint) | fg (text) | line | solid (marks) | fg on bg | fg on white | solid on white |
|---|---|---|---|---|---|---|---|---|
| `.tn-journals` | «Dónde publicar»: button, tab, card header, search badge, and the license badge (CC BY) | `#F0FDFA` | `#134E4A` | `#5EEAD4` | `#0F766E` | 9.09:1 | 9.48:1 | 5.47:1 |
| `.tn-events` | «Ver eventos»: button, tab, card header, search badge | `#FAF5FF` | `#581C87` | `#D8B4FE` | `#7E22CE` | 10.14:1 | 10.88:1 | 6.98:1 |
| `.tn-events2` | «Para asistir» badge (light tint of the same purple; «Convocatoria» is the filled purple) | `#EDE9FE` | `#4C1D95` | `#C4B5FD` | `#6D28D9` | 9.23:1 | 10.95:1 | 7.10:1 |
| `.tn-q1` | Quartile Q1 · Publindex A1 (best) | `#DCFCE7` | `#14532D` | `#86EFAC` | `#15803D` | 8.30:1 | 9.11:1 | 5.02:1 |
| `.tn-q2` | Quartile Q2 · Publindex A2 | `#E0E7FF` | `#312E81` | `#A5B4FC` | `#4F46E5` | 9.27:1 | 11.42:1 | 6.29:1 |
| `.tn-q3` | Quartile Q3 · Publindex B | `#FEF3C7` | `#78350F` | `#FCD34D` | `#B45309` | 8.15:1 | 9.07:1 | 5.02:1 |
| `.tn-q4` | Quartile Q4 · Publindex C | `#FFE4E6` | `#881337` | `#FDA4AF` | `#BE123C` | 7.97:1 | 9.57:1 | 6.29:1 |
| `.tn-good` | Favorable end of a scale: affinity alta, speed rápida, «Sin costo», «Cumple» | `#DCFCE7` | `#14532D` | `#86EFAC` | `#15803D` | 8.30:1 | 9.11:1 | 5.02:1 |
| `.tn-fair` | Middle of a scale: affinity media, speed media | `#FEF3C7` | `#78350F` | `#FCD34D` | `#B45309` | 8.15:1 | 9.07:1 | 5.02:1 |
| `.tn-low` | Unfavorable end of a scale: affinity baja, speed lenta, «No cumple» | `#FFE4E6` | `#881337` | `#FDA4AF` | `#BE123C` | 7.97:1 | 9.57:1 | 6.29:1 |
| `.tn-lang` | The journal accepts Spanish | `#DBEAFE` | `#1E3A8A` | `#93C5FD` | `#1D4ED8` | 8.49:1 | 10.36:1 | 6.70:1 |
| `.tn-review` | Peer-review type (doble ciego, simple ciego, abierta…) | `#F1F5F9` | `#334155` | `#CBD5E1` | `#475569` | 9.45:1 | 10.35:1 | 7.58:1 |
| `.tn-projects` (T17) | The projects pages, in the brand blue itself: header of «Comparar proyectos» and of «Mis oportunidades», the «Difiere» mark and the tint of a differing row of the comparison table. Not a new color: `bg` is `sem-area-bg`, `fg` and `solid` are `#00428A` | `#EFF6FF` | `#00428A` | `#93C5FD` | `#00428A` | 8.99:1 | 9.78:1 | 9.78:1 |

Type buttons (white text on a vertical gradient, lighter on top; the hover stops are darker):

| Button / tab | Top stop | Bottom stop | Hover top | Hover bottom | White text on each stop (min) | Selected-tab description on top stop |
|---|---|---|---|---|---|---|
| `.btn-journals` / `.tab-pill-journals` | `#0F766E` | `#115E59` | `#115E59` | `#134E4A` | 5.47 / 7.58 / 7.58 / 9.48 | `#F0FDFA` 5.25:1 |
| `.btn-events` / `.tab-pill-events` | `#7E22CE` | `#6B21A8` | `#6B21A8` | `#581C87` | 6.98 / 8.72 / 8.72 / 10.88 | `#FAF5FF` 6.51:1 |

`.btn-journals` and `.btn-events` add an inner highlight (`inset 0 1px 0 rgb(255 255 255 / .3)`), a soft shadow of their own hue (`0 6px 14px -6px` at 55 % of the bottom stop), an icon in a translucent white circle (`.type-ico`), a 1px lift on hover, a pressed (inset) shadow on `:active` and the shared 2px yellow + 2px blue focus ring. «Dónde publicar» is teal because it is the journals tool; «Ver eventos» is purple because it is the events tool; both are far from the blue primary (`#00428A`), from each other, and from the amber used for attention.

Scales (a hue is the same wherever the scale appears):

| Scale | Green (`good` / `q1`) | Amber (`fair` / `q3`) | Rose (`low` / `q4`) | Other |
|---|---|---|---|---|
| Quartile (SCImago · Publindex) | Q1 · A1 | Q3 · B | Q4 · C | Q2 · A2 indigo (`q2`); bars say it too: 4 bars (Q1) to 1 bar (Q4) |
| Affinity (journals 80 / 65, events 80 / 60) | alta | media | baja | ring, number and word share the hue |
| Speed of publication (`weeks_to_publication`) | rápida: 8 weeks or less | media: up to 16 | lenta: more than 16 | thresholds are the first two steps of the time score in `src/lib/publicar/table.js`; no badge when the journal has no weeks |
| Requirements | Cumple (✓) | | No cumple (✗) | |

Other soft badges of a journal (at most five per result, one tidy row, each with an icon and a tip): «Sin costo» (`good`; every journal of the data is DOAJ without APC), «Acepta español» (`lang`, only when `languages` has Spanish), review type (`review`, only when specified), «N semanas · rápida/media/lenta» (speed), license (`journals`). A fact the data does not have gives no badge. Publindex (A1, A2, B, C) is derived 1:1 from the quartile, so it shares the quartile hue and sits inside the quartile badge.

Events: «Convocatoria» is the filled purple (`.badge-events`, white on `#6B21A8`), «Para asistir» the light tint of the same hue (`.badge-events-soft`, `.tn-events2`), «cierra hoy / pronto» stays amber (`.badge-attn`), «Ver convocatoria» / «Ver evento» is `.btn-events`.

### Meaning of color (one color, one meaning)

| Color | Means | Where |
|---|---|---|
| Blue (`#00428A`, `#EFF6FF`) | Area and actions: links, primary and secondary buttons, selected chips, info banners | Area badge, `.btn`, `.chip[aria-pressed]`, `.filter-chip`, nav |
| Brand blue tone (`.tn-projects`) | The project bank itself (not a tool): header of «Comparar proyectos» and «Mis oportunidades», «Difiere» mark and tint of a differing row in the comparison table | `PageHeader hue="projects"`, `.cmp-table`, `.badge-tone.tn-projects` |
| Teal (`.tn-journals`, `.btn-journals`) | The journals tool, «Dónde publicar», and the license of a journal | Button, tab, tab-pill, card header, global-search badge, `CC BY` badge, nav dot |
| Purple (`.tn-events`, `.btn-events`) | The events tool, «Ver eventos», event type | Button, tab, type selector of /eventos, card header, `Convocatoria` / `Para asistir`, nav dot |
| Green / amber / rose (`good` / `fair` / `low`) | Favorable / middle / unfavorable end of a scale: affinity, speed, requirements; «Sin costo» is green | `.aff-ring`, `.aff-word`, speed badge, `Cumple` / `No cumple` boxes |
| Green, indigo, amber, rose (`q1`..`q4`) | Quartile Q1 to Q4 (best to last) | `.qb`, quartile chips and segments, left edge of a journal row |
| Blue badge (`.tn-lang`) | The journal accepts Spanish | `Acepta español` |
| Slate (`.tn-review`) | Peer-review type | `Doble ciego`, `Simple ciego`, `Abierta` |
| Gray (`#F3F4F6`, `#374151`, `#4B5563`) | Sector and metadata: categories, counts, helper text, table headers | Sector badge, `.count-pill`, `.field-hint`, tables of the project page |
| Orange dots (`#C2410C`) | Difficulty level only (1 to 3 filled dots, always with the words) | `.level-dots`, level badge |
| Yellow (`#FFC107`, `#FFF8E1`) | New, attention (closing soon) and keyboard focus | `.badge-new`, `.badge-attn`, focus ring, hero button |
| Green (`#15803D`, `#F0FDF4`) | Success: data up to date, strong fit (the same green as the favorable end of the scales) | `.data-status-dot`, fit "fuerte" |
| Red (`#B91C1C`, `#FEF2F2`) | Error | `ErrorNote` in `src/pages/Opportunities.jsx` |

Color is never the only signal: badges carry an icon and a word (visually hidden prefix "Área: ", "Sector: ", "Nivel N de 3: "), level is dots plus words, quartile is text plus bars (and the Publindex category), affinity is a number plus "alta/media/baja", speed has its own icon (rayo, reloj, reloj de arena) plus the word, requirements carry ✓ and ✗, selected chips show a check, type buttons carry an icon and their name, errors carry an icon and text. Every badge has a tooltip (`data-tip`) and the same words are in the legend «Cómo leer los resultados» and in «Qué significa cada color» of «Cómo leer esta página» (swatch + meaning).

### AA contrast pairs in use (WCAG 2.x, computed from the hex values)

| Foreground on background | Ratio | Used for |
|---|---|---|
| `#00428A` on `#FFFFFF` | 9.78:1 | Links, secondary buttons, headings accents |
| `#FFFFFF` on `#00428A` | 9.78:1 | Primary buttons, selected chips, nav, hero text |
| `#00428A` on `#EFF6FF` | 8.99:1 | Area badge, filter chips |
| `#EFF6FF` / `#DBEAFE` on `#00428A` | 8.99:1 / 8.02:1 | Hero paragraph (`text-blue-50`), helper text on the blue panels (`text-blue-100`) |
| `#00428A` on `#FFC107` | 6.00:1 | Hero button |
| `#0F172A` on `#FFF8E1` | 16.8:1 | `.badge-attn` |
| `#374151` on `#F3F4F6` | 9.37:1 | Sector badge |
| `#111827` on `#FFF7ED` | 16.71:1 | Level badge |
| `#C2410C` on `#FFF7ED` | 4.88:1 | Level dots (non-text, 3:1 needed) |
| `#4B5563` on `#FFFFFF` / `#F8FAFC` / `#F3F4F6` | 7.56 / 7.22 / 6.87:1 | Secondary text, helper lines, placeholders |
| `#6B7280` on `#FFFFFF` | 4.83:1 | Borders of fields and controls (non-text, 3:1 needed) |
| `#15803D` on `#F0FDF4` | 4.79:1 | Success text |
| `#B91C1C` on `#FEF2F2` | 5.91:1 | Error text |
| `#9CA3AF` on `#0F172A` | 7.03:1 | Footer text |
| `#FFFFFF` on `#1E40AF` | 8.72:1 | Primary button hover |

T13 pairs (all computed from `src/lib/palette.js` and checked by `tests/palette.test.mjs`): the tone table above lists, for each tone, `fg` on `bg` (4.5:1 needed, 7.97 to 10.14), `fg` on white and `solid` on white (3:1 needed for graphic marks, 5.02 to 7.58); the button table lists white on every gradient stop (5.47 to 10.88). Extra pairs:

| Foreground on background | Ratio | Used for |
|---|---|---|
| `#FFFFFF` on `#6B21A8` | 8.72:1 | `.badge-events` («Convocatoria») |
| `#FFFFFF` on `#0F766E` / `#7E22CE` | 5.47 / 6.98:1 | Count of the selected tab in the project slide-over |
| `#F0FDFA` on `#0F766E` / `#FAF5FF` on `#7E22CE` | 5.25 / 6.51:1 | Description inside a selected tab-pill |
| `#5EEAD4` / `#D8B4FE` on `#00428A` | 6.61 / 5.53:1 | Hue dots of the navbar (graphic) |

T17/T18 pairs (from `src/lib/palette.js` `contrastRatio` and the classes above):

| Foreground on background | Ratio | Used for |
|---|---|---|
| `#00428A` on `#EFF6FF` (`tn-projects` fg on bg) | 8.99:1 | «Difiere» badge, header icon tile |
| `#00428A` on `#FFFFFF` (`tn-projects` fg and solid on white) | 9.78:1 | Top border and marks of the projects header (graphic: 3:1 needed) |
| `#111827` on `#EFF6FF` | 16.30:1 | Column headers and a differing row of the comparison table |
| `#1F2937` on `#FFFFFF` / `#EFF6FF` | 14.68 / 13.49:1 | Cells of the comparison table (normal / differing row) |
| `#1F2937` on `#F9FAFB` | 14.05:1 | Group rows of the comparison table |
| `#FFFFFF` on `#00428A` | 9.78:1 | «Comparar» toggle pressed, «Comparar ahora» |
| `#4B5563` on `#EFF6FF` | 6.94:1 | Eyebrow of the projects header |
| `#4B5563` on `#FFFFFF` | 7.56:1 | Hint of a collapsed legend |
| `#00428A` on `#FFFFFF` | 9.78:1 | Chevron of a legend (graphic) |
| `#93C5FD` on `#FFFFFF` | 1.80:1 | `line` of the tone: a decorative border only, never the only edge of a control (cards also have a `gray-200` border) |

`#FFC107` on white is 1.63:1: yellow is never used as text or as the only border on white; it is a fill with dark or blue text, or the focus ring paired with blue.

### Tailwind defaults used by the app (source: class usage in `apps/banco-proyectos/src`)

| Class | Value | Usage |
|---|---|---|
| `gray-50` | `#F9FAFB` | Subtle panels (`.data-status`, row hover) |
| `gray-100` | `#F3F4F6` | Card borders, table header, `.count-pill` |
| `gray-200` | `#E5E7EB` | Borders, dividers, ring track |
| `gray-400` | `#9CA3AF` | Footer text on dark only |
| `gray-600` | `#4B5563` | Secondary text (`sem-text-2`) |
| `gray-700` | `#374151` | Body text, chips |
| `gray-900` | `#111827` | Titles |
| `blue-50` / `blue-100` | `#EFF6FF` / `#DBEAFE` | Area tint, border, text on blue panels |
| `blue-800` / `blue-900` | `#1E40AF` / `#1E3A8A` | Primary hover, hero gradient |
| `green-200` / `green-700` | `#BBF7D0` / `#15803D` | Strong journal fit |
| `red-50` / `red-200` / `red-700` | `#FEF2F2` / `#FECACA` / `#B91C1C` | Error note |
| `yellow-300` | `#FDE047` | Hero button hover |

## Typography (source: `apps/banco-proyectos/tailwind.config.js`, `apps/banco-proyectos/index.html`)

- Family: `Inter` (weights 400, 500, 600, 700), fallback `sans-serif`. Artboards use `Inter, system-ui, -apple-system, "Segoe UI", sans-serif` because remote fonts are not allowed.
- Scale in use: 12.5px (`text-[12.5px]`, badges, counts, tooltips), 13.5px (`text-[13.5px]`, buttons, chips, helper lines), `text-sm` 14px, 14.5px (fields), base 16px, `text-lg` 18px (card titles, section headings), `text-xl`/`text-2xl` 20/24px (section titles), `text-3xl`+ for page titles. No body text is below 12.5px and none is lighter than `#4B5563`.
- Headings: one `h1` per page, then `h2` for sections and `h3` for items; levels never skip.

## Radius (source: class usage)

| Class | Value | Usage |
|---|---|---|
| `rounded-md` | 6px | `.badge`, `.qb` |
| `rounded-lg` | 8px | `.btn`, `.seg`, skip link |
| `rounded-xl` | 12px | Fields, metric and tool tiles, `.data-status` |
| `rounded-2xl` | 16px | Cards, icon tiles |
| `rounded-3xl` | 24px | Hero, institutional blocks |
| `rounded-full` | 9999px | `.chip`, `.filter-chip`, `.count-pill`, `.badge-new`, level dots |

## Shadows (source: class usage)

| Class | Value | Usage |
|---|---|---|
| `shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Cards at rest |
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Tooltip |
| `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | Skip link, metric card hover (`.metric-card`) |
| `shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Project card hover |

## Components (source: `apps/banco-proyectos/src/index.css` `@layer components`)

Shared classes; the pages only combine them. Pages that use each one are in the last column.

| Class | Definition | Pages |
|---|---|---|
| `.badge` + `.badge-area` / `.badge-sector` / `.badge-level` | Icon + text, `rounded-md`, 12.5px semibold, 1px border. Area: `sem-area-bg` + `sem-area-fg` bold; sector: `sem-sector-bg` + `sem-sector-fg`; level: `sem-level-bg` + `sem-level-fg` | /proyectos, project page, /eventos, journal fit |
| `.badge-new` | Yellow pill, uppercase, `institutional.dark` text | /proyectos (cards and area filter), project page |
| `.badge-attn` | `sem-attention-bg`, yellow border, dark text (closing soon) | /eventos |
| `.level-dots` (`> i`, `.on`) | 3 dots of 9px; filled dots `--sem-level-dot`, empty dots `--sem-control-line`; decorative, the level is written beside | Cards, project page, level chips |
| `.btn` + `.btn-primary` / `.btn-secondary` / `.btn-tertiary` / `.btn-lg` | 36px (44px with `.btn-lg`) tall, `rounded-lg`, 13.5px semibold. Primary: blue fill, white text, hover `blue-800`. Secondary: white, blue border and text, hover `sem-area-bg`. Tertiary: no border, underline on hover. Disabled: `gray-100`, `gray-600` | All pages (Home entry cards: primary for the catalog, secondary for the others) |
| `.chip` (`[aria-pressed]`, `.chip-count`, `.chip-sm`) | Pill, `--sem-control-line` border; hover blue; selected = blue fill + white text + check | /proyectos, /eventos, /donde-publicar |
| `.filter-chip` | Applied filter, `sem-area-bg` with a remove button (24px) | /proyectos, /eventos |
| `.count-pill` / `.count-badge` | Gray count; blue count of active filters | Filters |
| `.field-label` / `.field-hint` / `.field-input` / `.field-select` / `.field-textarea` | Visible bold label (14px), helper line (13px, `sem-text-2`), 40-44px controls with `--sem-control-line` border, `rounded-xl` | /proyectos, /eventos, /donde-publicar, /oportunidades |
| `.link-action` | Underlined blue text action, min height 32px | Cards, panels, /oportunidades |
| `.data-status` (`.data-status-dot`, `.data-status-more`, `.data-status-body`) | One line "Datos actualizados el …" that opens to the full text (native `<details>`) | /eventos, /donde-publicar |
| `.seg` | Segmented control (one button `aria-pressed`) | Lista/Tabla, event type, quartile |
| `.qb` (`.qb-bars`) | Quartile badge: text + 1 to 4 bars in the hue of its tone (`tn-q1` green .. `tn-q4` rose: tint background, dark text, `solid` bars); neutral without a tone | /donde-publicar (rows, table, catalog, compare tray, legend, help) |
| `.aff-ring` / `.aff-word` (`.aff-word-inline`) | 68px conic ring (`--v` 0-100) in the `solid` of its level (`aff-high tn-good`, `aff-mid tn-fair`, `aff-low tn-low`), number in its `fg`, word as a soft pill | /donde-publicar, /eventos, project panel |
| `.tn-<tone>` | Sets `--tn-bg`, `--tn-fg`, `--tn-line`, `--tn-solid` (generated from `palette.js`); read by `.badge-tone`, `.qb`, `.aff-*`, `.chip-tone`, `.seg-tone`, `.type-chip`, `.hue-card`, `.tone-box`, `.nav-dot` | Everywhere a hue carries a meaning |
| `.badge-tone` | Soft badge of a tone (tint, `line` border, `fg` text) | Journal badges, legend, search badges, compare tray |
| `.badge-events` / `.badge-events-soft` | Filled purple («Convocatoria») and light purple («Para asistir») | /eventos, project panel |
| `.btn-journals` / `.btn-events` (+ `.btn`, `.btn-lg`) | Type buttons: gradient, inner highlight, colored shadow, `.type-ico` icon circle, hover lift, pressed shadow | Project card, project page, Home, opportunity cards, journal row and catalog card (journals), event card (events) |
| `.type-chip` / `.hue-card` / `.tone-box` | Tinted icon circle; card with a 4px top border and a light tint in the tone; tinted box (Cumple / No cumple) | Home cards, opportunity cards, page headers (`PageHeader`) of /eventos, /donde-publicar, /proyectos/comparar and /oportunidades, journal assessment |
| `.page-header` (`-main`, `-icon`, `-eyebrow`, `-title`, `-desc`, `-actions`) | `PageHeader`: white card, `rounded-2xl`, `gray-200` border, small shadow, `.hue-card` top border + `.type-chip` icon tile (52px); eyebrow 12px bold uppercase `sem-text-2`, the page's only `h1` (24px, 22px below `md`), optional description 15px `gray-700`; actions on the right from 900px (wrap below): optional back button `.btn-secondary` and the link «Mis oportunidades guardadas →» (`hideSaved` removes it on /oportunidades itself) | /eventos (`events`), /donde-publicar (`journals`), /proyectos/comparar and /oportunidades (`projects`) |
| `.cmp-table` | Comparison table of 2 or 3 projects (T17): sticky first column and header, `.tn-projects` on the table so a row with `data-differs="true"` takes the `#EFF6FF` tint (plus the word «Difiere» in `.badge-tone.tn-projects`); cell text `gray-800`, header cells `gray-900` on `blue-50`, group rows `gray-800` on `gray-50` | /proyectos/comparar |
| `.btn-compare` | «Comparar» toggle of a card: secondary button, pressed = blue fill + white text (`aria-pressed`, the name says «Quitar de la comparación») | /proyectos cards |
| `.legend-card` (`-title`, `-hint`, `-chevron`, `-body`) | `CollapsibleLegend`: `<aside aria-label>` with a native `<details>`; the `<summary>` (44px tall, a native tab stop: Enter and Space toggle it) shows the title (13.5px bold), a one-line hint «Colores y códigos» (`sem-text-2`) and a chevron that turns when open; the body keeps the legend unchanged. Open from 700px, collapsed below, decided once on mount (`useInitialOpen`, `matchMedia`; open without `matchMedia`) and then left to the visitor | «Cómo leer cada tarjeta» (/proyectos), «Cómo leer los resultados» (/donde-publicar and the project slide-over) |
| `.chip-tone` (+ `.chip-dot`) / `.seg-tone` | Quartile chip and catalog quartile segment: swatch or bar of the hue always, tint when pressed; text, check and `aria-pressed` stay | Custom filters, catalog |
| `.tab-pill-journals` / `.tab-pill-events` / `.tab-journals` / `.tab-events` (`.tab-count`) | Selected tab-pill = gradient of the hue; slide-over tabs = text and bottom bar in the hue, tinted when selected | /donde-publicar, /eventos type selector, project slide-over |
| `.nav-dot` | 9px dot in the `line` color of the tone before «Eventos académicos» and «Dónde publicar» (decorative, `aria-hidden`) | Navbar |
| `.page-btn` | Pagination button, `aria-current="page"` = blue fill | /proyectos |
| `[data-tip]` | Tooltip (`::after`, `institutional.dark`, white 12.5px). Hover and keyboard focus; hidden on touch and below 960px, so the same meaning is always also written as text | Cards, project page metrics, rings |
| `.skip-link` | Visually hidden until focused; then a white button (top left, `z-[100]`) "Saltar al contenido" | `src/App.jsx` (first focusable element) |
| `.focus-ring` and a base `:where(a, button, input, select, textarea, summary, [tabindex]):focus-visible` rule | **Focus: 2px yellow outline (offset 2px) + 2px blue ring** (`box-shadow`); visible on white and on blue. `main` takes programmatic focus without a ring | Whole app |
| `.metric-card`, `.project-card`, legacy `.btn-primary` alone | Legacy classes kept for compatibility; new code uses `.btn .btn-primary` | none of the refreshed pages |

Specific compositions:

- **Project card** (`src/components/ProjectCard.jsx`): white, `rounded-2xl`, `gray-200` border, lift on hover; 52px emoji tile; title 18px bold; "Problema" 2 lines; badges row area → new → sector → level; footer list "Datos del proyecto" (Hardware N, Software N, duration; tooltips `Hardware: N componentes físicos (placas, sensores, actuadores)`); actions "Ver eventos" (`.btn-events`, purple) / "Dónde publicar" (`.btn-journals`, teal), each with its icon circle.
- **Project page** (`src/pages/ProjectDetail.jsx`): back link (tertiary) and the two type buttons (`.btn-events` «¿A qué eventos ir?», `.btn-journals` «¿Dónde publicar este proyecto?»); same badges as the card above the `h1`; list "Datos del proyecto" with Hardware, Software, Duración, Presupuesto (icon tile + label + value + tooltip); the two cards of `OpportunityCards` (each with a tinted header in its hue: `.btn-journals` "Ver las revistas aquí" / `.btn-events` "Ver los eventos aquí" that open the slide-over, link "Abrir página completa …"); sections `h2` Hardware necesario, Software y plataformas, Pasos de implementación, Objetivos, Impacto real, Referencias, each with a one-line helper; tables with `caption` and `scope`, neutral gray header, category as sector badge.
- **Home** (`src/pages/Home.jsx`, `src/components/MetricsSection.jsx`): blue gradient hero with yellow accent (text white / `blue-50`, no opacity trick; reduced motion draws it at its final place); "¿Qué quieres hacer?" with three entry cards (Explorar proyectos primary blue; Buscar eventos `.btn-events` and Dónde publicar `.btn-journals`, each card with a tinted header and icon circle in its hue); "El banco en cifras" with four labelled metrics counted from the data (Proyectos, Áreas tecnológicas, Sectores de aplicación, Áreas nuevas este semestre).
- **Page header** (`src/components/PageHeader.jsx`, T15/T17/T18): the same card on /eventos, /donde-publicar, /proyectos/comparar and /oportunidades, directly under the navbar (`py-6` to `py-8`), followed by the page content with 16-20px between blocks. `hue` is `events`, `journals` or `projects` (brand blue; «Banco de proyectos» eyebrow, `Scale` icon on the comparison, `BookmarkCheck` on /oportunidades). The page keeps exactly one `h1`, the one in the header.
- **Compare tray and table** (`src/components/ProjectCompareTray.jsx`, `src/pages/CompareProjects.jsx`, T17): the tray is `sticky bottom-3` white card with chips of the chosen projects, «N de 3» (`role=status`), «Vaciar comparación» and `.btn-primary.btn-lg` «Comparar ahora» (`aria-disabled` and «Elige al menos 2» under 2 projects); the table is a focusable scroll region (`role=region`, `tabIndex=0`) with `scope` headers, sticky first column, and the toggles «Resaltar diferencias» / «Ocultar filas iguales»; each column ends with `.btn-primary` «Ver proyecto», `.btn-journals`, `.btn-events` and a tertiary «Quitar».
- **Collapsible legend** (`src/components/CollapsibleLegend.jsx`, T18): see `.legend-card`. The content of each legend is unchanged; only the container folds. «Qué significa cada color» in the help tab stays open: it is the content of a tab the visitor chose, not an aside.
- **Web presence** (T18): `index.html` carries the Spanish title, description (150 characters), `theme-color` `#00428A`, canonical URL, Open Graph and Twitter `summary_large_image` tags with the absolute `og-image.png` (1200×630: `#00428A` background, `#FFC107` accent, the school crest, «Proyectos · Eventos · Dónde publicar»), `favicon.svg` (white columns and a `#FFC107` pediment on `#00428A`), `apple-touch-icon.png` (180×180) and `robots.txt`. Crawlers do not run JavaScript, so these tags are global; every page sets its own tab title client side with `useDocumentTitle` («Página · Banco de Proyectos UNIMAYOR», no live region).
- **Footer / layout** (`src/App.jsx`, `src/components/Navbar.jsx`): `header` (sticky, contains `nav` "Principal"), one `main#contenido`, one `footer` with `h2` headings; footer text is `gray-400` on `institutional.dark`.
- **Motion**: `fadeIn` 0.5s (opacity + translateY 10px) in `index.css`; framer-motion entrances check `useReducedMotion`; `prefers-reduced-motion: reduce` removes transitions and animations globally.

## Event and journal pages (React)

Sources: `apps/banco-proyectos/src/pages/Eventos.jsx`, `apps/banco-proyectos/src/pages/DondePublicar.jsx`, and the components in `apps/banco-proyectos/src/components/eventos/` and `apps/banco-proyectos/src/components/publicar/`. Both pages are routes of the project bank (`/eventos`, `/donde-publicar`), use the shared classes above and have no stylesheet of their own. Journal fit and class strings live in `src/components/publicar/classes.js` (`FIT_CLASSES`: strong = green tint, technology = `badge-area`, sector = `badge-sector`). The old quartile colors (`#1b7f3b`, `#2f6fd0`, `#c27c0e`, `#8a5a9e`; white text on `#c27c0e` was 3.40:1) are not used. T13 reversed the neutral quartile of T3 on the user's request: quartile is `.qb` (text + bars + Publindex) in four AA-safe hues (dark text on a light tint), see «Meaning hues».
- Journal result (`ResultItem.jsx`): left edge and quartile badge in the quartile hue; ring, number and word in the affinity hue; one row of at most five soft badges (`JournalBadges.jsx`: Sin costo, Acepta español, review type, speed, license); «Cumple» (green) and «No cumple» (rose) boxes with ✓ / ✗; primary action «Instrucciones para autores» is `.btn-journals`. The table view (`JournalTable.jsx`) and the compare tray color the same cells; the catalog (`CatalogView.jsx`) has the quartile selector with its hues and the same badge row.
- Legend and help: «Cómo leer los resultados» (above the results, a collapsible `.legend-card`: open from 700px, collapsed below) shows a swatch and its words for affinity (3 levels), quartile (Q1..Q4 with Publindex), Sin costo / Acepta español / review / license, speed (3 levels) and Cumple / No cumple; «Cómo leer esta página» has the card «Qué significa cada color» with every swatch and its meaning, including the two type buttons.

- Event filters and cards: white backgrounds, `rounded-2xl`, `gray-200` border, small shadow; selected `.seg` options and `.chip`s use institutional blue with white text.
- Event tags: `.badge-events` (filled purple) for «Convocatoria», `.badge-events-soft` (light purple) for «Para asistir», `.badge-sector` for online, `.badge-attn` (amber) for closing soon; the primary action is `.btn-events`; the type selector of /eventos uses `.tab-pill-events`; the section tabs of /donde-publicar use `.tab-pill-journals`.
- Layout: inherits the app shell (`max-w-7xl`, horizontal padding 16px, 24px from `sm`, 32px from `lg`); cards and filters stack on small screens. No page scrolls horizontally at 390px.
- Focus: the shared 2px yellow + 2px blue ring.
- Spacing: Tailwind scale plus a few arbitrary values (`text-[13.5px]`, `p-[18px]`) in the components above.

## Accessibility rules in force (source: `src/App.jsx`, `src/index.css`, `tests/dom/a11y-pages.test.jsx`)

- First focusable element: skip link "Saltar al contenido" to `#contenido` (focuses `main`, URL unchanged).
- Landmarks once per page: `header` > `nav` "Principal", `main`, `footer`.
- Each page sets `document.title` («Página · Banco de Proyectos UNIMAYOR», `useDocumentTitle`) and restores the site title when it unmounts; nothing is announced (no live region).
- Legends are native `<details>`: the `<summary>` is focusable, Enter and Space toggle it, and the collapsed state never hides the title and hint.
- Exactly one `h1`; headings do not skip levels (known gap: journal cards of `/donde-publicar` are `h3` under the `h1`, in `src/components/publicar/ResultItem.jsx`).
- Every button and link has an accessible name; icons are `aria-hidden`; form fields have a visible label and, when useful, a helper (`aria-describedby`).
- Touch targets of buttons and chips are at least 32-36px tall; nothing overflows horizontally at 390px.
