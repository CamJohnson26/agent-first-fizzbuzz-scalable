const fs = require('fs');
const path = require('path');

const requiredVersionPath = path.join(__dirname, '..', '.node-version');
const requiredVersion = fs.readFileSync(requiredVersionPath, 'utf8').trim();

const currentVersion = process.version.replace('v', '');

if (currentVersion !== requiredVersion) {
  console.error('\x1b[31m%s\x1b[0m', 'ERROR: Node.js version mismatch!');
  console.error('\x1b[31m%s\x1b[0m', `Required version: ${requiredVersion}`);
  console.error('\x1b[31m%s\x1b[0m', `Current version: ${currentVersion}`);
  console.error('\x1b[33m%s\x1b[0m', 'Please use the required version to ensure consistency across environments.');
  process.exit(1);
} else {
  console.log('\x1b[32m%s\x1b[0m', `Node.js version check passed: ${currentVersion}`);
}
