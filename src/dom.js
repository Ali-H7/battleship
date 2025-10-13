import Ai from "./ai";
import Player from "./player";

export default class Dom {

    static currentTurn = this.#initializeTurn();
    static #playerName = null;
    static initializeGame() {
        this.#welcomeScreenEvents();
        this.restartEvents();
    }
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
                label.textContent = `${this.#playerName}'s Boats`;
                label.classList.add('player-label')
            } else {
                playerBoard = secondPlayer.gameboard.board
                boardElement = document.querySelector('.second-player');
                label.textContent = 'Computer\'s turn'
                label.classList.add('player-label')
                if (this.currentTurn === 1) {
                    label.textContent = 'Attack your opponent!'
                    label.classList.add('attack-label')
                }
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
            if (secondPlayer.gameboard.checkIfAllShipsSunk()) this.endGame(1);
            this.handleUI(firstPlayer, secondPlayer);
            if (this.currentTurn === -1) {
                Ai.play(firstPlayer, secondPlayer, this.#getCurrentTurn.bind(this), this.#updateTurn.bind(this), this.handleUI.bind(this));
            }
            console.log(secondPlayer.gameboard.board)
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

    static welcomeScreen() {
        const welcomeScreen = document.querySelector('#welcome-screen');
        welcomeScreen.showModal();
    }

    static #welcomeScreenEvents() {
        const startBtn = document.querySelector('.start-btn');
        const welcomeScreen = document.querySelector('#welcome-screen');
        startBtn.addEventListener('click', () => {
            const playerNameInput = document.querySelector('#player-name');
            const playerName = playerNameInput.value;
            this.#updatePlayerName(playerName);
            welcomeScreen.close();
            const firstPlayer = new Player();
            const secondPlayer = new Player();
            this.handleUI(firstPlayer, secondPlayer);
            if (this.currentTurn === -1) {
                Ai.play(firstPlayer, secondPlayer, this.#getCurrentTurn.bind(this), this.#updateTurn.bind(this), this.handleUI.bind(this));
            }
        })

    }

    static #updatePlayerName(name) {
        this.#playerName = name;
    }

    static endGame(winner) {
        this.#clearUI();
        const gameOverScreen = document.querySelector('#game-over-screen');
        this.#updateWinnerText(winner);
        gameOverScreen.showModal()
    }

    static #updateWinnerText(winner = 0) {
        const winnerText = document.querySelector('.winner')
        if (winner === 1) {
            winnerText.textContent = `The Winner of The Game is The Player`
        } else {
            winnerText.textContent = `The Winner of The Game is The Computer`
        }
    }
    static #restart() {
        this.currentTurn = this.#initializeTurn()
        Ai.resetAvailableMoves();
        const firstPlayer = new Player();
        const secondPlayer = new Player();
        this.handleUI(firstPlayer, secondPlayer);
        if (this.currentTurn === -1) {
            Ai.play(firstPlayer, secondPlayer, this.#getCurrentTurn.bind(this), this.#updateTurn.bind(this), this.handleUI.bind(this));
        }
    }
    static restartEvents() {
        const restartBtn = document.querySelector('.restart-btn');
        const gameOverScreen = document.querySelector('#game-over-screen');
        restartBtn.addEventListener('click', () => {
            gameOverScreen.close();
            this.#restart();
        })
    }
}