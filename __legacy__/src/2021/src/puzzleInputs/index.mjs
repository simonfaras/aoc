import fs, { existsSync } from 'fs';
import path from 'path';
import { EOL } from 'os';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * gets the puzzle input as string.
 * @param day A string or number of the day
 * @param example Optional for getting example inputs from textfile
 */
export const getPuzzleInputText = (day, example) => readFile(day, example);
export const getPuzzleInputStringArray = (day, example, splitter) =>
  convertToStringArray(getPuzzleInputText(day, example), splitter);

export const convertToStringArray = (text, splitter) => {
  const t = text + '';
  return t.split(splitter || EOL);
};

export const convertToNumberArray = (text, splitter) => {
  return (text + '').split(splitter || '\n').map((a) => Number.parseFloat(a));
};
function readFile(day, example) {
  const filePath = path.join(__dirname, getFilePath(day, example));
  if (existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8');
  } else {
    return null;
  }
}
function getFilePath(day, example) {
  let dayString = day + '';
  if (dayString.length == 1) {
    dayString = `0${dayString}`;
  }
  if (dayString.length == 2) {
    return `day${dayString}/puzzleInput${
      example && example > 0 ? `_example_${example}` : ''
    }.txt`;
  }
  return null;
}
