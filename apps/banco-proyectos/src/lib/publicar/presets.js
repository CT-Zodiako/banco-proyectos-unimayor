/* Saved filters of the journal finder: the user's own presets live in localStorage (the built-in ones are PRESETS in
   table.js). Every function takes the storage so it can be tested without a browser. */

export const PRESET_STORAGE_KEY = 'donde-publicar.presets.v1';

/** The stored presets that have a label and a filters object; [] when the storage is missing, unreadable or malformed. */
export function loadUserPresets(storage) {
    try {
        const stored = JSON.parse(storage.getItem(PRESET_STORAGE_KEY) || '[]');
        return Array.isArray(stored) ? stored.filter((preset) => preset && typeof preset.label === 'string' && preset.filters && typeof preset.filters === 'object') : [];
    } catch {
        return [];
    }
}

/** Writes the list; a storage that is missing or refuses the write is ignored, as the page keeps working without it. */
export function saveUserPresets(storage, presets) {
    try { storage.setItem(PRESET_STORAGE_KEY, JSON.stringify(presets)); } catch { /* storage unavailable */ }
}

/** The list with the preset added; one with the same id (same name) is replaced and the new one goes last. */
export const saveUserPreset = (presets, preset) => [...presets.filter((saved) => saved.id !== preset.id), preset];

export const deleteUserPreset = (presets, preset) => presets.filter((saved) => saved !== preset);
