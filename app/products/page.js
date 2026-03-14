'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FadeInOnScroll } from '@/lib/scroll-animations';
import { PremiumImage } from '@/lib/media-components';

const FLAVORS = [
  {
    id: 1,
    name: 'Pistacchio Classico',
    description: 'Pure essence of authentic Sicilian pistachio from Bronte. No additives, no artificial flavors—just the unadulterated taste of the world\'s finest pistachio nuts.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=600&fit=crop&q=85',
    origin: 'Bronte, Sicily',
    notes: ['Nutty', 'Buttery', 'Creamy'],
    premium: true
  },
  {
    id: 2,
    name: 'Pistacchio & Nocciola',
    description: 'A harmonious blend of premium Sicilian pistachio with Italian hazelnut. A sophisticated pairing that brings together two of Italy\'s most celebrated nut traditions.',
    image: 'https://images.unsplash.com/photo-1583114614970-cd1525b85b88?w=600&h=600&fit=crop&q=85',
    origin: 'Sicily & Piedmont',
    notes: ['Rich', 'Nutty', 'Smooth'],
    premium: true
  },
  {
    id: 3,
    name: 'Pistacchio & Cioccolato',
    description: 'Luxurious pistachio gelato enriched with dark Belgian chocolate. A modern interpretation of a classic pairing that celebrates both ingredients.',
    image: 'https://images.unsplash.com/photo-1629866066033-28d6af2d51b6?w=600&h=600&fit=crop&q=85',
    origin: 'Sicily & Belgium',
    notes: ['Chocolatey', 'Nutty', 'Decadent'],
    premium: true
  },
  {
    id: 4,
    name: 'Pistachio & Caramel',
    description: 'Sweet, buttery caramel swirled through creamy pistachio gelato. A flavor journey that balances the earthy pistachio with rich caramelized sweetness.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=600&fit=crop&q=85',
    origin: 'Sicily',
    notes: ['Sweet', 'Nutty', 'Balanced'],
    premium: true
  },
  {
    id: 5,
    name: 'Pistachio Affogato',
    description: 'Our signature pistachio gelato crafted to be the perfect companion to a shot of hot espresso. The temperature contrast brings out subtle vanilla notes.',
    image: 'https://images.unsplash.com/photo-1583114614970-cd1525b85b88?w=600&h=600&fit=crop&q=85',
    origin: 'Sicily & Italy',
    notes: ['Nutty', 'Coffee-forward', 'Creamy'],
    premium: false
  },
  {
    id: 6,
    name: 'Pistachio Granita Blend',
    description: 'A limited seasonal offering that combines our pistachio gelato with our refreshing granita, perfect for warm days. Only available in summer.',
    image: 'https://images.unsplash.com/photo-1629866066033-28d6af2d51b6?w=600&h=600&fit=crop&q=85',
    origin: 'Sicily',
    notes: ['Refreshing', 'Nutty', 'Seasonal'],
    premium: false
  },
];

const ABOUT_SECTIONS = [
  {
    id: 'sourcing',
    icon: '🌾',
    title: 'Direct Sourcing',
    description: 'We source pistachio directly from family farms in Bronte, Sicily. Each season, we visit the growers to select only the finest nuts.'
  },
  {
    id: 'batch',
    icon: '🏭',
    title: 'Small Batch Production',
    description: 'Every batch of gelato is handcrafted in limited quantities. This allows us to maintain uncompromising quality standards.'
  },
  {
    id: 'pure',
    icon: '✨',
    title: 'Pure Ingredients',
    description: 'No artificial colors, flavors, or stabilizers. Our gelato is made with simple, premium ingredients you can pronounce.'
  },
  {
    id: 'award',
    icon: '🏆',
    title: 'Award Winning',
    description: 'Our commitment to quality has been recognized by international gelato competitions and culinary awards.'
  },
];

