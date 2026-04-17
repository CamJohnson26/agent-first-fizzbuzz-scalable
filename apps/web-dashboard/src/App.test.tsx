import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock fetch
globalThis.fetch = vi.fn() as any;

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
    vi.mocked(fetch).mockImplementation((url: any) => {
      const urlStr = typeof url === 'string' ? url : url.toString();
      if (urlStr.includes('/health')) {
        return Promise.resolve({ ok: true, json: async () => ({ status: 'ok', timestamp: new Date().toISOString() }) } as Response);
      }
      if (urlStr.includes('/stats')) {
        return Promise.resolve({ ok: true, json: async () => ({ totalLogs: 0, logsByService: {} }) } as Response);
      }
      if (urlStr.includes('/range')) {
        return Promise.resolve({ ok: true, json: async () => ({ results: ['1', '2', 'Fizz'] }) } as Response);
      }
      return Promise.reject(new Error('Unknown URL: ' + urlStr));
    });

    render(<App />);
    
    const generateButton = screen.getByText(/Generate Range Results/i);
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(screen.getByText(/Export Results/i)).toBeDefined();
    }, { timeout: 3000 });

    // Check for format buttons
    expect(screen.getByText(/CSV/i)).toBeDefined();
    expect(screen.getByText(/JSON/i)).toBeDefined();
    expect(screen.getByText(/PDF/i)).toBeDefined();
    expect(screen.getByText(/Excel/i)).toBeDefined();
  });
});
