import './style.css';
import { Player } from './player';
import { render } from './ui-controller';

const player1 = new Player('player');
const player2 = new Player('computer');
render(player1, player2);
