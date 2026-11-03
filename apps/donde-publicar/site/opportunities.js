export const STORAGE_KEY = 'unimayor.opportunities.v1';
export const STATUS_LABELS = { review: 'Por revisar', preparing: 'Preparando', submitted: 'Enviado', discarded: 'Descartado' };

const validItem = (item) => item && ['event', 'journal'].includes(item.type) && typeof item.id === 'string' && item.id.length > 0 && typeof item.title === 'string' && item.title.length > 0;

export function readOpportunities(storage) {
    const raw = storage.getItem(STORAGE_KEY);
    if (raw === null) return [];
    const items = JSON.parse(raw);
    if (!Array.isArray(items) || items.some((item) => !validItem(item))) {
        throw new Error('Los favoritos guardados tienen un formato desconocido.');
    }
    return items;
}

export function addOpportunity(storage, item) {
    if (!validItem(item)) throw new Error('La oportunidad no tiene datos válidos.');
    const items = readOpportunities(storage);
    if (!items.some((saved) => saved.type === item.type && saved.id === item.id)) {
        storage.setItem(STORAGE_KEY, JSON.stringify([...items, item]));
    }
}

export function filterOpportunities(items, status) {
    return status === 'all' ? items : items.filter((item) => (item.status || 'review') === status);
}

export function updateOpportunity(storage, type, id, { status, note }) {
    if (!Object.hasOwn(STATUS_LABELS, status) || typeof note !== 'string') throw new Error('Estado o nota no válidos.');
    const items = readOpportunities(storage);
    if (!items.some((item) => item.type === type && item.id === id)) throw new Error('No se encontró la oportunidad.');
    storage.setItem(STORAGE_KEY, JSON.stringify(items.map((item) => item.type === type && item.id === id ? { ...item, status, note } : item)));
}

export function exportBackup(storage) {
    return JSON.stringify({ version: 1, items: readOpportunities(storage) }, null, 2);
}

function backupItems(text) {
    if (typeof text !== 'string' || text.length > 5 * 1024 * 1024) throw new Error('El archivo es demasiado grande o inválido.');
    const backup = JSON.parse(text);
    if (!backup || backup.version !== 1 || !Array.isArray(backup.items) || backup.items.some((item) =>
        !validItem(item) || (item.status !== undefined && !Object.hasOwn(STATUS_LABELS, item.status)) ||
        (item.note !== undefined && typeof item.note !== 'string') ||
        ['url', 'instructions', 'start', 'end', 'deadline'].some((key) => item[key] != null && typeof item[key] !== 'string'))) {
        throw new Error('El archivo de respaldo no tiene un formato válido.');
    }
    return backup.items;
}

function mergeBackup(storage, text) {
    const incoming = backupItems(text);
    const current = readOpportunities(storage);
    const seen = new Set(current.map((item) => JSON.stringify([item.type, item.id])));
    const added = [];
    for (const item of incoming) {
        const key = JSON.stringify([item.type, item.id]);
        if (!seen.has(key)) { seen.add(key); added.push(item); }
    }
    return { current, added, duplicates: incoming.length - added.length };
}

export function previewBackup(storage, text) {
    const result = mergeBackup(storage, text);
    return { added: result.added.length, duplicates: result.duplicates };
}

export function importBackup(storage, text) {
    const result = mergeBackup(storage, text);
    if (result.added.length) storage.setItem(STORAGE_KEY, JSON.stringify([...result.current, ...result.added]));
    return { added: result.added.length, duplicates: result.duplicates };
}

export function calendarFile(item, field) {
    const date = item[field];
    if (!['start', 'deadline'].includes(field) || typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
    const day = new Date(`${date}T00:00:00Z`);
    if (Number.isNaN(day.getTime()) || day.toISOString().slice(0, 10) !== date) return null;
    const next = new Date(day.getTime() + 86400000).toISOString().slice(0, 10).replaceAll('-', '');
    const escape = (text) => String(text || '').replaceAll('\\', '\\\\').replaceAll('\n', '\\n').replaceAll(',', '\\,').replaceAll(';', '\\;');
    const title = field === 'deadline' ? `Cierre: ${item.title}` : item.title;
    return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//UNIMAYOR//Oportunidades//ES', 'BEGIN:VEVENT',
        `UID:${encodeURIComponent(String(item.id))}-${field}@unimayor`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
        `DTSTART;VALUE=DATE:${date.replaceAll('-', '')}`, `DTEND;VALUE=DATE:${next}`,
        `SUMMARY:${escape(title)}`, `DESCRIPTION:${escape(item.url)}`, 'END:VEVENT', 'END:VCALENDAR', ''].join('\r\n');
}

export function removeOpportunity(storage, type, id) {
    const items = readOpportunities(storage);
    storage.setItem(STORAGE_KEY, JSON.stringify(items.filter((item) => item.type !== type || item.id !== id)));
}
