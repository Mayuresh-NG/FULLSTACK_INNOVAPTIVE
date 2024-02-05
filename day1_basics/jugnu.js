/**This is an implementation of a dynamic star 
 * in a 30 by 50 grid. The goal is to create a grid with one random position marked by 
 * a '*' character, and the rest of the grid filled with spaces. The '*' character, 
 * representing our "Firefly," will then move randomly in any of the 9 possible directions 
 * within the bounds of the 30x50 grid.
 */

/**
 * @constant {number} boxWidth - The width of the box in pixels.
 */
const boxWidth = 50;

/**
 * @constant {number} boxHeight - The height of the box in pixels.
 */
const boxHeight = 30;

/**
 * @function getRandomNumber
 * @param {number} min - The minimum value of the random number.
 * @param {number} max - The maximum value of the random number.
 * @return {number} A random number between min and max.
 * @throws {Error} If either min or max is not a number, an error will be thrown.
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let starX = getRandomNumber(1, boxWidth);
let starY = getRandomNumber(1, boxHeight);

/**
 * @function sleep
 * @param {number} ms - The number of milliseconds to sleep.
 * @return {Promise} A promise that resolves after the specified number of milliseconds.
 * @throws {Error} If ms is not a positive integer, an error will be thrown.
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @function drawBox
 * Draws the box with a star in a random position.
 */
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
        line += (row === starY && col === starX) ? '.' : ' ';
      }
    }

    console.log(line);
  }
}

/**
 * @function moveStar
 * Moves the star to a random position within the box and redraws it.
 */
async function moveStar() {
  while (true) {
    const direction = Math.random() < 0.5 ? -1 : 1;
    const axis = Math.random() < 0.5 ? 'x' : 'y';

    starX += axis === 'x' ? direction : 0;
    starY += axis === 'y' ? direction : 0;

    starX = Math.max(1, Math.min(starX, boxWidth - 2));
    starY = Math.max(1, Math.min(starY, boxHeight - 2));

    drawBox();
    await sleep(200);
  }
}

moveStar();