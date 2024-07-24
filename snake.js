import { getInputDirection } from "./input.js";
import { score } from "./food.js";

export let Snake_speed = 6;
export const snakeBody = [{ x: 11, y: 11 }];

let lastScoreForSpeedIncrease = 0; 
const pointsToIncreaseSpeed = 50;
let speedIncrease = 0.2;



export const gameState = {
  gameover: false
};

export function setSnakeSpeed(speed) {
  Snake_speed = speed;
}

export function updateSnake() {
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

  

  if (score >= lastScoreForSpeedIncrease + pointsToIncreaseSpeed) {
    Snake_speed += speedIncrease;
    lastScoreForSpeedIncrease = Math.floor(score / pointsToIncreaseSpeed) * pointsToIncreaseSpeed;
  }
}

function checkCollision(position) {
  const hitLeftWall = position.x < 1;
  const hitRightWall = position.x > 25;
  const hitTopWall = position.y < 1;
  const hitBottomWall = position.y > 21;
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



