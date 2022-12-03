import { Input } from '../../../utils';

function parseInput(input: Input) {
  return input.asRows().map((r) => r.split(' '));
}

const shapeValue: Record<string, [number, string, string]> = {
  X: [1, 'C', 'A'],
  Y: [2, 'A', 'B'],
  Z: [3, 'B', 'C'],
};

function getScore([a, b]: [string, string]): number {
  const [shape, beats, equals] = shapeValue[b];

  if (a === equals) return 3 + shape;
  if (a === beats) return 6 + shape;
  return shape;
}

export function first(input: Input) {
  const data = parseInput(input).map(getScore).sum();

  return data;
}

// A - rock < C
// B - paper < A
// C - sissors < B

const shapes: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
};

const map: Record<string, [string, string]> = {
  A: ['C', 'B'],
  B: ['A', 'C'],
  C: ['B', 'A'],
};

function getScore_2([a, b]: [string, string]): number {
  const [beats, beatenBy] = map[a];
  if (b === 'X') return 0 + shapes[beats];
  if (b === 'Y') return 3 + shapes[a];
  return 6 + shapes[beatenBy];
}

export function second(input: Input) {
  // X lose
  // y draw
  // Z win
  const data = parseInput(input).map(getScore_2).sum();

  return data;
}
