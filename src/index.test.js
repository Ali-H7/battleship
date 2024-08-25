import { Ship } from './ship';
import { Gameboard } from './gameboard';

test('create a ship object with the correct input', () => {
  const ship = new Ship(0, 5);
  expect(ship.length).toBe(5);
  expect(ship.health).toBe(5);
  expect(ship.status).toBe('floating');
});

test('damage the the ship by 1', () => {
  const ship = new Ship(0, 5);
  ship.hit();
  expect(ship.health).toBe(4);
});

test('check if ship sunk or not', () => {
  const ship = new Ship(0, 1);
  ship.hit();
  expect(ship.status).toBe('sunk');
});

test('create a gameboard object that contains a 10x10 board', () => {
  const gameBoard = new Gameboard();
  expect(gameBoard.board).toHaveLength(10);
  gameBoard.board.forEach((row) => {
    expect(row).toHaveLength(10);
  });
});

test('the gameboard object should create 10 ships', () => {
  const gameBoard = new Gameboard();
  expect(gameBoard.ships).toHaveLength(10);
});
