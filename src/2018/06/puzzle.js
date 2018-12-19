const { keepOne } = require('../../utils');
const parseInput = input =>
	input
		.map(i => i.split(', '))
		.map(([x, y]) => ({ x: Number(x), y: Number(y) }));

function first(input) {
	const coords = parseInput(input);
}

function second(input) {}

module.exports = {
	first,
	second
};
