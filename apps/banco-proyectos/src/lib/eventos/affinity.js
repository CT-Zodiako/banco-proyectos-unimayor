/* Project → events cross: estimated affinity (0–100) of an event for a bank project, and the ranking built on it.
   Ported from pipelines/eventos/site/filters.js. The estimate is never an acceptance probability. */
import { daysLeft, isExpired, normalize, SORT_VALUES } from './filters.js';

export const AFFINITY_MAX = { topics: 60, keywords: 20, access: 10, time: 10 };
const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** True when the keyword appears in the text as a whole word or phrase, ignoring case and accents
    ("vision" matches "Visión"; "ros" does not match "across"). */
export function hasKeyword(text, keyword) {
    const words = normalize(keyword).split(/[^a-z0-9]+/).filter(Boolean);
    if (!words.length) return false;
    const phrase = words.map(escapeRegExp).join('[^a-z0-9]+');
    return new RegExp(`(^|[^a-z0-9])${phrase}($|[^a-z0-9])`).test(normalize(text));
}

/** Estimated affinity (0–100) of an event for a project:
    - topics: 60 × shared topics / project topics, rounded;
    - keywords: 10 per project keyword found in the event title or name, at most 20;
    - access: 10 when the event is in Colombia or online;
    - time to prepare: events to attend 10; a cfp closing in ≥ 21 days 10, 7–20 days 5, < 7 days 0, and 5 when
      it has no published deadline (unknown, so half the points). */
export function affinity(event, project, today) {
    const projectTopics = project.topics || [];
    const eventTopics = event.topics || [];
    const sharedTopics = projectTopics.filter((t) => eventTopics.includes(t));
    const haystack = `${event.title || ''} ${event.name || ''}`;
    const keywordHits = (project.keywords || []).filter((k) => hasKeyword(haystack, k));
    let time = AFFINITY_MAX.time;
    if (event.kind === 'cfp') {
        const days = daysLeft(event, today);
        time = days === null ? 5 : days >= 21 ? 10 : days >= 7 ? 5 : 0;
    }
    const parts = {
        topics: projectTopics.length ? Math.round((AFFINITY_MAX.topics * sharedTopics.length) / projectTopics.length) : 0,
        keywords: Math.min(AFFINITY_MAX.keywords, 10 * keywordHits.length),
        access: event.online || normalize(event.country) === 'colombia' ? AFFINITY_MAX.access : 0,
        time,
    };
    const total = parts.topics + parts.keywords + parts.access + parts.time;
    return { total, parts, sharedTopics, keywordHits };
}

/** Color level of an affinity total, like donde-publicar: "high" ≥ 80, "mid" ≥ 60, "low" otherwise. */
export function affinityLevel(total) {
    return total >= 80 ? 'high' : total >= 60 ? 'mid' : 'low';
}

/** [{event, affinity}] for the open events sharing at least one topic with the project, sorted by affinity
    (highest first), then by closing date like the "deadline" sort (missing dates last). */
export function rankForProject(events, project, today) {
    const topics = project.topics || [];
    const closing = SORT_VALUES.deadline;
    return events
        .filter((event) => !isExpired(event, today) && (event.topics || []).some((t) => topics.includes(t)))
        .map((event, index) => ({ event, affinity: affinity(event, project, today), index, v: closing(event) }))
        .sort((a, b) => {
            if (a.affinity.total !== b.affinity.total) return b.affinity.total - a.affinity.total;
            if (a.v !== b.v) {
                if (a.v === null) return 1;
                if (b.v === null) return -1;
                return a.v < b.v ? -1 : 1;
            }
            return a.index - b.index;
        })
        .map(({ event, affinity: a }) => ({ event, affinity: a }));
}
