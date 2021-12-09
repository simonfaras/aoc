const input = require('input');

function sollution(input) {}
let match = false;
let matchingId;
let replaceIndex;

while (input.length > 0 && !match) {
  const current = input.shift();

  const currentArr = current.split('');
  input.forEach((id) => {
    let mismatchIndex = -1;
    let mismatches = 0;
    for (let i = 0; i < currentArr.length; i++) {
      const letter = currentArr[i];
      if (letter !== id[i]) {
        mismatches++;
        mismatchIndex = i;
      }
      if (mismatches > 1) {
        break;
      }
    }
    if (mismatches === 1) {
      match = true;
      matchingId = id;
      replaceIndex = mismatchIndex;
    }
  });
}

console.log(matchingId, replaceIndex);
let result = matchingId.split('');
result.splice(replaceIndex, 1);
console.log(result.join(''));

module.exports = {
  run: () => sollution(input),
  test: sollution,
};
