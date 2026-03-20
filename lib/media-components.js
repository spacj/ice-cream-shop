'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

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
  autoplay = true
}) {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);

  const next = () => setCurrent((current + 1) % images.length);
  const prev = () => setCurrent((current - 1 + images.length) % images.length);

  // Handle touch start
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragX(e.touches[0].clientX);
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - dragX;
    // If dragged more than 50px, consider as swipe
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped right -> previous
        prev();
      } else {
        // Swiped left -> next
        next();
      }
      setIsDragging(false);
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Handle mouse down
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragX(e.clientX);
  };

  // Handle mouse move
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - dragX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        prev();
      } else {
        next();
      }
      setIsDragging(false);
    }
  };

  // Handle mouse up/leave
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative w-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Main Image */}
      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-200">
        <motion.img
          key={current}
          src={images[current].src}
          alt={images[current].alt}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6 px-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prev}
          className="px-4 py-2 bg-pistach-500 text-white rounded-lg font-semibold hover:bg-pistach-600 transition-colors"
        >
          〈 Previous
        </motion.button>

        <div className="flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === current ? 'bg-pistach-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={next}
          className="px-4 py-2 bg-pistach-500 text-white rounded-lg font-semibold hover:bg-pistach-600 transition-colors"
        >
          Next 〉
        </motion.button>
      </div>

      {/* Autoplay indicator */}
      {autoplay && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === current ? 'bg-pistach-500' : 'bg-pistach-200'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
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
