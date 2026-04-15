import { describe, it, expect } from 'vitest';
import { FizzBuzzService } from './fizzbuzz.js';

describe('FizzBuzzService', () => {
  const service = new FizzBuzzService();

  it('should return number as a string for non-multiples of 3 or 5', () => {
    expect(service.compute(1)).toBe('1');
    expect(service.compute(2)).toBe('2');
    expect(service.compute(4)).toBe('4');
  });

  it('should return Fizz for multiples of 3', () => {
    expect(service.compute(3)).toBe('Fizz');
    expect(service.compute(6)).toBe('Fizz');
  });

  it('should return Buzz for multiples of 5', () => {
    expect(service.compute(5)).toBe('Buzz');
    expect(service.compute(10)).toBe('Buzz');
  });

  it('should return FizzBuzz for multiples of both 3 and 5', () => {
    expect(service.compute(15)).toBe('FizzBuzz');
    expect(service.compute(30)).toBe('FizzBuzz');
  });

  it('should respect custom configuration', () => {
    const customService = new FizzBuzzService({
      fizzNumber: 2,
      buzzNumber: 7,
      fizzWord: 'Foo',
      buzzWord: 'Bar',
    });

    expect(customService.compute(2)).toBe('Foo');
    expect(customService.compute(7)).toBe('Bar');
    expect(customService.compute(14)).toBe('FooBar');
    expect(customService.compute(3)).toBe('3');
  });

  it('should compute a range of results', () => {
    const range = service.computeRange(1, 15);
    expect(range).toHaveLength(15);
    expect(range[0]).toBe('1');
    expect(range[2]).toBe('Fizz');
    expect(range[4]).toBe('Buzz');
    expect(range[14]).toBe('FizzBuzz');
  });
});
