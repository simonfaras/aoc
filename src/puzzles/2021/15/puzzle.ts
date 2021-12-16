import { Grid, Input, Point, seq } from '../../../utils';
import { color } from '../../../utils/console';
import { rootLogger } from 'ts-jest';

type Id = `${number},${number}`;

interface Node {
  id: Id;
  pos: Point;
  value: number;
  f: number;
  g: number;
  h: number;
  parent?: Node;
}

function createGrid(grid: Grid<number>): Grid<Node> {
  return new Grid<Node>(
    grid.source.map((row, y) =>
      row.map((v, x) => ({
        id: Grid.coord(x, y),
        pos: { x, y },
        value: v,
        g: Number.MAX_SAFE_INTEGER,
        h: Number.MAX_SAFE_INTEGER,
        f: Number.MAX_SAFE_INTEGER,
      }))
    )
  );
}

function parseInput(input: Input) {
  return input.asNumbersGrid('');
}

// closed list {id: true}
// open list [{id, f, parent}]

// Open = priority
// Closed = hash
// f(x) = g(x) + h(x)
// x =

function manhattan(a: Point, b: Point): number {
  return Math.abs(a.x - b.x) - Math.abs(a.y - b.y);
}

function heuristic(a: Point, b: Point, grid: Grid<Node>): number {
  return manhattan(a, b);
}

function findPath(grid: Grid<Node>): number {
  console.log('--------------------------------------------');
  const open: Node[] = [];
  const openMap = new Map<Id, boolean>();
  const closedMap = new Map<Id, boolean>();

  const traversePath = (node: Node): Node[] => {
    let current = node;
    const path: Node[] = [];
    while (current.parent) {
      current = current.parent;
      path.push(current);
    }
    return path;
  };

  console.log(grid.dimensions);

  const target = grid.get(grid.dimensions.w - 1, grid.dimensions.h - 1);
  const start = grid.get(0, 0);
  start.value = 0;

  const addToOpen = (node: Node) => {
    open.push(node);
    openMap.set(node.id, true);
  };

  const popFromOpen = (): Node | undefined => {
    const node = open.sort((a, b) => b.f - a.f).pop();

    if (node) {
      openMap.delete(node.id);
    }
    return node;
  };

  const getG = (node: Node) => {
    return traversePath(node).reduce((sum, node) => sum + node.value, 0);
  };

  const getH = (node: Node): number => {
    return heuristic(node.pos, target.pos, grid);
    // return manhattan(node.pos, target.pos);
  };

  addToOpen(start);

  while (open.length > 0) {
    const current = popFromOpen() as Node; // we know it is not empty here
    closedMap.set(current.id, true);
    if (current.id === target.id) {
      // Woop
      const path = new Set([
        ...traversePath(target).map((n) => n.id),
        target.id,
      ]);

      const format = (node: Node) => {
        const v = node.value.toString();

        if (path.has(node.id)) {
          return color(v, { fg: 'black', bg: 'green' });
        }
        if (openMap.has(node.id)) {
          return color(v, { fg: 'white', bg: 'yellow' });
        }
        if (closedMap.has(node.id)) {
          return color(v, { fg: 'white', bg: 'red' });
        }
        return v;
      };

      grid.print({
        separator: '',
        format,
      });
      return target.value + current.g;
    }

    /*
		start -> open
		while open
			current = pop open
			add current to closed
			if current is final => done, get path

			for each neighbor of current
				if neighbor is not in open
					calc g, h, f for neighbor
					set current as parent to neighbor
					add neighbor to open
				if neighbor is in open and g < previous g
					update g, f to neighbor
					set current as parent
		 */

    grid
      .getNeighbours(current.pos, { simple: true })
      .map((cell) => cell.value)
      .filter((node) => !closedMap.has(node.id))
      .forEach((neighbour) => {
        if (!openMap.has(neighbour.id)) {
          neighbour.parent = current;
          neighbour.g = getG(neighbour);
          neighbour.h = getH(neighbour);
          neighbour.f = neighbour.g + neighbour.h;
          addToOpen(neighbour);
        }
        const prevParent = neighbour.parent;
        neighbour.parent = current;
        const g = getG(neighbour);
        if (g < neighbour.g) {
          neighbour.g = g;
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.parent = current;
        } else {
          neighbour.parent = prevParent;
        }
      });
  }

  return 0;
}

export function first(input: Input) {
  const data = parseInput(input);
  const grid = createGrid(data);

  // High 615

  return findPath(grid);
}

function extendGrid(size: number, source: Grid<number>): Grid<Node> {
  const w = source.dimensions.w * size;
  const h = source.dimensions.h * size;

  const oW = source.dimensions.w;
  const oH = source.dimensions.h;

  const getNewValue = (org: number, offset: number) => {
    const sum = org + offset;
    if (sum < 10) return sum;

    return Math.abs(10 - sum) + 1;
  };

  const g = Array(h)
    .fill(0)
    .map((_, y) =>
      Array(w)
        .fill(0)
        .map((_, x) => {
          const yOffset = Math.floor(y / oH);
          const xOffset = Math.floor(x / oW);
          const sX = x % source.dimensions.w;
          const sY = y % source.dimensions.h;

          return getNewValue(source.get(sX, sY), yOffset + xOffset);
        })
    );

  return createGrid(new Grid(g));
}

export function second(input: Input) {
  const source = parseInput(input);
  const grid = extendGrid(5, source);

  return findPath(grid);
}
