const readInput = require('../../utils/fs');
const { first, second, getDistance } = require('./puzzle');

const input = readInput(__dirname, true);

describe('2018/06-1', () => {
	it('should produce a correct answer', () => {
		expect(first(input)).toEqual(10);
	});
});

describe('2018/06-2', () => {
	it('should should produce a correct answer', () => {
		expect(second(input)).toEqual(4);
	});
});

describe('getDistance', () => {
	it('should handle one 0 coord', () => {
		const [a, b] = [{ x: 0, y: 0 }, { x: 5, y: 5 }];

		expect(getDistance(a, b)).toEqual(10);
	});

	it('should handle both coords having values', () => {
		const [a, b] = [{x: 10, y: 15}, { x: 5, y: 20}]

		expect(getDistance(a, b)).toEqual(10);
	})
});
