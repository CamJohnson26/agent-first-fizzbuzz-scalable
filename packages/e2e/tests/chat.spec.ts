import { test, expect } from '@playwright/test';

test.describe('FizzBuzz Chat', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the marketing page where the chat component is located
    await page.goto('http://localhost:5183/agent-first-fizzbuzz-scalable/');
  });

  test('should be open by default', async ({ page }) => {
    // By default, the chat window should be visible
    await expect(page.getByText('FizzBuzz Chat')).toBeVisible();
  });

  test('should toggle when clicking the toggle button', async ({ page }) => {
    // Check if the chat window is visible
    await expect(page.getByText('FizzBuzz Chat')).toBeVisible();

    // Click the toggle button to close the chat
    await page.getByTestId('chat-toggle').click();
    
    // Check if the chat window is now hidden
    await expect(page.getByText('FizzBuzz Chat')).not.toBeVisible();

    // Click again to open
    await page.getByTestId('chat-toggle').click();
    await expect(page.getByText('FizzBuzz Chat')).toBeVisible();
  });

  test('should send a message and receive a response', async ({ page }) => {
    // Chat is already open by default
    await expect(page.getByText('FizzBuzz Chat')).toBeVisible();
    
    // Type a message into the input
    const input = page.getByTestId('chat-input');
    await input.fill('Is FizzBuzz truly enterprise-grade?');
    
    // Click the send button
    await page.getByTestId('chat-send').click();
    
    // Verify our message is shown
    await expect(page.getByText('Is FizzBuzz truly enterprise-grade?')).toBeVisible();
    
    // Wait for the mocked AI response (it has a 1s delay in the component)
    await expect(page.getByText("You're absolutely right!")).toBeVisible({ timeout: 5000 });
  });

  test('should close when clicking the close button', async ({ page }) => {
    // Chat is already open by default
    await expect(page.getByText('FizzBuzz Chat')).toBeVisible();
    
    // Click the close button
    await page.getByRole('button', { name: /Close chat/i }).click();
    
    // Verify it is closed (Wait for any exit animation if necessary)
    await expect(page.getByText('FizzBuzz Chat')).not.toBeVisible();
  });
});
