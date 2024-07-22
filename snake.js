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

  const headPosition = snakeBody[0];
  if (headPosition.x < 1 || headPosition.x > 20 || headPosition.y < 1 || headPosition.y > 20) {
      gameState.gameover = true;
      return;
  }

  if (hasSelfCollision()) {
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

export function hasSelfCollision() {
  const head = snakeBody[0];
  return snakeBody.some((bodyPart, index) => {
    if (index === 0) return false;
    return bodyPart.x === head.x && bodyPart.y === head.y;
  });
}
