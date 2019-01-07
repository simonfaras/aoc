const { range, sum, keepOne, max } = require('../../utils');
const { progress } = require('../../utils/progress');
const fs = require('fs');
const { resolve } = require('path');

const GRID_SIZE = 300;

const getPowerLevel = gridSerial => (x, y) => {
	const rackId = x + 10;
	const level = (rackId * y + gridSerial) * rackId;

	return Math.floor((level % 1000) / 100) - 5;
};

const createGrid = serial => {
	const powerLevel = getPowerLevel(serial);
	const grid = new Array(GRID_SIZE);

	for (let y = 1; y <= GRID_SIZE; y++) {
		const row = new Array(GRID_SIZE);
		for (let x = 1; x <= GRID_SIZE; x++) {
			row[x - 1] = powerLevel(x, y);
		}
		grid[y - 1] = row;
	}

	return grid;
};

const calcSums = grid => {
	const sums = {};
	for (let i = 0; i < grid.length; i++) {
		const row = grid[i];
		for (let j = 0; j < row.length; j++) {
			if (i < grid.length - 2 && j < row.length - 2) {
				sums[`${j + 1},${i + 1}`] = sum(
					range(0, 2).map(r => sum(range(0, 2).map(c => grid[i + r][j + c])))
				);
			}
		}
	}

	return sums;
};

function first(input) {
	const serial = Number(input[0]);
	const grid = createGrid(serial);
	const sums = calcSums(grid);

	return keepOne(Object.entries(sums), (a, b) => a[1] > b[1])[0];
}

function second(input) {
	const serial = Number(input[0]);
	const grid = createGrid(serial);
	//.map(row => row.map(cell => (cell < 0 ? cell + '' : ' ' + cell)).join(' '))
	//.join('\n');
	// fs.writeFileSync(resolve(__dirname, 'grid.txt'), grid);

	let max = { value: 0 };

	const printProgress = progress(GRID_SIZE * GRID_SIZE);
	let cells = 0;
	let count = 0;

	for (let i = 0; i < grid.length; i++) {
		const row = grid[i];
		for (let j = 0; j < row.length; j++) {
			let val = 0;
			let prev = 0;
			const maxSquare = Math.min(17, GRID_SIZE - Math.max(i, j));
			for (let s = 0; s < maxSquare; s++) {
				try {
					val = sum([
						val,
						...range(0, s).map(r => grid[i + r][j + s]),
						...range(0, s).map(c => grid[i + s][i + c])
					]);
					count++;
					if (prev < val) {
						if (val > max.value) {
							max = {
								id: `${j + 1},${j + 1},${s}`,
								value: val,
							}
						}
						// s = maxSquare;
					}
					prev = val;
				} catch (e) {
					console.error(`i: ${i}, j: ${j}, s: ${s}`);
					throw e;
				}
			}
			cells++;
		}
		printProgress(cells);
	}

	console.log(max, count);
	return max.id;
}

module.exports = {
	first,
	second,
	getPowerLevel
};
