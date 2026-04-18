import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In a monorepo, node_modules might be in various places. 
// We search upwards to find all potential onnxruntime-node installations.
function findBinaries(startDir) {
  let currentDir = startDir;
  const binPaths = [];
  
  while (currentDir !== path.parse(currentDir).root) {
    const potentialPath = path.join(currentDir, 'node_modules/onnxruntime-node/bin/napi-v6');
    if (fs.existsSync(potentialPath)) {
      binPaths.push(potentialPath);
    }
    
    // Also check pnpm virtual store if it exists
    const pnpmStore = path.join(currentDir, 'node_modules/.pnpm');
    if (fs.existsSync(pnpmStore)) {
      const versions = fs.readdirSync(pnpmStore).filter(d => d.startsWith('onnxruntime-node@'));
      versions.forEach(v => {
        const p = path.join(pnpmStore, v, 'node_modules/onnxruntime-node/bin/napi-v6');
        if (fs.existsSync(p)) {
          binPaths.push(p);
        }
      });
    }
    
    currentDir = path.dirname(currentDir);
  }
  return binPaths;
}

const binPaths = findBinaries(__dirname);

if (binPaths.length === 0) {
  console.log('onnxruntime-node binaries not found, skipping prune.');
  process.exit(0);
}

console.log(`Found ${binPaths.length} onnxruntime-node binary locations. Pruning...`);

binPaths.forEach(baseDir => {
  console.log(`Pruning in: ${baseDir}`);
  
  const toRemove = [
    path.join(baseDir, 'darwin'),
    path.join(baseDir, 'win32'),
    path.join(baseDir, 'linux/arm64'),
    path.join(baseDir, 'linux/ia32'),
    path.join(baseDir, 'linux/x64/libonnxruntime_providers_cuda.so'),
    path.join(baseDir, 'linux/x64/libonnxruntime_providers_tensorrt.so'),
    path.join(baseDir, 'linux/x64/libonnxruntime_providers_shared.so'),
    path.join(baseDir, 'linux/x64/libonnxruntime_providers_dnnl.so'),
    path.join(baseDir, 'linux/x64/libonnxruntime_providers_openvino.so'),
  ];

  toRemove.forEach(p => {
    if (fs.existsSync(p)) {
      console.log(`Removing ${p}`);
      try {
        fs.rmSync(p, { recursive: true, force: true });
      } catch (err) {
        console.warn(`Failed to remove ${p}: ${err.message}`);
      }
    }
  });
});

console.log('Pruning complete.');
