import { Input } from '../../../utils';
import { join } from 'path';
import { jsonDumper } from '../../../utils/dump';

const dump = jsonDumper(__dirname);

function parseInput(input: Input) {
  const rows = input.asRows().splitAll(' ');

  return parseSystem(rows);
}

type Directory = {
  dirs: Set<string>;
  files: Map<string, number>;
};
type FileSystem = Map<string, Directory>;

function createDir(): Directory {
  return {
    dirs: new Set(),
    files: new Map(),
  };
}

function parseSystem(rows: string[][]): FileSystem {
  const path: string[] = [];
  const system: FileSystem = new Map([['/', createDir()]]);

  const currentPath = () => join(...path);

  function handleCommand(row: string[]) {
    const [, command, arg] = row;
    const current = system.get(currentPath());

    if (command === 'cd') {
      if (arg === '..' && currentPath() !== '/') {
        path.pop();
      } else if (arg === '/') {
        path.push(arg);
      } else if (current?.dirs.has(arg)) {
        path.push(arg);
      }
    }
  }

  function handleDirectory(row: string[]) {
    const [, dir] = row;
    const dirpath = join(currentPath(), dir);

    if (!system.has(dirpath)) {
      system.set(dirpath, createDir());
    }

    const current = system.get(currentPath());
    if (current) {
      current.dirs.add(dir);
    }
  }

  function handleFile(row: string[]) {
    const [size, name] = row;
    try {
      const dir = system.get(currentPath());
      if (dir) {
        dir.files.set(name, Number(size));
      } else {
        console.log('MISSING DIR', dir);
      }
    } catch (e) {
      console.log('CURRENT', currentPath());
      throw e;
    }
  }

  for (const row of rows) {
    switch (row[0]) {
      case '$': {
        handleCommand(row);
        break;
      }
      case 'dir': {
        handleDirectory(row);
        break;
      }
      default: {
        handleFile(row);
      }
    }
  }
  return system;
}

function getDirFileSize(dir: string, system: FileSystem): number {
  const stack: string[] = [];
  let sum = 0;
  let current: string | undefined = dir;
  while (current !== undefined) {
    const directory = system.get(current);

    if (directory !== undefined) {
      sum += [...directory.files.values()].sum();
      stack.push(...[...directory.dirs].map((d) => join(current ?? '', d)));
    }

    current = stack.pop();
  }

  return sum;
}

export function first(input: Input) {
  const data = parseInput(input);

  return [...data.keys()]
    .map((v) => getDirFileSize(v, data))
    .filter((size) => size <= 100000)
    .sum();
}

export function second(input: Input) {
  const data = parseInput(input);

  const totalSpace = 70000000;
  const neededSpace = 30000000;
  const usedSpace = getDirFileSize('/', data);
  const freeSpace = totalSpace - usedSpace;
  const neededToFreeSpace = neededSpace - freeSpace;

  return [...data.keys()]
    .map((v) => getDirFileSize(v, data))
    .filter((size) => size >= neededToFreeSpace)
    .min();
}
