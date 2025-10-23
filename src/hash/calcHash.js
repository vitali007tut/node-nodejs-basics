import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import path from 'node:path';

const calculateHash = async () => {
    const filePath = path.join(process.cwd(), 'files', 'fileToCalculateHashFor.txt');

    const hash = createHash('sha256');
    const stream = createReadStream(filePath);

    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => hash.update(chunk));
        stream.on('end', () => {
            const result = hash.digest('hex');
            console.log(result);
            resolve(result);
        });
        stream.on('error', (err) => {
            reject(new Error('FS operation failed'));
        });
    });
};

await calculateHash();
