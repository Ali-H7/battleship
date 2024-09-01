import { Ship } from './ship';

export class Gameboard {
  constructor() {
    this.board = this.generateBoard();
    this.availableLocations = this.generateLocations();
    this.occupiedLocations = [];
    this.ships = this.createShips();
    this.placeShips();
  }

  generateLocations() {
    const locations = [];
    for (let x = 0; x < 10; x++) {
      const rows = [];
      for (let y = 0; y < 10; y++) {
        const columns = [x, y];
        rows.push(columns);
      }
      locations.push(rows);
    }
    return locations;
  }

  findPosition(shipAlignment, shipLength) {
    while (true) {
      const locations = this.availableLocations;
      const randomIndex1 = this.getIndex(locations);
      if (randomIndex1 < 0) continue;
      const randomIndex2 = this.getIndex(locations[randomIndex1]);
      if (randomIndex2 < 0) continue;
      const startingPosition = locations[randomIndex1][randomIndex2];
      const endingPositions = this.getPossibleEndings(
        startingPosition,
        shipAlignment,
        shipLength
      );
      const possiblePositions = this.calculatePosition(
        startingPosition,
        endingPositions,
        shipAlignment,
        shipLength
      );
      const position = possiblePositions.find(this.verifyPosition);
      if (!position) continue;
      this.markLocationOccupied(position);
      return position;
    }
  }

  markLocationOccupied(position) {
    const locationsToOccupy = [];
    position.forEach((coords) => {
      locationsToOccupy.push(coords);
      const adjacentPositions = this.getAdjacentCells(coords);
      adjacentPositions.forEach((coords) => {
        locationsToOccupy.push(coords);
      });
    });
    const removeDuplicates = locationsToOccupy
      .map(JSON.stringify)
      .filter((el, i, ar) => i === ar.indexOf(el))
      .map(JSON.parse);
    const placeHolder = this.removeOutOfBounds(removeDuplicates);
    placeHolder.forEach((e) => {
      this.availableLocations.forEach((rows, i) => {
        rows.forEach((coords, j) => {
          if (e[0] === coords[0] && e[1] === coords[1]) {
            this.availableLocations[i].splice(j, 1);
          }
        });
      });
    });
  }
  removeOutOfBounds(positions) {
    positions.forEach((position, i) => {
      const x = position[0];
      const y = position[1];
      if (x < 0 || y < 0 || x > 9 || y > 9) {
        positions.splice(i, 1);
      }
    });
    return positions;
  }
  getAdjacentCells(coords) {
    const offsetRight = [coords[0] + 1, coords[1]];
    const offsetDown = [coords[0], coords[1] + 1];
    const offsetLeft = [coords[0] - 1, coords[1]];
    const offsetUp = [coords[0], coords[1] - 1];
    return [offsetRight, offsetDown, offsetLeft, offsetUp];
  }

  verifyPosition(position) {
    for (let i = 0; i < position.length; i++) {
      const x = position[i][0];
      const y = position[i][1];
      if (x < 0 || y < 0 || x > 9 || y > 9) return false;
    }
    return true;
  }

  getIndex(arr) {
    const length = arr.length;
    return Math.floor(Math.random() * length);
  }

  getPossibleEndings(coords, alignment, length) {
    const possibleEndingPositions = [];
    if (alignment === 'horizontal') {
      const offsetRight = [coords[0] + (length - 1), coords[1]];
      const offsetLeft = [coords[0] - (length - 1), coords[1]];
      possibleEndingPositions.push(offsetRight);
      possibleEndingPositions.push(offsetLeft);
    } else {
      const offsetDown = [coords[0], coords[1] + (length - 1)];
      const offsetUp = [coords[0], coords[1] - (length - 1)];
      possibleEndingPositions.push(offsetDown);
      possibleEndingPositions.push(offsetUp);
    }
    return possibleEndingPositions;
  }

  calculatePosition(start, end, alignment, length) {
    const position = [];
    for (let i = 0; i < end.length; i++) {
      const possiblePositions = [start];
      for (let j = 2; j < length; j++) {
        const lastPosition = possiblePositions[possiblePositions.length - 1];
        if (alignment === 'horizontal') {
          const nextPosition = this.calculateNextPosition(
            lastPosition,
            alignment,
            i
          );
          possiblePositions.push(nextPosition);
        } else {
          const nextPosition = this.calculateNextPosition(
            lastPosition,
            alignment,
            i
          );
          possiblePositions.push(nextPosition);
        }
      }
      i === 1 ? possiblePositions.push(end[1]) : possiblePositions.push(end[0]);
      i === 1
        ? position.push(possiblePositions.reverse())
        : position.push(possiblePositions);
    }
    return position;
  }

