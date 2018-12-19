

const parseLog = logRows => {
	const expression = /((?<=\[).*(?=])).*(((?<=Guard #)\d*)|falls asleep|wakes up)/ig;
	let currentId = '';
	const log = [];
	while (logRows.length) {
		const row = logRows.shift();
		const match = expression.exec(row);
		if (match) {
			const [, timestamp, action] = Array.from(match);
			const date = new Date(timestamp);
			const actionIsId = !isNaN(Number(action));
			if (actionIsId) {
				currentId = action;
			}

			log.push({
				id: currentId,
				hour: date.getHours(),
				minute: date.getMinutes(),
				action: actionIsId ? 'begins shift' : action
			});
		} else {
			console.log('NO MATCH', row);
		}
	}

	return log;
};

function first(input) {
	console.log(parseLog(input));
}

function createBounds(claim) {}

function second(input) {}

module.exports = {
	first,
	second
};
