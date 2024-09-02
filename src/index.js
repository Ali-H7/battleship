import './style.css';
import { Player } from './player';
import { render } from './ui-controller';

const player = new Player('player');
const computer = new Player('computer');
render(player, computer);
console.log(player.board);
