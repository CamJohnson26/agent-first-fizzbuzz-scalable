import app from './app.js';

const port = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1' || process.env.FLY_APP_NAME) {
  app.listen(port, () => {
    console.log(`Analytics Service listening on port ${port}`);
  });
}

export default app;
