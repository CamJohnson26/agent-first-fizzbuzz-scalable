import app from '../src/app.js';

export default function handler(req: express.Request, res: express.Response) {
  return app(req, res);
}
