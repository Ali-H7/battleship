import { Gameboard } from './gameboard';

export class Player {
  constructor(playerType) {
    this.type = playerType;
    this.board = new Gameboard();
    this.playedMoves = [];
    this.lastMove = [];
    this.turn = false;
    if (this.type === 'player') this.turn = true;
  }

  updatePlayedMoves(x, y) {
    const playedMove = [x, y];
    this.playedMoves.push(playedMove);
    this.lastMove = playedMove;
  }

  resetLastMove() {
    this.lastMove = [];
  }

  setTurn() {
    if (this.turn === true) {
      this.turn = false;
    } else {
      this.turn = true;
    }
  }
}
