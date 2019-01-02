const { max } = require('../../utils');
const LinkedList = require('../../utils/linkedList');

class PlayField extends LinkedList {
	constructor(first) {
		super();

		this.append(first);
		this.current = this.head;
	}

	addMarble(value) {
		this.current = this.next();


		this.current = this.insertAfter(this.current, value);
	}

	removeMarble() {
		for (let i = 0; i < 7; i++) {
			this.current = this.prev();
		}

		const removed = this.remove(this.current);

		this.current = removed.next;

		return removed.value;
	}

	toString() {
		let item = this.head;
		const arr = new Array(this.length);
		for (let i = 0; i < arr.length; i++) {
			if (!item) {
				console.log(i);
			}
			arr[i] = item !== this.current ? item.value : `(${item.value})`
			item = item.next;
		}

		return arr.toString();
	}

	next() {
		if (this.current === this.tail) {
			return this.head;
		}
		return this.current.next;
	}

	prev() {
		if (this.current === this.head) {
			return this.tail;
		}

		return this.current.prev;
	}
}

const parseInput = input => {
	const [players, lastMarble] = input[0].match(/(\d+)/g);

	return {
		players,
		lastMarble
	};
};

const next = (current, arr) => {
	const max = arr.length;
	if (max === 1) return 1;
	const res = current + 2;

	return res <= max ? res : Math.abs(max - res);
};

const prev = (current, arr) => {
	const res = current - 7;

	return res < 0 ? arr.length + res : res;
};

const play = (players, lastMarble, printAt = 0) => {
	const playField = new PlayField(0);
	let player = 0;
	const score = {};

	for (let marble = 1; marble <= lastMarble; marble++) {
		if (marble % 23 === 0) {
			const removed = playField.removeMarble();
			score[player] =
				(score[player] || 0) + marble + removed;
		} else {
			playField.addMarble(marble);
		}

		player += player === players - 1 ? -player : 1;
		if (printAt > 0 && marble > printAt && marble % printAt === 0) {
			// const hej = marble/lastMarble;
			console.log(`\x1Bc${Math.round((marble / lastMarble) * 100)} %`);
		}
	}

	return max(Object.values(score));
};

function first(input) {
	const { players, lastMarble } = parseInput(input);

	return play(players, lastMarble, 1000);
}

function second(input) {
	const { players, lastMarble } = parseInput(input);

	return play(players, lastMarble * 100, 50000);
}

module.exports = {
	first,
	second
};

// 412231 to low
