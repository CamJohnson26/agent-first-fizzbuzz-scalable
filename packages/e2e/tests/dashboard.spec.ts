import { test, expect } from '@playwright/test';

test.describe('Web Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5184');
  });

  test('should show server status as ok', async ({ page }) => {
    // Wait for the server status to be 'ok'
    await expect(page.getByText('Server: ok')).toBeVisible({ timeout: 10000 });
  });

  test('should perform single computation', async ({ page }) => {
    const input = page.getByPlaceholder('Enter a number...');
    await input.fill('15');
    await page.getByRole('button', { name: 'Compute' }).click();
    
    await expect(page.getByText('Result:')).toBeVisible();
    await expect(page.getByTestId('single-result')).toHaveText('FizzBuzz');
  });

  test('should perform range computation', async ({ page }) => {
    // Fill start and end
    await page.locator('label:has-text("Start") + input').fill('1');
    await page.locator('label:has-text("End") + input').fill('5');
    
    await page.getByRole('button', { name: 'Generate Range Results' }).click();
    
    // Check results (1, 2, Fizz, 4, Buzz)
    const results = page.getByTestId('result-text');
    await expect(results.nth(0)).toHaveText('1');
    await expect(results.nth(1)).toHaveText('2');
    await expect(results.nth(2)).toHaveText('Fizz');
    await expect(results.nth(4)).toHaveText('Buzz');
  });

  test('should switch engines', async ({ page }) => {
    const select = page.locator('#engine-select');
    await select.selectOption('rust');
    
    // Perform computation with rust engine
    await page.getByPlaceholder('Enter a number...').fill('3');
    await page.getByRole('button', { name: 'Compute' }).click();
    await expect(page.getByTestId('single-result')).toHaveText('Fizz');
  });

  test('should show live analytics', async ({ page }) => {
    await expect(page.getByText('Live Analytics')).toBeVisible();
    // Total logs should be at least 1 after previous actions (if running sequentially)
    // but better to just check it's present
    await expect(page.getByText('Total Logs')).toBeVisible();
  });

  test('should show offline status when health check fails', async ({ page }) => {
    // Intercept health check and make it fail
    await page.route('**/health', (route) => {
      route.abort();
    });

    // Reload page to trigger a new health check
    await page.reload();

    // Check if it shows 'offline'
    await expect(page.getByText('Server: offline')).toBeVisible({ timeout: 10000 });
  });

  test('should manually refresh health status', async ({ page }) => {
    // Wait for initial health check to be 'ok'
    await expect(page.getByText('Server: ok')).toBeVisible();

    // Intercept next health check and return 'offline'
    await page.route('**/health', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'offline', timestamp: new Date().toISOString() }),
      });
    });

    // Click the refresh button (the one with the refresh icon)
    await page.locator('header button').last().click();

    // Now it should show 'offline' after the manual refresh
    await expect(page.getByText('Server: offline')).toBeVisible();
  });
});
