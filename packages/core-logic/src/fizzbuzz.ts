/**
 * Configuration options for the FizzBuzz service.
 */
export interface FizzBuzzConfig {
  fizzNumber: number;
  buzzNumber: number;
  fizzWord: string;
  buzzWord: string;
}

/**
 * Default configuration for the FizzBuzz service.
 */
export const DEFAULT_CONFIG: FizzBuzzConfig = {
  fizzNumber: 3,
  buzzNumber: 5,
  fizzWord: 'Fizz',
  buzzWord: 'Buzz',
};

/**
 * Service for computing FizzBuzz sequences.
 */
export class FizzBuzzService {
  private config: FizzBuzzConfig;

  constructor(config: Partial<FizzBuzzConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Computes the FizzBuzz result for a given number.
   * @param n The number to compute.
   * @returns The FizzBuzz string or the number as a string.
   */
  public compute(n: number): string {
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
  public computeRange(start: number, end: number): string[] {
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      results.push(this.compute(i));
    }
    return results;
  }
}
