import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import Chips from '../publicar/Chips';
import CompareTray from '../publicar/CompareTray';
import FiltersPanel from '../publicar/FiltersPanel';
import JournalResults, { AffinityNote, ResultsLegend } from '../publicar/JournalResults';
import JournalToolbar from '../publicar/JournalToolbar';
import { EscapeCard, LoadError, NoData } from './PanelParts';
import PanelSkeleton from './PanelSkeleton';
import useJournalFinder from '../../hooks/useJournalFinder';
import useLazyData from '../../hooks/useLazyData';
import { DATA_FILES } from '../../lib/data-loader';
import { nextShown, panelFullUrl } from '../../lib/project-panel';
import { ADVANCED_DEFAULTS, dataStatus } from '../../lib/publicar/table';

const PAGE_SIZE = 8;
const MORE_SIZE = 10;

function JournalsLoaded({ data, project, active, slots, onMeta }) {
    const journalsById = useMemo(() => new Map(data.journals.map((journal) => [journal.id, journal])), [data]);
    const dataProject = useMemo(() => data.projects.find((candidate) => candidate.id === project.id) || null, [data, project.id]);
    const finder = useJournalFinder(dataProject, journalsById, data.themes);
    const { rows, visible, setPanelOpen } = finder;
    const [limit, setLimit] = useState(PAGE_SIZE);
    const [trayCollapsed, setTrayCollapsed] = useState(false);

    useEffect(() => { onMeta({ count: rows.length, emoji: dataProject ? dataProject.emoji : null }); }, [onMeta, rows.length, dataProject]);
    // The filters sheet closes when another tab is shown, as in the design.
    useEffect(() => { if (!active) setPanelOpen(false); }, [active, setPanelOpen]);

    const fullUrl = panelFullUrl('revistas', project.id);
    if (!dataProject || rows.length === 0) {
        return (
            <NoData>
                <p className="mb-3">Todavía no hay revistas sugeridas para este proyecto.</p>
                <Link to={fullUrl} className="font-semibold text-institutional-blue underline">Abrir en la página completa</Link>
            </NoData>
        );
    }

    const trayVisible = active && finder.mode === 'table' && finder.comparedJournals.length > 0;
    return (
        <div className="space-y-3">
            <p className="m-0 text-[13.5px] text-gray-600">{rows.length} revistas de acceso abierto sin cobro a autores, ordenadas por su afinidad con este proyecto. {dataStatus(data)}</p>
            <JournalToolbar
                query={finder.query}
                onQuery={finder.setQuery}
                sort={finder.sort}
                onSort={finder.setSort}
                mode={finder.mode}
                onMode={finder.setMode}
                filtersOpen={finder.panelOpen}
                onToggleFilters={() => setPanelOpen((open) => !open)}
                advancedCount={finder.advancedCount}
                toggleRef={finder.toggleButtonRef}
            />
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span ref={finder.countRef} aria-live="polite"><b>{visible.length}</b> de {rows.length} revistas{finder.compareText}</span>
                <Chips advanced={finder.advanced} onRemove={(key) => finder.patchAdvanced({ [key]: ADVANCED_DEFAULTS[key] })} onClear={() => finder.setAdvanced(ADVANCED_DEFAULTS)} />
            </div>
            <section aria-label="Revistas sugeridas">
                <ResultsLegend className="mb-3" />
                <JournalResults
                    rows={visible}
                    mode={finder.mode}
                    sort={finder.sort}
                    onSort={finder.setSort}
                    compare={finder.compare}
                    onToggleCompare={finder.toggleCompared}
                    limit={limit}
                    listClassName="[&>article]:items-start [&>article]:md:grid-cols-[92px_minmax(0,1fr)] [&>article>div:last-child]:md:col-span-full [&>article>div:last-child]:md:flex-row [&>article>div:last-child]:md:flex-wrap"
                    onMore={() => setLimit((current) => nextShown(current, visible.length, MORE_SIZE))}
                    onClearFilters={() => { finder.setAdvanced(ADVANCED_DEFAULTS); finder.setQuery(''); }}
                />
                <AffinityNote className="mt-3.5" />
            </section>
            <EscapeCard ariaLabel="Vista general de revistas" to={fullUrl} label="Abrir la página completa de revistas ↗">
                <strong>¿Quiere ver más allá de este proyecto?</strong> La página completa tiene el catálogo completo de revistas, la guía «Cómo leer esta página» y el selector de proyecto.
            </EscapeCard>

            {active && finder.panelOpen && slots.sheet && createPortal(
                <FiltersPanel
                    embedded
                    advanced={finder.advanced}
                    shown={visible.length}
                    userPresets={finder.userPresets}
                    onChange={finder.patchAdvanced}
                    onReset={() => finder.setAdvanced(ADVANCED_DEFAULTS)}
                    onApplyPreset={finder.setAdvanced}
                    onSavePreset={finder.savePreset}
                    onDeletePreset={finder.deletePreset}
                    onClose={() => finder.closePanel(true)}
                    onApply={() => { finder.closePanel(true); }}
                />,
                slots.sheet,
            )}
            {trayVisible && slots.footer && createPortal(
                <CompareTray
                    embedded
                    collapsed={trayCollapsed}
                    onToggleCollapsed={() => setTrayCollapsed((collapsed) => !collapsed)}
                    journals={finder.comparedJournals}
                    affinityById={finder.affinityById}
                    onRemove={finder.toggleCompared}
                    onClear={finder.clearCompared}
                />,
                slots.footer,
            )}
        </div>
    );
}

export default function JournalsTab({ project, active, slots, onMeta }) {
    const { status, data, retry } = useLazyData(DATA_FILES.publicar, true);
    if (status === 'error') return <LoadError what="las revistas" onRetry={retry} />;
    if (status !== 'ready') return <PanelSkeleton />;
    return <JournalsLoaded data={data} project={project} active={active} slots={slots} onMeta={onMeta} />;
}
