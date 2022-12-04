import { Input } from '../../../utils';
import { split } from '../../../utils/map';

function parseInput(input: Input) {
  return input
    .asRows()
    .map(split(','))
    .map(([first, second]) => [
      first.split('-').map(Number) as Range,
      second.split('-').map(Number) as Range,
    ]);
}

type Range = [number, number];
function contains([a, b]: Range, [c, d]: Range): boolean {
  return c <= a || b >= d;
}

export function first(input: Input) {
  const data = parseInput(input).filter(([first, second]) => {
    return contains(first, second) || contains(second, first);
  }).length;

  return data;
}

function overlaps([a, b]: Range, [c, d]: Range): boolean {
  return a < c ? c <= b : a <= d;
}

export function second(input: Input) {
  const data = parseInput(input).filter(([first, second]) => {
    return overlaps(first, second);
  }).length;

  return data;
}
