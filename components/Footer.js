'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <img src="/logo.png" alt="Pistacchio Logo" className="w-12 h-12 object-contain" />
              <div>
                <h3 className="font-serif text-xl font-bold text-charcoal">
                  Pistacchio
                </h3>
                <p className="text-sm text-grey-light">Utrecht</p>
              </div>
            </motion.div>
            <p className="text-sm text-grey-dark">
              Authentic Sicilian pistachio gelato crafted with love and the finest
              ingredients from Italy. Visit us in Utrecht's historic center for a
              true taste of tradition.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link
                href="/privacy-policy"
                className="text-sm text-pistach-600 hover:text-pistach-500 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-pistach-600 hover:text-pistach-500 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-pistach-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-pistach-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-charcoal">Opening Hours</h3>
                <p className="text-sm text-grey-dark">
                  Mon-Thu: 12:00 - 22:00<br />
                  Fri-Sat: 11:00 - 23:00<br />
                  Sun: 12:00 - 21:00
                </p>
              </div>
            </motion.div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-pistach-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-pistach-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-charcoal">Follow Us</h3>
                <div className="flex gap-3 mt-2">
                  <Link
                    href="https://instagram.com/pistacchioutrecht"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl text-pistach-500 hover:text-pistach-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a2.2 2.2 0 01-2.2 2.2H7.8C5.6 18.2 3 15.6 3 12.6V7.8C3 4.6 5.6 2 7.8 2zM12 4C8 4 4 8 4 12s4 8 8 8 8-4 8-8-4-4-8-8zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4zm0-6c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://facebook.com/pistacchioutrecht"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl text-pistach-500 hover:text-pistach-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.675 0h-21.35C.6 0 0 .6 0 1.35v21.3c0 .75.6 1.35 1.35 1.35h8.79v-9h-3.8v-2.6h3.8V8.45c0-2.01 1.19-3.64 3.07-3.64 1.4 0 2.57.69 2.57 1.49v2.16h-3.38c-1.25 0-1.63.62-1.63 1.38V12h3.68l-.29 2.6h-3.39v9h4.61c.75 0 1.35-.6 1.35-1.35V1.35c0-.75-.6-1.35-1.35-1.35z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://twitter.com/pistacchioutrecht"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl text-pistach-500 hover:text-pistach-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-pistach-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-pistach-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-charcoal">Newsletter</h3>
                <p className="text-sm text-grey-dark">
                  Subscribe for monthly updates, special offers, and gelato news.
                </p>
                <form className="mt-4 flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-3 rounded-lg border border-beige bg-white text-charcoal placeholder-grey-light focus:outline-none focus:border-pistach-600 transition-colors"
                    required
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-pistach-600 text-white rounded-lg font-semibold hover:bg-pistach-700 transition-colors"
                  >
                    Subscribe
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-beige text-center text-sm text-grey-dark">
          &copy; {new Date().getFullYear()} Pistacchio Utrecht. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
