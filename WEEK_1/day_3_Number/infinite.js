
"use strict";
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
      if(!Number.isInteger(inputObject))
      {
        throw new Error("Please provide only integer values")
      }

      if(inputObject<0) throw new Error("Please provide only positive number")

      // initialize the member array
      var numberStr = inputObject.toString();
      this._internalArray = Array.from(numberStr, Number);
    } 

    else if (typeof inputObject === "string") {
      console.log("You sent a String");

      // TODO validate the String and only then initialize the _internalArray
      if(!/^\d+$/.test(inputObject))
      {
        throw new Error("Please provide a valid number string")
      }

      // initialize the member array
      this._internalArray = Array.from(inputObject, Number);
    } 

    else if (Array.isArray(inputObject)) {
      // IS THIS HOW ITS DONE?
      console.log("You sent an Array");

      // TODO validate the individual elements of the inputArray and initialize
      // the _internalArray
      // initialize the member array
      this._internalArray = inputObject;
    } 
    
    else if (typeof inputObject === "object") {
      // IS THIS HOW ITS DONE?
      console.log("You sent an Object");

      // TODO check if this object has getInternalArray() and make a deep copy
      // and assign it to local _internalArray
      
      // initialize the member array
      this._internalArray = Object.values(inputObject)
      console.log(this._internalArray)
    } 
    
    else {
      // BHAI KYA KAR RAHA HAI?
      console.log("You sent some bullshit!");

      throw new Error(
        `Constuctor of IniniteNumber does not support this data` +
          `type ${typeof inputObject}`
      );
    }
  }

  /** Helper method to return the _internalArray variable which contains the
   * Inifnite precision Integer.
   * @returns {Array<Number>} the internal array representing individual digits
   */
  getInternalArray() {
    // TODO 
  }

  /** Helper method to return the representation of this Infinite Precision
   *
   *
   */
  getNumberAsString() {
    // TODO, concatenate the contents of _internalArray to a string and return
  }
}

var input = "123"

const ob = new InfiniteNumber(input);
