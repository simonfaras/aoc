import { seq, Input, Cell, Grid } from '../../../utils';

function parseInput(input: Input) {
  return input.asNumbersGrid('');
}

function step(grid: Grid<number>): number {
  let flashed: Cell<number>[] = [];
  let flashers = grid.updateAll((v) => v + 1).filterCells((v) => v > 9);

  while (!!flashers.length) {
    const flash = flashers.shift() as Cell<number>;
    flashed.push(flash);

    const neighbours = grid.getNeighbours(flash.pos).filter((c) => c.value < 10);

    neighbours.forEach((cell) => {
      const updated = grid.set(cell.value + 1, cell.pos);
      if (updated > 9) flashers.push(cell); // note that cell has the old value here
    });
  }

  // reset flashed
  flashed.forEach((cell) => {
    grid.set(0, cell.pos);
  });

  return flashed.length;
}

export function first(input: Input) {
  const data = parseInput(input);

  return range(100)
    .map(() => step(data))
    .sum();
}

export function second(input: Input) {
  const data = parseInput(input);

  const all = data.size;
  let steps = 1;
  while (step(data) !== all) {
    steps++;
  }

  console.log(steps);

  return true;
}
