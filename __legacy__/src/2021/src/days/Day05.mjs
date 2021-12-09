const parse = (input) =>
  input
    .map((r) => r.split(' -> '))
    .map(([start, end]) => [
      start.split(',').map(Number),
      end.split(',').map(Number),
    ]);

export const puzzleA = (input) => {
  const data = parse(input).filter(
    ([[x1, y1], [x2, y2]]) => x1 === x2 || y1 === y2,
  );
  console.log(data);

  const id = (x, y) => `${x}-${y}`;

  const lines = {};
  data.forEach((line) => {
    const [[x1, y1], [x2, y2]] = line;
    // Vertical
    if (x1 === x2) {
      const dir = y2 - y1 < 0 ? -1 : 1;
      Array(Math.abs(y2 - y1) + 1)
        .fill(0)
        .forEach((_, dis) => {
          const point = id(x1, y1 + dis * dir);

          lines[point] = (lines[point] ?? 0) + 1;
        });
    }

    // Horizontal
    if (y1 === y2) {
      const dir = x2 - x1 < 0 ? -1 : 1;
      Array(Math.abs(x2 - x1) + 1)
        .fill(0)
        .forEach((_, dis) => {
          const point = id(x1 + dis * dir, y1);

          lines[point] = (lines[point] ?? 0) + 1;
        });
    }
  });

  const res = Object.entries(lines).filter(([_, count]) => count > 1);

  return JSON.stringify(res.length);
};

export const puzzleB = (input) => {
  const data = parse(input);

  const id = (x, y) => `${x}-${y}`;

  const lines = {};
  data.forEach((line) => {
    const [[x1, y1], [x2, y2]] = line;
    // Vertical
    if (x1 === x2) {
      const dir = y2 - y1 < 0 ? -1 : 1;
      Array(Math.abs(y2 - y1) + 1)
        .fill(0)
        .forEach((_, dis) => {
          const point = id(x1, y1 + dis * dir);

          lines[point] = (lines[point] ?? 0) + 1;
        });
    } else if (y1 === y2) {
      const dir = x2 - x1 < 0 ? -1 : 1;
      Array(Math.abs(x2 - x1) + 1)
        .fill(0)
        .forEach((_, dis) => {
          const point = id(x1 + dis * dir, y1);

          lines[point] = (lines[point] ?? 0) + 1;
        });
      // Diagonal
    } else {
      // Only 45 deg => y1 - y2 === x1 - x2
      const dirX = x2 - x1 < 0 ? -1 : 1;
      const dirY = y2 - y1 < 0 ? -1 : 1;

      Array(Math.abs(x2 - x1) + 1)
        .fill(0)
        .forEach((_, dis) => {
          const x = x1 + dis * dirX;
          const y = y1 + dis * dirY;

          const point = id(x, y);
          lines[point] = (lines[point] ?? 0) + 1;
        });
    }
  });

  // console.log(lines);

  const res = Object.entries(lines).filter(([_, count]) => count > 1);

  return res.length;
};
