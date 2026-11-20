// Usage: npm run build:projects-index   (node scripts/build-projects-index.mjs)
// Writes src/data/projects-index.js, the light index of the projects the catalog loads instead of the full data.
// Commit the result; `npm test` fails with this command's name when the committed file is stale.
import { writeFileSync } from 'node:fs';
import { projects } from '../src/data/projects/index.js';
import { renderProjectsIndexModule } from './projects-index-lib.mjs';

const target = new URL('../src/data/projects-index.js', import.meta.url);
writeFileSync(target, renderProjectsIndexModule(projects), 'utf8');
console.log(`wrote ${projects.length} entries to src/data/projects-index.js`);
