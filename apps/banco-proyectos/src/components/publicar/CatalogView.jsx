import { useMemo, useState } from 'react';
import useLazyData from '../../hooks/useLazyData';
import { DATA_FILES } from '../../lib/data-loader';
import { ExtLink, FavoriteButton, QuartileBadge } from './JournalLinks';
import { FOCUS, INPUT } from './classes';
import { categoriesText, countryLabel, journalFacts, languageLabel } from '../../lib/publicar/display';
import { filterRows } from '../../lib/publicar/table';

const PAGE_SIZE = 15;
const QUARTILE_OPTIONS = [['all', 'Todos'], ['Q1', 'Q1'], ['Q2', 'Q2'], ['Q3', 'Q3'], ['Q4', 'Q4']];
const LINK = 'text-[13px] no-underline px-[11px] py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100';

function JournalCard({ journal }) {
    const languages = (journal.languages || []).map(languageLabel).join(', ');
    const meta = [journal.publisher, countryLabel(journal.country), languages && `Idiomas: ${languages}`].filter(Boolean).join(' · ');
    const categories = categoriesText(journal);
    return (
        <article className="bg-white border border-gray-100 rounded-2xl shadow-sm px-4 py-3.5">
            <header className="flex items-center gap-2.5">
                <QuartileBadge quartile={journal.quartile} />
                <h3 className="m-0 text-base font-bold text-gray-900">{journal.title}</h3>
            </header>
            <p className="mt-1.5 mb-2 text-[13px] text-gray-500">{meta}</p>
            <dl className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-3.5 gap-y-1.5 m-0 mb-2">
                {journalFacts(journal).map(([label, value]) => (
                    <div key={label} className="text-[13px]">
                        <dt className="text-gray-500 text-[11px] uppercase tracking-wide">{label}</dt>
                        <dd className="m-0 font-semibold text-gray-900">{value}</dd>
                    </div>
                ))}
            </dl>
            {categories && <div className="text-xs text-gray-500">{categories}</div>}
            <nav aria-label="Enlaces de la revista" className="flex flex-wrap gap-2 mt-2.5">
                <FavoriteButton journal={journal} className={`${LINK} cursor-pointer ${FOCUS}`} />
                <ExtLink url={journal.url} className="text-[13px] no-underline px-[11px] py-1.5 rounded-lg border border-institutional-blue bg-institutional-blue text-white hover:bg-blue-800">Sitio de la revista</ExtLink>
                <ExtLink url={journal.author_instructions_url} className={LINK}>Instrucciones para autores</ExtLink>
                <ExtLink url={journal.aims_scope_url} className={LINK}>Alcance de la revista</ExtLink>
                <ExtLink url={journal.doaj_url} className={LINK}>Ficha en DOAJ</ExtLink>
                <ExtLink url={journal.scimago_url} className={LINK}>Ficha en SCImago</ExtLink>
            </nav>
        </article>
    );
}

// Every diamond open access journal with a SCImago quartile. The list (a few MB of JSON) is downloaded the first time
// the tab is opened (a static file shared through lib/data-loader.js).
export default function CatalogView({ active }) {
    const [query, setQuery] = useState('');
    const [quartile, setQuartile] = useState('all');
    const [spanish, setSpanish] = useState(false);
    const [shown, setShown] = useState(PAGE_SIZE);
    const { status, data: catalog, retry } = useLazyData(DATA_FILES.catalog, active);
    const failed = status === 'error';

    const rows = useMemo(
        () => (catalog ? filterRows(catalog.map((journal) => ({ match: { fit: 'all' }, journal })), { query, quartile, spanish }) : []),
        [catalog, query, quartile, spanish],
    );
    const change = (setter) => (value) => { setter(value); setShown(PAGE_SIZE); };
    let count = 'Cargando catálogo…';
    if (failed) count = 'No se pudo cargar el catálogo.';
    else if (catalog) count = `Mostrando ${Math.min(shown, rows.length)} de ${rows.length} revistas`;

    return (
        <>
            <div className="mb-3.5">
                <h2 className="m-0 mb-1 text-xl font-bold text-gray-900">Catálogo de revistas diamante con cuartil</h2>
                <p className="m-0 text-gray-500">Todas las revistas de DOAJ sin APC ni otros cobros que tienen cuartil en SCImago (se excluyen las de humanidades).</p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 bg-white border border-gray-100 rounded-2xl px-3.5 py-3 shadow-sm mb-3.5">
                <label className="sr-only" htmlFor="publicar-catalog-search">Buscar revista, tema o país</label>
                <input
                    id="publicar-catalog-search"
                    type="search"
                    value={query}
                    onChange={(event) => change(setQuery)(event.target.value)}
                    placeholder="Buscar revista, tema o país: sensors, agronomy, Colombia…"
                    autoComplete="off"
                    className={`${INPUT} flex-1 min-w-[240px]`}
                />
                <div role="group" aria-label="Cuartil del catálogo" className="inline-flex border border-gray-200 rounded-xl overflow-hidden">
                    {QUARTILE_OPTIONS.map(([value, label]) => (
                        <button
                            key={value}
                            type="button"
                            aria-pressed={quartile === value}
                            onClick={() => change(setQuartile)(value)}
                            className={`px-3 py-2 text-[13px] font-semibold border-r border-gray-200 last:border-r-0 ${FOCUS} ${quartile === value ? 'bg-institutional-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <label className="inline-flex items-center gap-1.5 text-[13px] text-gray-700 cursor-pointer">
                    <input type="checkbox" checked={spanish} onChange={(event) => change(setSpanish)(event.target.checked)} className={`w-4 h-4 accent-institutional-blue ${FOCUS}`} />
                    Acepta español
                </label>
                <span className="md:ml-auto text-[13px] text-gray-500" aria-live="polite">{count}</span>
                {failed && <button type="button" onClick={retry} className={`px-3 py-2 rounded-lg border border-institutional-blue bg-white text-institutional-blue text-[13px] font-semibold hover:bg-blue-50 ${FOCUS}`}>Reintentar</button>}
            </div>
            <div className="grid gap-3">
                {rows.slice(0, shown).map(({ journal }) => <JournalCard key={journal.id} journal={journal} />)}
                {catalog && rows.length === 0 && (
                    <p className="text-center p-7 text-gray-500 border border-dashed border-gray-200 rounded-2xl bg-white">Sin resultados para esta búsqueda.</p>
                )}
            </div>
            {rows.length > shown && (
                <button type="button" onClick={() => setShown((current) => current + PAGE_SIZE)} className={`block mx-auto mt-3.5 px-4 py-2.5 rounded-lg border border-institutional-blue bg-white text-institutional-blue font-semibold hover:bg-blue-50 ${FOCUS}`}>Ver más revistas</button>
            )}
        </>
    );
}
