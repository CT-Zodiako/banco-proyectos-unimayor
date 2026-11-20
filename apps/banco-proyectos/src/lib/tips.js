// Tooltips (`data-tip`) are hover help; on a device without hover, or a narrow screen, the CSS hides them (index.css)
// and a tap shows the same text in a status region instead (components/TapTips.jsx). Keep both queries identical.
export const TIP_TOUCH_QUERY = '(hover: none), (max-width: 959px)';

const INTERACTIVE = 'a[href],button,summary,input,select,textarea,label';

/** The element whose tip a click on `target` should show, or null. Links, buttons and fields keep doing their own
    job (their visible label is enough), so a click on or inside one is not a tip request. */
export function tipTarget(target) {
    const holder = target instanceof Element ? target.closest('[data-tip]') : null;
    if (!holder) return null;
    const interactive = target.closest(INTERACTIVE);
    return interactive && holder.contains(interactive) ? null : holder;
}
