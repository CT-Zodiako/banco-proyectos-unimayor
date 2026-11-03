// Copies the journal finder page (apps/donde-publicar/site) into public/donde-publicar so this app serves it.
// Runs before `npm run dev` and `npm run build`; the copy is not versioned (see the root .gitignore).
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.resolve(appRoot, '../donde-publicar/site');
const target = path.resolve(appRoot, 'public/donde-publicar');
const FILES = ['index.html', 'styles.css', 'app.js', 'table.js', 'opportunities.js', 'data.js', 'catalog.js', 'logo.jpg'];

const missing = FILES.filter((file) => !existsSync(path.join(source, file)));
if (missing.length) {
    console.error(`error: missing journal finder files in ${source}: ${missing.join(', ')}`);
    process.exit(1);
}
rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
for (const file of FILES) cpSync(path.join(source, file), path.join(target, file));
console.log(`synced ${FILES.length} journal finder files to public/donde-publicar`);
