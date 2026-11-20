/* "Guardar" button of a journal, on top of the shared Mis oportunidades store (src/lib/opportunities.js). */
import { addOpportunity, readOpportunities, removeOpportunity } from '../opportunities.js';

const isSaved = (storage, id) => readOpportunities(storage).some((item) => item.type === 'journal' && item.id === id);

/** { available, saved } for a journal; unavailable when the storage is missing or holds unreadable favorites. */
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

/** Saves the journal, or removes it when already saved; returns the new saved state. Throws, leaving the stored
    favorites untouched, when the storage cannot be read or written. */
export function toggleFavorite(storage, journal) {
    if (isSaved(storage, journal.id)) {
        removeOpportunity(storage, 'journal', journal.id);
        return false;
    }
    addOpportunity(storage, { type: 'journal', id: journal.id, title: journal.title, url: journal.url, instructions: journal.author_instructions_url });
    return true;
}
