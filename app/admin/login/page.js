'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import Logo from '@/components/Logo';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/admin');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-ice-pink rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, 100, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 bg-ice-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, -100, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md glass rounded-3xl p-8 md:p-12"
      >
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-8"
          whileHover={{ scale: 1.1 }}
        >
          <Logo size={80} />
        </motion.div>

        {/* Title */}
        <h1 className="font-display text-3xl text-gradient mb-2 text-center">
          Admin Access
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Manage your Gelato Luxe dashboard
        </p>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-pink transition-colors"
              placeholder="admin@gelatoluxe.com"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-pink transition-colors"
              placeholder="••••••••"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full gradient-primary py-3 rounded-lg text-white font-semibold hover-lift disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </motion.div>
        </form>

        {/* Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 text-center text-sm mt-8"
        >
          Admin credentials required. Contact your administrator for access.
        </motion.p>
      </motion.div>
    </div>
  );
}
