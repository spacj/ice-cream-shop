'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FadeInOnScroll, SlideInOnScroll, ParallaxSection, StaggerContainer } from '@/lib/scroll-animations';
import { LocationSection, ReviewsSection, GoogleRating } from '@/lib/location-reviews';

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
    <div className="overflow-hidden bg-gradient-to-b from-pistachio-50 via-cream to-vanilla">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20">
        {/* Animated background - Italian inspired with red accents */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
            animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-96 h-96 bg-pistachio-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-80 h-80 bg-mediterranean rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            animate={{ y: [0, 50, 0], x: [0, -50, 0] }}
            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
            animate={{ y: [0, -80, 0], x: [0, 60, 0] }}
            transition={{ duration: 14, repeat: Infinity, delay: 4 }}
          />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
        >
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pistachio-500 to-red-600 flex items-center justify-center shadow-lg glow-pistachio">
                <span className="text-6xl">🌿</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="font-display text-6xl md:text-8xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pistachio-600 to-red-600"
            variants={itemVariants}
          >
            Pistacchio
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl md:text-3xl text-red-600 mb-8 font-light italic"
            variants={itemVariants}
          >
            Genuino Italiano
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg text-dark max-w-2xl mx-auto mb-12 leading-relaxed"
            variants={itemVariants}
          >
            Experience the authentic taste of Sicily with our handcrafted pistachio gelato. Every scoop is a celebration of Italian tradition, crafted with love and the finest pistachio from the heart of Italy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 justify-center mb-16"
            variants={itemVariants}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-primary text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <Link href="/products">Discover Flavors</Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border-2 border-pistachio-600 text-pistachio-600 font-semibold text-lg hover:bg-pistachio-50 transition-colors"
            >
              <Link href="/contact">Reserve Now</Link>
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center"
          >
            <p className="text-pistachio-600 text-sm font-medium mb-2">Scroll to explore</p>
            <svg
              className="w-6 h-6 mx-auto text-pistachio-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section with Parallax */}
      <ParallaxSection offset={100}>
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <FadeInOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left - Image/Icon */}
                <motion.div
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="w-full h-96 bg-gradient-to-br from-pistachio-200 to-pistachio-100 rounded-3xl flex items-center justify-center shadow-xl">
                    <div className="text-center">
                      <div className="text-8xl mb-4">🌰</div>
                      <p className="text-2xl font-display text-pistachio-700">Sicilian Pistachio</p>
                    </div>
                  </div>
                </motion.div>

                {/* Right - Text */}
                <motion.div
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-display text-5xl md:text-6xl text-pistachio-700 mb-6">
                    A Taste of Italy
                  </h2>
                  <p className="text-lg text-taupe mb-6 leading-relaxed">
                    Born from the volcanic soils of Sicily, our pistachio is nurtured by centuries of Italian tradition. Each nut is hand-selected and roasted to perfection, delivering the authentic flavor that made Pistacchio world-famous.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {['100% Sicilian Pistachio', 'Handcrafted Daily', 'No Artificial Colors', 'Sustainable Farming'].map((item) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-taupe"
                      >
                        <span className="text-pistachio-600 font-bold">✓</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>
      </ParallaxSection>

      {/* Flavors Showcase Section */}
      <section className="py-20 px-4 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <FadeInOnScroll>
            <h2 className="font-display text-6xl text-pistachio-700 text-center mb-4">
              Our Collection
            </h2>
            <p className="text-center text-taupe text-lg mb-16 max-w-2xl mx-auto">
              Explore our signature pistachio creations, each inspired by Italian tradition
            </p>
          </FadeInOnScroll>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Pistacchio Classico',
                  description: 'The pure essence of Sicilian pistachio',
                  emoji: '💚',
                  color: 'from-pistachio-200 to-pistachio-300'
                },
                {
                  name: 'Pistacchio & Nocciola',
                  description: 'Pistachio blended with Italian hazelnut',
                  emoji: '🤎',
                  color: 'from-warm-beige to-sand'
                },
                {
                  name: 'Pistacchio & Cioccolato',
                  description: 'Rich pistachio with dark chocolate notes',
                  emoji: '💛',
                  color: 'from-amber to-gold'
                }
              ].map((flavor) => (
                <motion.div
                  key={flavor.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(152, 222, 100, 0.2)' }}
                  className="bg-gradient-to-br p-8 rounded-2xl text-center glass"
                >
                  <div className="text-6xl mb-4">{flavor.emoji}</div>
                  <h3 className="font-display text-2xl text-pistachio-700 mb-3">{flavor.name}</h3>
                  <p className="text-taupe mb-6">{flavor.description}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-2 rounded-full bg-gradient-primary text-white font-semibold text-sm"
                  >
                    Try Now
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { stat: '50+', label: 'Years of Tradition' },
                { stat: '10K+', label: 'Happy Customers' },
                { stat: '100%', label: 'Pure Ingredients' },
                { stat: '365', label: 'Days of Perfection' }
              ].map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-5xl font-display text-pistachio-600 mb-2">
                    {item.stat}
                  </div>
                  <p className="text-taupe text-lg">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection 
        googleRating={4.8}
        reviewCount={246}
        reviews={[
          {
            author: 'Maria Rossi',
            rating: 5,
            text: 'Authentic pistachio gelato that tastes like home! The flavor is incredible and reminds me of gelato from my hometown in Sicily.',
            date: 'Last month',
            verified: true
          },
          {
            author: 'Giovanni Bianchi',
            rating: 5,
            text: 'Best pistachio gelato I\'ve had outside of Italy. The quality of the pistachio is outstanding!',
            date: '3 weeks ago',
            verified: true
          },
          {
            author: 'Lucia Ferraro',
            rating: 5,
            text: 'Genuinely delicious! Every time I visit, I\'m blown away by the freshness and purity of flavors.',
            date: '2 weeks ago',
            verified: true
          },
          {
            author: 'Marco Conti',
            rating: 5,
            text: 'As someone from Palermo, I can confirm this is the real deal. Fantastic gelato!',
            date: '1 week ago',
            verified: true
          },
          {
            author: 'Sophie Martin',
            rating: 5,
            text: 'A true taste of Sicily! Wonderful creamy texture and authentic pistachio flavor.',
            date: '5 days ago',
            verified: true
          },
          {
            author: 'Antonio Lombardi',
            rating: 4,
            text: 'Excellent quality gelato. The variety of flavors is impressive and everything is fresh.',
            date: '3 days ago',
            verified: true
          }
        ]}
      />

      {/* Location Section */}
      <LocationSection />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-red">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInOnScroll>
            <h2 className="font-display text-5xl md:text-6xl text-white mb-6">
              Experience Sicilian Bliss
            </h2>
            <p className="text-white text-lg mb-8 opacity-90">
              Order your Pistacchio gelato today and taste the authentic flavor of Italy
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-red-600 rounded-full font-semibold text-lg shadow-lg"
            >
              <Link href="/contact">Order Now</Link>
            </motion.button>
          </FadeInOnScroll>
        </div>
      </section>
    </div>
  );
}
