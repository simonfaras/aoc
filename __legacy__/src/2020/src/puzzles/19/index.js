import React from 'react';
import { test, real } from './input';

const isTest = true;
const calc1 = (input) => {
	const { rules, messages } = input;
	const resolve = [0];
	const resolved = {};


	const isResolved = rule => /^(([a-z]|\||\(|\))\s?)+$/.test(rule);

	let loop = true;
	while (resolve.length) {
		const currentId = resolve.splice(0, 1)[0];
		let currentRule = rules[currentId];

		const unresolved = currentRule.match(/\d/g);

		unresolved.forEach(id => {

			if (!resolve.includes(id)) {
				resolve.push(id);
			}
		})


	}
	console.log(rules)
};

const calc2 = (input) => {

};

export default () => {
	const res = calc1(isTest ? test() : real());


	return <p>{res}</p>;
};
