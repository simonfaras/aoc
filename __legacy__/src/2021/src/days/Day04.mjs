const getId = (b, r) => `${b}-${r}`;

const parse = (input) => {
  const numbers = input
    .splice(0, 1)[0]
    .split(',')
    .map((n) => Number.parseInt(n));

  let boards = {};
  let board_id = -1;
  let row_id = 0;
  input.forEach((row) => {
    if (!row) {
      board_id += 1;
      row_id = 0;
    } else {
      boards[getId(board_id, row_id)] = row
        .split(' ')
        .filter((n) => n !== '')
        .map((n) => Number.parseInt(n));
      row_id += 1;
    }
  });

  return {
    numbers,
    boards,
  };
};

export const puzzleA = (input) => {
  const { numbers, boards: boardsRaw } = parse(input);
  const boards = Object.entries(boardsRaw);
  let bingo = null;
  let number = -1;
  while (numbers.length && !bingo) {
    number = numbers.splice(0, 1)[0];

    for (let br = 0; br < boards.length; br++) {
      const [id, row] = boards[br];
      const [boardId] = id.split('-');

      for (let i = 0; i < row.length; i++) {
        if (row[i] === number) {
          row[i] = getId('X', row[i]);
          if (row.every((n) => n.toString().startsWith('X'))) {
            bingo = id;
            break;
          }

          // check columns
          const colum = [];
          for (let r = 0; r < 5; r++) {
            colum[r] = boardsRaw[getId(boardId, r)][i];
          }
          if (colum.every((n) => n.toString().startsWith('X'))) {
            bingo = id;
            break;
          }
        }
      }

      // check columns
    }
  }

  const [board, row] = bingo.split('-').map((n) => n - 0);

  let score = 0;
  for (let i = 0; i < 5; i++) {
    const rowId = getId(board, i);
    boardsRaw[rowId].forEach((n) => {
      if (Number.isInteger(n)) {
        score += n;
      }
    });
  }

  // 35217
  console.log(score, number, bingo);
  console.log(JSON.stringify(boardsRaw, null, 2));
  return score * number;
};

export const puzzleB = (input) => {
  const { numbers, boards: boardsRaw } = parse(input);
  const boards = Object.entries(boardsRaw);
  let hasBingo = [];
  const boardsCount = boards.length / 5;
  let number = -1;
  while (numbers.length && hasBingo.length < boardsCount) {
    number = numbers.splice(0, 1)[0];

    for (let br = 0; br < boards.length; br++) {
      const [id, row] = boards[br];
      const [boardId] = id.split('-');

      if (!hasBingo.includes(boardId)) {
        for (let i = 0; i < row.length; i++) {
          if (row[i] === number) {
            row[i] = getId('X', row[i]);
            let isBingo = false;
            if (row.every((n) => n.toString().startsWith('X'))) {
              isBingo = true;
            }

            // check columns
            const colum = [];
            for (let r = 0; r < 5; r++) {
              colum[r] = boardsRaw[getId(boardId, r)][i];
            }
            if (colum.every((n) => n.toString().startsWith('X'))) {
              isBingo = true;
            }

            if (isBingo) {
              hasBingo.push(boardId);
            }
          }
        }
      }

      // check columns
    }
  }

  console.log('bingo', hasBingo);

  const board = hasBingo.pop();

  let score = 0;
  for (let i = 0; i < 5; i++) {
    const rowId = getId(board, i);
    boardsRaw[rowId].forEach((n) => {
      if (Number.isInteger(n)) {
        score += n;
      }
    });
  }

  // 35217
  console.log(score, number);
  console.log(JSON.stringify(boardsRaw, null, 2));
  return score * number;
};
