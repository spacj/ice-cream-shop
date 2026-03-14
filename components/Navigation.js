'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, logout } = useAuthStore();

  return (
    <nav className="fixed top-0 w-full z-50 bg-cream/95 backdrop-blur-md border-b border-beige shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pistach-500 to-caramel flex items-center justify-center group-hover:shadow-lg transition-shadow">
            <span className="text-xl">🌿</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm tracking-widest text-pistach-500 font-semibold">PISTACCHIO</p>
            <p className="text-xs text-grey-light">Utrecht</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <Link href="/" className="text-charcoal hover:text-pistach-600 font-medium text-sm tracking-wide transition-colors">
            Home
          </Link>
          <Link href="/products" className="text-charcoal hover:text-pistach-600 font-medium text-sm tracking-wide transition-colors">
            Flavors
          </Link>
          <Link href="/blog" className="text-charcoal hover:text-pistach-600 font-medium text-sm tracking-wide transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-charcoal hover:text-pistach-600 font-medium text-sm tracking-wide transition-colors">
            Contact
          </Link>

          {isAdmin && (
            <Link href="/admin" className="px-4 py-2 bg-pistach-500 text-white rounded font-semibold text-sm hover:bg-pistach-600 transition-colors">
              Admin
            </Link>
          )}

          {!isAdmin && !user && (
            <Link href="/admin/login" className="px-4 py-2 border border-pistach-500 text-pistach-500 rounded font-semibold text-sm hover:bg-pistach-50 transition-colors">
              Admin
            </Link>
          )}

          {user && isAdmin && (
            <button
              onClick={logout}
              className="px-4 py-2 text-charcoal hover:text-pistach-600 font-semibold text-sm transition-colors"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-charcoal p-2 rounded-md hover:bg-cream transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          id="mobile-navigation"
          role="navigation"
          aria-label="Mobile navigation menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-beige p-4 space-y-4"
        >
          <Link href="/" className="block text-charcoal hover:text-pistach-600 font-medium transition-colors">Home</Link>
          <Link href="/products" className="block text-charcoal hover:text-pistach-600 font-medium transition-colors">Flavors</Link>
          <Link href="/blog" className="block text-charcoal hover:text-pistach-600 font-medium transition-colors">About</Link>
          <Link href="/contact" className="block text-charcoal hover:text-pistach-600 font-medium transition-colors">Contact</Link>
          {isAdmin && <Link href="/admin" className="block text-pistach-600 font-medium">Admin</Link>}
          {!isAdmin && !user && <Link href="/admin/login" className="block text-pistach-600 font-medium">Admin</Link>}
          {user && isAdmin && <button onClick={logout} className="block text-charcoal hover:text-pistach-600 font-medium">Logout</button>}
        </motion.div>
      )}
    </nav>
  );
}
