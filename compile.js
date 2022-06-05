// compile code will go here
const path = require('path');
const fs = require('fs');
const solCompiler = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf-8');

module.exports = solCompiler.compile(source, 1).contracts[':Inbox'];