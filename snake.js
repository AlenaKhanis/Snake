import { getInputDirection } from "./input.js";


export const Snake_speed = 7;
export const snakeBody = [{x : 11 , y: 11}];

let gameover = false;

export function updateSnake() {
  if (gameover) return;  
  const inputdoraction = getInputDirection();  

  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

    snakeBody[0].x += inputdoraction.x;
    snakeBody[0].y += inputdoraction.y;

    const headPosition = snakeBody[0];
    //console.log(`Head is at grid position: ( X: ${headPosition.x}, Y:  ${headPosition.y})`);

    if (headPosition.x < 1 || headPosition.x > 20 || headPosition.y < 1 || headPosition.y > 20) {
        console.log('Game Over');
        gameover = true;
        return;
    }
}  


export function drawSnake(gameBoard) {
  snakeBody.forEach(bodyPart  => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = bodyPart .y;
    snakeElement.style.gridColumnStart = bodyPart .x;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });
}


