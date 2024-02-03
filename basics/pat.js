/* This is my first implementation of the Jugnu program.
 * The requirement was to print a 30 by 50 grid with only one random place
 * being populated by a '*' character and the rest of them spaces. 
 * Then the requirement was to move this * character randomly in either of 
 * the 9 possible directions. Also note that the "Jugnu" should not go
 * outside of the bounds of 30 and 50.
 */

// declaring some consts
const WIDTH = 50
const HEIGHT = 30
const DEFAULT_CHARACTER = " "

/** This is a function to create a grid with the given dimensions
 * @param {Number} width the width of the grid to print
 * @param {Number} height the height of the grid to print
 * @return {Array<Array<String>>} the array of array of strings representing
 * the entire grid
 * @throws {Error} when the width and height are invalid
 */
function createGrid(width, height) {

	// TODO check if width and height are valid numbers
	// throw new Error(Width/Height is not a valid input)

	let returnArray = []

	for (let hIndex = 0; hIndex < height; hIndex++) {
		let newRow = []
		returnArray.push(newRow)
		for (let wIndex = 0; wIndex < width; wIndex++) {
            if ((hIndex === 0 || hIndex === height - 1) && (wIndex=== 0 || wIndex=== width - 1)) {
                newRow.push("+")
            }
            else if(hIndex === 0 || hIndex === height - 1)
            {
                newRow.push("_")
            }
            else if (wIndex === 0 || wIndex === width - 1) 
            {
                newRow.push("|")
            } 
            else if(starX===)
			else newRow.push(DEFAULT_CHARACTER)
		}
	}

	return returnArray
}

/** This is a function to print the grid in a human readable format
 * @param {[[String]]} grid the grid to print
 * @throws {Error}  - =-a=d-sf =-asd=- write all the cases where the.,anbsdkjb
 */
function printGrid(grid) {

	// check whether the grid is a valid one
	// is it an array of arrays of Strings
	// are all the widths the same
	// for each of these cases throw errors

	let stringToPrint = ""
	for (let hIndex = 0; hIndex < grid.length; hIndex++) {
		for (let wIndex = 0; wIndex < grid[0].length; wIndex++) {
			stringToPrint += grid[hIndex][wIndex]
		}
		stringToPrint += '\n'
	}

	console.log(stringToPrint)
}

// basic testing function to check sanity of my code written
function test() {

	// testing Grid creation.
	let myGrid = createGrid(WIDTH, HEIGHT)
	// console.log(myGrid)

	printGrid(myGrid)
}

test()
