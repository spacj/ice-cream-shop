'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const errorHandler = (event) => {
      setHasError(true);
      setError(event.message || 'An unexpected error occurred');
      console.error('Error caught by boundary:', event);
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', (event) => {
      setHasError(true);
      setError(event.reason?.message || 'An unexpected error occurred');
      console.error('Unhandled rejection:', event.reason);
    });

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center px-4 bg-cream"
      >
        <div className="max-w-md text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-3xl font-serif font-bold text-pistach-600 mb-4">
              Something went wrong
            </h1>
            <p className="text-grey-dark mb-2">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === 'development' && error && (
              <details className="mt-6 text-left bg-red-50 p-4 rounded-lg border border-red-200">
                <summary className="cursor-pointer font-semibold text-red-700 mb-2">
                  Error Details (Development Only)
                </summary>
                <p className="text-sm text-red-600 font-mono whitespace-pre-wrap break-words">
                  {error}
                </p>
              </details>
            )}
            <div className="flex gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setHasError(false);
                  setError(null);
                }}
                className="flex-1 px-6 py-2 bg-pistach-500 text-white rounded-lg hover:bg-pistach-600 font-semibold transition-colors"
              >
                Try Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/'}
                className="flex-1 px-6 py-2 border-2 border-pistach-500 text-pistach-600 rounded-lg hover:bg-pistach-50 font-semibold transition-colors"
              >
                Go Home
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return <>{children}</>;
}
