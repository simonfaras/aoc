function* _range(from, to) {
	for (let i = from; i <= to; i++) {
		yield i;
	}
}

function range(from, to) {
	return Array.from(_range(from, to));
}

function array(len) {
	return range(0, len - 1);
}

function nonUnique(values) {
	let result = [];
	const flattened = flatten(values);
	while (flattened.length > 0) {
		const n = flattened.pop();
		if (!result.includes(n) && flattened.includes(n)) {
			result.push(n);
		}
	}

	return result;
}

function unique(values) {
	return values.reduce((acc, v) => (acc.includes(v) ? acc : [...acc, v]), []);
}

const flatten = values => values.reduce((acc, arr) => [...acc, ...arr], []);

const count = values =>
	values.reduce(
		(acc, value) => ({
			...acc,
			[value]: (acc[value] || 0) + 1
		}),
		{}
	);

const max = array => keepOne(array, (a, b) => a > b);
const min = array => keepOne(array, (a, b) => a < b);

const sum = values => values.reduce((sum, v) => sum + v, 0);

const keepOne = (array, keepFirst) =>
	array.reduce((theOne, item) =>
		typeof theOne === 'undefined' || keepFirst(item, theOne) ? item : theOne
	);

module.exports = {
	range,
	nonUnique,
	flatten,
	count,
	max,
	min,
	keepOne,
	unique,
	sum,
	array
};
