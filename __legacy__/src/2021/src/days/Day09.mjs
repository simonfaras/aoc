const parse = (input) => input.map((r) => r.split('').map(Number));

const base = Array(3).fill(-1);
const offsets = base.reduce(
  (acc, x, x_i) => [...acc, ...base.map((y, y_i) => [x + x_i, y + y_i])],
  []
);
const simpleOffsets = offsets.filter(([x, y]) => Math.abs(x) !== Math.abs(y));

export const puzzleA = (input) => {
  const data = parse(input);

  const check = (r, c) => {
    const p = data[r][c];

    if (data[r][c - 1] <= p) return false;
    if (data[r][c + 1] <= p) return false;

    if (r !== 0 && data[r - 1][c] <= p) {
      return false;
    }

    if (r !== data.length - 1 && data[r + 1][c] <= p) {
      return false;
    }

    return p;
  };

  let res = 0;
  for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
      const p = check(r, c);

      if (p !== false) {
        res += p + 1;
      }
    }
  }

  return res;
};

export const puzzleB = (input) => {
  const data = parse(input);
  const id = (r, c) => `${r},${c}`;

  const points = data.reduce(
    (acc, row, row_i) => ({
      ...acc,
      ...row.reduce(
        (_acc, value, col_i) => ({ ..._acc, [id(row_i, col_i)]: value }),
        {}
      ),
    }),
    {}
  );

  const iter = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const getAdjacent = (r, c) => {
    return iter.map(([rOffset, cOffset]) => {
      return id(r + rOffset, c + cOffset);
    });
  };

  const isLowPoint = (r, c) => {
    const p = data[id(r, c)];

    if (data[r][c - 1] <= p) return false;
    if (data[r][c + 1] <= p) return false;

    if (r !== 0 && data[r - 1][c] <= p) {
      return false;
    }

    if (r !== data.length - 1 && data[r + 1][c] <= p) {
      return false;
    }

    return true;
  };

  function getBasinPoints(r, c) {
    const base = points[id(r, c)];

    const basinPoints = getAdjacent(r, c).filter(
      (point) => points[point] !== 9 && points[point] > base
    );

    return [
      id(r, c),
      ...basinPoints,
      ...basinPoints
        .map((p) => getBasinPoints(...p.split(',').map(Number)))
        .flat(),
    ];
  }

  const getBasin = (r, c) => {
    const points = getBasinPoints(r, c);

    return [...new Set(points)];
  };

  let basins = [];
  for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
      if (isLowPoint(r, c)) {
        basins.push(getBasin(r, c));
      }
    }
  }

  console.log(offsets);
  console.log(simpleOffsets);

  return basins
    .map((basin) => basin.length)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, n) => sum * n, 1);
};
