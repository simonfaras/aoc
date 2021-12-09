export const puzzleA = (input) => {
  return input.reduce((acc, n) => {
    if (!acc) return [n, 0];
    let [last, count] = acc;
    if (n > last) {
      count += 1;
    }

    return [n, count];
  }, undefined)[1];
};

export const puzzleB = (input) => {
  return input;
};
