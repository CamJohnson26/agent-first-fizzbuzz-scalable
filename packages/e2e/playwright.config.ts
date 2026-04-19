import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: 'VITE_API_BASE=http://localhost:3000 VITE_DASHBOARD_URL=http://localhost:5184 pnpm --filter marketing-landing-page dev --port 5183',
      url: 'http://localhost:5183/',
      reuseExistingServer: true,
      stdout: 'pipe',
      stderr: 'pipe',
    },
    {
      command: 'VITE_API_BASE=http://localhost:3000 VITE_ANALYTICS_BASE=http://localhost:3001 pnpm --filter @fizzbuzz/web-dashboard dev --port 5184',
      url: 'http://localhost:5184',
      reuseExistingServer: true,
      stdout: 'pipe',
      stderr: 'pipe',
    },
    {
      command: 'pnpm --filter @fizzbuzz/web-server dev',
      url: 'http://localhost:3000/health',
      reuseExistingServer: true,
      stdout: 'pipe',
      stderr: 'pipe',
    },
    {
      command: 'pnpm --filter @fizzbuzz/analytics-service dev',
      url: 'http://localhost:3001/health',
      reuseExistingServer: true,
      stdout: 'pipe',
      stderr: 'pipe',
    },
    {
      command: 'pnpm --filter @fizzbuzz/lean-service dev',
      url: 'http://localhost:3002/health',
      reuseExistingServer: true,
      stdout: 'pipe',
      stderr: 'pipe',
    },
  ],
});
