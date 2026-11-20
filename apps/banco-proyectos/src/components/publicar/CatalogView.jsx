import { useMemo, useState } from 'react';
import useLazyData from '../../hooks/useLazyData';
import { DATA_FILES } from '../../lib/data-loader';
import { Search } from 'lucide-react';
import { ExtLink, FavoriteButton, QuartileBadge } from './JournalLinks';
import { FOCUS } from './classes';
import { categoriesText, countryLabel, journalFacts, languageLabel } from '../../lib/publicar/display';
import { filterRows } from '../../lib/publicar/table';

const PAGE_SIZE = 15;
const QUARTILE_OPTIONS = [['all', 'Todos'], ['Q1', 'Q1'], ['Q2', 'Q2'], ['Q3', 'Q3'], ['Q4', 'Q4']];
const MORE_LINK = 'btn btn-tertiary !min-h-[32px]';

function JournalCard({ journal }) {
    const languages = (journal.languages || []).map(languageLabel).join(', ');
    const meta = [journal.publisher, countryLabel(journal.country), languages && `Idiomas: ${languages}`].filter(Boolean).join(' · ');
    const categories = categoriesText(journal);
    return (
        <article className="bg-white border border-gray-200 rounded-2xl shadow-sm px-4 py-3.5">
            <header className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <QuartileBadge quartile={journal.quartile} />
                <h3 className="m-0 text-base font-bold text-gray-900">{journal.title}</h3>
            </header>
            <p className="mt-1.5 mb-2 text-[13px] text-sem-text-2">{meta}</p>
            <dl className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-3.5 gap-y-1.5 m-0 mb-2">
                {journalFacts(journal).map(([label, value]) => (
                    <div key={label} className="text-[13px]">
                        <dt className="text-sem-text-2 text-[11.5px] uppercase tracking-wide">{label}</dt>
                        <dd className="m-0 font-semibold text-gray-900">{value}</dd>
                    </div>
                ))}
            </dl>
            {categories && <div className="text-xs text-sem-text-2">{categories}</div>}
            <div role="group" aria-label={`Enlaces de ${journal.title}`} className="mt-3 flex flex-wrap items-center gap-2">
                <ExtLink url={journal.url} className="btn btn-primary">Sitio de la revista</ExtLink>
                <ExtLink url={journal.author_instructions_url} className="btn btn-secondary">Instrucciones para autores</ExtLink>
                <FavoriteButton journal={journal} />
                <span role="group" aria-label="Más información" className="flex flex-wrap items-center gap-x-0.5 text-[13px]">
                    <span className="ml-1 mr-1 font-semibold text-sem-text-2">Más información:</span>
                    <ExtLink url={journal.aims_scope_url} className={MORE_LINK}>Alcance de la revista</ExtLink>
                    <ExtLink url={journal.doaj_url} className={MORE_LINK}>Ficha en DOAJ</ExtLink>
                    <ExtLink url={journal.scimago_url} className={MORE_LINK}>Ficha en SCImago</ExtLink>
                </span>
            </div>
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
                <p className="m-0 text-sem-text-2">Todas las revistas de DOAJ sin APC ni otros cobros que tienen cuartil en SCImago (se excluyen las de humanidades).</p>
            </div>
            <div className="flex flex-wrap items-end gap-x-3 gap-y-3 bg-white border border-gray-200 rounded-2xl px-3.5 py-3 shadow-sm mb-3.5">
                <div className="min-w-[240px] flex-1">
                    <label className="field-label mb-1" htmlFor="publicar-catalog-search">Buscar revista, tema o país</label>
                    <div className="relative">
                        <Search className="absolute left-[13px] top-1/2 -mt-2 text-sem-text-2" size={16} aria-hidden="true" />
                        <input
                            id="publicar-catalog-search"
                            type="search"
                            value={query}
                            onChange={(event) => change(setQuery)(event.target.value)}
                            placeholder="sensors, agronomy, Colombia"
                            autoComplete="off"
                            className="field-input"
                        />
                    </div>
                </div>
                <div>
                    <span className="field-label mb-1">Cuartil</span>
                    <div role="group" aria-label="Cuartil del catálogo" className="seg [&>button]:min-h-[42px]">
                        {QUARTILE_OPTIONS.map(([value, label]) => (
                            <button key={value} type="button" aria-pressed={quartile === value} onClick={() => change(setQuartile)(value)}>
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
                <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-[13.5px] font-semibold text-gray-700">
                    <input type="checkbox" checked={spanish} onChange={(event) => change(setSpanish)(event.target.checked)} className={`h-[18px] w-[18px] accent-institutional-blue ${FOCUS}`} />
                    Acepta español
                </label>
                <span className="md:ml-auto text-[13.5px] text-gray-700" aria-live="polite">{count}</span>
                {failed && <button type="button" onClick={retry} className="btn btn-secondary">Reintentar</button>}
            </div>
            <div className="grid gap-3">
                {rows.slice(0, shown).map(({ journal }) => <JournalCard key={journal.id} journal={journal} />)}
                {catalog && rows.length === 0 && (
                    <p className="text-center p-7 text-sem-text-2 border border-dashed border-sem-control-line rounded-2xl bg-white">Sin resultados para esta búsqueda.</p>
                )}
            </div>
            {rows.length > shown && (
                <button type="button" onClick={() => setShown((current) => current + PAGE_SIZE)} className="btn btn-secondary btn-lg mx-auto mt-3.5 flex">Ver más revistas</button>
            )}
        </>
    );
}
