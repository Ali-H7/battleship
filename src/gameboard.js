export default class Gameboard {
    constructor() {
        this.board = this.generateGameBoard(10);
    }

    generateGameBoard(size) {
        const board = [];
        for (i = 0; i < size; i++) {
            board.push(new Array(size).fill(0));
        }
        return board;
    }
}