const { range, flatten, count, max } = require('../../utils');

function parseTimestamp(timestamp) {
	const [date, time] = timestamp.split(' ');
	const [year, month, day] = date.split('-');
	const [hour, minute] = time.split(':');

	return {
		year,
		month,
		day,
		hour,
		minute: Number(minute)
	};
}

const parseLog = logRows => {
	logRows.sort();
	let currentId = '';
	const log = [];
	let lastMatch;
	for (let i = 0; i < logRows.length; i++) {
		const match = /((?<=\[).*(?=])).*(((?<=Guard #)\d*)|falls asleep|wakes up)/gi.exec(
			logRows[i]
		);
		const [, timestamp, action] = Array.from(match);
		const { month, day, minute } = parseTimestamp(timestamp);

		if (!isNaN(Number(action))) {
			currentId = action;
		} else if (action === 'wakes up' && lastMatch.action === 'falls asleep') {
			const minutes = [...range(lastMatch.minute, minute - 1)];
			log.push({
				id: currentId,
				day,
				month,
				minutes
			});
		}
		lastMatch = {
			id: currentId + '',
			month,
			day,
			minute,
			action
		};
	}
	return log;
};

const maxMinutes = minutes => {
	const counted = count(minutes);
	const [minute, counter] = max(
		Object.entries(counted),
		([minute, count], [maxMinute, maxCount]) => count > maxCount
	);

	return {
		minute,
		counter
	};
};

function first(input) {
	const log = parseLog(input);
	const minutesAsleep = log.reduce(
		(res, { id, minutes }) => ({
			...res,
			[id]: (res[id] || 0) + minutes.length
		}),
		{}
	);

	const mostAsleep = max(
		Object.entries(minutesAsleep).map(([id, duration]) => ({
			id,
			duration
		})),
		(a, b) => a.duration > b.duration
	);

	const m = log.filter(e => e.id === mostAsleep.id).map(e => e.minutes);

	const { minute } = maxMinutes(flatten(m));

	const result = minute * Number(mostAsleep.id);
	return result;
}

function second(input) {
	const log = parseLog(input);

	const minutesById = log.reduce(
		(acc, { id, minutes }) => ({
			...acc,
			[id]: [...(acc[id] || []), ...minutes]
		}),
		{}
	);

	const countedMinutesById = Object.entries(minutesById).reduce(
		(acc, [id, minutes]) => [...acc, { id, ...maxMinutes(minutes) }],
		[]
	);

	const { id, minute } = max(
		countedMinutesById,
		(a, b) => a.counter > b.counter
	);

	console.log('countedMinutesById', id, minute);

	return Number(id) * minute;
}

module.exports = {
	first,
	second
};
