import fs from 'fs/promises';
import path from 'path';

const list = async () => {
    const dirPath = path.join(process.cwd(), 'files');

    try {
        await fs.access(dirPath);
        const files = await fs.readdir(dirPath);
        console.log(files);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await list();
