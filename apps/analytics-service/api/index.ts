import express from 'express';
import app from '../src/app';

export default function handler(req: express.Request, res: express.Response) {
  return app(req, res);
}
