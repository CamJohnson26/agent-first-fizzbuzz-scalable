import { Request, Response } from 'express';
import { z } from 'zod';
import { FizzBuzzService } from '@fizzbuzz/core-logic';
import { computeSchema, rangeSchema } from './schemas.js';

const fizzBuzzService = new FizzBuzzService();

export const healthHandler = (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
};

export const computeHandler = (req: Request, res: Response) => {
  try {
    const { n } = computeSchema.parse(req.params);
    const result = fizzBuzzService.compute(n);
    res.json({ n, result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: 'Invalid input. Please provide a positive integer.' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const rangeHandler = (req: Request, res: Response) => {
  try {
    const { start, end } = rangeSchema.parse(req.query);
    const results = fizzBuzzService.computeRange(start, end);
    res.json({ start, end, results });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
