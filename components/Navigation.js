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
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo size={48} />
          <span className="font-display text-xl hidden md:block">Gelato Luxe</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-white hover:text-ice-pink transition-smooth">
            Home
          </Link>
          <Link href="/products" className="text-white hover:text-ice-pink transition-smooth">
            Products
          </Link>
          <Link href="/blog" className="text-white hover:text-ice-pink transition-smooth">
            Blog
          </Link>
          <Link href="/apply" className="text-white hover:text-ice-pink transition-smooth">
            Apply
          </Link>
          <Link href="/contact" className="text-white hover:text-ice-pink transition-smooth">
            Contact
          </Link>

          {isAdmin && (
            <Link href="/admin" className="gradient-primary px-4 py-2 rounded-full text-white font-semibold hover-lift">
              Admin
            </Link>
          )}

          {!isAdmin && !user && (
            <Link href="/admin/login" className="gradient-primary px-4 py-2 rounded-full text-white font-semibold hover-lift">
              Admin Login
            </Link>
          )}

          {user && isAdmin && (
            <button
              onClick={logout}
              className="px-4 py-2 rounded-full border border-ice-pink text-ice-pink hover:bg-ice-pink hover:text-white transition-smooth"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
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
          className="md:hidden bg-dark border-t border-ice-pink/20 p-4"
        >
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-white hover:text-ice-pink">Home</Link>
            <Link href="/products" className="text-white hover:text-ice-pink">Products</Link>
            <Link href="/blog" className="text-white hover:text-ice-pink">Blog</Link>
            <Link href="/apply" className="text-white hover:text-ice-pink">Apply</Link>
            <Link href="/contact" className="text-white hover:text-ice-pink">Contact</Link>
            {isAdmin && <Link href="/admin" className="text-ice-pink">Admin</Link>}
            {!isAdmin && !user && <Link href="/admin/login" className="text-ice-pink">Admin Login</Link>}
            {user && isAdmin && <button onClick={logout} className="text-ice-pink">Logout</button>}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
