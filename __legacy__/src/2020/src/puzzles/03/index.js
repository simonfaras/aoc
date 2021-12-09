import React from 'react';
import { test, real } from './input';

const isTest = false;

const calc1 = (input) => {
  const grid = input.slice(0);
  console.log(grid);
  let treeCount = 0;
  let col = 0;
  for (let row = 0; row < grid.length; row++) {
    console.log({ row, col });
    if (grid[row][col] === '#') {
      treeCount++;
    }

    const overflow = grid[row].length;

    col = col + 3;
    if (col >= overflow) {
      col = col - overflow;
    }
  }

  return treeCount;
};

const calc2 = (input) => {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  const grid = input.slice(0);
  console.log(grid);

  const results = slopes.map(([right, down]) => {
    let treeCount = 0;
    let col = 0;
    for (let row = 0; row < grid.length; row = row + down) {
      if (grid[row][col] === '#') {
        treeCount++;
      } else {
        grid[row][col] = 'X';
      }

      const overflow = grid[row].length;

      col = col + right;
      if (col >= overflow) {
        col = col - overflow;
      }
    }
    return treeCount;
  });

  console.log(results);
  return results.reduce((acc, count) => acc * count, 1);
};

export default () => {
  const res = calc2(isTest ? test() : real());

  return <p>{res}</p>;
};
