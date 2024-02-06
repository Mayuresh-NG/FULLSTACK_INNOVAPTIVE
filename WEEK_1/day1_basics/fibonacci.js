/**
 * Calculates the nth Fibonacci number.
 *
 * @param {number|string} input - The position of the desired Fibonacci number (zero-based).
 * @returns {number} The nth Fibonacci number.
 * @throws {Error} Throws an error if the input is not a non-negative integer or a valid string representation of an integer.
 */
function fibonacci(input) {
    const n = parseInt(input);
  
    if (isNaN(n) || !Number.isInteger(n) || n < 0) {
      throw new Error('Input must be a non-negative integer or a valid string representation of an integer.');
    }
  
    if (n === 0) return 0;
    if (n === 1) return 1;
  
    let prev = 0;
    let current = 1;
  
    for (let i = 2; i <= n; i++) {
      const next = prev + current;
      prev = current;
      current = next;
    }
  
    return current;
  }
  
  // Example usage:
  const input = "8";
  try {
    const result = fibonacci(input);
    console.log(`The ${input}th Fibonacci number is: ${result}`);
  } catch (error) {
    console.error(error.message);
  }
  