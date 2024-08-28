import { Gameboard } from './gameboard';

export class Player {
  constructor(playerType) {
    this.type = playerType;
    this.board = new Gameboard();
    this.playedMoves = [];
    this.lastMove = [];
  }

  updatePlayedMoves(x, y) {
    const playedMove = [x, y];
    this.playedMoves.push(playedMove);
    this.lastMove = [playedMove];
  }
}
