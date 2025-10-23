import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { createGunzip } from 'node:zlib';

const decompress = async () => {
    const sourcePath = path.join(process.cwd(), 'files', 'archive.gz');
    const destinationPath = path.join(process.cwd(), 'files', 'fileToCompress.txt');

    const readableStream = createReadStream(sourcePath);
    const gunzipStream = createGunzip();
    const writableStream = createWriteStream(destinationPath);

    readableStream
        .pipe(gunzipStream)
        .pipe(writableStream)
        .on('error', () => {
            throw new Error('FS operation failed');
        });
};

await decompress();
