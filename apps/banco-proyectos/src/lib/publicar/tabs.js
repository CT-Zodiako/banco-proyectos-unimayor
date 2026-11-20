/** Id reached from `current` with an arrow key (wrapping), Home or End; null for any other key. */
export function nextTabId(ids, current, key) {
    const index = ids.indexOf(current);
    if (key === 'Home') return ids[0];
    if (key === 'End') return ids[ids.length - 1];
    if (key === 'ArrowRight') return ids[(index + 1) % ids.length];
    if (key === 'ArrowLeft') return ids[(index - 1 + ids.length) % ids.length];
    return null;
}
