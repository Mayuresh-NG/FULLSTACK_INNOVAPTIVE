/**
 * This is a program to subtract two arrays such that they imitates arithmetic style subtraction of numbers
 */

/**function to perform bsic validations on input provided by user
 * @function validation - It is a function to handle invalid user inputs
 * @param {Array} arr1 - Consider it to be first number provided by user
 * @param {Array} arr2 - Consider it to be second number provided by user
 */
function validation(arr1, arr2) {
  function isSingleDigit(num) {
    return num >= 0 && num <= 9;
  }

  if (arr1.length === 0 || arr2.length === 0) {
    throw new Error("Null arrays are not accepted");
  }

  if (arr1[0] < 0 || arr2[0] < 0) {
    throw new Error("Negative values in the array are not allowed.");
  }

  if (!isSingleDigit(arr1[0]) || !isSingleDigit(arr2[0])) {
    throw new Error("Only single digits are allowed in the first position of the arrays");
  }

  for (let i = 1; i < arr1.length; i++) {
    if (!isSingleDigit(arr1[i])) {
      throw new Error(`Element at index ${i} in the first array must be a single digit`);
    }
  }

  for (let i = 1; i < arr2.length; i++) {
    if (!isSingleDigit(arr2[i])) {
      throw new Error(`Element at index ${i} in the second array must be a single digit`);
    }
  }

  return true;
}


/**Main function to subtract two numbers
 * @function sub - subtracts the two array
 * @param {Array} arr1 - First array
 * @param {Array} arr2 - Second array
 */
function sub(arr1, arr2) {
  if (validation(arr1, arr2) == true) {
    /**
     * @maxi  - The maximum length between the two input arrays.
     * @mini - The minimum length between the two input arrays.
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

    // carry is used to keep the track of borrow
    let carry = 0;
    /**
     * @param {Array} res - resultant array after subtraction
     */
    let res = [];

    for (let i = maxi; i >= 0; i--) {
      let result = maxarr[i] - (mini >= 0 ? minarr[mini] : 0) + carry;

      if (result < 0) {
        res[i] = 10 + result;
      } else {
        res[i] = result % 10;
      }
      carry = Math.floor(result / 10);

      mini--;
    }
    
    // if number to be subtracted is smaller than number  being subtracted from
    // then add negative sign in front
    let lenarr1 = parseInt(arr1.join(""), 10);
    let lenarr2 = parseInt(arr2.join(""), 10);
    if (lenarr1 < lenarr2) {
      if (res[0] == 0) {
        res.shift();
      }
      res.unshift("-");
    }

    // if there is extra 0 in front remove it
    else if (res[0] == 0) {
      res.shift();
    }

    if(arr1.length==arr2.length && lenarr1>lenarr2)
    {
      res = lenarr1-lenarr2
      return res.toString()
    }

    return res.join("");
  }
}

// INPUTS
const num1 = [1,2,3]; //first number
const num2 = [4,5,0]; //second number

console.log(
  "Subtraction of",
  num1.join(""),
  "-",
  num2.join(""),
  "=",
  sub(num1, num2)
);

