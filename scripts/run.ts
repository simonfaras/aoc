import fs from 'fs';
import util from 'util';
import path from 'path';

console.clear();

const mkdir = util.promisify(fs.mkdir);
const readdir = util.promisify(fs.readdir);
const copyFile = util.promisify(fs.copyFile);
const readFile = util.promisify(fs.readFile);
const args = process.argv.slice(2);

function getPuzzleMeta() {
	const today = new Date(Date.now());
	const formatDay = (day: string | number | undefined) =>
		day?.toString().padStart(2, '0');

	const dayFromArgs = args[0];
	const yearFromArgs = args[1];

	const day = formatDay(dayFromArgs || today.getDate());
	const year = yearFromArgs ?? today.getFullYear().toString();

	const puzzlePath = path.resolve(process.cwd(), 'src/puzzles/', year, day);

	return {
		day,
		year,
		path: puzzlePath,
	};
}

async function main() {
	const meta = getPuzzleMeta();

	if (!fs.existsSync(meta.path)) {
		await mkdir(meta.path);

		const templatesPath = path.resolve(__dirname, 'templates');
		const templateFiles = await readdir(templatesPath);
		await Promise.all(
			templateFiles.map((file) =>
				copyFile(path.join(templatesPath, file), path.join(meta.path, file))
			)
		);
	}

	const input = await readFile(path.join(meta.path, 'input.txt'), 'utf-8');
	const config = await import(path.join(meta.path, 'config.ts'));
	const sample = await readFile(
		path.join(meta.path, `sample_${config.sample}.txt`),
		'utf-8'
	);
	const puzzles = await import(path.join(meta.path, 'puzzle.ts'));

	const puzzle = puzzles[config.active];
	const testResult = puzzle(sample);

	if (testResult === config.expected[config.active]) {
		console.log('SUCCESS', testResult);
		console.clear();
		console.log('RUN WITH REAL DATA');
		const result = puzzle(input);
		console.log(result);
	} else {
		console.error('FAIL', testResult);
	}
}

main();
