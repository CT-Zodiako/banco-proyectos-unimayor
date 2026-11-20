import { AFFINITY_THRESHOLDS, AFFINITY_WORDS, affinityLevel } from '../../lib/publicar/table';

// Affinity as one blue ring with the number, and the level in words under it (one color, one meaning; the words
// carry the level). The events page passes its own level and thresholds (80 / 60); the default is the journal finder's (80 / 65).
export default function AffinityRing({ total, level = affinityLevel(total), thresholds = AFFINITY_THRESHOLDS }) {
    const range = { high: `${thresholds.high} % o más`, mid: `${thresholds.mid} a ${thresholds.high - 1} %`, low: `menos de ${thresholds.mid} %` }[level];
    return (
        <div className="flex flex-none flex-col items-center gap-1.5" data-tip={`Afinidad ${AFFINITY_WORDS[level]}: ${range}`}>
            <div role="img" aria-label={`Afinidad estimada ${total} %`} className="aff-ring" style={{ '--v': total }}>
                <div>{total}%</div>
            </div>
            <span className="aff-word">Afinidad {AFFINITY_WORDS[level]}</span>
        </div>
    );
}
