/* My Class-based implementation of an infinite precision Integer. */

class InfiniteNumber {
  /** An internal member Array to contain the digits of the Infinite Integer.
   * @private
   * @type {Array<Number>}
   */
  _internalArray = [];

  constructor(inputObject) {
    if (typeof inputObject === "number") {
      console.log("You sent a number");

      // TODO validate the number and only then initialize the _internalArray
      if (!Number.isInteger(inputObject)) {
        throw new Error("Please provide only integer values");
      }

      if (inputObject < 0)
        throw new Error("Please provide only positive number");

      // initialize the member array
      var numberStr = inputObject.toString();
      this._internalArray = Array.from(numberStr, Number);
      console.log(this._internalArray);
    } else if (typeof inputObject === "string") {
      console.log("You sent a String");

      // TODO validate the String and only then initialize the _internalArray
      if (!/^\d+$/.test(inputObject)) {
        throw new Error("Please provide a valid number string");
      }

      // initialize the member array
      this._internalArray = Array.from(inputObject, Number);
      console.log(this._internalArray);
    } else if (Array.isArray(inputObject)) {
      console.log("You sent an array");
      // Check if all elements in the array are positive integers
      const isValidArray = inputObject.every(function (element) {
        return (
          typeof element === "number" &&
          Number.isInteger(element) &&
          element > 0
        );
      });

      if (isValidArray) {
        // Initialize the member array
        this._internalArray = inputObject;
      } else {
        throw new Error(
          "Invalid array. Please provide an array of positive integers."
        );
      }
      console.log(this._internalArray);
    } else if (typeof inputObject === "object") {
      // IS THIS HOW ITS DONE?
      console.log("You sent an Object");

      // TODO check if this object has getInternalArray() and make a deep copy
      // and assign it to local _internalArray

      // initialize the member array
      this._internalArray = Object.values(inputObject);
      console.log(this._internalArray);
    } else {
      // BHAI KYA KAR RAHA HAI?
      console.log("You sent some bullshit!");

      throw new Error(
        `Constuctor of IniniteNumber does not support this data` +
          `type ${typeof inputObject}`
      );
    }
  }


  /** Helper method to return the representation of this Infinite Precision
   *
   */
  getNumberAsString(res) {
    // TODO, concatenate the contents of _internalArray to a string and return
    return parseInt(res.join(""), 10);
  }

  add(toadd) {
    let res = toadd._internalArray;
    /**
     * @maxi - length of the longest array
     * @mini - length of the smallest array
     */
    let maxi = Math.max(ob1._internalArray.length, res.length) - 1;
    let mini = Math.min(ob1._internalArray.length, res.length) - 1;

    let maxarr, minarr;

    // To assign minimum and maximim  array based on length
    if (ob1._internalArray.length > res.length) {
      maxarr = ob1._internalArray;
      minarr = res;
    } else {
      maxarr = res;
      minarr = ob1._internalArray;
    }

    /**
     * @argument  {Array} res - It will store  the resultant array
     */
    let finres = [];

    /**
     * @argument {carry} carry - It  will keep track of carry from previous operation
     */
    let carry = 0;

    // run for loop refering longest array
    for (let i = maxi; i >= 0; i--) {
      let result = maxarr[i] + (mini >= 0 ? minarr[mini] : 0) + carry;

      // resultant array stores the the mod of result, for ex 12%10 then res[i] = 2
      finres[i] = result % 10;
      // carry stores the number if addition is more than 10 , for ex 12/10 then carry = 1
      carry = Math.floor(result / 10);

      mini--;
    }

    // Add the carry to the beginning of the result array
    if (carry > 0) {
      finres.unshift(carry);
    }
    return this.getNumberAsString(finres);
  }

  sub(tosub)
  {

    let res = tosub._internalArray;

    let maxi = Math.max(ob1._internalArray.length, res.length) - 1;
    let mini = Math.min(ob1._internalArray.length, res.length) - 1;

    let maxarr, minarr;

    // To assign minimum and maximim  array based on length
    if (ob1._internalArray.length > res.length) {
      maxarr = ob1._internalArray;
      minarr = res;
    } else {
      maxarr = res;
      minarr = ob1._internalArray;
    }

    // carry is used to keep the track of borrow
    let carry = 0;
    /**
     * @param {Array} res - resultant array after subtraction
     */
    let finres = [];

    for (let i = maxi; i >= 0; i--) {
      let result = maxarr[i] - (mini >= 0 ? minarr[mini] : 0) + carry;

      if (result < 0) {
        finres[i] = 10 + result;
      } else {
        finres[i] = result % 10;
      }
      carry = Math.floor(result / 10);

      mini--;
    }
    
    // if number to be subtracted is smaller than number  being subtracted from
    // then add negative sign in front
    let lenarr1 = parseInt(ob1._internalArray.join(""), 10);
    let lenarr2 = parseInt(res.join(""), 10);
    if (lenarr1 < lenarr2) {
      if (finres[0] == 0) {
        finres.shift();
      }
      finres.unshift("-");
    }

    // if there is extra 0 in front remove it
    else if (finres[0] == 0) {
      finres.shift();
    }

    if(ob1._internalArray.length==res.length && lenarr1>lenarr2)
    {
      finres = lenarr1-lenarr2
      return finres.toString()
    }

    return finres.join("");
  }

  mul(tomul)
  {
    let flag = 0;
    let res = tomul._internalArray;
  // if both numbers are negative then convert them to postive by changing sign
  if (ob1._internalArray[0] < 0 && res[0] < 0) {
    ob1._internalArray[0] = -ob1._internalArray[0];
    res[0] = -res[0];
  }

  // changing sign for neagtive number
  else if (ob1._internalArray[0] < 0) {
    flag = 1;
    ob1._internalArray[0] = -ob1._internalArray[0];
  }

  // changing sign for neagtive number
  else if (res[0] < 0) {
    flag = 1;
    res[0] = -res[0];
  }

  // finding the length of array
  const len1 = ob1._internalArray.length - 1;
  const len2 = res.length - 1;

  // Initialize an array to store the result, resultant array will be adition of length of two array
  const result = new Array(2 + len1 + len2).fill(0);

  // Nested loop for multiplication
  for (let i = len1; i >= 0; i--) {
    for (let j = len2; j >= 0; j--) {
      const product = ob1._internalArray[i] * res[j];
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

  return this.getNumberAsString(result)
  }
}

const ob1 = new InfiniteNumber([1,2,3,4]);
const ob2 = new InfiniteNumber(5678);

console.log("Addition is " + ob1.add(ob2));
console.log("Subtraction is " + ob1.sub(ob2));
console.log("Subtraction is " + ob1.mul(ob2));