// function to add 1 to binary string considering carry case
function addOneToBinary(binaryString, length) {
  let result = "";
  let carry = 1;

  for (let i = binaryString.length - 1; i >= 0; i--) {
    const bit = binaryString[i];
    const sum = parseInt(bit) + carry;
    result = (sum % 2).toString() + result;
    carry = sum > 1 ? 1 : 0;
  }

  if (carry) {
    result = carry.toString() + result;
  }

  let arr = [];
  let toreturn = length - result.length;

  for (let i = 0; i < length; i++) {
    while (toreturn != 0) {
      arr.push(result[0]);
      toreturn--;
    }
  }

  if (toreturn === 0) {
    for (let i = 0; i < result.length; i++) {
      const digit = parseInt(result[i], 10);
      arr.push(digit);
    }
  }
  return arr;
}

/**getSimple2sComplement - function to convert decimal to binary , if decimal is negative 
 * it will be converted to 2s complement form
 * @param {Number} num - Its a decimal number to be taken from user
 * @param {Number} length - Its the length of an array
 * @returns {Array} - the resultant arry
 */
function getSimple2sComplement(num, length) {
  if (num < 0) {
    posnum = -num;

    let resstring = "";
    resneg = "0" + posnum.toString(2);

    for (let i = 0; i < resneg.length; i++) {
      resneg[i] === "1" ? (resstring += "0") : (resstring += "1");
    }
    return addOneToBinary(resstring, length);
  } else {
    let arr = [];
    res = num.toString(2);
    let toreturn = length - res.length;

    for (let i = 0; i < length; i++) {
      while (toreturn != 0) {
        arr.push(0);
        toreturn--;
      }
    }

    if (toreturn === 0) {
      for (let i = 0; i < res.length; i++) {
        const digit = parseInt(res[i], 10);
        arr.push(digit);
      }
    }
    return arr;
  }
}

/**It is a function to convert any binary form(2S complement form) to its decima
 * @param {Array} arr - binary number which is to be converted into decimal
 */
function getSimpleDecimalFrom2sComplement(arr) {
  let carry = 0;

  for (let i = 0; i < arr.length; i++) {
    arr[i] == 0 ? (arr[i] = 1) : (arr[i] = 0);
  }

  if (arr[arr.length - 1] == 0) {
    arr[arr.length - 1] = 1;
  }

  let finres = parseInt(arr.join(""), 10);

  return -parseInt(finres, 2);
}

// len 52 array from number
function getJsNumberRepresentation() {}

// return number from 52 array
function getNumericFromJsRepresentation() {}

// INPUTS
console.log(
  "Postive number: " + 
  getSimple2sComplement(15, 11)
  );

console.log("Negative number: " +
 getSimple2sComplement(-3, 10)
 );

console.log(
  "Decimal number is: " +
    getSimpleDecimalFrom2sComplement([1,1,1,0,1,1,0,1])
);

