import Ship from "./ship";

const ship = new Ship(0, 5);

test('create a ship object with the correct input', () => {
    expect(ship.length).toBe(5);
    expect(ship.health).toBe(5);
    expect(ship.status).toBeFalsy();
});

test('check ship status before and after getting sunk', () => {
    expect(ship.sunk).toBeFalsy();
    ship.hit();
    ship.isSunk()
    expect(ship.sunk).toBeFalsy();
    for (i = 0; i < 4; i++) {
        ship.hit();
        ship.isSunk()
    }
    expect(ship.sunk).toBeTruthy();
});