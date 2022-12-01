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

describe('Array.toAsc', function () {
  it('should sort with default comparer', () => {
    const array = [1, 3, 4, 2, 2, 5];

    expect(array.toAsc()).toEqual([1, 2, 2, 3, 4, 5]);
  });
  it('should sort with custom comparer', () => {
    const array = [[1], [3], [4], [2], [2], [5]];

    expect(array.toAsc(([a], [b]) => a - b)).toEqual([
      [1],
      [2],
      [2],
      [3],
      [4],
      [5],
    ]);
  });
});

describe('Array.toDesc', function () {
  it('should sort with default comparer', () => {
    const array = [1, 3, 4, 2, 2, 5];

    expect(array.toDesc()).toEqual([5, 4, 3, 2, 2, 1]);
  });
  it('should sort with custom comparer', () => {
    const array = [[1], [3], [4], [2], [2], [5]];

    expect(array.toDesc(([a], [b]) => a - b)).toEqual([
      [5],
      [4],
      [3],
      [2],
      [2],
      [1],
    ]);
  });
});
