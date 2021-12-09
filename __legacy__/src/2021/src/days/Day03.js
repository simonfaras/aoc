const parse = (input) =>
  input.map((c) => c.split('').map((n) => Number.parseInt(n)));

export const puzzleA = (input) => {
  const data = parse(input);
  console.log(data);
  const count = Array(data[0].length).fill(0);
  data.forEach((code) => {
    code.forEach((n, i) => {
      if (n) count[i]++;
    });
  });
  console.log(count);
  const bin = count.reduce(
    (acc, c, i) => {
      if (c > data.length / 2) {
        acc.g[i] = 1;
        acc.e[i] = 0;
      }
      return acc;
    },
    { g: Array(count.length).fill(0), e: Array(count.length).fill(1) }
  );
  const gamma = Number.parseInt(bin.g.join(''), 2);
  const epsilon = Number.parseInt(bin.e.join(''), 2);

  return gamma * epsilon;
};

function extracted(data, keep) {
  let codes = data.slice();
  for (let i = 0; i < codes[0].length; i++) {
    const keepInPos = keep(codes, i);
    codes = codes.filter((code) => code[i] === keepInPos);
    if (codes.length === 1) break;
  }

  console.log(codes);
  return Number.parseInt(codes[0].join(''), 2);
}

export const puzzleB = (input) => {
  const data = parse(input);

  const keep = (check) => (codes, index) => {
    return (
      check(
        codes,
        codes.reduce((sum, code) => sum + code[index], 0)
      ) + 0
    );
  };
  const ox = extracted(
    data,
    keep((codes, n) => n >= codes.length / 2)
  );
  const co = extracted(
    data,
    keep((codes, n) => n < codes.length / 2)
  );

  return ox * co;
};
