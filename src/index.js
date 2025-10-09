import "./style.css";
import Player from "./player";
import Dom from "./dom";

const firstPlayer = new Player();
const secondPlayer = new Player();
const dom = new Dom(firstPlayer, secondPlayer);

console.log(firstPlayer);