const { resolve } = require('path');
const { first, second } = require('./puzzle');

const input = fs
  .readFileSync(resolve(__dirname, 'input.txt'), { encoding: 'utf-8' })
  .replace(/\r?\n/gi, '@@')
  .split('@@');

describe('2018/04-1', () => {
  it('should produce a correct answer', () => {
    expect(first(input)).toEqual(240);
  });
});

describe('2018/04-2', () => {
  it('should should produce a correct answer', () => {
    expect(second(input)).toEqual(4455);
  });
});
