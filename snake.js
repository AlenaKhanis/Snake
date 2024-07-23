import { getInputDirection } from "./input.js";

export const Snake_speed = 7;
export const snakeBody = [{ x: 11, y: 11 }];


export const gameState = {
  gameover: false
};

export function updateSnake() {
  if (gameState.gameover) return;


  const inputDirection = getInputDirection();

  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;

  if (checkCollision()) {
    gameState.gameover = true;
  }

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

function checkCollision() {
  const headPosition = snakeBody[0];
  const hitLeftWall = headPosition.x <= 1;
  const hitRightWall = headPosition.x > 24;
  const hitTopWall = headPosition.y <= 1;
  const hitBottomWall = headPosition.y > 20;
  const selfCollision = hasSelfCollision();

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall || selfCollision;
}

export function hasSelfCollision() {
  const head = snakeBody[0];
  return snakeBody.some((bodyPart, index) => {
    if (index === 0) return false;
    return bodyPart.x === head.x && bodyPart.y === head.y;
  });
}


