import { getInputDirection, setInputDirection } from './input.js';
import { Snake_speed, updateSnake, drawSnake } from './snake.js';
import { drawFood, updateFood } from './food.js';

let lastTime = 0;
const gameBoard = document.getElementById('game-board');

function main(currentTime) {
  const lastTimeRenderedSeconds = (currentTime - lastTime) / 1000;
  window.requestAnimationFrame(main);
  if (lastTimeRenderedSeconds < 1 / Snake_speed) return;

  lastTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}
