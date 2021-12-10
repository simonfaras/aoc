import { Input } from '../../../utils/core';

function parseInput(input: Input) {
  return input.asRows().map((r) => r.split(''));
}

const scoreMap: Record<string, number> = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const chunkMap: Record<string, string> = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const chunkMapReversed: Record<string, string> = Object.fromEntries(
  Object.entries(chunkMap).map(([open, close]) => [close, open])
);

function getClose(char: string): string {
  return chunkMap[char];
}

function isChunkStart(char: string): boolean {
  return Object.keys(chunkMap).includes(char);
}

function isChunkEnd(char: string): boolean {
  return Object.values(chunkMap).includes(char);
}

function getFirstSyntaxError(row: string[]): string | undefined {
  const stack = [];
  for (const char of row) {
    if (isChunkStart(char)) {
      stack.push(char);
    } else if (isChunkEnd(char) && char === getClose(stack[stack.length - 1])) {
      stack.pop();
    } else {
      return char;
    }
  }
}

export function first(input: Input) {
  const data = parseInput(input);

  return data
    .map(getFirstSyntaxError)
    .filter((v) => !!v)
    .map((char) => scoreMap[char ?? ''] ?? 0)
    .sum();
}

const secondScoreMap: Record<string, number> = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

function getMissingChars(row: string[]): string[] {
  const stack = [];
  for (const char of row) {
    if (isChunkStart(char)) {
      stack.push(char);
    } else if (isChunkEnd(char) && char === getClose(stack[stack.length - 1])) {
      stack.pop();
    }
  }

  return stack.reverse().map((char) => getClose(char));
}

export function second(input: Input) {
  const data = parseInput(input).filter((row) => !getFirstSyntaxError(row));

  return data
    .map(getMissingChars)
    .map((chars) => chars.map((char) => secondScoreMap[char]))
    .map((rowScore) => rowScore.reduce((res, score) => res * 5 + score, 0))
    .sort((a, b) => a - b)[Math.floor(data.length / 2)];
}
