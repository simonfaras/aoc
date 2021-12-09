const parse = (input) => input.split(',').map(Number);

export const puzzleA = (input) => {
  const data = parse(input);

  data.sort((a, b) => a - b);

  let median = data[data.length / 2];
  // if (data.length % 2 === 1) {
  //   median = median + data[data.length / 2 + 1] / 2;
  // }

  console.log(data);
  const fuel = data.reduce((acc, n) => {
    const f = Math.abs(median - n);
    return acc + f;
  }, 0);

  return fuel;
};

export const puzzleB = (input) => {
  const data = parse(input);

  data.sort((a, b) => a - b);

  const getFuel = (pos, align) => {
    const distance = Math.abs(align - pos);

    return (distance * (distance + 1)) / 2;
  };

  const calcFuel = (align) =>
    data.reduce((sum, n) => sum + getFuel(n, align), 0);

  const posistions = Array(data[data.length - 1] - data[0]).fill(0);

  const fuel = posistions.reduce((low, _, n) => {
    const pos = n + data[0];
    const f = calcFuel(pos);

    if (f < low) return f;
    return low;
  }, Number.MAX_SAFE_INTEGER);

  return fuel;
};

// 104691380

// 95480037
