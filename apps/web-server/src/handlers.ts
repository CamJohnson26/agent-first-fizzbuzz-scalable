import { Request, Response as ExpressResponse } from 'express';
import { z } from 'zod';
import { createRequire } from 'module';
import { injectable, inject } from 'tsyringe';
import { FizzBuzzService } from '@fizzbuzz/core-logic';
import { 
  HealthResponse, 
  ComputeResponse, 
  RangeResponse 
} from '@fizzbuzz/types';
import { computeSchema, rangeSchema, chatSchema } from './schemas.js';
import { AIInferenceService } from './ai-service.js';

const require = createRequire(import.meta.url);
const rustEngine = require('@fizzbuzz/rust-engine');

@injectable()
export class FizzBuzzHandler {
  constructor(
    @inject(FizzBuzzService) private fizzBuzzService: FizzBuzzService,
    @inject(AIInferenceService) private aiService: AIInferenceService
  ) {}

  public healthHandler = (req: Request, res: ExpressResponse<HealthResponse>) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  };

  public computeHandler = async (req: Request, res: ExpressResponse<ComputeResponse | { error: unknown }>) => {
    try {
      const { n, engine } = computeSchema.parse({ ...req.params, ...req.query });
      const LEAN_SERVICE_URL = process.env.LEAN_SERVICE_URL || 'http://localhost:3002';
      
      let result: string;
      if (engine === 'rust') {
        result = rustEngine.compute(n);
      } else if (engine === 'lean') {
        const leanRes = await fetch(`${LEAN_SERVICE_URL}/compute/${n}`);
        const data = (await leanRes.json()) as { result: string };
        result = data.result;
      } else {
        result = this.fizzBuzzService.compute(n);
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

  public rangeHandler = async (req: Request, res: ExpressResponse<RangeResponse | { error: unknown }>) => {
    try {
      const { start, end, engine } = rangeSchema.parse(req.query);
      const LEAN_SERVICE_URL = process.env.LEAN_SERVICE_URL || 'http://localhost:3002';
      
      let results: string[];
      if (engine === 'rust') {
        results = rustEngine.compute_range(start, end);
      } else if (engine === 'lean') {
        const leanRes = await fetch(`${LEAN_SERVICE_URL}/range?start=${start}&end=${end}`);
        const data = (await leanRes.json()) as { results: string[] };
        results = data.results;
      } else {
        results = this.fizzBuzzService.computeRange(start, end);
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

  public chatHandler = async (req: Request, res: ExpressResponse<{ response: string } | { error: unknown }>) => {
    try {
      const { message } = chatSchema.parse(req.body);
      
      // Prepare prompt
      const prompt = `U: ${message}\nA:`;
      
      const response = await this.aiService.generate(prompt);
      
      res.json({ response });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error('Chat error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
