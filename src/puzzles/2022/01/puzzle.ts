import { Input } from '../../../utils';

function parseInput(input: Input) {
  return input
    .split(`\r\n\r\n`)
    .map((row) => row.split('\r\n').map((n) => parseInt(n)))
    .map((row) => row.sum());
}

export function first(input: Input) {
  const data = parseInput(input);

  return Math.max(...data);
}

export function second(input: Input) {
  const data = parseInput(input).toDesc();

  return data.splice(0, 3).sum();
}
