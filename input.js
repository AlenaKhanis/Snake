let inputdoraction = { x: 0, y: 0 };

export function getInputDirection() {
    return inputdoraction;
}


window.addEventListener('keydown', e => {  
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
            if (inputdoraction.y === 1) return;
            inputdoraction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
        case 's':
            if (inputdoraction.y === -1) return;
            inputdoraction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
        case 'a':
            if (inputdoraction.x === 1) return;
            inputdoraction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
        case 'd':
            if (inputdoraction.x === -1) return;
            inputdoraction = { x: 1, y: 0 };
            break;
    }
});