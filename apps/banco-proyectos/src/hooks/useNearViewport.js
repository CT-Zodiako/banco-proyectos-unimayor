import { useEffect, useState } from 'react';

// True once the element (ref callback `setNode`) is within `margin` of the viewport; it stays true afterwards. Without
// IntersectionObserver (old browsers, jsdom) it is true from the start, so nothing waits for a signal that never comes.
export default function useNearViewport(margin = '400px') {
    const [node, setNode] = useState(null);
    const [near, setNear] = useState(() => typeof IntersectionObserver === 'undefined');

    useEffect(() => {
        if (near || !node) return undefined;
        const observer = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                setNear(true);
                observer.disconnect();
            }
        }, { rootMargin: margin });
        observer.observe(node);
        return () => observer.disconnect();
    }, [node, near, margin]);

    return [setNode, near];
}