export default function Products() {
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [filter, setFilter] = useState('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const filteredFlavors = filter === 'all' ? FLAVORS : filter === 'premium' ? FLAVORS.filter(f => f.premium) : FLAVORS.filter(f => !f.premium);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-cream">
      {/* ===== HERO SECTION ===== */}
      <section className="px-4 mb-20">
        <div className="max-w-4xl mx-auto">
          <FadeInOnScroll>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <p className="text-pistach-500 text-sm tracking-widest uppercase mb-4 font-semibold">
                Our Collection
              </p>
              <h1 className="font-serif text-6xl md:text-7xl text-charcoal mb-6">
                Pistachio Creations
              </h1>
              <div className="w-20 h-1 bg-caramel mx-auto mb-8"></div>
              <p className="text-xl text-grey-dark max-w-2xl mx-auto">
                Each flavor celebrates the distinctive taste of authentic Sicilian pistachio, crafted with meticulous attention to quality and tradition.
              </p>
            </motion.div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ===== FILTER BUTTONS ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-4 mb-16 px-4 flex-wrap"
      >
        {[
          { label: 'All Flavors', value: 'all' },
          { label: 'Signature', value: 'premium' },
          { label: 'Seasonal', value: 'seasonal' }
        ].map((btn) => (
          <motion.button
            key={btn.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(btn.value)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              filter === btn.value
                ? 'bg-pistach-600 text-white shadow-lg'
                : 'bg-white border border-beige text-charcoal hover:border-pistach-500'
            }`}
          >
            {btn.label}
          </motion.button>
        ))}
      </motion.div>

      {/* ===== FLAVOR GRID ===== */}
      <section className="px-4 mb-32">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFlavors.map((flavor) => (
              <motion.div
                key={flavor.id}
                variants={itemVariants}
                onClick={() => setSelectedFlavor(flavor.id)}
                className="cursor-pointer group h-full"
              >
                {/* Card */}
                <motion.div
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all h-full flex flex-col"
                  whileHover={{ y: -8 }}
                >
                  {/* Image */}
                  <div className="aspect-square overflow-hidden relative bg-grey-light">
                    <PremiumImage
                      src={flavor.image}
                      alt={flavor.name}
                      className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    {flavor.premium && (
                      <div className="absolute top-4 right-4 bg-caramel text-white px-3 py-1 rounded-full text-xs font-semibold">
                        SIGNATURE
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    {/* Title & Origin */}
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-charcoal mb-2">
                        {flavor.name}
                      </h3>
                      <p className="text-pistach-600 text-sm font-semibold mb-4">
                        📍 {flavor.origin}
                      </p>
                      <p className="text-grey-dark text-sm leading-relaxed mb-4">
                        {flavor.description}
                      </p>
                    </div>

                    {/* Notes */}
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {flavor.notes.map((note) => (
                          <span
                            key={note}
                            className="px-3 py-1 bg-pistach-50 text-pistach-700 text-xs font-semibold rounded-full"
                          >
                            {note}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="text-pistach-600 font-semibold text-sm flex items-center gap-2 hover:text-pistach-700 transition-colors"
                      >
                        Discover More →
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== QUALITY STANDARDS ===== */}
      <section className="px-4 mb-32 bg-gradient-to-b from-cream to-ivory py-20 rounded-lg">
        <div className="max-w-6xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <p className="text-pistach-500 text-sm tracking-widest uppercase mb-4 font-semibold">
                Why Pistacchio
              </p>
              <h2 className="font-serif text-5xl md:text-6xl text-charcoal mb-6">
                Crafted with Excellence
              </h2>
              <div className="w-20 h-1 bg-caramel mx-auto"></div>
            </div>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ABOUT_SECTIONS.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white rounded-lg p-8 shadow-sm"
              >
                <div className="text-5xl mb-4">{section.icon}</div>
                <h3 className="font-serif text-xl font-bold text-charcoal mb-3">
                  {section.title}
                </h3>
                <p className="text-grey-dark text-sm leading-relaxed">
                  {section.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TASTING ROOM CTA ===== */}
      <section className="px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-pistach-600 to-pistach-700 rounded-lg p-12 text-center text-white"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Ready to Taste the Difference?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-95">
            Visit our gelato boutique in Utrecht's historic center to experience the authentic taste of Sicilian pistachio crafted with passion and tradition.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white text-pistach-600 rounded-lg font-semibold text-lg hover:bg-cream transition-colors"
          >
            Visit Pistacchio Utrecht
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
