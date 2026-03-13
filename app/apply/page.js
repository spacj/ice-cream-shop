'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const POSITIONS = [
  'Ice Cream Maker',
  'Store Manager',
  'Customer Service',
  'Marketing Specialist',
  'Events Coordinator',
];

export default function Apply() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, 'applications'), {
        ...data,
        type: 'job_application',
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
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-6xl md:text-7xl text-gradient mb-4">
            Join Our Team
          </h1>
          <p className="text-gray-400 text-lg">
            We're looking for passionate individuals to bring Gelato Luxe to life
          </p>
        </motion.div>

        {/* Open Positions */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-12"
        >
          <h2 className="font-display text-2xl text-ice-pink mb-6">Open Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {POSITIONS.map((position, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass rounded-lg p-4 hover-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">{position}</span>
                  <span className="text-ice-gold">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          <h2 className="font-display text-3xl text-gradient-gold mb-8">Application Form</h2>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200"
            >
              ✓ Thank you for applying! We'll review your application soon.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200"
            >
              ✗ Error submitting application. Please try again.
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Full Name</label>
              <input
                {...register('fullName', { required: 'Full name is required' })}
                className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-pink transition-colors"
                placeholder="Your full name"
              />
              {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              {/* Phone */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Phone</label>
                <input
                  {...register('phone', { required: 'Phone is required' })}
                  className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-pink transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
              </motion.div>
            </div>

            {/* Position Applied For */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Position Applied For</label>
              <select
                {...register('position', { required: 'Please select a position' })}
                className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-pink transition-colors"
              >
                <option value="">Select a position</option>
                {POSITIONS.map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
              {errors.position && <p className="text-red-400 text-sm mt-1">{errors.position.message}</p>}
            </motion.div>

            {/* Experience */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Years of Experience</label>
              <input
                {...register('experience', { required: 'Experience is required' })}
                type="number"
                min="0"
                className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-pink transition-colors"
                placeholder="0"
              />
              {errors.experience && <p className="text-red-400 text-sm mt-1">{errors.experience.message}</p>}
            </motion.div>

            {/* Cover Letter */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Why do you want to join us?</label>
              <textarea
                {...register('coverLetter', { required: 'Please tell us about yourself' })}
                rows={6}
                className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-pink transition-colors resize-none"
                placeholder="Share your passion for our brand and your motivations..."
              />
              {errors.coverLetter && <p className="text-red-400 text-sm mt-1">{errors.coverLetter.message}</p>}
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
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
