import { test, expect } from '@playwright/test';

test.describe('Marketing Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5183/agent-first-fizzbuzz-scalable/');
  });

  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/FizzBuzz Scalable/);
  });

  test('should show Coming Soon modal when clicking Start Free Trial', async ({ page }) => {
    await page.getByRole('button', { name: /Start Free Trial/i }).click();
    await expect(page.getByRole('heading', { name: 'Coming Soon' })).toBeVisible();
    await page.getByRole('button', { name: 'Got it' }).click();
    await expect(page.getByRole('heading', { name: 'Coming Soon' })).not.toBeVisible();
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
