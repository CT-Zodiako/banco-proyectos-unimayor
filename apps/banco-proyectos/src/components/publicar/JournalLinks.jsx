import { useState } from 'react';
import { QUARTILE_CLASSES, BTN, DOWNLOAD, FOCUS } from './classes';
import { PUBLINDEX, safeUrl, templateLinks } from '../../lib/publicar/display';
import { favoriteLabel, favoriteSnapshot, toggleFavorite } from '../../lib/publicar/favorites';

const browserStorage = () => {
    try { return window.localStorage; } catch { return null; }
};

/** External link; renders nothing when the URL is not http(s). */
export function ExtLink({ url, children, className = '', ...rest }) {
    const href = safeUrl(url);
    return href ? <a href={href} target="_blank" rel="noopener noreferrer" className={`${className} ${FOCUS}`} {...rest}>{children}</a> : null;
}

export function QuartileBadge({ quartile }) {
    return (
        <span
            title={`Cuartil ${quartile} en SCImago · Publindex ${PUBLINDEX[quartile]}`}
            className={`inline-block text-white font-bold text-xs rounded-md px-[7px] py-[3px] ${QUARTILE_CLASSES[quartile] || 'bg-gray-500'}`}
        >
            {quartile}
        </span>
    );
}

/** Template files found on the journal's own site; the browser downloads them on click (same tab, no empty tab left). */
export function TemplateLinks({ journal, className = DOWNLOAD }) {
    return templateLinks(journal).map((link) => (
        <a key={link.url} href={link.url} download="" title={link.title} aria-label={link.ariaLabel} className={className}>{link.label}</a>
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
