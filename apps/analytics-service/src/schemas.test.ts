import { describe, it, expect } from 'vitest';
import { computeSchema, rangeSchema } from './schemas.js';

describe('Web Server Schemas Unit Tests', () => {
  describe('computeSchema', () => {
    it('should validate positive integers', () => {
      expect(computeSchema.safeParse({ n: 15 }).success).toBe(true);
      expect(computeSchema.safeParse({ n: '15' }).success).toBe(true);
    });

    it('should reject non-positive integers', () => {
      expect(computeSchema.safeParse({ n: 0 }).success).toBe(false);
      expect(computeSchema.safeParse({ n: -5 }).success).toBe(false);
    });

    it('should reject invalid types', () => {
      expect(computeSchema.safeParse({ n: 'abc' }).success).toBe(false);
      expect(computeSchema.safeParse({ n: null }).success).toBe(false);
    });
  });

  describe('rangeSchema', () => {
    it('should validate correct range', () => {
      expect(rangeSchema.safeParse({ start: 1, end: 10 }).success).toBe(true);
    });

    it('should validate equal start and end', () => {
      expect(rangeSchema.safeParse({ start: 5, end: 5 }).success).toBe(true);
    });

    it('should reject start > end', () => {
      const result = rangeSchema.safeParse({ start: 10, end: 5 });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe(
          'Start must be less than or equal to end',
        );
      }
    });

    it('should reject non-positive values', () => {
      expect(rangeSchema.safeParse({ start: 0, end: 5 }).success).toBe(false);
      expect(rangeSchema.safeParse({ start: 1, end: -1 }).success).toBe(false);
    });
  });
});
