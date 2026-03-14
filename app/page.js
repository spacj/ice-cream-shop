'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FadeInOnScroll } from '@/lib/scroll-animations';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="overflow-hidden bg-cream">
      {/* HERO - PRODUCT SHOWCASE */}
      <section className="relative w-full min-h-screen flex items-stretch pt-32">
        {/* Image Background - takes 60% of space */}
        <div className="absolute inset-0 top-32">
          <div className="w-full h-full bg-gradient-to-br from-ivory via-off-white to-vanilla flex items-center justify-center">
            {/* Placeholder for premium product photography */}
            <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <p className="text-grey-light text-sm tracking-widest uppercase mb-6">
                  Artisanal Gelato Crafted Daily
                </p>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-charcoal mb-6 leading-tight">
                  Pistacchio
                </h1>
                <p className="text-2xl md:text-3xl text-pistach-500 font-light mb-8">
                  Premium Sicilian Gelato in Utrecht
                </p>
                <div className="w-32 h-32 md:w-48 md:h-48 mx-auto bg-gradient-to-br from-pistach-400 to-caramel rounded-full shadow-2xl flex items-center justify-center my-12">
                  <span className="text-7xl md:text-9xl">🌿</span>
                </div>
                <p className="text-grey-dark text-lg max-w-2xl mx-auto leading-relaxed">
                  Hand-crafted daily from the finest Sicilian pistachio, sustainably sourced and prepared with uncompromising attention to quality.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Overlay - positioned on right */}
        <div className="relative z-10 w-full lg:w-1/2 ml-auto flex items-center"></div>
      </section>

      {/* FEATURED FLAVORS - LARGE SHOWCASES */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-pistach-500 text-sm tracking-widest uppercase mb-4">
              Our Signature Collection
            </p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-charcoal">
              Handcrafted Flavors
            </h2>
            <div className="w-20 h-1 bg-caramel mx-auto mt-6"></div>
          </motion.div>

          {/* 3-Column Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                name: 'Pistacchio Classico',
                description: 'Pure essence of Sicilian pistachio',
                image: '🌿',
                color: 'from-pistach-100 to-pistach-50'
              },
              {
                name: 'Pistacchio & Nocciola',
                description: 'Pistachio with Italian hazelnut',
                image: '🤎',
                color: 'from-gold-light to-vanilla'
              },
              {
                name: 'Pistacchio & Cioccolato',
                description: 'Rich pistachio with dark chocolate',
                image: '💚',
                color: 'from-pistach-200 to-charcoal/10'
              }
            ].map((flavor, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                {/* Large Image Box */}
                <div className={`bg-gradient-to-br ${flavor.color} rounded-none aspect-square flex items-center justify-center text-9xl mb-8 overflow-hidden transition-transform duration-500 group-hover:scale-105`}>
                  {flavor.image}
                </div>
                
                {/* Product Info */}
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-3">
                  {flavor.name}
                </h3>
                <p className="text-grey-dark text-lg mb-6">
                  {flavor.description}
                </p>
                <motion.button
                  whileHover={{ x: 10 }}
                  className="text-pistach-600 font-semibold flex items-center gap-2 hover:text-pistach-700 transition-colors"
                >
                  Discover More →
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE CRAFT - OUR STORY */}
      <section className="py-32 px-4 bg-pistach-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Large Image */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="bg-gradient-to-br from-caramel to-gold-dark rounded-lg aspect-square flex items-center justify-center text-9xl shadow-lg">
                👨‍🍳
              </div>
            </motion.div>

            {/* Right - Text */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <p className="text-pistach-500 text-sm tracking-widest uppercase mb-4">
                Craftsmanship
              </p>
              <h2 className="text-5xl font-serif font-bold text-charcoal mb-8">
                Passion for Gelato
              </h2>
              <div className="w-20 h-1 bg-caramel mb-8"></div>
              
              <p className="text-grey-dark text-lg mb-6 leading-relaxed">
                Every scoop of Pistacchio represents our unwavering commitment to excellence. We source the finest Sicilian pistachio directly from family farms in Bronte, Sicily—a region renowned for producing the world's most prized pistachio nuts.
              </p>
              
              <p className="text-grey-dark text-lg mb-8 leading-relaxed">
                Our gelato is handcrafted daily in small batches, using traditional Italian techniques combined with modern quality standards. We never use artificial colors, flavors, or stabilizers.
              </p>

              <ul className="space-y-4">
                {[
                  'Sicilian Pistachio Sourced Directly',
                  'Small Batch Handcrafted Daily',
                  'No Artificial Additives',
                  'Traditional Italian Techniques'
                ].map((item) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 text-grey-dark"
                  >
                    <span className="text-pistach-500 text-2xl">✓</span>
                    <span className="text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* QUALITY STANDARDS */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-pistach-500 text-sm tracking-widest uppercase mb-4">
              Quality Commitment
            </p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-charcoal">
              The Pistacchio Difference
            </h2>
            <div className="w-20 h-1 bg-caramel mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🌾', title: 'Direct Sourcing', desc: 'From family farms in Sicily' },
              { icon: '🏭', title: 'Daily Batch', desc: 'Small batches, fresh flavor' },
              { icon: '✨', title: 'Pure Ingredients', desc: 'No artificial additives' },
              { icon: '🏆', title: 'Award Winning', desc: 'Recognized excellence' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-charcoal mb-2">{item.title}</h3>
                <p className="text-grey-dark">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS & SOCIAL PROOF */}
      <section className="py-32 px-4 bg-pistach-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-pistach-500 text-sm tracking-widest uppercase mb-4">
              Loved by Gelato Enthusiasts
            </p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-charcoal">
              What Our Guests Say
            </h2>
            <div className="w-20 h-1 bg-caramel mx-auto mt-6"></div>
          </motion.div>

          {/* Google Rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16 py-12 bg-white rounded-lg"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-4xl text-caramel">★</span>
              ))}
            </div>
            <p className="text-5xl font-bold text-charcoal mb-2">4.9 / 5.0</p>
            <p className="text-grey-dark text-lg">Based on 246 verified Google reviews</p>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="inline-block mt-6 px-8 py-3 bg-pistach-500 text-white rounded-lg font-semibold hover:bg-pistach-600 transition-colors"
            >
              Read Reviews →
            </motion.a>
          </motion.div>

          {/* Review Samples */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { author: 'Maria K.', text: 'Exceptional quality. This is authentic gelato.' },
              { author: 'Jan D.', text: 'The best pistachio gelato in Utrecht, hands down.' },
              { author: 'Sophie M.', text: 'Tastes like Italy. Truly crafted with passion.' }
            ].map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-caramel">★</span>
                  ))}
                </div>
                <p className="text-grey-dark mb-4 italic">"{review.text}"</p>
                <p className="font-semibold text-charcoal">— {review.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION - VISIT US */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-pistach-500 text-sm tracking-widest uppercase mb-4">
                Visit Us
              </p>
              <h2 className="text-5xl font-serif font-bold text-charcoal mb-8">
                Pistacchio Utrecht
              </h2>
              <div className="w-20 h-1 bg-caramel mb-8"></div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-sm tracking-widest uppercase text-pistach-500 font-semibold mb-2">
                    Location
                  </h3>
                  <p className="text-lg text-grey-dark">
                    Korte Jansstraat 23<br/>
                    3512 GN Utrecht, Netherlands
                  </p>
                </div>

                <div>
                  <h3 className="text-sm tracking-widest uppercase text-pistach-500 font-semibold mb-2">
                    Hours
                  </h3>
                  <p className="text-grey-dark">
                    Monday - Thursday: 12:00 - 22:00<br/>
                    Friday - Saturday: 11:00 - 23:00<br/>
                    Sunday: 12:00 - 21:00
                  </p>
                </div>

                <div>
                  <h3 className="text-sm tracking-widest uppercase text-pistach-500 font-semibold mb-2">
                    Contact
                  </h3>
                  <p className="text-grey-dark">
                    <a href="tel:+31612345678" className="hover:text-pistach-500 transition-colors">
                      +31 (0)6 1234 5678
                    </a><br/>
                    <a href="mailto:hello@pistacchio-utrecht.nl" className="hover:text-pistach-500 transition-colors">
                      hello@pistacchio-utrecht.nl
                    </a>
                  </p>
                </div>

                <motion.a
                  href="https://www.google.com/maps/search/Pistacchio+Utrecht"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="inline-block px-8 py-4 bg-pistach-500 text-white rounded-lg font-semibold hover:bg-pistach-600 transition-colors"
                >
                  Get Directions
                </motion.a>
              </div>
            </motion.div>

            {/* Right - Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-pistach-100 to-ivory rounded-lg aspect-square flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-8xl mb-4">📍</div>
                <p className="text-xl font-semibold text-charcoal">Utrecht, Netherlands</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA - VISIT TODAY */}
      <section className="py-20 px-4 bg-gradient-to-r from-pistach-600 to-pistach-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              Experience Pistacchio
            </h2>
            <p className="text-lg text-pistach-100 mb-12 max-w-2xl mx-auto">
              Visit our gelato boutique in Utrecht's historic center and taste the difference that premium craftsmanship makes.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-pistach-600 rounded-lg font-semibold text-lg hover:bg-cream transition-colors"
            >
              Visit Us Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
