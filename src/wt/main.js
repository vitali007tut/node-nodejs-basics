import { cpus } from 'node:os';
import { Worker } from 'node:worker_threads';
import path from 'node:path';

const performCalculations = async () => {
    const numCores = cpus().length;

    const workerPromises = Array.from({ length: numCores }, (_, i) => {
        return new Promise((resolve) => {
            const worker = new Worker(path.resolve('./worker.js'));

            worker.postMessage(10 + i);

            worker.on('message', (data) => {
                resolve({ status: 'resolved', data });
            });

            worker.on('error', () => {
                resolve({ status: 'error', data: null });
            });

            worker.on('exit', (code) => {
                if (code !== 0) {
                    resolve({ status: 'error', data: null });
                }
            });
        });
    });

    const finalResults = await Promise.all(workerPromises);
    console.log(finalResults);
};

await performCalculations();
