import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BookOpen, CalendarDays, ChevronLeft, Layers, Scale } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PageSkeleton from '../components/PageSkeleton';
import ShareSearchButton from '../components/ShareSearchButton';
import { LevelDots } from '../components/ProjectCard';
import { LoadError } from '../components/proyecto-panel/PanelParts';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useProjects } from '../hooks/useProjects';
import { MAX_COMPARE, buildComparison, compareUrl, resolveIds, saveSelection, withCompareParam } from '../lib/compare-projects';
import { eventsForProjectUrl, savedCatalogUrl, wherePublishUrl } from '../lib/links';

// /proyectos/comparar?ids=a,b,c (T17): 2 or 3 projects side by side. A shareable URL: the ids are the only state.
// Layout choice: ONE semantic table (caption, column headers per project, row headers per criterion, row groups per
// section) inside a box that scrolls sideways, with a sticky first column so the criterion stays visible. A stacked card
// layout below 700 px was rejected: it would break the side-by-side reading that is the whole point and the row/column
// header relationships a screen reader announces. The box is focusable and named so the keyboard can scroll it.

const NOTES = 'Avisos de la comparación';
const plural = (n, one, many) => (n === 1 ? one : many);

// What was ignored in the `ids` param (unknown ids; valid ids past the third), each in a sentence of its own.
const notesOf = ({ unknown, extra }) => [
    unknown.length > 0 && `Se ${plural(unknown.length, 'ignoró', 'ignoraron')} ${unknown.length} ${plural(unknown.length, 'proyecto que no existe', 'proyectos que no existen')}: ${unknown.join(', ')}.`,
    extra > 0 && `Se comparan solo los ${MAX_COMPARE} primeros; se ${plural(extra, 'ignoró', 'ignoraron')} ${extra} más.`,
].filter(Boolean);

const TH_FIRST = 'sticky left-0 z-10 w-[104px] min-w-[104px] min-[700px]:w-[168px] min-[700px]:min-w-[168px] border-b border-r border-gray-200 bg-white px-3 py-3 text-left align-top text-[13px] font-bold text-gray-800';
const TD = 'min-w-[230px] border-b border-gray-100 bg-white px-3 py-3 align-top text-[14px] leading-relaxed text-gray-800';

const Empty = () => <span className="italic text-sem-text-2">No informado</span>;

