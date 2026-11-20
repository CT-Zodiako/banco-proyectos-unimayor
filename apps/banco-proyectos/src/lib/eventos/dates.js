/* Spanish dd/mm/aaaa text for the date filters of the event finder (T8). The filter state, the URL and filters.js
   keep ISO "YYYY-MM-DD" strings; these helpers only convert between that and what a visitor types and reads. */

const MIN_YEAR = 1900;
const MAX_YEAR = 2100;
const FIELD_MAX = [2, 2, 4]; // digits of day, month and year

/** True for an ISO-like y/m/d that is a real calendar day. */
function isRealDay(year, month, day) {
    if (year < MIN_YEAR || year > MAX_YEAR || month < 1 || month > 12 || day < 1) return false;
    return day <= new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/** "15/03/2027" (also "5/3/2027") to "2027-03-15"; null when it is not a complete, real date. */
export function parseDmy(text) {
    const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(String(text ?? '').trim());
    if (!match) return null;
    const [day, month, year] = [Number(match[1]), Number(match[2]), Number(match[3])];
    if (!isRealDay(year, month, day)) return null;
    const pad = (n, size = 2) => String(n).padStart(size, '0');
    return `${pad(year, 4)}-${pad(month)}-${pad(day)}`;
}

/** "2027-03-15" to "15/03/2027"; an empty string for anything that is not a real ISO date. */
export function formatDmy(iso) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso ?? ''));
    if (!match || !isRealDay(Number(match[1]), Number(match[2]), Number(match[3]))) return '';
    return `${match[3]}/${match[2]}/${match[1]}`;
}

/** What the field should show for what was just typed or pasted. Digits get their slashes ("15032027" becomes
    "15/03/2027"; no slash is added after a group until the next digit, so Backspace can always delete). When the
    visitor types the separators ("5/3/2027", "15-03-2027") they are understood and 1-digit day/month are padded. */
export function maskDmyInput(raw) {
    const text = String(raw ?? '').replace(/[^\d/.\-\s]/g, '').replace(/^\D+/, ''); // letters out; / . - and spaces separate
    const groups = text.split(/\D+/);
    // Separator mode only when every group fits its own field; otherwise the slashes are the ones this mask added
    // ("15/072" is the digits 15072) and the digits are masked again.
    if (groups.length > 1 && groups.length <= 3 && groups.every((group, index) => group.length <= FIELD_MAX[index])) {
        return groups.map((group, index) => (index < groups.length - 1 && group.length === 1 ? `0${group}` : group)).join('/');
    }
    const digits = text.replace(/\D/g, '').slice(0, 8);
    let out = digits.slice(0, 2);
    if (digits.length > 2) out += `/${digits.slice(2, 4)}`;
    if (digits.length > 4) out += `/${digits.slice(4)}`;
    return out;
}

/** False only when both bounds are set and "desde" is after "hasta" (ISO strings compare as text). */
export function isValidRange(dateFrom, dateTo) {
    return !(dateFrom && dateTo && dateFrom > dateTo);
}
