// Usage: node scripts/export-projects.mjs <output.json>
// Writes every project of the bank (original 100 + new areas) as JSON, the input of apps/donde-publicar.
import { writeFileSync } from 'node:fs';
import { projects } from '../src/data/projects/index.js';

const out = process.argv[2];
if (!out) {
    console.error('error: missing output path; usage: node scripts/export-projects.mjs <output.json>');
    process.exit(2);
}
writeFileSync(out, `${JSON.stringify(projects, null, 1)}\n`, 'utf8');
console.log(`exported ${projects.length} projects to ${out}`);
