import { describe, it, expect } from 'vitest';
import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
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

  it('opens a case study modal when clicking a case study', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Navigate to case studies
    const caseStudiesLink = screen.getByRole('button', { name: /Case Studies/i });
    await user.click(caseStudiesLink);
    
    // Find and click a case study button
    const readFullCaseStudyButtons = screen.getAllByRole('button', { name: /Read Full Case Study/i });
    await user.click(readFullCaseStudyButtons[0]);
    
    // Verify modal content using within(dialog)
    const modal = screen.getByRole('dialog', { name: /Case Study/i });
    expect(within(modal).getByText(/Scaling Financial Logic/i)).toBeDefined();
    expect(within(modal).getAllByText(/Global Bank of America/i).length).toBeGreaterThan(0);
    
    // Close the modal
    const closeButton = screen.getByRole('button', { name: /Close Case Study/i });
    await user.click(closeButton);
    
    await waitForElementToBeRemoved(() => screen.queryByText(/Scaling Financial Logic/i));
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
    expect(screen.getByText(/Building for Scale/i)).toBeDefined();
    
    // Click a post
    const postTitle = screen.getByText(/Building for Scale/i);
    await user.click(postTitle);
    
    // Check if post content is rendered
    expect(await screen.findByText(/The Monorepo Challenge/i)).toBeDefined();
    
    const backToAllPosts = screen.getByRole('button', { name: /Back to all posts/i });
    await user.click(backToAllPosts);
    
    expect(await screen.findByRole('heading', { level: 1, name: /Inside/i })).toBeDefined();
    
    const backHomeButton = screen.getByRole('button', { name: /Back to Home/i });
    await user.click(backHomeButton);
    
    expect(screen.getAllByText(/Gold Standard/i)).toBeDefined();
  });

  it('redirects to dashboard when clicking relevant buttons', async () => {
    const user = userEvent.setup();
    // @ts-ignore
    const originalLocation = window.location;
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { ...originalLocation, href: '' };

    render(<App />);
    
    const startFreeTrialButtons = screen.getAllByRole('button', { name: /Coming Soon|Start Free Trial/i });
    await user.click(startFreeTrialButtons[0]);
    
    expect(window.location.href).toBe('https://agent-first-fizzbuzz-scalable-web-d.vercel.app/');
    
    // @ts-ignore
    window.location = originalLocation;
  });

  it('has a Twitter link that points to #', () => {
    render(<App />);
    const twitterLink = screen.getByRole('link', { name: /Twitter/i });
    expect(twitterLink.getAttribute('href')).toBe('#');
  });
});
