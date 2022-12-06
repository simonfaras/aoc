import { Input } from '../../../utils';

function parseInput(input: Input) {
  return input.split('');
}

export function first(input: Input) {
  const data = parseInput(input);

  for (let i = 0; i < data.length; i++) {
    const end = i + 4;
    if (data.slice(i, end).unique((v) => v).length === 4) return end;
  }

  return data;
}

export function second(input: Input) {
  const data = parseInput(input);

  for (let i = 0; i < data.length; i++) {
    const end = i + 14;
    if (data.slice(i, end).unique((v) => v).length === 14) return end;
  }

  return data;
}
