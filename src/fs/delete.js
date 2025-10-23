import fs from 'fs/promises';
import path from 'path';

const remove = async () => {
    const filePath = path.join(process.cwd(), 'files', 'fileToRemove.txt');

    try {
        await fs.access(filePath);
        await fs.unlink(filePath);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await remove();
