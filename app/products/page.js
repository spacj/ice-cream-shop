'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const FLAVORS = [
  {
    id: 1,
    name: 'Rose Garden',
    description: 'Delicate rose petals with white chocolate undertones',
    color: 'from-pink-400 to-rose-600',
    icon: '🌹'
  },
  {
    id: 2,
    name: 'Midnight Velvet',
    description: 'Rich dark chocolate with a hint of espresso',
    color: 'from-slate-800 to-slate-900',
    icon: '🌙'
  },
  {
    id: 3,
    name: 'Golden Honey',
    description: 'Pure honeycomb with caramelized sweetness',
    color: 'from-yellow-300 to-orange-500',
    icon: '🍯'
  },
  {
    id: 4,
    name: 'Arctic Mint',
    description: 'Crystalline mint with dark chocolate chunks',
    color: 'from-cyan-300 to-blue-600',
    icon: '❄️'
  },
  {
    id: 5,
    name: 'Passion Fruit Paradise',
    description: 'Exotic passion fruit with coconut whispers',
    color: 'from-orange-400 to-red-600',
    icon: '🌺'
  },
  {
    id: 6,
    name: 'Lavender Dreams',
    description: 'Serene lavender with subtle vanilla notes',
    color: 'from-purple-400 to-purple-700',
    icon: '💜'
  },
  {
    id: 7,
    name: 'Pistachio Paradise',
    description: 'Authentic Sicilian pistachio with a buttery finish',
    color: 'from-green-400 to-emerald-700',
    icon: '🌳'
  },
  {
    id: 8,
    name: 'Strawberry Sublime',
    description: 'Fresh strawberries blended with cream perfection',
    color: 'from-red-400 to-pink-600',
    icon: '🍓'
  },
];

export default function Products() {
  const [hoveredId, setHoveredId] = useState(null);

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

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-4"
      >
        <h1 className="font-display text-6xl md:text-7xl text-gradient mb-4">
          Our Flavors
        </h1>
        <p className="text-gray-400 text-lg">
          Discover our collection of premium ice cream flavors
        </p>
      </motion.div>

      {/* Filter/Category buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-4 mb-16 px-4 flex-wrap"
      >
        {['All', 'Fruity', 'Chocolate', 'Premium'].map((category) => (
          <button
            key={category}
            className="px-6 py-2 rounded-full glass hover:gradient-primary transition-smooth"
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Flavor Grid */}
      <motion.div
        className="max-w-7xl mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLAVORS.map((flavor) => (
            <motion.div
              key={flavor.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(flavor.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group cursor-pointer h-full"
            >
              {/* Card */}
              <motion.div
                className={`relative overflow-hidden rounded-2xl p-6 h-full glass hover-lift 
                  flex flex-col justify-between`}
                whileHover={{ y: -8 }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${flavor.color} opacity-0 
                  group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className="text-6xl mb-4"
                    animate={hoveredId === flavor.id ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
                  >
                    {flavor.icon}
                  </motion.div>

                  {/* Name */}
                  <h3 className="font-display text-2xl mb-3 text-white group-hover:text-ice-pink transition-colors">
                    {flavor.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {flavor.description}
                  </p>
                </div>

                {/* Hover action */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={hoveredId === flavor.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  className="relative z-10 mt-4 pt-4 border-t border-ice-pink/20"
                >
                  <button className="text-ice-pink hover:text-ice-gold transition-colors font-semibold">
                    Learn More →
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Featured Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-32 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 text-center">
            <h2 className="font-display text-4xl md:text-5xl text-gradient-gold mb-6">
              Limited Edition Collections
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Each season brings new, exclusive flavors crafted with rare and premium ingredients
            </p>
            <button className="px-8 py-4 gradient-primary rounded-full text-white font-semibold hover-lift">
              View Seasonal Flavors
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
