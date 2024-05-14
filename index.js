const fs = require('fs');

const BOARD_SIZE = 19;
const ITEMS_COUNT = 5;
const FILE_NAME = 'input3.txt';

class RenjuGame {
  constructor() {
    this.boardSize = BOARD_SIZE;
    this.board = Array.from({
      length: this.boardSize
    }, () => Array(this.boardSize).fill(0));
  }

  checkWinner(row, col) {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1]
    ];

    const currentPlayer = this.board[row][col];
    for (const [dx, dy] of directions) {
      let consecutive = 1;
      let rowDx = row + dx;
      let colDx = col + dy;

      while (rowDx >= 0 && rowDx < this.boardSize && colDx >= 0 && colDx < this.boardSize && this.board[rowDx][colDx] === currentPlayer) {
        consecutive++;
        rowDx += dx;
        colDx += dy;

        if (this.board[rowDx - dx][colDx - dy] === 0) {
          break;
        }
      }

      rowDx = row - dx;
      colDx = col - dy;
      while (rowDx >= 0 && rowDx < this.boardSize && colDx >= 0 && colDx < this.boardSize && this.board[rowDx][colDx] === currentPlayer) {
        consecutive++;
        rowDx -= dx;
        colDx -= dy;

        if (this.board[rowDx + dx][colDx + dy] === 0) {
          break;
        }
      }

      if (consecutive === ITEMS_COUNT) {
        return true;
      }
    }

    return false;
  }
}

fs.readFile(FILE_NAME, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.trim().split('\n');
  const testCases = parseInt(lines[0]);

  if (lines.length < BOARD_SIZE) {
    console.error("Error in input data");
  }

  let idx = 1;
  for (let t = 0; t < testCases; t++) {
    const game = new RenjuGame();

    for (let i = 0; i < BOARD_SIZE; i++) {
      const row = lines[idx++].split(' ').map(Number);

      if (row.length < BOARD_SIZE) {
        console.error("Error in input data");
      }

      for (let j = 0; j < BOARD_SIZE; j++) {
        game.board[i][j] = row[j];
      }
    }

    let {
      winner,
      row,
      col
    } = {
      winner: 0,
      row: 0,
      col: 0
    };

    for (let j = 0; j < BOARD_SIZE; j++) {
      for (let i = 0; i < BOARD_SIZE; i++) {
        if (game.board[i][j] !== 0) {
          const result = game.checkWinner(i, j);
          if (result) {
            winner = game.board[i][j];
            row = i + 1;
            col = j + 1;
            break;
          }
        }
      }
      if (winner !== 0) {
        break;
      }
    }

    if (winner === 0) {
      console.log(0);
    } else {
      console.log(winner);
      console.log(row, col);
    }
  }
});