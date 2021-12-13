import { Grid, Input, Point, seq } from '../../../utils';
import { color } from '../../../utils/console';

interface Instruction {
  axis: keyof Point;
  index: number;
}

function parseInput(input: Input) {
  const rows = input.asRows();
  const split = rows.indexOf('');
  const points = rows
    .slice(0, split)
    .splitAll(',')
    .map(([x, y]) => ({
      x: Number(x),
      y: Number(y),
    }));

  return {
    points,
    instructions: rows
      .slice(split + 1)
      .splitAll(' ')
      .map(([, , v]) => {
        const [axis, index] = v.split('=');

        return { axis, index: Number(index) } as Instruction;
      }),
  };
}

function fold(
  points: Point[],
  instructions: { axis: keyof Point; index: number }[]
): Point[] {
  return instructions.reduce((folded, { axis, index }) => {
    return folded
      .map((point) => {
        if (point[axis] > index) {
          return { ...point, [axis]: index - (point[axis] - index) };
        }
        return point;
      }, [])
      .unique(({ x, y }) => `${x},${y}`);
  }, points);
}

export function first(input: Input) {
  const data = parseInput(input);

  const res = fold(data.points, data.instructions.slice(0, 1));

  return res.length;
}

export function second(input: Input) {
  const data = parseInput(input);

  const res = fold(data.points, data.instructions);

  Grid.plot(res, ' ', () => '#').print({
    format: (v) => (v === '#' ? color(v, { fg: 'red', bg: 'red' }) : v),
  });

  return true;
}
