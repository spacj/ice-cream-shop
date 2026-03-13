'use client';

import { motion } from 'framer-motion';
import Logo from '@/components/Logo';

export default function Info() {
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

  const values = [
    {
      icon: '🎨',
      title: 'Artisanal Craftsmanship',
      description: 'Every scoop is crafted with meticulous attention to detail and passion for excellence.',
    },
    {
      icon: '🌿',
      title: 'Premium Ingredients',
      description: 'We source only the finest, ethically-sourced ingredients from around the world.',
    },
    {
      icon: '✨',
      title: 'Visual Excellence',
      description: 'Our focus on stunning design and presentation elevates every experience.',
    },
    {
      icon: '❤️',
      title: 'Pure Passion',
      description: 'Founded on the belief that ice cream is more than dessert—it\'s pure indulgence.',
    },
  ];

  const stats = [
    { number: '500+', label: 'Loyal Customers' },
    { number: '32', label: 'Signature Flavors' },
    { number: '5', label: 'Years of Excellence' },
    { number: '100%', label: 'Satisfaction Guaranteed' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 overflow-hidden">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-6xl md:text-8xl text-gradient mb-4">
            Our Story
          </h1>
          <p className="text-gray-400 text-lg">
            A journey of passion, craftsmanship, and premium ice cream
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="font-display text-4xl text-ice-pink">
              Gelato Luxe
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              What began as a dream to create the world's most exquisite ice cream has blossomed into a movement. We believe that ice cream is not merely a treat—it's a moment of pure indulgence, a celebration of life's sweetest moments.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              Every flavor is a masterpiece, every experience is premium. We've dedicated ourselves to sourcing the finest ingredients globally and crafting each batch with meticulous attention to detail. Our commitment to visual excellence means every presentation is as stunning as the taste.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              Join us in celebrating the art of ice cream craftsmanship.
            </p>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex justify-center"
          >
            <Logo size={280} />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 text-center hover-lift"
            >
              <p className="font-display text-4xl text-gradient-gold mb-2">{stat.number}</p>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-20"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl text-gradient-gold text-center mb-12"
        >
          Our Values
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass rounded-2xl p-6 hover-lift"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="font-display text-xl text-ice-pink mb-3">{value.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-20"
      >
        <h2 className="font-display text-5xl text-gradient-gold text-center mb-12">
          Our Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Marco Rossi', role: 'Founder & Master Gelato Maker', emoji: '👨‍🍳' },
            { name: 'Sofia Marino', role: 'Creative Director', emoji: '👩‍🎨' },
            { name: 'Luca Benedetti', role: 'Premium Ingredient Sourcer', emoji: '👨‍🌾' },
          ].map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 text-center hover-lift"
            >
              <div className="text-6xl mb-4">{member.emoji}</div>
              <h3 className="font-display text-2xl text-ice-pink mb-2">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="glass rounded-3xl p-8 md:p-12 text-center">
          <h2 className="font-display text-4xl text-gradient-gold mb-6">
            Experience Gelato Luxe
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Visit us and taste the difference that passion and premium ingredients make.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 gradient-primary rounded-full text-white font-semibold hover-lift cursor-pointer"
          >
            Get in Touch
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}
