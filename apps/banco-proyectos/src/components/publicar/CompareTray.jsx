import { useEffect, useRef } from 'react';
import { ExtLink, TemplateLinks } from './JournalLinks';
import { FOCUS } from './classes';
import { comparisonRows } from '../../lib/publicar/display';

const LINK = 'mr-2.5 font-semibold whitespace-nowrap text-institutional-blue hover:underline';
const CELL = 'px-3 py-[7px] border-b border-gray-100';

// Side-by-side comparison of up to three journals, fixed at the bottom of the page. It reports its height through
// onHeight so the page can reserve that space and the tray never covers the last rows.
// embedded: for the project panel; it sits in the flow at the bottom of the panel, and collapsed shows only a bar
// (onToggleCollapsed switches it) so the list stays visible.
export default function CompareTray({ journals, affinityById, onRemove, onClear, onHeight, embedded = false, collapsed = false, onToggleCollapsed }) {
    const trayRef = useRef(null);
    useEffect(() => {
        const tray = trayRef.current;
        if (!tray || !onHeight) return undefined;
        const report = () => onHeight(tray.offsetHeight);
        report();
        if (typeof ResizeObserver === 'undefined') return undefined;
        const observer = new ResizeObserver(report);
        observer.observe(tray);
        return () => { observer.disconnect(); onHeight(0); };
    }, [onHeight]);

    const rows = comparisonRows(journals, affinityById);
    const hidden = embedded && collapsed;
    return (
        <aside ref={trayRef} aria-label="Comparación de revistas" className={embedded ? 'bg-white border-t border-gray-200 shadow-xl max-h-[55vh] overflow-y-auto' : 'fixed inset-x-0 bottom-0 z-20 bg-white border-t border-gray-200 shadow-xl max-h-[50vh] overflow-y-auto'}>
            <div className={embedded ? `px-5 max-[760px]:px-3 ${hidden ? 'py-2.5' : 'pt-3.5 pb-4'}` : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3.5 pb-[18px]'}>
                <div className={`flex items-center justify-between gap-3 ${hidden ? '' : 'mb-2.5'}`}>
                    <h2 id="publicar-compare-title" className="m-0 text-[15px] font-bold text-gray-900">Comparando {journals.length} revista{journals.length > 1 ? 's' : ''}</h2>
                    <div className="flex items-center gap-3">
                        {embedded && (
                            <button type="button" aria-expanded={!collapsed} aria-controls="publicar-compare-table" onClick={onToggleCollapsed} className={`text-[13px] font-semibold text-institutional-blue rounded ${FOCUS}`}>
                                {collapsed ? 'Mostrar comparación' : 'Ocultar comparación'}
                            </button>
                        )}
                        <button type="button" onClick={onClear} className={`text-[13px] font-semibold text-institutional-blue rounded ${FOCUS}`}>Quitar todas</button>
                    </div>
                </div>
                {embedded && !hidden && <p className="m-0 mb-2 text-[12.5px] text-gray-600 md:hidden">Deslice la tabla hacia los lados para ver todas las revistas.</p>}
                <div id="publicar-compare-table" hidden={hidden} className="overflow-x-auto">
                    <div
                        role="table"
                        aria-labelledby="publicar-compare-title"
                        className="grid text-[13px] border border-gray-100 rounded-xl overflow-hidden min-w-[720px]"
                        style={{ gridTemplateColumns: `190px repeat(${journals.length}, minmax(200px, 1fr))` }}
                    >
                        <div role="row" className="contents">
                            <div role="columnheader" className={`${CELL} bg-gray-50`}><span className="sr-only">Dato</span></div>
                            {journals.map((journal) => (
                                <div key={journal.id} role="columnheader" className={`${CELL} font-bold text-gray-900 bg-blue-50 flex justify-between gap-2`}>
                                    <span>{journal.title}</span>
                                    <button type="button" onClick={() => onRemove(journal.id)} aria-label={`Quitar ${journal.title} de la comparación`} className={`text-gray-500 text-[15px] leading-none rounded ${FOCUS}`}>×</button>
                                </div>
                            ))}
                        </div>
                        {rows.map((row) => (
                            <div key={row.label} role="row" className="contents">
                                <div role="rowheader" className={`${CELL} text-gray-500 bg-gray-50 font-semibold`}>{row.label}</div>
                                {row.cells.map((cell, index) => (
                                    <div key={journals[index].id} role="cell" className={`${CELL} ${cell.best ? 'text-green-700 font-bold' : row.className === 'parts' ? 'text-gray-600' : ''}`}>{cell.text}</div>
                                ))}
                            </div>
                        ))}
                        <div role="row" className="contents">
                            <div role="rowheader" className={`${CELL} text-gray-500 bg-gray-50 font-semibold`}>Enlaces</div>
                            {journals.map((journal) => (
                                <div key={journal.id} role="cell" className={`${CELL} flex flex-wrap items-center gap-y-1`}>
                                    <TemplateLinks journal={journal} className={`inline-block mr-2.5 bg-institutional-blue text-white rounded-lg px-[9px] py-[3px] font-semibold whitespace-nowrap hover:bg-blue-800 ${FOCUS}`} />
                                    <ExtLink url={journal.author_instructions_url} className={LINK}>Instrucciones para autores</ExtLink>
                                    <ExtLink url={journal.aims_scope_url} className={LINK}>Alcance</ExtLink>
                                    <ExtLink url={journal.url} className={LINK}>Sitio</ExtLink>
                                    <ExtLink url={journal.doaj_url} className={LINK}>DOAJ</ExtLink>
                                    <ExtLink url={journal.scimago_url} className={LINK}>SCImago</ExtLink>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
