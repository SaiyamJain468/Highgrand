// This file acts as a proxy for Hostinger's Node.js environment
// which strictly looks for a root server.js or app.js file to boot.
// It simply imports the highly-optimized Next.js standalone server.
require('./.next/standalone/server.js');
