'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Terms() {
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
              Terms of Service
            </h1>
            
            <div className="prose prose-lg text-grey-dark">
              <p className="mb-6">Last updated: March 2026</p>
              
              <h2 className="text-2xl font-serif font-bold text-charcoal mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.
              </p>
              
              <h2 className="text-2xl font-serif font-bold text-charcoal mt-8 mb-4">2. Use of Website</h2>
              <p className="mb-4">
                You may use this website for lawful purposes only. You agree not to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Interfere with the proper functioning of the website</li>
                <li>Attempt to gain unauthorized access</li>
              </ul>
              
              <h2 className="text-2xl font-serif font-bold text-charcoal mt-8 mb-4">3. Intellectual Property</h2>
              <p className="mb-4">
                All content on this website, including text, graphics, logos, and images, is the property of Pistacchio Utrecht and protected by copyright laws.
              </p>
              
              <h2 className="text-2xl font-serif font-bold text-charcoal mt-8 mb-4">4. Product Information</h2>
              <p className="mb-4">
                We strive to display accurate product information. However, we do not warrant that product descriptions or other content is accurate, complete, or current.
              </p>
              
              <h2 className="text-2xl font-serif font-bold text-charcoal mt-8 mb-4">5. Limitation of Liability</h2>
              <p className="mb-4">
                Pistacchio Utrecht shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of this website.
              </p>
              
              <h2 className="text-2xl font-serif font-bold text-charcoal mt-8 mb-4">6. Contact</h2>
              <p>
                Questions about these terms? Contact us at{' '}
                <a href="mailto:legal@pistacchio-utrecht.nl" className="text-pistach-600 hover:text-pistach-500">
                  legal@pistacchio-utrecht.nl
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
