import { lazy } from 'react';

const retries = new Set();

// React.lazy remembers a failed download forever. lazyRoute makes a fresh lazy component for the next render after a
// failure, so «Reintentar» (retryFailedChunks) downloads the chunk again; a healthy chunk is never downloaded twice.
// `.prefetch()` starts the download without rendering (hover or focus on the link that leads to it).
export function lazyRoute(importer) {
    let failed = false;
    const make = () => lazy(() => importer().catch((error) => { failed = true; throw error; }));
    let Inner = make();
    const Route = (props) => <Inner {...props} />;
    Route.prefetch = () => { importer().catch(() => {}); };
    retries.add(() => {
        if (!failed) return;
        failed = false;
        Inner = make();
    });
    return Route;
}

/** Makes every lazy component whose download failed ready to download again on its next render. */
export const retryFailedChunks = () => retries.forEach((retry) => retry());
