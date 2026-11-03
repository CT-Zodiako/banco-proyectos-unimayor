// Copies the event finder page (apps/eventos/site) into public/eventos so this app serves it.
// Runs before `npm run dev` and `npm run build`; the copy is not versioned (see the root .gitignore).
// sample-data.js is left out: it is development data, and production must never show invented events.
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.resolve(appRoot, '../eventos/site');
const target = path.resolve(appRoot, 'public/eventos');
const FILES = ['index.html', 'styles.css', 'app.js', 'filters.js', 'opportunities.js', 'data.js', 'logo.jpg'];

const missing = FILES.filter((file) => !existsSync(path.join(source, file)));
if (missing.length) {
    console.error(`error: missing event finder files in ${source}: ${missing.join(', ')}`);
    process.exit(1);
}
rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
for (const file of FILES) cpSync(path.join(source, file), path.join(target, file));
console.log(`synced ${FILES.length} event finder files to public/eventos`);
