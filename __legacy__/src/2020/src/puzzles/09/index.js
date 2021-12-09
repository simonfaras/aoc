import React from 'react';
import { test, real } from './input';

const isTest = false;
const PREAMBLE_LENGTH = isTest ? 5 : 25;

const calc1 = (input) => {
  const isValid = (number, prev) => {
    return prev.some((n1) =>
      prev.some((n2) => n2 !== n1 && n1 + n2 === number)
    );
  };

  for (let i = PREAMBLE_LENGTH; i < input.length; i++) {
    const n = input[i];
    const preamble = input.slice(i - PREAMBLE_LENGTH, i);
    if (!isValid(n, preamble)) {
      return n;
    }
  }

  return -1;
};

const calc2 = (input) => {
  const NUMBER = isTest ? 127 : 1504371145;

  for (let i = 0; i < input.length; i++) {
    let sum = input[i];
    let numbers = [input[i]];
    let j = i + 1;
    while (sum < NUMBER) {
      sum += input[j];
      numbers.push(input[j]);
      j++;
    }
    if (sum === NUMBER) {
      return Math.max(...numbers) + Math.min(...numbers);
    }
  }
};

export default () => {
  const res = calc2(isTest ? test() : real());

  console.log(res);

  return <p>{res}</p>;
};
