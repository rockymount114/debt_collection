/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: '.env.local' });
const { execSync } = require('child_process');

const command = process.argv[2]; // Get the Prisma command as the third argument

if (!command) {
  console.error('Usage: node scripts/prisma-script-runner.js "<Prisma command>"');
  process.exit(1);
}

try {
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error(`Prisma command failed: ${error.message}`);
  process.exit(1);
}
