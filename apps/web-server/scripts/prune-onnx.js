import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In a pnpm monorepo, the binary might be in the root node_modules or app node_modules
// We'll check both.
const pathsToTry = [
  path.resolve(__dirname, '../node_modules/onnxruntime-node/bin/napi-v6'),
  path.resolve(__dirname, '../../../node_modules/onnxruntime-node/bin/napi-v6'),
  path.resolve(__dirname, '../../../node_modules/.pnpm/onnxruntime-node@1.24.3/node_modules/onnxruntime-node/bin/napi-v6')
];

let pruned = false;

for (const baseDir of pathsToTry) {
  if (fs.existsSync(baseDir)) {
    console.log(`Found onnxruntime-node binaries at: ${baseDir}`);
    console.log('Pruning to fit Vercel limits...');
    
    const toRemove = [
      path.join(baseDir, 'darwin'),
      path.join(baseDir, 'win32'),
      path.join(baseDir, 'linux/arm64'),
      path.join(baseDir, 'linux/x64/libonnxruntime_providers_cuda.so'),
      path.join(baseDir, 'linux/x64/libonnxruntime_providers_tensorrt.so'),
    ];

    toRemove.forEach(p => {
      if (fs.existsSync(p)) {
        console.log(`Removing ${p}`);
        fs.rmSync(p, { recursive: true, force: true });
      }
    });
    pruned = true;
    break;
  }
}

if (!pruned) {
  console.log('onnxruntime-node binaries not found in common locations, skipping prune.');
}
