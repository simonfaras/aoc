import React from 'react';
import { test, real } from './input';

const isTest = false;

const calc1 = (input) => {
  let acc = 0;
  let nextLine = 0;
  const commands = [];

  while (true) {
    if (commands.includes(nextLine)) {
      return acc;
    }
    const [instruction, argument] = input[nextLine];
    commands.push(nextLine);
    switch (instruction) {
      case 'nop': {
        nextLine++;
        break;
      }
      case 'acc': {
        acc += argument;
        nextLine++;
        break;
      }
      case 'jmp': {
        nextLine += argument;
        break;
      }
    }
  }
};

const calc2 = (input) => {
  const run = (program) => {
    let acc = 0;
    let nextLine = 0;
    const commands = [];

    while (true) {
      console.log(nextLine);
      if (commands.includes(nextLine)) {
        return -1;
      }
      if (nextLine >= program.length) {
        console.log('exit');
        return acc;
      }
      const [instruction, argument] = program[nextLine];
      commands.push(nextLine);
      switch (instruction) {
        case 'nop': {
          nextLine++;
          break;
        }
        case 'acc': {
          acc += argument;
          nextLine++;
          break;
        }
        case 'jmp': {
          nextLine += argument;
          break;
        }
      }
    }
  };

  const alterInputs = input
    .map(([instruction], index) => (instruction !== 'acc' ? index : null))
    .filter((i) => i !== null);

  for (let i = 0; i < alterInputs.length; i++) {
    const index = alterInputs[i];
    const [instruction, argument] = input[index];
    const newInstruction = instruction === 'nop' ? 'jmp' : 'nop';
    const program = [
      ...input.slice(0, index),
      [newInstruction, argument],
      ...input.slice(index + 1),
    ];

    console.log(program);

    const code = run(program);

    console.log('exit code', code);
    if (code !== -1) {
      return code;
    }
  }
  return -1;
};

export default () => {
  const res = calc2(isTest ? test() : real());

  console.log(res);

  return <p>{res}</p>;
};
