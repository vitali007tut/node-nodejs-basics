import fs from 'fs/promises';
import path from 'path';

const rename = async () => {
    const baseDir = path.join(process.cwd(), 'files');
    const oldPath = path.join(baseDir, 'wrongFilename.txt');
    const newPath = path.join(baseDir, 'properFilename.md');

    try {
        await fs.access(oldPath);

        try {
            await fs.access(newPath);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw new Error('FS operation failed');
            }
        }

        await fs.rename(oldPath, newPath);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await rename();
