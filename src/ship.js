export class Ship {
  constructor(shipLength) {
    this.length = shipLength;
    this.health = shipLength;
    this.isSunk = false;
  }

  hit() {
    this.health--;
  }
}
