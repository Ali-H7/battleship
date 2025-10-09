export default class Dom {

    constructor(firstPlayer, secondPlayer) {
        this.firstPlayer = firstPlayer
        this.secondPlayer = secondPlayer
        this.currentTurn = this.#initializeTurn();
        this.#handleUI(this.firstPlayer, this.secondPlayer);
    }

    #handleUI(firstPlayer, secondPlayer) {
        this.#clearUI()
        this.#generateBoards(firstPlayer, secondPlayer)
    }

    #clearUI() {
        const boardElement1 = document.querySelector('.first-player');
        const boardElement2 = document.querySelector('.second-player');

        while (boardElement1.firstChild && boardElement2.firstChild) {
            boardElement1.removeChild(boardElement1.firstChild);
            boardElement2.removeChild(boardElement2.firstChild);
        }
    }

    #generateBoards(firstPlayer, secondPlayer) {
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
                if (this.currentTurn === -1) label.classList.add('attack-label')
            }
            boardElement.appendChild(label);
            playerBoard.forEach((row, x) => {
                row.forEach((cell, y) => {
                    let square = document.createElement('div');
                    square.classList.add('square')
                    if (i === 0 && cell > 0) this.#addColor(cell, square);
                    if (cell < 0) this.#addColor(cell, square);
                    if (i === 1 && cell >= 0 && this.currentTurn === -1) {
                        this.#addEvent(secondPlayer, x, y, square);
                        square.classList.add('highlight')

                    }
                    boardElement.appendChild(square);
                })
            })
        }
    }

    #addColor(cell, element) {
        element.classList.add(`color-${cell}`)
    }

    #addEvent(attackedPlayer, x, y, element) {
        element.addEventListener('click', () => {
            attackedPlayer.gameboard.receiveAttack(x, y, attackedPlayer, this.#updateTurn.bind(this));
            this.#handleUI(this.firstPlayer, this.secondPlayer);
        });
    }

    #initializeTurn() {
        return Math.random() < 0.5 ? 1 : -1;
    };

    #updateTurn() {
        this.currentTurn = -this.currentTurn
    }
}