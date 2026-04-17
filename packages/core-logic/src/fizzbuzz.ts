import { 
  Rule, 
  Arithmetic, 
  Composer, 
  Fallback, 
  Validator 
} from './types.js';
import { CheckedArithmetic } from './arithmetic.js';
import { ResilientEngine, EngineConfig } from './engine.js';
import { RuleCompiler } from './compiler.js';

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
 * Service for computing FizzBuzz sequences using the Generalized Rule Model (ADR 008).
 */
export class FizzBuzzService {
  private engine: ResilientEngine<number>;

  constructor(config: Partial<FizzBuzzConfig> = {}) {
    const fullConfig = { ...DEFAULT_CONFIG, ...config };
    
    // Define rules based on ADR 008
    const rules: Rule<number>[] = [
      RuleCompiler.compile({
        id: 'fizz',
        priority: 2,
        predicate: (n, a) => a.isDivisible(n, fullConfig.fizzNumber),
        renderer: () => fullConfig.fizzWord,
        metadata: { divisor: fullConfig.fizzNumber }
      }),
      RuleCompiler.compile({
        id: 'buzz',
        priority: 1,
        predicate: (n, a) => a.isDivisible(n, fullConfig.buzzNumber),
        renderer: () => fullConfig.buzzWord,
        metadata: { divisor: fullConfig.buzzNumber }
      })
    ];

    const composer: Composer = (outputs) => outputs.join('');
    const fallback: Fallback<number> = (n) => n.toString();
    const arithmetic = new CheckedArithmetic();
    const validators: Validator<number>[] = [
      (input, output) => {
        if (!output) throw new Error("Output invariant violated: result cannot be empty");
      }
    ];

    this.engine = new ResilientEngine({
      rules,
      arithmetic,
      composer,
      fallback,
      validators,
      enableCrossCheck: true
    });
  }

  /**
   * Computes the FizzBuzz result for a given number.
   * @param n The number to compute.
   * @returns The FizzBuzz string or the number as a string.
   */
  public compute(n: number): string {
    return this.engine.evaluate(n);
  }

  /**
   * Computes a range of FizzBuzz results.
   * @param start The starting number (inclusive).
   * @param end The ending number (inclusive).
   * @returns An array of FizzBuzz results.
   */
  public computeRange(start: number, end: number): string[] {
    return this.engine.evaluateRange(start, end);
  }
}
