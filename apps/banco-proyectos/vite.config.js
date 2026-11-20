import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vendor libraries get their own long-lived chunks, so a change in the app code does not invalidate them in the
// browser cache. `projects-data` is the full 236 projects (src/data, only the project page needs it) and
// `projects-index` the light index the catalog reads (generated, src/data/projects-index.js); both load on demand
// through src/lib/projects-loader.js. areas.js stays out of them because the catalog code reads it at startup.
const VENDOR_CHUNKS = [
    ['react', /node_modules\/(react|react-dom|scheduler)\//],
    ['router', /node_modules\/(react-router|react-router-dom|@remix-run\/router)\//],
    ['motion', /node_modules\/(framer-motion|motion-dom|motion-utils)\//],
    ['icons', /node_modules\/lucide-react\//],
]

export function manualChunks(id) {
    const vendor = VENDOR_CHUNKS.find(([, pattern]) => pattern.test(id))
    if (vendor) return vendor[0]
    if (id.endsWith('/src/data/projects-index.js')) return 'projects-index'
    if (/\/src\/data\/(baseProjects\.js|projects\/)/.test(id) && !id.endsWith('/areas.js')) return 'projects-data'
    return undefined
}

// A page opened by its URL (a shared link, a reload) would find out which chunks it needs only after the entry runs:
// entry -> page chunk -> its data, one round trip after another. Each route lists here the page chunk and the extra
// chunks it always needs (the projects index or data), and the build writes a small script into index.html that asks for them with
// <link rel="modulepreload"> as soon as the HTML is parsed, in parallel with the entry.
export const ROUTE_PRELOADS = [
    ['^/proyectos/?$', ['ProjectsCatalog', 'projects-index']],
    ['^/proyecto/', ['ProjectDetail', 'projects-data']],
    ['^/eventos/?$', ['Eventos']],
    ['^/donde-publicar/?$', ['DondePublicar']],
    ['^/oportunidades/?$', ['Opportunities']],
    ['^/acerca/?$', ['About']],
    ['^/contacto/?$', ['Contact']],
]

// [[pattern, [url, ...]], ...] for the chunks of a built bundle: each wanted chunk (matched by its name: the page file
// name, or `projects-data`) and what it imports, except what the entry loads anyway.
export function preloadMap(bundle, base = '/') {
    const chunks = Object.values(bundle).filter((item) => item.type === 'chunk')
    const byFile = new Map(chunks.map((chunk) => [chunk.fileName, chunk]))
    const closure = (files, seen = new Set()) => {
        for (const file of files) {
            if (seen.has(file) || !byFile.has(file)) continue
            seen.add(file)
            closure(byFile.get(file).imports, seen)
        }
        return seen
    }
    const entry = closure(chunks.filter((chunk) => chunk.isEntry).map((chunk) => chunk.fileName))
    const find = (name) => chunks.find((chunk) => chunk.name === name)
    return ROUTE_PRELOADS.map(([pattern, wanted]) => {
        const files = closure(wanted.map((item) => find(item)?.fileName).filter(Boolean))
        return [pattern, [...files].filter((file) => !entry.has(file)).map((file) => `${base}${file}`)]
    }).filter(([, urls]) => urls.length > 0)
}

const PRELOAD_SCRIPT = (map) => `(function(m){var p=location.pathname;for(var i=0;i<m.length;i++){if(new RegExp(m[i][0]).test(p)){m[i][1].forEach(function(h){var l=document.createElement('link');l.rel='modulepreload';l.href=h;document.head.appendChild(l)});break}}})(${JSON.stringify(map)})`

function routePreload() {
    let base = '/'
    return {
        name: 'route-preload',
        apply: 'build',
        configResolved(config) { base = config.base.endsWith('/') ? config.base : `${config.base}/` },
        transformIndexHtml: {
            order: 'post',
            handler(html, { bundle }) {
                if (!bundle) return undefined
                const map = preloadMap(bundle, base)
                if (map.length === 0) return undefined
                // After <meta charset> (it has to stay within the first 1024 bytes), before the render-blocking stylesheets.
                return html.replace('<title>', () => `<script>${PRELOAD_SCRIPT(map)}</script>\n    <title>`)
            },
        },
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), routePreload()],
    build: {
        rollupOptions: { output: { manualChunks } },
        // The only chunk above 500 kB is projects-data (~1 MB of text, ~200 kB gzipped), lazy on purpose: only the project page loads it.
        chunkSizeWarningLimit: 1000,
    },
})
