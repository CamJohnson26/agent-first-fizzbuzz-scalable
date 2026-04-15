import { describe, it, expect, vi } from 'vitest';
import { Request, Response } from 'express';
import { healthHandler, computeHandler, rangeHandler } from './handlers.js';

describe('Web Server Handlers Unit Tests', () => {
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
      healthHandler(req, res);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: 'ok' }));
    });
  });

  describe('computeHandler', () => {
    it('should return correct result for valid input', () => {
      const req = { params: { n: '15' } } as unknown as Request;
      const res = mockResponse();
      computeHandler(req, res);
      expect(res.json).toHaveBeenCalledWith({ n: 15, result: 'FizzBuzz', engine: 'js' });
    });

    it('should return correct result for valid input with rust engine', () => {
      const req = { params: { n: '15' }, query: { engine: 'rust' } } as unknown as Request;
      const res = mockResponse();
      computeHandler(req, res);
      expect(res.json).toHaveBeenCalledWith({ n: 15, result: 'FizzBuzz', engine: 'rust' });
    });

    it('should return 400 for invalid input', () => {
      const req = { params: { n: 'abc' } } as unknown as Request;
      const res = mockResponse();
      computeHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(Array) }));
    });
  });

  describe('rangeHandler', () => {
    it('should return correct results for valid range', () => {
      const req = { query: { start: '1', end: '3' } } as unknown as Request;
      const res = mockResponse();
      rangeHandler(req, res);
      expect(res.json).toHaveBeenCalledWith({
        start: 1,
        end: 3,
        results: ['1', '2', 'Fizz'],
        engine: 'js',
      });
    });

    it('should return correct results for valid range with rust engine', () => {
      const req = { query: { start: '1', end: '3', engine: 'rust' } } as unknown as Request;
      const res = mockResponse();
      rangeHandler(req, res);
      expect(res.json).toHaveBeenCalledWith({
        start: 1,
        end: 3,
        results: ['1', '2', 'Fizz'],
        engine: 'rust',
      });
    });

    it('should return 400 for invalid range', () => {
      const req = { query: { start: '10', end: '5' } } as unknown as Request;
      const res = mockResponse();
      rangeHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(Array) }));
    });
  });
});
