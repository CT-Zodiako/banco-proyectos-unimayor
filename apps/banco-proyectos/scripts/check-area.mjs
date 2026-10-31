// Usage: node scripts/check-area.mjs src/data/projects/<area>.js
// Validates one area module and checks its titles against every other project in the bank.
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { NEW_AREAS, MIN_PROJECTS_PER_NEW_AREA } from '../src/data/projects/areas.js';
import { mockProjects } from '../src/data/mockProjects.js';
import { validateArea, duplicates } from './projects-validation.mjs';

const file = process.argv[2];
const area = NEW_AREAS.find((a) => a.module === path.basename(file ?? ''));
if (!area) {
    console.error(`error: unknown area module ${file ?? '(none)'}; expected one of: ${NEW_AREAS.map((a) => a.module).join(', ')}`);
    process.exit(2);
}

const others = [];
for (const other of NEW_AREAS.filter((a) => a !== area)) {
    const mod = await import(pathToFileURL(path.resolve('src/data/projects', other.module)).href);
    others.push(...mod.default);
}
const { default: projects } = await import(pathToFileURL(path.resolve(file)).href);
const errors = [
    ...validateArea(projects, area, MIN_PROJECTS_PER_NEW_AREA),
    ...duplicates([...mockProjects, ...others, ...projects]).filter((e) => projects.some((p) => e.startsWith(`${p.id}:`))),
];
if (errors.length) {
    console.error(`${area.name}: ${errors.length} error(es)\n- ${errors.join('\n- ')}`);
    process.exit(1);
}
console.log(`${area.name}: ${projects.length} proyectos válidos`);
