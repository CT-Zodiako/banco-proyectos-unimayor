/* Copy the current address ("Compartir esta búsqueda"): the Clipboard API first, then a temporary textarea with
   execCommand("copy") for browsers and contexts (http, old WebViews) where navigator.clipboard is missing or refuses. */

export const SHARE_LABEL = 'Compartir esta búsqueda';
export const SHARE_COPIED = 'Enlace copiado';
export const SHARE_FAILED = 'No se pudo copiar. Copia la dirección del navegador.';
/** How long each message stays in the live region; the failure one stays longer because it asks the user to act. */
export const COPIED_MS = 3000;
export const FAILED_MS = 6000;

// execCommand needs the text selected inside a real (but invisible) field; the field is removed again and the focus
// goes back to the control that had it.
function copyWithTextarea(text, document) {
    if (!document || typeof document.execCommand !== 'function' || !document.body) return false;
    const previous = document.activeElement;
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.setAttribute('aria-hidden', 'true');
    textarea.setAttribute('tabindex', '-1');
    Object.assign(textarea.style, { position: 'fixed', top: '0', left: '-9999px', opacity: '0', pointerEvents: 'none' });
    document.body.appendChild(textarea);
    try {
        textarea.select();
        textarea.setSelectionRange?.(0, text.length);
        return document.execCommand('copy') === true;
    } catch {
        return false;
    } finally {
        document.body.removeChild(textarea);
        previous?.focus?.();
    }
}

/** Copies `text`; resolves true when it was copied and false when nothing could copy it. Never rejects.
    env = { navigator, document }, defaulting to the browser globals (injectable for tests). */
export async function copyText(text, env = { navigator: globalThis.navigator, document: globalThis.document }) {
    try {
        if (env.navigator?.clipboard?.writeText) {
            await env.navigator.clipboard.writeText(text);
            return true;
        }
    } catch {
        // permission denied or insecure context: try the fallback below
    }
    return copyWithTextarea(text, env.document);
}
