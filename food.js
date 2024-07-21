import { snakeBody , Snake_speed} from "./snake.js";

let food = { x: 9, y: 9 };
const Snake_body_add = 1;


export function updateFood() {
    if (snakeBody[0].x === food.x && snakeBody[0].y === food.y) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
        food = randomFoodPosition();
        snakeBody.length += Snake_body_add;
        
    }
}

export function drawFood(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
  }

function randomFoodPosition() {
    return {
        x: Math.floor(Math.random() * 20) + 1,
        y: Math.floor(Math.random() * 20) + 1
    }
}