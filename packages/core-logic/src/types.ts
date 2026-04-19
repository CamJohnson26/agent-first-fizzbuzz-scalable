/**
 * Core Rule Model types based on ADR 008.
 */

export interface Rule<T> {
  id: string;
  predicate: Predicate<T>;
  renderer: Renderer<T>;
  priority: number;
  metadata?: Record<string, unknown>;
}

export type Predicate<T> = (input: T, arithmetic: Arithmetic<T>) => boolean;
export type Renderer<T> = (input: T) => string;

export interface Arithmetic<T> {
  isDivisible(n: T, divisor: T): boolean;
  modulo?(n: T, divisor: T): T;
  toString(n: T): string;
}

export interface Engine<T> {
  evaluate(input: T): string;
  evaluateRange(start: T, end: T): string[];
}

export type Composer = (outputs: string[]) => string;
export type Fallback<T> = (input: T) => string;
export type Validator<T> = (input: T, output: string) => void;

/**
 * ADR 010: Rule Protection
 */
export interface ProtectedRule<T> extends Rule<T> {
  checksum: string;
}
