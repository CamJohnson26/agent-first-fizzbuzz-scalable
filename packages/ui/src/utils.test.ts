import { describe, it, expect } from 'vitest';
import { cn } from './utils.js';

describe('cn', () => {
  it('merges tailwind classes', () => {
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('handles conditional classes', () => {
    expect(cn('px-2', true && 'py-1', false && 'm-1')).toBe('px-2 py-1');
  });
});
