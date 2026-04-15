import { Request, Response } from 'express';
import { z } from 'zod';
import { createRequire } from 'module';
import { FizzBuzzService } from '@fizzbuzz/core-logic';
import { computeSchema, rangeSchema } from './schemas.js';

const require = createRequire(import.meta.url);
const rustEngine = require('@fizzbuzz/rust-engine');
const fizzBuzzService = new FizzBuzzService();

export const healthHandler = (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
};

export const computeHandler = (req: Request, res: Response) => {
  try {
    const { n, engine } = computeSchema.parse({ ...req.params, ...req.query });
    
    let result: string;
    if (engine === 'rust') {
      result = rustEngine.compute(n);
    } else {
      result = fizzBuzzService.compute(n);
    }
    
    res.json({ n, result, engine });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const rangeHandler = (req: Request, res: Response) => {
  try {
    const { start, end, engine } = rangeSchema.parse(req.query);
    
    let results: string[];
    if (engine === 'rust') {
      results = rustEngine.compute_range(start, end);
    } else {
      results = fizzBuzzService.computeRange(start, end);
    }
    
    res.json({ start, end, results, engine });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
