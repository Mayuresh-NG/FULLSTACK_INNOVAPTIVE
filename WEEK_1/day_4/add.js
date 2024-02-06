/**
 * This is a program to add two numbers which will be of form arrays
 */

/**
 * 
 * @param {Array} arr1 - First Number Array
 * @param {Array} arr2 - Second Number Array
 * @returns  {Array} sum - The Sum of the Two Numbers as an Array.
 */
function add(arr1, arr2) {
    let maxi = Math.max(arr1.length, arr2.length) - 1;
    let mini = Math.min(arr1.length, arr2.length) - 1;

    let maxarr, minarr;

    // To assign minimum and maximim  array based on length
    if (arr1.length > arr2.length) 
    {
        maxarr = arr1;
        minarr = arr2;
    } 
    else {
        maxarr = arr2;
        minarr = arr1;
    }

    /**
     * @argument  {Array} res - It will store  the resultant array
     */
    let res = [];

    /**
     * @argument {carry} carry - It  will keep track of carry from previous operation
     */
    let carry = 0;

    for (let i = maxi; i >= 0; i--) {
        let result = maxarr[i] + (mini >= 0 ? minarr[mini] : 0) + carry;

        res[i] = result % 10;
        carry = Math.floor(result / 10);

        mini--;
    }

    // Add the carry to the beginning of the result array
    if (carry > 0) {
        res.unshift(carry); 
    }

    return res.join("");
}

const num1 = [0,9, 8, 3, 5, 6,0];
const num2 = [4, 5, 3, 9, 4];

console.log("Addition of",num1.join(""),"+",num2.join(""),"=",add(num1, num2));
