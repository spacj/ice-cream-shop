'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-6xl md:text-7xl text-gradient mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-400 text-lg">
            Have questions or suggestions? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: '📍', title: 'Location', content: 'Premium locations available' },
            { icon: '📧', title: 'Email', content: 'hello@gelatoluxe.com' },
            { icon: '📞', title: 'Phone', content: '+1 (555) 123-4567' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ delay: idx * 0.1 }}
              className="glass rounded-2xl p-6 text-center hover-lift"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-display text-xl text-ice-pink mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          <h2 className="font-display text-3xl text-gradient-gold mb-8">Send us a Message</h2>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200"
            >
              ✓ Thank you for your message! We'll get back to you soon.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200"
            >
              ✗ Error submitting message. Please try again.
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Name</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-pink transition-colors"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Email</label>
                <input
                  {...register('email', { required: 'Email is required', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                  type="email"
                  className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-pink transition-colors"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
              </motion.div>
            </div>

            {/* Subject */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Subject</label>
              <input
                {...register('subject', { required: 'Subject is required' })}
                className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-pink transition-colors"
                placeholder="What's this about?"
              />
              {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>}
            </motion.div>

            {/* Message */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Message</label>
              <textarea
                {...register('message', { required: 'Message is required' })}
                rows={6}
                className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-pink transition-colors resize-none"
                placeholder="Tell us more..."
              />
              {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full gradient-primary py-4 rounded-lg text-white font-semibold hover-lift disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
