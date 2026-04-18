import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Possible locations for v86.wasm in a pnpm monorepo
const searchPaths = [
    path.resolve(__dirname, '../node_modules/v86/build/v86.wasm'),
    path.resolve(__dirname, '../../../node_modules/v86/build/v86.wasm'),
    path.resolve(__dirname, '../v86.wasm'), // Legacy location if present
];

const v86WasmDestDir = path.resolve(__dirname, '../v86-images');
const v86WasmDest = path.join(v86WasmDestDir, 'v86.wasm');

let found = false;

for (const src of searchPaths) {
    console.log(`[Assets] Checking for v86.wasm at: ${src}`);
    if (fs.existsSync(src)) {
        if (!fs.existsSync(v86WasmDestDir)) {
            fs.mkdirSync(v86WasmDestDir, { recursive: true });
        }
        fs.copyFileSync(src, v86WasmDest);
        console.log(`[Assets] Copied v86.wasm from ${src} to ${v86WasmDest}`);
        found = true;
        break;
    }
}

if (!found) {
    console.warn(`[Assets] Warning: v86.wasm not found in standard paths, checking pnpm store...`);
    // Fallback check in pnpm store structure
    const pnpmStores = [
        path.resolve(__dirname, '../node_modules/.pnpm'),
        path.resolve(__dirname, '../../../node_modules/.pnpm')
    ];
    
    for (const pnpmStore of pnpmStores) {
        if (fs.existsSync(pnpmStore)) {
            const versions = fs.readdirSync(pnpmStore).filter(d => d.startsWith('v86@'));
            if (versions.length > 0) {
                const p = path.join(pnpmStore, versions[0], 'node_modules/v86/build/v86.wasm');
                if (fs.existsSync(p)) {
                    if (!fs.existsSync(v86WasmDestDir)) {
                        fs.mkdirSync(v86WasmDestDir, { recursive: true });
                    }
                    fs.copyFileSync(p, v86WasmDest);
                    console.log(`[Assets] Copied v86.wasm from pnpm store at ${p} to ${v86WasmDest}`);
                    found = true;
                    break;
                }
            }
        }
        if (found) break;
    }
}

if (!found) {
    console.error(`[Assets] ERROR: Could not find v86.wasm anywhere!`);
    process.exit(1);
}
