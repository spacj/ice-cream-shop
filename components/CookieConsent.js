'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(() => {
    // Check if consent was already given
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cookieConsent') !== 'accepted';
    }
    return true;
  });

  useEffect(() => {
    // If user has already accepted, don't show banner
    if (typeof window !== 'undefined' && localStorage.getItem('cookieConsent') === 'accepted') {
      setShowBanner(false);
    }
  }, []);

  const acceptCookies = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieConsent', 'accepted');
      setShowBanner(false);
    }
  };

  const rejectCookies = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieConsent', 'rejected');
      setShowBanner(false);
    }
  };

  if (!showBanner) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-pistach-600/95 backdrop-blur-sm text-white px-4 py-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 10c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">We use cookies</h2>
          </div>
          <p className="text-sm">
            We use cookies to improve your browsing experience, analyze site traffic, and personalize content.
            By continuing to use our site, you accept our use of cookies.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={acceptCookies}
              className="flex-1 px-4 py-2 bg-white text-pistach-600 rounded-lg font-semibold hover:bg-pistach-50 transition-colors"
            >
              Accept All
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={rejectCookies}
              className="flex-1 px-4 py-2 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Reject
            </motion.button>
          </div>
          <p className="text-xs mt-2">
            <a href="/privacy-policy" className="underline hover:text-white/80">
              Learn more about our cookie policy
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
