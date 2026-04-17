import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Textarea } from './Textarea.js';

describe('Textarea Component', () => {
  afterEach(cleanup);

  it('renders correctly', () => {
    render(<Textarea placeholder="Test placeholder" />);
    expect(screen.getByPlaceholderText('Test placeholder')).toBeDefined();
  });

  it('applies custom className', () => {
    render(<Textarea className="custom-class" />);
    expect(screen.getByRole('textbox').className).toContain('custom-class');
  });

  it('passes other props to textarea', () => {
    render(<Textarea defaultValue="Initial value" />);
    expect(screen.getByRole('textbox').innerHTML).toContain(''); // Value is not in innerHTML for textarea
    expect((screen.getByRole('textbox') as HTMLTextAreaElement).value).toBe('Initial value');
  });
});
