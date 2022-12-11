import { Grid, Point } from './grid';
import fs from 'fs';
import { createLogicalAnd } from 'typescript';

const DefaultSeparator = ',';

type GridParser<T> = (v: string, pos: Point) => T;

export function readInput(path: string): Input {
  return new Input(fs.readFileSync(path, 'utf-8'));
}

export class Input extends String {
  constructor(private readonly source: string) {
    super();
  }

  get eol(): string {
    return this.source.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
  }

  asRows(): string[] {
    return this.source.split(this.eol);
  }

  asArray(separator = DefaultSeparator): string[] {
    return this.source.split(separator);
  }

  asNumbers(separator: string = ','): number[] {
    return this.asArray(separator).toNumbers();
  }

  asGrid<T>(separator = ' ', parse?: GridParser<T>): Grid<T> {
    return new Grid<T>(
      this.asRows()
        .filter((row) => row.length)
        .map((row, row_i) =>
          row
            .split(separator)
            .map(
              (value, col_i) =>
                parse?.(value, { x: col_i, y: row_i }) ??
                (value as unknown as T)
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
