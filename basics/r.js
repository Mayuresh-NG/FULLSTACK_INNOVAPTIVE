const boxWidth = 50;
const boxHeight = 30;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

let starX = getRandomNumber(1, boxWidth);
let starY = getRandomNumber(1, boxHeight);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function drawBox() {
    console.clear();

    for (let row = 0; row < boxHeight; row++) {
        let line = '';

        for (let col = 0; col < boxWidth; col++) {
            if ((row === 0 || row === boxHeight - 1) && (col === 0 || col === boxWidth - 1)) {
                line += '+';
            } else if (row === 0 || row === boxHeight - 1) {
                line += '_';
            } else if (col === 0 || col === boxWidth - 1) {
                line += '|';
            } else {
                line += (row === starY && col === starX) ? '*' : ' ';
            }
        }

        console.log(line);
    }
}

async function moveStar() {
    while (true) {
        const direction = Math.random() < 0.5 ? -1 : 1;
        const axis = Math.random() < 0.5 ? 'x' : 'y';

        starX += axis === 'x' ? direction : 0;
        starY += axis === 'y' ? direction : 0;

        starX = Math.max(1, Math.min(starX, boxWidth - 2));
        starY = Math.max(1, Math.min(starY, boxHeight - 2));

        drawBox();
        await sleep(100);
    }
}

moveStar();
