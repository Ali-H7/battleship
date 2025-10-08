import Gameboard from "./gameboard";

const gameboard = new Gameboard();

test('create an object 10x10 board', () => {
    expect(gameboard.board).toHaveLength(10);
    for (i = 0; i < 10; i++) {
        expect(gameboard.board[i]).toHaveLength(10);
    }
});
