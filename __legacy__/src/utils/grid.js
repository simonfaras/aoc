const { max, min } = require('.');

// '.' = empty, '#" = specified
const createGrid = (points, limit = Number.MAX_VALUE) => {
  const xValues = points.map(([x]) => x);
  const yValues = points.map(([_, y]) => y);
  const offsetY = Math.abs(Math.min(0, min(yValues)));
  const offsetX = Math.abs(Math.min(0, min(xValues)));

  const maxY = Math.min(max(yValues) + offsetY, limit);
  const maxX = Math.min(max(xValues) + offsetX, limit);

  console.log('max', maxX, maxY, limit);

  const grid = new Array(maxY + 1);

  for (let row = 0; row < grid.length; row++) {
    grid[row] = new Array(maxX + 1);
    for (let col = 0; col < grid[row].length; col++) {
      const isPoint = points.find(
        ([x, y]) => x + offsetX === col && row === y + offsetY
      );
      grid[row][col] = isPoint ? '#' : '.';
    }
  }

  return grid;
};

const serialize = (grid) => {
  return grid.map((row) => row.join('')).join('\n');
};

module.exports = {
  grid: createGrid,
  serialize,
};
