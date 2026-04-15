import { describe, it, expect } from 'vitest';
import { cn } from './utils.js';

describe('cn', () => {
  it('merges tailwind classes', () => {
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('handles conditional classes', () => {
    const isPrimary = true;
    const isError = false;
    expect(cn('px-2', isPrimary && 'py-1', isError && 'm-1')).toBe('px-2 py-1');
  });
});
