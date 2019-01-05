const { grid, serialize } = require('./grid');

describe('grid', () => {
	it('should create a 3x3 grid from simple points', () => {
		const points = [[0, 0], [0, 1], [1, 2], [2, 2]];

		expect(grid(points)).toEqual([
			['#', '.', '.'],
			['#', '.', '.'],
			['.', '#', '#']
		]);
	});

	it('should create a normalized 3x3 grid from points with negative coordinates', () => {
		const points = [[-1, -1], [0, 0], [1, 1]];

		expect(grid(points)).toEqual([
			['#', '.', '.'],
			['.', '#', '.'],
			['.', '.', '#']
		]);
	});
});

describe('serialize', () => {
	it('should serialize correctly', () => {
		const points = [[0, 0], [1, 1], [2, 2]];

		expect(serialize(grid(points))).toEqual('#..\n.#.\n..#');
	});
});
