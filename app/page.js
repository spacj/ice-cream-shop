'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 bg-ice-pink rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-96 h-96 bg-ice-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-4 text-center"
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Logo */}
          <motion.div
            className="flex justify-center mb-8"
            variants={itemVariants}
          >
            <Logo size={120} />
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="font-display text-6xl md:text-8xl mb-6 text-gradient"
            variants={itemVariants}
          >
            Gelato Luxe
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl md:text-3xl text-gray-300 mb-8 font-light"
            variants={itemVariants}
          >
            Where Craftsmanship Meets Indulgence
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-12"
            variants={itemVariants}
          >
            Experience premium ice cream crafted with the finest ingredients and stunning visual design. Each scoop tells a story of perfection.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Link
              href="/products"
              className="px-8 py-4 rounded-full gradient-primary text-white font-semibold text-lg hover-lift"
            >
              Explore Flavors
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full border-2 border-ice-blue text-ice-blue font-semibold text-lg hover-lift hover:bg-ice-blue hover:text-dark transition-smooth"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="font-display text-5xl md:text-6xl text-gradient-gold mb-4">
              The Art of Perfection
            </h2>
            <p className="text-gray-400 text-lg">
              Watch our meticulous craftsmanship in action
            </p>
          </motion.div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: item * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="aspect-video bg-gradient-to-br from-ice-pink/20 to-ice-blue/20 glass hover-lift">
                  <div className="w-full h-full flex items-center justify-center">
                    {/* Video placeholder with play button */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center cursor-pointer"
                    >
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark to-transparent">
                  <p className="text-white font-semibold">Premium Production #{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: '✨',
                title: 'Premium Quality',
                description: 'Only the finest ingredients sourced globally'
              },
              {
                icon: '🎨',
                title: 'Stunning Design',
                description: 'Visually captivating experiences in every detail'
              },
              {
                icon: '🌟',
                title: 'Pure Perfection',
                description: 'Crafted with meticulous attention to quality'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="glass p-8 rounded-2xl text-center hover-lift"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-display text-2xl mb-3 text-ice-pink">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
