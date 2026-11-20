import { ExtLink, FavoriteButton, QuartileBadge, TemplateLinks } from './JournalLinks';
import { BTN, BTN_PRIMARY, FOCUS, RING_COLORS } from './classes';
import { AFFINITY_LABELS, PUBLINDEX, journalMeta, safeUrl } from '../../lib/publicar/display';
import { AFFINITY_MAX, affinityLevel } from '../../lib/publicar/table';

function AffinityRing({ total }) {
    return (
        <div
            role="img"
            aria-label={`Afinidad estimada ${total} %`}
            className="w-[72px] h-[72px] rounded-full grid place-items-center"
            style={{ background: `conic-gradient(${RING_COLORS[affinityLevel(total)]} ${total}%, #F3F4F6 0)` }}
        >
            <div className="w-[58px] h-[58px] rounded-full bg-white grid place-items-center text-center leading-none">
                <span>
                    <b className="block text-lg text-gray-900">{total}%</b>
                    <span className="block mt-[3px] text-[9.5px] text-gray-500 uppercase tracking-wide">afinidad</span>
                </span>
            </div>
        </div>
    );
}

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
                        <em className="not-italic text-xs text-gray-500 text-right tabular-nums">{value}/{max}</em>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[18px] gap-y-2.5 mt-3">
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

// One journal of the list view: affinity ring, "¿Por qué X %?" explanation, templates, instructions and links.
export default function ResultItem({ row: { journal, affinity, assessment }, open }) {
    const hasTemplates = (journal.templates || []).length > 0;
    return (
        <article className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-blue-100 hover:shadow-md transition-shadow px-4 py-3.5 grid grid-cols-[72px_minmax(0,1fr)] md:grid-cols-[84px_minmax(0,1fr)_auto] gap-4 items-center">
            <AffinityRing total={affinity.total} />
            <div className="min-w-0">
                <h3 className="m-0 mb-[3px] text-[15.5px] font-bold text-gray-900 flex flex-wrap items-center gap-2">
                    {safeUrl(journal.url)
                        ? <ExtLink url={journal.url} className="text-inherit no-underline hover:text-institutional-blue hover:underline">{journal.title}</ExtLink>
                        : journal.title}
                    <QuartileBadge quartile={journal.quartile} />
                    <span className="text-xs font-semibold text-gray-600">Publindex {PUBLINDEX[journal.quartile]}</span>
                </h3>
                <div className="text-[13px] text-gray-500">{journalMeta(journal)}</div>
                <details open={open} className="mt-1.5 text-[13px]">
                    <summary className={`cursor-pointer text-institutional-blue font-semibold inline-block rounded-md ${FOCUS}`}>
                        ¿Por qué {affinity.total} %?
                        <span className="font-normal text-gray-500"> · cumple {assessment.meets.length} · no cumple {assessment.misses.length}</span>
                    </summary>
                    <Breakdown affinity={affinity} />
                    <Assessment assessment={assessment} />
                </details>
            </div>
            <div className="col-span-full md:col-span-1 flex flex-col gap-1.5 items-stretch md:min-w-[190px]">
                <TemplateLinks journal={journal} />
                <ExtLink url={journal.author_instructions_url} className={hasTemplates ? BTN : BTN_PRIMARY}>Instrucciones para autores</ExtLink>
                <FavoriteButton journal={journal} />
                <div className="flex flex-wrap justify-center gap-x-2 text-[12.5px] font-semibold">
                    <ExtLink url={journal.aims_scope_url} className="no-underline hover:underline text-institutional-blue">Alcance</ExtLink>
                    <ExtLink url={journal.url} className="no-underline hover:underline text-institutional-blue">Sitio</ExtLink>
                    <ExtLink url={journal.doaj_url} className="no-underline hover:underline text-institutional-blue">DOAJ</ExtLink>
                    <ExtLink url={journal.scimago_url} className="no-underline hover:underline text-institutional-blue">SCImago</ExtLink>
                </div>
            </div>
        </article>
    );
}

