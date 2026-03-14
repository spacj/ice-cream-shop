'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { LocationSection, ReviewsSection } from '@/lib/location-reviews';
import { FadeInOnScroll } from '@/lib/scroll-animations';
import { formValidationRules, sanitizeFormData } from '@/lib/validation';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      const sanitizedData = sanitizeFormData(data);
      
      await addDoc(collection(db, 'inquiries'), {
        ...sanitizedData,
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
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-pistach-50 pt-32">
      {/* Hero */}
      <section className="py-20 px-4 mb-20">
        <div className="max-w-4xl mx-auto">
          <FadeInOnScroll>
            <h1 className="font-serif text-6xl md:text-7xl text-pistach-600 text-center mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-grey-dark text-center max-w-2xl mx-auto">
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
            <div className="glass rounded-3xl p-12 border border-beige">
              <h2 className="font-serif text-4xl text-pistach-600 mb-8">Send us a Message</h2>
              
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
                  <label htmlFor="name-input" className="block text-sm font-semibold text-charcoal mb-2">
                    Name <span className="text-pistach-600">*</span>
                  </label>
                  <input
                    id="name-input"
                    {...register('name', formValidationRules.name)}
                    placeholder="Your full name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby="name-error"
                    className="w-full px-4 py-3 rounded-lg border border-beige bg-white text-charcoal placeholder-grey-light focus:outline-none focus:border-pistach-600 transition-colors"
                  />
                  {errors.name && (
                    <p id="name-error" className="text-pistach-600 text-sm mt-1" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="email-input" className="block text-sm font-semibold text-charcoal mb-2">
                    Email <span className="text-pistach-600">*</span>
                  </label>
                  <input
                    id="email-input"
                    {...register('email', formValidationRules.email)}
                    type="email"
                    placeholder="your@email.com"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                    className="w-full px-4 py-3 rounded-lg border border-beige bg-white text-charcoal placeholder-grey-light focus:outline-none focus:border-pistach-600 transition-colors"
                  />
                  {errors.email && (
                    <p id="email-error" className="text-pistach-600 text-sm mt-1" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </motion.div>

                {/* Subject */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="subject-input" className="block text-sm font-semibold text-charcoal mb-2">
                    Subject <span className="text-pistach-600">*</span>
                  </label>
                  <input
                    id="subject-input"
                    {...register('subject', formValidationRules.subject)}
                    placeholder="What's this about?"
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                    aria-describedby="subject-error"
                    className="w-full px-4 py-3 rounded-lg border border-beige bg-white text-charcoal placeholder-grey-light focus:outline-none focus:border-pistach-600 transition-colors"
                  />
                  {errors.subject && (
                    <p id="subject-error" className="text-pistach-600 text-sm mt-1" role="alert">
                      {errors.subject.message}
                    </p>
                  )}
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="message-input" className="block text-sm font-semibold text-charcoal mb-2">
                    Message <span className="text-pistach-600">*</span>
                  </label>
                  <textarea
                    id="message-input"
                    {...register('message', formValidationRules.message)}
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby="message-error"
                    className="w-full px-4 py-3 rounded-lg border border-beige bg-white text-charcoal placeholder-grey-light focus:outline-none focus:border-pistach-600 transition-colors resize-none"
                  />
                  {errors.message && (
                    <p id="message-error" className="text-pistach-600 text-sm mt-1" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className="w-full px-8 py-4 bg-pistach-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:bg-pistach-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <LoadingSpinner size="sm" inline />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
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
      <section className="py-20 px-4 bg-pistach-50">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInOnScroll>
            <h2 className="font-serif text-4xl text-pistach-600 mb-8">Follow Our Journey</h2>
            <p className="text-lg text-grey-dark mb-12">Connect with us on social media for daily updates and exclusive content</p>
            
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
