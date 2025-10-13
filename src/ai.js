import Dom from "./dom";
export default class Ai {
    static #availableMoves = this.#generateAvailableMoves();

    static async play(firstPlayer, secondPlayer, getCurrentTurn, updateTurn, render) {
        let attackCount = 0;
        let currentTurn = getCurrentTurn();
        let coords;
        let index;
        let x;
        let y;
        let direction;
        while (currentTurn === -1) {
            await this.#delay(1000);
            if (attackCount === 1) {
                const attack = this.#handleSuccessiveAttacks(x, y);
                if (attack !== false) {
                    ({ coords, index, direction } = attack)
                } else {
                    ({ coords, index } = this.#generateCoordsForAttacking());
                }
            } else if (attackCount > 1) {
                const attack = this.#handleSuccessiveAttacks(x, y, direction);
                if (attack !== false) {
                    ({ coords, index, direction } = attack)
                } else {
                    ({ coords, index } = this.#generateCoordsForAttacking());
                }
            } else {
                ({ coords, index } = this.#generateCoordsForAttacking());
            }
            x = coords[0]
            y = coords[1]
            firstPlayer.gameboard.receiveAttack(x, y, firstPlayer, updateTurn);
            this.#markMovePlayed(index);
            render(firstPlayer, secondPlayer);
            currentTurn = getCurrentTurn();
            attackCount++;
            if (firstPlayer.gameboard.checkIfAllShipsSunk()) {
                Dom.endGame();
                return;
            }
        }
    }
    static #generateAvailableMoves() {
        const availableMoves = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const x = i;
                const y = j;
                const coords = [x, y];
                availableMoves.push(coords);
            }
        }
        return availableMoves
    }

    static resetAvailableMoves() {
        this.#availableMoves = this.#generateAvailableMoves();
    }
    static #generateCoordsForAttacking() {
        const availableMoves = this.#getavailableMoves();
        const availableMovesCount = availableMoves.length;
        const index = Math.floor(Math.random() * availableMovesCount);
        const coords = availableMoves[index];
        return { coords, index };
    }

    static #handleSuccessiveAttacks(x, y, previousDirection = this.#randomDirection()) {
        const adjacentPositions = [{ position: [x + 1, y], previousDirection: 0, }, { position: [x - 1, y], previousDirection: 1 }, { position: [x, y + 1], previousDirection: 2 }, { position: [x, y + 1], previousDirection: 3 }];
        let nextMove;
        let coords;
        let index;
        let direction;
        for (let i = adjacentPositions.length - 1; i >= 0; i--) {
            const x = adjacentPositions[i].position[0];
            const y = adjacentPositions[i].position[1];
            const check = this.#checkIfTheMoveValid(x, y);
            if (check >= 0) {
                adjacentPositions[i].index = check;
                continue;
            }
            adjacentPositions.splice(i, 1);
        }
        if (adjacentPositions.length !== 0) {
            nextMove = adjacentPositions.find((pos) => previousDirection === pos.previousDirection);
            if (nextMove === undefined) {
                const index = Math.floor(Math.random() * adjacentPositions.length);
                nextMove = adjacentPositions[index];
            }
            coords = nextMove.position;
            index = nextMove.index;
            direction = nextMove.previousDirection;
            return { coords, index, direction }
        }
        return false;
    }

    static #checkIfTheMoveValid(x, y) {
        return this.#availableMoves.findIndex((coords) => coords[0] === x && coords[1] === y);
    }

    static #getavailableMoves() {
        return this.#availableMoves;
    }

    static #randomDirection() {
        return Math.floor(Math.random() * 4)
    }

    static #markMovePlayed(index) {
        this.#availableMoves.splice(index, 1);
    }

    static #delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}