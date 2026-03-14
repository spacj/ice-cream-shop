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
    <nav className="fixed top-0 w-full z-50 glass border-b border-pistachio-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="text-4xl">🌿</span>
          <span className="font-display text-2xl hidden md:block text-pistachio-700">Pistacchio</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-pistachio-700 hover:text-pistachio-600 transition-smooth font-medium">
            Home
          </Link>
          <Link href="/products" className="text-pistachio-700 hover:text-pistachio-600 transition-smooth font-medium">
            Flavors
          </Link>
          <Link href="/blog" className="text-pistachio-700 hover:text-pistachio-600 transition-smooth font-medium">
            Stories
          </Link>
          <Link href="/apply" className="text-pistachio-700 hover:text-pistachio-600 transition-smooth font-medium">
            Join Us
          </Link>
          <Link href="/contact" className="text-pistachio-700 hover:text-pistachio-600 transition-smooth font-medium">
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
              className="px-4 py-2 rounded-full border border-pistachio-600 text-pistachio-600 hover:bg-pistachio-50 transition-smooth"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-pistachio-700"
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
          className="md:hidden bg-white border-t border-pistachio-200 p-4"
        >
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-pistachio-700 hover:text-pistachio-600 font-medium">Home</Link>
            <Link href="/products" className="text-pistachio-700 hover:text-pistachio-600 font-medium">Flavors</Link>
            <Link href="/blog" className="text-pistachio-700 hover:text-pistachio-600 font-medium">Stories</Link>
            <Link href="/apply" className="text-pistachio-700 hover:text-pistachio-600 font-medium">Join Us</Link>
            <Link href="/contact" className="text-pistachio-700 hover:text-pistachio-600 font-medium">Contact</Link>
            {isAdmin && <Link href="/admin" className="text-pistachio-600 font-medium">Admin</Link>}
            {!isAdmin && !user && <Link href="/admin/login" className="text-pistachio-600 font-medium">Admin Login</Link>}
            {user && isAdmin && <button onClick={logout} className="text-pistachio-600 font-medium">Logout</button>}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
