import { Ship } from './ship';

export class Gameboard {
  constructor() {
    this.board = this.generateBoard();
    this.occupiedLocations = [];
    this.ships = this.createShips();
  }

  generateBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      const row = new Array(10).fill(0);
      board.push(row);
    }
    return board;
  }

  createShips() {
    let shipID = 1;
    const ships = [];
    for (let i = 0; i < 10; i++) {
      const shipLength = Math.floor(Math.random() * 5) + 1;
      const shipAlignment = this.getAlignment();
      const shipPosition = this.generatePosition(shipAlignment, shipLength);
      const ship = new Ship(shipID, shipLength, shipAlignment, shipPosition);
      ships.push(ship);
      shipID++;
    }
    return ships;
  }

  getAlignment() {
    const randomNum = Math.floor(Math.random() * 2) + 1;
    return randomNum === 1 ? 'vertical' : 'horizontal';
  }

  generatePosition(alignmnet, length) {
    const position = [];
    let randomIndex1 = Math.floor(Math.random() * 10) + 1;
    let randomIndex2 = Math.floor(Math.random() * 10) + 1;
    let count = 0;

    while (count < length) {
      const coords = [];
      if (alignmnet === 'vertical') {
        coords.push(randomIndex1 % 10);
        coords.push(randomIndex2 - 1);
        randomIndex1++;
      } else if (alignmnet === 'horizontal') {
        coords.push(randomIndex1 - 1);
        coords.push(randomIndex2 % 10);
        randomIndex2++;
      }

      const isPositionTaken = this.checkPosition(coords);
      const isOffTheBoard = this.checkLimit(position, coords);
      if (isPositionTaken || isOffTheBoard) {
        count = 0;
        position.length = 0;
        randomIndex1 = Math.floor(Math.random() * 10) + 1;
        randomIndex2 = Math.floor(Math.random() * 10) + 1;
        continue;
      }
      position.push(coords);
      count++;
    }

    position.forEach((coords) => {
      this.occupiedLocations.push(coords);
    });
    return position;
  }

  // checks if the position is already taken by another ship
  checkPosition(position) {
    let matchFound = false;
    const coords = this.occupiedLocations;
    for (let i = 0; i < coords.length; i++) {
      if (coords[i][0] === position[0] && coords[i][1] === position[1]) {
        matchFound = true;
        break;
      }
    }
    return matchFound;
  }

  // checks if the ship goes off the board for ex if a ship is placed on index 9 then parts of it placed on index 0
  checkLimit(coords, newCoords) {
    const index = coords.length - 1;
    const lastCoords = coords[index];
    if (index === -1) return false;
    const case1 =
      lastCoords[0] + 1 !== newCoords[0] && lastCoords[1] === newCoords[1];
    const case2 =
      lastCoords[0] === newCoords[0] && lastCoords[1] + 1 !== newCoords[1];
    return case1 || case2;
  }

  placeShips() {
    this.ships.forEach((ship) => {
      ship.position.forEach((coords) => {
        const x = coords[0];
        const y = coords[1];
        this.board[x][y] = ship.id;
      });
    });
  }
}
