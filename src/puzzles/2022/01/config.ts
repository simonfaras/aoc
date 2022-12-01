type Active = 'first' | 'second';

export const sample: number = 1;

export const active: Active = 'second';

export const expected = {
  first: 24000,
  second: 45000,
};
