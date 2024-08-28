import { AIplay } from './AI';

export function render(player, computer) {
  generateGrid(player);
  generateGrid(computer, player);
}

function generateGrid(player1, player2) {
  const playerBoard = player1.board.board;
  const playerContainer = document.querySelector(`.${player1.type}-board`);
  playerContainer.textContent = '';
  playerBoard.forEach((arr, i) => {
    arr.forEach((cell, j) => {
      const grid = document.createElement('div');
      grid.setAttribute('data-x', i);
      grid.setAttribute('data-y', j);
      grid.setAttribute('data-info', cell);
      addStyling(grid, player1.type);
      if (player1.type === 'computer')
        addEventListeners(grid, player1, player2);
      playerContainer.appendChild(grid);
    });
  });
}

function addStyling(grid, player) {
  const gridInfo = Number(grid.getAttribute('data-info'));
  grid.style.border = '0.1px solid grey';
  grid.style.minWidth = '55px';
  grid.style.minHeight = '55px';

  if (gridInfo >= 1 && player !== 'computer') {
    grid.style.backgroundColor = 'lightblue';
  }

  if (player === 'computer') {
    grid.style.cursor = 'pointer';
  }

  if (gridInfo === -1) grid.style.backgroundColor = 'orange';
  if (gridInfo === -2) grid.style.backgroundColor = 'red';
}

function addEventListeners(grid, computer, player) {
  const gridInfo = Number(grid.getAttribute('data-info'));
  if (gridInfo >= 0) {
    grid.addEventListener('click', () => {
      const x = Number(grid.getAttribute('data-x'));
      const y = Number(grid.getAttribute('data-y'));
      const attack = computer.board.receiveAttack(x, y);
      render(player, computer);
      const checkStatus = computer.board.checkShipsStatus();
      if (checkStatus) console.log('Game Over');
      if (attack === 0) AIplay(computer, player);
    });
  }
}
