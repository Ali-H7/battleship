import Ai from "./ai";
export default class Dom {

    static currentTurn = this.#initializeTurn();

    static handleUI(firstPlayer, secondPlayer) {
        this.#clearUI()
        this.#generateBoards(firstPlayer, secondPlayer)
    }

    static #clearUI() {
        const boardElement1 = document.querySelector('.first-player');
        const boardElement2 = document.querySelector('.second-player');

        while (boardElement1.firstChild && boardElement2.firstChild) {
            boardElement1.removeChild(boardElement1.firstChild);
            boardElement2.removeChild(boardElement2.firstChild);
        }
    }

    static #generateBoards(firstPlayer, secondPlayer) {
        for (let i = 0; i < 2; i++) {
            let boardElement;
            const label = document.createElement('div');
            let playerBoard
            if (i === 0) {
                playerBoard = firstPlayer.gameboard.board
                boardElement = document.querySelector('.first-player');
                label.textContent = 'Your Boats'
                label.classList.add('player-label')
            } else {
                playerBoard = secondPlayer.gameboard.board
                boardElement = document.querySelector('.second-player');
                label.textContent = 'Attack your opponent!'
                label.classList.add('player-label')
                console.log('dom', this.currentTurn);
                if (this.currentTurn === 1) label.classList.add('attack-label')
            }
            boardElement.appendChild(label);
            playerBoard.forEach((row, x) => {
                row.forEach((cell, y) => {
                    let square = document.createElement('div');
                    square.classList.add('square')
                    if (i === 0 && cell > 0) this.#addColor(cell, square);
                    if (cell < 0) this.#addColor(cell, square);
                    if (i === 1 && cell >= 0 && this.currentTurn === 1) {
                        this.#addEvent(x, y, square, firstPlayer, secondPlayer);
                        square.classList.add('highlight')

                    }
                    boardElement.appendChild(square);
                })
            })
        }
    }

    static #addColor(cell, element) {
        element.classList.add(`color-${cell}`)
    }

    static #addEvent(x, y, element, firstPlayer, secondPlayer) {
        element.addEventListener('click', () => {
            secondPlayer.gameboard.receiveAttack(x, y, secondPlayer, this.#updateTurn.bind(this));
            this.handleUI(firstPlayer, secondPlayer);
            if (this.currentTurn === -1) {
                Ai.play(firstPlayer, secondPlayer, this.#getCurrentTurn.bind(this), this.#updateTurn.bind(this), this.handleUI.bind(this));
            }
        });
    }

    static #initializeTurn() {
        return Math.random() < 0.5 ? 1 : -1;
    };

    static #updateTurn() {
        this.currentTurn = -this.currentTurn
    }

    static #getCurrentTurn() {
        return this.currentTurn;
    };

}