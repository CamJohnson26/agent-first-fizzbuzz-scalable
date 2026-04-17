import app from '../src/index.js';

const port = process.env.PORT || 3002;

if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Lean service listening on port ${port}`);
  });
}

export default app;
