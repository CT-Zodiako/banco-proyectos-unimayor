import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { TIP_TOUCH_QUERY, tipTarget } from '../lib/tips';

const CLOSED = { text: '', source: null };
const SHOWN_MS = 8000;

// Touch / narrow screens have no hover: tapping a badge or metric that carries a `data-tip` shows its text here, in a
// status region the screen reader announces. A second tap on the same element, a tap elsewhere, Esc, or a few
// seconds close it. With a mouse nothing happens: the CSS tooltip is the only one.
export default function TapTips() {
    const [tip, setTip] = useState(CLOSED);

    useEffect(() => {
        const onClick = (event) => {
            const touch = typeof window.matchMedia === 'function' && window.matchMedia(TIP_TOUCH_QUERY).matches;
            const source = touch ? tipTarget(event.target) : null;
            setTip((current) => (source && current.source !== source ? { text: source.getAttribute('data-tip'), source } : CLOSED));
        };
        const onKeyDown = (event) => { if (event.code === 'Escape') setTip(CLOSED); };
        document.addEventListener('click', onClick);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('click', onClick);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    useEffect(() => {
        if (!tip.text) return undefined;
        const timer = setTimeout(() => setTip(CLOSED), SHOWN_MS);
        return () => clearTimeout(timer);
    }, [tip]);

    // Outside #root so it stays announced when the project panel makes the rest of the app inert.
    return createPortal(
        <div role="status" aria-label="Ayuda" className="pointer-events-none fixed inset-x-4 bottom-4 z-[80] flex justify-center">
            {tip.text && (
                <p className="m-0 max-w-md rounded-lg bg-institutional-dark px-3.5 py-2.5 text-[13.5px] font-medium leading-snug text-white shadow-lg">{tip.text}</p>
            )}
        </div>,
        document.body,
    );
}
