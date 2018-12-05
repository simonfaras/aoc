const argv = require('yargs').argv;
const Runner = require('../scripts/Runner');
const run = new Runner();

console.log(argv);
const [year_raw, day_raw, star_raw] = argv._;

const year = year_raw + '';
const day = day_raw < 10 ? '0' + day_raw : day_raw;
const star = star_raw + '';

if (argv.c) {
  // Create mode
	run.create(year, day);
} else {
  // Run mode
	run.start(year, day, star);
}
