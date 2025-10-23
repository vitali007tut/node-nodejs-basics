import { createReadStream } from 'node:fs';
import path from 'node:path';

const read = async () => {
    const filePath = path.join(process.cwd(), 'files', 'fileToRead.txt');

    const stream = createReadStream(filePath, { encoding: 'utf-8' });

    stream.pipe(process.stdout);

    stream.on('error', () => {
        throw new Error('FS operation failed');
    });
};

await read();
