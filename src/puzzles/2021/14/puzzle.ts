import { Input, seq } from '../../../utils';

function parseInput(input: Input): {
  template: string;
  pairs: Record<string, string>;
} {
  const [template, , ...pairs] = input.asRows();

  return {
    template,
    pairs: Object.fromEntries(
      pairs.splitAll(' -> ').filter((v) => v.length > 1)
    ),
  };
}

function generate(input: string, rules: Record<string, string>): string {
  const res: string[] = [];
  const inject = (a: string, b?: string) => {
    if (!b) return a;
    return [a, rules[a + b], b].join('');
  };

  input.split('').forEach((letter, i, arr) => {
    res.push(inject(letter, arr[i + 1]));
  });

  return res.join('');
}

// Each step length = length + length - 2

function bruteForce(steps: number, input: Input) {
  const { pairs, template } = parseInput(input);

  const result = seq(10)
    .reduce((code) => generate(code, pairs), template)
    .split('')
    .groupBy((v) => v);

  const counts = Object.values(result)
    .map((arr) => arr.length)
    .sort((a, b) => a - b);

  return counts.last() - counts[0];
}

function softForce(steps: number, input: Input) {
  const { pairs } = parseInput(input);

  const parts = Object.keys(pairs)
    .flatMap((v) => v.split(''))
    .unique((v) => v);
  console.log(parts);

  // When we reach the point where all pairs are present
  // * check how many steps we took
  // * check how many of each letter we have
  // * Calculate the increase rate of each letter and apply formula to full steps

  const inject = (pair: string) =>
    `${pair.split('')[0]}${pairs[pair]}${pair.split('')[1]}`;

  const cyclic = Object.entries(pairs).filter(([pair, out]) => {
    const injected = inject(pair);

    console.log(pair, out, injected, injected.includes(pair));

    return pair;
  });

  console.log(pairs);
}

export function first(input: Input) {
  // return bruteForce(10, input);
  return bruteForce(10, input);
}

export function second(input: Input) {
  if (input.startsWith('NNCB')) return true;

  console.log(bruteForce(40, input));

  return true;
}
