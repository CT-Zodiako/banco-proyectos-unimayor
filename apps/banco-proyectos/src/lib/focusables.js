// Elements the keyboard can reach, for the focus trap of the modal dialogs (project panel, «Proponer proyecto»).
export const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),summary,[tabindex]:not([tabindex="-1"])';

/** The focusable elements of `root` that are visible now (not inside a hidden or inert subtree). */
export const focusables = (root) => [...root.querySelectorAll(FOCUSABLE)]
    .filter((element) => !element.closest('[hidden],[inert]') && (element.offsetParent !== null || element === document.activeElement));
