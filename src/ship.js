export class Ship {
  constructor(id, shipLength, alignmnet, position) {
    this.id = id;
    this.length = shipLength;
    this.health = shipLength;
    this.status = 'floating';
    this.alignmnet = alignmnet;
    this.position = position;
  }

  hit() {
    this.health--;
    this.isSunk();
  }

  isSunk() {
    if (this.health === 0) this.status = 'sunk';
  }
}
