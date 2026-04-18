import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from './app.js';
import { container } from 'tsyringe';
import { V86Service } from './v86-service.js';

describe('V86 Event Queue', () => {
  let v86Service: V86Service;

  beforeAll(async () => {
    v86Service = container.resolve(V86Service);
    // Wait for VM to boot (max 30s)
    console.log('Waiting for VM to boot...');
    for (let i = 0; i < 30; i++) {
        if (v86Service.isVMReady()) break;
        await new Promise(r => setTimeout(r, 1000));
    }
    expect(v86Service.isVMReady()).toBe(true);
  }, 60000);

  afterAll(() => {
    v86Service.stop();
  });

  it('should push, pop and handle empty queue', async () => {
    // 1. Push
    const pushRes = await request(app)
      .post('/events')
      .send({ event: 'test-event-1' });
    
    expect(pushRes.status).toBe(200);
    expect(pushRes.body.status).toBe('pushed');

    // 2. Stats
    const statsRes = await request(app).get('/events/stats');
    expect(statsRes.status).toBe(200);
    expect(statsRes.body.count).toBeGreaterThan(0);

    // 3. Pop
    const popRes = await request(app).get('/events');
    expect(popRes.status).toBe(200);
    expect(popRes.body.event).toBe('test-event-1');

    // 4. Pop empty
    // Clear queue if any
    while(await v86Service.pop());

    const emptyPopRes = await request(app).get('/events');
    expect(emptyPopRes.status).toBe(204);
  }, 60000);
});
