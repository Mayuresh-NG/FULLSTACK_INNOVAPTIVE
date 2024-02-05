/**
 *
 */

// function to add 1 to binary string
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

function getSimple2sComplement(num, length) {
  // -3
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

// return array from array
function getSimpleDecimalFrom2sComplement() {}

// len 52 array from number
function getJsNumberRepresentation() {}

// return number from 52 array
function getNumericFromJsRepresentation() {}

console.log("Postive number: " + getSimple2sComplement(15, 11));
console.log("Negative number: " + getSimple2sComplement(-3, 52));
