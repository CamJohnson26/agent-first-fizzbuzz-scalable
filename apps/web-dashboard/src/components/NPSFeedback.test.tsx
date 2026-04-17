import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NPSFeedback } from './NPSFeedback.js';

describe('NPSFeedback Component', () => {
  it('renders the initial score step', () => {
    const onSubmit = vi.fn();
    const onDismiss = vi.fn();
    render(<NPSFeedback onSubmit={onSubmit} onDismiss={onDismiss} />);

    expect(screen.getByText(/How likely are you to recommend/i)).toBeDefined();
    // Check for score buttons 0-10
    for (let i = 0; i <= 10; i++) {
      expect(screen.getByText(i.toString())).toBeDefined();
    }
  });

  it('switches to comment step after selecting a score', () => {
    const onSubmit = vi.fn();
    const onDismiss = vi.fn();
    render(<NPSFeedback onSubmit={onSubmit} onDismiss={onDismiss} />);

    fireEvent.click(screen.getByText('9'));

    expect(screen.getByText(/What is the main reason for your score of/i)).toBeDefined();
    expect(screen.getByText('9')).toBeDefined();
    expect(screen.getByPlaceholderText(/Tell us more/i)).toBeDefined();
  });

  it('calls onSubmit with score and comment when submitted', () => {
    const onSubmit = vi.fn();
    const onDismiss = vi.fn();
    render(<NPSFeedback onSubmit={onSubmit} onDismiss={onDismiss} />);

    fireEvent.click(screen.getByText('10'));
    
    const textarea = screen.getByPlaceholderText(/Tell us more/i);
    fireEvent.change(textarea, { target: { value: 'Awesome tool!' } });
    
    fireEvent.click(screen.getByText(/Submit Feedback/i));

    expect(onSubmit).toHaveBeenCalledWith(10, 'Awesome tool!');
  });

  it('calls onDismiss when close button is clicked', () => {
    const onSubmit = vi.fn();
    const onDismiss = vi.fn();
    render(<NPSFeedback onSubmit={onSubmit} onDismiss={onDismiss} />);

    // The close button is the one with the X icon, variant ghost
    // I'll try to find it by clicking the button that has the X icon if possible, 
    // or just find the first ghost button which is the close one in the header.
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]); // The first button is the close button

    expect(onDismiss).toHaveBeenCalled();
  });

  it('allows going back to score step', () => {
    const onSubmit = vi.fn();
    const onDismiss = vi.fn();
    render(<NPSFeedback onSubmit={onSubmit} onDismiss={onDismiss} />);

    fireEvent.click(screen.getByText('5'));
    expect(screen.getByRole('button', { name: /^back$/i })).toBeDefined();
    
    fireEvent.click(screen.getByRole('button', { name: /^back$/i }));
    expect(screen.getByText(/How likely are you to recommend/i)).toBeDefined();
  });
});
