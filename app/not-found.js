'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-ice-pink rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-ice-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        {/* Logo with animation */}
        <motion.div
          className="flex justify-center mb-8"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Logo size={100} />
        </motion.div>

        {/* 404 Text */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-display text-8xl md:text-9xl text-gradient mb-4">
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-display text-4xl md:text-5xl text-ice-pink mb-4"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 text-lg mb-8"
        >
          Oops! It seems the page you're looking for has melted away. Don't worry, let's get you back to where the magic happens.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="px-8 py-4 gradient-primary rounded-full text-white font-semibold hover-lift inline-block"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="px-8 py-4 border-2 border-ice-blue text-ice-blue rounded-full font-semibold hover-lift inline-block hover:bg-ice-blue hover:text-dark transition-colors"
          >
            Explore Flavors
          </Link>
        </motion.div>

        {/* Fun message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-500 text-sm mt-12 italic"
        >
          Here's a scoop: the page you want doesn't exist at this URL. 🍦
        </motion.p>
      </motion.div>
    </div>
  );
}
