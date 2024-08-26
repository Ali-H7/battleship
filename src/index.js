import { Gameboard } from './gameboard';

console.log('Hello World!!');
const playerBoard = new Gameboard();
playerBoard.receiveAttack(1, 2);
playerBoard.receiveAttack(0, 2);
playerBoard.receiveAttack(1, 0);
console.log(playerBoard);
