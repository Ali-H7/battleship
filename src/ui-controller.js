import { AIplay } from './AI';

export function render(player, computer) {
  generateGrid(player, computer);
  generateGrid(computer, player);
}

function generateGrid(player1, player2) {
  const playerContainer = getContainer(player1);
  const playerBoard = player1.board.board;

  playerBoard.forEach((arr, x) => {
    arr.forEach((cell, y) => {
      const element = document.createElement('div');
      setAttributes(x, y, cell, element);
      addStyling(element, player1);

      if (player1.type === 'computer' && player2.turn) {
        addEventListeners(element, player1, player2);
      }

      playerContainer.appendChild(element);
    });
  });
}

function setAttributes(x, y, cell, element) {
  element.setAttribute('data-x', x);
  element.setAttribute('data-y', y);
  element.setAttribute('data-info', cell);
}

function getContainer(player) {
  const playerContainer = document.querySelector(`.${player.type}-board`);
  playerContainer.textContent = '';
  return playerContainer;
}

function addStyling(cell, player) {
  const gridInfo = Number(cell.getAttribute('data-info'));
  cell.style.border = '0.1px solid grey';
  cell.style.minWidth = '40px';
  cell.style.minHeight = '40px';

  if (gridInfo >= 1 && player.type !== 'computer') {
    cell.style.backgroundColor = 'lightblue';
  }

  if (gridInfo >= 0 && player.type === 'computer') {
    cell.style.cursor = 'pointer';
  }

  if (gridInfo === -1) cell.style.backgroundColor = 'orange';
  if (gridInfo === -2) cell.style.backgroundColor = 'red';
}

function addEventListeners(cell, computer, player) {
  const cellInfo = Number(cell.getAttribute('data-info'));
  if (cellInfo >= 0) {
    cell.addEventListener('click', () => {
      const x = Number(cell.getAttribute('data-x'));
      const y = Number(cell.getAttribute('data-y'));
      const attack = computer.board.receiveAttack(x, y);
      const checkStatus = computer.board.checkShipsStatus();
      if (checkStatus) console.log('Game Over');
      if (attack === 0) {
        player.setTurn();
        computer.setTurn();
        AIplay(computer, player);
      }
      render(player, computer);
    });
  }
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
