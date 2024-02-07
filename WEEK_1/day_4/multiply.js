/**
 * Program to multiply two numbers which will be provided by user in the form of an array
 */

/**Multiply two numbers represented as arrays
 * @param {Array} arr1 - First Number Array
 * @param {Array} arr2 - Second Number Array
 * @returns {Array} result - The product of the two numbers as an array.
 */
function multiply(arr1, arr2) {
  // flag to check negative numbers
  let flag = 0;

  // if both numbers are negative then convert them to postive by changing sign
  if (arr1[0] < 0 && arr2[0] < 0) {
    arr1[0] = -arr1[0];
    arr2[0] = -arr2[0];
  }

  // changing sign for neagtive number
  else if (arr1[0] < 0) {
    flag = 1;
    arr1[0] = -arr1[0];
  }

  // changing sign for neagtive number
  else if (arr2[0] < 0) {
    flag = 1;
    arr2[0] = -arr2[0];
  }

  // finding the length of array
  const len1 = arr1.length - 1;
  const len2 = arr2.length - 1;

  // Initialize an array to store the result, resultant array will be adition of length of two array
  const result = new Array(2 + len1 + len2).fill(0);

  // Nested loop for multiplication
  for (let i = len1; i >= 0; i--) {
    for (let j = len2; j >= 0; j--) {
      const product = arr1[i] * arr2[j];
      const sum = result[i + j + 1] + product;

      result[i + j + 1] = sum % 10; // Update the current digit
      result[i + j] += Math.floor(sum / 10); // Add carry to the previous digit
    }
  }

  // Remove leading zeros
  while (result[0] === 0 && result.length > 1) {
    result.shift();
  }

  // adding negative sign if multiplication is negative
  if (flag == 1) {
    result.unshift("-");
  }

  return result.join("");
}

// INPUTS
let num1 = [1,2];
let num2 = [1,2];

console.log(
  "Multiplication of ",
  num1.join(""),
  "*",
  num2.join(""),
  "=",
  multiply(num1, num2)
);

