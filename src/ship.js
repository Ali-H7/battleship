export class Ship {
  constructor(shipLength) {
    this.length = shipLength;
    this.health = shipLength;
    this.status = 'floating';
  }

  hit() {
    this.health--;
    this.isSunk();
  }

  isSunk() {
    if (this.health === 0) this.status = 'sunk';
  }
}
