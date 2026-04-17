import { createApp } from './app.js';

const port = process.env.PORT || 3000;
const app = createApp();

if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Webserver listening on port ${port}`);
  });
}

export default app;
