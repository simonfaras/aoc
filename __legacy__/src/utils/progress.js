const progress = total => {
	const start = Date.now();
	return elapsed => {
		const value = Math.round((elapsed / total) * 100);
		const duration = Date.now() - start;

		console.log(`\x1Bc${value} % (${duration / 1000} s)`);
	};
};

module.exports = {
	progress
};
