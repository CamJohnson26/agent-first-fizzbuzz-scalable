import express from 'express';
import { createApp } from '../src/app.js';

const app = createApp();

export default function handler(req: express.Request, res: express.Response) {
  return app(req, res);
}
