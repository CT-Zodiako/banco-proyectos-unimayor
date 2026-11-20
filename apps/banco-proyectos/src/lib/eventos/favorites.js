/* "Guardar" button of an event card, on top of the shared Mis oportunidades store (src/lib/opportunities.js). */
import { addOpportunity, readOpportunities, removeOpportunity } from '../opportunities.js';

const isSaved = (storage, id) => readOpportunities(storage).some((item) => item.type === 'event' && item.id === id);

/** { available, saved } for an event; unavailable when the storage is missing or holds unreadable favorites. */
export function favoriteSnapshot(storage, id) {
    try {
        return { available: true, saved: isSaved(storage, id) };
    } catch {
        return { available: false, saved: false };
    }
}

export function favoriteLabel({ available, saved }) {
    if (!available) return 'Favoritos no disponibles';
    return saved ? 'Guardado' : 'Guardar';
}

/** Saves the event, or removes it when already saved; returns the new saved state. Throws, leaving the stored
    favorites untouched, when the storage cannot be read or written. */
export function toggleFavorite(storage, event) {
    if (isSaved(storage, event.id)) {
        removeOpportunity(storage, 'event', event.id);
        return false;
    }
    addOpportunity(storage, { type: 'event', id: event.id, title: event.title, url: event.url, start: event.start, end: event.end, deadline: event.deadline });
    return true;
}
