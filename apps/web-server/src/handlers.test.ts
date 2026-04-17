import 'reflect-metadata';
import { container } from 'tsyringe';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { Request, Response } from 'express';
import { FizzBuzzHandler } from './handlers.js';
import { FIZZ_BUZZ_CONFIG, DEFAULT_CONFIG } from '@fizzbuzz/core-logic';

describe('Web Server Handlers Unit Tests', () => {
  let handlers: FizzBuzzHandler;

  beforeAll(() => {
    container.register(FIZZ_BUZZ_CONFIG, { useValue: DEFAULT_CONFIG });
    handlers = container.resolve(FizzBuzzHandler);
  });

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res as Response;
  };

  describe('healthHandler', () => {
    it('should return 200 and ok status', () => {
      const req = {} as Request;
      const res = mockResponse();
      handlers.healthHandler(req, res);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'ok' }),
      );
    });
  });

  describe('computeHandler', () => {
    it('should return correct result for valid input', async () => {
      const req = { params: { n: '15' } } as unknown as Request;
      const res = mockResponse();
      await handlers.computeHandler(req, res);
      expect(res.json).toHaveBeenCalledWith({ n: 15, result: 'FizzBuzz', engine: 'js' });
    });

    it('should return correct result for valid input with rust engine', async () => {
      const req = { params: { n: '15' }, query: { engine: 'rust' } } as unknown as Request;
      const res = mockResponse();
      await handlers.computeHandler(req, res);
      expect(res.json).toHaveBeenCalledWith({ n: 15, result: 'FizzBuzz', engine: 'rust' });
    });

    it('should return 400 for invalid input', async () => {
      const req = { params: { n: 'abc' } } as unknown as Request;
      const res = mockResponse();
      await handlers.computeHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(Array) }));
    });
  });

  describe('rangeHandler', () => {
    it('should return correct results for valid range', async () => {
      const req = { query: { start: '1', end: '3' } } as unknown as Request;
      const res = mockResponse();
      await handlers.rangeHandler(req, res);
      expect(res.json).toHaveBeenCalledWith({
        start: 1,
        end: 3,
        results: ['1', '2', 'Fizz'],
        engine: 'js',
      });
    });

    it('should return correct results for valid range with rust engine', async () => {
      const req = { query: { start: '1', end: '3', engine: 'rust' } } as unknown as Request;
      const res = mockResponse();
      await handlers.rangeHandler(req, res);
      expect(res.json).toHaveBeenCalledWith({
        start: 1,
        end: 3,
        results: ['1', '2', 'Fizz'],
        engine: 'rust',
      });
    });

    it('should return 400 for invalid range', async () => {
      const req = { query: { start: '10', end: '5' } } as unknown as Request;
      const res = mockResponse();
      await handlers.rangeHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.any(Array) }),
      );
    });
  });
});
