export default class Ai {
    static #playedMoves = [];

    static async play(firstPlayer, secondPlayer, getCurrentTurn, updateTurn, render) {
        let currentTurn = getCurrentTurn();
        console.log(currentTurn);
        while (currentTurn === -1) {
            await this.#delay(1000);
            const coords = this.#generateCoordsForAttacking();
            const x = coords[0]
            const y = coords[1]
            this.#addToPlayedMoves(coords);
            firstPlayer.gameboard.receiveAttack(x, y, firstPlayer, updateTurn);
            render(firstPlayer, secondPlayer);
            currentTurn = getCurrentTurn();
        }
    }

    static #generateCoordsForAttacking() {
        const coords = [];
        let coordsFound = false;
        while (!coordsFound) {
            const x = Math.floor(Math.random() * 10);
            coords.push(x);
            const y = Math.floor(Math.random() * 10);
            coords.push(y);
            const checkMove = this.#checkIfTheMovePlayedBefore(x, y);
            if (!checkMove) coordsFound = true;
        }
        return coords;
    }

    static #checkIfTheMovePlayedBefore(x, y) {
        return this.#playedMoves.some((coords) => {
            coords[0] === x && coords[1] === y;
        })
    }

    static #addToPlayedMoves(coords) {
        this.#playedMoves.push(coords);
    }

    static #delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}