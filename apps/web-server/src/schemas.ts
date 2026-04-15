import { z } from 'zod';

// FizzBuzz compute schema
export const computeSchema = z.object({
  n: z.coerce.number().int().positive(),
});

// FizzBuzz range compute schema
export const rangeSchema = z.object({
  start: z.coerce.number().int().positive(),
  end: z.coerce.number().int().positive(),
}).refine((data) => data.start <= data.end, {
  message: 'Start must be less than or equal to end',
  path: ['start'],
});
