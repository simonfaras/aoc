import { puzzleA, puzzleB } from '../src/days/Day03';
import {
  getPuzzleInputText,
  getPuzzleInputStringArray,
} from '../src/puzzleInputs';

const day = '03';
test('day03 puzzle a', () => {
  // Arrange
  const expected = 198;
  const puzzleInput = getPuzzleInputStringArray(day);
  // Act
  const result = puzzleA(puzzleInput);

  // Assert
  expect(result).toBe(expected);
});
test('day03 puzzle b', () => {
  // Arrange
  const expected = 230;
  const puzzleInput = getPuzzleInputStringArray(day);
  // Act
  const result = puzzleB(puzzleInput);

  // Assert
  expect(result).toBe(expected);
});
