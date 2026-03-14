'use client';

import { motion } from 'framer-motion';

export function LoadingSpinner({ 
  size = 'md', 
  message = 'Loading...',
  inline = false 
}) {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const spinnerBorderWidth = size === 'xs' ? '1px' : size === 'sm' ? '2px' : '3px';

  const spinnerContent = (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-pistach-200 border-t-pistach-500 rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );

  if (inline) {
    return <>{spinnerContent}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {spinnerContent}
      {message && <span className="text-grey-dark text-sm">{message}</span>}
    </div>
  );
}

export function SkeletonLoader({ 
  width = 'w-full', 
  height = 'h-8', 
  count = 1,
  className = '' 
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={`skeleton-${i}`}
          className={`${width} ${height} bg-gradient-to-r from-beige via-cream to-beige rounded-lg`}
          animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <LoadingSpinner size="lg" message="Loading..." />
      </div>
    </div>
  );
}
