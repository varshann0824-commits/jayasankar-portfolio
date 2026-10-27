import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
};

const server = createServer(async (request, response) => {
  const requested = new URL(request.url, `http://${request.headers.host || 'localhost'}`).pathname;
  const safePath = requested === '/' ? '/index.html' : requested;
  const filePath = normalize(join(root, safePath));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  try {
    const file = await readFile(filePath);
    response.writeHead(200, {
      'Content-Type': mime[extname(filePath)] || 'application/octet-stream',
      'Cache-Control': requested === '/manus-routes.json' ? 'no-cache' : 'no-cache',
    });
    response.end(file);
  } catch {
    if (requested !== '/index.html') {
      const fallback = await readFile(join(root, 'index.html'));
      response.writeHead(200, { 'Content-Type': mime['.html'], 'Cache-Control': 'no-cache' });
      response.end(fallback);
      return;
    }
    response.writeHead(404);
    response.end('Not found');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Portfolio listening on 0.0.0.0:${port}`);
});
