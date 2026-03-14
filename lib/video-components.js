'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * Video Hero Section Component
 * Full-screen video background with content overlay
 */
export function VideoHero({ 
  videoSrc = '/videos/hero.mp4', 
  title, 
  subtitle, 
  cta,
  overlayOpacity = 0.3 
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <motion.section
      ref={containerRef}
      className="relative h-screen overflow-hidden flex items-center justify-center"
      style={{ scale }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
        </video>
        
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
        style={{ opacity }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {title && (
          <motion.h1
            className="font-display text-6xl md:text-8xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h1>
        )}
        
        {subtitle && (
          <motion.p
            className="text-xl md:text-3xl mb-8 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>
        )}

        {cta && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white text-pistachio-600 rounded-full font-semibold text-lg"
          >
            {cta}
          </motion.button>
        )}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </motion.section>
  );
}

/**
 * Video Gallery Component
 * Responsive grid of video cards
 */
export function VideoGallery({ videos = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          viewport={{ once: true, margin: '-100px' }}
          whileHover={{ y: -10 }}
          className="group relative overflow-hidden rounded-2xl aspect-video bg-black shadow-lg"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          >
            <source src={video.src} type="video/mp4" />
          </video>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-6">
            {video.title && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-white"
              >
                <h3 className="font-display text-2xl mb-2">{video.title}</h3>
                {video.description && (
                  <p className="text-sm text-gray-200">{video.description}</p>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Testimonial Video Component
 * For customer testimonial videos
 */
export function TestimonialVideo({ videoSrc, name, role }) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
      className="flex flex-col items-center"
    >
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl mb-6 bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full aspect-square object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
      
      <h3 className="font-display text-2xl text-pistachio-700 mb-2">{name}</h3>
      <p className="text-taupe text-sm">{role}</p>
    </motion.div>
  );
}

/**
 * Video With Text Overlay
 * For story-telling content
 */
export function VideoWithOverlay({ 
  videoSrc, 
  title, 
  description, 
  alignment = 'left'
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`grid grid-cols-1 ${alignment === 'left' ? 'md:grid-cols-2' : 'md:grid-cols-2'} gap-12 items-center`}
    >
      {/* Video */}
      <motion.div
        initial={{ opacity: 0, x: alignment === 'left' ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={alignment === 'right' ? 'md:order-2' : ''}
      >
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full aspect-video object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: alignment === 'left' ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={alignment === 'right' ? 'md:order-1' : ''}
      >
        {title && (
          <h2 className="font-display text-5xl text-pistachio-700 mb-6">{title}</h2>
        )}
        {description && (
          <p className="text-lg text-taupe leading-relaxed">{description}</p>
        )}
      </motion.div>
    </motion.div>
  );
}
