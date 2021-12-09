import { puzzleA, puzzleB } from '../src/days/Day05.mjs';
import {
  getPuzzleInputStringArray,
  getPuzzleInputText,
} from '../src/puzzleInputs/index.mjs';
import { run } from './run.mjs';

const input = getPuzzleInputStringArray('05', 1);

// run(puzzleA, input, 5);
run(puzzleB, input, 12);
