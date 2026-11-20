// The projects come in two on-demand chunks, so the entry bundle carries neither:
//  - the light index (src/data/projects-index.js, ~235 kB of text, generated from the full data by
//    scripts/build-projects-index.mjs): what the catalog, the global search and the Home figures read;
//  - the full data (src/data/baseProjects.js + src/data/projects/*.js, ~1 MB): only the project page needs it.
// The scripts and tests keep importing src/data/projects/index.js directly. One download is shared by everyone who
// asks; a failed one is not kept, so asking again retries it.
export function createProjectsLoader(importer, select = (module) => module.projects) {
    let loaded = null;
    let pending = null;

    function load() {
        if (loaded) return Promise.resolve(loaded);
        if (!pending) {
            const attempt = importer()
                .then((module) => {
                    loaded = select(module);
                    return loaded;
                })
                .finally(() => { if (pending === attempt) pending = null; });
            pending = attempt;
        }
        return pending;
    }

    return { load, peek: () => loaded };
}

const full = createProjectsLoader(() => import('../data/projects/index.js'));
const index = createProjectsLoader(() => import('../data/projects-index.js'), (module) => module.projectsIndex);

export const loadProjects = full.load;
/** The full projects once they are loaded, otherwise null (for a first render that needs no waiting). */
export const loadedProjects = full.peek;

export const loadProjectsIndex = index.load;
/** The light index once it is loaded, otherwise null. */
export const loadedProjectsIndex = index.peek;
