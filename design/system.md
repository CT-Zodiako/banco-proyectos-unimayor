# Design system — Banco de Proyectos UNIMAYOR

Captured from the project sources (read only). Primary app: `apps/banco-proyectos`.
Updated after the visual refinement (`odd/tasks/mejora-visual.md`, T2-T4, direction `design/mejora-visual/01-refinado-fiel.html`):
same identity (institutional blue, yellow, Inter, white cards), one meaning per color, shared component classes in
`apps/banco-proyectos/src/index.css` instead of per-page class strings.
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

### Meaning of color (one color, one meaning)

| Color | Means | Where |
|---|---|---|
| Blue (`#00428A`, `#EFF6FF`) | Area and actions: links, primary and secondary buttons, selected chips, affinity ring, info banners | Area badge, `.btn`, `.chip[aria-pressed]`, `.filter-chip`, `.aff-ring`, nav |
| Gray (`#F3F4F6`, `#374151`, `#4B5563`) | Sector and metadata: categories, counts, helper text, table headers | Sector badge, `.count-pill`, `.field-hint`, tables of the project page |
| Orange dots (`#C2410C`) | Difficulty level only (1 to 3 filled dots, always with the words) | `.level-dots`, level badge |
| Yellow (`#FFC107`, `#FFF8E1`) | New, attention (closing soon) and keyboard focus | `.badge-new`, `.badge-attn`, focus ring, hero button |
| Green (`#15803D`, `#F0FDF4`) | Success: data up to date, strong fit | `.data-status-dot`, fit "fuerte" |
| Red (`#B91C1C`, `#FEF2F2`) | Error | `ErrorNote` in `src/pages/Opportunities.jsx` |

Color is never the only signal: badges carry an icon and a word (visually hidden prefix "Área: ", "Sector: ", "Nivel N de 3: "), level is dots plus words, quartile is text plus bars, affinity is a number plus "alta/media/baja", selected chips show a check, errors carry an icon and text.

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
| `.qb` (`.qb-bars`) | Quartile badge: text + 1 to 4 bars, `gray-700` border, no color of its own | /donde-publicar |
| `.aff-ring` | 68px blue conic ring (`--v` 0-100), number inside, word beside (`.aff-word`) | /donde-publicar, project panel |
| `.page-btn` | Pagination button, `aria-current="page"` = blue fill | /proyectos |
| `[data-tip]` | Tooltip (`::after`, `institutional.dark`, white 12.5px). Hover and keyboard focus; hidden on touch and below 960px, so the same meaning is always also written as text | Cards, project page metrics, rings |
| `.skip-link` | Visually hidden until focused; then a white button (top left, `z-[100]`) "Saltar al contenido" | `src/App.jsx` (first focusable element) |
| `.focus-ring` and a base `:where(a, button, input, select, textarea, summary, [tabindex]):focus-visible` rule | **Focus: 2px yellow outline (offset 2px) + 2px blue ring** (`box-shadow`); visible on white and on blue. `main` takes programmatic focus without a ring | Whole app |
| `.metric-card`, `.project-card`, legacy `.btn-primary` alone | Legacy classes kept for compatibility; new code uses `.btn .btn-primary` | none of the refreshed pages |

Specific compositions:

- **Project card** (`src/components/ProjectCard.jsx`): white, `rounded-2xl`, `gray-200` border, lift on hover; 52px emoji tile; title 18px bold; "Problema" 2 lines; badges row area → new → sector → level; footer list "Datos del proyecto" (Hardware N, Software N, duration; tooltips `Hardware: N componentes físicos (placas, sensores, actuadores)`); actions "Ver eventos" / "Dónde publicar" (secondary).
- **Project page** (`src/pages/ProjectDetail.jsx`): back link (tertiary) and two secondary links; same badges as the card above the `h1`; list "Datos del proyecto" with Hardware, Software, Duración, Presupuesto (icon tile + label + value + tooltip); the two cards of `OpportunityCards` (primary "Ver las revistas aquí" / "Ver los eventos aquí" that open the slide-over, link "Abrir página completa …"); sections `h2` Hardware necesario, Software y plataformas, Pasos de implementación, Objetivos, Impacto real, Referencias, each with a one-line helper; tables with `caption` and `scope`, neutral gray header, category as sector badge.
- **Home** (`src/pages/Home.jsx`, `src/components/MetricsSection.jsx`): blue gradient hero with yellow accent (text white / `blue-50`, no opacity trick; reduced motion draws it at its final place); "¿Qué quieres hacer?" with three entry cards (Explorar proyectos primary, Buscar eventos and Dónde publicar secondary); "El banco en cifras" with four labelled metrics counted from the data (Proyectos, Áreas tecnológicas, Sectores de aplicación, Áreas nuevas este semestre).
- **Footer / layout** (`src/App.jsx`, `src/components/Navbar.jsx`): `header` (sticky, contains `nav` "Principal"), one `main#contenido`, one `footer` with `h2` headings; footer text is `gray-400` on `institutional.dark`.
- **Motion**: `fadeIn` 0.5s (opacity + translateY 10px) in `index.css`; framer-motion entrances check `useReducedMotion`; `prefers-reduced-motion: reduce` removes transitions and animations globally.

## Event and journal pages (React)

Sources: `apps/banco-proyectos/src/pages/Eventos.jsx`, `apps/banco-proyectos/src/pages/DondePublicar.jsx`, and the components in `apps/banco-proyectos/src/components/eventos/` and `apps/banco-proyectos/src/components/publicar/`. Both pages are routes of the project bank (`/eventos`, `/donde-publicar`), use the shared classes above and have no stylesheet of their own. Journal fit and class strings live in `src/components/publicar/classes.js` (`FIT_CLASSES`: strong = green tint, technology = `badge-area`, sector = `badge-sector`). The old quartile colors (`#1b7f3b`, `#2f6fd0`, `#c27c0e`, `#8a5a9e`) are no longer used: quartile is `.qb` (text + bars).

- Event filters and cards: white backgrounds, `rounded-2xl`, `gray-200` border, small shadow; selected `.seg` options and `.chip`s use institutional blue with white text.
- Event tags: `.badge-area` for calls, `.badge-sector` for attendance and online, `.badge-attn` for closing soon.
- Layout: inherits the app shell (`max-w-7xl`, horizontal padding 16px, 24px from `sm`, 32px from `lg`); cards and filters stack on small screens. No page scrolls horizontally at 390px.
- Focus: the shared 2px yellow + 2px blue ring.
- Spacing: Tailwind scale plus a few arbitrary values (`text-[13.5px]`, `p-[18px]`) in the components above.

## Accessibility rules in force (source: `src/App.jsx`, `src/index.css`, `tests/dom/a11y-pages.test.jsx`)

- First focusable element: skip link "Saltar al contenido" to `#contenido` (focuses `main`, URL unchanged).
- Landmarks once per page: `header` > `nav` "Principal", `main`, `footer`.
- Exactly one `h1`; headings do not skip levels (known gap: journal cards of `/donde-publicar` are `h3` under the `h1`, in `src/components/publicar/ResultItem.jsx`).
- Every button and link has an accessible name; icons are `aria-hidden`; form fields have a visible label and, when useful, a helper (`aria-describedby`).
- Touch targets of buttons and chips are at least 32-36px tall; nothing overflows horizontally at 390px.
