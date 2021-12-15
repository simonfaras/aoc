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

function softForce(steps: number, input: Input) {
  const { pairs: rules, template } = parseInput(input);

  const lookup = Object.entries(rules).reduce<Record<string, [string, string]>>(
    (acc, [pair, insert]) => {
      return {
        ...acc,
        [pair]: [pair[0] + insert, insert + pair[1]],
      };
    },
    {}
  );

  const counter: Record<string, number> = {};

  const increment = (l: string, count: number): void => {
    counter[l] = (counter[l] ?? 0) + count;
  };

  const initial = template
    .split('')
    .reduce<Record<string, number>>((acc, l, i, arr) => {
      increment(l, 1);
      const next = arr[i + 1];
      if (next) {
        const code = l + next;
        acc[code] = (acc[code] ?? 0) + 1;
      }
      return acc;
    }, {});
  const pairs = [initial];

  seq(steps).forEach((_, index) => {
    let last = pairs[index];
    let next: typeof last = {};
    // console.log('loop', last);
    Object.entries(last).forEach(([pair, count]) => {
      const [a, b] = lookup[pair];
      increment(rules[pair], count);

      next[a] = count + (next[a] ?? 0);
      next[b] = count + (next[b] ?? 0);
    });
    pairs.push(next);
  });

  return Object.values(counter).sort((a, b) => a - b);
}

export function first(input: Input) {
  // To high 	3152788426517
  //					3152788426517
  //					3152788426516 // RÄTTS

  // To low 	2188189693529

  const res = softForce(10, input);
  return res.last() - res[0];
}

export function second(input: Input) {
  const res = softForce(40, input);
  return res.last() - res[0];
}
