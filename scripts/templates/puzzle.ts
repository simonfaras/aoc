// @ts-expect-error
import { Input } from '../../../utils';

function parseInput(input: Input) {
  return input;
}

export function first(input: Input) {
  const data = parseInput(input);

  return data;
}

export function second(input: Input) {
  const data = parseInput(input);

  return data;
}
