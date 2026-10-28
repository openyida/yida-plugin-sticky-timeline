'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../dist');
const { version } = require('../package.json');
const port = Number(process.env.PORT || 41870);
http.createServer((request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const resource = pathname.startsWith(`/${version}/`) ? `plugin/${pathname.slice(version.length + 2)}` : `demo/${pathname.slice(1)}`;
  const filename = pathname === '/' ? path.resolve(__dirname, '../demo/index.html') : path.resolve(root, resource);
  if (pathname !== '/' && !filename.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
  fs.readFile(filename, (error, bytes) => {
    if (error) { response.writeHead(404).end('Not found'); return; }
    response.setHeader('Content-Type', filename.endsWith('.js') ? 'application/javascript; charset=utf-8' : 'text/html; charset=utf-8');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Cache-Control', 'no-store');
    response.end(bytes);
  });
}).listen(port, '127.0.0.1', () => console.log(`Preview: http://127.0.0.1:${port}`));
