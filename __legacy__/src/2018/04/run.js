const fs = require('fs');
const { resolve } = require('path');
const { first, second } = require('./puzzle');

const inputName = process.argv[3] || 'input.txt';

function readInput() {
  const content = fs.readFileSync(resolve(__dirname, inputName), {
    encoding: 'utf-8',
  });

  return content.replace('\r\n', '\n').split('\n');
}

const input = readInput();

console.log(first(input));
console.log(second(input));
