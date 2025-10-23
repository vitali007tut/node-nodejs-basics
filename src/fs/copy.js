import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const sourceDir = path.join(__dirname, 'files');
    const targetDir = path.join(__dirname, 'files_copy');

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
