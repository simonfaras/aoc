const parse = (input) => input.split(',').map(Number);

export const puzzleA = (input) => {
  const data = parse(input);

  const days = 256;
  let current = data.reduce((acc, days) => {
    acc[days] += 1;
    return acc;
  }, Array(9).fill(0));

  for (let i = 0; i < days; i++) {
    const breeder = current.shift();

    current[6] += breeder;
    current.push(breeder);
  }

  return current.reduce((sum, f) => (sum += f), 0);
};

export const puzzleB = (input) => {
  const data = parse(input);

  return data;
};
