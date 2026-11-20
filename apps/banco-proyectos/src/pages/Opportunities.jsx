import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AlertCircle, BookOpen, BookmarkCheck, CalendarDays, ChevronLeft } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import BackupPanel from '../components/opportunities/BackupPanel';
import OpportunitiesBoard from '../components/opportunities/OpportunitiesBoard';
import OpportunitiesSummary from '../components/opportunities/OpportunitiesSummary';
import OpportunitiesToolbar, { ActiveFilters } from '../components/opportunities/OpportunitiesToolbar';
import OpportunityCard from '../components/opportunities/OpportunityCard';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { calendarFile, readOpportunities, removeOpportunity, STATUS_LABELS, updateOpportunity } from '../lib/opportunities';
import { filterView, groupByType, hasDeadlines, itemKey, itemStatus, parseViewQuery, sortItems, statusCounts, typeCounts, viewFilters, viewToSearch } from '../lib/opportunitiesView';

// Error line: red text and icon on a tint, always with words (role="alert" announces it).
function ErrorNote({ children }) {
    return <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-sem-danger-fg">
        <AlertCircle size={18} aria-hidden="true" className="mt-px flex-none" />{children}
    </p>;
}

const plural = (n) => `${n} ${n === 1 ? 'oportunidad' : 'oportunidades'}`;

// Nothing saved yet: how to save and where (both finders, in their own hue).
function NothingSaved() {
    return <div data-opp-empty className="rounded-2xl border border-dashed border-sem-control-line bg-white px-6 py-10 text-center">
        <h3 className="m-0 text-lg font-bold text-gray-900">Todavía no guardaste oportunidades</h3>
        <p className="mx-auto mb-5 mt-2 max-w-xl text-[14.5px] text-gray-700">Pulsa «Guardar» en un evento o en una revista y aparecerá aquí, para darle seguimiento con un estado y notas propias.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/eventos" className="btn btn-events btn-lg focus-ring"><CalendarDays size={16} aria-hidden="true" />Buscar eventos</Link>
            <Link to="/donde-publicar" className="btn btn-journals btn-lg focus-ring"><BookOpen size={16} aria-hidden="true" />Dónde publicar</Link>
        </div>
    </div>;
}

