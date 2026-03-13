const { execSync } = require('child_process');

console.log('Installing @prisma/client...');
execSync('npm install @prisma/client', { stdio: 'inherit' });

console.log('Generating Prisma Client...');
execSync('npx prisma generate', { stdio: 'inherit' });

console.log('Done!');
