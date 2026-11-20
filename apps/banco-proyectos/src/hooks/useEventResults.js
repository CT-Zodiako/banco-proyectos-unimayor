import { useMemo } from 'react';
import { rankForProject } from '../lib/eventos/affinity';
import { filterEvents, localIsoDate, sortEvents, topicCounts } from '../lib/eventos/filters';

// Events listed for a filter state: with a project only the events sharing a topic with it, ranked by affinity; topic
// counts that follow every other filter; and the filtered, sorted list. Shared by the /eventos page (state from the
// URL) and the project panel (local state) so both rank and filter with the same logic.
export default function useEventResults({ events, project, state }) {
    const today = useMemo(() => localIsoDate(new Date()), []);
    const ranked = useMemo(() => (project ? rankForProject(events, project, today) : []), [events, project, today]);
    const affinityByEvent = useMemo(() => new Map(ranked.map((item) => [item.event, item.affinity])), [ranked]);
    const baseEvents = useMemo(() => (project ? ranked.map((item) => item.event) : events), [events, project, ranked]);

    // Counts follow every other filter, so each pill tells how many results selecting it would add.
    const counts = useMemo(
        () => topicCounts(filterEvents(baseEvents, { ...state, topics: [], today })),
        [baseEvents, state, today],
    );
    const shown = useMemo(() => {
        // Ranked events are already in affinity order; filterEvents keeps the order it receives.
        const filtered = filterEvents(baseEvents, { ...state, today });
        return state.sort === 'affinity' ? filtered : sortEvents(filtered, state.sort);
    }, [baseEvents, state, today]);

    return { today, ranked, affinityByEvent, counts, shown, noProjectEvents: Boolean(project) && ranked.length === 0 };
}
