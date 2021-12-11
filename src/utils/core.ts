import fs from 'fs';
import { EOL } from 'os';

declare global {
  interface Array<T> {
    toNumbers(): Array<number>;
    toObject(keyFactory: (value: T) => string | number): {
      [k: string | number]: T;
    };
    unique(idFactory: (value: T) => string | number): Array<T>;
    sum(): Array<number>;
  }

  interface Object {
    values(): string;
  }
}

const DefaultSeparator = ',';

Array.prototype.toNumbers = function toNumbers() {
  return this.map(Number);
};

Array.prototype.sum = function sum() {
  return this.reduce((sum: number, n: number) => sum + n, 0);
};

Array.prototype.toObject = function toObject<T>(
  keyFactory: (value: T) => string | number | symbol
) {
  return Object.fromEntries(this.map((v: T) => [keyFactory(v), v]));
};

Array.prototype.unique = function unique<T>(
  idFactory: (value: T) => string | number
) {
  return Object.values(this.toObject(idFactory));
};

export function readInput(path: string): Input {
  return new Input(fs.readFileSync(path, 'utf-8'));
}

export function range<T = null>(length: number, fill?: T): Array<T> {
  return Array(length).fill(fill ?? null);
}

type Point = { x: number; y: number };
type GridParser<T> = (v: string, pos: Point) => T;

export class Input extends String {
  constructor(private readonly source: string) {
    super();
  }

  asRows(): string[] {
    return this.source.split(EOL);
  }

  asArray(separator = DefaultSeparator): string[] {
    return this.source.split(separator);
  }

  asNumbers(separator: string = ','): number[] {
    return this.asArray(separator).toNumbers();
  }

  asGrid<T>(separator = ' ', parse?: GridParser<T>): Grid<T> {
    return new Grid<T>(
      this.asRows().map((row, row_i) =>
        row
          .split(separator)
          .map(
            (value, col_i) =>
              parse?.(value, { x: col_i, y: row_i }) ?? (value as unknown as T)
          )
      )
    );
  }

  asNumbersGrid(separator?: string): Grid<number> {
    return this.asGrid(separator, (v) => Number(v));
  }

  override toString() {
    return this.source;
  }
}
export type Coordinate = `${number},${number}`;
type NormalizedGrid<T> = Record<Coordinate, T>;

export interface Cell<T> {
  value: T;
  pos: Point;
}

const neighbourOffsets = range(3, -1)
  .map((x, x_i) => range(3, -1).map((y, y_i) => [x + x_i, y + y_i]))
  .flat();

const neighbourOffsetsSimple = neighbourOffsets.filter(
  ([x, y]) => Math.abs(x) !== Math.abs(y)
);

export class Grid<T> extends Array<Array<T>> {
  constructor(readonly source: Array<Array<T>>) {
    super();
  }

  static coord(x: number, y: number): Coordinate {
    return `${x},${y}`;
  }

  get dimensions(): { w: number; h: number } {
    return { w: this.source.length, h: this.source[0].length };
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

  getNeighbours(cell: Cell<T>, settings = { simple: false }): Cell<T>[] {
    const iterator = settings.simple
      ? neighbourOffsetsSimple
      : neighbourOffsets;

    return iterator
      .map(([x_o, y_o]) => {
        const point = { x: cell.pos.x + x_o, y: cell.pos.y + y_o };

        return { value: this.getUnsafe(point.x, point.y), pos: point };
      })
      .filter((cell) => !!cell.value);
  }

  print(separator = ''): void {
    console.log(this.source.map((row) => row.join(separator)).join(EOL));
  }
}
