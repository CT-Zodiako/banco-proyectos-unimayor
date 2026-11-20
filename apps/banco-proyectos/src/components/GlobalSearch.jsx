import { useCallback, useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { DialogLoader } from './RouteLoader';
import { lazyRoute } from '../lib/lazyRoute';
import { shortcutHint } from '../lib/globalSearch';

// The dialog (and the search code behind it) is its own chunk, downloaded the first time the button is reached.
const GlobalSearchDialog = lazyRoute(() => import('./GlobalSearchDialog'));

const FIELDS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);
const isTyping = (target) => target instanceof HTMLElement
    && (FIELDS.has(target.tagName) || target.isContentEditable === true || target.closest('[contenteditable]:not([contenteditable="false"])') !== null);
// A modal dialog of the page (the project panel, «Proponer proyecto») keeps the keyboard to itself.
const otherModalOpen = () => document.querySelector('[role="dialog"][aria-modal="true"]') !== null;

const platform = () => (typeof navigator === 'undefined' ? '' : navigator.userAgentData?.platform || navigator.platform || '');

// «Buscar» button of the navbar plus its shortcuts (Ctrl/Cmd+K anywhere, «/» outside text fields). The dialog is only
// mounted while it is open, so the projects, events and journals it needs are not downloaded before the first time.
export default function GlobalSearch() {
    const [open, setOpen] = useState(false);
    const [hint] = useState(() => shortcutHint(platform()));
    const buttonRef = useRef(null);
    const openerRef = useRef(null);
    const returnTo = useRef(null);

    const show = useCallback(() => {
        openerRef.current = document.activeElement;
        setOpen(true);
    }, []);

    const close = useCallback(({ navigated } = {}) => {
        returnTo.current = navigated ? 'page' : 'opener';
        setOpen(false);
    }, []);

    // After the dialog is gone (and the page is no longer inert): back to what had the focus, or to the new page.
    useEffect(() => {
        if (open || !returnTo.current) return;
        const mode = returnTo.current;
        returnTo.current = null;
        const opener = openerRef.current;
        if (mode === 'page') {
            document.getElementById('contenido')?.focus({ preventScroll: true });
        } else if (opener instanceof HTMLElement && opener !== document.body && opener.isConnected) {
            opener.focus();
        } else {
            buttonRef.current?.focus();
        }
    }, [open]);

    useEffect(() => {
        const onKeyDown = (event) => {
            const { key } = event;
            if (event.defaultPrevented || event.isComposing || typeof key !== 'string') return;
            const withModifier = event.ctrlKey || event.metaKey;
            if (withModifier && !event.altKey && key.toLowerCase() === 'k') {
                if (!open && otherModalOpen()) return;
                event.preventDefault();
                if (!open) show();
            } else if (key === '/' && !withModifier && !event.altKey && !open && !isTyping(event.target) && !otherModalOpen()) {
                event.preventDefault();
                show();
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [open, show]);

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                onClick={show}
                onMouseEnter={GlobalSearchDialog.prefetch}
                onFocus={GlobalSearchDialog.prefetch}
                onTouchStart={GlobalSearchDialog.prefetch}
                aria-label="Buscar en todo el sitio"
                aria-haspopup="dialog"
                aria-keyshortcuts="Control+K Meta+K"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/10 px-2.5 text-[15px] font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-institutional-yellow md:px-3"
            >
                <Search size={18} aria-hidden="true" className="flex-none" />
                <span className="hidden md:inline min-[1024px]:max-[1535px]:sr-only">Buscar</span>
                <kbd aria-hidden="true" className="hidden rounded border border-white/40 px-1.5 py-px font-sans text-xs font-semibold text-white/90 md:inline">{hint}</kbd>
            </button>
            {open && <DialogLoader what="la búsqueda" onClose={() => close()}><GlobalSearchDialog onClose={close} /></DialogLoader>}
        </>
    );
}
