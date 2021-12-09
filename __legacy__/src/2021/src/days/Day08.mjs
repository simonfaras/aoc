const parse = (input) =>
  input
    .map((r) => r.split(' | '))
    .map(([input, output]) => [input.split(' '), output.split(' ')]);

export const puzzleA = (input) => {
  const data = parse(input);
  const check = [7, 4, 3, 2];
  const result = data
    .map(([_, output]) => output)
    .flat()
    .filter((code) => check.includes(code.length)).length;

  return result;
};

export const puzzleB = (input) => {
  const data = parse(input);

  const diff = (a, b) => {
    const arr = [...a, ...b];
    arr.sort();

    const result = [];
    while (arr.length) {
      const item = arr.shift();

      if (arr[0] !== item) {
        result.push(item);
      }

      while (arr[0] === item) {
        arr.shift();
      }
    }

    return result;
  };

  const intersect = (a, b) => {
    const res = [...a, ...b].reduce((acc, n) => {
      acc[n] = (acc[n] ?? 0) + 1;

      return acc;
    }, {});

    return Object.entries(res)
      .filter(([, count]) => count > 1)
      .map(([n]) => n);
  };

  const normalizeCode = (n) => n.split('').sort().join('');

  const decodeTable = (_input) => {
    const input = _input.map(normalizeCode).sort();
    // console.log(input);
    const positions = {};

    const numbers = Array(10).fill(null);
    const number = (n) => numbers[n].split('');

    numbers[1] = input.find((i) => i.length === 2);
    numbers[4] = input.find((i) => i.length === 4);
    numbers[7] = input.find((i) => i.length === 3);
    numbers[8] = input.find((i) => i.length === 7);

    numbers[6] = input.find(
      (i) => i.length === 6 && intersect(i.split(''), number(1)).length === 1
    );

    const _235 = [...new Set(input.filter((i) => i.length === 5))];
    const _09 = [
      ...new Set(input.filter((i) => i.length === 6 && i !== numbers[6])),
    ];
    const _de = diff(...[..._09].map((n) => n.split('')));
    // console.log(_de);

    positions.a = diff(number(1), number(7))[0];
    positions.d = number(4).find((n) => _de.includes(n));
    positions.e = _de.find((n) => n !== positions.d);
    positions.c = intersect(number(6), number(1))[0];
    positions.f = number(1).find((n) => n !== positions.c);

    numbers[2] = _235.find((n) => n.includes(positions.e));

    numbers[0] = _09.find(
      (n) => diff(n.split(''), number(8))[0] === positions.d
    );
    numbers[9] = _09.find(
      (n) => diff(n.split(''), number(8))[0] === positions.e
    );

    numbers[3] = _235.find(
      (n) => intersect(n.split(''), number(1)).length !== 1
    );
    numbers[5] = _235.find((n) => n !== numbers[3] && n !== numbers[2]);

    const numbersDecoder = numbers.reduce(
      (acc, code, i) => ({ ...acc, [code]: i }),
      {}
    );

    return {
      numbers: numbersDecoder,
      positions,
    };
  };

  const res = data.reduce((sum, [input, output]) => {
    const { numbers } = decodeTable(input);

    const part = output.reduce((partSum, number) => {
      const n = normalizeCode(number);

      return partSum + numbers[n];
    }, '');

    return sum + Number(part);
  }, 0);

  return res;
};
