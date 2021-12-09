import { puzzleA, puzzleB } from '../src/days/Day08.mjs';
import {
  getPuzzleInputStringArray,
  getPuzzleInputText,
} from '../src/puzzleInputs/index.mjs';
import { run } from './run.mjs';

const input = getPuzzleInputStringArray('08', 1);

// run(puzzleA, input, 26);
run(puzzleB, input, 61229);
