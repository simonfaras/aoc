import { readInput } from '../src/utils';
import path from 'path';
const [dir] = process.argv.slice(2);

async function run() {
  const config = await import(path.join(dir, 'config.ts'));
  const puzzles = await import(path.join(dir, 'puzzle.ts'));

  const puzzle = puzzles[config.active];
  const testResult = puzzle(
    readInput(path.join(dir, `sample_${config.sample}.txt`))
  );

  process.send?.({ type: 'result', payload: { result: testResult } });
}

run();
