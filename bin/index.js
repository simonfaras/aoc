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
	console.log('is test');
	const watcher = chokidar.watch(dir);
	watcher.on('change', handleOnChange);
}

function handleOnChange(path) {
	if (path === scriptPath) {
		run();
	} else if (path.endsWith('.txt')) {
		readInput();
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
	console.log('\033c');
	delete require.cache[scriptPath];
	const script = require(scriptPath);

	const scriptInput = !isTest ? input : testInput;

	let part;
	if (argv.first) {
		part = script.first;
	} else if (argv.second) {
		part = script.second;
	} else {
		process.exitCode(-1);
	}

	const result = part(scriptInput);
	if (isTest) {
		const success = result === Number(assert);
		if (success) {
			console.log('Correct! Your code might work!');
		} else {
			console.error('Error');
			console.log('Expected', assert);
			console.log('But received', result);
		}
	} else {
		console.log('result:', result);
	}
};

loadInput();
run();
