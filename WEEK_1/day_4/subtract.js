/**
 * This is a program to subtract two arrays such that they imitates arithmetic style subtraction of numbers
 */

/**
 * @function sub - subtracts the two array
 * @param {Array} arr1 - First array
 * @param {Array} arr2 - Second array
 */

function validation(arr1, arr2) {
    if(arr1.length==0 || arr2.length==0)
    {
       throw new Error("NUll arrays are not accepted");
    }
    if(arr1[0]<0 || arr2[0]<0)
    {
        throw new Error( "Negative values in the array are not allowed."); 
    }
    else return true;
}

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

    // carry is used to keep the track of number
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
    if (arr1 < arr2) {
      res.unshift("-");
    } 
    // if there is extra 0 in front remove it
    else if (res[0] == 0) {
      res.shift();
    }

    return res.join("");
  }
}

const num1 = [1,2,5]; //first number
const num2 = [9, 9, 9, 9]; //second number

console.log("Subtraction of",num1.join(""),"-",num2.join(""),"=",sub(num1, num2));
