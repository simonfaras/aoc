import { puzzleA, puzzleB } from '../src/days/Day23.mjs';
import {
    getPuzzleInputStringArray,
    getPuzzleInputText,
} from '../src/puzzleInputs/index.mjs';
import { run } from './run.mjs';

const input = getPuzzleInputStringArray('23');

run(puzzleA, input, 0);
run(puzzleB, input, 0);
