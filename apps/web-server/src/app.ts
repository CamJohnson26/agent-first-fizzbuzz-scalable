import express from 'express';
import cors from 'cors';
import { healthHandler, computeHandler, rangeHandler } from './handlers.js';

const ANALYTICS_SERVICE_URL = process.env.ANALYTICS_SERVICE_URL || 'https://agent-first-fizzbuzz-scalable-analy.vercel.app/api/logs';

const forwardLog = async (message: string, metadata?: Record<string, unknown>) => {
  try {
    await fetch(ANALYTICS_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: 'web-server',
        message,
        metadata,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error('Failed to forward log to analytics service:', error);
  }
};

export const createApp = () => {
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
  app.get('/health', healthHandler);

  // FizzBuzz compute endpoint
  app.get('/compute/:n', computeHandler);

  // FizzBuzz range compute endpoint
  app.get('/range', rangeHandler);

  return app;
};
