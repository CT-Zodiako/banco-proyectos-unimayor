import { projects } from '../data/projects/index.js';

// Projects come from the local data files (src/data). The shape matches an async
// source so callers keep working if a remote store (e.g. Firestore) is wired back in.
export const useProjects = () => ({ projects, loading: false, error: null });
