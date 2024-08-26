import { Gameboard } from './gameboard';

class Player {
  constructor(playerType) {
    this.type = playerType;
    this.board = new Gameboard();
  }
}
