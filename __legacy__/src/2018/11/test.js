const { getPowerLevel } = require('./puzzle');

/*
Fuel cell at  122,79, grid serial number 57: power level -5.
Fuel cell at 217,196, grid serial number 39: power level  0.
Fuel cell at 101,153, grid serial number 71: power level  4.
 */

describe('getPowerLevel', () => {
	it('should return a correct result for #8, [3, 5]', () => {
		const level = getPowerLevel(8)(3, 5)

		expect(level).toEqual(4);
	});

	it('should return a correct result for #57, [122, 79]', () => {
		const level = getPowerLevel(57)(122, 79)

		expect(level).toEqual(-5);
	});

	it('should return a correct result for #39, [217, 196]', () => {
		const level = getPowerLevel(39)(217, 196)

		expect(level).toEqual(0);
	});

	it('should return a correct result for #71, [101, 153]', () => {
		const level = getPowerLevel(71)(101, 153)

		expect(level).toEqual(4);
	});
});
