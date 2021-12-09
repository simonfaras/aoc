import React from 'react';
import { test, real } from './input';

const isTest = false;

const negativeDirections = ['E', 'S'];
const getSignedDistance = (direction, distance) =>
	(negativeDirections.includes(direction) ? -1 : 1) * distance;

const orientations = {
	0: 'N',
	90: 'E',
	180: 'S',
	270: 'W',
};

const move = (ship, direction, value) => {
	const dir = direction === 'F' ? orientations[ship.orientation] : direction;
	const signedDistance = getSignedDistance(dir, value);
	if (dir === 'E' || dir === 'W') {
		ship.x += signedDistance;
	}
	if (dir === 'N' || dir === 'S') {
		ship.y += signedDistance;
	}
};

const turn = (ship, direction, value) => {
	const sign = direction === 'L' ? -1 : 1;
	const degrees = value * sign;
	ship.orientation = (ship.orientation + degrees) % 360;
	if (ship.orientation < 0) {
		ship.orientation += 360;
	}
};

const calc1 = (input) => {
	console.log(input);
	const ship = {
		orientation: 90,
		x: 0,
		y: 0,
	};

	input.forEach(([instruction, value]) => {
		if (instruction === 'R' || instruction === 'L') {
			turn(ship, instruction, value);
		} else {
			move(ship, instruction, value);
		}
	});

	console.log(ship);

	return Math.abs(ship.x) + Math.abs(ship.y);
};



const calc2 = (input) => {
	const state = {
		waypoint: { x: 10, y: 1 },
		position: { x: 0, y: 0 },
	};


};

export default () => {
	const res = calc1(isTest ? test() : real());

	return <p>{res ?? 'NOTHING'}</p>;
};
