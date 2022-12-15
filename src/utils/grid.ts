import { EOL } from 'os';
import { seq } from './array';

export interface Point {
  x: number;
  y: number;
}

export type Coordinate = `${number},${number}`;
type NormalizedGrid<T> = Record<Coordinate, T>;

export interface Cell<T> {
  value: T;
  pos: Point;
}

const neighbourOffsets = seq(3, -1)
  .map((x) => seq(3, -1).map((y) => [x, y]))
  .flat();
neighbourOffsets.splice(Math.abs(neighbourOffsets.length / 2), 1);

const neighbourOffsetsSimple = neighbourOffsets.filter(
  ([x, y]) => Math.abs(x) !== Math.abs(y)
);

export function getNeightbourPoints({ x, y }: Point, simple = true): Point[] {
  const iterator = simple ? neighbourOffsetsSimple : neighbourOffsets;

  return iterator.map(([x_o, y_o]) => {
    const point = { x: x + x_o, y: y + y_o };

    return point;
  });
}

export function pointEq(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}

export class Grid<T> extends Array<Array<T>> {
  constructor(readonly source: Array<Array<T>>) {
    super();
  }

  static plotNormalized<T>(
    points: Point[],
    defaultValue: T,
    value?: (point: Point) => T
  ) {
    const minX = Math.min(...points.map((p) => p.x));
    const minY = Math.min(...points.map((p) => p.y));

    const xOffset = 0 - minX;
    const yOffset = 0 - minY;

    return Grid.plot(
      points.map((p) => ({ x: p.x + xOffset, y: p.y + yOffset })),
      defaultValue,
      value
    );
  }

  static plot<T>(
    points: Point[],
    defaultValue: T,
    value?: (point: Point) => T
  ): Grid<T> {
    const height = Math.max(...points.map((p) => p.y)) + 1;
    const width = Math.max(...points.map((p) => p.x)) + 1;

    const grid = new Grid<T>(
      Array(height)
        .fill(null)
        .map(() => Array(width).fill(defaultValue))
    );

    if (value) {
      points.forEach((point) => {
        grid.set(value(point), point);
      });
    }

    return grid;
  }

  static fromDimension<T>(width: number, height: number, fill: T): Grid<T> {
    return new Grid<T>(
      Array(height)
        .fill(null)
        .map(() => Array(width).fill(fill))
    );
  }

  static coord(x: number, y: number): Coordinate {
    return `${x},${y}`;
  }

  get dimensions(): { w: number; h: number } {
    return { h: this.source.length, w: this.source[0].length };
  }

  get size(): number {
    const { w, h } = this.dimensions;
    return w * h;
  }

  out(): Array<Array<T>> {
    return this.source.map((r) => r.map((c) => c));
  }

  get(x: number, y: number): T {
    return this.source[y][x];
  }

  getUnsafe(x: number, y: number): T {
    return this.source[y]?.[x];
  }

  hasValue(pos: Point): boolean {
    const { x, y } = pos;

    return !!this.source[y]?.[x];
  }

  set(value: T, point: Point): T {
    this.source[point.y][point.x] = value;

    return value;
  }

  rows() {
    return this.source;
  }

  columns() {
    const rows = this.rows();
    if (!rows[0]) return [];

    return Array(rows[0].length)
      .fill(null)
      .map((column, i) => rows.map((row) => row[i]));
  }

  updateAll(updateFn: (value: T, point: Point) => T): Grid<T> {
    this.forEachCell((v, point) => this.set(updateFn(v, point), point));

    return this;
  }

  updateIf(
    updateFn: (value: T, point: Point) => T,
    predicate: (value: T, point: Point) => boolean
  ): Grid<T> {
    this.forEachCell((v, point) => {
      if (predicate(v, point)) {
        this.set(updateFn(v, point), point);
      }
    });

    return this;
  }

  forEachCell(callbackFn: (value: T, point: Point) => void): void {
    this.source.forEach((row, y) =>
      row.forEach((v, x) => callbackFn(v, { x, y }))
    );
  }

  filterCells(callbackFn: (value: T, point: Point) => boolean): Cell<T>[] {
    return this.cells().filter((cell) => callbackFn(cell.value, cell.pos));
  }

  cells(): Cell<T>[] {
    return this.source
      .map((row, y) => row.map((value, x) => ({ value, pos: { x, y } })))
      .flat();
  }

  private _normalized: NormalizedGrid<T> | null = null;
  asNormalized(): NormalizedGrid<T> {
    if (this._normalized === null) {
      this._normalized = this.source.reduce(
        (flat: NormalizedGrid<T>, row, y) => ({
          ...flat,
          ...Object.fromEntries(
            row.map((value, x) => [Grid.coord(x, y), value])
          ),
        }),
        {}
      );
    }
    return this._normalized;
  }

  getNeighbours({ x, y }: Point, settings = { simple: false }): Cell<T>[] {
    const iterator = settings.simple
      ? neighbourOffsetsSimple
      : neighbourOffsets;

    return iterator
      .map(([x_o, y_o]) => {
        const point = { x: x + x_o, y: y + y_o };

        return { value: this.getUnsafe(point.x, point.y), pos: point };
      })
      .filter((cell) => cell.value !== undefined);
  }

  getNeighbour({ x, y }: Point, axis: 'x' | 'y', direction: 1 | -1): Cell<T> {
    const pos =
      axis === 'x' ? { x: x + direction, y } : { x, y: y + direction };

    return { pos, value: this.getUnsafe(pos.x, pos.y) };
  }

  print({
    separator = '',
    format,
    debug = false,
  }: {
    separator?: string;
    format?: (value: T, point: Point) => string;
    debug?: boolean;
  } = {}): void {
    console[debug ? 'debug' : 'log'](
      this.source
        .map((row, y) =>
          (format ? row.map((v, x) => format(v, { x, y })) : row).join(
            separator
          )
        )
        .join('\r\n') // TODO Will break sometimes
    );
  }
}
