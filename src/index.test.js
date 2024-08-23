import { Ship } from './ship';

const isSunkMock = jest.fn().mockReturnValue(false);

test('create a ship object with the correct input', () => {
  const ship = new Ship(5);
  expect(ship.length).toBe(5);
  expect(ship.health).toBe(5);
  expect(ship.isSunk).toBe(isSunkMock());
});
