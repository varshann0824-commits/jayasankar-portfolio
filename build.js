import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('.', import.meta.url));
const output = join(root, 'dist');
const files = ['index.html', 'styles.css', 'script.js', 'resume.pdf', 'favicon.svg', 'manus-routes.json'];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of files) await cp(join(root, file), join(output, file));
await cp(join(root, 'public'), join(output, 'public'), { recursive: true });
console.log(`Static portfolio built in ${output}`);
