import fs from 'fs';
import util from 'util';
import path from 'path';
import { readInput } from '../src/utils';

console.clear();

const mkdir = util.promisify(fs.mkdir);
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const copyFile = util.promisify(fs.copyFile);
const args = process.argv.slice(2);

function getPuzzleMeta() {
  const today = new Date(Date.now());
  const formatDay = (day: string | number) => day?.toString().padStart(2, '0');

  const dayFromArgs = args[0];
  const yearFromArgs = args[1];

  const day = formatDay(dayFromArgs ?? today.getDate());
  const year = yearFromArgs ?? today.getFullYear().toString();

  const puzzlePath = path.resolve(process.cwd(), 'src/puzzles/', year, day);

  return {
    day,
    year,
    path: puzzlePath,
  };
}

async function main() {
  const currentPuzzle = getPuzzleMeta();

  if (!fs.existsSync(currentPuzzle.path)) {
    await mkdir(currentPuzzle.path);

    const templatesPath = path.resolve(__dirname, 'templates');
    const templateFiles = (await readdir(templatesPath)).map((fileName) => ({
      fileName,
      source: path.join(templatesPath, fileName),
      target: path.join(currentPuzzle.path, fileName),
      isTs: fileName.endsWith('.ts'),
    }));
    await Promise.all(
      templateFiles.map(({ source, target }) => copyFile(source, target))
    );

    // Remove all @ts-expect-error from source
    for (const template of templateFiles.filter((template) => template.isTs)) {
      const content = await readFile(template.target, 'utf-8');

      await writeFile(
        template.target,
        content.replaceAll('// @ts-expect-error', ''),
        { encoding: 'utf-8' }
      );
    }
  }

  const config = await import(path.join(currentPuzzle.path, 'config.ts'));
  const puzzles = await import(path.join(currentPuzzle.path, 'puzzle.ts'));

  const puzzle = puzzles[config.active];
  const testResult = puzzle(
    readInput(path.join(currentPuzzle.path, `sample_${config.sample}.txt`))
  );

  console.log(
    `RUNNING ${currentPuzzle.year}/${currentPuzzle.day} - ${config.active}`
  );
  const expectedResult = config.expected[config.active];
  if (testResult === expectedResult) {
    console.log('SUCCESS', testResult);
    console.clear();
    console.log('RUN WITH REAL DATA');
    const result = puzzle(
      readInput(path.join(currentPuzzle.path, 'input.txt'))
    );
    console.log('RESULT:');
    console.log(result);
  } else {
    console.error('FAIL EXPECTED:', expectedResult);
    console.error('RESULT', testResult);
  }
}

main();
