import { createWriteStream } from 'node:fs';
import path from 'node:path';

const write = async () => {
    const filePath = path.join(process.cwd(), 'files', 'fileToWrite.txt');

    const writableStream = createWriteStream(filePath);

    process.stdin.pipe(writableStream);

    writableStream.on('finish', () => {
        console.log('Data has been written to fileToWrite.txt');
    });

    writableStream.on('error', () => {
        throw new Error('FS operation failed');
    });
};

await write();
