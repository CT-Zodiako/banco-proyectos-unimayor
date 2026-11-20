import { ExtLink, QuartileBadge, TemplateLinks } from './JournalLinks';
import { FIT_CLASSES, FOCUS } from './classes';
import { FIT_LABELS, affinityParts, countryLabel, formatSjr, languageLabel, reviewLabel, safeUrl } from '../../lib/publicar/display';
import { MAX_COMPARE, affinityWord } from '../../lib/publicar/table';

const COLUMNS = [
    { id: 'title', label: 'Revista' }, { id: 'affinity', label: 'Afinidad' }, { id: 'quartile', label: 'Cuartil · Publindex' },
    { id: 'sjr', label: 'SJR' }, { id: 'h_index', label: 'Índice H' }, { id: 'weeks', label: 'Semanas' },
    { label: 'Idiomas' }, { label: 'Revisión' }, { label: 'Licencia' }, { label: 'Encaje' }, { label: 'Formato' },
];
const TH = 'text-left text-[12px] font-bold uppercase tracking-wider bg-gray-50 px-3 py-[11px] border-b border-gray-200';
const TD = 'px-3 py-[11px] border-b border-gray-100 text-gray-700 align-middle group-last:border-b-0';
const LINK = 'link-action !min-h-[28px] !py-0.5 !text-[12.5px]';
const DOWNLOAD = 'btn btn-secondary !min-h-[30px] max-w-[160px] overflow-hidden text-ellipsis !px-2.5 !text-[12.5px]';

function AffinityCell({ affinity }) {
    return (
        <div className="flex items-center gap-2 whitespace-nowrap tabular-nums" title={`Afinidad estimada: ${affinityParts(affinity)}`}>
            <b className="min-w-[38px] text-sm text-gray-900">{affinity.total} %</b>
            <i aria-hidden="true" className="block w-11 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <span className="block h-full rounded-full bg-institutional-blue" style={{ width: `${affinity.total}%` }} />
            </i>
            <span className="text-[13px] font-semibold text-gray-700">{affinityWord(affinity.total)}</span>
        </div>
    );
}

function FormatLinks({ journal }) {
    return (
        <div className="flex flex-col gap-1 whitespace-nowrap items-start">
            <TemplateLinks journal={journal} className={DOWNLOAD} />
            <ExtLink url={journal.author_instructions_url} className={LINK} aria-label={`Formato de publicación de ${journal.title} (instrucciones para autores)`}>Instrucciones ↗</ExtLink>
            <ExtLink url={journal.aims_scope_url} className={LINK} aria-label={`Alcance de ${journal.title} (aims and scope)`}>Alcance ↗</ExtLink>
        </div>
    );
}

function JournalName({ journal }) {
    return (
        <>
            {safeUrl(journal.url)
                ? <ExtLink url={journal.url} className="block font-bold text-sm text-gray-900 no-underline hover:text-institutional-blue hover:underline">{journal.title}</ExtLink>
                : <b className="block text-sm text-gray-900">{journal.title}</b>}
            <span className="text-xs text-sem-text-2">{[journal.publisher, countryLabel(journal.country)].filter(Boolean).join(' · ')}</span>
        </>
    );
}

// Design 02: sortable comparison table. Header buttons sort; the checkbox column selects up to three journals to compare.
export default function JournalTable({ rows, sort, compare, onSort, onToggleCompare }) {
    const full = compare.length >= MAX_COMPARE;
    const ariaSort = (id) => (id && sort.key === id ? (sort.dir === 'asc' ? 'ascending' : 'descending') : undefined);
    return (
        <div className="overflow-x-auto bg-white border border-gray-100 rounded-2xl shadow-sm">
            <table className="w-full border-collapse text-[13.5px] min-w-[1180px]">
                <caption className="sr-only">Revistas sugeridas para el proyecto; los encabezados ordenan la tabla</caption>
                <thead>
                    <tr>
                        <th scope="col" className={TH}><span className="sr-only">Comparar</span></th>
                        {COLUMNS.map(({ id, label }) => (
                            <th key={label} scope="col" aria-sort={ariaSort(id)} className={`${TH} ${ariaSort(id) ? 'text-institutional-blue' : 'text-gray-700'}`}>
                                {id
                                    ? (
                                        <button type="button" onClick={() => onSort(id)} className={`uppercase tracking-wider font-bold hover:text-institutional-blue rounded ${FOCUS}`}>
                                            {label}
                                            {ariaSort(id) && <span aria-hidden="true">{sort.dir === 'asc' ? ' ↑' : ' ↓'}</span>}
                                        </button>
                                    )
                                    : label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(({ match, journal, affinity }) => {
                        const selected = compare.includes(journal.id);
                        return (
                            <tr key={journal.id} className={`group ${selected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                                <td className={TD}>
                                    <input
                                        type="checkbox"
                                        aria-label={`Comparar ${journal.title}`}
                                        checked={selected}
                                        disabled={!selected && full}
                                        title={!selected && full ? `Máximo ${MAX_COMPARE} revistas` : undefined}
                                        onChange={() => onToggleCompare(journal.id)}
                                        className={`w-[18px] h-[18px] accent-institutional-blue cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 ${FOCUS}`}
                                    />
                                </td>
                                <td className={`${TD} min-w-[220px]`}><JournalName journal={journal} /></td>
                                <td className={TD}><AffinityCell affinity={affinity} /></td>
                                <td className={`${TD} tabular-nums whitespace-nowrap`}><QuartileBadge quartile={journal.quartile} /></td>
                                <td className={`${TD} tabular-nums whitespace-nowrap`}>{formatSjr(journal.sjr)}</td>
                                <td className={`${TD} tabular-nums whitespace-nowrap`}>{journal.h_index ?? '—'}</td>
                                <td className={`${TD} tabular-nums whitespace-nowrap`}>{journal.weeks_to_publication ?? '—'}</td>
                                <td className={TD}>{(journal.languages || []).map(languageLabel).join(', ')}</td>
                                <td className={TD}>{reviewLabel(journal.review)}</td>
                                <td className={TD}>{journal.license || '—'}</td>
                                <td className={TD}>
                                    <span className={`badge whitespace-nowrap ${FIT_CLASSES[match.fit] || FIT_CLASSES.sector}`}>{FIT_LABELS[match.fit] || match.fit}</span>
                                </td>
                                <td className={TD}><FormatLinks journal={journal} /></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
