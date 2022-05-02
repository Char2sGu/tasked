const { cpSync, existsSync } = require('fs');
const { argv } = require('process');

const [, , temporary, persisted] = argv;

function restore() {
  if (existsSync(persisted)) cpSync(persisted, temporary);
}
function persist() {
  cpSync(temporary, persisted);
}

restore();
console.log('database restored');
setInterval(() => {
  persist();
  console.log('database persisted');
}, 60 * 1000);
