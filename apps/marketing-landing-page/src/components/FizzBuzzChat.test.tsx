import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FizzBuzzChat } from './FizzBuzzChat';

describe('FizzBuzzChat', () => {
  it('should be closed by default', () => {
    render(<FizzBuzzChat />);
    expect(screen.queryByText(/FizzBuzz Chat/i)).toBeNull();
  });

  it('should open when the toggle button is clicked', async () => {
    const user = userEvent.setup();
    render(<FizzBuzzChat />);
    
    const toggleButton = screen.getByTestId('chat-toggle');
    await user.click(toggleButton);
    
    expect(screen.getByText(/FizzBuzz Chat/i)).toBeDefined();
    expect(screen.getByText(/How can I help you scale/i)).toBeDefined();
  });

  it('should send a message and receive the fixed response', async () => {
    const user = userEvent.setup();
    render(<FizzBuzzChat />);
    
    // Open chat
    const toggleButton = screen.getByTestId('chat-toggle');
    await user.click(toggleButton);
    
    // Type message
    const input = screen.getByTestId('chat-input');
    await user.type(input, 'Hello world');
    
    // Send message
    const sendButton = screen.getByTestId('chat-send');
    await user.click(sendButton);
    
    // Check user message is displayed
    expect(screen.getByText('Hello world')).toBeDefined();
    
    // Wait for AI response
    await waitFor(() => {
      expect(screen.getByText("You're absolutely right!")).toBeDefined();
    }, { timeout: 2000 });
  });

  it('should close when the close button is clicked', async () => {
    const user = userEvent.setup();
    render(<FizzBuzzChat />);
    
    // Open chat
    const toggleButton = screen.getByTestId('chat-toggle');
    await user.click(toggleButton);
    expect(screen.getByText(/FizzBuzz Chat/i)).toBeDefined();
    
    // Close chat
    const closeButton = screen.getByLabelText(/Close chat/i);
    await user.click(closeButton);
    
    // The component uses AnimatePresence, so it might take a moment to be removed from DOM
    // But since we are not using a real browser in Vitest/JSDOM, it might be immediate or we might need to wait
    await waitFor(() => {
      expect(screen.queryByText(/FizzBuzz Chat/i)).toBeNull();
    });
  });
});
