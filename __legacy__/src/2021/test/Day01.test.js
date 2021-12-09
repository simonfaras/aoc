import { puzzleA, puzzleB } from '../src/days/Day01';
import { getPuzzleInputText, convertToNumberArray } from '../src/puzzleInputs';

const day = '01';

const input = (example) =>
  convertToNumberArray(getPuzzleInputText(day, example));

test('day01 puzzle a', () => {
  // Arrange
  const expected = 7;

  // Act
  const result = puzzleA(input(1));

  console.log(result);

  // Assert
  expect(result).toBe(expected);
});
test('day01 puzzle b', () => {
  // Arrange
  const expected = '2';
  const puzzleInput = getPuzzleInputText(day);
  // Act
  const result = puzzleB(puzzleInput);

  // Assert
  expect(result).toBe(expected);
});
