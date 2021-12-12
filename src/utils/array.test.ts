import { seq } from './array';

describe('seq', function () {
  it('should return a sequence if length', function () {
    expect(seq(5)).toEqual([0, 1, 2, 3, 4]);
  });

  it('should return as sequence starting at "start"', function () {
    expect(seq(5, -2)).toEqual([-2, -1, 0, 1, 2]);
  });
});

describe('Array.duplicates', function () {
  it('should return duplicated elements', function () {
    const array = [1, 2, 3, 4, 4, 5, 5];

    expect(array.duplicates((n) => n)).toEqual([4, 5]);
  });
});
