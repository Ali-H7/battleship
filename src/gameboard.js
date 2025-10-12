import Ship from "./ship";
export default class Gameboard {
    constructor() {
        this.board = this.#generateGameBoard(10);
        this.ships = this.#createShips();
        this.#placeShips();
    }

    #generateGameBoard(size) {
        const board = [];
        for (let i = 0; i < size; i++) {
            board.push(new Array(size).fill(0));
        }
        return board;
    }

    #updateBoard(id, x, y) {
        this.board[x][y] = id;
    }

    #createShips() {
        const ships = [];
        let shipLength = 2;
        for (let i = 1; i < 6; i++) {
            const ship = new Ship(i, shipLength)
            if (i !== 2) shipLength++
            ships.push(ship)
        }
        return ships;
    }

    #placeShips() {
        this.ships.forEach((ship) => {
            let placementFound = false;
            let placements;
            while (!placementFound) {
                const [x, y] = this.#getRandomCoordinates();
                const shipLength = ship.length;
                placements = this.#getPlacements(x, y, shipLength);
                if (!placements) continue;
                placementFound = true;
            }
            const placement = this.#pickPlacement(placements);
            const shipID = ship.id;
            placement.forEach((coords) => {
                const x = coords[0];
                const y = coords[1];
                // const adjacentCells = this.#getAdjacentCells(x, y);
                // this.#handleAdjacentCells(adjacentCells)
                this.#updateBoard(shipID, x, y);
            })
        })
    }
    // #handleAdjacentCells(adjacentCells) {
    //     adjacentCells.forEach((cell) => {
    //         const x = cell[0]
    //         const y = cell[1]
    //         if (this.#checkIfNotOccupied(x, y)) this.#updateBoard(-3, x, y);
    //     })
    // }
    #getRandomCoordinates() {
        let coordsFound = false;
        let x;
        let y;
        while (!coordsFound) {
            x = Math.floor(Math.random() * 10)
            y = Math.floor(Math.random() * 10)
            if (this.#checkIfNotOccupied(x, y)) coordsFound = true;
        }
        return [x, y];
    };

    #getPlacements(x, y, shipLength) {
        const possiblePlacements = [[[x, y]], [[x, y]], [[x, y]], [[x, y]]];
        outerloop:
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < shipLength - 1; j++) {
                x = possiblePlacements[i][j][0];
                y = possiblePlacements[i][j][1];
                if (i === 0) x++;
                else if (i === 1) x--;
                else if (i === 2) y++;
                else y--;
                if (x < 0 || y < 0 || x > 9 || y > 9) {
                    possiblePlacements[i] = false;
                    continue outerloop;
                } else if (!this.#checkIfNotOccupied(x, y)) {
                    possiblePlacements[i] = false;
                    continue outerloop;
                } else {
                    const coords = [x, y];
                    possiblePlacements[i].push(coords);
                }
            }
        }
        const placements = this.#checkPlacements(possiblePlacements);
        return placements;
    }

    #pickPlacement(placements) {
        const randomNum = Math.floor(Math.random() * placements.length);
        const placement = placements[randomNum];
        return placement;
    }

    #checkIfNotOccupied(x, y) {
        return this.board[x][y] === 0
    }

    #checkPlacements(possiblePlacements) {
        const placements = [];
        possiblePlacements.forEach((placement) => {
            if (placement !== false) placements.push(placement);
        })
        if (placements.length === 0) return false;
        return placements
    };

    receiveAttack(x, y, attackedPlayer, turnCb) {
        const attackedTile = this.board[x][y];
        if (attackedTile === 0) {
            this.board[x][y] = -1
            turnCb();
        } else if (attackedTile > 0) {
            const ships = attackedPlayer.gameboard.ships
            const shipID = attackedTile - 1
            const ship = ships[shipID];
            ship.hit();
            this.board[x][y] = -2
        }
    }

    // #getAdjacentCells(x, y) {
    //     const adjacentCells = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
    //     for (let i = adjacentCells.length - 1; i >= 0; i--) {
    //         const x = adjacentCells[i][0]
    //         const y = adjacentCells[i][1]
    //         if (x < 0 || y < 0 || x > 9 || y > 9) adjacentCells.splice(i, 1);
    //     }
    //     return adjacentCells;
    // }

    checkIfAllShipsSunk() {
        return this.ships.every((ship) => ship.sunk === true);
    }

}