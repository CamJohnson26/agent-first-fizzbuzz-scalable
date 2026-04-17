import { createApp } from '../src/app.js';

const port = process.env.PORT || 3001;
const app = createApp();

if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Analytics service listening on port ${port}`);
  });
}

export default app;
