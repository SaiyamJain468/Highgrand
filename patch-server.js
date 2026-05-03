const fs = require('fs');
const path = require('path');

const serverJsPath = path.join(__dirname, '.next', 'standalone', 'server.js');

if (fs.existsSync(serverJsPath)) {
  let content = fs.readFileSync(serverJsPath, 'utf8');

  // Replace whatever port logic Next.js generated with our Unix socket compatible logic
  content = content.replace(
    /let currentPort = [^\n]+/,
    `let currentPort = process.env.PORT || 3000;
if (typeof currentPort === 'string' && !isNaN(parseInt(currentPort, 10)) && currentPort == parseInt(currentPort, 10)) {
  currentPort = parseInt(currentPort, 10);
}`
  );

  // Replace whatever hostname logic Next.js generated
  content = content.replace(
    /const hostname = [^\n]+/,
    `const hostname = typeof currentPort === 'string' ? undefined : (process.env.HOSTNAME || '0.0.0.0');`
  );

  fs.writeFileSync(serverJsPath, content, 'utf8');
  console.log('Successfully patched .next/standalone/server.js to support Unix Sockets!');
} else {
  console.warn('Warning: .next/standalone/server.js not found. Make sure output: "standalone" is set in next.config.js');
}
