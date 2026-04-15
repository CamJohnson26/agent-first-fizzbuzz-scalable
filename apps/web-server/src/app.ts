import express from 'express';
import { z } from 'zod';
import { FizzBuzzService } from '@fizzbuzz/core-logic';

export const createApp = () => {
  const app = express();
  app.use(express.json());

  const fizzBuzzService = new FizzBuzzService();

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // FizzBuzz compute endpoint
  const computeSchema = z.object({
    n: z.coerce.number().int().positive(),
  });

  app.get('/compute/:n', (req, res) => {
    try {
      const { n } = computeSchema.parse(req.params);
      const result = fizzBuzzService.compute(n);
      res.json({ n, result });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid input. Please provide a positive integer.' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // FizzBuzz range compute endpoint
  const rangeSchema = z.object({
    start: z.coerce.number().int().positive(),
    end: z.coerce.number().int().positive(),
  }).refine((data) => data.start <= data.end, {
    message: 'Start must be less than or equal to end',
    path: ['start'],
  });

  app.get('/range', (req, res) => {
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
  });

  return app;
};
