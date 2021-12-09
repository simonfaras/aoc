const { join } = require('path');
const fs = require('fs');

module.exports = function readInput(dir, test = false) {
  const filename = `input${test ? '-test' : ''}.txt`;

  return fs
    .readFileSync(join(dir, filename), { encoding: 'utf-8' })
    .replace(/\r?\n/gi, '\n')
    .split('\n');
};
