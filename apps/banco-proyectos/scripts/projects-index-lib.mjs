// The light index of the projects: what the catalog (cards, filters, search, sort), the global search and the Home
// figures read. It is generated from the full data (src/data/projects/index.js) by scripts/build-projects-index.mjs
// into src/data/projects-index.js, which is committed; tests/projects-index.test.mjs fails when it is stale.
export const INDEX_FIELDS = ['id', 'titulo', 'descripcion', 'area', 'sector', 'nivel', 'duracion'];

/** The fields of one project that the catalog reads; the hardware and software lists become their lengths. */
export const projectIndexEntry = (project) => ({
    ...Object.fromEntries(INDEX_FIELDS.map((field) => [field, project[field]])),
    hardwareCount: project.hardware.length,
    softwareCount: project.software.length,
});

const HEADER = `// GENERATED FILE, do not edit by hand. Light index of the projects (the fields the catalog, the global search and the
// Home figures read), made from src/data/projects/index.js by scripts/build-projects-index.mjs.
// After changing a project, run: npm run build:projects-index
`;

/** Source text of src/data/projects-index.js for a list of full projects (one entry per line, so diffs stay readable). */
export const renderProjectsIndexModule = (projects) => `${HEADER}export const projectsIndex = [
${projects.map((project) => `    ${JSON.stringify(projectIndexEntry(project))},`).join('\n')}
];
`;