const List = ({ items, count, unit }) => (
    <>
        {count !== undefined && <p className="mb-1 text-[13px] text-sem-text-2"><b className="font-bold text-gray-900">{count}</b> {unit}</p>}
        <ul className="m-0 list-disc space-y-1 pl-4 marker:text-gray-500">
            {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    </>
);

// One cell of the table by the kind of its row.
function Cell({ row, cell }) {
    if (cell.empty) return <Empty />;
    if (row.id === 'area') return <span className="badge badge-area"><Layers size={15} aria-hidden="true" className="flex-none" />{cell.text}</span>;
    if (row.kind === 'level') return <span className="badge badge-level"><LevelDots rank={cell.rank} />{cell.text}</span>;
    if (row.kind === 'list') return <List items={cell.items} count={row.id === 'hardware' || row.id === 'software' ? cell.count : undefined} unit={row.id === 'hardware' ? plural(cell.count, 'componente', 'componentes') : plural(cell.count, 'herramienta', 'herramientas')} />;
    return <p className="m-0">{cell.text}</p>;
}

function Actions({ column, onRemove }) {
    const { id, title } = column;
    return (
        <div className="flex flex-col items-start gap-2">
            <Link to={`/proyecto/${id}`} aria-label={`Ver proyecto: ${title}`} className="btn btn-primary !whitespace-normal text-center">Ver proyecto</Link>
            <Link to={wherePublishUrl(id)} aria-label={`Dónde publicar: ${title}`} className="btn btn-journals !whitespace-normal text-center">
                <span className="type-ico" aria-hidden="true"><BookOpen size={14} /></span>
                Dónde publicar
            </Link>
            <Link to={eventsForProjectUrl(id)} aria-label={`Ver eventos: ${title}`} className="btn btn-events !whitespace-normal text-center">
                <span className="type-ico" aria-hidden="true"><CalendarDays size={14} /></span>
                Ver eventos
            </Link>
            <button type="button" onClick={() => onRemove(id)} aria-label={`Quitar de la comparación: ${title}`} className="btn btn-tertiary !whitespace-normal">Quitar</button>
        </div>
    );
}

function Toggle({ checked, onChange, children }) {
    return (
        <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-[14px] font-semibold text-gray-800">
            <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-[18px] w-[18px] cursor-pointer accent-institutional-blue focus-ring" />
            {children}
        </label>
    );
}

function ComparisonTable({ model, highlight, hideEqual, onRemove, boxRef }) {
    const { columns, sections } = model;
    const span = columns.length + 1;
    const visible = sections
        .map((section) => ({ ...section, rows: hideEqual ? section.rows.filter((row) => row.differs) : section.rows }))
        .filter((section) => section.rows.length > 0);

    return (
        <div
            ref={boxRef}
            role="region"
            aria-label="Tabla de comparación, se desplaza hacia los lados"
            tabIndex={0}
            className="max-w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm focus-ring"
        >
            <table className="cmp-table tn-projects w-full border-separate border-spacing-0">
                <caption className="sr-only">Comparación de {columns.length} proyectos</caption>
                <thead>
                    <tr>
                        <th scope="col" className={`${TH_FIRST} z-20`}>Dato</th>
                        {columns.map((column) => (
                            <th key={column.id} scope="col" className="min-w-[230px] border-b border-gray-200 bg-blue-50 px-3 py-3 text-left align-top">
                                <p className="m-0 text-[12.5px] font-semibold text-sem-text-2">{column.kicker}</p>
                                <div className="mt-0.5 flex items-start gap-2">
                                    <span aria-hidden="true" className="text-[22px] leading-none">{column.emoji}</span>
                                    <Link to={`/proyecto/${column.id}`} className="text-[15px] font-bold leading-snug text-gray-900 hover:text-institutional-blue hover:underline hover:underline-offset-[3px] focus-ring rounded">
                                        {column.title}
                                    </Link>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                {visible.map((section) => (
                    <tbody key={section.id}>
                        <tr>
                            <th scope="rowgroup" colSpan={span} className="border-b border-gray-200 bg-gray-50 px-3 py-2 text-left text-[12px] font-extrabold uppercase tracking-wider text-gray-800">
                                <span className="sticky left-3 inline-block">{section.title}</span>
                            </th>
                        </tr>
                        {section.rows.map((row) => (
                            <tr key={row.id} data-differs={highlight ? String(row.differs) : undefined}>
                                <th scope="row" className={TH_FIRST}>
                                    {row.label}
                                    {highlight && row.differs && <span className="badge badge-tone tn-projects mt-1 flex w-fit min-[700px]:ml-1.5 min-[700px]:mt-0 min-[700px]:inline-flex min-[700px]:align-middle">Difiere</span>}
                                </th>
                                {row.cells.map((cell, index) => (
                                    <td key={columns[index].id} className={TD}><Cell row={row} cell={cell} /></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                ))}
                <tbody>
                    <tr>
                        <th scope="row" className={TH_FIRST}>Acciones</th>
                        {columns.map((column) => <td key={column.id} className={TD}><Actions column={column} onRemove={onRemove} /></td>)}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

const CompareProjects = () => {
    useDocumentTitle('Comparar proyectos');
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { projects, loading, error, retry } = useProjects();
    const [highlight, setHighlight] = useState(true);
    const [hideEqual, setHideEqual] = useState(false);
    const [announcement, setAnnouncement] = useState('');
    const boxRef = useRef(null);
    const emptyRef = useRef(null);
    const refocus = useRef(false);

    const raw = params.get('ids');
    const known = useMemo(() => new Set(projects.map((project) => project.id)), [projects]);
    const { ids, unknown, extra } = useMemo(() => resolveIds(raw, known), [raw, known]);
    const chosen = useMemo(() => ids.map((id) => projects.find((project) => project.id === id)), [ids, projects]);
    const ready = ids.length >= 2;
    const model = useMemo(() => (ready ? buildComparison(chosen) : null), [ready, chosen]);
    const key = ids.join(',');

    // «Quitar» removes the button that had the focus: the focus goes to the table (or to the empty state) and a polite
    // message says what happened.
    useEffect(() => {
        if (!refocus.current) return;
        refocus.current = false;
        (boxRef.current ?? emptyRef.current)?.focus();
    }, [key]);

    if (error) return <div className="py-8"><LoadError what="la comparación" onRetry={retry} /></div>;
    if (loading) return <PageSkeleton what="la comparación" />;

    const notes = notesOf({ unknown, extra });
    const catalogUrl = withCompareParam(savedCatalogUrl(), ids);
    const remove = (id) => {
        const next = ids.filter((other) => other !== id);
        const removed = model.columns.find((column) => column.id === id);
        saveSelection(next);
        refocus.current = true;
        setAnnouncement(`Se quitó «${removed.title}» de la comparación.`);
        navigate(compareUrl(next), { replace: true });
    };

    return (
        <div className="space-y-5 py-8">
            <PageHeader
                hue="projects"
                icon={<Scale size={26} />}
                eyebrow="Banco de proyectos"
                title="Comparar proyectos"
                back={{ to: catalogUrl, children: <><ChevronLeft size={18} aria-hidden="true" />Volver a los proyectos</> }}
            >
                Pon 2 o 3 proyectos lado a lado: su problema, clasificación, alcance, objetivos e impacto.
            </PageHeader>

            {notes.length > 0 && (
                <div role="status" aria-label={NOTES} className="space-y-1 rounded-xl border border-sem-control-line bg-white px-4 py-3 text-[14px] text-gray-800">
                    {notes.map((note) => <p key={note} className="m-0">{note}</p>)}
                </div>
            )}
            <p role="status" aria-live="polite" className="sr-only">{announcement}</p>

            {ready ? (
                <>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                        <ShareSearchButton label="Compartir comparación" url={`${window.location.origin}${compareUrl(ids)}`} />
                        <Toggle checked={highlight} onChange={setHighlight}>Resaltar diferencias</Toggle>
                        <Toggle checked={hideEqual} onChange={setHideEqual}>Ocultar filas iguales</Toggle>
                    </div>
                    <p className="m-0 text-[13.5px] text-sem-text-2">
                        {highlight ? 'Las filas marcadas «Difiere» tienen valores distintos entre los proyectos. ' : ''}
                        <span className="min-[900px]:hidden">Desliza la tabla hacia los lados para ver todos los proyectos.</span>
                    </p>
                    <ComparisonTable model={model} highlight={highlight} hideEqual={hideEqual} onRemove={remove} boxRef={boxRef} />
                </>
            ) : (
                <section aria-labelledby="compare-empty" className="rounded-2xl border border-dashed border-sem-control-line bg-white px-6 py-12 text-center">
                    <div className="mb-3 text-5xl" aria-hidden="true">⚖️</div>
                    <h2 id="compare-empty" ref={emptyRef} tabIndex={-1} className="text-xl font-bold text-gray-900">Elige al menos 2 proyectos para compararlos</h2>
                    <p className="mx-auto mt-2 max-w-xl text-[15px] text-gray-700">
                        Marca «Comparar» en 2 o 3 tarjetas del catálogo y pulsa «Comparar ahora». También puedes abrir aquí un enlace compartido de una comparación.
                    </p>
                    <Link to={catalogUrl} className="btn btn-primary btn-lg mt-5">Elegir proyectos en el catálogo</Link>
                </section>
            )}
        </div>
    );
};

export default CompareProjects;
