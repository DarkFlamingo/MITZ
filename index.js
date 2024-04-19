const fs = require('fs');

const BOARD_SIZE = 19;
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
      let r = row + dx;
      let c = col + dy;

      while (r >= 0 && r < this.boardSize && c >= 0 && c < this.boardSize && this.board[r][c] === currentPlayer) {
        consecutive++;
        r += dx;
        c += dy;

        if (this.board[r - dx][c - dy] === 0) {
          break;
        }
      }

      r = row - dx;
      c = col - dy;
      while (r >= 0 && r < this.boardSize && c >= 0 && c < this.boardSize && this.board[r][c] === currentPlayer) {
        consecutive++;
        r -= dx;
        c -= dy;

        if (this.board[r + dx][c + dy] === 0) {
          break;
        }
      }

      if (consecutive === 5) {
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

  let idx = 1;
  for (let t = 0; t < testCases; t++) {
    const game = new RenjuGame();
    for (let i = 0; i < BOARD_SIZE; i++) {
      const row = lines[idx++].split(' ').map(Number);
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