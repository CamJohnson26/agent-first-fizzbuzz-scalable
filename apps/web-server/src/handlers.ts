import { Request, Response as ExpressResponse } from 'express';
import { z } from 'zod';
import { createRequire } from 'module';
import { FizzBuzzService } from '@fizzbuzz/core-logic';
import { 
  HealthResponse, 
  ComputeResponse, 
  RangeResponse 
} from '@fizzbuzz/types';
import { computeSchema, rangeSchema } from './schemas.js';

const require = createRequire(import.meta.url);
const rustEngine = require('@fizzbuzz/rust-engine');
const fizzBuzzService = new FizzBuzzService();
const LEAN_SERVICE_URL = process.env.LEAN_SERVICE_URL || 'http://localhost:3002';

export const healthHandler = (req: Request, res: ExpressResponse<HealthResponse>) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
};

export const computeHandler = async (req: Request, res: ExpressResponse<ComputeResponse | { error: unknown }>) => {
  try {
    const { n, engine } = computeSchema.parse({ ...req.params, ...req.query });
    
    let result: string;
    if (engine === 'rust') {
      result = rustEngine.compute(n);
    } else if (engine === 'lean') {
      const leanRes = await fetch(`${LEAN_SERVICE_URL}/compute/${n}`);
      const data = (await (leanRes as any).json()) as { result: string };
      result = data.result;
    } else {
      result = fizzBuzzService.compute(n);
    }
    
    res.json({ n, result, engine });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Compute error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const rangeHandler = async (req: Request, res: ExpressResponse<RangeResponse | { error: unknown }>) => {
  try {
    const { start, end, engine } = rangeSchema.parse(req.query);
    
    let results: string[];
    if (engine === 'rust') {
      results = rustEngine.compute_range(start, end);
    } else if (engine === 'lean') {
      const leanRes = await fetch(`${LEAN_SERVICE_URL}/range?start=${start}&end=${end}`);
      const data = (await (leanRes as any).json()) as { results: string[] };
      results = data.results;
    } else {
      results = fizzBuzzService.computeRange(start, end);
    }
    
    res.json({ start, end, results, engine });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Range error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
