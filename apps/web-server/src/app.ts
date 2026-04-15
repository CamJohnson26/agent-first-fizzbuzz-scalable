import express from 'express';
import cors from 'cors';
import { healthHandler, computeHandler, rangeHandler } from './handlers.js';

export const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Health check endpoint
  app.get('/health', healthHandler);

  // FizzBuzz compute endpoint
  app.get('/compute/:n', computeHandler);

  // FizzBuzz range compute endpoint
  app.get('/range', rangeHandler);

  return app;
};
