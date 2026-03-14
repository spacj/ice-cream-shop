'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { motion } from 'framer-motion';
import Logo from './Logo';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, logout } = useAuthStore();

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-red-200 bg-white/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pistachio-500 to-red-600 flex items-center justify-center">
            <span className="text-xl">🌿</span>
          </div>
          <span className="font-display text-2xl hidden md:block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pistachio-600">Pistacchio</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-dark hover:text-red-600 transition-colors font-medium">
            Home
          </Link>
          <Link href="/products" className="text-dark hover:text-red-600 transition-colors font-medium">
            Flavors
          </Link>
          <Link href="/blog" className="text-dark hover:text-red-600 transition-colors font-medium">
            Stories
          </Link>
          <Link href="/apply" className="text-dark hover:text-red-600 transition-colors font-medium">
            Join Us
          </Link>
          <Link href="/contact" className="text-dark hover:text-red-600 transition-colors font-medium">
            Contact
          </Link>

          {isAdmin && (
            <Link href="/admin" className="gradient-red px-4 py-2 rounded-full text-white font-semibold hover-lift">
              Admin
            </Link>
          )}

          {!isAdmin && !user && (
            <Link href="/admin/login" className="gradient-red px-4 py-2 rounded-full text-white font-semibold hover-lift">
              Admin Login
            </Link>
          )}

          {user && isAdmin && (
            <button
              onClick={logout}
              className="px-4 py-2 rounded-full border-2 border-red-600 text-red-600 hover:bg-red-50 transition-colors font-medium"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-red-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-red-200 p-4"
        >
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-dark hover:text-red-600 transition-colors font-medium">Home</Link>
            <Link href="/products" className="text-dark hover:text-red-600 transition-colors font-medium">Flavors</Link>
            <Link href="/blog" className="text-dark hover:text-red-600 transition-colors font-medium">Stories</Link>
            <Link href="/apply" className="text-dark hover:text-red-600 transition-colors font-medium">Join Us</Link>
            <Link href="/contact" className="text-dark hover:text-red-600 transition-colors font-medium">Contact</Link>
            {isAdmin && <Link href="/admin" className="text-red-600 font-medium">Admin</Link>}
            {!isAdmin && !user && <Link href="/admin/login" className="text-red-600 font-medium">Admin Login</Link>}
            {user && isAdmin && <button onClick={logout} className="text-red-600 font-medium">Logout</button>}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
