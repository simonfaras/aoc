import { Input } from '../../../utils';
import { split } from '../../../utils/map';

function parseInput(input: Input) {
  return input.asRows().map(split(''));
}

const lowerOffset = 'a'.charCodeAt(0);
const upperOffset = 'A'.charCodeAt(0);
function getItemPrio(item: string): number {
  const code = item.charCodeAt(0);
  const isLowerCase = code >= lowerOffset;

  const offset = isLowerCase ? lowerOffset : upperOffset;
  const padding = isLowerCase ? 1 : 27;

  return code - offset + padding;
}

export function first(input: Input) {
  const data = parseInput(input)
    .map((items) => {
      const first = items.splice(items.length / 2);
      return first.find((l) => items.includes(l));
    })
    .map(getItemPrio)
    .sum();

  return data;
}

export function second(input: Input) {
  const data = parseInput(input)
    .toChunks(3)
    .map(([first, ...rest]) =>
      first.find((l) => rest.every((r) => r.includes(l)))
    )
    .map(getItemPrio)
    .sum();

  return data;
}
