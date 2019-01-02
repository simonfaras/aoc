const chokidar = require('chokidar');
const { resolve, join } = require('path');
const readInput = require('../src/utils/fs');
const argv = require('yargs').argv;

const [year, day] = argv._[0].split('/');

const dir = resolve(process.cwd(), 'src', year, day);
const scriptPath = resolve(dir, 'puzzle.js');
const assert = argv.assert;
const isTest = assert !== undefined;

if (isTest) {
	const watcher = chokidar.watch(process.cwd(), 'src');
	watcher.on('change', handleOnChange);
}
function handleOnChange(path) {
	if (path.endsWith('.txt')) {
		readInput();
		run();
	} else {
		delete require.cache[path];
		run();
	}
}

let input;
let testInput;
const loadInput = () => {
	input = readInput(dir);
	testInput = readInput(dir, true);
};

const run = () => {
	console.log('\x1Bc');
	console.log(`${year}/${day} - ${argv.first ? '1' : '2'}`);

	try {
		delete require.cache[scriptPath];
		const script = require(scriptPath);

		const scriptInput = !isTest ? input : testInput;

		let part;
		if (argv.first) {
			part = script.first;
		} else if (argv.second) {
			part = script.second;
		} else {
			process.exitCode = -1;
		}

		const result = part(scriptInput);
		if (isTest) {
			const isNumber = !isNaN(Number(assert));
			console.assert(
				result === (isNumber ? Number(assert) : assert),
				`expected ${assert} but received ${result}`
			);
			console.log('done');
		} else {
			console.log('result:', result);
		}
	} catch (e) {
		console.error(e);
	}
};

loadInput();
run();
