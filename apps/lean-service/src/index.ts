import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import { HealthResponse, ComputeResponse, RangeResponse } from '@fizzbuzz/types';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Path to the lean binary
// In production, it might be in a different place
const LEAN_BINARY_PATH = process.env.LEAN_BINARY_PATH || path.resolve(__dirname, '../../../packages/verified-algorithms/lean/.lake/build/bin/fizzbuzz');

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res: express.Response<HealthResponse & { service: string }>) => {
  res.json({ status: 'ok', service: 'lean-service', timestamp: new Date().toISOString() });
});

app.get('/compute/:n', async (req, res: express.Response<ComputeResponse | { error: string }>) => {
  const n = req.params.n;
  try {
    const { stdout } = await execAsync(`${LEAN_BINARY_PATH} ${n}`);
    res.json({ n: parseInt(n), result: stdout.trim(), engine: 'lean' });
  } catch (error) {
    console.error('Lean execution error:', error);
    res.status(500).json({ error: 'Failed to execute Lean binary' });
  }
});

app.get('/range', async (req, res: express.Response<RangeResponse | { error: string }>) => {
  const { start, end } = req.query;
  try {
    const { stdout } = await execAsync(`${LEAN_BINARY_PATH} range ${start} ${end}`);
    const results = stdout.trim().split('\n').filter(line => line.length > 0);
    res.json({ start: parseInt(start as string), end: parseInt(end as string), results, engine: 'lean' });
  } catch (error) {
    console.error('Lean range execution error:', error);
    res.status(500).json({ error: 'Failed to execute Lean binary for range' });
  }
});

if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1' || process.env.FLY_APP_NAME) {
  app.listen(port, () => {
    console.log(`Lean service listening on port ${port}`);
  });
}

export default app;
