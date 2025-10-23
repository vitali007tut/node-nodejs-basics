import fs from 'fs/promises';
import path from 'path';

const copy = async () => {
    const sourceDir = path.join(process.cwd(), 'files');
    const targetDir = path.join(process.cwd(), 'files_copy');

    try {
        await fs.access(sourceDir);

        try {
            await fs.access(targetDir);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw new Error('FS operation failed');
            }
        }

        await fs.cp(sourceDir, targetDir, { recursive: true });
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await copy();
