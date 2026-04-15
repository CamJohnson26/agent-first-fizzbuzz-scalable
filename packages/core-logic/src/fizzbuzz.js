/**
 * Default configuration for the FizzBuzz service.
 */
export const DEFAULT_CONFIG = {
  fizzNumber: 3,
  buzzNumber: 5,
  fizzWord: 'Fizz',
  buzzWord: 'Buzz',
};
/**
 * Service for computing FizzBuzz sequences.
 */
export class FizzBuzzService {
  config;
  constructor(config = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }
  /**
   * Computes the FizzBuzz result for a given number.
   * @param n The number to compute.
   * @returns The FizzBuzz string or the number as a string.
   */
  compute(n) {
    let result = '';
    if (n % this.config.fizzNumber === 0) {
      result += this.config.fizzWord;
    }
    if (n % this.config.buzzNumber === 0) {
      result += this.config.buzzWord;
    }
    return result || n.toString();
  }
  /**
   * Computes a range of FizzBuzz results.
   * @param start The starting number (inclusive).
   * @param end The ending number (inclusive).
   * @returns An array of FizzBuzz results.
   */
  computeRange(start, end) {
    const results = [];
    for (let i = start; i <= end; i++) {
      results.push(this.compute(i));
    }
    return results;
  }
}
