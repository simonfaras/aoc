const { resolve, join } = require('path');
const readInput = require('../src/utils/fs');
const argv = require('yargs').argv;

const [year, day] = argv._[0].split('/');

const dir = resolve(process.cwd(), 'src', year, day);
const script = require(join(dir, 'puzzle'));
const input = readInput(join(dir));

if (argv.first) {
	console.log(script.first(input));
} else if (argv.second) {
	console.log(script.second(input));
} else {
	console.error('missing script parameter');
	process.exitCode(1);
}
