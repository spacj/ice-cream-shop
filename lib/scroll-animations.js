'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * Parallax Section Component
 * Creates depth effect with scroll
 */
export function ParallaxSection({ children, offset = 50 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

/**
 * Fade In On Scroll Component
 */
export function FadeInOnScroll({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Slide In On Scroll Component
 */
export function SlideInOnScroll({ children, direction = 'left', delay = 0 }) {
  const xStart = direction === 'left' ? -100 : 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: xStart }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scale In On Scroll Component
 */
export function ScaleInOnScroll({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger Container for child animations
 */
export function StaggerContainer({ children, staggerDelay = 0.1 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ staggerChildren: staggerDelay, delayChildren: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated Counter Component
 */
export function AnimatedCounter({ end, duration = 2 }) {
  const ref = useRef(null);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {end}
      </motion.div>
    </motion.div>
  );
}

/**
 * Video Background with Scroll Opacity
 */
export function ScrollOpacityVideo({ src, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div ref={ref} style={{ opacity }} className="relative">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/20" />
      {children}
    </motion.div>
  );
}

/**
 * Reveal Text on Scroll
 */
export function RevealText({ text, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {text}
    </motion.div>
  );
}
