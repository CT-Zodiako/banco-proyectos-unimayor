/* Project selection and the rows of the journal list of one project. */
import { affinity, assessment, filterRows, sortRows } from './table.js';

/** The requested project id: ?p=<id>, or the hash (#<id>) that the old static page also accepted. */
export const requestedProjectId = (search, hash) => new URLSearchParams(search).get('p') || String(hash || '').replace(/^#/, '');

/** One row per journal matched to the project, in the suggested order, with its affinity and assessment. A match whose
    journal is not in the data is skipped. */
export function projectRows(project, journalsById, themes) {
    if (!project) return [];
    return project.matches
        .map((match) => ({ match, journal: journalsById.get(match.journal_id) }))
        .filter((row) => row.journal)
        .map((row) => ({ ...row, affinity: affinity(project, row.match, row.journal), assessment: assessment(project, row.match, row.journal, themes) }));
}

export const visibleRows = (rows, advanced, query, sort) => sortRows(filterRows(rows, { ...advanced, query }), sort);
