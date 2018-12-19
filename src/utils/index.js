function* range(from, to) {
	for (let i = from; i <= to; i++) {
		yield i;
	}
}

function nonUnique(values) {
	let result = [];
	console.log('values', values);
	const flattened = flatten(values);
	while (flattened.length > 0) {
		const n = flattened.pop();
		if (!result.includes(n) && flattened.includes(n)) {
			result.push(n);
		}
	}

	return result;
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
	keepOne
};
