import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FizzBuzzChat } from './FizzBuzzChat';

describe('FizzBuzzChat', () => {
  it('should be open by default', () => {
    render(<FizzBuzzChat />);
    expect(screen.getByText(/FizzBuzz Chat/i)).toBeDefined();
  });

  it('should toggle when the toggle button is clicked', async () => {
    const user = userEvent.setup();
    render(<FizzBuzzChat />);
    
    // Should be open by default
    expect(screen.getByText(/FizzBuzz Chat/i)).toBeDefined();
    
    const toggleButton = screen.getByTestId('chat-toggle');
    await user.click(toggleButton);
    
    // Should now be closed
    await waitFor(() => {
      expect(screen.queryByText(/FizzBuzz Chat/i)).toBeNull();
    });
    
    // Toggle again
    await user.click(toggleButton);
    expect(screen.getByText(/FizzBuzz Chat/i)).toBeDefined();
  });

  it('should send a message and receive the fixed response', async () => {
    const user = userEvent.setup();
    render(<FizzBuzzChat />);
    
    // Chat is already open
    expect(screen.getByText(/FizzBuzz Chat/i)).toBeDefined();
    
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
    
    // Already open
    expect(screen.getByText(/FizzBuzz Chat/i)).toBeDefined();
    
    // Close chat
    const closeButton = screen.getByLabelText(/Close chat/i);
    await user.click(closeButton);
    
    // The component uses AnimatePresence, so it might take a moment to be removed from DOM
    await waitFor(() => {
      expect(screen.queryByText(/FizzBuzz Chat/i)).toBeNull();
    });
  });
});
