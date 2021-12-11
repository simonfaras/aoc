import { Grid, Input } from './core';
import { EOL } from 'os';

describe('Input', function () {
  it('should parse input as string', function () {
    const input = new Input('string');

    expect(input.toString()).toEqual('string');
  });

  it('should return array from asArray', function () {
    const input = new Input('1,2,3');

    expect(input.asArray()).toEqual(['1', '2', '3']);
  });

  it('should return array from asArray with custom separator', function () {
    const input = new Input('1 2 3');

    expect(input.asArray(' ')).toEqual(['1', '2', '3']);
  });

  it('should return rows from asRows', function () {
    const input = new Input(['1', '2', '3'].join(EOL));

    expect(input.asRows()).toEqual(['1', '2', '3']);
  });

  it('should return array of numbers from asNumbers', function () {
    const input = new Input('1,2,3');

    expect(input.asNumbers()).toEqual([1, 2, 3]);
  });

  it('should return grid from asGrid', function () {
    const input = new Input(['0 1', '2 3'].join(EOL));

    expect(input.asGrid().out()).toEqual([
      ['0', '1'],
      ['2', '3'],
    ]);
  });

  it('should return grid of numbers from asNumbersGrid', function () {
    const input = new Input(['0 1', '2 3'].join(EOL));

    expect(input.asNumbersGrid().out()).toEqual([
      [0, 1],
      [2, 3],
    ]);
  });

  it('should apply custom parser to asGrid', function () {
    const input = new Input(['0 1', '2 3'].join(EOL));

    expect(input.asGrid(' ', (v, { x, y }) => `${v}-${x}-${y}`).out()).toEqual([
      ['0-0-0', '1-1-0'],
      ['2-0-1', '3-1-1'],
    ]);
  });

  it('should return a normalized grid from asNormalized', function () {
    const input = new Input(['0 1', '2 3'].join(EOL));

    expect(input.asNumbersGrid().out()).toEqual([
      [0, 1],
      [2, 3],
    ]);
  });
});

describe('Grid', function () {
  it('should return a normalized grid from asNormalized', function () {
    const grid = new Grid([
      [1, 2],
      [3, 4],
    ]);

    expect(grid.asNormalized()).toEqual(
      expect.objectContaining({
        '0,0': 1,
        '1,0': 2,
        '0,1': 3,
        '1,1': 4,
      })
    );
  });

  it('should provide access to cells through get', function () {
    const grid = new Grid([
      [1, 2],
      [3, 4],
    ]);

    expect(grid.get(0, 0)).toEqual(1);
    expect(grid.get(0, 1)).toEqual(3);
    expect(grid.get(1, 0)).toEqual(2);
    expect(grid.get(1, 1)).toEqual(4);
  });

  it('should update all', function () {
    const grid = new Grid([
      [1, 2],
      [3, 4],
    ]);

    grid.updateAll((v) => {
      return v + 1;
    });

    expect(grid.get(0, 0)).toEqual(2);
    expect(grid.get(0, 1)).toEqual(4);
    expect(grid.get(1, 0)).toEqual(3);
    expect(grid.get(1, 1)).toEqual(5);
  });
});
