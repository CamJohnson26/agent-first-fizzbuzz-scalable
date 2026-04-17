import express from 'express';

const app = express();
app.get('/health', (req, res) => res.json({ status: 'ok', source: 'api/index.ts' }));

export default app;