export default function Opportunities() {
    useDocumentTitle('Mis oportunidades');
    const { search } = useLocation();
    const navigate = useNavigate();
    const [items, setItems] = useState(() => {
        try { return readOpportunities(localStorage); } catch { return null; }
    });
    const [error, setError] = useState('');
    const [drafts, setDrafts] = useState({}); // notes being typed, kept per card so a card that changes column keeps them
    const [announcement, setAnnouncement] = useState('');
    const [backupOpen, setBackupOpen] = useState(false);
    const listId = useId();
    const headingRef = useRef(null);
    const backupSummary = useRef(null);
    const statusSelects = useRef(new Map());
    const pendingFocus = useRef(null);

    const all = useMemo(() => items ?? [], [items]);
    const withDeadlines = hasDeadlines(all);
    const parsed = useMemo(() => parseViewQuery(search), [search]);
    // «Fecha límite más próxima» only exists while a saved event has a closing date.
    const state = useMemo(() => (parsed.sort === 'deadline' && !withDeadlines ? { ...parsed, sort: 'recent' } : parsed), [parsed, withDeadlines]);
    const visible = useMemo(() => sortItems(filterView(all, viewFilters(state)), state.sort), [all, state]);

    const go = (patch) => navigate({ search: viewToSearch({ ...parsed, ...patch }, search) }, { replace: true });
    const clearFilters = () => go({ type: 'all', status: 'all', query: '' });

    // After a status change the card may sit in another column, or be gone from a filtered list: the keyboard focus goes
    // to its status select, or to the list heading when it is no longer there.
    useEffect(() => {
        const key = pendingFocus.current;
        if (!key) return;
        pendingFocus.current = null;
        (statusSelects.current.get(key) ?? headingRef.current)?.focus({ preventScroll: true });
    }, [items]);

    const registerStatus = (key, element) => {
        if (element) statusSelects.current.set(key, element);
        else statusSelects.current.delete(key);
    };
    function setDraft(key, text) { setDrafts((current) => ({ ...current, [key]: text })); }
    function changeStatus(item, status) {
        try {
            updateOpportunity(localStorage, item.type, item.id, { status, note: item.note ?? '' });
            pendingFocus.current = itemKey(item);
            setItems(readOpportunities(localStorage));
            setAnnouncement(`Estado de ${item.title}: ${STATUS_LABELS[status]}.`);
        } catch { setError('No se pudieron guardar los cambios.'); }
    }
    function saveNote(item, note) {
        try {
            updateOpportunity(localStorage, item.type, item.id, { status: itemStatus(item), note });
            setItems(readOpportunities(localStorage));
            setDrafts(({ [itemKey(item)]: _saved, ...rest }) => rest); // eslint-disable-line no-unused-vars
            return true;
        } catch { return false; }
    }
    function remove(item) {
        try {
            removeOpportunity(localStorage, item.type, item.id);
            setItems(readOpportunities(localStorage));
        } catch { setError('No se pudieron actualizar los favoritos.'); }
    }
    function downloadCalendar(item, field) {
        const content = calendarFile(item, field);
        if (!content) { setError('La fecha no está disponible para el calendario.'); return; }
        const href = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }));
        const anchor = document.createElement('a');
        anchor.href = href;
        anchor.download = `${field === 'deadline' ? 'cierre' : 'evento'}.ics`;
        anchor.click();
        setTimeout(() => URL.revokeObjectURL(href), 1000);
    }
    function showBackup(event) {
        event.preventDefault();
        setBackupOpen(true);
        backupSummary.current?.focus();
        backupSummary.current?.scrollIntoView?.({ block: 'start' });
    }

    const renderCard = (item) => <OpportunityCard
        key={itemKey(item)}
        item={item}
        draft={drafts[itemKey(item)]}
        onDraft={setDraft}
        onStatus={changeStatus}
        onNote={saveNote}
        onRemove={remove}
        onCalendar={downloadCalendar}
        registerStatus={registerStatus}
    />;

    return <div className="py-8 space-y-5">
        <PageHeader
            hue="projects"
            icon={<BookmarkCheck size={26} />}
            eyebrow="Banco de proyectos"
            title="Mis oportunidades"
            back={{ to: '/proyectos', children: <><ChevronLeft size={18} aria-hidden="true" />Volver a los proyectos</> }}
            hideSaved
        >
            Guardadas solo en este navegador. No se sincronizan entre dispositivos y pueden perderse si se borran los datos del navegador.
        </PageHeader>
        {items === null && <ErrorNote>No se pueden leer los favoritos guardados. No se modificaron los datos.</ErrorNote>}
        {error && <ErrorNote>{error}</ErrorNote>}
        <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-sem-area-line bg-sem-area-bg px-4 py-2.5 text-[13.5px] text-gray-900">
            <span>Tus oportunidades se guardan solo en este navegador. Exporta un respaldo para no perderlas.</span>
            <a href="#respaldo" onClick={showBackup} className="link-action focus-ring rounded">Ir al respaldo</a>
        </p>
        {items && items.length > 0 && <OpportunitiesSummary
            total={all.length}
            counts={statusCounts(all, { type: state.type, query: state.query })}
            status={state.status}
            onStatus={(status) => go({ status })}
        />}
        {items && <section aria-labelledby={listId} className="space-y-4">
            <h2 id={listId} ref={headingRef} tabIndex={-1} className="m-0 text-xl font-bold text-gray-900 focus-visible:outline-none">Mis oportunidades</h2>
            {all.length === 0 && <NothingSaved />}
            {all.length > 0 && <>
                <OpportunitiesToolbar state={state} typeCounts={typeCounts(all, { status: state.status, query: state.query })} withDeadlines={withDeadlines} onChange={go} />
                <div className="space-y-2.5">
                    <p role="status" aria-live="polite" className="m-0 text-[15px] font-bold text-gray-900">{plural(visible.length)}</p>
                    <ActiveFilters state={state} statusLabels={STATUS_LABELS} onChange={go} onClear={clearFilters} showClear={visible.length > 0} />
                </div>
                {visible.length === 0 && <div data-opp-empty className="rounded-2xl border border-dashed border-sem-control-line bg-white px-6 py-8 text-center">
                    <p className="mb-3 mt-0 text-[15px] font-semibold text-gray-900">Ninguna oportunidad coincide</p>
                    <p className="mx-auto mb-4 mt-0 max-w-md text-[13.5px] text-gray-700">Prueba con otra palabra o quita algún filtro.</p>
                    <button type="button" onClick={clearFilters} className="btn btn-secondary">Limpiar filtros</button>
                </div>}
                {visible.length > 0 && state.view === 'board' && <OpportunitiesBoard items={visible} status={state.status} renderCard={renderCard} />}
                {visible.length > 0 && state.view === 'list' && groupByType(visible).filter((group) => group.items.length > 0).map((group) => <ListSection key={group.type} group={group} renderCard={renderCard} />)}
            </>}
        </section>}
        <p role="status" data-opp-announce className="sr-only">{announcement}</p>
        <BackupPanel open={backupOpen} onToggle={setBackupOpen} summaryRef={backupSummary} onImport={setItems} />
    </div>;
}

function ListSection({ group, renderCard }) {
    const headingId = useId();
    return <section aria-labelledby={headingId} className="space-y-3">
        <div className="flex items-center gap-2">
            <h3 id={headingId} className="m-0 text-[17px] font-bold text-gray-900">{group.label}</h3>
            <span className="count-pill">{group.items.length}</span>
        </div>
        <div data-opp-grid className="grid grid-cols-1 gap-4 min-[1100px]:grid-cols-2">{group.items.map(renderCard)}</div>
    </section>;
}
