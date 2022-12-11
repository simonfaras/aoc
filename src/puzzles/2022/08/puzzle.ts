import { Input, Cell, seq, Point } from '../../../utils';
import { color } from '../../../utils/console';

function parseInput(input: Input) {
  return input.asGrid('', (v) => Number.parseInt(v));
}

export function first_1(input: Input) {
  const data = parseInput(input);

  const rows = data.rows().slice(1, -1);
  const columns = data.columns().slice(1, -1);
  const dimensions = data.dimensions;

  function isVisibleInDirection(index: number, direction: number[]): boolean {
    const value = direction[index];

    return direction.slice(0, index).every((v) => v < value);
  }

  function isVisible(tree: Cell<number>): boolean {
    const { pos, value } = tree;
    const row = rows[pos.y - 1];
    const column = columns[pos.x - 1];

    const invertedIndex = (index: number, arr: unknown[]): number => {
      return arr.length - index;
    };

    const visible =
      isVisibleInDirection(pos.x, row) ||
      isVisibleInDirection(pos.y, column) ||
      isVisibleInDirection(invertedIndex(pos.x, row), [...row].reverse()) ||
      isVisibleInDirection(invertedIndex(pos.y, column), [...column].reverse());

    return visible;
  }

  function isInner(tree: Cell<number>): boolean {
    const { x, y } = tree.pos;

    return x !== 0 && y !== 0 && x < dimensions.w - 1 && y < dimensions.h - 1;
  }

  const inner = data.cells().filter(isInner).filter(isVisible);

  console.log(JSON.stringify(data.source, null, 2));

  const result = [
    data.cells().filter(isInner).filter(isVisible),
    data.cells().filter((c) => !isInner(c)),
  ];

  data.print();

  console.log('INNER');
  console.log(JSON.stringify(inner, null, 2));

  // return result.map((r) => r.length).sum();
}

export function first(input: Input) {
  const data = parseInput(input);

  const rows = data.rows().slice();
  const columns = data.columns().slice();

  // Get all visible instead
  function getVisible(items: number[]) {
    const visible: number[] = [];
    for (let i = 0; i < items.length; i++) {
      const prevItems = items.slice(0, i);
      const current = items[i];
      if (prevItems.length === 0 || prevItems.every((prev) => current > prev)) {
        visible.push(i);
      }
    }
    return visible;
  }

  const result: number[][] = [];

  result.push(
    ...rows
      .map((row, i) => {
        const visible = getVisible(row);

        return visible.map((v) => [v, i]);
      })
      .flat()
  );

  result.push(
    ...rows
      .map((row, i) => {
        const visible = getVisible(row.slice().reverse());

        return visible.map((v) => [row.length - 1 - v, i]);
      })
      .flat()
  );

  result.push(
    ...columns
      .map((column, i) => {
        const visible = getVisible(column);

        return visible.map((v) => [i, v]);
      })
      .flat()
  );

  result.push(
    ...columns
      .map((column, i) => {
        const visible = getVisible(column.slice().reverse());

        return visible.map((v) => [i, column.length - 1 - v]);
      })
      .flat()
  );

  const withoutEdges = result.filter(
    ([x, y]) =>
      x !== 0 &&
      y !== 0 &&
      x !== rows[0].length - 1 &&
      y !== columns[0].length - 1
  );

  data.print({
    format: (value, pos) => {
      if (result.find(([x, y]) => x === pos.x && y === pos.y)) {
        return color(value.toString(), { fg: 'red', bg: 'black' });
      }
      return value.toString();
    },
  });

  return new Set(result.map(([x, y]) => `${x},${y}`)).size;
}

export function second(input: Input) {
  const data = parseInput(input);

  let result: number = 0;

  function getNumberOfVisibleTrees(
    start: Point,
    reference: number,
    axis: 'x' | 'y',
    direction: 1 | -1
  ) {
    const log = (...args: any) => {
      if (start.x === 0 && start.y === 0) {
        console.log(...args);
      }
    };

    let next: Point | null = start;
    let count = 0;
    do {
      let { pos, value } = data.getNeighbour(next, axis, direction);
      if (value != null) {
        count += 1;
      }

      if (value < reference) {
        next = pos;
      } else {
        next = null;
      }
    } while (next != null);

    return count;
  }

  data.forEachCell((height, coord) => {
    const res = [
      getNumberOfVisibleTrees(coord, height, 'y', -1),
      getNumberOfVisibleTrees(coord, height, 'x', -1),
      getNumberOfVisibleTrees(coord, height, 'x', 1),
      getNumberOfVisibleTrees(coord, height, 'y', 1),
    ].product();

    if (res > result) {
      result = res;
    }
  });

  return result;
}
