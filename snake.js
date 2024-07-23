import { getInputDirection } from "./input.js";

export let Snake_speed = 6;
export const snakeBody = [{ x: 11, y: 11 }];

export let elapsTime = 0;
let speedIncreaseInterval = 6000;
let speedIncrease = 0.2;


export const gameState = {
  gameover: false
};

export function setSnakeSpeed(speed) {
  Snake_speed = speed;
}

export function updateSnake(deltaTime) {
  if (gameState.gameover) return;

  const inputDirection = getInputDirection();
  
  const newHeadPosition = {
    x: snakeBody[0].x + inputDirection.x,
    y: snakeBody[0].y + inputDirection.y
  };


  if (checkCollision(newHeadPosition)) {
    gameState.gameover = true;
    return;
  }

  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0] = newHeadPosition;

  elapsTime += deltaTime;

  if (elapsTime > speedIncreaseInterval) {
    Snake_speed += speedIncrease;
    elapsTime = 0;
  }
}

function checkCollision(position) {
  const hitLeftWall = position.x < 1;
  const hitRightWall = position.x > 24;
  const hitTopWall = position.y < 1;
  const hitBottomWall = position.y > 20;
  const selfCollision = hasSelfCollision(position);

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall || selfCollision;
}


export function drawSnake(gameBoard) {

  snakeBody.forEach(bodyPart => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = bodyPart.y;
    snakeElement.style.gridColumnStart = bodyPart.x;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });
}


export function hasSelfCollision(position) {
  return snakeBody.some((bodyPart, index) => {
    if (index === 0) return false; 
    return bodyPart.x === position.x && bodyPart.y === position.y;
  });
}



