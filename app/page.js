'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FadeInOnScroll } from '@/lib/scroll-animations';
import { PremiumImage, VideoBackground, ImageGallery, ImageCarousel, VideoPlayer } from '@/lib/media-components';
import { getDb } from '@/lib/firebase';

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
  { src: 'https://images.unsplash.com/photo-1574056090882-6f8d5ee1ee2b?w=1200&h=600&fit=crop', alt: 'Customers enjoying gelato' },
  { src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1200&h=600&fit=crop', alt: 'Artisan gelato creation' },
  { src: 'https://images.unsplash.com/photo-1572268878410-d13dc5b67f20?w=1200&h=600&fit=crop', alt: 'Premium ingredients showcase' },
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [siteContent, setSiteContent] = useState({
    contact: { email: 'hello@pistacchio-utrecht.nl', phone: '+31 (0)6 1234 5678', address: 'Korte Jansstraat 23\n3512 GN Utrecht, Netherlands' },
    flavors: { title: 'Our Signature Collection', subtitle: 'Handcrafted Flavors', description: 'Explore our premium gelato flavors made from the finest Sicilian pistachio', items: [] },
    allergens: ''
  });
  const [contentLoading, setContentLoading] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

    useEffect(() => {
      const fetchContent = async () => {
        try {
          const db = await getDb();
          if (!db) { setContentLoading(false); return; }
          const { doc, getDoc } = await import('firebase/firestore');
          const contentSnap = await getDoc(doc(db, 'website', 'content'));
          if (contentSnap.exists()) {
            setSiteContent(prev => ({
              ...prev,
              ...contentSnap.data(),
              contact: { ...prev.contact, ...contentSnap.data().contact },
              flavors: { ...prev.flavors, ...contentSnap.data().flavors },
              allergens: contentSnap.data().allergens || ''
            }));
          }
        } catch (error) {
          console.error('Error fetching content:', error);
        }
        setContentLoading(false);
      };
      fetchContent();
    }, []);

  return (
    <div className="overflow-hidden bg-cream">
      {/* ===== HERO WITH VIDEO BACKGROUND ===== */}
      <section className="relative w-full min-h-screen flex items-stretch">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
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
              <Link href="#flavors">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 bg-pistach-500 text-white rounded-lg font-semibold hover:bg-pistach-600 transition-colors"
                >
                  Explore Our Gelato
                </motion.button>
              </Link>
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
                  {siteContent.flavors?.title || 'Our Signature Collection'}
                </p>
                <h2 className="text-5xl md:text-6xl font-serif font-bold text-charcoal mb-6">
                  {siteContent.flavors?.subtitle || 'Handcrafted Flavors'}
                </h2>
                <div className="w-20 h-1 bg-caramel mx-auto"></div>
              </div>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {(siteContent.flavors?.items?.length > 0 ? siteContent.flavors.items : [
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
              ]).map((flavor, idx) => (
                <motion.div
                  key={flavor.id || idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="rounded-lg aspect-square overflow-hidden mb-8 shadow-lg group cursor-pointer">
                    <PremiumImage 
                      src={flavor.image || 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=600&fit=crop&q=85'}
                      alt={flavor.name}
                      className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold text-charcoal mb-3">
                    {flavor.name}
                  </h3>
                  <p className="text-grey-dark text-lg mb-6">
                    {flavor.description}
                  </p>
                  <button
                    type="button"
                    className="text-pistach-600 font-semibold flex items-center gap-2 hover:text-pistach-700 transition-colors"
                  >
                    Discover More →
                  </button>
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
              { 
                id: 'sourcing', 
                title: 'Direct Sourcing', 
                desc: 'From family farms in Sicily',
                svg: (
                  <svg className="w-12 h-12 text-pistach-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              { 
                id: 'batch', 
                title: 'Daily Batch', 
                desc: 'Small batches, fresh flavor',
                svg: (
                  <svg className="w-12 h-12 text-pistach-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                )
              },
              { 
                id: 'pure', 
                title: 'Pure Ingredients', 
                desc: 'No artificial additives',
                svg: (
                  <svg className="w-12 h-12 text-pistach-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                )
              },
              { 
                id: 'award', 
                title: 'Award Winning', 
                desc: 'Recognized excellence',
                svg: (
                  <svg className="w-12 h-12 text-pistach-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                )
              }
            ].map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mb-4">{item.svg}</div>
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
                <p className="text-lg text-grey-dark whitespace-pre-line">
                  {siteContent.contact?.address || 'Korte Jansstraat 23<br/>3512 GN Utrecht, Netherlands'}
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
                   <a href={`tel:${siteContent.contact?.phone?.replace(/\s/g, '')}`} className="hover:text-pistach-500 transition-colors">
                     {siteContent.contact?.phone || '+31 (0)6 1234 5678'}
                   </a><br/>
                   <a href={`mailto:${siteContent.contact?.email}`} className="hover:text-pistach-500 transition-colors">
                     {siteContent.contact?.email || 'hello@pistacchio-utrecht.nl'}
                   </a>
                 </p>
               </div>

               <div>
                 <h3 className="text-sm tracking-widest uppercase text-pistach-500 font-semibold mb-2">
                   Allergens Information
                 </h3>
                 <p className="text-grey-dark whitespace-pre-line">
                   {siteContent.allergens || 'Our gelato is made with milk and may contain traces of nuts. Please inform our staff of any allergies.'}
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
            <button
              type="button"
              className="px-10 py-4 bg-white text-pistach-600 rounded-lg font-semibold text-lg hover:bg-cream transition-colors"
            >
              Visit Us Today
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
