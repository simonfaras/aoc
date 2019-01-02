const { max, min, flatten, count, unique } = require('../../utils');
const parseInput = input => {
	return input
		.map(i => i.split(', '))
		.map(([x, y], id) => ({ x: Number(x), y: Number(y), id }));
};

const getDistance = ({ x: aX, y: aY }, { x: bX, y: bY }) => {
	const x = aX > bX ? aX - bX : bX - aX;
	const y = aY > bY ? aY - bY : bY - aY;

	return x + y;
};

const createGrid = points => {
	const x = points.map(p => p.x);
	const y = points.map(p => p.y);
	const maxY = max(y) + 1;
	const maxX = max(x) + 1;

	const grid = [];
	for (let r = 0; r < maxY; r++) {
		const row = [];
		grid.push(row);
		for (let c = 0; c < maxX; c++) {
			const point = points.find(({ x, y }) => x === c && y === r);
			if (point) {
				row.push({
					id: point.id,
					type: 'target'
				});
			} else {
				row.push('x');
			}
		}
	}

	return grid;
};

function getClosestIds(point, grid, width, height) {
	let lap = 1;
	let offset;
	let incrementY = -1;
	let incrementX = 1;
	const id = [];
	let loop = true;
	let i = 1;
	while (loop) {
		if (i === 1) {
			offset = { x: 0, y: lap * -1 };
		} else {
			offset = { x: offset.x + incrementX, y: offset.y + incrementY };
		}

		const { x, y } = { x: point.x + offset.x, y: point.y + offset.y };

		if (x >= 0 && y >= 0 && x < width && y < height) {
			try {
				const cell = grid[y][x];

				if (cell.type === 'target') {
					id.push(cell.id);
				}
			} catch {
				console.error('error', point);
			}
		}

		if (Math.abs(offset.y) === lap) {
			incrementY = incrementY * -1;
		}
		if (Math.abs(offset.x) === lap) {
			incrementX = incrementX * -1;
		}

		if (i++ === lap * 4) {
			i = 1;
			lap++;
			if (id.length > 0) {
				loop = false;
			}
		}
	}
	return id;
}

const printGrid = grid => {
	const wrapper = {
		target: id => `{${id}}`,
		closest: id => `[${id}]`,
		double: () => `(.)`,
		infinite: id => `|${id}|`
	};

	for (let i = 0; i < grid.length; i++) {
		const row = grid[i].map(({ type, id }) => wrapper[type](id));
		console.log(row.join(''));
	}
};

function first(input) {
	const coords = parseInput(input);
	const grid = createGrid(coords);
	const gridHeight = grid.length;
	const gridWidth = grid[0].length;

	for (let row = 0; row < gridHeight; row++) {
		for (let col = 0; col < gridWidth; col++) {
			const cell = grid[row][col];
			if (cell === 'x') {
				const id = getClosestIds(
					{ x: col, y: row },
					grid,
					gridWidth,
					gridHeight
				);
				if (id.length > 1) {
					grid[row][col] = { type: 'double', id: id };
				} else {
					if (
						col === 0 ||
						row === 0 ||
						col === gridWidth - 1 ||
						row === gridHeight - 1
					) {
						grid[row][col] = { type: 'infinite', id: id[0] };
					} else {
						grid[row][col] = { type: 'closest', id: id[0] };
					}
				}
			}
		}
	}
	const flat = flatten(grid);
	const infinite = unique(
		flat.filter(p => p.type === 'infinite').map(p => p.id)
	);
	const closest = flatten(grid)
		.filter(p => p.type === 'closest' && !infinite.includes(p.id))
		.map(p => p.id);
	const result = max(Object.values(count(closest))) + 1;

	return result;
}

function second(input) {
	const points = parseInput(input);
	const grid = createGrid(points);
	let count = grid.length * grid[0].length;
	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[row].length; col++) {
			let sum = 0;
			for (let i = 0; i < points.length; i++) {
				const { x, y } = points[i];

				sum += Math.abs(col - x) + Math.abs(row - y);

				if (sum > 9999) {
					count--;
					break;
				}
			}
		}
	}

	return count;
}

module.exports = {
	first,
	second,
	getDistance
};
