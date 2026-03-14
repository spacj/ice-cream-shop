'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FadeInOnScroll } from '@/lib/scroll-animations';
import { PremiumImage, VideoBackground, ImageGallery, ImageCarousel, VideoPlayer } from '@/lib/media-components';

// Premium gelato and artisan ice cream images from high-quality sources
const sampleImages = [
  { src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=800&fit=crop', alt: 'Pistachio gelato scoop', caption: 'Pistacchio Classico' },
  { src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=800&fit=crop', alt: 'Gelato display case', caption: 'Our gelato bar' },
  { src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=800&fit=crop', alt: 'Creamy pistachio texture', caption: 'Premium gelato' },
  { src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=800&fit=crop', alt: 'Array of gelato flavors', caption: 'Signature flavors' },
  { src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=800&fit=crop', alt: 'Modern shop ambiance', caption: 'Shop interior' },
  { src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=800&fit=crop', alt: 'Handcrafted gelato preparation', caption: 'Handcrafted' },
];

const carouselImages = [
  { src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1200&h=600&fit=crop', alt: 'Pistachio gelato featured' },
  { src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1200&h=600&fit=crop', alt: 'Artisan gelato creation' },
  { src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1200&h=600&fit=crop', alt: 'Premium ingredients showcase' },
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="overflow-hidden bg-cream">
      {/* ===== HERO WITH VIDEO BACKGROUND ===== */}
      <section className="relative w-full min-h-screen flex items-stretch pt-32">
        {/* Video Background */}
        <div className="absolute inset-0 top-32 w-full h-full">
           <VideoBackground 
             src="/videos/hero-gelato.mp4"
             poster="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1600&h=1200&fit=crop&q=80"
             className="w-full h-full"
           />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-cream/80 to-cream/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-20 flex items-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="text-pistach-500 text-sm tracking-widest uppercase mb-4 font-semibold">
                Artisanal Gelato Crafted Daily
              </p>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-charcoal mb-6 leading-tight">
                Pistacchio
              </h1>
              <p className="text-2xl md:text-3xl text-pistach-500 font-light mb-8">
                Premium Sicilian Gelato in Utrecht
              </p>
              <p className="text-lg text-grey-dark max-w-xl leading-relaxed mb-8">
                Hand-crafted daily from the finest Sicilian pistachio, sustainably sourced and prepared with uncompromising attention to quality.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-pistach-500 text-white rounded-lg font-semibold hover:bg-pistach-600 transition-colors"
              >
                <Link href="#flavors">Explore Our Gelato</Link>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED CAROUSEL ===== */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-12">
              <p className="text-pistach-500 text-sm tracking-widest uppercase mb-4 font-semibold">
                Visual Journey
              </p>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-charcoal mb-6">
                Featured Moments
              </h2>
              <div className="w-20 h-1 bg-caramel mx-auto"></div>
            </div>
          </FadeInOnScroll>

          <ImageCarousel images={carouselImages} />
        </div>
      </section>

      {/* ===== FEATURED FLAVORS WITH IMAGES ===== */}
      <section id="flavors" className="py-32 px-4 bg-gradient-to-b from-ivory to-white">
        <div className="max-w-7xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-20">
              <p className="text-pistach-500 text-sm tracking-widest uppercase mb-4 font-semibold">
                Our Signature Collection
              </p>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-charcoal mb-6">
                Handcrafted Flavors
              </h2>
              <div className="w-20 h-1 bg-caramel mx-auto"></div>
            </div>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                id: 'classico',
                name: 'Pistacchio Classico',
                description: 'Pure essence of Sicilian pistachio, no additives',
                image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=600&fit=crop&q=85'
              },
              {
                id: 'nocciola',
                name: 'Pistacchio & Nocciola',
                description: 'Pistachio blended with premium Italian hazelnut',
                image: 'https://images.unsplash.com/photo-1583114614970-cd1525b85b88?w=600&h=600&fit=crop&q=85'
              },
              {
                id: 'cioccolato',
                name: 'Pistacchio & Cioccolato',
                description: 'Rich pistachio with dark Belgian chocolate',
                image: 'https://images.unsplash.com/photo-1629866066033-28d6af2d51b6?w=600&h=600&fit=crop&q=85'
              }
            ].map((flavor, idx) => (
              <motion.div
                key={flavor.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Image */}
                <div className="rounded-lg aspect-square overflow-hidden mb-8 shadow-lg group cursor-pointer">
                  <PremiumImage 
                    src={flavor.image}
                    alt={flavor.name}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Info */}
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

      {/* ===== THE CRAFT WITH VIDEO ===== */}
      <section className="py-32 px-4 bg-pistach-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Video */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <VideoPlayer
                src="/videos/gelato-making.mp4"
                poster="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop&q=85"
                title="Our Gelato Making Process"
              />
            </motion.div>

            {/* Right - Text */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <p className="text-pistach-500 text-sm tracking-widest uppercase mb-4 font-semibold">
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

      {/* ===== IMAGE GALLERY ===== */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <p className="text-pistach-500 text-sm tracking-widest uppercase mb-4 font-semibold">
                Gallery
              </p>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-charcoal mb-6">
                Moments at Pistacchio
              </h2>
              <div className="w-20 h-1 bg-caramel mx-auto"></div>
            </div>
          </FadeInOnScroll>

          <ImageGallery images={sampleImages} columns={3} />
        </div>
      </section>

      {/* ===== QUALITY STANDARDS ===== */}
      <section className="py-32 px-4 bg-gradient-to-b from-cream to-ivory">
        <div className="max-w-7xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-20">
              <p className="text-pistach-500 text-sm tracking-widest uppercase mb-4 font-semibold">
                Quality Commitment
              </p>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-charcoal mb-6">
                The Pistacchio Difference
              </h2>
              <div className="w-20 h-1 bg-caramel mx-auto"></div>
            </div>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'sourcing', icon: '🌾', title: 'Direct Sourcing', desc: 'From family farms in Sicily' },
              { id: 'batch', icon: '🏭', title: 'Daily Batch', desc: 'Small batches, fresh flavor' },
              { id: 'pure', icon: '✨', title: 'Pure Ingredients', desc: 'No artificial additives' },
              { id: 'award', icon: '🏆', title: 'Award Winning', desc: 'Recognized excellence' }
            ].map((item, idx) => (
              <motion.div
                key={item.id}
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

      {/* ===== REVIEWS ===== */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <p className="text-pistach-500 text-sm tracking-widest uppercase mb-4 font-semibold">
                Loved by Gelato Enthusiasts
              </p>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-charcoal mb-6">
                What Our Guests Say
              </h2>
              <div className="w-20 h-1 bg-caramel mx-auto"></div>
            </div>
          </FadeInOnScroll>

          {/* Google Rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16 py-12 bg-gradient-to-br from-pistach-50 to-ivory rounded-lg"
          >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={`rating-star-${i}`} className="text-4xl text-caramel">★</span>
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
              { id: 'review-maria', author: 'Maria K.', text: 'Exceptional quality. This is authentic gelato.' },
              { id: 'review-jan', author: 'Jan D.', text: 'The best pistachio gelato in Utrecht, hands down.' },
              { id: 'review-sophie', author: 'Sophie M.', text: 'Tastes like Italy. Truly crafted with passion.' }
            ].map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-pistach-50 to-ivory p-8 rounded-lg border border-beige"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={`review-star-${review.id}-${i}`} className="text-caramel">★</span>
                  ))}
                </div>
                <p className="text-grey-dark mb-4 italic">"{review.text}"</p>
                <p className="font-semibold text-charcoal">— {review.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOCATION ===== */}
      <section className="py-32 px-4 bg-gradient-to-b from-cream to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-pistach-500 text-sm tracking-widest uppercase mb-4 font-semibold">
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
                    Mon - Thu: 12:00 - 22:00<br/>
                    Fri - Sat: 11:00 - 23:00<br/>
                    Sun: 12:00 - 21:00
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
                  href="https://www.google.com/maps/search/Korte+Jansstraat+23+Utrecht"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="inline-block px-8 py-4 bg-pistach-500 text-white rounded-lg font-semibold hover:bg-pistach-600 transition-colors"
                >
                  Get Directions
                </motion.a>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden shadow-xl"
            >
              <PremiumImage
                src="https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=800&fit=crop&q=85"
                alt="Pistacchio Utrecht shop interior"
                className="w-full aspect-square"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
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
