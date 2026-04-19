import { z } from 'zod';

// FizzBuzz compute schema
export const computeSchema = z.object({
  n: z.coerce.number().int().positive(),
  engine: z.enum(['js', 'rust', 'lean']).optional().default('js'),
});

// FizzBuzz range compute schema
export const rangeSchema = z.object({
  start: z.coerce.number().int().positive(),
  end: z.coerce.number().int().positive(),
  engine: z.enum(['js', 'rust', 'lean']).optional().default('js'),
}).refine((data) => data.start <= data.end, {
  message: 'Start must be less than or equal to end',
  path: ['start'],
}).refine((data) => (data.end - data.start + 1) <= 50000, {
  message: 'Range size exceeds the maximum allowed limit of 50,000',
  path: ['end'],
});

// Chat schema
export const chatSchema = z.object({
  message: z.string().min(1).max(500),
});