  calculateNextPosition(lastPosition, alignment, i) {
    let nextPosition;

    if (i === 0 && alignment === 'horizontal') {
      nextPosition = [lastPosition[0] + 1, lastPosition[1]];
    } else if (i === 1 && alignment === 'horizontal') {
      nextPosition = [lastPosition[0] - 1, lastPosition[1]];
    }

    if (i === 0 && alignment === 'vertical') {
      nextPosition = [lastPosition[0], lastPosition[1] + 1];
    } else if (i === 1 && alignment === 'vertical') {
      nextPosition = [lastPosition[0], lastPosition[1] - 1];
    }

    return nextPosition;
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
    let shipLength = 1;
    const ships = [];
    for (let i = 0; i < 10; i++) {
      if (shipLength === 6) shipLength = 1;
      const shipAlignment = this.getAlignment();
      const shipPosition = this.findPosition(shipAlignment, shipLength);
      const ship = new Ship(shipID, shipLength, shipAlignment, shipPosition);
      ships.push(ship);
      shipID++;
      shipLength++;
    }
    return ships;
  }

  getAlignment() {
    const randomNum = Math.floor(Math.random() * 2) + 1;
    return randomNum === 1 ? 'vertical' : 'horizontal';
  }

  // generatePosition(alignmnet, length) {
  //   const position = [];
  //   let randomIndex1 = Math.floor(Math.random() * 10) + 1;
  //   let randomIndex2 = Math.floor(Math.random() * 10) + 1;
  //   let count = 0;

  //   while (count < length) {
  //     const coords = [];
  //     if (alignmnet === 'vertical') {
  //       coords.push(randomIndex1 % 10);
  //       coords.push(randomIndex2 - 1);
  //       randomIndex1++;
  //     } else if (alignmnet === 'horizontal') {
  //       coords.push(randomIndex1 - 1);
  //       coords.push(randomIndex2 % 10);
  //       randomIndex2++;
  //     }

  //     //TODO Prevent Ships from placing next to each other !
  //     const isPositionTaken = this.checkPosition(coords);
  //     const isOffTheBoard = this.checkLimit(position, coords);
  //     if (isPositionTaken || isOffTheBoard) {
  //       count = 0;
  //       position.length = 0;
  //       randomIndex1 = Math.floor(Math.random() * 10) + 1;
  //       randomIndex2 = Math.floor(Math.random() * 10) + 1;
  //       continue;
  //     }
  //     position.push(coords);
  //     count++;
  //   }

  //   position.forEach((coords) => {
  //     this.occupiedLocations.push(coords);
  //     this.occupyAdjacentCells(coords);
  //   });
  //   return position;
  // }

  // // checks if the position is already taken by another ship
  // checkPosition(position) {
  //   let matchFound = false;
  //   const coords = this.occupiedLocations;
  //   for (let i = 0; i < coords.length; i++) {
  //     if (coords[i][0] === position[0] && coords[i][1] === position[1]) {
  //       matchFound = true;
  //       break;
  //     }
  //   }
  //   return matchFound;
  // }

  // // checks if the ship goes off the board for ex if a ship is placed on index 9 then parts of it placed on index 0
  // checkLimit(coords, newCoords) {
  //   const index = coords.length - 1;
  //   const lastCoords = coords[index];
  //   if (index === -1) return false;
  //   const case1 =
  //     lastCoords[0] + 1 !== newCoords[0] && lastCoords[1] === newCoords[1];
  //   const case2 =
  //     lastCoords[0] === newCoords[0] && lastCoords[1] + 1 !== newCoords[1];
  //   return case1 || case2;
  // }

  // //Prevent ships from being added adjacently
  // occupyAdjacentCells(coords) {
  //   const offsetRight = [coords[0] + 1, coords[1]];
  //   const offsetDown = [coords[0], coords[1] + 1];
  //   const offsetLeft = [coords[0] - 1, coords[1]];
  //   const offsetUp = [coords[0], coords[1] - 1];
  //   this.occupiedLocations.push(offsetRight);
  //   this.occupiedLocations.push(offsetDown);
  //   this.occupiedLocations.push(offsetLeft);
  //   this.occupiedLocations.push(offsetUp);
  // }

  placeShips() {
    this.ships.forEach((ship) => {
      ship.position.forEach((coords) => {
        const x = coords[0];
        const y = coords[1];
        this.board[x][y] = ship.id;
      });
    });
  }

  receiveAttack(x, y) {
    const attackedTile = this.board[x][y];
    const ship = attackedTile - 1;

    if (attackedTile !== 0) {
      this.ships[ship].hit();
      this.updateBoard(x, y, -2);
    } else if (attackedTile === 0) {
      this.updateBoard(x, y, -1);
    }
    return attackedTile;
  }

  updateBoard(x, y, value) {
    this.board[x][y] = value;
  }

  checkShipsStatus() {
    return this.ships.every((ship) => ship.status === 'sunk');
  }
}
