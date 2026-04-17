import 'reflect-metadata';
import { container } from 'tsyringe';
import express from 'express';
import cors from 'cors';
import { FIZZ_BUZZ_CONFIG, DEFAULT_CONFIG } from '@fizzbuzz/core-logic';
import { FizzBuzzHandler } from './handlers.js';
import { DatabaseService } from './database.js';

// Register dependencies
container.register(FIZZ_BUZZ_CONFIG, { useValue: DEFAULT_CONFIG });
const databaseService = container.resolve(DatabaseService);
const handlers = container.resolve(FizzBuzzHandler);

const ANALYTICS_SERVICE_URL = process.env.ANALYTICS_SERVICE_URL || 'https://agent-first-fizzbuzz-scalable-analy.vercel.app/api/logs';

const forwardLog = async (message: string, metadata?: Record<string, unknown>) => {
  try {
    const res = await fetch(ANALYTICS_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: 'web-server',
        message,
        metadata,
        timestamp: new Date().toISOString(),
      }),
    });
    if (!res.ok) {
      console.warn(`Analytics service responded with status ${res.status}`);
    }
  } catch (error) {
    console.error('Failed to forward log to analytics service:', error);
  }
};

const app = express();
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    forwardLog(`Request ${req.method} ${req.url}`, {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    });
  });
  next();
});

// Health check endpoint
app.get('/health', handlers.healthHandler);

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'web-server' });
});

// FizzBuzz compute endpoint
app.get('/compute/:n', handlers.computeHandler);

// FizzBuzz range compute endpoint
app.get('/range', handlers.rangeHandler);

export default app;
