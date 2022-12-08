import { Input, seq } from '../../../utils';

function parseInput(input: Input) {
  const [stacks_raw, instructions] = input.split(`${input.eol + input.eol}`);

  const stacks: string[][] = [];

  new Input(stacks_raw)
    .asRows()
    .reverse()
    .slice(1)
    .splitAll('')
    .forEach((row) => {
      let col = 0;
      while (row.length) {
        if (!stacks[col]) stacks.push([]);
        const [, v] = row.splice(0, 4);
        if (v !== ' ') stacks[col].push(v);

        col += 1;
      }
    });

  return {
    stacks,
    instructions: new Input(instructions).asRows().map((row) =>
      row
        .split(' ')
        .map(Number)
        .filter((v) => !isNaN(v))
    ),
  };
}

export function first(input: Input) {
  const { stacks, instructions } = parseInput(input);

  instructions.forEach(([n, f, t]) => {
    stacks[t - 1].push(
      ...stacks[f - 1].splice(stacks[f - 1].length - n).reverse()
    );
  });

  return stacks.map((s) => s.pop()).join('');
}

export function second(input: Input) {
  const { stacks, instructions } = parseInput(input);

  instructions.forEach(([n, f, t]) => {
    stacks[t - 1].push(...stacks[f - 1].splice(stacks[f - 1].length - n));
  });

  return 0;

  return stacks.map((s) => s.pop()).join('');
}
