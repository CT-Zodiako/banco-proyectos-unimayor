# Design system — Banco de Proyectos UNIMAYOR

Captured from the project sources (read only). Primary app: `apps/banco-proyectos`.
Tailwind v3 default palette values are listed only for the utility classes the app actually uses
(found by scanning `apps/banco-proyectos/src/**/*.jsx`).

## Colors

### Brand (source: `apps/banco-proyectos/tailwind.config.js`, `apps/banco-proyectos/src/index.css`)

| Token | Value | Usage |
|---|---|---|
| `institutional.blue` / `--blue-primary` | `#00428A` | Primary actions, links, active states, headings accents, hero gradient |
| `institutional.yellow` / `--yellow-accent` | `#FFC107` | Highlights, icons on blue, emphasis badges |
| `institutional.light` | `#F8FAFC` | Page background (`body`) |
| `institutional.dark` | `#0F172A` | Body text color (`body`) |
| `accent.pink` | `#ED64A6` | Decorative accent |
| `accent.green` | `#48BB78` | Decorative accent / success |
| `accent.orange` | `#ED8936` | Decorative accent |

### Tailwind defaults used by the app (source: class usage in `apps/banco-proyectos/src`)

| Class | Value | Usage |
|---|---|---|
| `gray-50` | `#F9FAFB` | Subtle panels |
| `gray-100` | `#F3F4F6` | Card borders (`border-gray-100`) |
| `gray-200` | `#E5E7EB` | Borders, dividers |
| `gray-400` | `#9CA3AF` | Metadata labels |
| `gray-500` | `#6B7280` | Secondary text |
| `gray-600` | `#4B5563` | Body secondary text |
| `gray-700` | `#374151` | Body text |
| `gray-900` | `#111827` | Titles |
| `blue-50` / `blue-100` | `#EFF6FF` / `#DBEAFE` | Area badge background, emoji tile |
| `blue-700` | `#1D4ED8` | Area badge text |
| `blue-800` / `blue-900` | `#1E40AF` / `#1E3A8A` | Primary hover, hero gradient |
| `green-50` / `green-700` | `#F0FDF4` / `#15803D` | Sector badge |
| `orange-50` / `orange-600` / `orange-700` | `#FFF7ED` / `#EA580C` / `#C2410C` | Level badge, hardware metric |
| `purple-50` / `purple-600` | `#FAF5FF` / `#9333EA` | Software metric |

## Typography (source: `apps/banco-proyectos/tailwind.config.js`, `apps/banco-proyectos/index.html`)

- Family: `Inter` (weights 400, 500, 600, 700), fallback `sans-serif`. Artboards use `Inter, system-ui, -apple-system, "Segoe UI", sans-serif` because remote fonts are not allowed.
- Scale in use: `text-xs` 12px (badges, labels, uppercase + tracking-wider), `text-sm` 14px, base 16px, `text-xl` 20px (card titles, bold), `text-3xl`+ for page titles.

## Radius (source: class usage)

| Class | Value | Usage |
|---|---|---|
| `rounded-md` | 6px | Badges inside cards |
| `rounded-lg` | 8px | Buttons (`.btn-primary`) |
| `rounded-xl` | 12px | Inputs, metric cards (most used) |
| `rounded-2xl` | 16px | Project cards, emoji tile |
| `rounded-3xl` | 24px | Modals |
| `rounded-full` | 9999px | Pills, `.badge` |

## Shadows (source: class usage)

| Class | Value | Usage |
|---|---|---|
| `shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Cards at rest |
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Raised panels |
| `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | Metric card hover |
| `shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Project card hover |

## Components (source: `apps/banco-proyectos/src/index.css`, `src/components/ProjectCard.jsx`)

- **Project card**: white, `rounded-2xl`, `border-gray-100`, `shadow-sm` → `shadow-xl` and lift (-4px) on hover. 64px emoji tile `blue-50`, title `text-xl` bold `gray-900` (underline + blue on hover), problem text 2 lines `gray-600`. Badges row: area (`blue-50`/`blue-700`, uppercase), sector (`green-50`/`green-700`), level (`orange-50`/`orange-700`). Footer: 4 metrics (Duración, Presp., Hardware, Software) with colored icons and uppercase `gray-400` labels.
- **Button primary** (`.btn-primary`): `institutional.blue` background, white text, `rounded-lg`, hover `blue-800`, weight 500.
- **Badge** (`.badge`): `rounded-full`, `text-xs`, semibold.
- **Metric card** (`.metric-card`): white, `rounded-xl`, `border-gray-100`, padding 24px, hover `shadow-lg`.
- **Motion**: `fadeIn` 0.5s (opacity + translateY 10px).

## Secondary source: `apps/donde-publicar/site/styles.css`

Separate static page with its own palette (navy `#12305a`, `#1d4a85`, gold `#c9a227`, quartile colors Q1 `#1b7f3b`, Q2 `#2f6fd0`, Q3 `#c27c0e`, Q4 `#8a5a9e`). Quartile colors are reused only when a design shows journal quartiles.
