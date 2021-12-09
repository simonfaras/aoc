const { nonUnique, flatten, count, max, keepOne, all } = require('.');

describe('nonUnique', () => {
	it('should return non unique values from 3 arrays', () => {
		const values = [[1, 2, 3], [2, 5, 8], [9, 10, 2]];

		expect(nonUnique(values)[0]).toEqual(2);
	});
});

describe('flatten', () => {
	it('should flatten an array of arrays', () => {
		const values = [[1, 2], [1, 2], [1]];

		expect(flatten(values)).toEqual([1, 2, 1, 2, 1]);
	});
});

describe('count', () => {
	it('should count values of an array', () => {
		const values = [1, 2, 3, 1, 1, 2];

		expect(count(values)).toEqual({
			'1': 3,
			'2': 2,
			'3': 1
		});
	});
});

describe('max', () => {
	it('should should handle numbers', () => {
		const values = [1, 2, 4, 5, 6, 9, 0, 2, 10, 3];

		expect(max(values)).toEqual(10);
	});
});

describe('keepOne', () => {
	it('should handle objects', () => {
		const values = [
			{ id: 1, value: 1 },
			{ id: 2, value: 2 },
			{ id: 3, value: 10 },
			{ id: 4, value: 3 }
		];

		expect(keepOne(values, (a, b) => a.value > b.value));
	});
});
