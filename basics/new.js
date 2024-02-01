function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createGrid(rows, cols) {
  const delay = 200;
  var r1 = getRandomNumber(1, numRows);
  var r2 = getRandomNumber(1, numCols);

  function generateGrid() {
    const option = [0, -1, 1];
    let grid = "";
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= cols; col++) {
        if ((row === 1 && col === 1) || (row === rows && col === 1)) {
          grid += "+";
        } else if (
          (row === rows && col === cols) ||
          (row === 1 && col === cols)
        ) {
          grid += "+\n";
        } else if (row === 1 || row === rows) {
          grid += "_";
        } else if (col === 1) {
          grid += "|";
        } else if (col === cols) {
          grid += "|\n";
        } else if (row === r1 && col === r2) {
          grid += "*";
        } else {
          grid += " ";
        }
      }
    }

    console.log(grid);
    let rI1 = Math.floor(Math.random() * option.length);
    let rI2 = Math.floor(Math.random() * option.length);
    let n1 = option[rI1];
    let n2 = option[rI2];

    r1 = r1 + n1;
    r2 = r2 + n2;

    if(r2===numCols-1)
    {

    }

    // if (r1 === 1 && r2 === 1) {
    //   r1 = r1 + Math.floor(Math.random() * 2);
    //   r2 = r2 + Math.floor(Math.random() * 2);
    // } else if (r1 === 1 && r2 === numCols) {
    //   r1 = r1 + Math.floor(Math.random() * 2);
    //   r2 = r2 + Math.floor(Math.random() * 3) - 1;
    // } else if (r1 === numRows && r2 === 1) {
    //   r1 = r1 + Math.floor(Math.random() * 3) - 1;
    //   r2 = r2 + Math.floor(Math.random() * 3) - 1;
    // } else if (r1 === numRows && r2 === numCols) {
    //   r1 = r1 - Math.floor(Math.random() * 2);
    //   r2 = r2 - Math.floor(Math.random() * 2);
    // } else if (r2 === 1 || r1 === numRows) {
    //   r1 = r1 + Math.floor(Math.random() * 3) - 1;
    //   r2 = r2 + Math.floor(Math.random() * 2);
    // } else if (r2 === numCols || r1 === 1) {
    //   r1 = r1 + Math.floor(Math.random() * 2);
    //   r2 = r2 + Math.floor(Math.random() * 3) - 1;
    // }

    setTimeout(generateGrid, delay);
  }
  generateGrid();
}

const numRows = 10;
const numCols = 10;

createGrid(numRows, numCols);
