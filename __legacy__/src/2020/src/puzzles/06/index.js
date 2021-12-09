import React from 'react';
import { test, real } from './input';

const isTest = false;

const calc1 = (input) => {
  let sum = 0;
  input.forEach((group) => {
    const groupAnswers = new Set();
    group.forEach((person) => {
      person.forEach((answer) => {
        groupAnswers.add(answer);
      });
    });

    sum += groupAnswers.size;
  });
  return sum;
};

const calc2 = (input) => {
  let sum = 0;
  input.forEach((group, i) => {
    const groupAnswers = group.reduce((acc, person) => {
      person.forEach((answer) => {
        const current = acc[answer] ?? 0;
        acc[answer] = current + 1;
      });
      return acc;
    }, {});

    const entries = Object.entries(groupAnswers);
    const count = entries.reduce((s, [answer, c]) => {
      return c === group.length ? s + 1 : s;
    }, 0);

    sum += count;
  });
  return sum;
};

export default () => {
  const res = calc2(isTest ? test() : real());

  return <p>{res}</p>;
};
