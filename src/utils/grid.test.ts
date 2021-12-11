import { Grid } from './grid';
import { seq } from './array';

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

  it('should return all neighbours', function () {
    const grid = new Grid(
      seq(3 * 3).reduce<number[][]>((acc, v) => {
        const row = Math.floor(v / 3);
        if (acc[row] === undefined) acc[row] = [];
        acc[row].push(v);
        return acc;
      }, [])
    );

    expect(
      grid
        .getNeighbours({ x: 1, y: 1 })
        .map((cell) => cell.value)
        .sort((a, b) => a - b)
    ).toEqual([0, 1, 2, 3, 5, 6, 7, 8]);
  });

  it('should return simple neighbours', function () {
    const grid = new Grid(
      seq(3 * 3).reduce<number[][]>((acc, v) => {
        const row = Math.floor(v / 3);
        if (acc[row] === undefined) acc[row] = [];
        acc[row].push(v);
        return acc;
      }, [])
    );

    expect(
      grid
        .getNeighbours({ x: 1, y: 1 }, { simple: true })
        .map((cell) => cell.value)
        .sort((a, b) => a - b)
    ).toEqual([1, 3, 5, 7]);
  });
});
