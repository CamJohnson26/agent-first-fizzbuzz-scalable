import 'reflect-metadata';
import { describe, it, expect } from 'vitest';
import { FizzBuzzService } from '@fizzbuzz/core-logic';

describe('FizzBuzz Core Service Integration', () => {
  const service = new FizzBuzzService();

  it('should compute fizzbuzz for 3', () => {
    expect(service.compute(3)).toBe('Fizz');
  });

  it('should compute range 1 to 5', () => {
    expect(service.computeRange(1, 5)).toEqual(['1', '2', 'Fizz', '4', 'Buzz']);
  });
});
