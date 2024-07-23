import { Snake_speed, updateSnake, drawSnake, snakeBody, gameState , elapsTime, setSnakeSpeed } from './snake.js';
import { drawFood, updateFood , resetScore , resetFood } from './food.js';
import {resetInputDirection} from './input.js';

let lastTime = 0;
const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const scoreElement = document.getElementById('score');


resetButton.addEventListener('click', resetGame);

function main(currentTime) {
    if (gameState.gameover) {
      document.getElementById('game-over').textContent = 'Game Over';
      resetButton.style.display = 'block';
      return;
    }
  
    const deltaTime = currentTime - lastTime; 
    window.requestAnimationFrame(main);
  
    if (deltaTime < 1000 / Snake_speed) return;
  
    lastTime = currentTime;
  
    update(deltaTime);
    draw();
  }

window.requestAnimationFrame(main);

function update(deltaTime) {
    updateSnake(deltaTime);
    updateFood();
  }
  

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}


function resetGame() {
    snakeBody.length = 0;
    snakeBody.push({ x: 11, y: 11 });
    gameState.gameover = false;
    resetScore(); 
    resetInputDirection();
    resetFood();
    scoreElement.textContent = 'Score: 0';
    document.getElementById('game-over').textContent = '';
    resetButton.style.display = 'none';
    setSnakeSpeed(6);
    window.requestAnimationFrame(main);
  }
