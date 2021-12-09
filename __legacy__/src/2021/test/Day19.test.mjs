import { puzzleA, puzzleB } from '../src/days/Day19.mjs';
import {
    getPuzzleInputStringArray,
    getPuzzleInputText,
} from '../src/puzzleInputs/index.mjs';
import { run } from './run.mjs';

const input = getPuzzleInputStringArray('19');

run(puzzleA, input, 0);
run(puzzleB, input, 0);
