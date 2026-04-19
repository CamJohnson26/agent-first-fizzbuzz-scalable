import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CookieBanner } from './CookieBanner';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('CookieBanner', () => {
  const onAccept = vi.fn();
  const onDecline = vi.fn();
  const onPrivacyPolicyClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.useFakeTimers();
  });

  it('shows the banner after 1 second if no consent is stored', async () => {
    render(
      <CookieBanner 
        onAccept={onAccept} 
        onDecline={onDecline} 
        onPrivacyPolicyClick={onPrivacyPolicyClick} 
      />
    );

    expect(screen.queryByText(/Cookie Consent/i)).toBeNull();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/Cookie Consent/i)).toBeDefined();
  });

  it('does not show the banner if consent is already stored', () => {
    localStorage.setItem('cookie-consent', 'accepted');
    
    render(
      <CookieBanner 
        onAccept={onAccept} 
        onDecline={onDecline} 
        onPrivacyPolicyClick={onPrivacyPolicyClick} 
      />
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.queryByText(/Cookie Consent/i)).toBeNull();
  });

  it('calls onAccept and stores consent when "Accept All" is clicked', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <CookieBanner 
        onAccept={onAccept} 
        onDecline={onDecline} 
        onPrivacyPolicyClick={onPrivacyPolicyClick} 
      />
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    vi.useRealTimers();

    const acceptButton = screen.getByRole('button', { name: /Accept All/i });
    await user.click(acceptButton);

    expect(onAccept).toHaveBeenCalled();
    expect(localStorage.getItem('cookie-consent')).toBe('accepted');
    expect(screen.queryByText(/Cookie Consent/i)).toBeNull();
  });

  it('calls onDecline and stores consent when "Decline" is clicked', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <CookieBanner 
        onAccept={onAccept} 
        onDecline={onDecline} 
        onPrivacyPolicyClick={onPrivacyPolicyClick} 
      />
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    vi.useRealTimers();

    const declineButton = screen.getByRole('button', { name: /Decline/i });
    await user.click(declineButton);

    expect(onDecline).toHaveBeenCalled();
    expect(localStorage.getItem('cookie-consent')).toBe('declined');
    expect(screen.queryByText(/Cookie Consent/i)).toBeNull();
  });

  it('calls onPrivacyPolicyClick when link is clicked', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <CookieBanner 
        onAccept={onAccept} 
        onDecline={onDecline} 
        onPrivacyPolicyClick={onPrivacyPolicyClick} 
      />
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    vi.useRealTimers();

    const privacyLink = screen.getByText(/Read our Privacy Policy/i);
    await user.click(privacyLink);

    expect(onPrivacyPolicyClick).toHaveBeenCalled();
  });
});
