'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { LocationSection, ReviewsSection } from '@/lib/location-reviews';
import { FadeInOnScroll } from '@/lib/scroll-animations';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...data,
        type: 'inquiry',
        createdAt: serverTimestamp(),
        status: 'new'
      });
      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-red-50 pt-32">
      {/* Hero */}
      <section className="py-20 px-4 mb-20">
        <div className="max-w-4xl mx-auto">
          <FadeInOnScroll>
            <h1 className="font-display text-6xl md:text-7xl text-red-600 text-center mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-taupe text-center max-w-2xl mx-auto">
              Have questions about our pistachio gelato? We'd love to hear from you!
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Location Section */}
      <LocationSection />

      {/* Contact Form */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <FadeInOnScroll>
            <div className="glass rounded-3xl p-12 border border-red-200">
              <h2 className="font-display text-4xl text-red-600 mb-8">Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-700"
                >
                  ✓ Thank you for your message! We'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-700"
                >
                  ✗ Error submitting message. Please try again.
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-dark mb-2">Name</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-red-200 bg-white text-dark placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-dark mb-2">Email</label>
                  <input
                    {...register('email', { required: 'Email is required', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-red-200 bg-white text-dark placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                </motion.div>

                {/* Subject */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-dark mb-2">Subject</label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-lg border border-red-200 bg-white text-dark placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
                  />
                  {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>}
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-dark mb-2">Message</label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={6}
                    placeholder="Tell us more..."
                    className="w-full px-4 py-3 rounded-lg border border-red-200 bg-white text-dark placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
                  />
                  {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 bg-gradient-red text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Reviews */}
      <ReviewsSection 
        googleRating={4.8}
        reviewCount={246}
      />

      {/* Follow Us Section */}
      <section className="py-20 px-4 bg-red-50">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInOnScroll>
            <h2 className="font-display text-4xl text-red-600 mb-8">Follow Our Journey</h2>
            <p className="text-lg text-taupe mb-12">Connect with us on social media for daily updates and exclusive content</p>
            
            <div className="flex justify-center gap-6">
              {[
                { icon: '📷', name: 'Instagram' },
                { icon: '👍', name: 'Facebook' },
                { icon: '𝕏', name: 'Twitter' },
              ].map((social) => (
                <motion.button
                  key={social.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  viewport={{ once: true }}
                  className="text-5xl hover:opacity-80 transition-opacity"
                  title={social.name}
                >
                  {social.icon}
                </motion.button>
              ))}
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </div>
  );
}
