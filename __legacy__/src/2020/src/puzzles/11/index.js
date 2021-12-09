import React from 'react';
import { test, real } from './input';

const isTest = false;

const isFloor = (slot) => slot === '.';
const isFree = (slot) => slot === 'L';
const isOccupied = (slot) => slot === '#';

const BREAK_MAX = 50;

const getAdjacentOccupiedCount = (row, seat, layout) => {
  let occupied = 0;
  for (let i = row - 1; i <= row + 1; i++) {
    if (layout[i]) {
      for (let j = seat - 1; j <= seat + 1; j++) {
        if (!(row === i && seat === j) && layout[i][j] === '#') {
          occupied++;
        }
      }
    }
  }
  return occupied;
};

const getNewState = (row, seat, layout) => {
  const state = layout[row][seat];
  if (state === '.') {
    return '.';
  }
  const occupiedAdjacent = getAdjacentOccupiedCount(row, seat, layout);
  if (state === '#' && occupiedAdjacent >= 4) {
    return 'L';
  }
  if (state === 'L' && occupiedAdjacent === 0) {
    return '#';
  }
  return state;
};

const calc1 = (input) => {
  const rearrange = (layout) => {
    const newLayout = [];
    for (let row = 0; row < layout.length; row++) {
      newLayout[row] = [];
      for (let col = 0; col < layout[row].length; col++) {
        newLayout[row][col] = getNewState(row, col, layout);
      }
    }

    return newLayout;
  };
  let layout = input;
  let loop = 1;
  while (loop) {
    const newLayout = rearrange(layout);

    loop++;
    if (newLayout.toString() !== layout.toString()) {
      layout = newLayout;
    } else {
      console.log('done at', loop);
      loop = false;
    }
  }

  return layout
    .toString()
    .split(',')
    .filter((s) => s === '#').length;
};

const calc2 = (input) => {};

export default () => {
  const res = calc1(isTest ? test() : real());

  return <p>{res ?? 'NOTHING'}</p>;
};
