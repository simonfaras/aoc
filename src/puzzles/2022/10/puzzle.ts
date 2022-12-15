import { Grid, Input } from '../../../utils';
import { color } from '../../../utils/console';

function parseInput(input: Input) {
  return input
    .asRows()
    .map((row) => row.split(' '))
    .flatMap(([command, value]) => {
      if (command === 'noop') return [0];

      return [0, Number(value)];
    });
}

export function first(input: Input) {
  const data = parseInput(input);

  let register = 1;
  const results = [];
  for (let i = 0; i < data.length; i++) {
    const cycle = i + 1;
    const mark = cycle - 20;

    console.debug({ i, v: data[i], cycle, register });
    if (mark === 0 || mark % 40 === 0) {
      console.debug(cycle, register, cycle * register);
      results.push(cycle * register);
    }
    register += data[i];
  }
  console.debug(register);

  console.debug(results);
  return results.sum();
}

export function second(input: Input) {
  const data = parseInput(input);

  console.debug('-----------------------------');
  const screen = Grid.fromDimension(40, 6, '.');

  let register = 1;
  for (let i = 0; i < data.length; i++) {
    const y = Math.floor(i / 40);
    const x = i > 39 ? i % 40 : i;

    // console.debug({ x, y });

    if (x === register || register - 1 === x || register + 1 === x) {
      screen.set('#', { x, y });
    }
    register += data[i];
  }

  screen.print({
    format: (v) => (v === '#' ? color(v, { fg: 'red', bg: 'black' }) : v),
  });

  return true;
}
