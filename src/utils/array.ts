declare global {
  interface Array<T> {
    toAsc(comparer?: (a: T, b: T) => number): Array<T>;

    toDesc(comparer?: (a: T, b: T) => number): Array<T>;

    toNumbers(): Array<number>;

    toObject(keyFactory: (value: T) => string | number): {
      [k: string | number]: T;
    };

    unique(idFactory: (value: T) => string | number): Array<T>;

    sum(): number;

    last(): T;

    splitAll(separator: string): Array<string[]>;

    duplicates(idFactory: (value: T) => string | number): Array<T>;

    groupBy(
      keyFactory: (value: T) => string | number
    ): Record<string | number, T[]>;

    toGroupedEntries(
      keyFactory: (value: T) => string | number
    ): [string | number, T[]][];
  }
}

Array.prototype.last = function last() {
  return this[this.length - 1];
};

Array.prototype.toNumbers = function toNumbers() {
  return this.map(Number);
};

Array.prototype.sum = function sum(): number {
  return this.reduce((sum: number, n: number) => sum + n, 0);
};

Array.prototype.groupBy = function groupBy<T>(
  keyFactory: (value: T) => string | number
): Record<string | number, T[]> {
  return this.reduce((acc: Record<number | string, T[]>, value: T) => {
    const key = keyFactory(value);
    if (!acc[key]) acc[key] = [];
    acc[key].push(value);

    return acc;
  }, {});
};

Array.prototype.toGroupedEntries = function toGroupedEntries<T>(
  keyFactory: (value: T) => string | number
): [string, T[]][] {
  return Object.entries(this.groupBy(keyFactory));
};

Array.prototype.toObject = function toObject<T>(
  keyFactory: (value: T) => string | number
) {
  return Object.fromEntries(this.map((v: T) => [keyFactory(v), v]));
};

Array.prototype.unique = function unique<T>(
  idFactory: (value: T) => string | number
) {
  return Object.values(this.toObject(idFactory));
};

Array.prototype.duplicates = function duplicates<T>(
  idFactory: (value: T) => string | number
) {
  return this.filter((a: T, index: number, arr: T[]) => {
    const id = idFactory(a);
    return arr.findIndex((b) => id === idFactory(b)) !== index;
  }).unique(idFactory);
};

Array.prototype.splitAll = function splitAll<T extends string>(
  separator: string
): Array<string[]> {
  return this.map((v: T) => v.split(separator));
};

function compare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (b < a) return 1;
  return 0;
}

Array.prototype.toAsc = function toAsc<T>(
  this: Array<T>,
  comparer?: (a: T, b: T) => number
): Array<T> {
  return [...this].sort(comparer ?? compare);
};

Array.prototype.toDesc = function toAsc<T>(
  this: Array<T>,
  comparer?: (a: T, b: T) => number
): Array<T> {
  const comp = (a: T, b: T) => (compare ?? comparer)(a, b) * -1;

  return [...this].sort(comp);
};

export function seq(length: number, start: number = 0): number[] {
  return Array(length)
    .fill(start)
    .map((n, i) => n + i);
}
