import app from './app.js';

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Optional: forward to analytics if you have a way to do it here
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // process.exit(1); // Depending on your deployment, you might want to exit
});

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1' || process.env.FLY_APP_NAME) {
  app.listen(port, () => {
    console.log(`Webserver listening on port ${port}`);
  });
}

export default app;
