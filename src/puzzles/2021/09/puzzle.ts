import { Input } from '../../../utils/core';

export function first(input: Input) {
	return input.asArray().sort();
}

export function second(input: Input) {
	return input;
}
