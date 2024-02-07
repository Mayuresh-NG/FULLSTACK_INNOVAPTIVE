/**
 * This is a program to add two numbers which will be of form arrays
 */

/**Main function performing addition of two numbers
 * @param {Array} arr1 - First Number Array
 * @param {Array} arr2 - Second Number Array
 * @returns  {Array} - The Sum of the Two Numbers as an Array.
 */
function add(arr1, arr2) {
  // if only one number is given by user throw error
  if (arr1.length == 0 || arr2.length == 0) {
    throw new Error("you must provide two numbers to perfrom addition");
  }
  if (arr1[0] < 0 || arr2[0] < 0) {
    throw new Error("Negative values in the array are not allowed.");
  } 
  /**
   * @maxi - length of the longest array
   * @mini - length of the smallest array
   */
  let maxi = Math.max(arr1.length, arr2.length) - 1;
  let mini = Math.min(arr1.length, arr2.length) - 1;

  let maxarr, minarr;

  // To assign minimum and maximim  array based on length
  if (arr1.length > arr2.length) {
    maxarr = arr1;
    minarr = arr2;
  } else {
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

  // run for loop refering longest array
  for (let i = maxi; i >= 0; i--) {
    let result = maxarr[i] + (mini >= 0 ? minarr[mini] : 0) + carry;

    // resultant array stores the the mod of result, for ex 12%10 then res[i] = 2
    res[i] = result % 10;
    // carry stores the number if addition is more than 10 , for ex 12/10 then carry = 1
    carry = Math.floor(result / 10);

    mini--;
  }

  // Add the carry to the beginning of the result array
  if (carry > 0) {
    res.unshift(carry);
  }

  return res.join("");
}

// INPUTS
const num1 = [1, 5];
const num2 = [4, 5, 3, 9, 4];

console.log(
  "Addition of",
  num1.join(""),
  "+",
  num2.join(""),
  "=",
  add(num1, num2)
);

