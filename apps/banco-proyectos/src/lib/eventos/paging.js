/* Pure helpers for the "show more" pagination of the event list: the page shows PAGE_SIZE events and each click on
   «Mostrar más eventos» adds PAGE_SIZE more, so a list of hundreds of events does not render all its cards at once. */

export const PAGE_SIZE = 20;

/** The first `count` items (never more than the list, never negative); the list is not modified. */
export function visibleSlice(items, count) {
    return items.slice(0, Math.max(0, count));
}

/** How many items are shown after one more click: current + step, capped at the total. */
export function nextVisibleCount(current, total, step = PAGE_SIZE) {
    return Math.min(total, current + step);
}

/** "Mostrando 20 de 439 eventos". */
export function pagingStatus(shown, total) {
    return `Mostrando ${Math.min(shown, total)} de ${total} eventos`;
}
