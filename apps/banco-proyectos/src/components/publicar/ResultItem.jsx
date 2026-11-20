import { ChevronDown } from 'lucide-react';
import AffinityRing from './AffinityRing';
import { ExtLink, FavoriteButton, QuartileBadge, TemplateLinks } from './JournalLinks';
import { FOCUS } from './classes';
import { AFFINITY_LABELS, journalMeta, safeUrl } from '../../lib/publicar/display';
import { AFFINITY_MAX } from '../../lib/publicar/table';

const MORE_LINK = 'btn btn-tertiary !min-h-[32px]';

function Breakdown({ affinity }) {
    return (
        <div className="grid grid-cols-[1fr_64px_44px] md:grid-cols-[minmax(150px,210px)_minmax(80px,1fr)_48px] gap-x-2.5 gap-y-1.5 items-center mt-2 text-gray-600">
            {Object.entries(affinity.parts).map(([key, value]) => {
                const max = AFFINITY_MAX[key];
                return (
                    <div key={key} className="contents">
                        <span>{AFFINITY_LABELS[key]}</span>
                        <i role="img" aria-label={`${value} de ${max}`} className="block h-2 rounded-full bg-gray-100 overflow-hidden">
                            <span className="block h-full bg-institutional-blue" style={{ width: `${Math.round((value / max) * 100)}%` }} />
                        </i>
                        <em className="not-italic text-xs text-sem-text-2 text-right tabular-nums">{value}/{max}</em>
                    </div>
                );
            })}
        </div>
    );
}

function Items({ list, className, mark }) {
    return (
        <ul className={`m-0 p-0 list-none grid gap-[3px] text-gray-700 ${className}`}>
            {list.map((item) => (
                <li key={item.key || item} className="flex gap-1.5 leading-snug">
                    <span aria-hidden="true" className="flex-none w-3.5 font-bold">{mark}</span>
                    {item.text || item}
                </li>
            ))}
        </ul>
    );
}

const H4 = ({ children }) => <h4 className="m-0 mb-1 text-xs font-bold uppercase tracking-wide text-gray-600">{children}</h4>;

// What the journal meets and misses for the project, in words, plus recommendations.
function Assessment({ assessment }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[18px] gap-y-2.5 mt-3 min-[1536px]:mt-2">
            <div>
                <H4>Cumple ({assessment.meets.length})</H4>
                <Items list={assessment.meets} className="[&_span]:text-green-700" mark="✓" />
            </div>
            {assessment.misses.length > 0 && (
                <div>
                    <H4>No cumple ({assessment.misses.length})</H4>
                    <Items list={assessment.misses} className="[&_span]:text-red-700" mark="✗" />
                </div>
            )}
            <div className="md:col-span-full bg-gray-50 rounded-[10px] px-2.5 py-2">
                <H4>Recomendaciones</H4>
                <Items list={assessment.tips} className="[&_span]:text-institutional-blue" mark="→" />
            </div>
        </div>
    );
}

// One journal of the list view: affinity ring with its word, quartile badge, "Ver por qué" explanation, the one
// primary action (instructions for authors), secondary actions (templates, save) and a tertiary "Más información" row.
export default function ResultItem({ row: { journal, affinity, assessment }, open }) {
    return (
        <article className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:border-sem-area-line hover:shadow-md transition-shadow p-4 grid grid-cols-[84px_minmax(0,1fr)] md:grid-cols-[92px_minmax(0,1fr)_auto] gap-x-4 gap-y-3 items-start">
            <AffinityRing total={affinity.total} />
            {/* Below md the ring sits beside the title and the rest takes the full width (max-md:contents). */}
            <div className="min-w-0 max-md:contents">
                <div className="min-w-0">
                    <h3 className="m-0 mb-1 text-[16px] leading-snug font-bold text-gray-900 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        {safeUrl(journal.url)
                            ? <ExtLink url={journal.url} className="text-inherit no-underline hover:text-institutional-blue hover:underline rounded">{journal.title}</ExtLink>
                            : journal.title}
                        <QuartileBadge quartile={journal.quartile} />
                    </h3>
                    <div className="text-[13px] text-sem-text-2">{journalMeta(journal)}</div>
                </div>
                <div className="min-w-0 max-md:col-span-full">
                    <div role="group" aria-label="Más información" className="flex flex-wrap items-center gap-x-0.5 text-[13px] md:mt-1.5">
                        <span className="mr-1 font-semibold text-sem-text-2">Más información:</span>
                        <ExtLink url={journal.aims_scope_url} className={MORE_LINK}>Alcance</ExtLink>
                        <ExtLink url={journal.url} className={MORE_LINK}>Sitio</ExtLink>
                        <ExtLink url={journal.doaj_url} className={MORE_LINK}>DOAJ</ExtLink>
                        <ExtLink url={journal.scimago_url} className={MORE_LINK}>SCImago</ExtLink>
                    </div>
                    <details open={open} className="group mt-1.5 text-[13px]">
                        <summary className={`inline-flex min-h-[32px] cursor-pointer list-none flex-wrap items-center gap-x-1.5 rounded-md py-1 text-[13.5px] font-semibold text-institutional-blue hover:text-blue-800 [&::-webkit-details-marker]:hidden ${FOCUS}`}>
                            <span className="whitespace-nowrap underline underline-offset-[3px]">Ver por qué {affinity.total} % de afinidad</span>
                            <span className="whitespace-nowrap font-normal text-sem-text-2">· cumple {assessment.meets.length} · no cumple {assessment.misses.length}</span>
                            <ChevronDown size={15} aria-hidden="true" className="flex-none transition-transform group-open:rotate-180" />
                        </summary>
                        {/* From 1536px the score breakdown and the assessment sit side by side instead of stretching over the full width. */}
                        <div className="min-[1536px]:grid min-[1536px]:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] min-[1536px]:gap-x-10 min-[1536px]:items-start">
                            <Breakdown affinity={affinity} />
                            <Assessment assessment={assessment} />
                        </div>
                    </details>
                </div>
            </div>
            <div className="col-span-full md:col-span-1 flex flex-col gap-2 items-stretch md:min-w-[200px]">
                <ExtLink url={journal.author_instructions_url} className="btn btn-primary">Instrucciones para autores</ExtLink>
                <TemplateLinks journal={journal} />
                <FavoriteButton journal={journal} />
            </div>
        </article>
    );
}
