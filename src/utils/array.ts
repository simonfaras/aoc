declare global {
  interface Array<T> {
    toNumbers(): Array<number>;

    toObject(keyFactory: (value: T) => string | number): {
      [k: string | number]: T;
    };

    unique(idFactory: (value: T) => string | number): Array<T>;

    sum(): Array<number>;
  }
}

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

export function seq(length: number, start: number = 0): number[] {
  return Array(length)
    .fill(start)
    .map((n, i) => n + i);
}
