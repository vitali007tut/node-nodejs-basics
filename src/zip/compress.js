import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { createGzip } from 'node:zlib';

const compress = async () => {
    const sourcePath = path.join(process.cwd(), 'files', 'fileToCompress.txt');
    const destinationPath = path.join(process.cwd(), 'files', 'archive.gz');

    const readableStream = createReadStream(sourcePath);
    const gzipStream = createGzip();
    const writableStream = createWriteStream(destinationPath);

    readableStream
        .pipe(gzipStream)
        .pipe(writableStream)
        .on('error', () => {
            throw new Error('FS operation failed');
        });
};

await compress();
