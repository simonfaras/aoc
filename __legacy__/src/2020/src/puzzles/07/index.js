import React from 'react';
import {test, real, test2} from './input';

const isTest = false;

const calc1 = (input) => {

	let checkColors = ["shiny gold"];
	let checkedColors = new Set();


	const getContainerColors = contentColor => {
		return Array.from(Object.entries(input).reduce((list, [color, rules]) => {
			if (rules.find(rule => rule.color === contentColor)) {
				list.add(color)
			}

			return list;
		}, new Set()))
	}

	let result = new Set();
	while(checkColors.length) {
		const currentColor = checkColors.splice(0, 1)[0];
		const contentColors = getContainerColors(currentColor);
		contentColors.forEach(color => result.add(color));
		checkedColors.add(currentColor);

		const newColors = contentColors.filter(color => !checkedColors.has(color));

		checkColors = [...checkColors, ...newColors];

		checkColors.concat(contentColors.filter(color => !checkedColors.has(color)));
	}

	console.log(result);
	return result.size;
};

const calc2 = () => {
	const input = isTest ? test2() : real();

	console.log(input);
	const getContentCount = (color, multiplier) => {
		const rules = input[color];


		if (rules.length === 0) {
			console.log(color, multiplier);
			return 1 * multiplier;
		}
		const temp = multiplier + rules.reduce((recursiveTotal, rule)=> recursiveTotal + getContentCount(rule.color, rule.count), 0) * multiplier


		return temp;
	}

	const res = getContentCount("shiny gold", 1) - 1;

	return res;
}

export default () => {
	const res = calc2(isTest ? test() : real());

	console.log(res)

	return <p>{res}</p>;
};
