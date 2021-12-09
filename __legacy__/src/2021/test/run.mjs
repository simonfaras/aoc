export function run(puzzle, input, expected) {
  const result = puzzle(input);

  if (result !== expected) {
    console.error(`FAIL: expected ${expected}`);
    console.error(`FAIL: result ${JSON.stringify(result)}`);
  } else {
    console.log('SUCCESS:', result);
  }
}
