'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * Image with lazy loading and blur-up effect
 */
export function PremiumImage({ 
  src = '/images/placeholder.jpg', 
  alt = 'Pistacchio gelato',
  className = '',
  priority = false
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoading(false)}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100'
        }`}
      />
    </motion.div>
  );
}

/**
 * Video background component
 */
export function VideoBackground({ 
  src = '/videos/placeholder.mp4',
  poster = '/images/poster.jpg',
  className = ''
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`relative overflow-hidden ${className}`}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
        <source src={src.replace('.mp4', '.webm')} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
    </motion.div>
  );
}

/**
 * Image gallery with lightbox
 */
export function ImageGallery({ 
  images = [],
  columns = 3
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      {/* Gallery Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
        {images.map((image, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            onClick={() => setSelectedImage(image)}
            className="cursor-pointer group overflow-hidden rounded-lg aspect-square"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"></div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full"
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl"
            >
              ✕
            </button>
            {selectedImage.caption && (
              <p className="text-white text-center mt-4">{selectedImage.caption}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

/**
 * Video player with controls
 */
export function VideoPlayer({ 
  src = '/videos/placeholder.mp4',
  poster = '/images/poster.jpg',
  title = 'Pistacchio Crafting',
  className = 'aspect-video'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`relative rounded-lg overflow-hidden bg-black ${className}`}
    >
      <video
        controls
        poster={poster}
        className="w-full h-full"
      >
        <source src={src} type="video/mp4" />
        <source src={src.replace('.mp4', '.webm')} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </motion.div>
  );
}

/**
 * Image carousel with smooth animations and mobile support
 */
export function ImageCarousel({ 
  images = [],
  autoPlay = true,
  autoPlayInterval = 4000
}) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    setImageError(false);
  }, [current]);

  const next = () => {
    if (images.length === 0) return;
    setCurrent((current + 1) % images.length);
  };

  const prev = () => {
    if (images.length === 0) return;
    setCurrent((current - 1 + images.length) % images.length);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) next();
    if (isRightSwipe) prev();
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isHovered || images.length === 0) return;
    
    const interval = setInterval(() => {
      next();
    }, autoPlayInterval);
    
    return () => clearInterval(interval);
  }, [current, isHovered, autoPlay, autoPlayInterval, images.length]);

  // Don't render if no images
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  const currentImage = images[current];
  const imageSrc = imageError ? '/images/home/shopfront.png' : currentImage?.src;
  const imageAlt = currentImage?.alt || 'Gallery image';

  return (
    <div
      className="relative w-full group max-w-4xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Main Image Container */}
      <div className="relative aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-lg shadow-lg bg-gray-100">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={prev}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={next}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
                aria-label="Next image"
              >
                <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    idx === current 
                      ? 'w-8 h-3 bg-white shadow-md' 
                      : 'w-3 h-3 bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
              {images.length > 0 ? `${current + 1} / ${images.length}` : '0 / 0'}
            </div>
          </>
        )}
      </div>

      {/* Mobile Touch Hint */}
      {images.length > 1 && (
        <div className="md:hidden flex justify-center mt-3">
          <p className="text-sm text-grey-light">Swipe to navigate</p>
        </div>
      )}
    </div>
  );
}

/**
 * Before/After image slider
 */
export function BeforeAfterSlider({ 
  before = '/images/before.jpg',
  after = '/images/after.jpg',
  beforeLabel = 'Before',
  afterLabel = 'After'
}) {
  const [position, setPosition] = useState(50);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-200"
    >
      {/* After image */}
      <img src={after} alt={afterLabel} className="w-full h-full object-cover" />

      {/* Before image with clip-path */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img src={before} alt={beforeLabel} className="w-screen h-full object-cover" />
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
        style={{ left: `${position}%` }}
        onMouseDown={(e) => {
          const startX = e.clientX;
          const container = e.currentTarget.parentElement;
          const containerRect = container.getBoundingClientRect();

          const handleMouseMove = (moveEvent) => {
            const newPosition = Math.max(
              0,
              Math.min(
                100,
                ((moveEvent.clientX - containerRect.left) / containerRect.width) * 100
              )
            );
            setPosition(newPosition);
          };

          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', handleMouseMove);
          });
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 5a1 1 0 11-2 0 1 1 0 012 0zM8 12a1 1 0 11-2 0 1 1 0 012 0zm5-1a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded">
        {afterLabel}
      </div>
    </motion.div>
  );
}
