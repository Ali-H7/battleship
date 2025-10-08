export default class Ship {
    constructor(id, shipLength) {
        this.id = id;
        this.length = shipLength;
        this.health = shipLength;
        this.sunk = false;
    }

    hit() {
        this.health--;
        this.isSunk();
    }

    isSunk() {
        if (this.health === 0) this.sunk = true;
    }
}