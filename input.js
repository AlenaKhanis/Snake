
let inputDirection = { x: 0, y: 0 };
let lastTouchX = 0;
let lastTouchY = 0;

export function getInputDirection() {
    return inputDirection;
}

export function setInputDirection(direction) {
    inputDirection = direction;
}

window.addEventListener('keydown', e => {  
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
            if (inputDirection.y === 1) return;
            inputDirection = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
        case 's':
            if (inputDirection.y === -1) return;
            inputDirection = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
        case 'a':
            if (inputDirection.x === 1) return;
            inputDirection = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
        case 'd':
            if (inputDirection.x === -1) return;
            inputDirection = { x: 1, y: 0 };
            break;
    }
});

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];                                      
    lastTouchX = firstTouch.clientX;                                      
    lastTouchY = firstTouch.clientY;                                      
} 

function handleTouchMove(evt) {
    if (!lastTouchX || !lastTouchY) {
        return;
    }

    const touch = evt.touches[0];
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
