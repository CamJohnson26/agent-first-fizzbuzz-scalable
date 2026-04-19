import { test, expect } from '@playwright/test';

test.describe('Marketing Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5183/');
  });

  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/FizzBuzz Scalable/);
  });

  test('should redirect to Dashboard when clicking Start Free Trial', async ({ page }) => {
    await page.getByRole('button', { name: /Start Free Trial/i }).click();
    await expect(page).toHaveURL(/(vercel\.app|localhost:5184)/, { timeout: 30000 });
  });

  test('should redirect to Dashboard when clicking Dashboard button in nav', async ({ page }) => {
    await page.getByRole('button', { name: /Dashboard/i }).first().click();
    await expect(page).toHaveURL(/(vercel\.app|localhost:5184)/, { timeout: 30000 });
  });

  test('should navigate to Case Studies section', async ({ page }) => {
    await page.getByRole('button', { name: 'Case Studies' }).click();
    await expect(page.getByRole('heading', { name: 'Enterprise Case Studies' })).toBeVisible();
  });

  test('should navigate to Docs section', async ({ page }) => {
    await page.getByRole('button', { name: 'Docs' }).click();
    await expect(page.getByRole('heading', { name: 'Introduction to FizzBuzz Scalable' })).toBeVisible();
  });

  test('should return to home from Case Studies', async ({ page }) => {
    await page.getByRole('button', { name: 'Case Studies' }).click();
    await page.getByRole('button', { name: 'Back to Home' }).click();
    await expect(page.getByText('The Gold Standard for')).toBeVisible();
  });
});
