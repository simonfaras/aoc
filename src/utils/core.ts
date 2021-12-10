import fs from 'fs';
import { EOL } from 'os';

declare global {
  interface Array<T> {
    toNumbers(): Array<number>;
    sum(): Array<number>;
  }
}

const DefaultSeparator = ',';

Array.prototype.toNumbers = function () {
  return this.map(Number);
};

Array.prototype.sum = function () {
  return this.reduce((sum: number, n: number) => sum + n, 0);
};

export function readInput(path: string): Input {
  return new Input(fs.readFileSync(path, 'utf-8'));
}

type GridParser<T> = (v: string, pos?: { x: number; y: number }) => T;

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
type Coordinate = `${number},${number}`;
type NormalizedGrid<T> = Record<Coordinate, T>;

export class Grid<T> extends Array<Array<T>> {
  constructor(readonly source: Array<Array<T>>) {
    super();
  }

  static coord(x: number, y: number): Coordinate {
    return `${x},${y}`;
  }

  out(): Array<Array<T>> {
    return this.source.map((r) => r.map((c) => c));
  }

  get(x: number, y: number): T {
    return this.source[y][x];
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
}
