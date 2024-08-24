export class Gameboard {
  constructor() {
    this.board = this.generateBoard();
  }

  generateBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      const row = new Array(10);
      board.push(row);
    }
    return board;
  }
}
