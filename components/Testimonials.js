'use client';

import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Elena Rossi',
    role: 'Food Critic',
    content: 'Gelato Luxe has redefined what ice cream can be. The flavor complexity and visual presentation are absolutely extraordinary.',
    rating: 5,
    emoji: '🥘'
  },
  {
    name: 'Marco Bianchi',
    role: 'Premium Lifestyle Magazine',
    content: 'A masterpiece of craftsmanship. Every detail, from the flavors to the aesthetic design, reflects pure dedication to excellence.',
    rating: 5,
    emoji: '📸'
  },
  {
    name: 'Sofia Marino',
    role: 'Luxury Event Planner',
    content: 'We served Gelato Luxe at our exclusive events. Guests were absolutely mesmerized by both the taste and the stunning presentation.',
    rating: 5,
    emoji: '✨'
  },
  {
    name: 'Luca Benedetti',
    role: 'Michelin Chef',
    content: 'The ingredient quality is comparable to what we source for fine dining. This is gelato at its finest.',
    rating: 5,
    emoji: '🌟'
  },
];

export default function Testimonials() {
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
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl text-gradient-gold mb-4">
            Loved by Experts
          </h2>
          <p className="text-gray-400 text-lg">
            Discover what industry leaders and customers say about Gelato Luxe
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                className="glass rounded-2xl p-6 h-full flex flex-col hover-lift"
                whileHover={{ y: -8 }}
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-ice-gold text-xl">★</span>
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 mb-6 flex-1 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{testimonial.emoji}</div>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-3 gap-6"
        >
          {[
            { number: '500+', label: 'Happy Customers' },
            { number: '4.9/5', label: 'Average Rating' },
            { number: '99%', label: 'Would Recommend' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-2xl p-6 text-center hover-lift"
            >
              <p className="font-display text-3xl md:text-4xl text-gradient-gold mb-2">{stat.number}</p>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
