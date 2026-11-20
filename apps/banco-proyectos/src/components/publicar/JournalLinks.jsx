import { useState } from 'react';
import { BTN, DOWNLOAD, FOCUS } from './classes';
import { PUBLINDEX, quartileTip, safeUrl, templateLinks } from '../../lib/publicar/display';
import { favoriteLabel, favoriteSnapshot, toggleFavorite } from '../../lib/publicar/favorites';

const browserStorage = () => {
    try { return window.localStorage; } catch { return null; }
};

/** External link; renders nothing when the URL is not http(s). */
export function ExtLink({ url, children, className = '', ...rest }) {
    const href = safeUrl(url);
    return href ? <a href={href} target="_blank" rel="noopener noreferrer" className={`${className} ${FOCUS}`} {...rest}>{children}</a> : null;
}

// Quartile as text plus 1 to 4 bars (more bars = better quartile) and the Publindex category; no color of its own.
// The tooltip says what the quartile means; the page legend says it in words too.
export function QuartileBadge({ quartile, showPublindex = true }) {
    const rank = Number(String(quartile).slice(1));
    return (
        <span className="qb" data-tip={quartileTip(quartile)}>
            <span className="qb-bars" aria-hidden="true">
                {[1, 2, 3, 4].map((n) => <i key={n} className={n <= 5 - rank ? 'on' : ''} />)}
            </span>
            {quartile}
            {showPublindex && PUBLINDEX[quartile] && <small>· {PUBLINDEX[quartile]}</small>}
            <span className="sr-only"> en SCImago{showPublindex && PUBLINDEX[quartile] ? `, Publindex ${PUBLINDEX[quartile]}` : ''}</span>
        </span>
    );
}

/** Template files found on the journal's own site; the browser downloads them on click (same tab, no empty tab left). */
export function TemplateLinks({ journal, className = DOWNLOAD }) {
    return templateLinks(journal).map((link) => (
        <a key={link.url} href={link.url} download="" title={link.title} aria-label={link.ariaLabel} className={`${className} ${FOCUS}`}>{link.label}</a>
    ));
}

// "Guardar" uses the same store as the Mis oportunidades page; the label tells whether the journal is saved.
export function FavoriteButton({ journal, className = BTN }) {
    const [snapshot, setSnapshot] = useState(() => favoriteSnapshot(browserStorage(), journal.id));
    const [failed, setFailed] = useState(false);
    function toggle() {
        try {
            setSnapshot({ available: true, saved: toggleFavorite(browserStorage(), journal) });
            setFailed(false);
        } catch { setFailed(true); }
    }
    return (
        <button type="button" onClick={toggle} disabled={!snapshot.available} aria-label={`Guardar ${journal.title} en mis oportunidades`} className={className}>
            {failed ? 'No se pudo guardar' : favoriteLabel(snapshot)}
        </button>
    );
}
