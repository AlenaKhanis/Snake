
// window.addEventListener('keydown', e => {  
//     switch (e.key) {
//         case 'ArrowUp':
//         case 'w':
//             if (inputdoraction.y === 1) return;
//             inputdoraction = { x: 0, y: -1 };
//             break;
//         case 'ArrowDown':
//         case 's':
//             if (inputdoraction.y === -1) return;
//             inputdoraction = { x: 0, y: 1 };
//             break;
//         case 'ArrowLeft':
//         case 'a':
//             if (inputdoraction.x === 1) return;
//             inputdoraction = { x: -1, y: 0 };
//             break;
//         case 'ArrowRight':
//         case 'd':
//             if (inputdoraction.x === -1) return;
//             inputdoraction = { x: 1, y: 0 };
//             break;
//     }
// });

let inputDirection = { x: 0, y: 0 };

export function getInputDirection() {
    return inputDirection;
}

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;

if (isTouchDevice) {
    // Enable touch controls
    document.getElementById('up').addEventListener('click', () => setDirection({ x: 0, y: -1 }));
    document.getElementById('down').addEventListener('click', () => setDirection({ x: 0, y: 1 }));
    document.getElementById('left').addEventListener('click', () => setDirection({ x: -1, y: 0 }));
    document.getElementById('right').addEventListener('click', () => setDirection({ x: 1, y: 0 }));
    
    let startX, startY;
    document.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = endX - startX;
        const diffY = endY - startY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) setDirection({ x: 1, y: 0 });
            else setDirection({ x: -1, y: 0 });
        } else {
            if (diffY > 0) setDirection({ x: 0, y: 1 });
            else setDirection({ x: 0, y: -1 });
        }
    });
} else {

    // Enable keyboard controls
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
}
