import { Arithmetic } from './types.js';

/**
 * ADR 009: Unbounded BigInt arithmetic.
 */
export class BigIntArithmetic implements Arithmetic<bigint> {
  isDivisible(n: bigint, divisor: bigint): boolean {
    return n % divisor === 0n;
  }
  modulo(n: bigint, divisor: bigint): bigint {
    return n % divisor;
  }
  toString(n: bigint): string {
    return n.toString();
  }
}

/**
 * ADR 009: Checked 64-bit machine arithmetic.
 */
export class CheckedArithmetic implements Arithmetic<number> {
  isDivisible(n: number, divisor: number): boolean {
    if (!Number.isSafeInteger(n)) {
      throw new Error(`Precision loss detected: ${n} is not a safe integer`);
    }
    return n % divisor === 0;
  }
  modulo(n: number, divisor: number): number {
    return n % divisor;
  }
  toString(n: number): string {
    return n.toString();
  }
}
