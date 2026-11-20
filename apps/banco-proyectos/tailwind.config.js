/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                institutional: {
                    blue: '#00428A',
                    yellow: '#FFC107',
                    light: '#F8FAFC',
                    dark: '#0F172A'
                },
                accent: {
                    pink: '#ED64A6',
                    green: '#48BB78',
                    orange: '#ED8936'
                },
                // Semantic tokens (design/mejora-visual/04-componentes.html): one color, one meaning.
                // Values live in src/index.css (:root) so the shared component classes and these utilities agree.
                sem: {
                    'area-bg': 'var(--sem-area-bg)',
                    'area-fg': 'var(--sem-area-fg)',
                    'area-line': 'var(--sem-area-line)',
                    'sector-bg': 'var(--sem-sector-bg)',
                    'sector-fg': 'var(--sem-sector-fg)',
                    'level-bg': 'var(--sem-level-bg)',
                    'level-fg': 'var(--sem-level-fg)',
                    'level-dot': 'var(--sem-level-dot)',
                    'attention-bg': 'var(--sem-attention-bg)',
                    'success-bg': 'var(--sem-success-bg)',
                    'success-fg': 'var(--sem-success-fg)',
                    'danger-fg': 'var(--sem-danger-fg)',
                    'control-line': 'var(--sem-control-line)',
                    'text-2': 'var(--sem-text-2)'
                }
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
