import { useState } from 'react';

// From this width the legends have room to be read open; below it they start collapsed (a phone).
export const LEGEND_WIDE_QUERY = '(min-width: 700px)';

// Whether a collapsible block starts open: decided ONCE on mount from the viewport (the app renders on the client only, so
// there is nothing to hydrate and the first paint is already right), then left to the visitor. Without matchMedia
// (old browsers, jsdom) it starts open, the desktop layout.
export default function useInitialOpen(query = LEGEND_WIDE_QUERY) {
    const [open] = useState(() => typeof window === 'undefined' || typeof window.matchMedia !== 'function' || window.matchMedia(query).matches);
    return open;
}
