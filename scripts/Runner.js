const { resolve, basename, dirname, join } = require('path');
const chokidar = require('chokidar');
const fs = require('fs');
const ejs = require('ejs');

// Keep an index of all files
// Watch file changes
// Have one "active" file
// Provide options for:
// * run a specific days files
//
// create a new day
// run

class Runner {
	constructor() {
		this.targetDir = resolve(process.cwd(), 'src');
		this.templatesDir = resolve(__dirname, 'templates');
		this.files = {};

		this._addFile = this._addFile.bind(this);
		this._removeFile = this._removeFile.bind(this);
		// this._bindEvents();
	}

	_addFile(path) {
		this.files[path] = {
			[path]: {
				part: basename(path),
				day: basename(dirname(path)),
				year: basename(dirname(dirname(path))),
				path
			}
		};

		console.log(this.files[path]);
	}

	_removeFile(path) {
		const index = this.files.indexOf(path);
		if (index === -1) return;

		this.files.splice(index, 1);
	}

	_bindEvents() {
		this.watcher = chokidar.watch(this.targetDir);
		this.watcher.on('add', this._addFile);
		this.watcher.on('change', path => {
			console.log(`CHANGE ${path}`);
		});
		this.watcher.on('unlink', this._removeFile);
	}

	_readFile(path) {
		const content = fs.readFileSync(path);

		return content.replace('\r\n', '\n').split('\n');
	}

	start(year, day, star) {
		const dir = resolve(this.targetDir, year, day);
		const module = require(join(dir, star));
		const input = this._readInput(join(dir, 'input.txt'));

		const now = Date.now();
		const result = module(input);
		const elapsed = now - Date.now();

		console.log(
			`Run completed in ${elapsed} milliseconds\n\nresult:\n${result}`
		);
	}

	_readTemplate(file) {
		const path = join(this.templatesDir, file);

		return fs.readFileSync(path, { encoding: 'utf-8' });
	}

	create(year, day) {
		const dir = resolve(this.targetDir, year, day);
		if (fs.existsSync(dir)) {
			console.error('This day already exists!');
			process.exit(1);
		}

		fs.mkdirSync(dir, { recursive: true });

		// create all files
		const puzzleTemplate = this._readTemplate('puzzle.js');
		const testTemplate = this._readTemplate('test.ejs');
		console.log(testTemplate);

		fs.writeFileSync(join(dir, 'puzzle.js'), puzzleTemplate);
		fs.writeFileSync(
			join(dir, 'test.js'),
			ejs.render(testTemplate, { year, day })
		);
	}

	takeInput() {}

	exit() {}
}

module.exports = Runner;
