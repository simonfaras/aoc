const { keepOne } = require('../../utils');

const willReact = (a, b) => a !== b && a.toLowerCase() === b.toLowerCase();

const reducePolymer = parts => {
	return parts.reduce((acc, item) => {
		if (acc.length === 0) return [item];
		const last = acc[acc.length - 1];
		if (willReact(item, last)) {
			return acc.slice(0, acc.length - 1);
		}
		return [...acc, item];
	}, []);
};

function first(input) {
	const result = reducePolymer(input[0].split(''));

	return result.length;
}

const removeType = (type, types) =>
	types.filter(t => t.toLowerCase() !== type.toLowerCase());

function second(input) {
	const parts = input[0].split('');
	const types = parts.reduce(
		(acc, type) =>
			!acc.includes(type.toLowerCase()) ? [...acc, type.toLowerCase()] : acc,
		[]
	);
	const resultByRemovedType = types.map(type => ({
		type,
		result: reducePolymer(removeType(type, parts)).length
	}));

	const { result } = keepOne(resultByRemovedType, (a, b) => a.result < b.result);

	return result;
}

module.exports = {
	first,
	second
};
