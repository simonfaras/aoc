const input = [
  [5, 1, 9, 5],
  [7, 5, 3],
  [2, 4, 6, 8],
];

const result = input.reduce(
  (sum, row) => row.reduce(([min, max], current), [row[0]]),
  0
);
