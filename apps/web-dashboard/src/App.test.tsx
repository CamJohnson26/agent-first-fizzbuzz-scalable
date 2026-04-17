import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock fetch
global.fetch = vi.fn();

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('Web Dashboard App', () => {
  it('renders the dashboard title', () => {
    render(<App />);
    const titleElement = screen.getAllByText(/FizzBuzz/i)[0];
    const dashboardElement = screen.getAllByText(/Dashboard/i)[0];
    expect(titleElement).toBeDefined();
    expect(dashboardElement).toBeDefined();
  });

  it('renders the system status card', () => {
    render(<App />);
    expect(screen.getByText(/System Status/i)).toBeDefined();
  });

  it('renders the single computation card', () => {
    render(<App />);
    expect(screen.getByText(/Single Computation/i)).toBeDefined();
  });

  it('renders the range computation card', () => {
    render(<App />);
    expect(screen.getByText(/Range Computation/i)).toBeDefined();
  });

  it('shows export options after generating range results', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: ['1', '2', 'Fizz'] }),
    } as Response);

    render(<App />);
    
    const generateButton = screen.getByText(/Generate Range Results/i);
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(screen.getByText(/Export Results/i)).toBeDefined();
    });

    // Check for format buttons
    expect(screen.getByText(/CSV/i)).toBeDefined();
    expect(screen.getByText(/JSON/i)).toBeDefined();
    expect(screen.getByText(/PDF/i)).toBeDefined();
    expect(screen.getByText(/Excel/i)).toBeDefined();
  });
});
