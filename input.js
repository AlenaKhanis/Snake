let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

let lastTouchX = 0;
let lastTouchY = 0;

export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
  }

export function resetInputDirection() {
    inputDirection = { x: 0, y: 0 };
}

window.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowUp':
        if (lastInputDirection.y !== 0) break;
        inputDirection = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
        if (lastInputDirection.y !== 0) break;
        inputDirection = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
        if (lastInputDirection.x !== 0) break;
        inputDirection = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
        if (lastInputDirection.x !== 0) break;
        inputDirection = { x: 1, y: 0 };
        break;
    }
  });

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

//captures the x and y coordinates of the initial touch and stores them in lastTouchX and lastTouchY.
function handleTouchStart(event) {
    
    const firstTouch = event.touches[0];                                
    lastTouchX = firstTouch.clientX;                                      
    lastTouchY = firstTouch.clientY;                                      
} 

//calculates the movement direction by comparing the current touch position to the initial touch position and then updates the direction of the snake accordingly.
function handleTouchMove(event) {

    if (!lastTouchX || !lastTouchY) {
        return;
    }

    const touch = event.touches[0];
    const deltaX = touch.clientX - lastTouchX;
    const deltaY = touch.clientY - lastTouchY;


    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            setDirection({ x: 1, y: 0 }); 
        } else {
            setDirection({ x: -1, y: 0 }); 
        }
    } else {
        if (deltaY > 0) {
            setDirection({ x: 0, y: 1 }); 
        } else {
            setDirection({ x: 0, y: -1 }); 
        }
    }

    lastTouchX = 0;
    lastTouchY = 0;
}

function setDirection(newDirection) {
    if (inputDirection.x === -newDirection.x && inputDirection.y === -newDirection.y) return;
    inputDirection = newDirection;
}
