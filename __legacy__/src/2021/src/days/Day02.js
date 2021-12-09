const parseInput = (arr) =>
  arr.map((i) => i.split(' ')).map(([dir, dis]) => [dir, Number.parseInt(dis)]);

const pos = [0, 0];

const move = (dir, dis) => {
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

export const puzzleA = (input) => {
  const parsed = parseInput(input);
  parsed.forEach(([dir, dis]) => move(dir, dis));

  return pos[0] * pos[1];
};

export const puzzleB = (input) => {
  const sub = {
    h: 0,
    d: 0,
    a: 0,
  };
  const data = parseInput(input);

  data.forEach(([command, value]) => {
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
};
