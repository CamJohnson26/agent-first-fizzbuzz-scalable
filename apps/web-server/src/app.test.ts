import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('Web Server Integration Tests', () => {
  const app = createApp();

  it('GET /health should return 200 and ok status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
  });

  it('GET /compute/:n should return 200 and correct result for valid input', async () => {
    const response = await request(app).get('/compute/15');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ n: 15, result: 'FizzBuzz' });
  });

  it('GET /compute/:n should return 400 for invalid input', async () => {
    const response = await request(app).get('/compute/abc');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('GET /range should return 200 and correct results for valid query', async () => {
    const response = await request(app).get('/range?start=1&end=5');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      start: 1,
      end: 5,
      results: ['1', '2', 'Fizz', '4', 'Buzz'],
    });
  });

  it('GET /range should return 400 for invalid query (start > end)', async () => {
    const response = await request(app).get('/range?start=10&end=5');
    expect(response.status).toBe(400);
    expect(response.body.error[0].message).toBe(
      'Start must be less than or equal to end',
    );
  });
});
