import React from 'react';
import { test, real } from './input';

const isTest = false;

const calc1 = (input) => {
	const parseRow = code => code.substr(0, 7).split('');
	const parseCol = code => code.substr(7, 3).split('');

	const rows = new Array(128).fill(null).map((_,i) => i)
	const cols = new Array(8).fill(null).map((_,i) => i)

	console.log(rows);

	const seats = input.map(code => {
		const rowCode = parseRow(code);
		const colCode = parseCol(code);

		const row = rowCode.reduce((r, dir) =>  {
			if (dir === "F") {
				return r.slice(0, Math.ceil(r.length / 2))
			}
			 return r.slice(Math.floor(r.length / 2));
		}, rows)[0]

		const col = colCode.reduce((c, dir) =>  {
			if (dir === "L") {
				console.log("left")
				return c.slice(0, Math.ceil(c.length / 2))
			}
			console.log('right')
			return c.slice(Math.floor(c.length / 2));
		}, cols)[0]

		return [row, col]
	})

	return Math.max(...seats.map(([row, col]) => row * 8 + col))

};

const calc2 = (input) => {
	const parseRow = code => code.substr(0, 7).split('');
	const parseCol = code => code.substr(7, 3).split('');

	const rows = new Array(128).fill(null).map((_,i) => i)
	const cols = new Array(8).fill(null).map((_,i) => i)


	const seats = input.map(code => {
		const rowCode = parseRow(code);
		const colCode = parseCol(code);

		const row = rowCode.reduce((r, dir) =>  {
			if (dir === "F") {
				return r.slice(0, Math.ceil(r.length / 2))
			}
			return r.slice(Math.floor(r.length / 2));
		}, rows)[0]

		const col = colCode.reduce((c, dir) =>  {
			if (dir === "L") {
				console.log("left")
				return c.slice(0, Math.ceil(c.length / 2))
			}
			console.log('right')
			return c.slice(Math.floor(c.length / 2));
		}, cols)[0]

		return [row, col]
	}).map(([row, col]) => row * 8 + col)

	const maxSeat = 127 * 8 + 8;
	console.log(seats)
	for (let i = 0; i <= maxSeat; i++) {
		if (!seats.includes(i) && seats.includes(i - 1) && seats.includes(i + 1)) {
			return i;
		}
	}
	return null;

}

export default () => {
	const res = calc2(isTest ? test() : real());

	return <p>{res ?? "nothing"}</p>;
};
