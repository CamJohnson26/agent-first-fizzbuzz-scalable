import { describe, it, expect } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders the landing page title', () => {
    render(<App />);
    expect(screen.getAllByText(/Gold Standard/i)).toBeDefined();
  });

  it('navigates to case studies and back', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const caseStudiesLink = screen.getByRole('button', { name: /Case Studies/i });
    await user.click(caseStudiesLink);
    
    expect(screen.getByText(/Success Stories/i)).toBeDefined();
    expect(screen.getByRole('heading', { level: 1, name: /Case Studies/i })).toBeDefined();
    
    const backHomeButton = screen.getByRole('button', { name: /Back to Home/i });
    await user.click(backHomeButton);
    
    expect(screen.getAllByText(/Gold Standard/i)).toBeDefined();
  });

  it('navigates to documentation and back', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const docsLink = screen.getByRole('button', { name: /^Docs$/i });
    await user.click(docsLink);
    
    expect(screen.getByText(/Introduction to FizzBuzz Scalable/i)).toBeDefined();
    
    const backHomeButton = screen.getByRole('button', { name: /Back to Home/i });
    await user.click(backHomeButton);
    
    expect(screen.getAllByText(/Gold Standard/i)).toBeDefined();
  });

  it('navigates to blog and back', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const blogLink = screen.getByRole('button', { name: /^Blog$/i });
    await user.click(blogLink);
    
    expect(await screen.findByRole('heading', { level: 1, name: /Inside/i })).toBeDefined();
    
    // Check if blog posts are rendered
    expect(screen.getByText(/The Architecture of Speed/i)).toBeDefined();
    
    // Click a post
    const postTitle = screen.getByText(/The Architecture of Speed/i);
    await user.click(postTitle);
    
    // Check if post content is rendered
    expect(await screen.findByText(/Our Strategic Command Center/i)).toBeDefined();
    
    const backToAllPosts = screen.getByRole('button', { name: /Back to all posts/i });
    await user.click(backToAllPosts);
    
    expect(await screen.findByRole('heading', { level: 1, name: /Inside/i })).toBeDefined();
    
    const backHomeButton = screen.getByRole('button', { name: /Back to Home/i });
    await user.click(backHomeButton);
    
    expect(screen.getAllByText(/Gold Standard/i)).toBeDefined();
  });

  it('opens "Coming Soon" modal when clicking relevant buttons', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const startFreeTrialButtons = screen.getAllByRole('button', { name: /Coming Soon|Start Free Trial/i });
    await user.click(startFreeTrialButtons[0]);
    
    const modalText = screen.getByText(/We're putting the finishing touches/i);
    expect(modalText).toBeDefined();
    
    const closeButton = screen.getByRole('button', { name: /Got it/i });
    await user.click(closeButton);
    
    await waitForElementToBeRemoved(() => screen.queryByText(/We're putting the finishing touches/i));
  });

  it('has a Twitter link that points to #', () => {
    render(<App />);
    const twitterLink = screen.getByRole('link', { name: /Twitter/i });
    expect(twitterLink.getAttribute('href')).toBe('#');
  });
});
