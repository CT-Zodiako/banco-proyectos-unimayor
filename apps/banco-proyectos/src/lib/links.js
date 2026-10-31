// Journal finder (apps/donde-publicar), served by this app under /donde-publicar/.
// The explicit index.html works with both the Vite dev server and the Nginx image (no SPA rewrite needed).
export const wherePublishUrl = (projectId) =>
    `/donde-publicar/index.html?p=${encodeURIComponent(projectId)}`;

// Event finder (apps/eventos), served by this app under /eventos/.
export const EVENTS_URL = '/eventos/index.html';
