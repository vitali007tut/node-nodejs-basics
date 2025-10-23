// const path = require('node:path');
// const { release, version } = require('node:os');
// const { createServer: createServerHttp } = require('node:http');

// require('./files/c.cjs');

// const random = Math.random();

// const unknownObject = random > 0.5 ? require('./files/a.json') : require('./files/b.json');

// console.log(`Release ${release()}`);
// console.log(`Version ${version()}`);
// console.log(`Path segment separator is "${path.sep}"`);

// console.log(`Path to current file is ${__filename}`);
// console.log(`Path to current directory is ${__dirname}`);

// const myServer = createServerHttp((_, res) => {
//   res.end('Request accepted');
// });

// const PORT = 3000;

// console.log(unknownObject);

// myServer.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
//   console.log('To terminate it, use Ctrl+C combination');
// });

// module.exports = {
//   unknownObject,
//   myServer,
// };

import path from 'node:path';
import { release, version } from 'node:os';
import { createServer as createServerHttp } from 'node:http';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

import './files/c.cjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadJson = async (filename) => {
    const filePath = path.join(__dirname, 'files', filename);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
};

const random = Math.random();
const unknownObject = await loadJson(random > 0.5 ? 'a.json' : 'b.json');

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);
console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };