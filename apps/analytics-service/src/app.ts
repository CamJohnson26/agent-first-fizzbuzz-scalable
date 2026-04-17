const express = require('express');
const cors = require('cors');
const { z } = require('zod');

const LogSchema = z.object({
  level: z.string().optional(),
  message: z.string(),
  service: z.string(),
  timestamp: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const stats = {
    totalLogs: 0,
    logsByService: {},
  };

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/stats', (req, res) => {
    res.json(stats);
  });

  app.post('/api/logs', (req, res) => {
    const result = LogSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: 'Invalid log format', details: result.error });
    }

    const log = result.data;
    console.log(`[${log.service}] ${log.level || 'info'}: ${log.message}`, log.metadata || '');

    // Update stats
    stats.totalLogs++;
    stats.logsByService[log.service] = (stats.logsByService[log.service] || 0) + 1;

    res.status(202).json({ status: 'received' });
  });

  return app;
};

module.exports = { createApp };
