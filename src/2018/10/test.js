const fs = require('fs');
const { resolve } = require('path');
const { first, second } = require('./puzzle');

const input = fs
	.readFileSync(resolve(__dirname, 'input-test.txt'), { encoding: 'utf-8' })
	.replace(/\r?\n/gi, '\n')
	.split('\n');

describe('2018/03-1', () => {
	it('should produce a correct answer', () => {
		expect(first(input)).toEqual(240);
	});
});

describe('2018/03-2', () => {
	it('should should produce a correct answer', () => {
		expect(second(input)).toEqual(3);
	});
});
