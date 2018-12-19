const readInput = require('../../utils/fs');
const { first, second } = require('./puzzle');

const input = readInput(__dirname, true);

describe('2018/05-1', () => {
	it('should produce a correct answer', () => {
		expect(first(input)).toEqual(10);
	});
});

describe('2018/05-2', () => {
	it('should should produce a correct answer', () => {
		expect(second(input)).toEqual(4);
	});
});
