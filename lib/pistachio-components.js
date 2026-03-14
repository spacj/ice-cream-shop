'use client';

import { motion } from 'framer-motion';

/**
 * Pistachio themed Button variants
 */
export function PistachioButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) {
  const variants = {
    primary: 'bg-gradient-primary text-white hover:shadow-lg',
    secondary: 'border-2 border-pistachio-600 text-pistachio-600 hover:bg-pistachio-50',
    outline: 'border-2 border-pistachio-300 text-pistachio-700 hover:bg-pistachio-100',
    ghost: 'text-pistachio-600 hover:bg-pistachio-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`rounded-full font-semibold transition-all ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/**
 * Pistachio Card Component
 */
export function PistachioCard({ 
  title, 
  description, 
  icon, 
  onClick,
  gradient = 'from-pistachio-100 to-pistachio-50'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(152, 222, 100, 0.15)' }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      onClick={onClick}
      className={`bg-gradient-to-br ${gradient} rounded-2xl p-8 cursor-pointer glass`}
    >
      {icon && <div className="text-5xl mb-4">{icon}</div>}
      {title && <h3 className="font-display text-2xl text-pistachio-700 mb-3">{title}</h3>}
      {description && <p className="text-taupe">{description}</p>}
    </motion.div>
  );
}

/**
 * Italian Section Header
 */
export function SectionHeader({ 
  title, 
  subtitle, 
  accent = 'pistachio'
}) {
  const accentClasses = {
    pistachio: 'text-pistachio-700',
    red: 'text-red-600',
    gold: 'text-gold',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className={`font-display text-5xl md:text-6xl mb-4 ${accentClasses[accent]}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-dark max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}

/**
 * Feature with Icon
 */
export function Feature({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-display text-2xl text-pistachio-700 mb-2">{title}</h3>
      <p className="text-dark">{description}</p>
    </motion.div>
  );
}

/**
 * Badge Component
 */
export function Badge({ children, variant = 'pistachio' }) {
  const variants = {
    pistachio: 'bg-pistachio-100 text-pistachio-700',
    red: 'bg-red-100 text-red-600',
    gold: 'bg-amber/10 text-amber',
  };

  return (
    <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}

/**
 * Testimonial Card
 */
export function TestimonialCard({ name, role, content, emoji = '🌿' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-8 border border-pistachio-200"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="text-4xl">{emoji}</div>
        <div>
          <h4 className="font-display text-lg text-pistachio-700">{name}</h4>
          <p className="text-sm text-dark">{role}</p>
        </div>
      </div>
      <p className="text-dark leading-relaxed italic">"{content}"</p>
    </motion.div>
  );
}

/**
 * Stat Box
 */
export function StatBox({ number, label, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      {icon && <div className="text-5xl mb-2">{icon}</div>}
      <div className="text-5xl font-display text-pistachio-600 mb-2">{number}</div>
      <p className="text-dark font-medium">{label}</p>
    </motion.div>
  );
}

/**
 * CTA Section
 */
export function CTASection({ title, description, buttonText, buttonAction }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 px-4 bg-gradient-red rounded-3xl text-white text-center"
    >
      <h2 className="font-display text-5xl mb-4">{title}</h2>
      {description && <p className="text-lg mb-8 max-w-2xl mx-auto">{description}</p>}
      {buttonText && (
        <PistachioButton 
          onClick={buttonAction}
          className="!bg-white !text-red-600 hover:!bg-red-50"
        >
          {buttonText}
        </PistachioButton>
      )}
    </motion.section>
  );
}

/**
 * Tag Cloud
 */
export function TagCloud({ tags = [] }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {tags.map((tag) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          viewport={{ once: true }}
          className="px-4 py-2 rounded-full bg-pistachio-100 text-pistachio-700 text-sm font-medium"
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );
}
