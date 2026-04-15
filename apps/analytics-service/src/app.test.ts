import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app';

describe('Analytics Service', () => {
  const app = createApp();

  it('should return health status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('should return initial stats', async () => {
    const response = await request(app).get('/stats');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ totalLogs: 0, logsByService: {} });
  });

  it('should receive logs and update stats', async () => {
    const logData = {
      message: 'Test log',
      service: 'test-service',
      level: 'info'
    };

    const postResponse = await request(app)
      .post('/api/logs')
      .send(logData);
    expect(postResponse.status).toBe(202);
    expect(postResponse.body).toEqual({ status: 'received' });

    const statsResponse = await request(app).get('/stats');
    expect(statsResponse.body.totalLogs).toBe(1);
    expect(statsResponse.body.logsByService['test-service']).toBe(1);
  });

  it('should return 400 for invalid log format', async () => {
    const invalidLog = {
      message: 'Incomplete log'
      // missing service
    };

    const response = await request(app)
      .post('/api/logs')
      .send(invalidLog);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid log format');
  });
});
