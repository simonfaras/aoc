import { resolve } from 'path';
import { writeFileSync } from 'fs';

export function jsonDumper(dir: string) {
  return function (content: object, prefix?: string) {
    const filename = resolve(
      dir,
      !prefix ? 'dump.json' : prefix + '.dump.json'
    );

    writeFileSync(filename, JSON.stringify(content, null, 2));
  };
}
