require('dotenv').config({ path: '.env.local' });
const { execSync } = require('child_process');

const command = process.argv[2]; // Get the Prisma command as the third argument

if (!command) {
  console.error('Usage: node scripts/prisma-script-runner.js "<Prisma command>"');
  process.exit(1);
}

// Temporarily skip prisma migrate dev due to persistent connection issues
if (command.includes('prisma migrate dev')) {
  console.warn('Skipping prisma migrate dev due to persistent connection issues. Please fix DATABASE_URL in .env.local and run this command manually.');
  process.exit(0);
}

try {
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error(`Prisma command failed: ${error.message}`);
  process.exit(1);
}