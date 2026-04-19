import { Request, Response as ExpressResponse } from 'express';
import { z } from 'zod';
import { createRequire } from 'module';
import { injectable, inject } from 'tsyringe';
import { FizzBuzzService } from '@fizzbuzz/core-logic';
import { Logger } from './logger.js';
import { 
  HealthResponse, 
  ComputeResponse, 
  RangeResponse 
} from '@fizzbuzz/types';
import { computeSchema, rangeSchema, chatSchema } from './schemas.js';

const require = createRequire(import.meta.url);
const rustEngine = require('@fizzbuzz/rust-engine');

@injectable()
export class FizzBuzzHandler {
  constructor(
    @inject(FizzBuzzService) private fizzBuzzService: FizzBuzzService,
    @inject(Logger) private logger: Logger
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
      this.logger.error('Compute error:', error);
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
      this.logger.error('Range error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  public chatHandler = async (req: Request, res: ExpressResponse<{ response: string } | { error: unknown }>) => {
    try {
      const { message } = chatSchema.parse(req.body);
      const TRANSFORMER_SERVICE_URL = process.env.TRANSFORMER_SERVICE_URL || 'http://localhost:3003';
      
      const prompt = `U: ${message}\nA:`;
    
      try {
        const transformerRes = await fetch(`${TRANSFORMER_SERVICE_URL}/infer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        });

        if (!transformerRes.ok) {
          const errorData = await transformerRes.json() as { error?: string };
          this.logger.error('Transformer service error:', errorData);
          return res.status(500).json({ error: errorData.error || 'Inference failed' });
        }

        const data = await transformerRes.json() as { response: string };
        res.json({ response: data.response });
      } catch (fetchError: unknown) {
        const error = fetchError as Error;
        this.logger.warn('Transformer service unreachable, using fallback response', { error: error.message });
        return res.json({ 
          response: `[DEMO FALLBACK] FizzBuzz reasoning: '${message}' is interesting. In a real environment with PyTorch, I would use the transformer model to give you a detailed answer!` 
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      this.logger.error('Chat error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
