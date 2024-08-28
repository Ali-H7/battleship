import { render } from './ui-controller';

export function AIplay(computer, player) {
  while (true) {
    const [lastX, lastY] = computer.lastMove;
    const [x, y] = generateComputerMoves(lastX, lastY);
    if (checkMove(x, y, computer)) continue;
    const attack = player.board.receiveAttack(x, y);
    computer.updatePlayedMoves(x, y);
    render(player, computer);
    if (attack === 0) break;
  }
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

    for (let i = 0; i < offsets.length; i++) {
      const x = lastX + offsets[i][0];
      const y = lastY + offsets[i][1];
      if (x < 0 || y < 0 || x > 9 || y > 9) continue;
      return [x, y];
    }
  }

  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  return [x, y];
}
