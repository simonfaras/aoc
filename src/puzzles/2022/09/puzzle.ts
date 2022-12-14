import { getNeightbourPoints, Grid, Input, Point, seq } from '../../../utils';

function parseInput(input: Input) {
  return input
    .asRows()
    .splitAll(' ')
    .map(([d, n]) => [d, Number(n)] as const);
}

const move = (points: Point[], dir: string) => {
  const prev = points.map(({ x, y }) => ({
    x,
    y,
  }));
  const next = points.map(({ x, y }) => ({
    x,
    y,
  }));

  const head = next[0];

  switch (dir) {
    case 'R':
      head.x += 1;
      break;
    case 'L':
      head.x -= 1;
      break;
    case 'U':
      head.y -= 1;
      break;
    case 'D':
      head.y += 1;
      break;
  }

  for (let i = 1; i < next.length; i++) {
    const follow = next[i - 1];
    const current = next[i];

    if (
      Math.abs(follow.y - current.y) > 1 ||
      Math.abs(follow.x - current.x) > 1
    ) {
      const [newPos] = [
        ...getNeightbourPoints(follow, true),
        ...getNeightbourPoints(current, false),
      ].duplicates((p) => `${p.x},${p.y}`);

      next[i] = Object.assign({}, newPos ?? prev[i - 1]);
    } else {
      next[i] = Object.assign({}, current);
    }
  }
  return next;
};

function run(input: Input, ropeLength: number) {
  const data = parseInput(input);

  let rope: Point[] = Array(ropeLength).fill({ x: 0, y: 0 });

  const positions: Point[][] = [];
  data.forEach(([dir, count]) => {
    seq(count).forEach(() => {
      rope = move(rope, dir);
      positions.push([...rope]);
    });
  });

  const tailPositions = positions.map((pos) => pos.last());

  Grid.plotNormalized(positions.last(), '.', (p) => '#').print();

  return new Set(tailPositions.map((p) => `${p.x},${p.y}`)).size;
}

export function first(input: Input) {
  return run(input, 2);
}

export function second(input: Input) {
  return run(input, 10);
}
