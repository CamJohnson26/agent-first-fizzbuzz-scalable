import { useState, useEffect } from 'react';
import { Button } from '@fizzbuzz/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

interface CookieBannerProps {
  onAccept?: () => void;
  onDecline?: () => void;
  onPrivacyPolicyClick: () => void;
}

export function CookieBanner({ onAccept, onDecline, onPrivacyPolicyClick }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = typeof localStorage !== 'undefined' ? localStorage.getItem('cookie-consent') : null;
      if (!consent) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('LocalStorage not available', e);
    }
  }, []);

  const handleAccept = () => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('cookie-consent', 'accepted');
      }
    } catch (e) {
      console.warn('LocalStorage not available', e);
    }
    setIsVisible(false);
    onAccept?.();
  };

  const handleDecline = () => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('cookie-consent', 'declined');
      }
    } catch (e) {
      console.warn('LocalStorage not available', e);
    }
    setIsVisible(false);
    onDecline?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 z-[100] md:left-auto md:max-w-md"
        >
          <div className="bg-surface border border-border p-6 rounded-3xl shadow-2xl backdrop-blur-md bg-surface/90">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Cookie Consent</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use cookies to enhance your experience and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                </p>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleAccept} className="flex-1 rounded-xl">
                Accept All
              </Button>
              <Button onClick={handleDecline} variant="outline" className="flex-1 rounded-xl">
                Decline
              </Button>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={onPrivacyPolicyClick}
                className="text-xs text-muted-foreground hover:text-primary underline transition-colors"
              >
                Read our Privacy Policy
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
