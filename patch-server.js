const fs = require('fs');
const path = require('path');

const serverJsPath = path.join(__dirname, '.next', 'standalone', 'server.js');

if (fs.existsSync(serverJsPath)) {
  let content = fs.readFileSync(serverJsPath, 'utf8');

  // Replace default Next.js port logic to support Hostinger Unix sockets
  content = content.replace(
    /let currentPort = parseInt\(process\.env\.PORT, 10\) \|\| 3000/g,
    `let currentPort = process.env.PORT || 3000;
if (typeof currentPort === 'string' && !isNaN(parseInt(currentPort, 10)) && currentPort == parseInt(currentPort, 10)) {
  currentPort = parseInt(currentPort, 10);
}`
  );

  content = content.replace(
    /const hostname = process\.env\.HOSTNAME \|\| '0\.0\.0\.0'/g,
    `const hostname = typeof currentPort === 'string' ? undefined : (process.env.HOSTNAME || '0.0.0.0');`
  );

  fs.writeFileSync(serverJsPath, content, 'utf8');
  console.log('Successfully patched .next/standalone/server.js to support Unix Sockets!');
} else {
  console.warn('Warning: .next/standalone/server.js not found. Make sure output: "standalone" is set in next.config.js');
}
