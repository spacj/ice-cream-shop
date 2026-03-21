'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-8">
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg text-grey-dark">
              <p className="mb-6">Last updated: March 2026</p>
              
              <h2 className="text-2xl font-serif font-bold text-charcoal mt-8 mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Subscribe to our newsletter</li>
                <li>Contact us via email or social media</li>
                <li>Apply for job positions</li>
              </ul>
              
              <h2 className="text-2xl font-serif font-bold text-charcoal mt-8 mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Send newsletters and promotional materials</li>
                <li>Respond to your inquiries</li>
                <li>Process job applications</li>
                <li>Improve our services</li>
              </ul>
              
              <h2 className="text-2xl font-serif font-bold text-charcoal mt-8 mb-4">3. Cookies</h2>
              <p className="mb-4">
                We use cookies to enhance your browsing experience. You can control cookie preferences through our consent banner.
              </p>
              
              <h2 className="text-2xl font-serif font-bold text-charcoal mt-8 mb-4">4. Data Security</h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information.
              </p>
              
              <h2 className="text-2xl font-serif font-bold text-charcoal mt-8 mb-4">5. Contact Us</h2>
              <p>
                For privacy-related questions, contact us at{' '}
                <a href="mailto:privacy@pistacchio-utrecht.nl" className="text-pistach-600 hover:text-pistach-500">
                  privacy@pistacchio-utrecht.nl
                </a>
              </p>
            </div>
            
            <div className="mt-12">
              <Link 
                href="/"
                className="text-pistach-600 hover:text-pistach-500 font-semibold"
              >
                ← Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
