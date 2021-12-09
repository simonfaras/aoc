import React from 'react';
import { test, real, test2 } from './input';

const isTest = false;

const sort = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const calc1 = (input) => {
  const numbers = input.slice().sort(sort);
  numbers.push(numbers[numbers.length - 1] + 3);

  let diff1 = 0;
  let diff3 = 0;

  let prev = 0;

  while (numbers.length) {
    const [current] = numbers.splice(0, 1);

    const diff = current - prev;
    if (diff === 1) {
      diff1++;
    }
    if (diff === 3) {
      diff3++;
    }
    prev = current;
  }

  return diff1 * diff3;
};

const calc2 = (input) => {
  const numbers = input.slice().sort(sort);
  numbers.unshift(0);
  numbers.push(numbers[numbers.length - 1] + 3);

  let paths = [];

  for (let i = 0; i < numbers.length - 1; i++) {
    const currentAdapter = numbers[i];
    let nextAdapterIndex = i + 1;
    let connections = 0;

    while (numbers[nextAdapterIndex] - currentAdapter <= 3) {
      connections++;
      nextAdapterIndex++;
    }

    const prevConnections = paths[paths.length - 1];
    if (connections > 1 && prevConnections > 1) {
      paths[paths.length - 1] += connections - 1;
    } else {
      paths.push(connections);
    }
  }

  return paths.reduce((result, split) => result * split, 1);
};

export default () => {
  const res = calc2(isTest ? test() : real());

  return <p>{res ?? 'NOTHING'}</p>;
};
