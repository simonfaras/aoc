import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { fork } from 'child_process';
import chokidar from 'chokidar';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PUZZLE_PATH = resolve(__dirname, '../src/puzzles');
const UTILS_PATH = resolve(__dirname, '../src/utils');

const options = (function () {
  const args = process.argv.slice(2);

  const isArg = (value) => /-\w+/.test(value);
  return args.reduce((acc, arg, i, array) => {
    if (isArg(arg)) {
      acc[arg.substring(1)] = isArg(array[i + 1]) || array[i + 1] || true;
    }
    return acc;
  }, {});
})();

function getDay(day, year) {
  const today = new Date(Date.now());

  const _day = (day ?? today.getDate().toString()).padStart(2, '0');
  const _year = year ?? today.getFullYear().toString();

  return {
    path: resolve(PUZZLE_PATH, _year, _day),
    year: _year,
    day: _day,
  };
}

function render() {
  process.stdout.cursorTo(0, 0);
  process.stdout.clearScreenDown();
}

async function run(day) {
  const watcher = chokidar.watch([day.path, UTILS_PATH], {
    ignored: '*.test.ts',
    persistent: true,
    ignoreInitial: true,
  });

  const mute = false;

  let child;
  const execute = () => {
    child?.kill('SIGINT');
    child = fork('./execute-day.ts', [day.path], {
      stdio: mute ? ['pipe', 'pipe', process.stderr, 'ipc'] : 'inherit',
      execArgv: [resolve(__dirname, '../node_modules/ts-node/dist/bin.js')],
      cwd: __dirname,
    });

    child.on('spawn', () => {
      render();
    });

    child.on('message', (message) => {
      switch (message.type) {
        case 'result': {
          console.log('Result:', message.payload.result);
          break;
        }
        default: {
          console.log('unknown message', JSON.stringify(message));
        }
      }
    });
  };

  watcher.on('all', (event, path) => {
    console.log('Restart');

    execute();
  });

  execute();
}

async function main() {
  // Gather input and manage watchers and child process
  const day = getDay(options.d, options.y);

  await run(day);
}

main();
