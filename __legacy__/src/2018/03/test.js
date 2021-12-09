const { first, second } = require('./puzzle');

describe('2018/03-1', () => {
	it('should produce a correct answer', () => {
		const input = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];

		expect(first(input)).toEqual(4);
	});
});

describe('2018/03-2', () => {
	it('should should produce a correct answer', () => {
		const input = [
			'#1 @ 1,3: 4x4',
			'#2 @ 3,1: 4x4',
			'#3 @ 5,5: 2x2'
		];
		//const input = [ '#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4'];

		expect(second(input)).toEqual(3);
	});
});
