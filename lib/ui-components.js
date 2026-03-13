'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';

/**
 * Loading Skeleton Component
 */
export function LoadingSkeleton({ count = 3, height = 'h-64' }) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className={`${height} bg-gradient-to-r from-dark to-dark/50 rounded-lg`}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Modal/Dialog Component
 */
export function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${sizeClasses[size]} z-50`}
          >
            <div className="glass rounded-2xl p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div>{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Toast Notification Hook
 */
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [removeToast]);

  return { toasts, addToast, removeToast };
};

/**
 * Toast Container Component
 */
export function ToastContainer({ toasts, removeToast }) {
  const bgColors = {
    success: 'bg-green-500/20 border-green-500/50 text-green-200',
    error: 'bg-red-500/20 border-red-500/50 text-red-200',
    warning: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-200',
    info: 'bg-blue-500/20 border-blue-500/50 text-blue-200',
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm space-y-3">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`p-4 rounded-lg border ${bgColors[toast.type] || bgColors.info}`}
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-4 text-current hover:opacity-70"
              >
                ×
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Confirm Dialog Component
 */
export function ConfirmDialog({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false 
}) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} size="sm">
      <p className="text-gray-300 mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCancel}
          className="px-4 py-2 border border-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors"
        >
          {cancelText}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConfirm}
          className={`px-4 py-2 rounded-lg font-semibold text-white ${
            isDangerous
              ? 'bg-red-600 hover:bg-red-700'
              : 'gradient-primary'
          }`}
        >
          {confirmText}
        </motion.button>
      </div>
    </Modal>
  );
}

/**
 * Loading Spinner Component
 */
export function LoadingSpinner({ size = 'md' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizes[size]} border-4 border-ice-pink border-t-transparent rounded-full`}
    />
  );
}

/**
 * Progress Bar Component
 */
export function ProgressBar({ value, max = 100, showLabel = true }) {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full">
      <div className="w-full h-2 bg-dark/50 rounded-full overflow-hidden border border-ice-pink/20">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          className="h-full gradient-primary"
        />
      </div>
      {showLabel && (
        <p className="text-sm text-gray-400 mt-2">{Math.round(percentage)}%</p>
      )}
    </div>
  );
}

/**
 * Dropdown Menu Component
 */
export function Dropdown({ trigger, items, align = 'left' }) {
  const [isOpen, setIsOpen] = useState(false);

  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
  };

  return (
    <div className="relative inline-block">
      <button onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute ${alignClasses[align]} top-full mt-2 glass rounded-lg overflow-hidden z-50`}
          >
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-ice-pink/10 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
