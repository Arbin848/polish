// Gives the offline cache a name made from the content of every app file, so each deploy that
// changes anything makes phones download the new version and show "A new version is ready".
// Run by the deploy workflows just before publishing:   node tools/stamp-sw.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const swPath = path.join(ROOT, 'sw.js');
let sw = fs.readFileSync(swPath, 'utf8');
const list = sw.match(/const SHELL = \[([\s\S]*?)\];/);
if (!list) throw new Error('SHELL list not found in sw.js');
const files = [...list[1].matchAll(/'([^']+)'/g)].map((m) => m[1]).filter((f) => f !== './');
const hash = crypto.createHash('sha1');
for (const f of files) hash.update(f).update(fs.readFileSync(path.join(ROOT, f)));
const name = `slowka-${hash.digest('hex').slice(0, 10)}`;
sw = sw.replace(/const CACHE = '[^']*';/, `const CACHE = '${name}';`);
fs.writeFileSync(swPath, sw);
console.log(`sw.js cache: ${name} (${files.length} files)`);
