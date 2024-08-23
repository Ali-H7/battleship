import { Ship } from './ship';

test('create a ship object with the correct input', () => {
  const ship = new Ship(5);
  expect(ship.length).toBe(5);
  expect(ship.health).toBe(5);
  expect(ship.status).toBe('floating');
});

test('damage the the ship by 1', () => {
  const ship = new Ship(5);
  ship.hit();
  expect(ship.health).toBe(4);
});

test('Check if ship sunk or not', () => {
  const ship = new Ship(1);
  ship.hit();
  expect(ship.status).toBe('sunk');
});
