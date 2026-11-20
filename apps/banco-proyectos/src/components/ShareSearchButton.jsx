import { useCallback, useEffect, useRef, useState } from 'react';
import { Share2 } from 'lucide-react';
import { COPIED_MS, FAILED_MS, SHARE_COPIED, SHARE_FAILED, SHARE_LABEL, copyText } from '../lib/share';

// «Compartir esta búsqueda»: copies the address of the page as it is now (the filters live in the URL), so it works with
// no filters too. The project comparison (T17) reuses it as «Compartir comparación» with `label` and the canonical `url`
// (an absolute address) of the comparison, without the ids it ignored. The label never changes; the result is announced
// in a polite live region that is always in the page (a region added together with its text is not announced) and
// empties itself after a few seconds.
export default function ShareSearchButton({ className = '', label = SHARE_LABEL, url }) {
    const [message, setMessage] = useState('');
    const timer = useRef(null);
    useEffect(() => () => clearTimeout(timer.current), []);

    const share = useCallback(async () => {
        const copied = await copyText(url ?? window.location.href);
        clearTimeout(timer.current);
        setMessage(copied ? SHARE_COPIED : SHARE_FAILED);
        timer.current = setTimeout(() => setMessage(''), copied ? COPIED_MS : FAILED_MS);
    }, [url]);

    return (
        <span className={`inline-flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
            <button type="button" onClick={share} className="btn btn-secondary focus-ring">
                <Share2 size={16} aria-hidden="true" />
                {label}
            </button>
            <span role="status" aria-live="polite" className={`text-[13.5px] font-semibold ${message === SHARE_FAILED ? 'text-sem-danger-fg' : 'text-sem-success-fg'}`}>{message}</span>
        </span>
    );
}
