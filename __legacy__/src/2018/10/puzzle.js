const { grid, serialize } = require('../../utils/grid');
const { max, min } = require('../../utils');

const parseInput = (input) => {
  return input
    .map((i) => i.match(/-?\d+/gm))
    .map(([px, py, vx, vy]) => ({
      position: {
        x: Number(px),
        y: Number(py),
      },
      velocity: {
        x: Number(vx),
        y: Number(vy),
      },
    }));
};

function* light(position, velocity) {
  let point = [position.x, position.y];
  while (true) {
    yield point;

    point = [point[0] + velocity.x, point[1] + velocity.y];
  }
}

const print = (points) => {
  const g = grid(points);

  console.log(serialize(g));
};

const getGridSize = (points) => {
  const { xs, ys } = points.reduce(
    (acc, [x, y]) => ({
      xs: [...acc.xs, x],
      ys: [...acc.ys, y],
    }),
    { xs: [], ys: [] }
  );

  // . . .
  // 1, -1 => 1 - -1 = 2
  const width = max(xs) - min(xs);
  const height = max(ys) - min(ys);

  return width * height;
};

const getSmallestSnapshot = (lights) => {
  const history = [];
  const limit = 50000;

  for (let i = 0; i < limit; i++) {
    const points = lights.map((l) => l.next().value);
    const size = getGridSize(points);
    if (i > 0) {
      const last = history[i - 1];
      if (last.size < size) {
        return { result: last.points, elapsed: i - 1 };
      }
    }
    history.push({ points, size });
  }
};

function first(input) {
  const lights = parseInput(input).map(({ position, velocity }) =>
    light(position, velocity)
  );

  const { result } = getSmallestSnapshot(lights);

  print(result);
  return null;
}

function second(input) {
  const lights = parseInput(input).map(({ position, velocity }) =>
    light(position, velocity)
  );

  const { elapsed } = getSmallestSnapshot(lights);

  return elapsed;
}

module.exports = {
  first,
  second,
};
