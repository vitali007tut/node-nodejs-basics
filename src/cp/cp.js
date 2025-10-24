import { spawn } from 'node:child_process';
import path from 'node:path';

const spawnChildProcess = (args) => {
    const scriptPath = path.join(process.cwd(), 'files', 'script.js');

    const child = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit'],
    });

    process.stdin.pipe(child.stdin);

    child.stdout.pipe(process.stdout);
};

spawnChildProcess(['someArgument1', 'someArgument2']);
