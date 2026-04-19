import 'reflect-metadata';
import { container } from 'tsyringe';
import express from 'express';
import cors from 'cors';
import { FIZZ_BUZZ_CONFIG, DEFAULT_CONFIG } from '@fizzbuzz/core-logic';
import { FizzBuzzHandler } from './handlers.js';
import { EventHandler } from './event-handlers.js';
import { DatabaseService } from './database.js';
import { Logger } from './logger.js';

// Register dependencies
container.register(FIZZ_BUZZ_CONFIG, { useValue: DEFAULT_CONFIG });
container.resolve(DatabaseService);
const handlers = container.resolve(FizzBuzzHandler);
const eventHandlers = container.resolve(EventHandler);
const logger = container.resolve(Logger);

const app = express();
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.log(`Request ${req.method} ${req.url}`, {
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

// Event queue endpoints
app.post('/events', eventHandlers.pushHandler);
app.get('/events', eventHandlers.popHandler);
app.get('/events/stats', eventHandlers.statsHandler);

// FizzBuzz transformer chat endpoint
app.post('/chat', handlers.chatHandler);

export default app;
