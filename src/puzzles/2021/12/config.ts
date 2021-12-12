type Active = 'first' | 'second';

export const sample: number = 2;

export const active: Active = 'second';

const expect_1: Record<number, number> = {
  1: 10,
  2: 19,
  3: 226,
};

const expect_2: Record<number, number> = {
  1: 36,
  2: 103,
  3: 3509,
};

export const expected = {
  first: expect_1[sample],
  second: expect_2[sample],
};
