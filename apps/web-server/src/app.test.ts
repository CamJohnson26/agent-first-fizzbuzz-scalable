import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './app.js';

describe('Web Server Integration Tests', () => {

  it('GET /health should return 200 and ok status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
  });

  it('GET /compute/:n should return 200 and correct result for valid input', async () => {
    const response = await request(app).get('/compute/15');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ n: 15, result: 'FizzBuzz', engine: 'js' });
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
      engine: 'js',
    });
  });

  it('GET /range should return 400 for invalid query (start > end)', async () => {
    const response = await request(app).get('/range?start=10&end=5');
    expect(response.status).toBe(400);
    expect(response.body.error[0].message).toBe(
      'Start must be less than or equal to end',
    );
  });

  it('POST /chat should return 200 and a response for valid input', async () => {
    const response = await request(app)
      .post('/chat')
      .send({ message: 'What is 15?' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('response');
    expect(typeof response.body.response).toBe('string');
  }, 30000);
});
