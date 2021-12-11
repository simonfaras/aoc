import { Input } from '../../../utils';

function parseInput(input: Input) {
  return input.asRows().map((row) => row.split(' '));
}

const pos = [0, 0];

const move = (dir: string, dis: number) => {
  switch (dir) {
    case 'forward': {
      pos[0] = pos[0] + dis;
      break;
    }
    case 'down': {
      pos[1] = pos[1] + dis;
      break;
    }
    case 'up': {
      pos[1] = pos[1] - dis;
      break;
    }
  }
};

export function first(input: Input) {
  const data = parseInput(input);
  data.forEach(([dir, dis]) => move(dir, Number(dis)));

  return pos[0] * pos[1];
}

export function second(input: Input) {
  const sub = {
    h: 0,
    d: 0,
    a: 0,
  };
  const data = parseInput(input);

  data.forEach(([command, v]) => {
    const value = Number(v);
    if (command === 'down') {
      sub.a += value;
    }
    if (command === 'up') {
      sub.a -= value;
    }
    if (command === 'forward') {
      sub.h += value;
      sub.d += sub.a * value;
    }
  });

  return sub.h * sub.d;
}
