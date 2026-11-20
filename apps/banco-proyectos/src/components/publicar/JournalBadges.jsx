import { Clock, Eye, Hourglass, Languages, Scale, Unlock, Zap } from 'lucide-react';
import { TONE_CLASS } from './classes';
import { journalBadges } from '../../lib/publicar/display';

// One icon per badge (and one per speed level), so no badge is told apart by color alone.
const ICONS = { free: Unlock, spanish: Languages, review: Eye, license: Scale, fast: Zap, mid: Clock, slow: Hourglass };

/** A soft colored badge: icon + text (+ the speed word), the hue is the tone of palette.js, the tip says it in words. */
export function JournalBadge({ badge }) {
    const Icon = ICONS[badge.level || badge.id];
    return (
        <span className={`badge badge-tone ${TONE_CLASS[badge.tone]}`} data-tip={badge.tip}>
            <Icon size={14} aria-hidden="true" className="flex-none" />
            {badge.label}
            {badge.word && <span className="font-medium"> · {badge.word}</span>}
        </span>
    );
}

/** The calm row of a journal: Sin costo, Acepta español, review type, speed and license (at most five). */
export function JournalBadges({ journal, className = '' }) {
    return (
        <div role="group" aria-label="Datos de la revista" className={`flex flex-wrap items-center gap-1.5 ${className}`}>
            {journalBadges(journal).map((badge) => <JournalBadge key={badge.id} badge={badge} />)}
        </div>
    );
}

/** One badge of a journal for a table cell (speed, review, license), or the fallback (a dash) when the journal does not say. */
export function BadgeCell({ journal, id, fallback = '—' }) {
    const badge = journalBadges(journal).find((item) => item.id === id);
    return badge ? <JournalBadge badge={badge} /> : fallback;
}
