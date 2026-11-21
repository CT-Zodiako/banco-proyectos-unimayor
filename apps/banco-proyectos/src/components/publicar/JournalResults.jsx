import { useId } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import CollapsibleLegend from '../CollapsibleLegend';
import { SKIP_LIST_MIN, SkipListEnd, SkipListLink } from '../SkipList';
import { JournalBadge } from './JournalBadges';
import JournalTable from './JournalTable';
import { QuartileBadge } from './JournalLinks';
import ResultItem from './ResultItem';
import { AFFINITY_CLASS, BTN_SECONDARY, NOTE } from './classes';
import { WEEKS_FAST, WEEKS_MEDIUM, journalBadges, nextSort } from '../../lib/publicar/display';
import { AFFINITY_THRESHOLDS } from '../../lib/publicar/table';

// Sample badges of the legend: built with the same function as the results, so they always look the same.
const SAMPLE = { languages: ['Spanish'], review: 'Double anonymous peer review', license: 'CC BY' };
const sample = (id, weeks = 6) => journalBadges({ ...SAMPLE, weeks_to_publication: weeks }).find((badge) => badge.id === id);
const SPEED_SAMPLES = [sample('speed', WEEKS_FAST), sample('speed', WEEKS_MEDIUM), sample('speed', WEEKS_MEDIUM + 4)];

function LegendRow({ label, children }) {
    return (
        <div className="flex flex-wrap items-center gap-x-[18px] gap-y-2">
            <span className="w-full font-bold text-gray-900 sm:w-auto sm:min-w-[88px]">{label}</span>
            {children}
        </div>
    );
}
const Item = ({ children }) => <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">{children}</span>;

// Above the results: what every color means, with the same ring, badges and quartile as the rows. Each swatch has its
// words next to it, so color is never the only signal.
export function ResultsLegend({ className = '' }) {
    const { high, mid } = AFFINITY_THRESHOLDS;
    const ring = (level, value) => (
        <span className={`aff-ring ${AFFINITY_CLASS[level]} !h-6 !w-6`} style={{ '--v': value }} aria-hidden="true"><i className="block h-[14px] w-[14px] rounded-full bg-white" /></span>
    );
    return (
        <CollapsibleLegend label="Cómo leer los resultados" hint="Colores y códigos" className={className} bodyClassName="grid gap-2.5">
            <LegendRow label="Afinidad">
                <span>encaje con tu proyecto:</span>
                <Item>{ring('high', 90)}<span><b className="text-gray-900">alta</b> {high} % o más</span></Item>
                <Item>{ring('mid', 70)}<span><b className="text-gray-900">media</b> {mid} a {high - 1} %</span></Item>
                <Item>{ring('low', 40)}<span><b className="text-gray-900">baja</b> menos de {mid} %</span></Item>
            </LegendRow>
            <LegendRow label="Cuartil">
                {['Q1', 'Q2', 'Q3', 'Q4'].map((quartile) => <QuartileBadge key={quartile} quartile={quartile} />)}
                <span>Q1 es el mejor cuartil y Q4 el cuarto (con su categoría Publindex)</span>
            </LegendRow>
            <LegendRow label="Etiquetas">
                <Item><JournalBadge badge={sample('free')} />sin APC ni otros cobros</Item>
                <Item><JournalBadge badge={sample('spanish')} />envío en español</Item>
                <Item><JournalBadge badge={sample('review')} />tipo de revisión</Item>
                <Item><JournalBadge badge={sample('license')} />licencia de uso</Item>
            </LegendRow>
            <LegendRow label="Publicación">
                <Item><JournalBadge badge={SPEED_SAMPLES[0]} /><span>{WEEKS_FAST} semanas o menos</span></Item>
                <Item><JournalBadge badge={SPEED_SAMPLES[1]} /><span>hasta {WEEKS_MEDIUM} semanas</span></Item>
                <Item><JournalBadge badge={SPEED_SAMPLES[2]} /><span>más de {WEEKS_MEDIUM} semanas</span></Item>
            </LegendRow>
            <LegendRow label="Requisitos">
                <Item><span className="badge badge-tone tn-good"><CheckCircle2 size={14} aria-hidden="true" className="flex-none" />Cumple</span>lo que la revista pide y el proyecto tiene</Item>
                <Item><span className="badge badge-tone tn-low"><XCircle size={14} aria-hidden="true" className="flex-none" />No cumple</span>lo que falta</Item>
            </LegendRow>
        </CollapsibleLegend>
    );
}

export function AffinityNote({ className = '' }) {
    return (
        <p className={`${NOTE} ${className}`}><strong>La afinidad no es una probabilidad de aceptación.</strong> Se calcula con el encaje temático (40), la exigencia del cuartil frente al nivel del proyecto (25), el tiempo de publicación (15), el idioma (10) y si la revista es iberoamericana (10). La aceptación depende de la calidad del artículo y de la revisión por pares; lea el alcance de cada revista y confirme en su sitio que no cobra antes de enviar.</p>
    );
}

// The journals of one project as a ranked list or a comparison table, or the empty message. `limit` shows only the
// first rows and onMore (with it) adds the "Cargar más" button; the page shows every row.
export default function JournalResults({ rows, mode, sort, onSort, compare, onToggleCompare, limit = Infinity, onMore, onClearFilters, listClassName = '' }) {
    const shown = rows.slice(0, limit);
    const id = useId();
    const moreId = `${id}-more`;
    const endId = `${id}-end`;
    const skippable = shown.length >= SKIP_LIST_MIN;
    return (
        <>
            {skippable && <SkipListLink label="Saltar la lista de revistas" endId={endId} moreId={onMore && shown.length < rows.length ? moreId : undefined} />}
            {rows.length > 0 && mode === 'list' && (
                <ul role="list" aria-label={`Lista de ${rows.length === 1 ? '1 revista' : `${rows.length} revistas`}`} className={`m-0 grid list-none gap-2.5 p-0 ${listClassName}`}>
                    {shown.map((row, index) => <li key={row.journal.id}><ResultItem row={row} open={index === 0} /></li>)}
                </ul>
            )}
            {rows.length > 0 && mode === 'table' && (
                <JournalTable rows={shown} sort={sort} compare={compare} onSort={(id) => onSort((current) => nextSort(current, id))} onToggleCompare={onToggleCompare} />
            )}
            {rows.length === 0 && !onClearFilters && (
                <p className="text-center p-7 text-sem-text-2 border border-dashed border-sem-control-line rounded-2xl bg-white">Ninguna revista cumple estos filtros. Quite algunos filtros o pruebe otro filtro guardado.</p>
            )}
            {rows.length === 0 && onClearFilters && (
                <div className="text-center p-7 text-sem-text-2 border border-dashed border-sem-control-line rounded-2xl bg-white">
                    <p>Ninguna revista cumple estos filtros. Quite algunos filtros o pruebe otro filtro guardado.</p>
                    <button type="button" onClick={onClearFilters} className={`${BTN_SECONDARY} mt-3`}>Quitar los filtros</button>
                </div>
            )}
            {onMore && rows.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4 text-[13.5px] text-gray-700">
                    <span aria-live="polite">Mostrando {shown.length} de {rows.length}</span>
                    {shown.length < rows.length && <button type="button" id={moreId} onClick={onMore} className={BTN_SECONDARY}>Cargar más</button>}
                </div>
            )}
            {skippable && <SkipListEnd id={endId}>Fin de la lista de revistas</SkipListEnd>}
        </>
    );
}
