const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  const filePath = new URL(req.url, `http://${req.headers.host}`).searchParams.get('file');
  if (!filePath) return res.end('Nie określono pliku');

  const fullPath = path.join(__dirname, filePath);

  fs.createReadStream(fullPath)
    .pipe(res)
    .on('error', () => res.end('NIe znaleziono pliku'));
}).listen(3000, () => console.log('Serwer nasłuchiwuje na porcie 3000'));