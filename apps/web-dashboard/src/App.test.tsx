import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import React from 'react';

describe('Web Dashboard App', () => {
  it('renders the dashboard title', () => {
    render(<App />);
    const titleElement = screen.getByText(/FizzBuzz/i);
    const dashboardElement = screen.getByText(/Dashboard/i);
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
});
