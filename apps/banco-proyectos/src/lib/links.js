// Journal finder (apps/donde-publicar), served by this app under /donde-publicar/.
// The explicit index.html works with both the Vite dev server and Firebase Hosting.
export const wherePublishUrl = (projectId) =>
    `/donde-publicar/index.html?p=${encodeURIComponent(projectId)}`;
