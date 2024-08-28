import { render } from './ui-controller';

export async function AIplay(computer, player) {
  while (true) {
    const [lastX, lastY] = computer.lastMove;
    const [x, y] = generateComputerMoves(lastX, lastY);
    if (checkMove(x, y, computer)) continue;
    const attack = player.board.receiveAttack(x, y);
    computer.updatePlayedMoves(x, y);
    await sleep(1000);
    render(player, computer);
    if (attack === 0) {
      computer.lastMove = [];
      break;
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// checks if the computer played this move previously
function checkMove(x, y, computer) {
  return computer.playedMoves.some(
    (coords) => coords[0] === x && coords[1] === y
  );
}

function generateComputerMoves(lastX, lastY) {
  if (lastX && lastY) {
    const offsets = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];

    while (true) {
      const randomNum = Math.floor(Math.random() * 3);
      const x = lastX + offsets[randomNum][0];
      const y = lastY + offsets[randomNum][1];
      if (x < 0 || y < 0 || x > 9 || y > 9) continue;
      return [x, y];
    }
  }

  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  return [x, y];
}
