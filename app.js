// This file acts as a proxy for Hostinger's Node.js environment
const fs = require('fs');

process.on('uncaughtException', function(err) {
    fs.appendFileSync(__dirname + '/hostinger-error.log', new Date().toISOString() + ' Uncaught Exception: ' + err.stack + '\n');
    process.exit(1);
});

process.on('unhandledRejection', function(reason, p) {
    fs.appendFileSync(__dirname + '/hostinger-error.log', new Date().toISOString() + ' Unhandled Rejection: ' + (reason.stack || reason) + '\n');
});

try {
    require('./.next/standalone/server.js');
} catch (err) {
    fs.appendFileSync(__dirname + '/hostinger-error.log', new Date().toISOString() + ' Sync Error: ' + err.stack + '\n');
    process.exit(1);
}

