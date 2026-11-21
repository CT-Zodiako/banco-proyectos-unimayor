// Skip link over a long list (T23 of odd/tasks/mejora-visual.md). Each card of an events, journals or saved list has
// several controls, so the link at the start of the list (the `.skip-link` of the page, visible only while it has the
// focus) moves the focus to what comes after it: the «mostrar más» button when there is one (`moreId`), else the end
// marker (`SkipListEnd`, tabindex -1, named by its text). Lists shorter than SKIP_LIST_MIN do not show it.
export const SKIP_LIST_MIN = 6;

export function SkipListLink({ label, endId, moreId }) {
    return (
        <a
            href={`#${endId}`}
            className="skip-link"
            onClick={(event) => {
                event.preventDefault();
                const target = (moreId && document.getElementById(moreId)) || document.getElementById(endId);
                target?.focus();
            }}
        >
            {label}
        </a>
    );
}

export function SkipListEnd({ id, children }) {
    return <p id={id} tabIndex={-1} className="sr-only">{children}</p>;
}
