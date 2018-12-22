const { keepOne } = require('../../utils');
const parseInput = input =>{
	input.sort();
	return input
		.map(i => i.split(', '))
		.map(([x, y]) => ({ x: Number(x), y: Number(y) }));}

const getDistance = ({ x: aX, y: aY }, { x: bX, y: bY }) => {
	const x = aX > bX ? aX - bX : bX - aX;
	const y = aY > bY ? aY - bY : bY - aY;

	return x + y;
};

function first(input) {
	const coords = parseInput(input);
	console.log(coords);

	// bounds => min(x), min(y), max(x), max(y)

}

function second(input) {}

module.exports = {
	first,
	second,
	getDistance
};
