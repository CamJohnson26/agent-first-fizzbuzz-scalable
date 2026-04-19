import express from 'express';
import app from '../dist/app.js';

export default function handler(req: express.Request, res: express.Response) {
  return app(req, res);
}
