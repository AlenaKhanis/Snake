import { snakeBody } from "./snake.js";

let food = { x: 9, y: 9 };
let scoreElement = document.getElementById('score');
let bestScoreElement = document.getElementById('best-score');

export let score = 0;
let bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
let eatSound = document.getElementById('eat-sound');
bestScoreElement.textContent = `Best Score: ${bestScore}`;

export function updateFood() {
    if (snakeBody[0].x === food.x && snakeBody[0].y === food.y) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });

        score += 10;
        scoreElement.textContent = `Score: ${score}`;
        updateBestScore();

        food = randomFoodPosition();

        eatSound.play();
    }
}

export function resetScore() {
    score = 0;
    scoreElement.textContent = 'Score: 0';
}

export function resetFood() {
    food = randomFoodPosition();
}

function updateBestScore() {
    if (score > bestScore) {
        bestScore = score;
        bestScoreElement.textContent = `Best Score: ${bestScore}`;
        localStorage.setItem('bestScore', bestScore);
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
    let newFoodPosition;
    do {
        newFoodPosition = {
            x: Math.floor(Math.random() * 20) + 1,
            y: Math.floor(Math.random() * 24) + 1
        };
    } while (snakeBody.some(snakePart => 
        snakePart.x === newFoodPosition.x && snakePart.y === newFoodPosition.y
    ));
    return newFoodPosition;
}
