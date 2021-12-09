const every = require('lodash.every');
const { unique } = require('../../utils');

const parseInput = input => {
	const parsedInput = input.map(row => {
		const [_, req, sub] = row.match(/([A-Z])/g);

		return { req, sub };
	});

	const steps = unique(
		parsedInput.reduce((acc, { req, sub }) => [...acc, req, sub], [])
	);

	return steps.reduce(
		(acc, step) => [
			...acc,
			{
				value: step,
				req: parsedInput.filter(v => v.sub === step).map(v => v.req)
			}
		],
		[]
	);
};

const getAvailable = (values, finished) => {
	const available = values
		.filter(
			({ req }) => req.length === 0 || every(req, v => finished.includes(v))
		)
		.map(v => v.value);

	available.sort();

	return available;
};

function first(input) {
	const values = parseInput(input);

	let finished = [];
	while (values.length > 0) {
		const available = getAvailable(values, finished);

		const current = available.shift();
		const i = values.findIndex(step => step.value === current);
		values.splice(i, 1);

		finished.push(current);
	}

	return finished.join('');
}

function second(input) {
	console.log(
		'------------------------------- SECOND -----------------------------------'
	);
	const values = parseInput(input);
	const baseDuration = 60;
	const numberOfWorkers = 5;
	const getDuration = step => step.charCodeAt(0) - 64 + baseDuration - 1;
	const end = values.length;

	const finished = [];
	const workers = new Array(numberOfWorkers);
	workers.fill({ duration: 0, idle: true });
	let s = 0;
	let safe = 0;
	while (finished.length !== end && safe < 200000) {

		const available = getAvailable(values, finished);
		for (let i = 0; i < workers.length; i++) {
			if (workers[i].idle && available.length > 0) {
				const work = available.shift();

				workers[i] = {
					work,
					idle: false,
					duration: getDuration(work)
				};

				// remove from values
				const index = values.findIndex(v => v.value === workers[i].work);
				values.splice(index, 1);
			} else if (!workers[i].idle) {
				workers[i].duration -= 1;
			}
		}

		// Move finished work to done
		const done = workers.filter(w => w.duration === 0 && !w.idle);
		done.forEach(w => {
			finished.push(w.work);
			w.idle = true;
			w.work = '';
		});


		s++;
		safe++;
	}

	return s;
}

module.exports = {
	first,
	second
};
